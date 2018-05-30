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

    int countAllByLiveRoomIdAndGiftNameAndDateBetween(Long liveRoomId, String giftName, Date oldDate, Date nowDate);

    int countAllByLiveRoomIdAndGiftNameNotInAndDateBetween(Long liveRoomId, String[] giftNames, Date oldDate, Date nowDate);

    @Query("select sum(p.price) from Gift g, GiftPrice p where g.liveRoomId=:liveRoomId and g.giftStyle=p.giftStyle")
    Double sumGiftTotalPrice(@Param("liveRoomId") Long liveRoomId);

    @Query("select coalesce(sum(p.price), 0) from Gift g, GiftPrice p where g.liveRoomId=:liveRoomId and g.giftStyle=p.giftStyle and g.date>=:oldDate and g.date<=:nowDate")
    Double sumGiftTotalPriceDateBetween(@Param("liveRoomId") Long liveRoomId, @Param("oldDate") Date oldDate, @Param("nowDate") Date nowDate);
}
