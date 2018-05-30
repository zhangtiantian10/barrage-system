package com.bishe.controllers;

import com.bishe.entities.Barrage;
import com.bishe.entities.Gift;
import com.bishe.entities.GiftPrice;
import com.bishe.entities.LiveRoom;
import com.bishe.repositories.*;
import com.bishe.services.DyBulletScreenClient;
import com.bishe.services.DyThread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.text.*;
import java.util.*;

@Controller
public class BarrageController {
    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private LiveRoomRepository liveRoomRepository;

    @Autowired
    private BarrageRepository barrageRepository;

    @Autowired
    private GiftRepository giftRepository;

    @Autowired
    private GiftPriceRepository giftPriceRepository;

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
        Map result = new HashMap();
        result.put("type", "barrage");
        result.put("barrage", barrage);
        this.template.convertAndSend("/message/barrage/user/" + liveRoom.getUserId() + "/liveRoom/" + liveRoom.getId(), result);
    }

    public void keepSendGift(Gift gift) {
        GiftPrice giftPrice = giftPriceRepository.findOneByGiftStyle(gift.getGiftStyle());
        if (giftPrice != null) {
            gift.setGiftName(giftPrice.getName());
            giftRepository.save(gift);
            LiveRoom liveRoom = liveRoomRepository.findOne(gift.getLiveRoomId());
            Map result = new HashMap();
            result.put("type", "gift");
            result.put("gift", gift);
            this.template.convertAndSend("/message/barrage/user/" + liveRoom.getUserId() + "/liveRoom/" + liveRoom.getId(), result);
        }
    }

    @MessageMapping("/disconnect")
    public void disconnect(@RequestBody LiveRoom liveRoom) {
        danmuClient.disconnect();
    }

    @RequestMapping(value = "/api/user/{userId}/{platform}/barrageData/{monthStr}", method = RequestMethod.GET)
    public ResponseEntity getBarrageData(@PathVariable Long userId, @PathVariable String platform, @PathVariable String monthStr) throws ParseException {
        LiveRoom liveRoom= liveRoomRepository.findByUserIdAndPlatform(userId, platform);
        if (liveRoom == null) {
            return new ResponseEntity<>(getNullResult(), HttpStatus.OK);
        }

        String startDateStr, endDateStr;
        if(monthStr.equals("lastMonth")) {
            startDateStr = getStartDate();
            endDateStr = getEndDate();
        } else {
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
            startDateStr = sdf.format(date);
            SimpleDateFormat simpleDateFormatMonth = new SimpleDateFormat("yyyy-MM-dd");
            endDateStr = simpleDateFormatMonth.format(date);
        }

        return new ResponseEntity<>(getDataByDate(startDateStr, endDateStr, "barrage", liveRoom.getId()), HttpStatus.OK);
    }

    private String getStartDate() {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MONTH, -1);
        SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM");
        return format.format(c.getTime());
    }

    private String getEndDate() {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MONTH, -1);
        int MaxDay=c.getActualMaximum(Calendar.DAY_OF_MONTH);
        c.set( c.get(Calendar.YEAR), c.get(Calendar.MONTH), MaxDay, 23, 59, 59);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(c.getTime());
    }

    public Map getDataByDate(String startDateStr, String endDateStr, String type, Long liveRoomId) throws ParseException {
        List<String> dates = new ArrayList<>();
        List<Integer> data = new ArrayList<>();
        List<Double> rockets = new ArrayList<>();
        List<Double> superRockets = new ArrayList<>();
        List<Double> planes = new ArrayList<>();
        List<Double> others = new ArrayList<>();

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        String compare = "";

        List barrages = new ArrayList();

        Map barrage = new HashMap();
        Map rocket = new HashMap();
        Map superRocket = new HashMap();
        Map plane = new HashMap();

        int flag = 1;
        while (compare.compareTo(endDateStr) < 0) {
            compare = startDateStr;
            if(flag < 10) {
                compare += "-0" + flag;
            } else{
                compare += "-" + flag;
            }
            Date startDate = simpleDateFormat.parse(compare + " 00:00:00");
            Date endDate = simpleDateFormat.parse(compare + " 23:59:59");
            List a = new ArrayList();
            if (type.equals("barrage")) {
                a = barrageRepository.findAllByLiveRoomIdAndDateBetween(liveRoomId, startDate, endDate);
                barrage.put("type", "barrage");
                data.add(a.size());
                barrage.put("data", data);
            } else if (type.equals("gift")){
                String[] giftNames = {"超级火箭", "火箭", "飞机"};
                double subtotal = giftRepository.sumGiftTotalPriceDateBetween(liveRoomId, startDate, endDate);
                for (int i = 0; i < giftNames.length; i++) {
                    int count = giftRepository.countAllByLiveRoomIdAndGiftNameAndDateBetween(liveRoomId, giftNames[i], startDate, endDate);
                    double total = giftPriceRepository.findOneByName(giftNames[i]).getPrice() * count;

                    subtotal = subtotal - total;
                    if (i == 0) {
                        superRockets.add(total);
                    } else if (i == 1) {
                        rockets.add(total);
                    } else {
                        planes.add(total);
                    }
                }

                others.add(subtotal);
            }
            dates.add(compare);
            flag ++;
        }

        if (type.equals("barrage")) {
            barrages.add(barrage);

        } else {
            Map other = new HashMap();
            superRocket.put("type", "superRocket");
            superRocket.put("data", superRockets);

            rocket.put("type", "rocket");
            rocket.put("data", rockets);

            plane.put("type", "plane");
            plane.put("data", planes);

            other.put("type", "other");
            other.put("data", others);

            barrages.add(superRocket);
            barrages.add(rocket);
            barrages.add(plane);
            barrages.add(other);
        }

        Map result = new HashMap();
        result.put("dates", dates);
        result.put("barrages", barrages);

        return result;
    }

    @RequestMapping(value = "/api/user/{userId}/{platform}/giftData/{monthStr}", method = RequestMethod.GET)
    public ResponseEntity getGiftData(@PathVariable Long userId, @PathVariable String platform, @PathVariable String monthStr) throws ParseException {
        LiveRoom liveRoom= liveRoomRepository.findByUserIdAndPlatform(userId, platform);

        if (liveRoom == null) {
            return new ResponseEntity<>(getNullResult(), HttpStatus.OK);
        }

        String startDateStr, endDateStr;
        if(monthStr.equals("lastMonth")) {
            startDateStr = getStartDate();

            endDateStr = getEndDate();
        } else {
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
            startDateStr = sdf.format(date);
            SimpleDateFormat simpleDateFormatMonth = new SimpleDateFormat("yyyy-MM-dd");
            endDateStr = simpleDateFormatMonth.format(date);
        }

        return new ResponseEntity<>(getDataByDate(startDateStr, endDateStr, "gift", liveRoom.getId()), HttpStatus.OK);
    }

    private Map getNullResult() {
        Map result = new HashMap();
        int[] a = {};
        result.put("dates", a);
        result.put("data", a);

        return result;
    }

    @RequestMapping(value = "/api/user/{userId}/{platform}/{type}/{day}", method = RequestMethod.GET)
    public ResponseEntity getLiveDataForDay(@PathVariable Long userId, @PathVariable String platform, @PathVariable String type, @PathVariable String day) throws ParseException {
        LiveRoom liveRoom = liveRoomRepository.findByUserIdAndPlatform(userId, platform);
        if (liveRoom == null) {
            return new ResponseEntity<>(getNullResult(), HttpStatus.OK);
        }
        String[] times = new String[24];
        List<Integer> data = new ArrayList<>();
        List<Double> rockets = new ArrayList<>();
        List<Double> superRockets = new ArrayList<>();
        List<Double> planes = new ArrayList<>();
        List<Double> others = new ArrayList<>();

        Map barrage = new HashMap();
        Map rocket = new HashMap();
        Map superRocket = new HashMap();
        Map plane = new HashMap();

        for(int i = 0; i < 24; i++) {
            List lives = new ArrayList();
            SimpleDateFormat simpleDateFormat= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            String hour = i + "";
            if (i < 10) {
                hour = "0" + i;
            }

            Date startTime = simpleDateFormat.parse(day + " " + hour + ":00:00");
            Date endTime = simpleDateFormat.parse(day + " " + hour + ":59:59");

            if(type.equals("barrage")) {
                lives = barrageRepository.findAllByLiveRoomIdAndDateBetween(liveRoom.getId(), startTime, endTime);
                barrage.put("type", "barrage");
                data.add(lives.size());
                barrage.put("data", data);
            } else if (type.equals("gift")){
                String[] giftNames = {"超级火箭", "火箭", "飞机"};
                double subtotal = giftRepository.sumGiftTotalPriceDateBetween(liveRoom.getId(), startTime, endTime);

                for (int j = 0; j < giftNames.length; j++) {
                    int count = giftRepository.countAllByLiveRoomIdAndGiftNameAndDateBetween(liveRoom.getId(), giftNames[j], startTime, endTime);
                    double total = giftPriceRepository.findOneByName(giftNames[j]).getPrice() * count;
                    subtotal = subtotal - total;
                    if (j == 0) {
                        superRockets.add(total);
                    } else if (j == 1) {
                        rockets.add(total);
                    } else {
                        planes.add(total);
                    }
                }

                others.add(subtotal);
            }

            times[i] = i + "点";
        }
        List barrages = new ArrayList();


        if (type.equals("barrage")) {
            barrages.add(barrage);

        } else {
            superRocket.put("type", "superRocket");
            superRocket.put("data", superRockets);

            rocket.put("type", "rocket");
            rocket.put("data", rockets);

            plane.put("type", "plane");
            plane.put("data", planes);

            Map other = new HashMap();
            other.put("type", "other");
            other.put("data", others);

            barrages.add(superRocket);
            barrages.add(rocket);
            barrages.add(plane);
            barrages.add(other);
        }

        Map result = new HashMap();
        result.put("dates", times);
        result.put("barrages", barrages);


        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
