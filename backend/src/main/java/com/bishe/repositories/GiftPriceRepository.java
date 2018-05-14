package com.bishe.repositories;

import com.bishe.entities.GiftPrice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GiftPriceRepository extends JpaRepository<GiftPrice,Long> {
    GiftPrice findOneByGiftStyle(int giftStyle);
}
