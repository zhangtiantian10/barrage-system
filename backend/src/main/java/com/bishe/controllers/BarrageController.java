package com.bishe.controllers;

import com.bishe.entities.Barrage;
import com.bishe.entities.LiveRoom;
import com.bishe.repositories.BarrageRepository;
import com.bishe.repositories.LiveRoomRepository;
import com.bishe.services.Client;
import com.bishe.services.DyBulletScreenClient;
import com.bishe.utils.KeepAlive;
import com.bishe.utils.KeepGetMsg;
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

    @MessageMapping("/barrage")
    @SendTo("/message/barrage")
    public void sendBarrages(@RequestBody LiveRoom liveRoom) throws Exception {

        System.out.println(liveRoom);
//        new Thread(new Client(this)).start();

        int roomId = liveRoom.getRoomId().intValue();

        DyBulletScreenClient danmuClient = DyBulletScreenClient.getInstance(this);
        //设置需要连接和访问的房间ID，以及弹幕池分组号
        danmuClient.init(roomId, -9999, liveRoom.getId());

        //保持弹幕服务器心跳
        KeepAlive keepAlive = new KeepAlive();
        keepAlive.start();

        //获取弹幕服务器发送的所有信息
        KeepGetMsg keepGetMsg = new KeepGetMsg();
        keepGetMsg.start();
    }


    public void keepSendBarrage(Barrage barrage) {
        barrageRepository.save(barrage);
        this.template.convertAndSend("/message/barrage", barrage);
    }
}
