import {
  AuthService
} from "./chunk-6JYT5V5N.js";
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-DMXX7ROZ.js";
import {
  CommonModule,
  NgIf,
  isPlatformBrowser
} from "./chunk-D5MRJCXJ.js";
import {
  Component,
  Inject,
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
  filter,
  inject,
  provideZoneChangeDetection,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-AR7JWTXA.js";

// src/app/guards/auth.guard.ts
var authGuard = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    const requiredRole = route.data["role"];
    if (requiredRole) {
      const userRole = authService.getUserRole();
      if (userRole === requiredRole) {
        return true;
      } else {
        if (userRole === "administrador") {
          router.navigate(["/admin/index"]);
        } else if (userRole === "paciente") {
          router.navigate(["/MediCore"]);
        }
        return false;
      }
    }
    return true;
  }
  router.navigate(["/login"]);
  return false;
};

// src/app/app.routes.ts
var routes = [
  // Rutas de Autenticación (públicas)
  {
    path: "login",
    loadComponent: () => import("./chunk-4NHAMKPI.js").then((m) => m.LoginComponent)
  },
  {
    path: "registro",
    loadComponent: () => import("./chunk-DXOCOYYI.js").then((m) => m.RegistroComponent)
  },
  // Ruta pública (MediCore - página principal)
  {
    path: "MediCore",
    loadComponent: () => import("./chunk-U7IONLMS.js").then((m) => m.MediCoreComponent)
  },
  // Rutas públicas - páginas de información para pacientes
  {
    path: "servicios",
    loadComponent: () => import("./chunk-QVBJFQHY.js").then((m) => m.ServiciosComponent)
  },
  {
    path: "especialidades",
    loadComponent: () => import("./chunk-Y4MJUQGA.js").then((m) => m.EspecialidadesComponent)
  },
  {
    path: "contacto",
    loadComponent: () => import("./chunk-QNTL4HCO.js").then((m) => m.ContactoComponent)
  },
  {
    path: "campanias",
    loadComponent: () => import("./chunk-R5AQNNOE.js").then((m) => m.CampaniasComponent)
  },
  // Rutas de Administrador (protegidas - requiere rol administrador)
  {
    path: "admin",
    canActivate: [authGuard],
    data: { role: "administrador" },
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-APJFL4EG.js").then((m) => m.DashboardComponent)
      },
      {
        path: "index",
        loadComponent: () => import("./chunk-6MSUFJ35.js").then((m) => m.IndexComponent)
      },
      {
        path: "doctores",
        loadComponent: () => import("./chunk-BHSE44PU.js").then((m) => m.DoctoresComponent)
      },
      {
        path: "citas",
        loadComponent: () => import("./chunk-ASRLF7MY.js").then((m) => m.CitasComponent)
      },
      {
        path: "",
        redirectTo: "index",
        pathMatch: "full"
      }
    ]
  },
  // Rutas de Pacientes (protegidas - requiere rol administrador)
  {
    path: "pacientes",
    canActivate: [authGuard],
    data: { role: "administrador" },
    children: [
      {
        path: "lista",
        loadComponent: () => import("./chunk-QYAE7JJH.js").then((m) => m.ListaComponent)
      },
      {
        path: "formulario",
        loadComponent: () => import("./chunk-BDYCMFVD.js").then((m) => m.FormularioComponent)
      },
      {
        path: "formulario/:id",
        loadComponent: () => import("./chunk-BDYCMFVD.js").then((m) => m.FormularioComponent)
      },
      {
        path: "",
        redirectTo: "lista",
        pathMatch: "full"
      }
    ]
  },
  // Redirección por defecto
  {
    path: "",
    redirectTo: "MediCore",
    pathMatch: "full"
  },
  // Ruta 404 (wildcard)
  {
    path: "**",
    redirectTo: "MediCore"
  }
];

// src/app/app.config.ts
var appConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};

