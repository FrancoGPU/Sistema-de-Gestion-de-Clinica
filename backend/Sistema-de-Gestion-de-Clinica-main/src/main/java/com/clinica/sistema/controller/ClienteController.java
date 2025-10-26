package com.clinica.sistema.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/clientes")
public class ClienteController {
    
    @GetMapping
    public String mostrarPaginaClientes() {
        return "clientes/index";
    }
    
    @GetMapping("/inicio")
    public String inicio() {
        return "clientes/index";
    }
}