package com.bishe.controllers;

import com.bishe.entities.Barrage;
import com.bishe.entities.LiveRoom;
import com.bishe.repositories.BarrageRepository;
import com.bishe.repositories.LiveRoomRepository;
import com.bishe.services.DyBulletScreenClient;
import com.bishe.services.DyThread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class BarrageController {
    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private LiveRoomRepository liveRoomRepository;

    @Autowired
    private BarrageRepository barrageRepository;

    private DyBulletScreenClient danmuClient;

    @MessageMapping("/barrage")
    @SendTo("/message/barrage")
    public void sendBarrages(@RequestBody LiveRoom liveRoom) throws Exception {
        danmuClient = new DyBulletScreenClient(this);
        DyThread dyThread = new DyThread(liveRoom, danmuClient);
        dyThread.run();
    }


    public void keepSendBarrage(Barrage barrage) {
        barrageRepository.save(barrage);
        LiveRoom liveRoom = liveRoomRepository.findOne(barrage.getLiveRoomId());
        this.template.convertAndSend("/message/barrage/user/" + liveRoom.getUserId() + "/liveRoom/" + liveRoom.getId(), barrage);
    }

    @MessageMapping("/disconnect")
    public void disconnect(@RequestBody LiveRoom liveRoom) {
        danmuClient.disconnect();
    }

}
