import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  formData = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    dni: '',
    fechaNacimiento: '',
    password: '',
    confirmPassword: '',
    aceptaTerminos: false
  };
  loading = false;
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.formData).subscribe(result => {
      this.loading = false;
      if (result.success) {
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = result.message || 'Error al registrar';
        alert(this.errorMessage);
      }
    });
  }
}
