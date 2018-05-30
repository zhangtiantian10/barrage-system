package com.bishe.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "gift")
public class Gift {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int giftStyle;

    private Long liveRoomId;

    private String sender;

    private Date date;

    private int hits;

    private String giftName;

    public int getHits() {
        return hits;
    }

    public void setHits(int hits) {
        this.hits = hits;
    }

    public Gift() {
    }

    public Gift(int giftStyle, Long liveRoomId, String sender) {
        this.giftStyle = giftStyle;
        this.liveRoomId = liveRoomId;
        this.sender = sender;
    }

    public String getGiftName() {
        return giftName;
    }

    public void setGiftName(String giftName) {
        this.giftName = giftName;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getGiftStyle() {
        return giftStyle;
    }

    public void setGiftStyle(int giftStyle) {
        this.giftStyle = giftStyle;
    }

    public Long getLiveRoomId() {
        return liveRoomId;
    }

    public void setLiveRoomId(Long liveRoomId) {
        this.liveRoomId = liveRoomId;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}
