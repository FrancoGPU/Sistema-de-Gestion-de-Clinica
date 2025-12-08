import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Servicio {
  titulo: string;
  descripcion: string;
  icono: string;
  id?: string;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [
    {
      titulo: 'Consulta General',
      descripcion: 'Atención médica integral para el diagnóstico y tratamiento de enfermedades comunes.',
      icono: 'fas fa-stethoscope',
      id: 'medicina-general'
    },
    {
      titulo: 'Cardiología',
      descripcion: 'Especialistas en el cuidado del corazón y sistema cardiovascular.',
      icono: 'fas fa-heartbeat',
      id: 'cardiologia'
    },
    {
      titulo: 'Pediatría',
      descripcion: 'Atención médica especializada para bebés, niños y adolescentes.',
      icono: 'fas fa-baby',
      id: 'pediatria'
    },
    {
      titulo: 'Radiología',
      descripcion: 'Estudios de imagen con equipos de última generación.',
      icono: 'fas fa-x-ray'
    },
    {
      titulo: 'Laboratorio',
      descripcion: 'Análisis clínicos completos con resultados rápidos y precisos.',
      icono: 'fas fa-flask'
    },
    {
      titulo: 'Emergencias 24/7',
      descripcion: 'Atención médica de urgencia las 24 horas del día.',
      icono: 'fas fa-ambulance'
    }
  ];

  filteredServicios: Servicio[] = [];
  searchTerm: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.filteredServicios = this.servicios;
    
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'] || '';
      this.filterServicios();
    });
  }

  filterServicios(): void {
    if (!this.searchTerm) {
      this.filteredServicios = this.servicios;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredServicios = this.servicios.filter(s => 
        s.titulo.toLowerCase().includes(term) || 
        s.descripcion.toLowerCase().includes(term)
      );
    }
  }
}
