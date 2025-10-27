
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from '../../../shared/components/admin-header/admin-header.component';
import { DoctorService, Doctor } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctores',
  standalone: true,
  imports: [CommonModule, AdminHeaderComponent],
  templateUrl: './doctores.component.html',
  styleUrl: './doctores.component.css',
})
export class DoctoresComponent implements OnInit {
  doctores: Doctor[] = [];
  loading = true;
  error = '';

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService.getDoctores().subscribe({
      next: (data) => {
        this.doctores = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los doctores';
        this.loading = false;
      }
    });
  }
}
