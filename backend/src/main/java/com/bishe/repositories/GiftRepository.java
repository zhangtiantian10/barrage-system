package com.bishe.repositories;

import com.bishe.entities.Gift;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface GiftRepository extends JpaRepository<Gift,Long> {
    List<Gift> findAllByLiveRoomIdAndDateBetween(Long liveRoomId, Date oldDate, Date nowDate);
    void deleteAllByLiveRoomId(Long liveRoomId);

    int countAllByLiveRoomId(Long liveRoomId);

    int countAllByLiveRoomIdAndGiftStyleAndDateBetween(Long liveRoomId, int giftStyle, Date oldDate, Date nowDate);

    @Query("select sum(p.price) from Gift g, GiftPrice p where g.liveRoomId=:liveRoomId and g.giftStyle=p.giftStyle")
    Double sumGiftTotalPrice(@Param("liveRoomId") Long liveRoomId);
}
