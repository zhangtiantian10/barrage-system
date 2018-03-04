package com.bishe.utils;

import com.bishe.services.DyBulletScreenClient;

/**
 * @Summary: 服务器心跳保持线程
 * @author: FerroD     
 * @date:   2016-3-12   
 * @version V1.0
 */
public class KeepAlive implements Runnable {

    private DyBulletScreenClient danmuClient;

    public KeepAlive(DyBulletScreenClient dyBulletScreenClient) {
        this.danmuClient = dyBulletScreenClient;
    }

    @Override
    public void run()
    {
    	//判断客户端就绪状态
        while(danmuClient.getReadyFlag())
        {
        	//发送心跳保持协议给服务器端
        	danmuClient.keepAlive();
            try
            {
            	//设置间隔45秒再发送心跳协议
                Thread.sleep(45000);        //keep live at least once per minute
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
        }
    }

}