// src/app/shared/components/header/header.component.ts
function HeaderComponent_ng_container_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "li", 43)(2, "div", 44);
    \u0275\u0275element(3, "i", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 46)(5, "span", 47);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 48);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "li");
    \u0275\u0275element(10, "hr", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "li")(12, "a", 50);
    \u0275\u0275listener("click", function HeaderComponent_ng_container_35_Template_a_click_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.preventDefault());
    });
    \u0275\u0275element(13, "i", 51);
    \u0275\u0275text(14, "Mi Perfil ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "li")(16, "a", 50);
    \u0275\u0275listener("click", function HeaderComponent_ng_container_35_Template_a_click_16_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.preventDefault());
    });
    \u0275\u0275element(17, "i", 52);
    \u0275\u0275text(18, "Configuraci\xF3n ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "li");
    \u0275\u0275element(20, "hr", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "li")(22, "a", 53);
    \u0275\u0275listener("click", function HeaderComponent_ng_container_35_Template_a_click_22_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.logout());
    });
    \u0275\u0275element(23, "i", 54);
    \u0275\u0275text(24, "Cerrar Sesi\xF3n ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275classProp("fa-user-shield", ctx_r1.userRole === "Administrador")("fa-user", ctx_r1.userRole === "Paciente");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.userName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.userRole);
  }
}
function HeaderComponent_ng_container_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "li")(2, "a", 50);
    \u0275\u0275listener("click", function HeaderComponent_ng_container_36_Template_a_click_2_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.navigateToLogin());
    });
    \u0275\u0275element(3, "i", 55);
    \u0275\u0275text(4, "Iniciar Sesi\xF3n ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "li")(6, "a", 50);
    \u0275\u0275listener("click", function HeaderComponent_ng_container_36_Template_a_click_6_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.navigateToRegister());
    });
    \u0275\u0275element(7, "i", 56);
    \u0275\u0275text(8, "Registrarse ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "li");
    \u0275\u0275element(10, "hr", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "li")(12, "a", 50);
    \u0275\u0275listener("click", function HeaderComponent_ng_container_36_Template_a_click_12_listener($event) {
      \u0275\u0275restoreView(_r3);
      return \u0275\u0275resetView($event.preventDefault());
    });
    \u0275\u0275element(13, "i", 57);
    \u0275\u0275text(14, "Ayuda ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
}
var HeaderComponent = class _HeaderComponent {
  authService;
  router;
  isAuthenticated = false;
  userName = "";
  userRole = "";
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  ngOnInit() {
    this.updateAuthStatus();
    this.authService.currentUser.subscribe((user) => {
      this.updateAuthStatus();
    });
  }
  updateAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.userName = this.authService.getUserName();
      const role = this.authService.getUserRole();
      this.userRole = role === "administrador" ? "Administrador" : "Paciente";
    }
  }
  navigateToLogin() {
    this.router.navigate(["/login"]);
  }
  navigateToRegister() {
    this.router.navigate(["/registro"]);
  }
  logout() {
    if (confirm("\xBFEst\xE1 seguro que desea cerrar sesi\xF3n?")) {
      this.authService.logout();
    }
  }
  static \u0275fac = function HeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HeaderComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], decls: 60, vars: 3, consts: [[1, "header-light", "medical-header"], [1, "navbar", "navbar-expand-lg"], [1, "container-fluid", "px-4"], ["href", "#", 1, "navbar-brand", "d-flex", "align-items-center"], [1, "logo-container", "me-2"], ["src", "/assets/images/MediCore.png", "alt", "MediCore Logo", 1, "logo-image"], [1, "brand-text"], ["type", "button", "data-bs-toggle", "collapse", "data-bs-target", "#navbarContent", "aria-controls", "navbarContent", "aria-expanded", "false", "aria-label", "Toggle navigation", 1, "navbar-toggler"], [1, "navbar-toggler-icon"], ["id", "navbarContent", 1, "collapse", "navbar-collapse"], [1, "navbar-nav", "me-auto", "mb-2", "mb-lg-0"], [1, "nav-item"], ["routerLink", "/servicios", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/especialidades", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/campanias", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/contacto", "routerLinkActive", "active", 1, "nav-link"], [1, "d-flex", "align-items-center", "header-controls"], [1, "search-container", "me-3"], ["type", "search", "placeholder", "Buscar servicios...", "aria-label", "Search", 1, "form-control", "search-input"], [1, "search-shortcut"], [1, "quick-links", "me-3"], [1, "dropdown", "user-menu-dropdown"], ["type", "button", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "quick-link", "user-menu-toggle", 3, "title"], [1, "fas", "fa-user"], [1, "fas", "fa-chevron-down", "ms-1", "dropdown-arrow"], [1, "dropdown-menu", "dropdown-menu-end", "user-dropdown-menu"], [4, "ngIf"], ["href", "#", "title", "Emergencias", 1, "quick-link"], [1, "fas", "fa-phone"], ["href", "#", "title", "Ubicaci\xF3n", 1, "quick-link"], [1, "fas", "fa-map-marker-alt"], [1, "theme-selector", "dropdown"], ["type", "button", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "btn", "theme-toggle"], [1, "fas", "fa-sun", "theme-icon"], [1, "theme-text"], [1, "fas", "fa-chevron-down", "ms-1"], [1, "dropdown-menu", "theme-menu"], ["href", "#", "data-theme", "light", 1, "dropdown-item", "theme-option"], [1, "fas", "fa-sun", "me-2"], ["href", "#", "data-theme", "dark", 1, "dropdown-item", "theme-option"], [1, "fas", "fa-moon", "me-2"], ["href", "#", "data-theme", "auto", 1, "dropdown-item", "theme-option"], [1, "fas", "fa-adjust", "me-2"], [1, "user-info-header"], [1, "user-avatar"], [1, "fas"], [1, "user-details"], [1, "user-name"], [1, "user-role"], [1, "dropdown-divider"], ["href", "#", 1, "dropdown-item", 3, "click"], [1, "fas", "fa-user-circle", "me-2"], [1, "fas", "fa-cog", "me-2"], ["href", "#", 1, "dropdown-item", "text-danger", 3, "click"], [1, "fas", "fa-sign-out-alt", "me-2"], [1, "fas", "fa-sign-in-alt", "me-2"], [1, "fas", "fa-user-plus", "me-2"], [1, "fas", "fa-question-circle", "me-2"]], template: function HeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 0)(1, "nav", 1)(2, "div", 2)(3, "a", 3)(4, "div", 4);
      \u0275\u0275element(5, "img", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 6);
      \u0275\u0275text(7, "MediCore");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "button", 7);
      \u0275\u0275element(9, "span", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 9)(11, "ul", 10)(12, "li", 11)(13, "a", 12);
      \u0275\u0275text(14, "Servicios");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "li", 11)(16, "a", 13);
      \u0275\u0275text(17, "Especialidades");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "li", 11)(19, "a", 14);
      \u0275\u0275text(20, "Campa\xF1as");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "li", 11)(22, "a", 15);
      \u0275\u0275text(23, "Contacto");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "div", 16)(25, "div", 17);
      \u0275\u0275element(26, "input", 18);
      \u0275\u0275elementStart(27, "span", 19);
      \u0275\u0275text(28, "Ctrl K");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 20)(30, "div", 21)(31, "button", 22);
      \u0275\u0275element(32, "i", 23)(33, "i", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "ul", 25);
      \u0275\u0275template(35, HeaderComponent_ng_container_35_Template, 25, 6, "ng-container", 26)(36, HeaderComponent_ng_container_36_Template, 15, 0, "ng-container", 26);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "a", 27);
      \u0275\u0275element(38, "i", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "a", 29);
      \u0275\u0275element(40, "i", 30);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "div", 31)(42, "button", 32);
      \u0275\u0275element(43, "i", 33);
      \u0275\u0275elementStart(44, "span", 34);
      \u0275\u0275text(45, "Claro");
      \u0275\u0275elementEnd();
      \u0275\u0275element(46, "i", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "ul", 36)(48, "li")(49, "a", 37);
      \u0275\u0275element(50, "i", 38);
      \u0275\u0275text(51, "Claro ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(52, "li")(53, "a", 39);
      \u0275\u0275element(54, "i", 40);
      \u0275\u0275text(55, "Oscuro ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "li")(57, "a", 41);
      \u0275\u0275element(58, "i", 42);
      \u0275\u0275text(59, "Auto ");
      \u0275\u0275elementEnd()()()()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(31);
      \u0275\u0275property("title", ctx.isAuthenticated ? ctx.userName : "Cuenta");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.isAuthenticated);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isAuthenticated);
    }
  }, dependencies: [CommonModule, NgIf, RouterLink], styles: [`

[_nghost-%COMP%] {
  display: block;
}
.navbar-brand[_ngcontent-%COMP%] {
  font-size: 1.5rem;
  font-weight: bold;
  transition: color 0.3s ease;
}
.nav-link[_ngcontent-%COMP%] {
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}
.nav-link.disabled[_ngcontent-%COMP%] {
  cursor: not-allowed;
}
.header-light[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      var(--primary-blue) 0%,
      var(--soft-violet) 50%,
      var(--soft-purple) 100%);
  box-shadow: 0 4px 20px rgba(168, 216, 234, 0.3);
  border-bottom: none !important;
  backdrop-filter: blur(10px);
  padding: 0 !important;
  margin: 0 !important;
  min-height: auto !important;
  width: 100% !important;
  display: block !important;
}
.header-light[_ngcontent-%COMP%]   .navbar-brand[_ngcontent-%COMP%], 
.header-light[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {
  color: rgba(255, 255, 255, 0.95) !important;
}
.header-light[_ngcontent-%COMP%]   .nav-link.disabled[_ngcontent-%COMP%] {
  color: #adb5bd;
}
.header-dark[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #2c3e50 0%,
      #34495e 100%);
  border-bottom: none !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  padding: 0 !important;
  margin: 0 !important;
  min-height: auto !important;
  width: 100% !important;
  display: block !important;
}
.header-dark[_ngcontent-%COMP%]   .navbar-brand[_ngcontent-%COMP%], 
.header-dark[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {
  color: #f8f9fa;
}
.header-dark[_ngcontent-%COMP%]   .nav-link.disabled[_ngcontent-%COMP%] {
  color: #6c757d;
}
.medical-header[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  overflow: visible;
  height: 70px !important;
  min-height: 70px !important;
  max-height: 70px !important;
  width: 100% !important;
  left: 0 !important;
  right: 0 !important;
}
.navbar[_ngcontent-%COMP%] {
  padding: 0.5rem 0 !important;
  margin: 0 !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  flex-wrap: nowrap !important;
}
.container-fluid[_ngcontent-%COMP%] {
  max-width: 100% !important;
  width: 100% !important;
  overflow: visible;
  display: flex !important;
  flex-wrap: nowrap !important;
  align-items: center !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}
@media (min-width: 1276px) {
  .navbar-nav[_ngcontent-%COMP%] {
    flex-direction: row !important;
    justify-content: flex-start !important;
    flex-shrink: 1 !important;
  }
  .navbar-collapse[_ngcontent-%COMP%] {
    flex-direction: row !important;
    justify-content: space-between;
    align-items: center;
    overflow: visible !important;
    background: rgba(0, 0, 0, 0.15) !important;
    border-radius: 12px !important;
    padding: 4px 8px !important;
    flex: 1 !important;
    display: flex !important;
    gap: 8px !important;
  }
  .navbar-nav[_ngcontent-%COMP%] {
    background: transparent !important;
    padding: 0 !important;
    gap: 2px !important;
  }
  .search-container[_ngcontent-%COMP%] {
    background: transparent !important;
    padding: 0 !important;
    width: 160px !important;
    min-width: 140px !important;
  }
  .header-controls[_ngcontent-%COMP%] {
    margin-left: auto;
    justify-content: flex-end;
    overflow: visible;
    gap: 6px !important;
    flex-shrink: 0 !important;
  }
  .quick-link[_ngcontent-%COMP%] {
    background: rgba(0, 0, 0, 0.15) !important;
    border-radius: 8px !important;
    padding: 8px 10px !important;
  }
  .navbar-nav[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {
    margin: 0 2px !important;
    padding: 4px 8px !important;
    font-size: 0.85rem !important;
  }
  .search-container[_ngcontent-%COMP%] {
    width: 160px;
  }
  .brand-text[_ngcontent-%COMP%] {
    font-size: 1.1rem;
  }
  .logo-container[_ngcontent-%COMP%] {
    width: 38px;
    height: 38px;
  }
  .navbar-toggler[_ngcontent-%COMP%] {
    display: none !important;
  }
}
@media (min-width: 1200px) and (max-width: 1275px) {
  .navbar-toggler[_ngcontent-%COMP%] {
    display: block !important;
  }
  .navbar-collapse[_ngcontent-%COMP%]:not(.show) {
    display: none !important;
  }
}
@media (min-width: 1276px) and (max-width: 1400px) {
  .navbar-nav[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {
    margin: 0 3px;
    padding: 5px 8px;
    font-size: 0.85rem;
  }
  .search-container[_ngcontent-%COMP%] {
    width: 180px;
  }
  .search-input[_ngcontent-%COMP%] {
    font-size: 0.85rem;
    padding: 0.45rem 0.65rem;
  }
  .search-shortcut[_ngcontent-%COMP%] {
    font-size: 0.65rem;
    padding: 2px 4px;
  }
  .quick-links[_ngcontent-%COMP%] {
    gap: 3px;
  }
  .quick-link[_ngcontent-%COMP%] {
    padding: 7px 9px;
    font-size: 0.85rem;
  }
  .theme-toggle[_ngcontent-%COMP%] {
    padding: 5px 9px;
    font-size: 0.8rem;
    gap: 5px;
  }
  .theme-icon[_ngcontent-%COMP%] {
    font-size: 0.8rem;
  }
  .theme-text[_ngcontent-%COMP%] {
    font-size: 0.8rem;
  }
  .brand-text[_ngcontent-%COMP%] {
    font-size: 1.05rem;
  }
  .logo-container[_ngcontent-%COMP%] {
    width: 36px;
    height: 36px;
  }
  .header-controls[_ngcontent-%COMP%] {
    gap: 6px;
  }
}
.logo-container[_ngcontent-%COMP%] {
  width: 45px;
  height: 45px;
  background:
    linear-gradient(
      45deg,
      #ffffff,
      #f8f9fa);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(168, 216, 234, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.8);
}
.logo-image[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}
.logo-text[_ngcontent-%COMP%] {
  display: none;
}
.brand-text[_ngcontent-%COMP%] {
  font-size: 1.3rem !important;
  font-weight: 600 !important;
  color: white !important;
  font-family:
    "Segoe UI",
    Tahoma,
    Geneva,
    Verdana,
    sans-serif !important;
}
.navbar-nav[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0;
}
.nav-item[_ngcontent-%COMP%] {
  list-style: none;
}
.navbar-nav[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 500 !important;
  margin: 0 8px !important;
  padding: 8px 12px !important;
  border-radius: 6px !important;
  transition: all 0.3s ease !important;
  white-space: nowrap !important;
  font-size: 0.95rem !important;
  font-family:
    "Segoe UI",
    Tahoma,
    Geneva,
    Verdana,
    sans-serif !important;
}
.navbar-nav[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover {
  color: white !important;
  background-color: rgba(255, 255, 255, 0.1);
}
.search-container[_ngcontent-%COMP%] {
  position: relative;
  width: 220px;
  flex-shrink: 1;
  min-width: 150px;
}
.search-input[_ngcontent-%COMP%] {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 0.75rem;
  padding-right: 60px;
  border-radius: 8px;
  font-size: 0.9rem;
  width: 100%;
}
.search-input[_ngcontent-%COMP%]::placeholder {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
}
.search-input[_ngcontent-%COMP%]:focus {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.1);
  color: white;
}
.search-shortcut[_ngcontent-%COMP%] {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
}
.quick-links[_ngcontent-%COMP%] {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}
.quick-link[_ngcontent-%COMP%] {
  color: rgba(255, 255, 255, 0.9);
  padding: 8px 10px;
  border-radius: 6px;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 0.9rem;
}
.quick-link[_ngcontent-%COMP%]:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}
.theme-selector[_ngcontent-%COMP%] {
  flex-shrink: 0;
  position: relative;
}
.theme-toggle[_ngcontent-%COMP%] {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 8px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  white-space: nowrap;
}
.theme-toggle[_ngcontent-%COMP%]:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
}
.theme-menu[_ngcontent-%COMP%] {
  background-color: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  min-width: 150px;
  z-index: 1050;
  position: absolute;
}
.theme-option[_ngcontent-%COMP%] {
  color: #333;
  padding: 8px 16px;
  border-radius: 6px;
  margin: 4px;
  font-size: 0.9rem;
}
.theme-option[_ngcontent-%COMP%]:hover {
  background-color: rgba(102, 126, 234, 0.1);
  color: #667eea;
}
.theme-icon[_ngcontent-%COMP%] {
  font-size: 0.85rem;
}
.theme-text[_ngcontent-%COMP%] {
  font-weight: 500;
  font-size: 0.85rem;
}
.header-controls[_ngcontent-%COMP%] {
  gap: 8px;
  flex-wrap: nowrap;
}
@media (prefers-color-scheme: dark) {
  body[_ngcontent-%COMP%] {
    background-color: #121212;
    color: #e0e0e0;
  }
  header[_ngcontent-%COMP%] {
    background-color: #1f1f1f;
    color: #e0e0e0;
    display: flex;
    justify-content: space-between;
  }
  .theme-icon[_ngcontent-%COMP%] {
    color: #f39c12;
  }
  .theme-text[_ngcontent-%COMP%] {
    color: #f39c12;
  }
}
.navbar-toggler[_ngcontent-%COMP%] {
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-left: auto;
  order: 2;
}
.navbar-toggler[_ngcontent-%COMP%]:focus {
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.15);
}
.navbar-toggler-icon[_ngcontent-%COMP%] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.9)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  width: 1.5em;
  height: 1.5em;
}
@media (min-width: 1276px) {
  .navbar-collapse[_ngcontent-%COMP%] {
    flex-wrap: nowrap;
  }
  .header-controls[_ngcontent-%COMP%] {
    flex-wrap: nowrap;
  }
}
@media (max-width: 1275px) {
  .container-fluid[_ngcontent-%COMP%] {
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
  }
  .logo-container[_ngcontent-%COMP%] {
    width: 38px;
    height: 38px;
  }
  .brand-text[_ngcontent-%COMP%] {
    font-size: 1.15rem;
  }
  .navbar-collapse[_ngcontent-%COMP%] {
    flex-basis: 100%;
    margin-top: 1rem;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    padding: 1rem;
    backdrop-filter: blur(10px);
  }
  .navbar-nav[_ngcontent-%COMP%] {
    flex-direction: column !important;
    width: 100%;
    margin-bottom: 1rem;
  }
  .nav-item[_ngcontent-%COMP%] {
    width: 100%;
  }
  .navbar-nav[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {
    margin: 0.3rem 0;
    padding: 0.8rem 1rem;
    border-radius: 8px;
    width: 100%;
    text-align: left;
  }
  .header-controls[_ngcontent-%COMP%] {
    flex-direction: column !important;
    width: 100%;
    gap: 0.75rem;
    align-items: stretch !important;
  }
  .search-container[_ngcontent-%COMP%] {
    width: 100%;
    margin-right: 0 !important;
    margin-bottom: 0;
  }
  .search-input[_ngcontent-%COMP%] {
    width: 100%;
    font-size: 0.95rem;
  }
  .quick-links[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: space-around;
    margin-right: 0 !important;
    margin-bottom: 0;
    gap: 0.5rem;
  }
  .quick-link[_ngcontent-%COMP%] {
    flex: 1;
    text-align: center;
    padding: 0.8rem;
    max-width: 60px;
  }
  .theme-selector[_ngcontent-%COMP%] {
    width: 100%;
  }
  .theme-toggle[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: center;
    padding: 0.75rem;
  }
  .theme-menu[_ngcontent-%COMP%] {
    width: 100%;
    left: 0 !important;
    right: 0 !important;
  }
}
@media (max-width: 767px) {
  .container-fluid[_ngcontent-%COMP%] {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
  .logo-container[_ngcontent-%COMP%] {
    width: 35px;
    height: 35px;
  }
  .brand-text[_ngcontent-%COMP%] {
    font-size: 1.05rem;
  }
  .navbar-collapse[_ngcontent-%COMP%] {
    padding: 0.75rem;
  }
  .navbar-nav[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {
    padding: 0.7rem 0.8rem;
    font-size: 0.95rem;
  }
  .quick-link[_ngcontent-%COMP%] {
    padding: 0.7rem;
  }
  .search-input[_ngcontent-%COMP%] {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
  }
}
@media (max-width: 575px) {
  .container-fluid[_ngcontent-%COMP%] {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
  .logo-container[_ngcontent-%COMP%] {
    width: 32px;
    height: 32px;
  }
  .brand-text[_ngcontent-%COMP%] {
    font-size: 0.95rem;
  }
  .navbar-brand[_ngcontent-%COMP%] {
    font-size: 1.2rem;
  }
  .navbar-collapse[_ngcontent-%COMP%] {
    padding: 0.75rem;
    margin-top: 0.75rem;
  }
  .navbar-nav[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {
    padding: 0.65rem 0.75rem;
    font-size: 0.9rem;
    margin: 0.2rem 0;
  }
  .search-shortcut[_ngcontent-%COMP%] {
    display: none;
  }
  .search-input[_ngcontent-%COMP%] {
    font-size: 0.85rem;
    padding: 0.5rem;
    padding-right: 0.5rem;
  }
  .search-container[_ngcontent-%COMP%] {
    margin-bottom: 0;
  }
  .quick-links[_ngcontent-%COMP%] {
    gap: 0.25rem;
  }
  .quick-link[_ngcontent-%COMP%] {
    padding: 0.6rem 0.5rem;
    max-width: 50px;
  }
  .quick-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
    font-size: 1rem;
  }
  .theme-toggle[_ngcontent-%COMP%] {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
  .theme-text[_ngcontent-%COMP%] {
    font-size: 0.85rem;
  }
  .theme-icon[_ngcontent-%COMP%] {
    font-size: 0.9rem;
  }
}
@media (max-width: 399px) {
  .logo-container[_ngcontent-%COMP%] {
    width: 28px;
    height: 28px;
  }
  .brand-text[_ngcontent-%COMP%] {
    font-size: 0.9rem;
  }
  .navbar-nav[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {
    font-size: 0.85rem;
    padding: 0.6rem;
  }
  .quick-link[_ngcontent-%COMP%] {
    max-width: 45px;
    padding: 0.5rem 0.3rem;
  }
  .quick-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
    font-size: 0.9rem;
  }
  .theme-text[_ngcontent-%COMP%] {
    font-size: 0.8rem;
  }
}
.header-dark[_ngcontent-%COMP%]   .navbar-toggler[_ngcontent-%COMP%] {
  border-color: rgba(255, 255, 255, 0.2);
}
.header-dark[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}
.header-dark[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus {
  background-color: rgba(255, 255, 255, 0.1);
}
.header-dark[_ngcontent-%COMP%]   .theme-toggle[_ngcontent-%COMP%] {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}
.header-dark[_ngcontent-%COMP%]   .theme-menu[_ngcontent-%COMP%] {
  background-color: rgba(30, 35, 50, 0.95);
}
.header-dark[_ngcontent-%COMP%]   .theme-option[_ngcontent-%COMP%] {
  color: rgba(255, 255, 255, 0.9);
}
.header-dark[_ngcontent-%COMP%]   .theme-option[_ngcontent-%COMP%]:hover {
  background-color: rgba(102, 126, 234, 0.2);
  color: var(--baby-blue);
}
.user-menu-dropdown[_ngcontent-%COMP%] {
  position: relative;
  display: inline-block;
}
.user-menu-toggle[_ngcontent-%COMP%] {
  background: none;
  border: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: -webkit-fill-available;
}
.user-menu-toggle[_ngcontent-%COMP%]:hover {
  background: rgba(255, 255, 255, 0.1);
}
.user-menu-toggle[_ngcontent-%COMP%]   .dropdown-arrow[_ngcontent-%COMP%] {
  font-size: 0.7rem;
  transition: transform 0.3s ease;
}
.user-menu-toggle[aria-expanded=true][_ngcontent-%COMP%]   .dropdown-arrow[_ngcontent-%COMP%] {
  transform: rotate(180deg);
}
.user-dropdown-menu[_ngcontent-%COMP%] {
  min-width: 280px;
  padding: 0.5rem 0;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin-top: 0.5rem;
  animation: _ngcontent-%COMP%_slideDown 0.3s ease;
}
@keyframes _ngcontent-%COMP%_slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.user-info-header[_ngcontent-%COMP%] {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  margin: -0.5rem 0 0.5rem 0;
  border-radius: 12px 12px 0 0;
}
.user-info-header[_ngcontent-%COMP%]   .user-avatar[_ngcontent-%COMP%] {
  width: 45px;
  height: 45px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-size: 1.25rem;
  flex-shrink: 0;
}
.user-info-header[_ngcontent-%COMP%]   .user-details[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  color: white;
}
.user-info-header[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%] {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.1rem;
}
.user-info-header[_ngcontent-%COMP%]   .user-role[_ngcontent-%COMP%] {
  font-size: 0.85rem;
  opacity: 0.9;
}
.user-dropdown-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] {
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 0.95rem;
}
.user-dropdown-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  width: 20px;
  text-align: center;
}
.user-dropdown-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:hover {
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  color: white;
  padding-left: 1.5rem;
}
.user-dropdown-menu[_ngcontent-%COMP%]   .dropdown-item.text-danger[_ngcontent-%COMP%] {
  color: #dc3545;
}
.user-dropdown-menu[_ngcontent-%COMP%]   .dropdown-item.text-danger[_ngcontent-%COMP%]:hover {
  background: #dc3545;
  color: white;
}
.user-dropdown-menu[_ngcontent-%COMP%]   .dropdown-divider[_ngcontent-%COMP%] {
  margin: 0.5rem 0;
  opacity: 0.1;
}
.header-dark[_ngcontent-%COMP%]   .user-dropdown-menu[_ngcontent-%COMP%] {
  background-color: rgba(30, 35, 50, 0.98);
  border-color: rgba(255, 255, 255, 0.1);
}
.header-dark[_ngcontent-%COMP%]   .user-dropdown-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] {
  color: rgba(255, 255, 255, 0.9);
}
.header-dark[_ngcontent-%COMP%]   .user-dropdown-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:hover {
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  color: white;
}
.header-dark[_ngcontent-%COMP%]   .user-dropdown-menu[_ngcontent-%COMP%]   .dropdown-divider[_ngcontent-%COMP%] {
  border-color: rgba(255, 255, 255, 0.1);
}
@media (max-width: 991px) {
  .user-dropdown-menu[_ngcontent-%COMP%] {
    min-width: 260px;
  }
  .user-info-header[_ngcontent-%COMP%] {
    padding: 0.875rem;
  }
  .user-info-header[_ngcontent-%COMP%]   .user-avatar[_ngcontent-%COMP%] {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
}
@media (max-width: 576px) {
  .user-dropdown-menu[_ngcontent-%COMP%] {
    min-width: 240px;
  }
  .user-dropdown-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] {
    padding: 0.625rem 1rem;
    font-size: 0.9rem;
  }
}
/*# sourceMappingURL=header.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderComponent, [{
    type: Component,
    args: [{ selector: "app-header", standalone: true, imports: [CommonModule, RouterLink], template: `<!--HEADER DE LA PAGINA-->
<header class="header-light medical-header">
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid px-4">
      <!-- Logo y nombre del centro m\xE9dico -->
      <a class="navbar-brand d-flex align-items-center" href="#">
        <div class="logo-container me-2">
          <img
            src="/assets/images/MediCore.png"
            alt="MediCore Logo"
            class="logo-image"
          />
        </div>
        <span class="brand-text">MediCore</span>
      </a>

      <!-- Bot\xF3n toggler para m\xF3viles -->
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarContent" 
        aria-controls="navbarContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Contenido colapsable del navbar -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <!-- Men\xFA de navegaci\xF3n -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" routerLink="/servicios" routerLinkActive="active">Servicios</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/especialidades" routerLinkActive="active">Especialidades</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/campanias" routerLinkActive="active">Campa\xF1as</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/contacto" routerLinkActive="active">Contacto</a>
          </li>
        </ul>

        <!-- Barra de b\xFAsqueda y controles -->
        <div class="d-flex align-items-center header-controls">
          <div class="search-container me-3">
            <input
              type="search"
              class="form-control search-input"
              placeholder="Buscar servicios..."
              aria-label="Search"
            />
            <span class="search-shortcut">Ctrl K</span>
          </div>

          <!-- Enlaces de acceso r\xE1pido -->
          <div class="quick-links me-3">
            <!-- Men\xFA de Usuario Desplegable -->
            <div class="dropdown user-menu-dropdown">
              <button
                class="quick-link user-menu-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                [title]="isAuthenticated ? userName : 'Cuenta'"
              >
                <i class="fas fa-user"></i>
                <i class="fas fa-chevron-down ms-1 dropdown-arrow"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end user-dropdown-menu">
                <!-- Usuario autenticado -->
                <ng-container *ngIf="isAuthenticated">
                  <li class="user-info-header">
                    <div class="user-avatar">
                      <i class="fas" [class.fa-user-shield]="userRole === 'Administrador'" [class.fa-user]="userRole === 'Paciente'"></i>
                    </div>
                    <div class="user-details">
                      <span class="user-name">{{ userName }}</span>
                      <span class="user-role">{{ userRole }}</span>
                    </div>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <a class="dropdown-item" href="#" (click)="$event.preventDefault()">
                      <i class="fas fa-user-circle me-2"></i>Mi Perfil
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" (click)="$event.preventDefault()">
                      <i class="fas fa-cog me-2"></i>Configuraci\xF3n
                    </a>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <a class="dropdown-item text-danger" href="#" (click)="$event.preventDefault(); logout()">
                      <i class="fas fa-sign-out-alt me-2"></i>Cerrar Sesi\xF3n
                    </a>
                  </li>
                </ng-container>

                <!-- Usuario no autenticado -->
                <ng-container *ngIf="!isAuthenticated">
                  <li>
                    <a class="dropdown-item" href="#" (click)="$event.preventDefault(); navigateToLogin()">
                      <i class="fas fa-sign-in-alt me-2"></i>Iniciar Sesi\xF3n
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" (click)="$event.preventDefault(); navigateToRegister()">
                      <i class="fas fa-user-plus me-2"></i>Registrarse
                    </a>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <a class="dropdown-item" href="#" (click)="$event.preventDefault()">
                      <i class="fas fa-question-circle me-2"></i>Ayuda
                    </a>
                  </li>
                </ng-container>
              </ul>
            </div>

            <a href="#" class="quick-link" title="Emergencias">
              <i class="fas fa-phone"></i>
            </a>
            <a href="#" class="quick-link" title="Ubicaci\xF3n">
              <i class="fas fa-map-marker-alt"></i>
            </a>
          </div>

          <!-- Selector de tema -->
          <div class="theme-selector dropdown">
            <button
              class="btn theme-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-sun theme-icon"></i>
              <span class="theme-text">Claro</span>
              <i class="fas fa-chevron-down ms-1"></i>
            </button>
            <ul class="dropdown-menu theme-menu">
              <li>
                <a class="dropdown-item theme-option" href="#" data-theme="light">
                  <i class="fas fa-sun me-2"></i>Claro
                </a>
              </li>
              <li>
                <a class="dropdown-item theme-option" href="#" data-theme="dark">
                  <i class="fas fa-moon me-2"></i>Oscuro
                </a>
              </li>
              <li>
                <a class="dropdown-item theme-option" href="#" data-theme="auto">
                  <i class="fas fa-adjust me-2"></i>Auto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</header>`, styles: [`/* src/app/shared/components/header/header.component.css */
:host {
  display: block;
}
.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  transition: color 0.3s ease;
}
.nav-link {
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}
.nav-link.disabled {
  cursor: not-allowed;
}
.header-light {
  background:
    linear-gradient(
      135deg,
      var(--primary-blue) 0%,
      var(--soft-violet) 50%,
      var(--soft-purple) 100%);
  box-shadow: 0 4px 20px rgba(168, 216, 234, 0.3);
  border-bottom: none !important;
  backdrop-filter: blur(10px);
  padding: 0 !important;
  margin: 0 !important;
  min-height: auto !important;
  width: 100% !important;
  display: block !important;
}
.header-light .navbar-brand,
.header-light .nav-link {
  color: rgba(255, 255, 255, 0.95) !important;
}
.header-light .nav-link.disabled {
  color: #adb5bd;
}
.header-dark {
  background:
    linear-gradient(
      135deg,
      #2c3e50 0%,
      #34495e 100%);
  border-bottom: none !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  padding: 0 !important;
  margin: 0 !important;
  min-height: auto !important;
  width: 100% !important;
  display: block !important;
}
.header-dark .navbar-brand,
.header-dark .nav-link {
  color: #f8f9fa;
}
.header-dark .nav-link.disabled {
  color: #6c757d;
}
.medical-header {
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  overflow: visible;
  height: 70px !important;
  min-height: 70px !important;
  max-height: 70px !important;
  width: 100% !important;
  left: 0 !important;
  right: 0 !important;
}
.navbar {
  padding: 0.5rem 0 !important;
  margin: 0 !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  flex-wrap: nowrap !important;
}
.container-fluid {
  max-width: 100% !important;
  width: 100% !important;
  overflow: visible;
  display: flex !important;
  flex-wrap: nowrap !important;
  align-items: center !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}
@media (min-width: 1276px) {
  .navbar-nav {
    flex-direction: row !important;
    justify-content: flex-start !important;
    flex-shrink: 1 !important;
  }
  .navbar-collapse {
    flex-direction: row !important;
    justify-content: space-between;
    align-items: center;
    overflow: visible !important;
    background: rgba(0, 0, 0, 0.15) !important;
    border-radius: 12px !important;
    padding: 4px 8px !important;
    flex: 1 !important;
    display: flex !important;
    gap: 8px !important;
  }
  .navbar-nav {
    background: transparent !important;
    padding: 0 !important;
    gap: 2px !important;
  }
  .search-container {
    background: transparent !important;
    padding: 0 !important;
    width: 160px !important;
    min-width: 140px !important;
  }
  .header-controls {
    margin-left: auto;
    justify-content: flex-end;
    overflow: visible;
    gap: 6px !important;
    flex-shrink: 0 !important;
  }
  .quick-link {
    background: rgba(0, 0, 0, 0.15) !important;
    border-radius: 8px !important;
    padding: 8px 10px !important;
  }
  .navbar-nav .nav-link {
    margin: 0 2px !important;
    padding: 4px 8px !important;
    font-size: 0.85rem !important;
  }
  .search-container {
    width: 160px;
  }
  .brand-text {
    font-size: 1.1rem;
  }
  .logo-container {
    width: 38px;
    height: 38px;
  }
  .navbar-toggler {
    display: none !important;
  }
}
@media (min-width: 1200px) and (max-width: 1275px) {
  .navbar-toggler {
    display: block !important;
  }
  .navbar-collapse:not(.show) {
    display: none !important;
  }
}
@media (min-width: 1276px) and (max-width: 1400px) {
  .navbar-nav .nav-link {
    margin: 0 3px;
    padding: 5px 8px;
    font-size: 0.85rem;
  }
  .search-container {
    width: 180px;
  }
  .search-input {
    font-size: 0.85rem;
    padding: 0.45rem 0.65rem;
  }
  .search-shortcut {
    font-size: 0.65rem;
    padding: 2px 4px;
  }
  .quick-links {
    gap: 3px;
  }
  .quick-link {
    padding: 7px 9px;
    font-size: 0.85rem;
  }
  .theme-toggle {
    padding: 5px 9px;
    font-size: 0.8rem;
    gap: 5px;
  }
  .theme-icon {
    font-size: 0.8rem;
  }
  .theme-text {
    font-size: 0.8rem;
  }
  .brand-text {
    font-size: 1.05rem;
  }
  .logo-container {
    width: 36px;
    height: 36px;
  }
  .header-controls {
    gap: 6px;
  }
}
.logo-container {
  width: 45px;
  height: 45px;
  background:
    linear-gradient(
      45deg,
      #ffffff,
      #f8f9fa);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(168, 216, 234, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.8);
}
.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}
.logo-text {
  display: none;
}
.brand-text {
  font-size: 1.3rem !important;
  font-weight: 600 !important;
  color: white !important;
  font-family:
    "Segoe UI",
    Tahoma,
    Geneva,
    Verdana,
    sans-serif !important;
}
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 0;
}
.nav-item {
  list-style: none;
}
.navbar-nav .nav-link {
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 500 !important;
  margin: 0 8px !important;
  padding: 8px 12px !important;
  border-radius: 6px !important;
  transition: all 0.3s ease !important;
  white-space: nowrap !important;
  font-size: 0.95rem !important;
  font-family:
    "Segoe UI",
    Tahoma,
    Geneva,
    Verdana,
    sans-serif !important;
}
.navbar-nav .nav-link:hover {
  color: white !important;
  background-color: rgba(255, 255, 255, 0.1);
}
.search-container {
  position: relative;
  width: 220px;
  flex-shrink: 1;
  min-width: 150px;
}
.search-input {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 0.75rem;
  padding-right: 60px;
  border-radius: 8px;
  font-size: 0.9rem;
  width: 100%;
}
.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
}
.search-input:focus {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.1);
  color: white;
}
.search-shortcut {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
}
.quick-links {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}
.quick-link {
  color: rgba(255, 255, 255, 0.9);
  padding: 8px 10px;
  border-radius: 6px;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 0.9rem;
}
.quick-link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}
.theme-selector {
  flex-shrink: 0;
  position: relative;
}
.theme-toggle {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 8px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  white-space: nowrap;
}
.theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
}
.theme-menu {
  background-color: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  min-width: 150px;
  z-index: 1050;
  position: absolute;
}
.theme-option {
  color: #333;
  padding: 8px 16px;
  border-radius: 6px;
  margin: 4px;
  font-size: 0.9rem;
}
.theme-option:hover {
  background-color: rgba(102, 126, 234, 0.1);
  color: #667eea;
}
.theme-icon {
  font-size: 0.85rem;
}
.theme-text {
  font-weight: 500;
  font-size: 0.85rem;
}
.header-controls {
  gap: 8px;
  flex-wrap: nowrap;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #121212;
    color: #e0e0e0;
  }
  header {
    background-color: #1f1f1f;
    color: #e0e0e0;
    display: flex;
    justify-content: space-between;
  }
  .theme-icon {
    color: #f39c12;
  }
  .theme-text {
    color: #f39c12;
  }
}
.navbar-toggler {
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-left: auto;
  order: 2;
}
.navbar-toggler:focus {
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.15);
}
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.9)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  width: 1.5em;
  height: 1.5em;
}
@media (min-width: 1276px) {
  .navbar-collapse {
    flex-wrap: nowrap;
  }
  .header-controls {
    flex-wrap: nowrap;
  }
}
@media (max-width: 1275px) {
  .container-fluid {
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
  }
  .logo-container {
    width: 38px;
    height: 38px;
  }
  .brand-text {
    font-size: 1.15rem;
  }
  .navbar-collapse {
    flex-basis: 100%;
    margin-top: 1rem;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    padding: 1rem;
    backdrop-filter: blur(10px);
  }
  .navbar-nav {
    flex-direction: column !important;
    width: 100%;
    margin-bottom: 1rem;
  }
  .nav-item {
    width: 100%;
  }
  .navbar-nav .nav-link {
    margin: 0.3rem 0;
    padding: 0.8rem 1rem;
    border-radius: 8px;
    width: 100%;
    text-align: left;
  }
  .header-controls {
    flex-direction: column !important;
    width: 100%;
    gap: 0.75rem;
    align-items: stretch !important;
  }
  .search-container {
    width: 100%;
    margin-right: 0 !important;
    margin-bottom: 0;
  }
  .search-input {
    width: 100%;
    font-size: 0.95rem;
  }
  .quick-links {
    width: 100%;
    justify-content: space-around;
    margin-right: 0 !important;
    margin-bottom: 0;
    gap: 0.5rem;
  }
  .quick-link {
    flex: 1;
    text-align: center;
    padding: 0.8rem;
    max-width: 60px;
  }
  .theme-selector {
    width: 100%;
  }
  .theme-toggle {
    width: 100%;
    justify-content: center;
    padding: 0.75rem;
  }
  .theme-menu {
    width: 100%;
    left: 0 !important;
    right: 0 !important;
  }
}
@media (max-width: 767px) {
  .container-fluid {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
  .logo-container {
    width: 35px;
    height: 35px;
  }
  .brand-text {
    font-size: 1.05rem;
  }
  .navbar-collapse {
    padding: 0.75rem;
  }
  .navbar-nav .nav-link {
    padding: 0.7rem 0.8rem;
    font-size: 0.95rem;
  }
  .quick-link {
    padding: 0.7rem;
  }
  .search-input {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
  }
}
@media (max-width: 575px) {
  .container-fluid {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
  .logo-container {
    width: 32px;
    height: 32px;
  }
  .brand-text {
    font-size: 0.95rem;
  }
  .navbar-brand {
    font-size: 1.2rem;
  }
  .navbar-collapse {
    padding: 0.75rem;
    margin-top: 0.75rem;
  }
  .navbar-nav .nav-link {
    padding: 0.65rem 0.75rem;
    font-size: 0.9rem;
    margin: 0.2rem 0;
  }
  .search-shortcut {
    display: none;
  }
  .search-input {
    font-size: 0.85rem;
    padding: 0.5rem;
    padding-right: 0.5rem;
  }
  .search-container {
    margin-bottom: 0;
  }
  .quick-links {
    gap: 0.25rem;
  }
  .quick-link {
    padding: 0.6rem 0.5rem;
    max-width: 50px;
  }
  .quick-link i {
    font-size: 1rem;
  }
  .theme-toggle {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
  .theme-text {
    font-size: 0.85rem;
  }
  .theme-icon {
    font-size: 0.9rem;
  }
}
@media (max-width: 399px) {
  .logo-container {
    width: 28px;
    height: 28px;
  }
  .brand-text {
    font-size: 0.9rem;
  }
  .navbar-nav .nav-link {
    font-size: 0.85rem;
    padding: 0.6rem;
  }
  .quick-link {
    max-width: 45px;
    padding: 0.5rem 0.3rem;
  }
  .quick-link i {
    font-size: 0.9rem;
  }
  .theme-text {
    font-size: 0.8rem;
  }
}
.header-dark .navbar-toggler {
  border-color: rgba(255, 255, 255, 0.2);
}
.header-dark .search-input {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}
.header-dark .search-input:focus {
  background-color: rgba(255, 255, 255, 0.1);
}
.header-dark .theme-toggle {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}
.header-dark .theme-menu {
  background-color: rgba(30, 35, 50, 0.95);
}
.header-dark .theme-option {
  color: rgba(255, 255, 255, 0.9);
}
.header-dark .theme-option:hover {
  background-color: rgba(102, 126, 234, 0.2);
  color: var(--baby-blue);
}
.user-menu-dropdown {
  position: relative;
  display: inline-block;
}
.user-menu-toggle {
  background: none;
  border: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: -webkit-fill-available;
}
.user-menu-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
}
.user-menu-toggle .dropdown-arrow {
  font-size: 0.7rem;
  transition: transform 0.3s ease;
}
.user-menu-toggle[aria-expanded=true] .dropdown-arrow {
  transform: rotate(180deg);
}
.user-dropdown-menu {
  min-width: 280px;
  padding: 0.5rem 0;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin-top: 0.5rem;
  animation: slideDown 0.3s ease;
}
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.user-info-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  margin: -0.5rem 0 0.5rem 0;
  border-radius: 12px 12px 0 0;
}
.user-info-header .user-avatar {
  width: 45px;
  height: 45px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-size: 1.25rem;
  flex-shrink: 0;
}
.user-info-header .user-details {
  display: flex;
  flex-direction: column;
  color: white;
}
.user-info-header .user-name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.1rem;
}
.user-info-header .user-role {
  font-size: 0.85rem;
  opacity: 0.9;
}
.user-dropdown-menu .dropdown-item {
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 0.95rem;
}
.user-dropdown-menu .dropdown-item i {
  width: 20px;
  text-align: center;
}
.user-dropdown-menu .dropdown-item:hover {
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  color: white;
  padding-left: 1.5rem;
}
.user-dropdown-menu .dropdown-item.text-danger {
  color: #dc3545;
}
.user-dropdown-menu .dropdown-item.text-danger:hover {
  background: #dc3545;
  color: white;
}
.user-dropdown-menu .dropdown-divider {
  margin: 0.5rem 0;
  opacity: 0.1;
}
.header-dark .user-dropdown-menu {
  background-color: rgba(30, 35, 50, 0.98);
  border-color: rgba(255, 255, 255, 0.1);
}
.header-dark .user-dropdown-menu .dropdown-item {
  color: rgba(255, 255, 255, 0.9);
}
.header-dark .user-dropdown-menu .dropdown-item:hover {
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  color: white;
}
.header-dark .user-dropdown-menu .dropdown-divider {
  border-color: rgba(255, 255, 255, 0.1);
}
@media (max-width: 991px) {
  .user-dropdown-menu {
    min-width: 260px;
  }
  .user-info-header {
    padding: 0.875rem;
  }
  .user-info-header .user-avatar {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
}
@media (max-width: 576px) {
  .user-dropdown-menu {
    min-width: 240px;
  }
  .user-dropdown-menu .dropdown-item {
    padding: 0.625rem 1rem;
    font-size: 0.9rem;
  }
}
/*# sourceMappingURL=header.component.css.map */
`] }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src/app/shared/components/header/header.component.ts", lineNumber: 13 });
})();

// src/app/shared/components/footer/footer.component.ts
var FooterComponent = class _FooterComponent {
  static \u0275fac = function FooterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FooterComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FooterComponent, selectors: [["app-footer"]], decls: 66, vars: 0, consts: [[1, "footer-section", "footer-light"], [1, "container", "py-5"], [1, "row"], [1, "col-lg-4"], [1, "footer-brand"], ["src", "assets/logo.png", "alt", "MediCore", 1, "footer-logo"], [1, "col-lg-2"], [1, "footer-links"], ["href", "#"], [1, "contact-info"], [1, "fas", "fa-map-marker-alt"], [1, "fas", "fa-phone"], [1, "fas", "fa-envelope"], [1, "social-links"], [1, "fab", "fa-facebook"], [1, "fab", "fa-instagram"], [1, "fab", "fa-linkedin"], [1, "footer-divider"], [1, "text-center"]], template: function FooterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "footer", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
      \u0275\u0275element(5, "img", 5);
      \u0275\u0275elementStart(6, "h5");
      \u0275\u0275text(7, "MediCore");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p");
      \u0275\u0275text(9, " Tu salud, nuestra prioridad. Brindamos atenci\xF3n m\xE9dica integral con calidez humana y tecnolog\xEDa de vanguardia. ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 6)(11, "h6");
      \u0275\u0275text(12, "Servicios");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "ul", 7)(14, "li")(15, "a", 8);
      \u0275\u0275text(16, "Consulta General");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "li")(18, "a", 8);
      \u0275\u0275text(19, "Especialidades");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "li")(21, "a", 8);
      \u0275\u0275text(22, "Laboratorio");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "li")(24, "a", 8);
      \u0275\u0275text(25, "Emergencias");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(26, "div", 6)(27, "h6");
      \u0275\u0275text(28, "Enlaces");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "ul", 7)(30, "li")(31, "a", 8);
      \u0275\u0275text(32, "Agendar Cita");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "li")(34, "a", 8);
      \u0275\u0275text(35, "Portal Paciente");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "li")(37, "a", 8);
      \u0275\u0275text(38, "Resultados");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "li")(40, "a", 8);
      \u0275\u0275text(41, "Contacto");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(42, "div", 3)(43, "h6");
      \u0275\u0275text(44, "Contacto");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div", 9)(46, "p");
      \u0275\u0275element(47, "i", 10);
      \u0275\u0275text(48, " Av. Principal 123, Lima, Per\xFA ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "p");
      \u0275\u0275element(50, "i", 11);
      \u0275\u0275text(51, " +51 1 234-5678");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "p");
      \u0275\u0275element(53, "i", 12);
      \u0275\u0275text(54, " info@medicore.com");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "div", 13)(56, "a", 8);
      \u0275\u0275element(57, "i", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "a", 8);
      \u0275\u0275element(59, "i", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "a", 8);
      \u0275\u0275element(61, "i", 16);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275element(62, "hr", 17);
      \u0275\u0275elementStart(63, "div", 18)(64, "p");
      \u0275\u0275text(65, "2024 MediCore. Todos los derechos reservados.");
      \u0275\u0275elementEnd()()()();
    }
  }, styles: ["\n\n.footer-light[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--text-primary),\n      var(--dark-secondary));\n  border-top: 2px solid rgba(255, 255, 255, 0.1);\n  box-shadow: 0px -4px 15px rgba(0, 0, 0, 0.1);\n}\n.footer-dark[_ngcontent-%COMP%] {\n  background-color: #1c1c1c;\n  border-top: 2px solid #1c1c1c;\n  box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.5);\n}\n.footer-section[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--text-primary),\n      var(--dark-secondary));\n  color: white;\n}\n.footer-logo[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  margin-right: 10px;\n}\n.footer-links[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n}\n.footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.8);\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: var(--primary-blue);\n}\n.social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 1.5rem;\n  margin-right: 15px;\n  transition: color 0.3s ease;\n}\n.social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: var(--primary-blue);\n}\n.footer-divider[_ngcontent-%COMP%] {\n  border-color: rgba(255, 255, 255, 0.2);\n  margin: 2rem 0;\n}\n/*# sourceMappingURL=footer.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FooterComponent, [{
    type: Component,
    args: [{ selector: "app-footer", imports: [], template: '<footer class="footer-section footer-light">\n  <div class="container py-5">\n    <div class="row">\n      <div class="col-lg-4">\n        <div class="footer-brand">\n          <img src="assets/logo.png" alt="MediCore" class="footer-logo" />\n          <h5>MediCore</h5>\n          <p>\n            Tu salud, nuestra prioridad. Brindamos atenci\xF3n m\xE9dica integral con\n            calidez humana y tecnolog\xEDa de vanguardia.\n          </p>\n        </div>\n      </div>\n      <div class="col-lg-2">\n        <h6>Servicios</h6>\n        <ul class="footer-links">\n          <li><a href="#">Consulta General</a></li>\n          <li><a href="#">Especialidades</a></li>\n          <li><a href="#">Laboratorio</a></li>\n          <li><a href="#">Emergencias</a></li>\n        </ul>\n      </div>\n      <div class="col-lg-2">\n        <h6>Enlaces</h6>\n        <ul class="footer-links">\n          <li><a href="#">Agendar Cita</a></li>\n          <li><a href="#">Portal Paciente</a></li>\n          <li><a href="#">Resultados</a></li>\n          <li><a href="#">Contacto</a></li>\n        </ul>\n      </div>\n      <div class="col-lg-4">\n        <h6>Contacto</h6>\n        <div class="contact-info">\n          <p>\n            <i class="fas fa-map-marker-alt"></i> Av. Principal 123, Lima, Per\xFA\n          </p>\n          <p><i class="fas fa-phone"></i> +51 1 234-5678</p>\n          <p><i class="fas fa-envelope"></i> info&#64;medicore.com</p>\n        </div>\n        <div class="social-links">\n          <a href="#"><i class="fab fa-facebook"></i></a>\n          <a href="#"><i class="fab fa-instagram"></i></a>\n          <a href="#"><i class="fab fa-linkedin"></i></a>\n        </div>\n      </div>\n    </div>\n    <hr class="footer-divider" />\n    <div class="text-center">\n      <p>2024 MediCore. Todos los derechos reservados.</p>\n    </div>\n  </div>\n</footer>\n', styles: ["/* src/app/shared/components/footer/footer.component.css */\n.footer-light {\n  background:\n    linear-gradient(\n      135deg,\n      var(--text-primary),\n      var(--dark-secondary));\n  border-top: 2px solid rgba(255, 255, 255, 0.1);\n  box-shadow: 0px -4px 15px rgba(0, 0, 0, 0.1);\n}\n.footer-dark {\n  background-color: #1c1c1c;\n  border-top: 2px solid #1c1c1c;\n  box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.5);\n}\n.footer-section {\n  background:\n    linear-gradient(\n      135deg,\n      var(--text-primary),\n      var(--dark-secondary));\n  color: white;\n}\n.footer-logo {\n  width: 40px;\n  height: 40px;\n  margin-right: 10px;\n}\n.footer-links {\n  list-style: none;\n  padding: 0;\n}\n.footer-links a {\n  color: rgba(255, 255, 255, 0.8);\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.footer-links a:hover {\n  color: var(--primary-blue);\n}\n.social-links a {\n  color: white;\n  font-size: 1.5rem;\n  margin-right: 15px;\n  transition: color 0.3s ease;\n}\n.social-links a:hover {\n  color: var(--primary-blue);\n}\n.footer-divider {\n  border-color: rgba(255, 255, 255, 0.2);\n  margin: 2rem 0;\n}\n/*# sourceMappingURL=footer.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FooterComponent, { className: "FooterComponent", filePath: "src/app/shared/components/footer/footer.component.ts", lineNumber: 9 });
})();

// src/app/shared/components/BurbujaWsp/BurbujaWsp.component.ts
var BurbujaWspComponent = class _BurbujaWspComponent {
  static \u0275fac = function BurbujaWspComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BurbujaWspComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BurbujaWspComponent, selectors: [["app-burbuja-wsp"]], decls: 2, vars: 0, consts: [["href", "https://wa.me/51123456789", "target", "_blank", 1, "whatsapp-float"], [1, "fab", "fa-whatsapp"]], template: function BurbujaWspComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "a", 0);
      \u0275\u0275element(1, "i", 1);
      \u0275\u0275elementEnd();
    }
  }, styles: ["\n\n.whatsapp-float[_ngcontent-%COMP%] {\n  position: fixed;\n  width: 60px;\n  height: 60px;\n  bottom: 40px;\n  right: 40px;\n  background-color: #25d366;\n  color: white;\n  border-radius: 50%;\n  text-align: center;\n  font-size: 30px;\n  box-shadow: 2px 2px 3px #999;\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n}\n.whatsapp-float[_ngcontent-%COMP%]:hover {\n  transform: scale(1.1);\n  color: white;\n}\n/*# sourceMappingURL=BurbujaWsp.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BurbujaWspComponent, [{
    type: Component,
    args: [{ selector: "app-burbuja-wsp", imports: [], template: '<a href="https://wa.me/51123456789" class="whatsapp-float" target="_blank">\n  <i class="fab fa-whatsapp"></i>\n</a>\n', styles: ["/* src/app/shared/components/BurbujaWsp/BurbujaWsp.component.css */\n.whatsapp-float {\n  position: fixed;\n  width: 60px;\n  height: 60px;\n  bottom: 40px;\n  right: 40px;\n  background-color: #25d366;\n  color: white;\n  border-radius: 50%;\n  text-align: center;\n  font-size: 30px;\n  box-shadow: 2px 2px 3px #999;\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n}\n.whatsapp-float:hover {\n  transform: scale(1.1);\n  color: white;\n}\n/*# sourceMappingURL=BurbujaWsp.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BurbujaWspComponent, { className: "BurbujaWspComponent", filePath: "src/app/shared/components/BurbujaWsp/BurbujaWsp.component.ts", lineNumber: 9 });
})();

// src/app/services/theme.service.ts
var ThemeService = class _ThemeService {
  platformId;
  renderer;
  prefersDarkScheme;
  constructor(rendererFactory, platformId) {
    this.platformId = platformId;
    this.renderer = rendererFactory.createRenderer(null, null);
    if (isPlatformBrowser(this.platformId)) {
      this.prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
      this.initializeTheme();
      this.listenToSystemThemeChanges();
    }
  }
  initializeTheme() {
    const savedTheme = this.getSavedTheme() || "auto";
    this.applyTheme(savedTheme);
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.opacity = "1";
      }
    }, 100);
  }
  applyTheme(theme) {
    if (!isPlatformBrowser(this.platformId))
      return;
    const body = document.body;
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const themeIcon = document.querySelector(".theme-icon");
    const themeText = document.querySelector(".theme-text");
    const sections = document.querySelectorAll("section, .hero-section, .carousel-info-section, .services-section, .stats-section, .why-choose-section");
    if (theme === "light") {
      this.setLightTheme(body, header, footer, themeIcon, themeText);
      sections.forEach((section) => {
        section.classList.remove("bg-dark", "text-light");
      });
    } else if (theme === "dark") {
      this.setDarkTheme(body, header, footer, themeIcon, themeText);
      sections.forEach((section) => {
        section.classList.add("bg-dark", "text-light");
      });
    } else if (theme === "auto") {
      if (this.prefersDarkScheme?.matches) {
        this.setDarkTheme(body, header, footer, themeIcon, themeText);
        sections.forEach((section) => {
          section.classList.add("bg-dark", "text-light");
        });
      } else {
        this.setLightTheme(body, header, footer, themeIcon, themeText);
        sections.forEach((section) => {
          section.classList.remove("bg-dark", "text-light");
        });
      }
      if (themeIcon)
        themeIcon.className = "fas fa-adjust theme-icon";
      if (themeText)
        themeText.textContent = "Auto";
    }
    this.saveTheme(theme);
  }
  setLightTheme(body, header, footer, themeIcon, themeText) {
    body.classList.remove("bg-dark", "text-light");
    body.classList.add("bg-light", "text-dark");
    if (header) {
      header.classList.remove("header-dark");
      header.classList.add("header-light");
    }
    if (footer) {
      footer.classList.remove("footer-dark");
      footer.classList.add("footer-light");
    }
    if (themeIcon)
      themeIcon.className = "fas fa-sun theme-icon";
    if (themeText)
      themeText.textContent = "Claro";
  }
  setDarkTheme(body, header, footer, themeIcon, themeText) {
    body.classList.remove("bg-light", "text-dark");
    body.classList.add("bg-dark", "text-light");
    if (header) {
      header.classList.remove("header-light");
      header.classList.add("header-dark");
    }
    if (footer) {
      footer.classList.remove("footer-light");
      footer.classList.add("footer-dark");
    }
    if (themeIcon)
      themeIcon.className = "fas fa-moon theme-icon";
    if (themeText)
      themeText.textContent = "Oscuro";
  }
  listenToSystemThemeChanges() {
    if (this.prefersDarkScheme) {
      this.prefersDarkScheme.addEventListener("change", () => {
        const currentTheme = this.getSavedTheme();
        if (currentTheme === "auto") {
          this.applyTheme("auto");
        }
      });
    }
  }
  saveTheme(theme) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("theme", theme);
    }
  }
  getSavedTheme() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("theme");
    }
    return null;
  }
  setupThemeListeners() {
    if (!isPlatformBrowser(this.platformId))
      return;
    const themeOptions = document.querySelectorAll(".theme-option");
    themeOptions.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.preventDefault();
        const theme = option.getAttribute("data-theme");
        if (theme) {
          this.applyTheme(theme);
        }
      });
    });
  }
  static \u0275fac = function ThemeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThemeService)(\u0275\u0275inject(RendererFactory2), \u0275\u0275inject(PLATFORM_ID));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ThemeService, factory: _ThemeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: RendererFactory2 }, { type: Object, decorators: [{
    type: Inject,
    args: [PLATFORM_ID]
  }] }], null);
})();

// src/app/app.component.ts
function AppComponent_app_header_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-header");
  }
}
function AppComponent_app_burbuja_wsp_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-burbuja-wsp");
  }
}
function AppComponent_app_footer_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-footer");
  }
}
var AppComponent = class _AppComponent {
  themeService;
  router;
  title = "Sistema-de-Gestion-de-Clinica";
  showPublicLayout = true;
  constructor(themeService, router) {
    this.themeService = themeService;
    this.router = router;
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.showPublicLayout = event.url === "/" || event.url.includes("/MediCore");
    });
  }
  ngAfterViewInit() {
    this.themeService.setupThemeListeners();
  }
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)(\u0275\u0275directiveInject(ThemeService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 4, vars: 3, consts: [[4, "ngIf"]], template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, AppComponent_app_header_0_Template, 1, 0, "app-header", 0);
      \u0275\u0275element(1, "router-outlet");
      \u0275\u0275template(2, AppComponent_app_burbuja_wsp_2_Template, 1, 0, "app-burbuja-wsp", 0)(3, AppComponent_app_footer_3_Template, 1, 0, "app-footer", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.showPublicLayout);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.showPublicLayout);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showPublicLayout);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    BurbujaWspComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{ selector: "app-root", standalone: true, imports: [
      CommonModule,
      RouterOutlet,
      HeaderComponent,
      FooterComponent,
      BurbujaWspComponent
    ], template: '<!-- Header y Footer solo para p\xE1ginas p\xFAblicas (MediCore) -->\n<app-header *ngIf="showPublicLayout"></app-header>\n\n<!-- Contenido de la p\xE1gina -->\n<router-outlet></router-outlet>\n\n<!-- Burbuja WhatsApp solo para p\xE1ginas p\xFAblicas -->\n<app-burbuja-wsp *ngIf="showPublicLayout"></app-burbuja-wsp>\n\n<!-- Footer solo para p\xE1ginas p\xFAblicas -->\n<app-footer *ngIf="showPublicLayout"></app-footer>\n' }]
  }], () => [{ type: ThemeService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 23 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
