package com.bishe.controllers;

import com.bishe.entities.Barrage;
import com.bishe.services.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class BarrageController {
    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/barrage")
    @SendTo("/message/barrage")
    public void sengBarrages() throws Exception {
        new Thread(new Client(this)).start();
    }


    public void keepSendBarrage(Barrage barrage) {
        this.template.convertAndSend("/message/barrage", barrage);
    }
}
