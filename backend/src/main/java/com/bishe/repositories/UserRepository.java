package com.bishe.repositories;

import com.bishe.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findById(Long id);
    Optional<User> findByUserName(String UserName);

    Page<User> findAllByRole(int role, Pageable pageable);

    @Query("select new com.bishe.entities.CountBarrageAndUser(u.id, l.id, u.avatar, u.name, u.userName, l.platform, l.roomId, count(b.liveRoomId)) from User u, LiveRoom l, Barrage b where l.id = b.liveRoomId and l.userId = u.id and u.role = 0 group by u.id, l.id order by count(b) desc")
    Page sortUserByBarrage(Pageable pageable);

    @Query("select new com.bishe.entities.CountBarrageAndUser(u.id, l.id, u.avatar, u.name, u.userName, l.platform, l.roomId, coalesce(sum(p.price),0)) from User u, GiftPrice p, Gift g, LiveRoom l where g.giftStyle = p.giftStyle and g.liveRoomId = l.id and l.userId = u.id and u.role = 0 group by l.id, u.id order by sum(p.price) desc ")
    Page sortUserByGift(Pageable pageable);
}

