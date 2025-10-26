import {
  CommonModule
} from "./chunk-D5MRJCXJ.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-AR7JWTXA.js";

// src/app/pages/Administrador/citas/citas.component.ts
var CitasComponent = class _CitasComponent {
  static \u0275fac = function CitasComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CitasComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CitasComponent, selectors: [["app-citas"]], decls: 73, vars: 0, consts: [[1, "container-fluid", "py-4"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "fas", "fa-calendar-alt", "me-2"], [1, "btn", "btn-primary"], [1, "fas", "fa-plus", "me-2"], [1, "card", "shadow"], [1, "card-body"], [1, "table-responsive"], [1, "table", "table-hover"], [1, "badge", "bg-success"], [1, "btn", "btn-sm", "btn-outline-primary", "me-1"], [1, "fas", "fa-edit"], [1, "btn", "btn-sm", "btn-outline-danger"], [1, "fas", "fa-trash"], [1, "badge", "bg-warning"]], template: function CitasComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275element(3, "i", 2);
      \u0275\u0275text(4, "Gesti\xF3n de Citas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 3);
      \u0275\u0275element(6, "i", 4);
      \u0275\u0275text(7, "Nueva Cita ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 5)(9, "div", 6)(10, "div", 7)(11, "table", 8)(12, "thead")(13, "tr")(14, "th");
      \u0275\u0275text(15, "ID");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "th");
      \u0275\u0275text(17, "Paciente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "th");
      \u0275\u0275text(19, "Doctor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "th");
      \u0275\u0275text(21, "Especialidad");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "th");
      \u0275\u0275text(23, "Fecha");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "th");
      \u0275\u0275text(25, "Hora");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "th");
      \u0275\u0275text(27, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "th");
      \u0275\u0275text(29, "Acciones");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "tbody")(31, "tr")(32, "td");
      \u0275\u0275text(33, "001");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "td");
      \u0275\u0275text(35, "Juan P\xE9rez");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "td");
      \u0275\u0275text(37, "Dr. Carlos Mendoza");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "td");
      \u0275\u0275text(39, "Cardiolog\xEDa");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "td");
      \u0275\u0275text(41, "2025-10-20");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "td");
      \u0275\u0275text(43, "10:00 AM");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "td")(45, "span", 9);
      \u0275\u0275text(46, "Confirmada");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(47, "td")(48, "button", 10);
      \u0275\u0275element(49, "i", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "button", 12);
      \u0275\u0275element(51, "i", 13);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(52, "tr")(53, "td");
      \u0275\u0275text(54, "002");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "td");
      \u0275\u0275text(56, "Mar\xEDa Garc\xEDa");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "td");
      \u0275\u0275text(58, "Dra. Ana Rodr\xEDguez");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "td");
      \u0275\u0275text(60, "Pediatr\xEDa");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "td");
      \u0275\u0275text(62, "2025-10-21");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "td");
      \u0275\u0275text(64, "14:00 PM");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "td")(66, "span", 14);
      \u0275\u0275text(67, "Pendiente");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(68, "td")(69, "button", 10);
      \u0275\u0275element(70, "i", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "button", 12);
      \u0275\u0275element(72, "i", 13);
      \u0275\u0275elementEnd()()()()()()()()();
    }
  }, dependencies: [CommonModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CitasComponent, [{
    type: Component,
    args: [{ selector: "app-citas", standalone: true, imports: [CommonModule], template: '<div class="container-fluid py-4">\n  <div class="d-flex justify-content-between align-items-center mb-4">\n    <h2><i class="fas fa-calendar-alt me-2"></i>Gesti\xF3n de Citas</h2>\n    <button class="btn btn-primary">\n      <i class="fas fa-plus me-2"></i>Nueva Cita\n    </button>\n  </div>\n\n  <div class="card shadow">\n    <div class="card-body">\n      <div class="table-responsive">\n        <table class="table table-hover">\n          <thead>\n            <tr>\n              <th>ID</th>\n              <th>Paciente</th>\n              <th>Doctor</th>\n              <th>Especialidad</th>\n              <th>Fecha</th>\n              <th>Hora</th>\n              <th>Estado</th>\n              <th>Acciones</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>001</td>\n              <td>Juan P\xE9rez</td>\n              <td>Dr. Carlos Mendoza</td>\n              <td>Cardiolog\xEDa</td>\n              <td>2025-10-20</td>\n              <td>10:00 AM</td>\n              <td><span class="badge bg-success">Confirmada</span></td>\n              <td>\n                <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>\n                <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash"></i></button>\n              </td>\n            </tr>\n            <tr>\n              <td>002</td>\n              <td>Mar\xEDa Garc\xEDa</td>\n              <td>Dra. Ana Rodr\xEDguez</td>\n              <td>Pediatr\xEDa</td>\n              <td>2025-10-21</td>\n              <td>14:00 PM</td>\n              <td><span class="badge bg-warning">Pendiente</span></td>\n              <td>\n                <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>\n                <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash"></i></button>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CitasComponent, { className: "CitasComponent", filePath: "src/app/pages/Administrador/citas/citas.component.ts", lineNumber: 11 });
})();
export {
  CitasComponent
};
//# sourceMappingURL=chunk-ASRLF7MY.js.map
