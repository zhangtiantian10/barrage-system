package com.bishe.entities;

public class CountBarrageAndUser {
    private Long userId;
    private Long liveRoomId;
    private String name;
    private String userName;
    private String platform;
    private Long roomId;
    private Long total;
    private String avatar;
    private Double giftTotal;

    public CountBarrageAndUser() {
    }

    public CountBarrageAndUser(Long userId, Long liveRoomId, String avatar, String name, String userName, String platform, Long roomId, Long total) {
        this.userId = userId;
        this.liveRoomId = liveRoomId;
        this.name = name;
        this.userName = userName;
        this.platform = platform;
        this.roomId = roomId;
        this.total = total;
        this.avatar = avatar;
    }

    public CountBarrageAndUser(Long userId, Long liveRoomId, String avatar, String name, String userName, String platform, Long roomId, Double giftTotal) {
        this.userId = userId;
        this.liveRoomId = liveRoomId;
        this.name = name;
        this.userName = userName;
        this.platform = platform;
        this.roomId = roomId;
        this.avatar = avatar;
        this.giftTotal = (double)Math.round(giftTotal * 100) / 100;
    }

    public Double getGiftTotal() {
        return giftTotal;
    }

    public void setGiftTotal(Double giftTotal) {
        this.giftTotal = giftTotal;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getLiveRoomId() {
        return liveRoomId;
    }

    public void setLiveRoomId(Long liveRoomId) {
        this.liveRoomId = liveRoomId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }
}
