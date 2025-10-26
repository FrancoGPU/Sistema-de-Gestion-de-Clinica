import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Doctor {
  id: number;
  nombre: string;
  especialidad: string;
  descripcion: string;
  universidad: string;
  certificacion: string;
  horario: string;
}

@Component({
  selector: 'app-doctores-publicos',
  imports: [CommonModule],
  templateUrl: './doctores-publicos.component.html',
  styleUrl: './doctores-publicos.component.css'
})
export class DoctoresPublicosComponent {
  doctores: Doctor[] = [
    {
      id: 1,
      nombre: 'Dr. Carlos Mendoza',
      especialidad: 'Cardiólogo',
      descripcion: 'Especialista en cardiología con 15 años de experiencia. Graduado de la Universidad Nacional Mayor de San Marcos.',
      universidad: 'UNMSM - Cardiología',
      certificacion: 'Certificado en Ecocardiografía',
      horario: 'Lun - Vie: 8:00 - 16:00'
    },
    {
      id: 2,
      nombre: 'Dra. Ana Rodríguez',
      especialidad: 'Pediatra',
      descripcion: 'Especialista en pediatría con enfoque en cuidados neonatales. Comprometida con la salud infantil integral.',
      universidad: 'UPCH - Pediatría',
      certificacion: 'Certificada en Neonatología',
      horario: 'Lun - Sáb: 9:00 - 17:00'
    },
    {
      id: 3,
      nombre: 'Dr. Luis García',
      especialidad: 'Traumatólogo',
      descripcion: 'Especialista en traumatología y cirugía ortopédica. Experto en artroscopia y medicina deportiva.',
      universidad: 'UNMSM - Traumatología',
      certificacion: 'Especialista en Artroscopia',
      horario: 'Mar - Sáb: 10:00 - 18:00'
    },
    {
      id: 4,
      nombre: 'Dra. María Santos',
      especialidad: 'Ginecóloga',
      descripcion: 'Especialista en ginecología y obstetricia con enfoque en salud reproductiva y planificación familiar.',
      universidad: 'UPCH - Ginecología',
      certificacion: 'Certificada en Ecografía 4D',
      horario: 'Lun - Vie: 8:00 - 16:00'
    },
    {
      id: 5,
      nombre: 'Dr. Roberto Vega',
      especialidad: 'Oftalmólogo',
      descripcion: 'Especialista en oftalmología con experiencia en cirugía de cataratas y tratamientos de retina.',
      universidad: 'UNMSM - Oftalmología',
      certificacion: 'Cirugía de Cataratas',
      horario: 'Mié - Dom: 9:00 - 17:00'
    },
    {
      id: 6,
      nombre: 'Dra. Carmen López',
      especialidad: 'Neuróloga',
      descripcion: 'Especialista en neurología con enfoque en trastornos del movimiento y enfermedades neurodegenerativas.',
      universidad: 'UPCH - Neurología',
      certificacion: 'Especialista en Parkinson',
      horario: 'Lun - Jue: 10:00 - 18:00'
    }
  ];

  constructor(private router: Router) {}

  agendarCita(doctor: Doctor) {
    // Redirigir a la página de citas
    this.router.navigate(['/MediCore/citas']);
  }
}
