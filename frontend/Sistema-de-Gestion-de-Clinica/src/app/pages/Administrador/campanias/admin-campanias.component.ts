import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaniaService, CampaniaSalud } from '../../../services/campania.service';
import { AdminHeaderComponent } from '../../../shared/components/admin-header/admin-header.component';

@Component({
  selector: 'app-admin-campanias',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminHeaderComponent],
  templateUrl: './admin-campanias.component.html',
  styleUrl: './admin-campanias.component.css'
})
export class AdminCampaniasComponent implements OnInit {
  campanias: CampaniaSalud[] = [];
  loading = true;
  error = '';
  campaniaSeleccionada: CampaniaSalud | null = null;

  constructor(private campaniaService: CampaniaService) {}

  ngOnInit(): void {
    this.cargarCampanias();
  }

  cargarCampanias() {
    this.loading = true;
    this.campaniaService.getCampanias().subscribe({
      next: (data) => {
        this.campanias = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar campañas';
        this.loading = false;
        console.error(err);
      }
    });
  }

  verDetalles(campania: CampaniaSalud) {
    this.campaniaSeleccionada = campania;
  }

  cerrarDetalles() {
    this.campaniaSeleccionada = null;
  }

  // Métodos placeholder para futuras implementaciones
  abrirModalCrear() {
    // Implementar creación
    alert('Funcionalidad de crear campaña pendiente de implementación');
  }

  abrirModalEditar(campania: CampaniaSalud) {
    // Implementar edición
    alert('Funcionalidad de editar campaña pendiente de implementación');
  }

  eliminarCampania(campania: CampaniaSalud) {
    if(confirm('¿Está seguro de eliminar esta campaña?')) {
        this.campaniaService.deleteCampania(campania.idCampania).subscribe({
            next: () => {
                this.cargarCampanias();
            },
            error: (err) => alert('Error al eliminar')
        });
    }
  }
}
