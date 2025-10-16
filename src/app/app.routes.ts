import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Ruta de Login (pública)
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },

  // Ruta pública (MediCore - para pacientes)
  {
    path: 'MediCore',
    loadComponent: () =>
      import('./pages/MediCore/MediCore.component').then(
        (m) => m.MediCoreComponent
      ),
  },

  // Rutas de Administrador (protegidas - requiere rol administrador)
  {
    path: 'admin',
    canActivate: [authGuard],
    data: { role: 'administrador' },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/Administrador/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'index',
        loadComponent: () =>
          import('./pages/Administrador/index/index.component').then(
            (m) => m.IndexComponent
          ),
      },
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full',
      },
    ],
  },

  // Rutas de Pacientes (protegidas - requiere rol administrador)
  {
    path: 'pacientes',
    canActivate: [authGuard],
    data: { role: 'administrador' },
    children: [
      {
        path: 'lista',
        loadComponent: () =>
          import('./pages/Pacientes/lista/lista.component').then(
            (m) => m.ListaComponent
          ),
      },
      {
        path: 'formulario',
        loadComponent: () =>
          import('./pages/Pacientes/formulario/formulario.component').then(
            (m) => m.FormularioComponent
          ),
      },
      {
        path: 'formulario/:id',
        loadComponent: () =>
          import('./pages/Pacientes/formulario/formulario.component').then(
            (m) => m.FormularioComponent
          ),
      },
      {
        path: '',
        redirectTo: 'lista',
        pathMatch: 'full',
      },
    ],
  },

  // Redirección por defecto
  {
    path: '',
    redirectTo: 'MediCore',
    pathMatch: 'full',
  },

  // Ruta 404 (wildcard)
  {
    path: '**',
    redirectTo: 'MediCore',
  },
];
