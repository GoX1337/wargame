package com.gox.wargame.component;

import com.gox.wargame.entity.Batalion;
import com.gox.wargame.repository.BatalionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class BatalionCommandLineRunner implements CommandLineRunner {

    @Autowired
    private BatalionRepository batalionRepository;

    @Override
    public void run(String... args) throws Exception {
        batalionRepository.save(new Batalion(0, 0));
        batalionRepository.save(new Batalion(230, 0));
        batalionRepository.save(new Batalion(128, 145));
    }
}