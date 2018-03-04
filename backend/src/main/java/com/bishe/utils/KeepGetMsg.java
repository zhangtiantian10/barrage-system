package com.bishe.utils;

import com.bishe.services.DyBulletScreenClient;

/**
 * @Summary: 获取服务器弹幕信息线程
 * @author: FerroD     
 * @date:   2016-3-12   
 * @version V1.0
 */
public class KeepGetMsg implements Runnable {

    private DyBulletScreenClient danmuClient;

    public KeepGetMsg(DyBulletScreenClient dyBulletScreenClient) {
        this.danmuClient = dyBulletScreenClient;
    }

	@Override
    public void run()
    {
    	//判断客户端就绪状态
        while(danmuClient.getReadyFlag())
        {
        	//获取服务器发送的弹幕信息
        	danmuClient.getServerMsg();;
        }
    }
}
