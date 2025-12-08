
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../../../shared/components/admin-header/admin-header.component';
import { DoctorService, Doctor, HorarioMedico } from '../../../services/doctor.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-doctores',
  standalone: true,
  imports: [CommonModule, AdminHeaderComponent, FormsModule],
  templateUrl: './doctores.component.html',
  styleUrl: './doctores.component.css',
})
export class DoctoresComponent implements OnInit {
  doctores: Doctor[] = [];
  loading = true;
  error = '';
  
  // Permisos
  isMedico = false;
  currentProfileId: number | undefined;

  // Modal Creación
  showCreateModal = false;
  nuevoDoctor: Partial<Doctor> = {
    nombre: '',
    apellido: '',
    especialidad: '',
    horariosAtencion: '',
    numeroLicencia: '',
    telefono: '',
    email: ''
  };

  // Modal Edición
  modoEdicion = false;
  doctorEditando: Doctor | null = null;

  // Modal Detalles
  doctorSeleccionado: Doctor | null = null;

  // Modal Horarios
  showHorarioModal = false;
  doctorHorario: Doctor | null = null;
  horarios: HorarioMedico[] = [];
  nuevoHorario: Partial<HorarioMedico> = {
    diaSemana: 'MONDAY',
    horaInicio: '09:00',
    horaFin: '17:00',
    duracionCitaMinutos: 30
  };
  diasSemana = [
    { val: 'MONDAY', label: 'Lunes' },
    { val: 'TUESDAY', label: 'Martes' },
    { val: 'WEDNESDAY', label: 'Miércoles' },
    { val: 'THURSDAY', label: 'Jueves' },
    { val: 'FRIDAY', label: 'Viernes' },
    { val: 'SATURDAY', label: 'Sábado' },
    { val: 'SUNDAY', label: 'Domingo' }
  ];

  constructor(private doctorService: DoctorService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isMedico = this.authService.getUserRole() === 'medico';
    this.currentProfileId = this.authService.currentUserValue?.profileId;
    this.cargarDoctores();
  }

  canEdit(doctor: Doctor): boolean {
    if (!this.isMedico) return true; // Admin puede editar todo
    return doctor.idMedico === this.currentProfileId;
  }

  canDelete(): boolean {
    return !this.isMedico; // Médicos no pueden borrar
  }

  canCreate(): boolean {
    return !this.isMedico; // Médicos no pueden crear otros médicos
  }

  cargarDoctores(): void {
    this.loading = true;
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

  abrirModalCrear(): void {
    this.showCreateModal = true;
    this.nuevoDoctor = {
      nombre: '',
      apellido: '',
      especialidad: '',
      horariosAtencion: '',
      numeroLicencia: '',
      telefono: '',
      email: ''
    };
  }

  cerrarModalCrear(): void {
    this.showCreateModal = false;
  }

  crearDoctor(): void {
    this.doctorService.createDoctor(this.nuevoDoctor as Doctor).subscribe({
      next: () => {
        alert('Doctor creado exitosamente');
        this.cargarDoctores();
        this.cerrarModalCrear();
      },
      error: (err) => {
        alert('Error al crear el doctor');
        console.error(err);
      }
    });
  }

  abrirModalEditar(doctor: Doctor): void {
    this.modoEdicion = true;
    this.doctorEditando = { ...doctor };
  }

  cerrarModalEditar(): void {
    this.modoEdicion = false;
    this.doctorEditando = null;
  }

  guardarEdicion(): void {
    if (!this.doctorEditando) return;
    this.doctorService.updateDoctor(this.doctorEditando.idMedico, this.doctorEditando).subscribe({
      next: () => {
        alert('Doctor actualizado exitosamente');
        this.cargarDoctores();
        this.cerrarModalEditar();
      },
      error: (err) => {
        alert('Error al actualizar el doctor');
        console.error(err);
      }
    });
  }

  eliminarDoctor(doctor: Doctor): void {
    if (confirm(`¿Estás seguro de eliminar al doctor ${doctor.nombre}?`)) {
      this.doctorService.deleteDoctor(doctor.idMedico).subscribe({
        next: () => {
          alert('Doctor eliminado exitosamente');
          this.cargarDoctores();
        },
        error: (err) => {
          alert('Error al eliminar el doctor');
          console.error(err);
        }
      });
    }
  }

  verDetalles(doctor: Doctor): void {
    this.doctorSeleccionado = doctor;
  }

  cerrarDetalles(): void {
    this.doctorSeleccionado = null;
  }

  // Gestión de Horarios
  abrirModalHorario(doctor: Doctor): void {
    this.doctorHorario = doctor;
    this.showHorarioModal = true;
    this.cargarHorarios(doctor.idMedico);
  }

  cerrarModalHorario(): void {
    this.showHorarioModal = false;
    this.doctorHorario = null;
    this.horarios = [];
  }

  cargarHorarios(idMedico: number): void {
    this.doctorService.getHorarios(idMedico).subscribe({
      next: (data) => {
        this.horarios = data;
      },
      error: (err) => console.error(err)
    });
  }

  agregarHorario(): void {
    if (!this.doctorHorario) return;
    
    // Validar formato de hora (asegurar segundos)
    let inicio = this.nuevoHorario.horaInicio;
    let fin = this.nuevoHorario.horaFin;
    
    if (inicio && inicio.length === 5) inicio += ':00';
    if (fin && fin.length === 5) fin += ':00';

    const horario: HorarioMedico = {
      diaSemana: this.nuevoHorario.diaSemana!,
      horaInicio: inicio!,
      horaFin: fin!,
      duracionCitaMinutos: this.nuevoHorario.duracionCitaMinutos!
    };

    this.doctorService.addHorario(this.doctorHorario.idMedico, horario).subscribe({
      next: (nuevo) => {
        this.horarios.push(nuevo);
        // Reset form defaults
        this.nuevoHorario.diaSemana = 'MONDAY';
      },
      error: (err) => alert('Error al agregar horario. Verifica que no se solape.')
    });
  }

  eliminarHorario(id: number): void {
    if(confirm('¿Eliminar este horario?')) {
      this.doctorService.deleteHorario(id).subscribe({
        next: () => {
          this.horarios = this.horarios.filter(h => h.idHorario !== id);
        },
        error: (err) => alert('Error al eliminar horario')
      });
    }
  }

  getDiaLabel(val: string): string {
    return this.diasSemana.find(d => d.val === val)?.label || val;
  }
}
