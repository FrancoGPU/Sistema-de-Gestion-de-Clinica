import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit() {
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Registro:', this.formData);
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    this.router.navigate(['/login']);
  }
}
