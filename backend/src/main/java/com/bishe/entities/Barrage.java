package com.bishe.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "barrage")
public class Barrage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private Long roomId;

    @NotNull
    private String sender;

    @NotNull
    private String content;

    @NotNull
    private Long gift;

    public Barrage() {
    }

    public Barrage(Long roomId, String sender, String content, Long gift) {
        this.roomId = roomId;
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

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
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
