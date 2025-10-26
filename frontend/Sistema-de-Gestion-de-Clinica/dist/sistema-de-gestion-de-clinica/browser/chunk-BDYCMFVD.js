import {
  AdminHeaderComponent
} from "./chunk-EH622HHE.js";
import "./chunk-6JYT5V5N.js";
import {
  RouterLink
} from "./chunk-DMXX7ROZ.js";
import {
  DefaultValueAccessor,
  EmailValidator,
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
  NgIf
} from "./chunk-D5MRJCXJ.js";
import {
  Component,
  ViewEncapsulation,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-AR7JWTXA.js";

// src/app/pages/Pacientes/formulario/formulario.component.ts
function FormularioComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275text(1, " El nombre es requerido ");
    \u0275\u0275elementEnd();
  }
}
function FormularioComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275text(1, " El apellido es requerido ");
    \u0275\u0275elementEnd();
  }
}
function FormularioComponent_div_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275text(1, " Ingrese un email v\xE1lido ");
    \u0275\u0275elementEnd();
  }
}
var FormularioComponent = class _FormularioComponent {
  paciente = {
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    email: "",
    telefono: "",
    direccion: ""
  };
  guardarPaciente() {
    console.log("Guardando paciente:", this.paciente);
  }
  static \u0275fac = function FormularioComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormularioComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormularioComponent, selectors: [["app-formulario"]], decls: 73, vars: 18, consts: [["pacienteForm", "ngForm"], ["nombre", "ngModel"], ["apellido", "ngModel"], ["email", "ngModel"], [1, "pacientes-formulario-container"], [1, "container-fluid", "mt-4"], [1, "row"], [1, "col-12"], [1, "fas", "fa-user", "me-2"], [1, "col-md-8"], [1, "card", "form-card"], [1, "card-body"], [3, "ngSubmit"], [1, "col-md-6", "mb-3"], ["for", "nombre", 1, "form-label"], ["type", "text", "id", "nombre", "name", "nombre", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["class", "invalid-feedback", 4, "ngIf"], ["for", "apellido", 1, "form-label"], ["type", "text", "id", "apellido", "name", "apellido", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "dni", 1, "form-label"], ["type", "text", "id", "dni", "name", "dni", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "fechaNacimiento", 1, "form-label"], ["type", "date", "id", "fechaNacimiento", "name", "fechaNacimiento", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "email", 1, "form-label"], ["type", "email", "id", "email", "name", "email", "email", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "telefono", 1, "form-label"], ["type", "tel", "id", "telefono", "name", "telefono", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "mb-3"], ["for", "direccion", 1, "form-label"], ["id", "direccion", "name", "direccion", "rows", "3", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "d-flex", "justify-content-between", "form-actions"], ["routerLink", "/pacientes/lista", 1, "btn", "btn-secondary", "btn-action"], [1, "fas", "fa-arrow-left", "me-1"], ["type", "submit", 1, "btn", "btn-primary", "btn-action", 3, "disabled"], [1, "fas", "fa-save", "me-1"], [1, "col-md-4"], [1, "card", "info-card"], [1, "card-header"], [1, "mb-0"], [1, "fas", "fa-info-circle", "me-1"], [1, "text-muted", "small"], [1, "fas", "fa-asterisk", "text-danger", "me-1"], [1, "text-muted", "small", "mb-0"], [1, "fas", "fa-shield-alt", "text-primary", "me-1"], [1, "invalid-feedback"]], template: function FormularioComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "app-admin-header");
      \u0275\u0275elementStart(1, "div", 4)(2, "div", 5)(3, "div", 6)(4, "div", 7)(5, "h1");
      \u0275\u0275element(6, "i", 8);
      \u0275\u0275elementStart(7, "span");
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(9, "div", 6)(10, "div", 9)(11, "div", 10)(12, "div", 11)(13, "form", 12, 0);
      \u0275\u0275listener("ngSubmit", function FormularioComponent_Template_form_ngSubmit_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.guardarPaciente());
      });
      \u0275\u0275elementStart(15, "div", 6)(16, "div", 13)(17, "label", 14);
      \u0275\u0275text(18, "Nombre *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "input", 15, 1);
      \u0275\u0275twoWayListener("ngModelChange", function FormularioComponent_Template_input_ngModelChange_19_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.paciente.nombre, $event) || (ctx.paciente.nombre = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(21, FormularioComponent_div_21_Template, 2, 0, "div", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 13)(23, "label", 17);
      \u0275\u0275text(24, "Apellido *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "input", 18, 2);
      \u0275\u0275twoWayListener("ngModelChange", function FormularioComponent_Template_input_ngModelChange_25_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.paciente.apellido, $event) || (ctx.paciente.apellido = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(27, FormularioComponent_div_27_Template, 2, 0, "div", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "div", 6)(29, "div", 13)(30, "label", 19);
      \u0275\u0275text(31, "DNI");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "input", 20);
      \u0275\u0275twoWayListener("ngModelChange", function FormularioComponent_Template_input_ngModelChange_32_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.paciente.dni, $event) || (ctx.paciente.dni = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "div", 13)(34, "label", 21);
      \u0275\u0275text(35, "Fecha de Nacimiento");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "input", 22);
      \u0275\u0275twoWayListener("ngModelChange", function FormularioComponent_Template_input_ngModelChange_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.paciente.fechaNacimiento, $event) || (ctx.paciente.fechaNacimiento = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "div", 6)(38, "div", 13)(39, "label", 23);
      \u0275\u0275text(40, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "input", 24, 3);
      \u0275\u0275twoWayListener("ngModelChange", function FormularioComponent_Template_input_ngModelChange_41_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.paciente.email, $event) || (ctx.paciente.email = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(43, FormularioComponent_div_43_Template, 2, 0, "div", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 13)(45, "label", 25);
      \u0275\u0275text(46, "Tel\xE9fono");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "input", 26);
      \u0275\u0275twoWayListener("ngModelChange", function FormularioComponent_Template_input_ngModelChange_47_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.paciente.telefono, $event) || (ctx.paciente.telefono = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(48, "div", 27)(49, "label", 28);
      \u0275\u0275text(50, "Direcci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "textarea", 29);
      \u0275\u0275twoWayListener("ngModelChange", function FormularioComponent_Template_textarea_ngModelChange_51_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.paciente.direccion, $event) || (ctx.paciente.direccion = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(52, "div", 30)(53, "a", 31);
      \u0275\u0275element(54, "i", 32);
      \u0275\u0275text(55, "Volver ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "button", 33);
      \u0275\u0275element(57, "i", 34);
      \u0275\u0275text(58, "Guardar ");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(59, "div", 35)(60, "div", 36)(61, "div", 37)(62, "h6", 38);
      \u0275\u0275element(63, "i", 39);
      \u0275\u0275text(64, " Informaci\xF3n ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(65, "div", 11)(66, "p", 40);
      \u0275\u0275element(67, "i", 41);
      \u0275\u0275text(68, " Los campos marcados con asterisco (*) son obligatorios. ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(69, "hr");
      \u0275\u0275elementStart(70, "p", 42);
      \u0275\u0275element(71, "i", 43);
      \u0275\u0275text(72, " El email y DNI deben ser \xFAnicos en el sistema. ");
      \u0275\u0275elementEnd()()()()()()();
    }
    if (rf & 2) {
      const pacienteForm_r2 = \u0275\u0275reference(14);
      const nombre_r3 = \u0275\u0275reference(20);
      const apellido_r4 = \u0275\u0275reference(26);
      const email_r5 = \u0275\u0275reference(42);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.paciente.id ? "Editar Paciente" : "Nuevo Paciente");
      \u0275\u0275advance(11);
      \u0275\u0275classProp("is-invalid", nombre_r3.invalid && nombre_r3.touched);
      \u0275\u0275twoWayProperty("ngModel", ctx.paciente.nombre);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", nombre_r3.invalid && nombre_r3.touched);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("is-invalid", apellido_r4.invalid && apellido_r4.touched);
      \u0275\u0275twoWayProperty("ngModel", ctx.paciente.apellido);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", apellido_r4.invalid && apellido_r4.touched);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.paciente.dni);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.paciente.fechaNacimiento);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("is-invalid", email_r5.invalid && email_r5.touched);
      \u0275\u0275twoWayProperty("ngModel", ctx.paciente.email);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", email_r5.invalid && email_r5.touched);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.paciente.telefono);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.paciente.direccion);
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", pacienteForm_r2.invalid);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, EmailValidator, NgModel, NgForm, RouterLink, AdminHeaderComponent], styles: ["/* src/app/pages/Pacientes/formulario/formulario.component.css */\n.pacientes-formulario-container {\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  padding-bottom: 2rem;\n}\n.pacientes-formulario-container h1 {\n  font-weight: 700;\n  color: #2c3e50;\n  font-size: 2.5rem;\n  margin-bottom: 1.5rem;\n}\n.pacientes-formulario-container h1 i {\n  color: #667eea;\n}\n.form-card {\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.form-card .card-body {\n  padding: 2rem;\n}\n.form-label {\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 0.5rem;\n  font-size: 0.95rem;\n}\n.form-control {\n  border-radius: 8px;\n  border: 2px solid #e0e0e0;\n  padding: 0.75rem 1rem;\n  transition: all 0.3s ease;\n  font-size: 0.95rem;\n}\n.form-control:focus {\n  border-color: #667eea;\n  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);\n}\n.form-control.is-invalid {\n  border-color: #dc3545;\n}\n.form-control.is-invalid:focus {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.invalid-feedback {\n  display: block;\n  margin-top: 0.5rem;\n  font-size: 0.875rem;\n}\n.form-actions {\n  margin-top: 2rem;\n  padding-top: 1.5rem;\n  border-top: 2px solid #e9ecef;\n}\n.btn-action {\n  padding: 0.75rem 2rem;\n  font-weight: 600;\n  border-radius: 50px;\n  transition: all 0.3s ease;\n  font-size: 1rem;\n}\n.btn-action:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);\n}\n.btn-action:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.info-card {\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n  position: sticky;\n  top: 20px;\n}\n.info-card .card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border-bottom: none;\n  border-radius: 16px 16px 0 0 !important;\n  padding: 1rem 1.5rem;\n}\n.info-card .card-header h6 {\n  font-weight: 600;\n  margin: 0;\n}\n.info-card .card-body {\n  padding: 1.5rem;\n}\n.info-card hr {\n  margin: 1rem 0;\n  opacity: 0.2;\n}\n@media (max-width: 768px) {\n  .pacientes-formulario-container h1 {\n    font-size: 1.8rem;\n  }\n  .form-card .card-body {\n    padding: 1.5rem 1rem;\n  }\n  .form-actions {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .btn-action {\n    width: 100%;\n  }\n  .info-card {\n    position: static;\n    margin-top: 2rem;\n  }\n}\n/*# sourceMappingURL=formulario.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormularioComponent, [{
    type: Component,
    args: [{ selector: "app-formulario", standalone: true, imports: [CommonModule, FormsModule, RouterLink, AdminHeaderComponent], encapsulation: ViewEncapsulation.None, template: `<app-admin-header></app-admin-header>

<div class="pacientes-formulario-container">
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-12">
        <h1>
          <i class="fas fa-user me-2"></i>
          <span>{{ paciente.id ? 'Editar Paciente' : 'Nuevo Paciente' }}</span>
        </h1>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8">
        <div class="card form-card">
          <div class="card-body">
            <form (ngSubmit)="guardarPaciente()" #pacienteForm="ngForm">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="nombre" class="form-label">Nombre *</label>
                  <input type="text" 
                         class="form-control" 
                         id="nombre"
                         name="nombre"
                         [(ngModel)]="paciente.nombre" 
                         required
                         #nombre="ngModel"
                         [class.is-invalid]="nombre.invalid && nombre.touched">
                  <div class="invalid-feedback" *ngIf="nombre.invalid && nombre.touched">
                    El nombre es requerido
                  </div>
                </div>
                
                <div class="col-md-6 mb-3">
                  <label for="apellido" class="form-label">Apellido *</label>
                  <input type="text" 
                         class="form-control" 
                         id="apellido"
                         name="apellido"
                         [(ngModel)]="paciente.apellido"
                         required
                         #apellido="ngModel"
                         [class.is-invalid]="apellido.invalid && apellido.touched">
                  <div class="invalid-feedback" *ngIf="apellido.invalid && apellido.touched">
                    El apellido es requerido
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="dni" class="form-label">DNI</label>
                  <input type="text" 
                         class="form-control" 
                         id="dni"
                         name="dni"
                         [(ngModel)]="paciente.dni">
                </div>
                
                <div class="col-md-6 mb-3">
                  <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento</label>
                  <input type="date" 
                         class="form-control" 
                         id="fechaNacimiento"
                         name="fechaNacimiento"
                         [(ngModel)]="paciente.fechaNacimiento">
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" 
                         class="form-control" 
                         id="email"
                         name="email"
                         [(ngModel)]="paciente.email"
                         email
                         #email="ngModel"
                         [class.is-invalid]="email.invalid && email.touched">
                  <div class="invalid-feedback" *ngIf="email.invalid && email.touched">
                    Ingrese un email v\xE1lido
                  </div>
                </div>
                
                <div class="col-md-6 mb-3">
                  <label for="telefono" class="form-label">Tel\xE9fono</label>
                  <input type="tel" 
                         class="form-control" 
                         id="telefono"
                         name="telefono"
                         [(ngModel)]="paciente.telefono">
                </div>
              </div>

              <div class="mb-3">
                <label for="direccion" class="form-label">Direcci\xF3n</label>
                <textarea class="form-control" 
                          id="direccion"
                          name="direccion"
                          [(ngModel)]="paciente.direccion" 
                          rows="3"></textarea>
              </div>

              <div class="d-flex justify-content-between form-actions">
                <a routerLink="/pacientes/lista" class="btn btn-secondary btn-action">
                  <i class="fas fa-arrow-left me-1"></i>Volver
                </a>
                <button type="submit" 
                        class="btn btn-primary btn-action"
                        [disabled]="pacienteForm.invalid">
                  <i class="fas fa-save me-1"></i>Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card info-card">
          <div class="card-header">
            <h6 class="mb-0">
              <i class="fas fa-info-circle me-1"></i>
              Informaci\xF3n
            </h6>
          </div>
          <div class="card-body">
            <p class="text-muted small">
              <i class="fas fa-asterisk text-danger me-1"></i>
              Los campos marcados con asterisco (*) son obligatorios.
            </p>
            <hr>
            <p class="text-muted small mb-0">
              <i class="fas fa-shield-alt text-primary me-1"></i>
              El email y DNI deben ser \xFAnicos en el sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`, styles: ["/* src/app/pages/Pacientes/formulario/formulario.component.css */\n.pacientes-formulario-container {\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  padding-bottom: 2rem;\n}\n.pacientes-formulario-container h1 {\n  font-weight: 700;\n  color: #2c3e50;\n  font-size: 2.5rem;\n  margin-bottom: 1.5rem;\n}\n.pacientes-formulario-container h1 i {\n  color: #667eea;\n}\n.form-card {\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.form-card .card-body {\n  padding: 2rem;\n}\n.form-label {\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 0.5rem;\n  font-size: 0.95rem;\n}\n.form-control {\n  border-radius: 8px;\n  border: 2px solid #e0e0e0;\n  padding: 0.75rem 1rem;\n  transition: all 0.3s ease;\n  font-size: 0.95rem;\n}\n.form-control:focus {\n  border-color: #667eea;\n  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);\n}\n.form-control.is-invalid {\n  border-color: #dc3545;\n}\n.form-control.is-invalid:focus {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.invalid-feedback {\n  display: block;\n  margin-top: 0.5rem;\n  font-size: 0.875rem;\n}\n.form-actions {\n  margin-top: 2rem;\n  padding-top: 1.5rem;\n  border-top: 2px solid #e9ecef;\n}\n.btn-action {\n  padding: 0.75rem 2rem;\n  font-weight: 600;\n  border-radius: 50px;\n  transition: all 0.3s ease;\n  font-size: 1rem;\n}\n.btn-action:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);\n}\n.btn-action:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.info-card {\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n  position: sticky;\n  top: 20px;\n}\n.info-card .card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border-bottom: none;\n  border-radius: 16px 16px 0 0 !important;\n  padding: 1rem 1.5rem;\n}\n.info-card .card-header h6 {\n  font-weight: 600;\n  margin: 0;\n}\n.info-card .card-body {\n  padding: 1.5rem;\n}\n.info-card hr {\n  margin: 1rem 0;\n  opacity: 0.2;\n}\n@media (max-width: 768px) {\n  .pacientes-formulario-container h1 {\n    font-size: 1.8rem;\n  }\n  .form-card .card-body {\n    padding: 1.5rem 1rem;\n  }\n  .form-actions {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .btn-action {\n    width: 100%;\n  }\n  .info-card {\n    position: static;\n    margin-top: 2rem;\n  }\n}\n/*# sourceMappingURL=formulario.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormularioComponent, { className: "FormularioComponent", filePath: "src/app/pages/Pacientes/formulario/formulario.component.ts", lineNumber: 26 });
})();
export {
  FormularioComponent
};
//# sourceMappingURL=chunk-BDYCMFVD.js.map
