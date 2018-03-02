package com.bishe.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "barrage")
public class Barrage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long liveRoomId;

    @NotNull
    private String sender;

    @NotNull
    private String content;

    private Date date;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    private Long gift;

    public Barrage() {
    }

    public Barrage(Long liveRoomId, String sender, String content, Long gift) {
        this.liveRoomId = liveRoomId;
        this.sender = sender;
        this.content = content;
        this.gift = gift;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getGift() {
        return gift;
    }

    public void setGift(Long gift) {
        this.gift = gift;
    }
}
