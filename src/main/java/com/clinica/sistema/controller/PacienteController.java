package com.clinica.sistema.controller;

import com.clinica.sistema.entity.Paciente;
import com.clinica.sistema.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/pacientes")
public class PacienteController {
    
    @Autowired
    private PacienteService pacienteService;
    
    @GetMapping
    public String listarPacientes(@RequestParam(value = "busqueda", required = false) String busqueda, Model model) {
        List<Paciente> pacientes = pacienteService.buscarPacientes(busqueda);
        model.addAttribute("pacientes", pacientes);
        model.addAttribute("busqueda", busqueda);
        return "pacientes/lista";
    }
    
    @GetMapping("/nuevo")
    public String mostrarFormularioNuevo(Model model) {
        model.addAttribute("paciente", new Paciente());
        return "pacientes/formulario";
    }
    
    @PostMapping("/guardar")
    public String guardarPaciente(@Valid @ModelAttribute Paciente paciente, BindingResult result, 
                                 RedirectAttributes redirectAttributes, Model model) {
        
        // Validar email único
        if (paciente.getEmail() != null && !pacienteService.isEmailAvailable(paciente.getEmail(), paciente.getId())) {
            result.rejectValue("email", "error.paciente", "El email ya está en uso");
        }
        
        // Validar DNI único
        if (paciente.getDni() != null && !pacienteService.isDniAvailable(paciente.getDni(), paciente.getId())) {
            result.rejectValue("dni", "error.paciente", "El DNI ya está en uso");
        }
        
        if (result.hasErrors()) {
            return "pacientes/formulario";
        }
        
        try {
            pacienteService.save(paciente);
            redirectAttributes.addFlashAttribute("mensaje", "Paciente guardado exitosamente");
            redirectAttributes.addFlashAttribute("tipoMensaje", "success");
            return "redirect:/pacientes";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensaje", "Error al guardar el paciente");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            return "redirect:/pacientes/nuevo";
        }
    }
    
    @GetMapping("/editar/{id}")
    public String mostrarFormularioEditar(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        Optional<Paciente> pacienteOpt = pacienteService.findById(id);
        if (pacienteOpt.isPresent()) {
            model.addAttribute("paciente", pacienteOpt.get());
            return "pacientes/formulario";
        } else {
            redirectAttributes.addFlashAttribute("mensaje", "Paciente no encontrado");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            return "redirect:/pacientes";
        }
    }
    
    @GetMapping("/ver/{id}")
    public String verPaciente(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        Optional<Paciente> pacienteOpt = pacienteService.findById(id);
        if (pacienteOpt.isPresent()) {
            model.addAttribute("paciente", pacienteOpt.get());
            return "pacientes/detalle";
        } else {
            redirectAttributes.addFlashAttribute("mensaje", "Paciente no encontrado");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            return "redirect:/pacientes";
        }
    }
    
    @GetMapping("/eliminar/{id}")
    public String eliminarPaciente(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            pacienteService.deleteById(id);
            redirectAttributes.addFlashAttribute("mensaje", "Paciente eliminado exitosamente");
            redirectAttributes.addFlashAttribute("tipoMensaje", "success");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensaje", "Error al eliminar el paciente");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
        }
        return "redirect:/pacientes";
    }
}