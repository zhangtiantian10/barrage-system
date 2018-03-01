package com.bishe.services;

import com.bishe.controllers.BarrageController;
import com.bishe.entities.Barrage;

import java.io.DataInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;

public class Client implements Runnable {
    public static final String IP_ADDR = "openbarrage.douyutv.com";
    public static final int PORT = 8601;

    private int i = 0;

    private BarrageController barrageController;
    public Client(BarrageController barrageController) {
        this.barrageController = barrageController;
    }

    @Override
    public void run() {
        while (true) {
            Socket socket = null;
            try {
                socket = new Socket(IP_ADDR, PORT);

                OutputStream ots = socket.getOutputStream();
                PrintWriter pw = new PrintWriter(ots);
                pw.write("type@=loginreq/roomid@=1229/");
                pw.flush();

                DataInputStream input = new DataInputStream(socket.getInputStream());

                int ret = input.read();
                System.out.println("服务器端返回过来的是: " + ret);

                Barrage barrage = new Barrage((long) 1, "zhangtian", "666", (long)0);

                barrage.setId((long) i);
                i ++;
                barrageController.keepSendBarrage(barrage);
                input.close();
                pw.close();

            } catch (Exception e) {
                System.out.println("客户端异常:" + e.getMessage());
            } finally {
                if (socket != null) {
                    try {
                        socket.close();
                    } catch (IOException e) {
                        socket = null;
                        System.out.println("客户端 finally 异常:" + e.getMessage());
                    }
                }
            }
        }
    }
}