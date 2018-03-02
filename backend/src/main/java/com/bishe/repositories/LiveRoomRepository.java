package com.bishe.repositories;

import com.bishe.entities.LiveRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LiveRoomRepository extends JpaRepository<LiveRoom,Long> {

    List<LiveRoom> findByUserId(Long userId);
    LiveRoom findByRoomIdAndPlatformAndUserId(Long roomId, String platform, Long userId);
}
