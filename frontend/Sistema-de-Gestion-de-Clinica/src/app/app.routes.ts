import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Rutas de Autenticación (públicas)
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/Autenticacion/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/Autenticacion/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
  },

  // Ruta pública (MediCore - página principal con sus páginas hijas)
  {
    path: 'MediCore',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/MediCore/MediCore.component').then(
            (m) => m.MediCoreComponent
          ),
      },
      {
        path: 'servicios',
        loadComponent: () =>
          import('./pages/Pacientes/servicios/servicios.component').then(
            (m) => m.ServiciosComponent
          ),
      },
      {
        path: 'especialidades',
        loadComponent: () =>
          import('./pages/Pacientes/especialidades/especialidades.component').then(
            (m) => m.EspecialidadesComponent
          ),
      },
      {
        path: 'contacto',
        loadComponent: () =>
          import('./pages/Pacientes/contacto/contacto.component').then(
            (m) => m.ContactoComponent
          ),
      },
      {
        path: 'campanias',
        loadComponent: () =>
          import('./pages/Pacientes/campanias/campanias.component').then(
            (m) => m.CampaniasComponent
          ),
      },
      {
        path: 'citas',
        loadComponent: () =>
          import('./pages/Pacientes/citas-publicas/citas-publicas.component').then(
            (m) => m.CitasPublicasComponent
          ),
      },
      {
        path: 'doctores',
        loadComponent: () =>
          import('./pages/Pacientes/doctores-publicos/doctores-publicos.component').then(
            (m) => m.DoctoresPublicosComponent
          ),
      },
    ],
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
        path: 'doctores',
        loadComponent: () =>
          import('./pages/Administrador/doctores/doctores.component').then(
            (m) => m.DoctoresComponent
          ),
      },
      {
        path: 'citas',
        loadComponent: () =>
          import('./pages/Administrador/citas/citas.component').then(
            (m) => m.CitasComponent
          ),
      },
      {
        path: 'pacientes',
        loadComponent: () =>
          import('./pages/Administrador/pacientes/pacientes.component').then(
            (m) => m.PacientesComponent
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
