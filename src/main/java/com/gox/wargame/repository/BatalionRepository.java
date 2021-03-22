package com.gox.wargame.repository;

import com.gox.wargame.entity.Batalion;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BatalionRepository extends CrudRepository<Batalion, UUID> {
}
