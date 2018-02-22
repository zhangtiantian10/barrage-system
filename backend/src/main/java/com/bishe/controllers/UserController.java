package com.bishe.controllers;

import com.bishe.common.errors.ErrorCode;
import com.bishe.common.exceptions.BadRequestException;
import com.bishe.common.exceptions.ConflictException;
import com.bishe.common.exceptions.NotFoundException;
import com.bishe.common.exceptions.UserNotFoundException;
import com.bishe.entities.User;
import com.bishe.repositories.UserRepository;
import com.bishe.services.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {
    @Value("${zt.upload-path}")
    private String webUploadPath;
    @Autowired
    private UserRepository userRepository;

    private UserService userService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity getUser(@PathVariable Long id) {
        User user = findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND,
                        String.format("can't find user by id %d", id)));

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity saveUser(@RequestBody User user) {
        if (userRepository.findByUserName(user.getUserName()).isPresent()) {
            throw new ConflictException(ErrorCode.USER_ALREADY_EXISTS,
                    String.format("user %s already exists", user.getUserName()));
        }
        try {
            String password = new BCryptPasswordEncoder().encode(user.getPassword().trim());
            user.setPassword(password);
            user.setAvatar("1517647635584.jpg");
            userRepository.save(user);
            return new ResponseEntity(user.getPassword(), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            throw new BadRequestException(ErrorCode.FAILED_TO_CREATE_USER,
                    String.format("failed to create user %s", user.getUserName()), e);
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity login(@RequestBody User info) {
        Optional<User> user = userRepository.findByUserName(info.getUserName());
        if (!user.isPresent()) {
            throw new UserNotFoundException(ErrorCode.INVALID_USERNAME_PASSWORD);
        }

        String password = user.get().getPassword();
        boolean flag = new BCryptPasswordEncoder().matches(info.getPassword(), password);
        if(flag) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }

        throw new UserNotFoundException(ErrorCode.INVALID_USERNAME_PASSWORD);
    }

    @RequestMapping(value = "/avatar/{id}", method = RequestMethod.POST)
    public ResponseEntity uploadAvatar(@RequestParam("file") MultipartFile file, @PathVariable Long id) throws IOException {
        System.out.println(file);
        String temp = "static/images" + File.separator + "upload" + File.separator;

        String fileName = file.getOriginalFilename();
        String extensionName = StringUtils.substringAfter(fileName, ".");

        String newFileName = String.valueOf(System.currentTimeMillis()) + "." + extensionName;

        String filePath = webUploadPath.concat(temp);

        File dest = new File(filePath, newFileName);
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }

        file.transferTo(dest);

        String[] array = {filePath, newFileName};

        User user = userRepository.findOne(id);
        user.setAvatar(newFileName);
        userRepository.save(user);
        return new ResponseEntity<>(array, HttpStatus.OK);
    }
}
