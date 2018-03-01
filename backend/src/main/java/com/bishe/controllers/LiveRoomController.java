package com.bishe.controllers;

import com.bishe.entities.LiveRoom;
import com.bishe.repositories.LiveRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/api/room")
public class LiveRoomController {

    @Autowired
    private LiveRoomRepository liveRoomRepository;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity saveLiveRoom(@RequestBody LiveRoom liveRoom) {

        liveRoom = liveRoomRepository.save(liveRoom);
        return new ResponseEntity<>(liveRoom, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public ResponseEntity getAllLiveRoom(@PathVariable Long id) {

        return new ResponseEntity(HttpStatus.OK);
    }
}
