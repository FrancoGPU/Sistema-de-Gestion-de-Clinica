import {
  AdminHeaderComponent
} from "./chunk-EH622HHE.js";
import "./chunk-6JYT5V5N.js";
import {
  RouterLink
} from "./chunk-DMXX7ROZ.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-MHHJUQRX.js";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf
} from "./chunk-D5MRJCXJ.js";
import {
  Component,
  ViewEncapsulation,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-AR7JWTXA.js";

// src/app/pages/Pacientes/lista/lista.component.ts
var _c0 = (a0) => ["/pacientes/formulario", a0];
function ListaComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275element(1, "i", 19);
    \u0275\u0275elementStart(2, "p", 20);
    \u0275\u0275text(3, "No hay pacientes registrados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 21);
    \u0275\u0275element(5, "i", 7);
    \u0275\u0275text(6, "Registrar Primer Paciente ");
    \u0275\u0275elementEnd()();
  }
}
function ListaComponent_div_23_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "div", 25)(16, "a", 26);
    \u0275\u0275element(17, "i", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "a", 28);
    \u0275\u0275element(19, "i", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "a", 30);
    \u0275\u0275listener("click", function ListaComponent_div_23_tr_19_Template_a_click_20_listener() {
      const paciente_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.eliminarPaciente(paciente_r2.id));
    });
    \u0275\u0275element(21, "i", 31);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const paciente_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(paciente_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(paciente_r2.nombreCompleto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(paciente_r2.dni);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(paciente_r2.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(paciente_r2.telefono);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 7, paciente_r2.fechaNacimiento, "dd/MM/yyyy"));
    \u0275\u0275advance(6);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(10, _c0, paciente_r2.id));
  }
}
function ListaComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "table", 23)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Nombre Completo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "DNI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Fecha Nacimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275template(19, ListaComponent_div_23_tr_19_Template, 22, 12, "tr", 24);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r2.pacientes);
  }
}
var ListaComponent = class _ListaComponent {
  busqueda = "";
  pacientes = [];
  eliminarPaciente(id) {
    if (confirm("\xBFEst\xE1 seguro de eliminar este paciente?")) {
      console.log("Eliminando paciente:", id);
    }
  }
  static \u0275fac = function ListaComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListaComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListaComponent, selectors: [["app-lista"]], decls: 24, vars: 3, consts: [[1, "pacientes-lista-container"], [1, "container-fluid", "mt-4"], [1, "row"], [1, "col-12"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "fas", "fa-users", "me-2"], ["routerLink", "/pacientes/formulario", 1, "btn", "btn-primary", "btn-add"], [1, "fas", "fa-plus", "me-1"], [1, "row", "mb-4"], [1, "col-md-6"], [1, "search-wrapper"], ["type", "text", "placeholder", "Buscar por nombre, apellido o DNI...", 1, "form-control", "search-input", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-outline-secondary", "search-btn"], [1, "fas", "fa-search"], [1, "card", "table-card"], [1, "card-body"], ["class", "text-center py-5 empty-state", 4, "ngIf"], ["class", "table-responsive", 4, "ngIf"], [1, "text-center", "py-5", "empty-state"], [1, "fas", "fa-users", "fa-4x", "text-muted", "mb-3"], [1, "text-muted", "fs-5"], ["routerLink", "/pacientes/formulario", 1, "btn", "btn-primary", "btn-lg"], [1, "table-responsive"], [1, "table", "table-hover", "patients-table"], [4, "ngFor", "ngForOf"], ["role", "group", 1, "btn-group"], ["href", "#", "title", "Ver detalles", 1, "btn", "btn-sm", "btn-outline-info"], [1, "fas", "fa-eye"], ["title", "Editar", 1, "btn", "btn-sm", "btn-outline-warning", 3, "routerLink"], [1, "fas", "fa-edit"], ["href", "#", "title", "Eliminar", 1, "btn", "btn-sm", "btn-outline-danger", 3, "click"], [1, "fas", "fa-trash"]], template: function ListaComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-admin-header");
      \u0275\u0275elementStart(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "h1");
      \u0275\u0275element(7, "i", 5);
      \u0275\u0275text(8, " Lista de Pacientes ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "a", 6);
      \u0275\u0275element(10, "i", 7);
      \u0275\u0275text(11, "Nuevo Paciente ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(12, "div", 8)(13, "div", 9)(14, "div", 10)(15, "input", 11);
      \u0275\u0275twoWayListener("ngModelChange", function ListaComponent_Template_input_ngModelChange_15_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.busqueda, $event) || (ctx.busqueda = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "button", 12);
      \u0275\u0275element(17, "i", 13);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(18, "div", 2)(19, "div", 3)(20, "div", 14)(21, "div", 15);
      \u0275\u0275template(22, ListaComponent_div_22_Template, 7, 0, "div", 16)(23, ListaComponent_div_23_Template, 20, 1, "div", 17);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275twoWayProperty("ngModel", ctx.busqueda);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.pacientes.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.pacientes.length > 0);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink, AdminHeaderComponent], styles: ["/* src/app/pages/Pacientes/lista/lista.component.css */\n.pacientes-lista-container {\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  padding-bottom: 2rem;\n}\n.pacientes-lista-container h1 {\n  font-weight: 700;\n  color: #2c3e50;\n  font-size: 2.5rem;\n}\n.pacientes-lista-container h1 i {\n  color: #667eea;\n}\n.btn-add {\n  padding: 0.75rem 1.5rem;\n  font-weight: 600;\n  border-radius: 50px;\n  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);\n  transition: all 0.3s ease;\n}\n.btn-add:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);\n}\n.search-wrapper {\n  position: relative;\n  display: flex;\n  gap: 10px;\n}\n.search-input {\n  border-radius: 50px;\n  padding: 0.75rem 1.5rem;\n  border: 2px solid #e0e0e0;\n  transition: all 0.3s ease;\n}\n.search-input:focus {\n  border-color: #667eea;\n  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);\n}\n.search-btn {\n  border-radius: 50px;\n  padding: 0.75rem 1.5rem;\n  transition: all 0.3s ease;\n}\n.search-btn:hover {\n  background-color: #667eea;\n  color: white;\n  border-color: #667eea;\n}\n.table-card {\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.empty-state {\n  padding: 4rem 2rem;\n}\n.empty-state i {\n  opacity: 0.5;\n}\n.patients-table {\n  margin-bottom: 0;\n}\n.patients-table thead {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.patients-table thead th {\n  border: none;\n  padding: 1rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 0.85rem;\n  letter-spacing: 0.5px;\n}\n.patients-table tbody tr {\n  transition: all 0.3s ease;\n}\n.patients-table tbody tr:hover {\n  background-color: #f8f9fa;\n  transform: scale(1.01);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n.patients-table tbody td {\n  padding: 1rem;\n  vertical-align: middle;\n  border-bottom: 1px solid #e9ecef;\n}\n.patients-table .btn-group .btn {\n  padding: 0.4rem 0.8rem;\n  margin: 0 2px;\n  border-radius: 6px;\n  transition: all 0.3s ease;\n}\n.patients-table .btn-group .btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);\n}\n@media (max-width: 768px) {\n  .pacientes-lista-container h1 {\n    font-size: 1.8rem;\n  }\n  .d-flex.justify-content-between {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .btn-add {\n    width: 100%;\n  }\n  .search-wrapper {\n    flex-direction: column;\n  }\n  .search-btn {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=lista.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListaComponent, [{
    type: Component,
    args: [{ selector: "app-lista", standalone: true, imports: [CommonModule, FormsModule, RouterLink, AdminHeaderComponent], encapsulation: ViewEncapsulation.None, template: `<app-admin-header></app-admin-header>

<div class="pacientes-lista-container">
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1>
            <i class="fas fa-users me-2"></i>
            Lista de Pacientes
          </h1>
          <a routerLink="/pacientes/formulario" class="btn btn-primary btn-add">
            <i class="fas fa-plus me-1"></i>Nuevo Paciente
          </a>
        </div>
      </div>
    </div>

    <!-- Search Form -->
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="search-wrapper">
          <input type="text" 
                 class="form-control search-input" 
                 [(ngModel)]="busqueda"
                 placeholder="Buscar por nombre, apellido o DNI...">
          <button class="btn btn-outline-secondary search-btn">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Patients Table -->
    <div class="row">
      <div class="col-12">
        <div class="card table-card">
          <div class="card-body">
            <div *ngIf="pacientes.length === 0" class="text-center py-5 empty-state">
              <i class="fas fa-users fa-4x text-muted mb-3"></i>
              <p class="text-muted fs-5">No hay pacientes registrados</p>
              <a routerLink="/pacientes/formulario" class="btn btn-primary btn-lg">
                <i class="fas fa-plus me-1"></i>Registrar Primer Paciente
              </a>
            </div>

            <div *ngIf="pacientes.length > 0" class="table-responsive">
              <table class="table table-hover patients-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre Completo</th>
                    <th>DNI</th>
                    <th>Email</th>
                    <th>Tel\xE9fono</th>
                    <th>Fecha Nacimiento</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let paciente of pacientes">
                    <td>{{ paciente.id }}</td>
                    <td>{{ paciente.nombreCompleto }}</td>
                    <td>{{ paciente.dni }}</td>
                    <td>{{ paciente.email }}</td>
                    <td>{{ paciente.telefono }}</td>
                    <td>{{ paciente.fechaNacimiento | date:'dd/MM/yyyy' }}</td>
                    <td>
                      <div class="btn-group" role="group">
                        <a href="#" class="btn btn-sm btn-outline-info" title="Ver detalles">
                          <i class="fas fa-eye"></i>
                        </a>
                        <a [routerLink]="['/pacientes/formulario', paciente.id]" class="btn btn-sm btn-outline-warning" title="Editar">
                          <i class="fas fa-edit"></i>
                        </a>
                        <a href="#" 
                           class="btn btn-sm btn-outline-danger" 
                           title="Eliminar"
                           (click)="eliminarPaciente(paciente.id)">
                          <i class="fas fa-trash"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`, styles: ["/* src/app/pages/Pacientes/lista/lista.component.css */\n.pacientes-lista-container {\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  padding-bottom: 2rem;\n}\n.pacientes-lista-container h1 {\n  font-weight: 700;\n  color: #2c3e50;\n  font-size: 2.5rem;\n}\n.pacientes-lista-container h1 i {\n  color: #667eea;\n}\n.btn-add {\n  padding: 0.75rem 1.5rem;\n  font-weight: 600;\n  border-radius: 50px;\n  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);\n  transition: all 0.3s ease;\n}\n.btn-add:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);\n}\n.search-wrapper {\n  position: relative;\n  display: flex;\n  gap: 10px;\n}\n.search-input {\n  border-radius: 50px;\n  padding: 0.75rem 1.5rem;\n  border: 2px solid #e0e0e0;\n  transition: all 0.3s ease;\n}\n.search-input:focus {\n  border-color: #667eea;\n  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);\n}\n.search-btn {\n  border-radius: 50px;\n  padding: 0.75rem 1.5rem;\n  transition: all 0.3s ease;\n}\n.search-btn:hover {\n  background-color: #667eea;\n  color: white;\n  border-color: #667eea;\n}\n.table-card {\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.empty-state {\n  padding: 4rem 2rem;\n}\n.empty-state i {\n  opacity: 0.5;\n}\n.patients-table {\n  margin-bottom: 0;\n}\n.patients-table thead {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.patients-table thead th {\n  border: none;\n  padding: 1rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 0.85rem;\n  letter-spacing: 0.5px;\n}\n.patients-table tbody tr {\n  transition: all 0.3s ease;\n}\n.patients-table tbody tr:hover {\n  background-color: #f8f9fa;\n  transform: scale(1.01);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n.patients-table tbody td {\n  padding: 1rem;\n  vertical-align: middle;\n  border-bottom: 1px solid #e9ecef;\n}\n.patients-table .btn-group .btn {\n  padding: 0.4rem 0.8rem;\n  margin: 0 2px;\n  border-radius: 6px;\n  transition: all 0.3s ease;\n}\n.patients-table .btn-group .btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);\n}\n@media (max-width: 768px) {\n  .pacientes-lista-container h1 {\n    font-size: 1.8rem;\n  }\n  .d-flex.justify-content-between {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .btn-add {\n    width: 100%;\n  }\n  .search-wrapper {\n    flex-direction: column;\n  }\n  .search-btn {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=lista.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListaComponent, { className: "ListaComponent", filePath: "src/app/pages/Pacientes/lista/lista.component.ts", lineNumber: 24 });
})();
export {
  ListaComponent
};
//# sourceMappingURL=chunk-QYAE7JJH.js.map
