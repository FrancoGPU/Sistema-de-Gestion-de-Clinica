import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from '../../../shared/components/admin-header/admin-header.component';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, AdminHeaderComponent],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css',
})
export class CitasComponent {}
