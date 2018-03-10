package com.bishe.repositories;

import com.bishe.entities.Barrage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface BarrageRepository extends JpaRepository<Barrage,Long> {
    List<Barrage> findAllByLiveRoomIdAndDateBetween(Long liveRoomId, Date oldDate, Date nowDate);
    void deleteAllByLiveRoomId(Long liveRoomId);
}
