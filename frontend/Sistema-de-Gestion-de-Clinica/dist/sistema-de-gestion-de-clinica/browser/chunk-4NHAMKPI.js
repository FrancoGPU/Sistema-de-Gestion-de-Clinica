import {
  AuthService
} from "./chunk-6JYT5V5N.js";
import {
  Router
} from "./chunk-DMXX7ROZ.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-MHHJUQRX.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-D5MRJCXJ.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-AR7JWTXA.js";

// src/app/pages/Autenticacion/login/login.component.ts
function LoginComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275element(1, "i", 32);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
function LoginComponent_span_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 33);
    \u0275\u0275text(2, " Iniciar Sesi\xF3n ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 34);
    \u0275\u0275text(2, " Iniciando... ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275listener("click", function LoginComponent_div_31_Template_div_click_0_listener() {
      const i_r3 = \u0275\u0275restoreView(_r2).index;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.useDemoUser(i_r3));
    });
    \u0275\u0275elementStart(1, "div", 36);
    \u0275\u0275element(2, "i", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 38)(4, "h4");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 39);
    \u0275\u0275element(11, "i", 37);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r4 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ctx_r0.selectedDemoUser === i_r3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", user_r4.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(user_r4.role);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r4.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Contrase\xF1a: ", user_r4.password, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r0.selectedDemoUser === i_r3 ? "fa-check-circle" : "fa-arrow-right");
  }
}
var LoginComponent = class _LoginComponent {
  authService;
  router;
  email = "";
  password = "";
  errorMessage = "";
  isLoading = false;
  showPassword = false;
  selectedDemoUser = -1;
  // Usuarios de demostración para mostrar en la UI
  demoUsers = [
    {
      email: "administrador@administrador.com",
      password: "admin123",
      role: "Administrador",
      icon: "fa-user-shield"
    },
    {
      email: "paciente@paciente.com",
      password: "paciente123",
      role: "Paciente",
      icon: "fa-user"
    }
  ];
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    if (this.authService.isAuthenticated()) {
      const role = this.authService.getUserRole();
      if (role === "administrador") {
        this.router.navigate(["/admin/index"]);
      } else if (role === "paciente") {
        this.router.navigate(["/MediCore"]);
      }
    }
  }
  /**
   * Manejar el envío del formulario
   */
  onSubmit() {
    this.errorMessage = "";
    if (!this.email || !this.password) {
      this.errorMessage = "Por favor, complete todos los campos";
      return;
    }
    if (!this.isValidEmail(this.email)) {
      this.errorMessage = "Por favor, ingrese un email v\xE1lido";
      return;
    }
    this.isLoading = true;
    setTimeout(() => {
      const result = this.authService.login(this.email, this.password);
      if (!result.success) {
        this.errorMessage = result.message || "Error al iniciar sesi\xF3n";
        this.isLoading = false;
      }
    }, 500);
  }
  /**
   * Llenar el formulario con un usuario de demostración
   */
  useDemoUser(userIndex) {
    const user = this.demoUsers[userIndex];
    this.selectedDemoUser = userIndex;
    this.errorMessage = "";
    this.email = user.email;
    this.password = user.password;
    setTimeout(() => {
      this.selectedDemoUser = -1;
    }, 1e3);
    setTimeout(() => this.onSubmit(), 800);
  }
  /**
   * Continuar como invitado (sin autenticación)
   */
  continueAsGuest() {
    this.router.navigate(["/MediCore"]);
  }
  /**
   * Alternar visibilidad de la contraseña
   */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  /**
   * Validar formato de email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 44, vars: 14, consts: [[1, "login-container"], [1, "login-card"], [1, "login-header"], [1, "logo-container"], [1, "fas", "fa-heartbeat"], [1, "subtitle"], [1, "login-form", 3, "ngSubmit"], [1, "form-group"], ["for", "email"], [1, "fas", "fa-envelope"], ["type", "email", "id", "email", "name", "email", "placeholder", "ejemplo@correo.com", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "password"], [1, "fas", "fa-lock"], [1, "password-input-wrapper"], ["id", "password", "name", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "required", "", 1, "form-control", 3, "ngModelChange", "type", "ngModel"], ["type", "button", "tabindex", "-1", 1, "toggle-password", 3, "click"], ["class", "alert alert-danger", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-primary", "btn-login", 3, "disabled"], [4, "ngIf"], [1, "divider"], [1, "demo-users"], ["class", "demo-user-card", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["type", "button", "title", "Acceder sin necesidad de registro", 1, "btn-guest", 3, "click"], [1, "fas", "fa-user-circle", "me-2"], [1, "fas", "fa-arrow-right", "ms-2"], [1, "login-footer"], [1, "fas", "fa-info-circle"], [1, "background-decoration"], [1, "circle", "circle-1"], [1, "circle", "circle-2"], [1, "circle", "circle-3"], [1, "alert", "alert-danger"], [1, "fas", "fa-exclamation-circle"], [1, "fas", "fa-sign-in-alt"], [1, "fas", "fa-spinner", "fa-spin"], [1, "demo-user-card", 3, "click"], [1, "demo-user-icon"], [1, "fas", 3, "ngClass"], [1, "demo-user-info"], [1, "demo-user-action"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275element(4, "i", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1");
      \u0275\u0275text(6, "MediCore");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 5);
      \u0275\u0275text(8, "Sistema de Gesti\xF3n de Cl\xEDnica");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "form", 6);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_9_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(10, "div", 7)(11, "label", 8);
      \u0275\u0275element(12, "i", 9);
      \u0275\u0275text(13, " Correo Electr\xF3nico ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_14_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 7)(16, "label", 11);
      \u0275\u0275element(17, "i", 12);
      \u0275\u0275text(18, " Contrase\xF1a ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 13)(20, "input", 14);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_20_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "button", 15);
      \u0275\u0275listener("click", function LoginComponent_Template_button_click_21_listener() {
        return ctx.togglePasswordVisibility();
      });
      \u0275\u0275element(22, "i");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(23, LoginComponent_div_23_Template, 3, 1, "div", 16);
      \u0275\u0275elementStart(24, "button", 17);
      \u0275\u0275template(25, LoginComponent_span_25_Template, 3, 0, "span", 18)(26, LoginComponent_span_26_Template, 3, 0, "span", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "div", 19)(28, "span");
      \u0275\u0275text(29, "O prueba con una cuenta de demostraci\xF3n");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 20);
      \u0275\u0275template(31, LoginComponent_div_31_Template, 12, 7, "div", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "button", 22);
      \u0275\u0275listener("click", function LoginComponent_Template_button_click_32_listener() {
        return ctx.continueAsGuest();
      });
      \u0275\u0275element(33, "i", 23);
      \u0275\u0275text(34, " Continuar como Invitado ");
      \u0275\u0275element(35, "i", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div", 25)(37, "p");
      \u0275\u0275element(38, "i", 26);
      \u0275\u0275text(39, " Sistema de uso interno ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(40, "div", 27);
      \u0275\u0275element(41, "div", 28)(42, "div", 29)(43, "div", 30);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275classProp("error", ctx.errorMessage && !ctx.email);
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275advance(6);
      \u0275\u0275classProp("error", ctx.errorMessage && !ctx.password);
      \u0275\u0275property("type", ctx.showPassword ? "text" : "password");
      \u0275\u0275twoWayProperty("ngModel", ctx.password);
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.showPassword ? "fas fa-eye-slash" : "fas fa-eye");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngForOf", ctx.demoUsers);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ['\n\n.login-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 2rem;\n  position: relative;\n  overflow: hidden;\n}\n.login-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 20px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  padding: 3rem;\n  max-width: 480px;\n  width: 100%;\n  position: relative;\n  z-index: 10;\n  animation: _ngcontent-%COMP%_slideInUp 0.5s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.login-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.logo-container[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 1rem;\n  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);\n  animation: _ngcontent-%COMP%_pulse 2s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.05);\n  }\n}\n.logo-container[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  color: white;\n}\n.login-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #2d3748;\n  font-size: 2rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n}\n.login-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  color: #718096;\n  font-size: 0.95rem;\n  margin: 0;\n}\n.login-form[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  color: #2d3748;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n  font-size: 0.9rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n  color: #667eea;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.875rem 1rem;\n  border: 2px solid #e2e8f0;\n  border-radius: 10px;\n  font-size: 1rem;\n  transition: all 0.3s ease;\n  background: #f7fafc;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  background: white;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-control.error[_ngcontent-%COMP%] {\n  border-color: #fc8181;\n  background: #fff5f5;\n}\n.form-control[_ngcontent-%COMP%]::placeholder {\n  color: #a0aec0;\n}\n.password-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.password-input-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-right: 3rem;\n}\n.toggle-password[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 1rem;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  color: #718096;\n  cursor: pointer;\n  padding: 0.5rem;\n  transition: color 0.3s ease;\n}\n.toggle-password[_ngcontent-%COMP%]:hover {\n  color: #667eea;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 0.875rem 1rem;\n  border-radius: 10px;\n  margin-bottom: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.9rem;\n  animation: _ngcontent-%COMP%_shake 0.5s ease;\n}\n@keyframes _ngcontent-%COMP%_shake {\n  0%, 100% {\n    transform: translateX(0);\n  }\n  25% {\n    transform: translateX(-5px);\n  }\n  75% {\n    transform: translateX(5px);\n  }\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background: #fff5f5;\n  color: #c53030;\n  border: 1px solid #feb2b2;\n}\n.alert[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.btn-login[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1rem;\n  border: none;\n  border-radius: 10px;\n  font-size: 1rem;\n  font-weight: 600;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);\n}\n.btn-login[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n}\n.btn-login[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: translateY(0);\n}\n.btn-login[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-login[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n}\n.divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  text-align: center;\n  margin: 2rem 0 1.5rem;\n}\n.divider[_ngcontent-%COMP%]::before, \n.divider[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  border-bottom: 1px solid #e2e8f0;\n}\n.divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 0 1rem;\n  color: #718096;\n  font-size: 0.85rem;\n}\n.demo-users[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  margin-bottom: 1.5rem;\n}\n.demo-user-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem;\n  background: #f7fafc;\n  border: 2px solid #e2e8f0;\n  border-radius: 10px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  user-select: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n}\n.demo-user-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.demo-user-card[_ngcontent-%COMP%]:hover {\n  background: white;\n  border-color: #667eea;\n  transform: translateX(5px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);\n}\n.demo-user-card.selected[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-color: #667eea;\n  transform: scale(1.02);\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);\n}\n.demo-user-card.selected[_ngcontent-%COMP%]   .demo-user-icon[_ngcontent-%COMP%] {\n  background: white;\n}\n.demo-user-card.selected[_ngcontent-%COMP%]   .demo-user-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #667eea;\n}\n.demo-user-card.selected[_ngcontent-%COMP%]   .demo-user-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \n.demo-user-card.selected[_ngcontent-%COMP%]   .demo-user-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.demo-user-card.selected[_ngcontent-%COMP%]   .demo-user-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: white;\n}\n.demo-user-card.selected[_ngcontent-%COMP%]   .demo-user-action[_ngcontent-%COMP%] {\n  color: white;\n}\n.demo-user-icon[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.demo-user-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: white;\n}\n.demo-user-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.demo-user-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #2d3748;\n  margin: 0 0 0.25rem;\n}\n.demo-user-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #718096;\n  margin: 0 0 0.25rem;\n  word-break: break-all;\n}\n.demo-user-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #a0aec0;\n}\n.demo-user-action[_ngcontent-%COMP%] {\n  color: #667eea;\n  font-size: 1.25rem;\n  flex-shrink: 0;\n}\n.btn-guest[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1.25rem 1rem;\n  margin-top: 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #48bb78 0%,\n      #38a169 100%);\n  color: white;\n  border: none;\n  border-radius: 10px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n.btn-guest[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #38a169 0%,\n      #2f855a 100%);\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(72, 187, 120, 0.4);\n}\n.btn-guest[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.btn-guest[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.login-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  padding-top: 1.5rem;\n  border-top: 1px solid #e2e8f0;\n}\n.login-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #718096;\n  font-size: 0.85rem;\n  margin: 0;\n}\n.login-footer[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n}\n.background-decoration[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  z-index: 1;\n}\n.circle[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.1);\n  animation: _ngcontent-%COMP%_float 20s ease-in-out infinite;\n}\n.circle-1[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  top: -150px;\n  right: -100px;\n  animation-delay: 0s;\n}\n.circle-2[_ngcontent-%COMP%] {\n  width: 200px;\n  height: 200px;\n  bottom: -100px;\n  left: -50px;\n  animation-delay: 5s;\n}\n.circle-3[_ngcontent-%COMP%] {\n  width: 150px;\n  height: 150px;\n  top: 50%;\n  left: -75px;\n  animation-delay: 10s;\n}\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(30px, -30px) scale(1.1);\n  }\n  66% {\n    transform: translate(-20px, 20px) scale(0.9);\n  }\n}\n@media (max-width: 576px) {\n  .login-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .login-card[_ngcontent-%COMP%] {\n    padding: 2rem 1.5rem;\n  }\n  .login-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .logo-container[_ngcontent-%COMP%] {\n    width: 60px;\n    height: 60px;\n  }\n  .logo-container[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .demo-user-card[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .demo-user-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n  }\n  .demo-user-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n  .demo-user-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .demo-user-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n  }\n  .demo-user-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n    font-size: 0.7rem;\n  }\n  .btn-guest[_ngcontent-%COMP%] {\n    padding: 0.875rem;\n    font-size: 0.95rem;\n  }\n  .btn-guest[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="login-container">
  <div class="login-card">
    <!-- Header -->
    <div class="login-header">
      <div class="logo-container">
        <i class="fas fa-heartbeat"></i>
      </div>
      <h1>MediCore</h1>
      <p class="subtitle">Sistema de Gesti\xF3n de Cl\xEDnica</p>
    </div>

    <!-- Formulario de Login -->
    <form (ngSubmit)="onSubmit()" class="login-form">
      <!-- Email -->
      <div class="form-group">
        <label for="email">
          <i class="fas fa-envelope"></i>
          Correo Electr\xF3nico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          [(ngModel)]="email"
          placeholder="ejemplo@correo.com"
          class="form-control"
          [class.error]="errorMessage && !email"
          required
        />
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">
          <i class="fas fa-lock"></i>
          Contrase\xF1a
        </label>
        <div class="password-input-wrapper">
          <input
            [type]="showPassword ? 'text' : 'password'"
            id="password"
            name="password"
            [(ngModel)]="password"
            placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
            class="form-control"
            [class.error]="errorMessage && !password"
            required
          />
          <button
            type="button"
            class="toggle-password"
            (click)="togglePasswordVisibility()"
            tabindex="-1"
          >
            <i [class]="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
      </div>

      <!-- Error Message -->
      <div class="alert alert-danger" *ngIf="errorMessage">
        <i class="fas fa-exclamation-circle"></i>
        {{ errorMessage }}
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="btn btn-primary btn-login"
        [disabled]="isLoading"
      >
        <span *ngIf="!isLoading">
          <i class="fas fa-sign-in-alt"></i>
          Iniciar Sesi\xF3n
        </span>
        <span *ngIf="isLoading">
          <i class="fas fa-spinner fa-spin"></i>
          Iniciando...
        </span>
      </button>
    </form>

    <!-- Divider -->
    <div class="divider">
      <span>O prueba con una cuenta de demostraci\xF3n</span>
    </div>

    <!-- Demo Users -->
    <div class="demo-users">
      <div
        *ngFor="let user of demoUsers; let i = index"
        class="demo-user-card"
        [class.selected]="selectedDemoUser === i"
        (click)="useDemoUser(i)"
      >
        <div class="demo-user-icon">
          <i class="fas" [ngClass]="user.icon"></i>
        </div>
        <div class="demo-user-info">
          <h4>{{ user.role }}</h4>
          <p>{{ user.email }}</p>
          <small>Contrase\xF1a: {{ user.password }}</small>
        </div>
        <div class="demo-user-action">
          <i class="fas" [ngClass]="selectedDemoUser === i ? 'fa-check-circle' : 'fa-arrow-right'"></i>
        </div>
      </div>
    </div>

    <!-- Bot\xF3n Invitado -->
    <button 
      type="button" 
      class="btn-guest" 
      (click)="continueAsGuest()"
      title="Acceder sin necesidad de registro"
    >
      <i class="fas fa-user-circle me-2"></i>
      Continuar como Invitado
      <i class="fas fa-arrow-right ms-2"></i>
    </button>

    <!-- Footer -->
    <div class="login-footer">
      <p>
        <i class="fas fa-info-circle"></i>
        Sistema de uso interno
      </p>
    </div>
  </div>

  <!-- Background Decoration -->
  <div class="background-decoration">
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
    <div class="circle circle-3"></div>
  </div>
</div>
`, styles: ['/* src/app/pages/Autenticacion/login/login.component.css */\n.login-container {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 2rem;\n  position: relative;\n  overflow: hidden;\n}\n.login-card {\n  background: white;\n  border-radius: 20px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  padding: 3rem;\n  max-width: 480px;\n  width: 100%;\n  position: relative;\n  z-index: 10;\n  animation: slideInUp 0.5s ease-out;\n}\n@keyframes slideInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.login-header {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.logo-container {\n  width: 80px;\n  height: 80px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 1rem;\n  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);\n  animation: pulse 2s ease-in-out infinite;\n}\n@keyframes pulse {\n  0%, 100% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.05);\n  }\n}\n.logo-container i {\n  font-size: 2.5rem;\n  color: white;\n}\n.login-header h1 {\n  color: #2d3748;\n  font-size: 2rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n}\n.login-header .subtitle {\n  color: #718096;\n  font-size: 0.95rem;\n  margin: 0;\n}\n.login-form {\n  margin-bottom: 1.5rem;\n}\n.form-group {\n  margin-bottom: 1.5rem;\n}\n.form-group label {\n  display: block;\n  color: #2d3748;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n  font-size: 0.9rem;\n}\n.form-group label i {\n  margin-right: 0.5rem;\n  color: #667eea;\n}\n.form-control {\n  width: 100%;\n  padding: 0.875rem 1rem;\n  border: 2px solid #e2e8f0;\n  border-radius: 10px;\n  font-size: 1rem;\n  transition: all 0.3s ease;\n  background: #f7fafc;\n}\n.form-control:focus {\n  outline: none;\n  border-color: #667eea;\n  background: white;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-control.error {\n  border-color: #fc8181;\n  background: #fff5f5;\n}\n.form-control::placeholder {\n  color: #a0aec0;\n}\n.password-input-wrapper {\n  position: relative;\n}\n.password-input-wrapper input {\n  padding-right: 3rem;\n}\n.toggle-password {\n  position: absolute;\n  right: 1rem;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  color: #718096;\n  cursor: pointer;\n  padding: 0.5rem;\n  transition: color 0.3s ease;\n}\n.toggle-password:hover {\n  color: #667eea;\n}\n.alert {\n  padding: 0.875rem 1rem;\n  border-radius: 10px;\n  margin-bottom: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.9rem;\n  animation: shake 0.5s ease;\n}\n@keyframes shake {\n  0%, 100% {\n    transform: translateX(0);\n  }\n  25% {\n    transform: translateX(-5px);\n  }\n  75% {\n    transform: translateX(5px);\n  }\n}\n.alert-danger {\n  background: #fff5f5;\n  color: #c53030;\n  border: 1px solid #feb2b2;\n}\n.alert i {\n  font-size: 1rem;\n}\n.btn-login {\n  width: 100%;\n  padding: 1rem;\n  border: none;\n  border-radius: 10px;\n  font-size: 1rem;\n  font-weight: 600;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);\n}\n.btn-login:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n}\n.btn-login:active:not(:disabled) {\n  transform: translateY(0);\n}\n.btn-login:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-login i {\n  margin-right: 0.5rem;\n}\n.divider {\n  display: flex;\n  align-items: center;\n  text-align: center;\n  margin: 2rem 0 1.5rem;\n}\n.divider::before,\n.divider::after {\n  content: "";\n  flex: 1;\n  border-bottom: 1px solid #e2e8f0;\n}\n.divider span {\n  padding: 0 1rem;\n  color: #718096;\n  font-size: 0.85rem;\n}\n.demo-users {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  margin-bottom: 1.5rem;\n}\n.demo-user-card {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem;\n  background: #f7fafc;\n  border: 2px solid #e2e8f0;\n  border-radius: 10px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  user-select: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n}\n.demo-user-card:active {\n  transform: scale(0.98);\n}\n.demo-user-card:hover {\n  background: white;\n  border-color: #667eea;\n  transform: translateX(5px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);\n}\n.demo-user-card.selected {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-color: #667eea;\n  transform: scale(1.02);\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);\n}\n.demo-user-card.selected .demo-user-icon {\n  background: white;\n}\n.demo-user-card.selected .demo-user-icon i {\n  color: #667eea;\n}\n.demo-user-card.selected .demo-user-info h4,\n.demo-user-card.selected .demo-user-info p,\n.demo-user-card.selected .demo-user-info small {\n  color: white;\n}\n.demo-user-card.selected .demo-user-action {\n  color: white;\n}\n.demo-user-icon {\n  width: 50px;\n  height: 50px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.demo-user-icon i {\n  font-size: 1.5rem;\n  color: white;\n}\n.demo-user-info {\n  flex: 1;\n  min-width: 0;\n}\n.demo-user-info h4 {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #2d3748;\n  margin: 0 0 0.25rem;\n}\n.demo-user-info p {\n  font-size: 0.85rem;\n  color: #718096;\n  margin: 0 0 0.25rem;\n  word-break: break-all;\n}\n.demo-user-info small {\n  font-size: 0.75rem;\n  color: #a0aec0;\n}\n.demo-user-action {\n  color: #667eea;\n  font-size: 1.25rem;\n  flex-shrink: 0;\n}\n.btn-guest {\n  width: 100%;\n  padding: 1.25rem 1rem;\n  margin-top: 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #48bb78 0%,\n      #38a169 100%);\n  color: white;\n  border: none;\n  border-radius: 10px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n.btn-guest:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #38a169 0%,\n      #2f855a 100%);\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(72, 187, 120, 0.4);\n}\n.btn-guest:active {\n  transform: translateY(0);\n}\n.btn-guest i {\n  font-size: 1.1rem;\n}\n.login-footer {\n  text-align: center;\n  padding-top: 1.5rem;\n  border-top: 1px solid #e2e8f0;\n}\n.login-footer p {\n  color: #718096;\n  font-size: 0.85rem;\n  margin: 0;\n}\n.login-footer i {\n  margin-right: 0.5rem;\n}\n.background-decoration {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  z-index: 1;\n}\n.circle {\n  position: absolute;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.1);\n  animation: float 20s ease-in-out infinite;\n}\n.circle-1 {\n  width: 300px;\n  height: 300px;\n  top: -150px;\n  right: -100px;\n  animation-delay: 0s;\n}\n.circle-2 {\n  width: 200px;\n  height: 200px;\n  bottom: -100px;\n  left: -50px;\n  animation-delay: 5s;\n}\n.circle-3 {\n  width: 150px;\n  height: 150px;\n  top: 50%;\n  left: -75px;\n  animation-delay: 10s;\n}\n@keyframes float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(30px, -30px) scale(1.1);\n  }\n  66% {\n    transform: translate(-20px, 20px) scale(0.9);\n  }\n}\n@media (max-width: 576px) {\n  .login-container {\n    padding: 1rem;\n  }\n  .login-card {\n    padding: 2rem 1.5rem;\n  }\n  .login-header h1 {\n    font-size: 1.5rem;\n  }\n  .logo-container {\n    width: 60px;\n    height: 60px;\n  }\n  .logo-container i {\n    font-size: 2rem;\n  }\n  .demo-user-card {\n    padding: 0.75rem;\n  }\n  .demo-user-icon {\n    width: 40px;\n    height: 40px;\n  }\n  .demo-user-icon i {\n    font-size: 1.25rem;\n  }\n  .demo-user-info h4 {\n    font-size: 0.9rem;\n  }\n  .demo-user-info p {\n    font-size: 0.75rem;\n  }\n  .demo-user-info small {\n    font-size: 0.7rem;\n  }\n  .btn-guest {\n    padding: 0.875rem;\n    font-size: 0.95rem;\n  }\n  .btn-guest i {\n    font-size: 1rem;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */\n'] }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/pages/Autenticacion/login/login.component.ts", lineNumber: 14 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-4NHAMKPI.js.map
