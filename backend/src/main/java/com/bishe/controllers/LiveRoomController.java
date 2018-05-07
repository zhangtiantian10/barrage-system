package com.bishe.controllers;

import com.bishe.common.errors.ErrorCode;
import com.bishe.common.exceptions.ConflictException;
import com.bishe.entities.LiveRoom;
import com.bishe.repositories.BarrageRepository;
import com.bishe.repositories.GiftRepository;
import com.bishe.repositories.LiveRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/room")
public class LiveRoomController {

    @Autowired
    private LiveRoomRepository liveRoomRepository;

    @Autowired
    private BarrageRepository barrageRepository;

    @Autowired
    private GiftRepository giftRepository;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity saveLiveRoom(@RequestBody LiveRoom liveRoom) {
        LiveRoom liveRoomNew = liveRoomRepository.findByPlatformAndUserId(liveRoom.getPlatform(), liveRoom.getUserId());

        if(liveRoomNew != null) {
            throw new ConflictException(ErrorCode.LIVE_ROOM_ALREADY_EXISTS,
                    String.format("live room already exists"));
        }

        liveRoom.setStatus(1);
        liveRoom = liveRoomRepository.save(liveRoom);
        return new ResponseEntity<>(liveRoom, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity getLiveRoom(@PathVariable Long id) {

        LiveRoom liveRoom = liveRoomRepository.findOne(id);
        return new ResponseEntity<>(liveRoom, HttpStatus.OK);
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public ResponseEntity getAllLiveRoom(@PathVariable Long id) {

        List<LiveRoom> liveRooms = liveRoomRepository.findByUserId(id);
        return new ResponseEntity<>(liveRooms, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteLiveRoom(@PathVariable Long id) {
        LiveRoom liveRoom = liveRoomRepository.getOne(id);
        liveRoomRepository.delete(id);
//        barrageRepository.deleteAllByLiveRoomId(id);
//        giftRepository.deleteAllByLiveRoomId(id);
        List<LiveRoom> liveRooms = liveRoomRepository.findByUserId(liveRoom.getUserId());

        return new ResponseEntity<>(liveRooms, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/status", method = RequestMethod.PUT)
    public ResponseEntity modifyStatus(@PathVariable Long id) {
        LiveRoom liveRoom = liveRoomRepository.findOne(id);
        if(liveRoom.getStatus() == 1) {
            liveRoom.setStatus(0);
        } else {
            liveRoom.setStatus(1);
        }

        liveRoomRepository.save(liveRoom);

        List<LiveRoom> liveRooms = liveRoomRepository.findByUserId(liveRoom.getUserId());

        return new ResponseEntity<>(liveRooms, HttpStatus.OK);
    }

    @RequestMapping(value = "/barrageCount/{id}", method = RequestMethod.GET)
    public ResponseEntity getBarrageAndGiftCount(@PathVariable Long id) {
        int barrageCount = barrageRepository.countAllByLiveRoomId(id);
        int giftCount = giftRepository.countAllByLiveRoomId(id);

        Map<String, Integer> result = new HashMap<>();

        result.put("barrageCount", barrageCount);
        result.put("giftCount", giftCount);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
