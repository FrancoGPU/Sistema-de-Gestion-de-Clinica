import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService, Doctor } from '../../../services/doctor.service';
import { CitaService } from '../../../services/cita.service';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-citas-publicas',
  imports: [CommonModule, FormsModule],
  templateUrl: './citas-publicas.component.html',
  styleUrl: './citas-publicas.component.css'
})
export class CitasPublicasComponent implements OnInit {
  formData = {
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    email: '',
    medicoId: '',
    fecha: '',
    hora: '',
    motivo: ''
  };

  minDate: string = '';
  doctores: Doctor[] = [];
  loading = false;
  selectedDoctorId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private citaService: CitaService,
    private pacienteService: PacienteService
  ) {}

  ngOnInit() {
    // Configurar fecha mínima (hoy)
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    // Obtener lista de doctores
    this.doctorService.getDoctores().subscribe({
      next: (data: Doctor[]) => {
        this.doctores = data;
      },
      error: (err: any) => {
        console.error('Error al cargar doctores', err);
      }
    });

    // Verificar si viene el ID del doctor desde la página de doctores
    this.route.queryParams.subscribe(params => {
      if (params['doctorId']) {
        this.selectedDoctorId = params['doctorId'];
        this.formData.medicoId = params['doctorId'];
      }
    });
  }

  onSubmit() {
    this.loading = true;

    // Primero buscar si el paciente ya existe por DNI
    this.pacienteService.getPacienteByDni(this.formData.dni).subscribe({
      next: (pacienteExistente: any) => {
        // El paciente ya existe, usar su ID para crear la cita
        this.crearCita(pacienteExistente.idPaciente);
      },
      error: (err: any) => {
        // Si retorna 404, el paciente no existe, entonces crearlo
        if (err.status === 404) {
          const pacienteData = {
            nombre: this.formData.nombre,
            apellido: this.formData.apellido,
            dni: this.formData.dni,
            numeroTelefono: this.formData.telefono,
            correoElectronico: this.formData.email
          };

          this.pacienteService.createPaciente(pacienteData as any).subscribe({
            next: (paciente: any) => {
              this.crearCita(paciente.idPaciente);
            },
            error: (err: any) => {
              this.loading = false;
              alert('Error al registrar el paciente. Por favor intenta nuevamente.');
              console.error('Error al crear paciente', err);
            }
          });
        } else {
          this.loading = false;
          alert('Error al verificar el paciente. Por favor intenta nuevamente.');
          console.error('Error al buscar paciente', err);
        }
      }
    });
  }

  crearCita(idPaciente: number) {
    const fechaHora = `${this.formData.fecha}T${this.formData.hora}:00`;
    
    const citaData = {
      paciente: {
        idPaciente: idPaciente
      },
      medico: {
        idMedico: parseInt(this.formData.medicoId)
      },
      fechaHora: fechaHora,
      motivo: this.formData.motivo,
      estado: 'PROGRAMADA'
    };

    console.log('Datos de la cita a enviar:', JSON.stringify(citaData, null, 2));

    this.citaService.createCita(citaData).subscribe({
      next: (cita: any) => {
        this.loading = false;
        alert('¡Cita agendada exitosamente! Te contactaremos para confirmar.');
        this.resetForm();
        this.router.navigate(['/MediCore']);
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Error completo al crear cita:', err);
        console.error('Respuesta del servidor:', err.error);
        alert('Error al agendar la cita. Por favor intenta nuevamente.');
      }
    });
  }

  resetForm() {
    this.formData = {
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
      email: '',
      medicoId: this.selectedDoctorId || '',
      fecha: '',
      hora: '',
      motivo: ''
    };
  }
}
