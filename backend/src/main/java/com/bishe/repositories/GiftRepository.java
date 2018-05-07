package com.bishe.repositories;

import com.bishe.entities.Gift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface GiftRepository extends JpaRepository<Gift,Long> {
    List<Gift> findAllByLiveRoomIdAndDateBetween(Long liveRoomId, Date oldDate, Date nowDate);
    void deleteAllByLiveRoomId(Long liveRoomId);

    int countAllByLiveRoomId(Long liveRoomId);

    int countAllByLiveRoomIdAndGiftStyleAndDateBetween(Long liveRoomId, int giftStyle, Date oldDate, Date nowDate);
}
