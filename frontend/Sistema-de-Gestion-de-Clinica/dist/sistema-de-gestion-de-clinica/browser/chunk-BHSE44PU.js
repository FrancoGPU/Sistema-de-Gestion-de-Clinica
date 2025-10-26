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

// src/app/pages/Administrador/doctores/doctores.component.ts
var DoctoresComponent = class _DoctoresComponent {
  static \u0275fac = function DoctoresComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DoctoresComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DoctoresComponent, selectors: [["app-doctores"]], decls: 67, vars: 0, consts: [[1, "container-fluid", "py-4"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "fas", "fa-user-md", "me-2"], [1, "btn", "btn-primary"], [1, "fas", "fa-plus", "me-2"], [1, "card", "shadow"], [1, "card-body"], [1, "table-responsive"], [1, "table", "table-hover"], [1, "badge", "bg-info"], [1, "btn", "btn-sm", "btn-outline-primary", "me-1"], [1, "fas", "fa-edit"], [1, "btn", "btn-sm", "btn-outline-danger"], [1, "fas", "fa-trash"], [1, "badge", "bg-success"]], template: function DoctoresComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275element(3, "i", 2);
      \u0275\u0275text(4, "Gesti\xF3n de Doctores");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 3);
      \u0275\u0275element(6, "i", 4);
      \u0275\u0275text(7, "Nuevo Doctor ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 5)(9, "div", 6)(10, "div", 7)(11, "table", 8)(12, "thead")(13, "tr")(14, "th");
      \u0275\u0275text(15, "ID");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "th");
      \u0275\u0275text(17, "Nombre");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "th");
      \u0275\u0275text(19, "Especialidad");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "th");
      \u0275\u0275text(21, "Tel\xE9fono");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "th");
      \u0275\u0275text(23, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "th");
      \u0275\u0275text(25, "Horario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "th");
      \u0275\u0275text(27, "Acciones");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "tbody")(29, "tr")(30, "td");
      \u0275\u0275text(31, "1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "td");
      \u0275\u0275text(33, "Dr. Carlos Mendoza");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "td")(35, "span", 9);
      \u0275\u0275text(36, "Cardiolog\xEDa");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "td");
      \u0275\u0275text(38, "+51 987 654 321");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "td");
      \u0275\u0275text(40, "cmendoza@medicore.com");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "td");
      \u0275\u0275text(42, "Lun-Vie 8:00-16:00");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "td")(44, "button", 10);
      \u0275\u0275element(45, "i", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "button", 12);
      \u0275\u0275element(47, "i", 13);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(48, "tr")(49, "td");
      \u0275\u0275text(50, "2");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "td");
      \u0275\u0275text(52, "Dra. Ana Rodr\xEDguez");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "td")(54, "span", 14);
      \u0275\u0275text(55, "Pediatr\xEDa");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "td");
      \u0275\u0275text(57, "+51 987 654 322");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "td");
      \u0275\u0275text(59, "arodriguez@medicore.com");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "td");
      \u0275\u0275text(61, "Lun-S\xE1b 9:00-17:00");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "td")(63, "button", 10);
      \u0275\u0275element(64, "i", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "button", 12);
      \u0275\u0275element(66, "i", 13);
      \u0275\u0275elementEnd()()()()()()()()();
    }
  }, dependencies: [CommonModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DoctoresComponent, [{
    type: Component,
    args: [{ selector: "app-doctores", standalone: true, imports: [CommonModule], template: '<div class="container-fluid py-4">\n  <div class="d-flex justify-content-between align-items-center mb-4">\n    <h2><i class="fas fa-user-md me-2"></i>Gesti\xF3n de Doctores</h2>\n    <button class="btn btn-primary">\n      <i class="fas fa-plus me-2"></i>Nuevo Doctor\n    </button>\n  </div>\n\n  <div class="card shadow">\n    <div class="card-body">\n      <div class="table-responsive">\n        <table class="table table-hover">\n          <thead>\n            <tr>\n              <th>ID</th>\n              <th>Nombre</th>\n              <th>Especialidad</th>\n              <th>Tel\xE9fono</th>\n              <th>Email</th>\n              <th>Horario</th>\n              <th>Acciones</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>1</td>\n              <td>Dr. Carlos Mendoza</td>\n              <td><span class="badge bg-info">Cardiolog\xEDa</span></td>\n              <td>+51 987 654 321</td>\n              <td>cmendoza&#64;medicore.com</td>\n              <td>Lun-Vie 8:00-16:00</td>\n              <td>\n                <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>\n                <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash"></i></button>\n              </td>\n            </tr>\n            <tr>\n              <td>2</td>\n              <td>Dra. Ana Rodr\xEDguez</td>\n              <td><span class="badge bg-success">Pediatr\xEDa</span></td>\n              <td>+51 987 654 322</td>\n              <td>arodriguez&#64;medicore.com</td>\n              <td>Lun-S\xE1b 9:00-17:00</td>\n              <td>\n                <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-edit"></i></button>\n                <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash"></i></button>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DoctoresComponent, { className: "DoctoresComponent", filePath: "src/app/pages/Administrador/doctores/doctores.component.ts", lineNumber: 11 });
})();
export {
  DoctoresComponent
};
//# sourceMappingURL=chunk-BHSE44PU.js.map
