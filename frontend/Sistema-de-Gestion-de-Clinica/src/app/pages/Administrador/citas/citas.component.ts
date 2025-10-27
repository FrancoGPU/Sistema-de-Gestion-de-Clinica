import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from '../../../shared/components/admin-header/admin-header.component';
import { CitaService, CitaMedica } from '../../../services/cita.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, AdminHeaderComponent],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css',
})
export class CitasComponent implements OnInit {
  citas: CitaMedica[] = [];
  loading = true;
  error = '';

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.citaService.getCitas().subscribe({
      next: (data: CitaMedica[]) => {
        this.citas = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar las citas';
        this.loading = false;
      }
    });
  }
}
