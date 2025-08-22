package com.clinica.sistema.controller;

import com.clinica.sistema.entity.Cita;
import com.clinica.sistema.service.CitaService;
import com.clinica.sistema.service.DoctorService;
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
@RequestMapping("/citas")
public class CitaController {
    
    @Autowired
    private CitaService citaService;
    
    @Autowired
    private PacienteService pacienteService;
    
    @Autowired
    private DoctorService doctorService;
    
    @GetMapping
    public String listarCitas(Model model) {
        List<Cita> citas = citaService.findAll();
        model.addAttribute("citas", citas);
        return "citas/lista";
    }
    
    @GetMapping("/hoy")
    public String citasHoy(Model model) {
        List<Cita> citas = citaService.findCitasHoy();
        model.addAttribute("citas", citas);
        model.addAttribute("titulo", "Citas de Hoy");
        return "citas/lista";
    }
    
    @GetMapping("/nueva")
    public String mostrarFormularioNueva(Model model) {
        model.addAttribute("cita", new Cita());
        model.addAttribute("pacientes", pacienteService.findAll());
        model.addAttribute("doctores", doctorService.findAll());
        return "citas/formulario";
    }
    
    @PostMapping("/guardar")
    public String guardarCita(@Valid @ModelAttribute Cita cita, BindingResult result, 
                             RedirectAttributes redirectAttributes, Model model) {
        
        if (result.hasErrors()) {
            model.addAttribute("pacientes", pacienteService.findAll());
            model.addAttribute("doctores", doctorService.findAll());
            return "citas/formulario";
        }
        
        try {
            citaService.save(cita);
            redirectAttributes.addFlashAttribute("mensaje", "Cita guardada exitosamente");
            redirectAttributes.addFlashAttribute("tipoMensaje", "success");
            return "redirect:/citas";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensaje", "Error al guardar la cita");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            return "redirect:/citas/nueva";
        }
    }
    
    @GetMapping("/editar/{id}")
    public String mostrarFormularioEditar(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        Optional<Cita> citaOpt = citaService.findById(id);
        if (citaOpt.isPresent()) {
            model.addAttribute("cita", citaOpt.get());
            model.addAttribute("pacientes", pacienteService.findAll());
            model.addAttribute("doctores", doctorService.findAll());
            return "citas/formulario";
        } else {
            redirectAttributes.addFlashAttribute("mensaje", "Cita no encontrada");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            return "redirect:/citas";
        }
    }
    
    @GetMapping("/ver/{id}")
    public String verCita(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        Optional<Cita> citaOpt = citaService.findById(id);
        if (citaOpt.isPresent()) {
            model.addAttribute("cita", citaOpt.get());
            return "citas/detalle";
        } else {
            redirectAttributes.addFlashAttribute("mensaje", "Cita no encontrada");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            return "redirect:/citas";
        }
    }
    
    @GetMapping("/cancelar/{id}")
    public String cancelarCita(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            citaService.cancelarCita(id);
            redirectAttributes.addFlashAttribute("mensaje", "Cita cancelada exitosamente");
            redirectAttributes.addFlashAttribute("tipoMensaje", "success");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensaje", "Error al cancelar la cita");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
        }
        return "redirect:/citas";
    }
    
    @GetMapping("/confirmar/{id}")
    public String confirmarCita(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            citaService.confirmarCita(id);
            redirectAttributes.addFlashAttribute("mensaje", "Cita confirmada exitosamente");
            redirectAttributes.addFlashAttribute("tipoMensaje", "success");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensaje", "Error al confirmar la cita");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
        }
        return "redirect:/citas";
    }
    
    @GetMapping("/completar/{id}")
    public String completarCita(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            citaService.completarCita(id);
            redirectAttributes.addFlashAttribute("mensaje", "Cita completada exitosamente");
            redirectAttributes.addFlashAttribute("tipoMensaje", "success");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensaje", "Error al completar la cita");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
        }
        return "redirect:/citas";
    }
    
    @GetMapping("/eliminar/{id}")
    public String eliminarCita(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            citaService.deleteById(id);
            redirectAttributes.addFlashAttribute("mensaje", "Cita eliminada exitosamente");
            redirectAttributes.addFlashAttribute("tipoMensaje", "success");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensaje", "Error al eliminar la cita");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
        }
        return "redirect:/citas";
    }
}