package com.bishe.repositories;

import com.bishe.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findById(Long id);
    Optional<User> findByUserName(String UserName);

    Page<User> findAllByRole(int role, Pageable pageable);
}

