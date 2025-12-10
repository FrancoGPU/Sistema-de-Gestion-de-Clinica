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
        path: 'mis-mensajes',
        loadComponent: () =>
          import('./pages/Pacientes/mis-mensajes/mis-mensajes.component').then(
            (m) => m.MisMensajesComponent
          ),
      },
      {
        path: 'historial',
        loadComponent: () =>
          import('./pages/Pacientes/historial/historial.component').then(
            (m) => m.HistorialComponent
          ),
      },
      {
        path: 'index',
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
        path: 'mis-citas',
        loadComponent: () =>
          import('./pages/Pacientes/mis-citas/mis-citas.component').then(
            (m) => m.MisCitasComponent
          ),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./pages/Pacientes/perfil/perfil.component').then(
            (m) => m.PerfilComponent
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

  // Rutas de Administrador (protegidas - requiere rol administrador o medico)
  {
    path: 'admin',
    canActivate: [authGuard],
    data: { roles: ['administrador', 'medico'] },
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
        redirectTo: 'dashboard',
        pathMatch: 'full'
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
        path: 'campanias',
        loadComponent: () =>
          import('./pages/Administrador/campanias/admin-campanias.component').then(
            (m) => m.AdminCampaniasComponent
          ),
      },
      {
        path: 'mensajes',
        loadComponent: () =>
          import('./pages/Administrador/mensajes/mensajes.component').then(
            (m) => m.MensajesComponent
          ),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },

  // Rutas de Pacientes (protegidas - requiere rol administrador)
  {
    path: 'pacientes',
    canActivate: [authGuard],
    data: { roles: ['administrador'] },
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

  // Rutas de Médicos
  {
    path: 'medico',
    canActivate: [authGuard],
    data: { roles: ['medico'] },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/Medico/dashboard/dashboard-medico.component').then(m => m.DashboardMedicoComponent)
      },
      {
        path: 'atencion/:id',
        loadComponent: () => import('./pages/Medico/atencion/atencion-cita.component').then(m => m.AtencionCitaComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // Ruta de demostración del sistema multiventana
  {
    path: 'multiventana-demo',
    loadComponent: () => 
      import('./components/multiventana-demo/multiventana-demo.component').then(m => m.MultiventanaDemoComponent)
  },

  // Rutas para ventanas independientes (multiventana)
  {
    path: 'window',
    children: [
      {
        path: 'citas',
        loadComponent: () => 
          import('./components/window-citas/window-citas.component').then(m => m.WindowCitasComponent)
      },
      {
        path: 'historia-clinica',
        loadComponent: () => 
          import('./components/window-historia-clinica/window-historia-clinica.component').then(m => m.WindowHistoriaClinicaComponent)
      },
      {
        path: 'historia-clinica/:pacienteId',
        loadComponent: () => 
          import('./components/window-historia-clinica/window-historia-clinica.component').then(m => m.WindowHistoriaClinicaComponent)
      },
      {
        path: 'paciente',
        loadComponent: () => 
          import('./components/window-paciente/window-paciente.component').then(m => m.WindowPacienteComponent)
      },
      {
        path: 'paciente/:pacienteId',
        loadComponent: () => 
          import('./components/window-paciente/window-paciente.component').then(m => m.WindowPacienteComponent)
      }
    ]
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
