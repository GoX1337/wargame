package com.gox.wargame.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping
    public String indexPage(){
        return "index";
    }

    @GetMapping("/testWs")
    public String webSoecketTestPage(){
        return "testWs";
    }
}
