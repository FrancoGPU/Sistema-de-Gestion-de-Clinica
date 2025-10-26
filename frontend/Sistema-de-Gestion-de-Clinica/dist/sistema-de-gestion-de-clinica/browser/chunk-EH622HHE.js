import {
  AuthService
} from "./chunk-6JYT5V5N.js";
import {
  Router,
  RouterLink,
  RouterLinkActive
} from "./chunk-DMXX7ROZ.js";
import {
  CommonModule,
  NgClass,
  NgIf
} from "./chunk-D5MRJCXJ.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-AR7JWTXA.js";

// src/app/shared/components/admin-header/admin-header.component.ts
function AdminHeaderComponent_div_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275listener("click", function AdminHeaderComponent_div_51_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMobileMenu());
    });
    \u0275\u0275elementEnd();
  }
}
var AdminHeaderComponent = class _AdminHeaderComponent {
  authService;
  router;
  userName = "";
  userRole = "";
  mobileMenuOpen = false;
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  ngOnInit() {
    this.userName = this.authService.getUserName();
    const role = this.authService.getUserRole();
    this.userRole = role === "administrador" ? "Administrador" : "Paciente";
  }
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
  logout() {
    if (confirm("\xBFEst\xE1 seguro que desea cerrar sesi\xF3n?")) {
      this.authService.logout();
    }
  }
  static \u0275fac = function AdminHeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminHeaderComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminHeaderComponent, selectors: [["app-admin-header"]], decls: 52, vars: 8, consts: [[1, "admin-header"], [1, "container-fluid"], [1, "header-content"], [1, "header-brand"], [1, "fas", "fa-heartbeat"], [1, "brand-name"], [1, "brand-subtitle"], [1, "header-nav"], [1, "nav-list"], [1, "nav-item"], ["routerLink", "/admin/index", "routerLinkActive", "active", 1, "nav-link", 3, "click"], [1, "fas", "fa-home"], ["routerLink", "/admin/dashboard", "routerLinkActive", "active", 1, "nav-link", 3, "click"], [1, "fas", "fa-tachometer-alt"], ["routerLink", "/pacientes/lista", "routerLinkActive", "active", 1, "nav-link", 3, "click"], [1, "fas", "fa-users"], ["routerLink", "/admin/doctores", "routerLinkActive", "active", 1, "nav-link", 3, "click"], [1, "fas", "fa-user-md"], ["routerLink", "/admin/citas", "routerLinkActive", "active", 1, "nav-link", 3, "click"], [1, "fas", "fa-calendar-alt"], [1, "header-actions"], ["aria-label", "Toggle menu", 1, "btn-mobile-menu", 3, "click"], [1, "fas", 3, "ngClass"], [1, "user-info"], [1, "user-avatar"], [1, "fas", "fa-user-shield"], [1, "user-details"], [1, "user-name"], [1, "user-role"], ["title", "Cerrar sesi\xF3n", 1, "btn-logout", 3, "click"], [1, "fas", "fa-sign-out-alt"], ["class", "mobile-overlay", 3, "click", 4, "ngIf"], [1, "mobile-overlay", 3, "click"]], template: function AdminHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275element(4, "i", 4);
      \u0275\u0275elementStart(5, "span", 5);
      \u0275\u0275text(6, "MediCore");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "span", 6);
      \u0275\u0275text(8, "Panel Administrativo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "nav", 7)(10, "ul", 8)(11, "li", 9)(12, "a", 10);
      \u0275\u0275listener("click", function AdminHeaderComponent_Template_a_click_12_listener() {
        return ctx.closeMobileMenu();
      });
      \u0275\u0275element(13, "i", 11);
      \u0275\u0275elementStart(14, "span");
      \u0275\u0275text(15, "Inicio");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "li", 9)(17, "a", 12);
      \u0275\u0275listener("click", function AdminHeaderComponent_Template_a_click_17_listener() {
        return ctx.closeMobileMenu();
      });
      \u0275\u0275element(18, "i", 13);
      \u0275\u0275elementStart(19, "span");
      \u0275\u0275text(20, "Dashboard");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(21, "li", 9)(22, "a", 14);
      \u0275\u0275listener("click", function AdminHeaderComponent_Template_a_click_22_listener() {
        return ctx.closeMobileMenu();
      });
      \u0275\u0275element(23, "i", 15);
      \u0275\u0275elementStart(24, "span");
      \u0275\u0275text(25, "Pacientes");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "li", 9)(27, "a", 16);
      \u0275\u0275listener("click", function AdminHeaderComponent_Template_a_click_27_listener() {
        return ctx.closeMobileMenu();
      });
      \u0275\u0275element(28, "i", 17);
      \u0275\u0275elementStart(29, "span");
      \u0275\u0275text(30, "Doctores");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(31, "li", 9)(32, "a", 18);
      \u0275\u0275listener("click", function AdminHeaderComponent_Template_a_click_32_listener() {
        return ctx.closeMobileMenu();
      });
      \u0275\u0275element(33, "i", 19);
      \u0275\u0275elementStart(34, "span");
      \u0275\u0275text(35, "Citas");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(36, "div", 20)(37, "button", 21);
      \u0275\u0275listener("click", function AdminHeaderComponent_Template_button_click_37_listener() {
        return ctx.toggleMobileMenu();
      });
      \u0275\u0275element(38, "i", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "div", 23)(40, "div", 24);
      \u0275\u0275element(41, "i", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 26)(43, "span", 27);
      \u0275\u0275text(44);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "span", 28);
      \u0275\u0275text(46);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(47, "button", 29);
      \u0275\u0275listener("click", function AdminHeaderComponent_Template_button_click_47_listener() {
        return ctx.logout();
      });
      \u0275\u0275element(48, "i", 30);
      \u0275\u0275elementStart(49, "span");
      \u0275\u0275text(50, "Cerrar Sesi\xF3n");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275template(51, AdminHeaderComponent_div_51_Template, 1, 0, "div", 31);
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275classProp("mobile-open", ctx.mobileMenuOpen);
      \u0275\u0275advance(28);
      \u0275\u0275classProp("active", ctx.mobileMenuOpen);
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.mobileMenuOpen ? "fa-times" : "fa-bars");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.userName);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.userRole);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.mobileMenuOpen);
    }
  }, dependencies: [CommonModule, NgClass, NgIf, RouterLink, RouterLinkActive], styles: ["\n\n.admin-header[_ngcontent-%COMP%] {\n  background: white;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  padding: 1rem 0;\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n}\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 1.5rem;\n  gap: 2rem;\n}\n.header-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #667eea;\n  flex-shrink: 0;\n}\n.header-brand[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.brand-name[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.brand-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #718096;\n  font-weight: 500;\n  margin-left: 0.5rem;\n  padding-left: 0.5rem;\n  border-left: 2px solid #e2e8f0;\n}\n.header-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  justify-content: center;\n}\n.nav-list[_ngcontent-%COMP%] {\n  display: flex;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  gap: 0.5rem;\n}\n.nav-item[_ngcontent-%COMP%] {\n  display: flex;\n}\n.nav-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.625rem 1rem;\n  color: #4a5568;\n  text-decoration: none;\n  border-radius: 8px;\n  font-weight: 500;\n  font-size: 0.95rem;\n  transition: all 0.3s ease;\n  white-space: nowrap;\n}\n.nav-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.nav-link[_ngcontent-%COMP%]:hover:not(.nav-link-disabled) {\n  background: #f7fafc;\n  color: #667eea;\n  transform: translateY(-2px);\n}\n.nav-link.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n.nav-link-disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  cursor: not-allowed;\n  position: relative;\n}\n.nav-link-disabled[_ngcontent-%COMP%]:hover {\n  background: transparent;\n  color: #4a5568;\n  transform: none;\n}\n.btn-mobile-menu[_ngcontent-%COMP%] {\n  display: none;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: #f7fafc;\n  border: none;\n  border-radius: 8px;\n  color: #4a5568;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  font-size: 1.25rem;\n}\n.btn-mobile-menu[_ngcontent-%COMP%]:hover {\n  background: #e2e8f0;\n  color: #667eea;\n}\n.btn-mobile-menu.active[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n}\n.mobile-overlay[_ngcontent-%COMP%] {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.5rem 1rem;\n  background: #f7fafc;\n  border-radius: 50px;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 1.25rem;\n}\n.user-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2d3748;\n  font-size: 0.95rem;\n}\n.user-role[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #718096;\n}\n.btn-logout[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.625rem 1.25rem;\n  background: #fc8181;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  font-size: 0.9rem;\n}\n.btn-logout[_ngcontent-%COMP%]:hover {\n  background: #f56565;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(252, 129, 129, 0.4);\n}\n.btn-logout[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n@media (max-width: 992px) {\n  .brand-subtitle[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .nav-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .nav-link[_ngcontent-%COMP%] {\n    padding: 0.625rem;\n    width: 40px;\n    height: 40px;\n    justify-content: center;\n  }\n}\n@media (max-width: 768px) {\n  .header-content[_ngcontent-%COMP%] {\n    padding: 0 1rem;\n  }\n  .brand-name[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .btn-mobile-menu[_ngcontent-%COMP%] {\n    display: flex;\n  }\n  .header-nav[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 73px;\n    left: -100%;\n    width: 280px;\n    height: calc(100vh - 73px);\n    background: white;\n    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);\n    transition: left 0.3s ease;\n    z-index: 1001;\n    padding: 1rem 0;\n    justify-content: flex-start;\n  }\n  .header-nav.mobile-open[_ngcontent-%COMP%] {\n    left: 0;\n  }\n  .nav-list[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0;\n    width: 100%;\n  }\n  .nav-link[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 1rem 1.5rem;\n    border-radius: 0;\n    justify-content: flex-start;\n  }\n  .nav-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: inline;\n  }\n  .nav-link[_ngcontent-%COMP%]:hover:not(.nav-link-disabled) {\n    background: #f7fafc;\n    transform: none;\n  }\n  .nav-link.active[_ngcontent-%COMP%] {\n    border-left: 4px solid #667eea;\n    background: #f7fafc;\n    color: #667eea;\n  }\n  .mobile-overlay[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .user-info[_ngcontent-%COMP%] {\n    padding: 0.375rem 0.75rem;\n  }\n  .user-details[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .user-avatar[_ngcontent-%COMP%] {\n    width: 35px;\n    height: 35px;\n    font-size: 1rem;\n  }\n  .btn-logout[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .btn-logout[_ngcontent-%COMP%] {\n    padding: 0.625rem;\n    width: 40px;\n    height: 40px;\n    justify-content: center;\n  }\n}\n@media (max-width: 576px) {\n  .header-brand[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n  .header-brand[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n  }\n  .header-nav[_ngcontent-%COMP%] {\n    width: 100%;\n    left: -100%;\n  }\n  .header-nav.mobile-open[_ngcontent-%COMP%] {\n    left: 0;\n  }\n}\n/*# sourceMappingURL=admin-header.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminHeaderComponent, [{
    type: Component,
    args: [{ selector: "app-admin-header", standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive], template: `<header class="admin-header">
  <div class="container-fluid">
    <div class="header-content">
      <!-- Logo y t\xEDtulo -->
      <div class="header-brand">
        <i class="fas fa-heartbeat"></i>
        <span class="brand-name">MediCore</span>
        <span class="brand-subtitle">Panel Administrativo</span>
      </div>

      <!-- Navegaci\xF3n Principal -->
      <nav class="header-nav" [class.mobile-open]="mobileMenuOpen">
        <ul class="nav-list">
          <li class="nav-item">
            <a 
              routerLink="/admin/index" 
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="nav-link"
            >
              <i class="fas fa-home"></i>
              <span>Inicio</span>
            </a>
          </li>
          <li class="nav-item">
            <a 
              routerLink="/admin/dashboard" 
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="nav-link"
            >
              <i class="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li class="nav-item">
            <a 
              routerLink="/pacientes/lista" 
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="nav-link"
            >
              <i class="fas fa-users"></i>
              <span>Pacientes</span>
            </a>
          </li>
          <li class="nav-item">
            <a 
              routerLink="/admin/doctores" 
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="nav-link"
            >
              <i class="fas fa-user-md"></i>
              <span>Doctores</span>
            </a>
          </li>
          <li class="nav-item">
            <a 
              routerLink="/admin/citas" 
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="nav-link"
            >
              <i class="fas fa-calendar-alt"></i>
              <span>Citas</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- Usuario y acciones -->
      <div class="header-actions">
        <!-- Bot\xF3n men\xFA m\xF3vil -->
        <button 
          class="btn-mobile-menu" 
          (click)="toggleMobileMenu()"
          [class.active]="mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <i class="fas" [ngClass]="mobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>

        <!-- Info de usuario -->
        <div class="user-info">
          <div class="user-avatar">
            <i class="fas fa-user-shield"></i>
          </div>
          <div class="user-details">
            <span class="user-name">{{ userName }}</span>
            <span class="user-role">{{ userRole }}</span>
          </div>
        </div>

        <!-- Bot\xF3n logout -->
        <button class="btn-logout" (click)="logout()" title="Cerrar sesi\xF3n">
          <i class="fas fa-sign-out-alt"></i>
          <span>Cerrar Sesi\xF3n</span>
        </button>
      </div>
    </div>
  </div>
</header>

<!-- Overlay para cerrar men\xFA m\xF3vil -->
<div 
  class="mobile-overlay" 
  *ngIf="mobileMenuOpen" 
  (click)="closeMobileMenu()"
></div>
`, styles: ["/* src/app/shared/components/admin-header/admin-header.component.css */\n.admin-header {\n  background: white;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  padding: 1rem 0;\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n}\n.header-content {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 1.5rem;\n  gap: 2rem;\n}\n.header-brand {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #667eea;\n  flex-shrink: 0;\n}\n.header-brand i {\n  font-size: 2rem;\n}\n.brand-name {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.brand-subtitle {\n  font-size: 0.75rem;\n  color: #718096;\n  font-weight: 500;\n  margin-left: 0.5rem;\n  padding-left: 0.5rem;\n  border-left: 2px solid #e2e8f0;\n}\n.header-nav {\n  flex: 1;\n  display: flex;\n  justify-content: center;\n}\n.nav-list {\n  display: flex;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  gap: 0.5rem;\n}\n.nav-item {\n  display: flex;\n}\n.nav-link {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.625rem 1rem;\n  color: #4a5568;\n  text-decoration: none;\n  border-radius: 8px;\n  font-weight: 500;\n  font-size: 0.95rem;\n  transition: all 0.3s ease;\n  white-space: nowrap;\n}\n.nav-link i {\n  font-size: 1.1rem;\n}\n.nav-link:hover:not(.nav-link-disabled) {\n  background: #f7fafc;\n  color: #667eea;\n  transform: translateY(-2px);\n}\n.nav-link.active {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n.nav-link-disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  position: relative;\n}\n.nav-link-disabled:hover {\n  background: transparent;\n  color: #4a5568;\n  transform: none;\n}\n.btn-mobile-menu {\n  display: none;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: #f7fafc;\n  border: none;\n  border-radius: 8px;\n  color: #4a5568;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  font-size: 1.25rem;\n}\n.btn-mobile-menu:hover {\n  background: #e2e8f0;\n  color: #667eea;\n}\n.btn-mobile-menu.active {\n  background: #667eea;\n  color: white;\n}\n.mobile-overlay {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n.header-actions {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n.user-info {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.5rem 1rem;\n  background: #f7fafc;\n  border-radius: 50px;\n}\n.user-avatar {\n  width: 40px;\n  height: 40px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 1.25rem;\n}\n.user-details {\n  display: flex;\n  flex-direction: column;\n}\n.user-name {\n  font-weight: 600;\n  color: #2d3748;\n  font-size: 0.95rem;\n}\n.user-role {\n  font-size: 0.8rem;\n  color: #718096;\n}\n.btn-logout {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.625rem 1.25rem;\n  background: #fc8181;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  font-size: 0.9rem;\n}\n.btn-logout:hover {\n  background: #f56565;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(252, 129, 129, 0.4);\n}\n.btn-logout i {\n  font-size: 1rem;\n}\n@media (max-width: 992px) {\n  .brand-subtitle {\n    display: none;\n  }\n  .nav-link span {\n    display: none;\n  }\n  .nav-link {\n    padding: 0.625rem;\n    width: 40px;\n    height: 40px;\n    justify-content: center;\n  }\n}\n@media (max-width: 768px) {\n  .header-content {\n    padding: 0 1rem;\n  }\n  .brand-name {\n    display: none;\n  }\n  .btn-mobile-menu {\n    display: flex;\n  }\n  .header-nav {\n    position: fixed;\n    top: 73px;\n    left: -100%;\n    width: 280px;\n    height: calc(100vh - 73px);\n    background: white;\n    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);\n    transition: left 0.3s ease;\n    z-index: 1001;\n    padding: 1rem 0;\n    justify-content: flex-start;\n  }\n  .header-nav.mobile-open {\n    left: 0;\n  }\n  .nav-list {\n    flex-direction: column;\n    gap: 0;\n    width: 100%;\n  }\n  .nav-link {\n    width: 100%;\n    padding: 1rem 1.5rem;\n    border-radius: 0;\n    justify-content: flex-start;\n  }\n  .nav-link span {\n    display: inline;\n  }\n  .nav-link:hover:not(.nav-link-disabled) {\n    background: #f7fafc;\n    transform: none;\n  }\n  .nav-link.active {\n    border-left: 4px solid #667eea;\n    background: #f7fafc;\n    color: #667eea;\n  }\n  .mobile-overlay {\n    display: block;\n  }\n  .user-info {\n    padding: 0.375rem 0.75rem;\n  }\n  .user-details {\n    display: none;\n  }\n  .user-avatar {\n    width: 35px;\n    height: 35px;\n    font-size: 1rem;\n  }\n  .btn-logout span {\n    display: none;\n  }\n  .btn-logout {\n    padding: 0.625rem;\n    width: 40px;\n    height: 40px;\n    justify-content: center;\n  }\n}\n@media (max-width: 576px) {\n  .header-brand {\n    font-size: 1.25rem;\n  }\n  .header-brand i {\n    font-size: 1.5rem;\n  }\n  .header-actions {\n    gap: 0.5rem;\n  }\n  .header-nav {\n    width: 100%;\n    left: -100%;\n  }\n  .header-nav.mobile-open {\n    left: 0;\n  }\n}\n/*# sourceMappingURL=admin-header.component.css.map */\n"] }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminHeaderComponent, { className: "AdminHeaderComponent", filePath: "src/app/shared/components/admin-header/admin-header.component.ts", lineNumber: 13 });
})();

export {
  AdminHeaderComponent
};
//# sourceMappingURL=chunk-EH622HHE.js.map
