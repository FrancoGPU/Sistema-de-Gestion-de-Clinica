import {
  Router,
  RouterLink,
  RouterModule
} from "./chunk-DMXX7ROZ.js";
import {
  CheckboxControlValueAccessor,
  CheckboxRequiredValidator,
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-MHHJUQRX.js";
import {
  CommonModule
} from "./chunk-D5MRJCXJ.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-AR7JWTXA.js";

// src/app/pages/Autenticacion/registro/registro.component.ts
var RegistroComponent = class _RegistroComponent {
  router;
  formData = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    dni: "",
    fechaNacimiento: "",
    password: "",
    confirmPassword: "",
    aceptaTerminos: false
  };
  constructor(router) {
    this.router = router;
  }
  onSubmit() {
    if (this.formData.password !== this.formData.confirmPassword) {
      alert("Las contrase\xF1as no coinciden");
      return;
    }
    console.log("Registro:", this.formData);
    alert("\xA1Registro exitoso! Ahora puedes iniciar sesi\xF3n.");
    this.router.navigate(["/login"]);
  }
  static \u0275fac = function RegistroComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RegistroComponent)(\u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegistroComponent, selectors: [["app-registro"]], decls: 65, vars: 10, consts: [["registroForm", "ngForm"], [1, "py-5"], [1, "container"], [1, "row", "justify-content-center"], [1, "col-lg-8"], [1, "card", "shadow"], [1, "card-header", "bg-primary", "text-white", "text-center"], [1, "fas", "fa-user-plus", "me-2"], [1, "mb-0"], [1, "card-body", "p-4"], [3, "ngSubmit"], [1, "row"], [1, "col-md-6", "mb-3"], ["for", "nombre", 1, "form-label"], ["type", "text", "id", "nombre", "name", "nombre", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "apellido", 1, "form-label"], ["type", "text", "id", "apellido", "name", "apellido", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "email", 1, "form-label"], ["type", "email", "id", "email", "name", "email", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "telefono", 1, "form-label"], ["type", "tel", "id", "telefono", "name", "telefono", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "dni", 1, "form-label"], ["type", "text", "id", "dni", "name", "dni", "required", "", "maxlength", "8", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "fechaNacimiento", 1, "form-label"], ["type", "date", "id", "fechaNacimiento", "name", "fechaNacimiento", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "password", 1, "form-label"], ["type", "password", "id", "password", "name", "password", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "confirmPassword", 1, "form-label"], ["type", "password", "id", "confirmPassword", "name", "confirmPassword", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "mb-3", "form-check"], ["type", "checkbox", "id", "terminos", "name", "aceptaTerminos", "required", "", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "terminos", 1, "form-check-label"], ["href", "#"], ["type", "submit", 1, "btn", "btn-primary", "btn-lg", "w-100", 3, "disabled"], [1, "text-center", "mt-3"], ["routerLink", "/login"]], template: function RegistroComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5)(5, "div", 6)(6, "h2");
      \u0275\u0275element(7, "i", 7);
      \u0275\u0275text(8, "Registro de Paciente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 8);
      \u0275\u0275text(10, "Crea tu cuenta para acceder a nuestros servicios");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 9)(12, "form", 10, 0);
      \u0275\u0275listener("ngSubmit", function RegistroComponent_Template_form_ngSubmit_12_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSubmit());
      });
      \u0275\u0275elementStart(14, "div", 11)(15, "div", 12)(16, "label", 13);
      \u0275\u0275text(17, "Nombre *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "input", 14);
      \u0275\u0275twoWayListener("ngModelChange", function RegistroComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.nombre, $event) || (ctx.formData.nombre = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 12)(20, "label", 15);
      \u0275\u0275text(21, "Apellido *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "input", 16);
      \u0275\u0275twoWayListener("ngModelChange", function RegistroComponent_Template_input_ngModelChange_22_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.apellido, $event) || (ctx.formData.apellido = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "div", 11)(24, "div", 12)(25, "label", 17);
      \u0275\u0275text(26, "Correo Electr\xF3nico *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "input", 18);
      \u0275\u0275twoWayListener("ngModelChange", function RegistroComponent_Template_input_ngModelChange_27_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.email, $event) || (ctx.formData.email = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "div", 12)(29, "label", 19);
      \u0275\u0275text(30, "Tel\xE9fono *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "input", 20);
      \u0275\u0275twoWayListener("ngModelChange", function RegistroComponent_Template_input_ngModelChange_31_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.telefono, $event) || (ctx.formData.telefono = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "div", 11)(33, "div", 12)(34, "label", 21);
      \u0275\u0275text(35, "DNI *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "input", 22);
      \u0275\u0275twoWayListener("ngModelChange", function RegistroComponent_Template_input_ngModelChange_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.dni, $event) || (ctx.formData.dni = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "div", 12)(38, "label", 23);
      \u0275\u0275text(39, "Fecha de Nacimiento *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "input", 24);
      \u0275\u0275twoWayListener("ngModelChange", function RegistroComponent_Template_input_ngModelChange_40_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.fechaNacimiento, $event) || (ctx.formData.fechaNacimiento = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(41, "div", 11)(42, "div", 12)(43, "label", 25);
      \u0275\u0275text(44, "Contrase\xF1a *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "input", 26);
      \u0275\u0275twoWayListener("ngModelChange", function RegistroComponent_Template_input_ngModelChange_45_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.password, $event) || (ctx.formData.password = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "div", 12)(47, "label", 27);
      \u0275\u0275text(48, "Confirmar Contrase\xF1a *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "input", 28);
      \u0275\u0275twoWayListener("ngModelChange", function RegistroComponent_Template_input_ngModelChange_49_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.confirmPassword, $event) || (ctx.formData.confirmPassword = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(50, "div", 29)(51, "input", 30);
      \u0275\u0275twoWayListener("ngModelChange", function RegistroComponent_Template_input_ngModelChange_51_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.aceptaTerminos, $event) || (ctx.formData.aceptaTerminos = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "label", 31);
      \u0275\u0275text(53, " Acepto los ");
      \u0275\u0275elementStart(54, "a", 32);
      \u0275\u0275text(55, "t\xE9rminos y condiciones");
      \u0275\u0275elementEnd();
      \u0275\u0275text(56, " * ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(57, "button", 33);
      \u0275\u0275element(58, "i", 7);
      \u0275\u0275text(59, "Registrarse ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "div", 34)(61, "p");
      \u0275\u0275text(62, "\xBFYa tienes cuenta? ");
      \u0275\u0275elementStart(63, "a", 35);
      \u0275\u0275text(64, "Inicia sesi\xF3n aqu\xED");
      \u0275\u0275elementEnd()()()()()()()()()();
    }
    if (rf & 2) {
      const registroForm_r2 = \u0275\u0275reference(13);
      \u0275\u0275advance(18);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.nombre);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.apellido);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.email);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.telefono);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.dni);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.fechaNacimiento);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.password);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.confirmPassword);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.aceptaTerminos);
      \u0275\u0275advance(6);
      \u0275\u0275property("disabled", !registroForm_r2.valid);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, CheckboxRequiredValidator, NgModel, NgForm, RouterModule, RouterLink], styles: ["\n\n.card-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%) !important;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #333;\n}\n.form-control[_ngcontent-%COMP%] {\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 0.75rem 1rem;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  border-color: #667eea;\n  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border: none;\n  padding: 0.75rem 2rem;\n  font-weight: 600;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\nbody.dark-mode[_ngcontent-%COMP%]   .form-label[_ngcontent-%COMP%] {\n  color: #fff;\n}\nbody.dark-mode[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  background: #1a202c;\n  border-color: #4a5568;\n  color: #fff;\n}\nbody.dark-mode[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  background: #2d3748;\n}\n/*# sourceMappingURL=registro.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegistroComponent, [{
    type: Component,
    args: [{ selector: "app-registro", imports: [CommonModule, FormsModule, RouterModule], template: '<div class="py-5">\n  <div class="container">\n    <div class="row justify-content-center">\n      <div class="col-lg-8">\n        <div class="card shadow">\n          <div class="card-header bg-primary text-white text-center">\n            <h2><i class="fas fa-user-plus me-2"></i>Registro de Paciente</h2>\n            <p class="mb-0">Crea tu cuenta para acceder a nuestros servicios</p>\n          </div>\n          <div class="card-body p-4">\n            <form (ngSubmit)="onSubmit()" #registroForm="ngForm">\n              <div class="row">\n                <div class="col-md-6 mb-3">\n                  <label for="nombre" class="form-label">Nombre *</label>\n                  <input type="text" class="form-control" id="nombre" [(ngModel)]="formData.nombre" name="nombre" required>\n                </div>\n                <div class="col-md-6 mb-3">\n                  <label for="apellido" class="form-label">Apellido *</label>\n                  <input type="text" class="form-control" id="apellido" [(ngModel)]="formData.apellido" name="apellido" required>\n                </div>\n              </div>\n              <div class="row">\n                <div class="col-md-6 mb-3">\n                  <label for="email" class="form-label">Correo Electr\xF3nico *</label>\n                  <input type="email" class="form-control" id="email" [(ngModel)]="formData.email" name="email" required>\n                </div>\n                <div class="col-md-6 mb-3">\n                  <label for="telefono" class="form-label">Tel\xE9fono *</label>\n                  <input type="tel" class="form-control" id="telefono" [(ngModel)]="formData.telefono" name="telefono" required>\n                </div>\n              </div>\n              <div class="row">\n                <div class="col-md-6 mb-3">\n                  <label for="dni" class="form-label">DNI *</label>\n                  <input type="text" class="form-control" id="dni" [(ngModel)]="formData.dni" name="dni" required maxlength="8">\n                </div>\n                <div class="col-md-6 mb-3">\n                  <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento *</label>\n                  <input type="date" class="form-control" id="fechaNacimiento" [(ngModel)]="formData.fechaNacimiento" name="fechaNacimiento" required>\n                </div>\n              </div>\n              <div class="row">\n                <div class="col-md-6 mb-3">\n                  <label for="password" class="form-label">Contrase\xF1a *</label>\n                  <input type="password" class="form-control" id="password" [(ngModel)]="formData.password" name="password" required>\n                </div>\n                <div class="col-md-6 mb-3">\n                  <label for="confirmPassword" class="form-label">Confirmar Contrase\xF1a *</label>\n                  <input type="password" class="form-control" id="confirmPassword" [(ngModel)]="formData.confirmPassword" name="confirmPassword" required>\n                </div>\n              </div>\n              <div class="mb-3 form-check">\n                <input type="checkbox" class="form-check-input" id="terminos" [(ngModel)]="formData.aceptaTerminos" name="aceptaTerminos" required>\n                <label class="form-check-label" for="terminos">\n                  Acepto los <a href="#">t\xE9rminos y condiciones</a> *\n                </label>\n              </div>\n              <button type="submit" class="btn btn-primary btn-lg w-100" [disabled]="!registroForm.valid">\n                <i class="fas fa-user-plus me-2"></i>Registrarse\n              </button>\n              <div class="text-center mt-3">\n                <p>\xBFYa tienes cuenta? <a routerLink="/login">Inicia sesi\xF3n aqu\xED</a></p>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n', styles: ["/* src/app/pages/Autenticacion/registro/registro.component.css */\n.card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%) !important;\n}\n.form-label {\n  font-weight: 500;\n  color: #333;\n}\n.form-control {\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 0.75rem 1rem;\n}\n.form-control:focus {\n  border-color: #667eea;\n  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);\n}\n.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border: none;\n  padding: 0.75rem 2rem;\n  font-weight: 600;\n}\n.btn-primary:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);\n}\n.btn-primary:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\nbody.dark-mode .form-label {\n  color: #fff;\n}\nbody.dark-mode .form-control {\n  background: #1a202c;\n  border-color: #4a5568;\n  color: #fff;\n}\nbody.dark-mode .card {\n  background: #2d3748;\n}\n/*# sourceMappingURL=registro.component.css.map */\n"] }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegistroComponent, { className: "RegistroComponent", filePath: "src/app/pages/Autenticacion/registro/registro.component.ts", lineNumber: 12 });
})();
export {
  RegistroComponent
};
//# sourceMappingURL=chunk-DXOCOYYI.js.map
