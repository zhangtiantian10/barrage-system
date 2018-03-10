package com.bishe.repositories;

import com.bishe.entities.LiveRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LiveRoomRepository extends JpaRepository<LiveRoom,Long> {

    LiveRoom findByUserIdAndPlatform(Long userId, String platform);
    List<LiveRoom> findByUserId(Long userId);
    LiveRoom findByPlatformAndUserId(String platform, Long userId);
}
