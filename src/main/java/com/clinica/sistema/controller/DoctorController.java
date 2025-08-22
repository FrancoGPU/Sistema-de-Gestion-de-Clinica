package com.clinica.sistema.controller;

import com.clinica.sistema.entity.Doctor;
import com.clinica.sistema.service.DoctorService;
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
@RequestMapping("/doctores")
public class DoctorController {
    
    @Autowired
    private DoctorService doctorService;
    
    @GetMapping
    public String listarDoctores(@RequestParam(value = "busqueda", required = false) String busqueda, Model model) {
        List<Doctor> doctores = doctorService.buscarDoctores(busqueda);
        model.addAttribute("doctores", doctores);
        model.addAttribute("busqueda", busqueda);
        model.addAttribute("especializaciones", doctorService.findAllEspecializaciones());
        return "doctores/lista";
    }
    
    @GetMapping("/nuevo")
    public String mostrarFormularioNuevo(Model model) {
        model.addAttribute("doctor", new Doctor());
        return "doctores/formulario";
    }
    
    @PostMapping("/guardar")
    public String guardarDoctor(@Valid @ModelAttribute Doctor doctor, BindingResult result, 
                               RedirectAttributes redirectAttributes, Model model) {
        
        // Validar email único
        if (doctor.getEmail() != null && !doctorService.isEmailAvailable(doctor.getEmail(), doctor.getId())) {
            result.rejectValue("email", "error.doctor", "El email ya está en uso");
        }
        
        // Validar número de licencia único
        if (doctor.getNumeroLicencia() != null && !doctorService.isNumeroLicenciaAvailable(doctor.getNumeroLicencia(), doctor.getId())) {
            result.rejectValue("numeroLicencia", "error.doctor", "El número de licencia ya está en uso");
        }
        
        if (result.hasErrors()) {
            return "doctores/formulario";
        }
        
        try {
            doctorService.save(doctor);
            redirectAttributes.addFlashAttribute("mensaje", "Doctor guardado exitosamente");
            redirectAttributes.addFlashAttribute("tipoMensaje", "success");
            return "redirect:/doctores";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensaje", "Error al guardar el doctor");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            return "redirect:/doctores/nuevo";
        }
    }
    
    @GetMapping("/editar/{id}")
    public String mostrarFormularioEditar(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        Optional<Doctor> doctorOpt = doctorService.findById(id);
        if (doctorOpt.isPresent()) {
            model.addAttribute("doctor", doctorOpt.get());
            return "doctores/formulario";
        } else {
            redirectAttributes.addFlashAttribute("mensaje", "Doctor no encontrado");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            return "redirect:/doctores";
        }
    }
    
    @GetMapping("/ver/{id}")
    public String verDoctor(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        Optional<Doctor> doctorOpt = doctorService.findById(id);
        if (doctorOpt.isPresent()) {
            model.addAttribute("doctor", doctorOpt.get());
            return "doctores/detalle";
        } else {
            redirectAttributes.addFlashAttribute("mensaje", "Doctor no encontrado");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
            return "redirect:/doctores";
        }
    }
    
    @GetMapping("/eliminar/{id}")
    public String eliminarDoctor(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            doctorService.deleteById(id);
            redirectAttributes.addFlashAttribute("mensaje", "Doctor eliminado exitosamente");
            redirectAttributes.addFlashAttribute("tipoMensaje", "success");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensaje", "Error al eliminar el doctor");
            redirectAttributes.addFlashAttribute("tipoMensaje", "error");
        }
        return "redirect:/doctores";
    }
}