package com.gox.wargame.controller;

import com.gox.wargame.entity.Batalion;
import com.gox.wargame.repository.BatalionRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@Log
public class PageController {

    @Autowired
    private BatalionRepository batalionRepository;

    @GetMapping
    public String indexPage(Model model){
        List<Batalion> batalions = new ArrayList<>();
        batalionRepository.findAll().forEach(b -> batalions.add(b));
        log.info("Found " + batalions.size() + " batalions in db");
        model.addAttribute("batalions", batalions);
        return "index";
    }

    @GetMapping("/testWs")
    public String webSoecketTestPage(){
        return "testWs";
    }
}
