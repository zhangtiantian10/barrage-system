package com.bishe.repositories;

import com.bishe.entities.Gift;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GiftRepository extends JpaRepository<Gift,Long> {
}
