import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DoctorService, Doctor } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctores-publicos',
  imports: [CommonModule],
  templateUrl: './doctores-publicos.component.html',
  styleUrl: './doctores-publicos.component.css'
})
export class DoctoresPublicosComponent implements OnInit {
  doctores: Doctor[] = [];
  loading = true;
  error = '';

  constructor(
    private router: Router,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.doctorService.getDoctores().subscribe({
      next: (data: Doctor[]) => {
        this.doctores = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar los doctores';
        this.loading = false;
      }
    });
  }

  agendarCita(doctor: Doctor) {
    // Redirigir a la página de citas con el ID del doctor
    this.router.navigate(['/MediCore/citas'], { 
      queryParams: { doctorId: doctor.idMedico } 
    });
  }
}
