import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';
import { DoctorService } from '../../../services/doctor.service';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-stats-cards',
  imports: [RouterLink],
  templateUrl: './stats-cards.component.html',
  styleUrl: './stats-cards.component.css',
  encapsulation: ViewEncapsulation.None
})
export class StatsCardsComponent implements OnInit {
  totalPacientes: number = 0;
  totalDoctores: number = 0;
  citasHoy: number = 0;
  totalCitas: number = 0;

  constructor(
    private pacienteService: PacienteService,
    private doctorService: DoctorService,
    private citaService: CitaService
  ) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    // Cargar total de pacientes
    this.pacienteService.getPacientes().subscribe({
      next: (data) => this.totalPacientes = data.length,
      error: (err) => console.error('Error cargando pacientes', err)
    });

    // Cargar total de doctores
    this.doctorService.getDoctores().subscribe({
      next: (data) => this.totalDoctores = data.length,
      error: (err) => console.error('Error cargando doctores', err)
    });

    // Cargar total de citas
    this.citaService.getCitas().subscribe({
      next: (data) => this.totalCitas = data.length,
      error: (err) => console.error('Error cargando citas', err)
    });

    // Cargar citas de hoy
    this.citaService.getCitasHoy().subscribe({
      next: (data) => this.citasHoy = data.length,
      error: (err) => console.error('Error cargando citas de hoy', err)
    });
  }
}
