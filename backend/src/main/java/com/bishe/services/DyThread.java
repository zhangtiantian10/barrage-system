package com.bishe.services;

import com.bishe.controllers.BarrageController;
import com.bishe.entities.LiveRoom;
import com.bishe.utils.KeepAlive;
import com.bishe.utils.KeepGetMsg;
import org.apache.log4j.Logger;

public class DyThread {

    private LiveRoom liveRoom;

    private DyBulletScreenClient danmuClient;

    public DyThread(LiveRoom liveRoom, DyBulletScreenClient dyBulletScreenClient) {
        this.liveRoom = liveRoom;
        this.danmuClient = dyBulletScreenClient;
    }

    public void run() {

        System.out.println(liveRoom.getRoomId() + "房间ID--------" + Thread.currentThread());
        int roomId = liveRoom.getRoomId().intValue();

        danmuClient.init(roomId, -9999, liveRoom.getId());
        KeepAlive keepAlive = new KeepAlive(danmuClient);
        Thread keepAliveThread = new Thread(keepAlive);
        keepAliveThread.start();

        KeepGetMsg keepGetMsg = new KeepGetMsg(danmuClient);
        Thread keepGetMsgThread = new Thread(keepGetMsg);
        keepGetMsgThread.start();
    }
}
