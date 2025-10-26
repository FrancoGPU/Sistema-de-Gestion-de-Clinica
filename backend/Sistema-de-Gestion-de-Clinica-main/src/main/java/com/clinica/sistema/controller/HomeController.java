package com.clinica.sistema.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    
    @GetMapping("/")
    public String home() {
        return "clientes/index";
    }
    
    @GetMapping("/admin")
    public String admin() {
        return "administrador/index";
    }
    
    @GetMapping("/dashboard")
    public String dashboard() {
        return "administrador/dashboard";
    }
}