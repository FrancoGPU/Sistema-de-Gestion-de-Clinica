import {
  AdminHeaderComponent
} from "./chunk-EH622HHE.js";
import "./chunk-6JYT5V5N.js";
import {
  RouterLink
} from "./chunk-DMXX7ROZ.js";
import "./chunk-D5MRJCXJ.js";
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
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-AR7JWTXA.js";

// src/app/components/administrador/stats-cards/stats-cards.component.ts
var StatsCardsComponent = class _StatsCardsComponent {
  totalPacientes = 0;
  totalDoctores = 0;
  citasHoy = 0;
  totalCitas = 0;
  static \u0275fac = function StatsCardsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StatsCardsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StatsCardsComponent, selectors: [["app-stats-cards"]], decls: 61, vars: 4, consts: [[1, "row"], [1, "col-md-3", "mb-4"], [1, "card", "bg-primary", "text-white", "stats-card"], [1, "card-body"], [1, "d-flex", "justify-content-between"], [1, "card-title"], [1, "mb-0"], [1, "fas", "fa-users", "fa-2x"], [1, "card-footer"], ["routerLink", "/pacientes/lista", 1, "text-white", "text-decoration-none"], [1, "fas", "fa-arrow-right"], [1, "card", "bg-success", "text-white", "stats-card"], [1, "fas", "fa-user-md", "fa-2x"], ["href", "#", 1, "text-white", "text-decoration-none"], [1, "card", "bg-warning", "text-dark", "stats-card"], [1, "fas", "fa-calendar-day", "fa-2x"], ["href", "#", 1, "text-dark", "text-decoration-none"], [1, "card", "bg-info", "text-white", "stats-card"], [1, "fas", "fa-calendar-check", "fa-2x"]], template: function StatsCardsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div")(6, "h6", 5);
      \u0275\u0275text(7, "Total Pacientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "h3", 6);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div");
      \u0275\u0275element(11, "i", 7);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "div", 8)(13, "a", 9);
      \u0275\u0275text(14, " Ver todos ");
      \u0275\u0275element(15, "i", 10);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(16, "div", 1)(17, "div", 11)(18, "div", 3)(19, "div", 4)(20, "div")(21, "h6", 5);
      \u0275\u0275text(22, "Total Doctores");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "h3", 6);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div");
      \u0275\u0275element(26, "i", 12);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "div", 8)(28, "a", 13);
      \u0275\u0275text(29, " Ver todos ");
      \u0275\u0275element(30, "i", 10);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(31, "div", 1)(32, "div", 14)(33, "div", 3)(34, "div", 4)(35, "div")(36, "h6", 5);
      \u0275\u0275text(37, "Citas de Hoy");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "h3", 6);
      \u0275\u0275text(39);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div");
      \u0275\u0275element(41, "i", 15);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(42, "div", 8)(43, "a", 16);
      \u0275\u0275text(44, " Ver citas ");
      \u0275\u0275element(45, "i", 10);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(46, "div", 1)(47, "div", 17)(48, "div", 3)(49, "div", 4)(50, "div")(51, "h6", 5);
      \u0275\u0275text(52, "Total Citas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "h3", 6);
      \u0275\u0275text(54);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "div");
      \u0275\u0275element(56, "i", 18);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(57, "div", 8)(58, "a", 13);
      \u0275\u0275text(59, " Ver todas ");
      \u0275\u0275element(60, "i", 10);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.totalPacientes);
      \u0275\u0275advance(15);
      \u0275\u0275textInterpolate(ctx.totalDoctores);
      \u0275\u0275advance(15);
      \u0275\u0275textInterpolate(ctx.citasHoy);
      \u0275\u0275advance(15);
      \u0275\u0275textInterpolate(ctx.totalCitas);
    }
  }, dependencies: [RouterLink], styles: ["/* src/app/components/administrador/stats-cards/stats-cards.component.css */\n.stats-card {\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  border: none;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.stats-card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);\n}\n.stats-card .card-body {\n  padding: 1.5rem;\n}\n.stats-card .card-title {\n  font-size: 0.9rem;\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n  opacity: 0.9;\n}\n.stats-card h3 {\n  font-size: 2rem;\n  font-weight: 700;\n  margin: 0;\n}\n.stats-card i {\n  opacity: 0.8;\n}\n.stats-card .card-footer {\n  background-color: rgba(0, 0, 0, 0.1);\n  border-top: none;\n  padding: 0.75rem 1.5rem;\n}\n.stats-card .card-footer a {\n  font-size: 0.85rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.stats-card .card-footer a:hover {\n  opacity: 0.8;\n  padding-left: 5px;\n}\n.stats-card .card-footer i {\n  font-size: 0.75rem;\n  margin-left: 5px;\n  transition: margin-left 0.3s ease;\n}\n.stats-card .card-footer a:hover i {\n  margin-left: 10px;\n}\n/*# sourceMappingURL=stats-cards.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StatsCardsComponent, [{
    type: Component,
    args: [{ selector: "app-stats-cards", imports: [RouterLink], encapsulation: ViewEncapsulation.None, template: '<!-- Statistics Cards -->\n<div class="row">\n  <div class="col-md-3 mb-4">\n    <div class="card bg-primary text-white stats-card">\n      <div class="card-body">\n        <div class="d-flex justify-content-between">\n          <div>\n            <h6 class="card-title">Total Pacientes</h6>\n            <h3 class="mb-0">{{ totalPacientes }}</h3>\n          </div>\n          <div>\n            <i class="fas fa-users fa-2x"></i>\n          </div>\n        </div>\n      </div>\n      <div class="card-footer">\n        <a routerLink="/pacientes/lista" class="text-white text-decoration-none">\n          Ver todos <i class="fas fa-arrow-right"></i>\n        </a>\n      </div>\n    </div>\n  </div>\n\n  <div class="col-md-3 mb-4">\n    <div class="card bg-success text-white stats-card">\n      <div class="card-body">\n        <div class="d-flex justify-content-between">\n          <div>\n            <h6 class="card-title">Total Doctores</h6>\n            <h3 class="mb-0">{{ totalDoctores }}</h3>\n          </div>\n          <div>\n            <i class="fas fa-user-md fa-2x"></i>\n          </div>\n        </div>\n      </div>\n      <div class="card-footer">\n        <a href="#" class="text-white text-decoration-none">\n          Ver todos <i class="fas fa-arrow-right"></i>\n        </a>\n      </div>\n    </div>\n  </div>\n\n  <div class="col-md-3 mb-4">\n    <div class="card bg-warning text-dark stats-card">\n      <div class="card-body">\n        <div class="d-flex justify-content-between">\n          <div>\n            <h6 class="card-title">Citas de Hoy</h6>\n            <h3 class="mb-0">{{ citasHoy }}</h3>\n          </div>\n          <div>\n            <i class="fas fa-calendar-day fa-2x"></i>\n          </div>\n        </div>\n      </div>\n      <div class="card-footer">\n        <a href="#" class="text-dark text-decoration-none">\n          Ver citas <i class="fas fa-arrow-right"></i>\n        </a>\n      </div>\n    </div>\n  </div>\n\n  <div class="col-md-3 mb-4">\n    <div class="card bg-info text-white stats-card">\n      <div class="card-body">\n        <div class="d-flex justify-content-between">\n          <div>\n            <h6 class="card-title">Total Citas</h6>\n            <h3 class="mb-0">{{ totalCitas }}</h3>\n          </div>\n          <div>\n            <i class="fas fa-calendar-check fa-2x"></i>\n          </div>\n        </div>\n      </div>\n      <div class="card-footer">\n        <a href="#" class="text-white text-decoration-none">\n          Ver todas <i class="fas fa-arrow-right"></i>\n        </a>\n      </div>\n    </div>\n  </div>\n</div>\n', styles: ["/* src/app/components/administrador/stats-cards/stats-cards.component.css */\n.stats-card {\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  border: none;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.stats-card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);\n}\n.stats-card .card-body {\n  padding: 1.5rem;\n}\n.stats-card .card-title {\n  font-size: 0.9rem;\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n  opacity: 0.9;\n}\n.stats-card h3 {\n  font-size: 2rem;\n  font-weight: 700;\n  margin: 0;\n}\n.stats-card i {\n  opacity: 0.8;\n}\n.stats-card .card-footer {\n  background-color: rgba(0, 0, 0, 0.1);\n  border-top: none;\n  padding: 0.75rem 1.5rem;\n}\n.stats-card .card-footer a {\n  font-size: 0.85rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.stats-card .card-footer a:hover {\n  opacity: 0.8;\n  padding-left: 5px;\n}\n.stats-card .card-footer i {\n  font-size: 0.75rem;\n  margin-left: 5px;\n  transition: margin-left 0.3s ease;\n}\n.stats-card .card-footer a:hover i {\n  margin-left: 10px;\n}\n/*# sourceMappingURL=stats-cards.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StatsCardsComponent, { className: "StatsCardsComponent", filePath: "src/app/components/administrador/stats-cards/stats-cards.component.ts", lineNumber: 11 });
})();

// src/app/components/administrador/quick-actions/quick-actions.component.ts
var QuickActionsComponent = class _QuickActionsComponent {
  static \u0275fac = function QuickActionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _QuickActionsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QuickActionsComponent, selectors: [["app-quick-actions"]], decls: 16, vars: 0, consts: [[1, "card", "quick-actions-card"], [1, "card-header"], [1, "mb-0"], [1, "fas", "fa-plus-circle", "me-2"], [1, "card-body"], [1, "d-grid", "gap-2"], ["routerLink", "/pacientes/formulario", 1, "btn", "btn-outline-primary", "action-btn"], [1, "fas", "fa-user-plus", "me-2"], ["href", "#", 1, "btn", "btn-outline-success", "action-btn"], [1, "fas", "fa-user-md", "me-2"], ["href", "#", 1, "btn", "btn-outline-warning", "action-btn"], [1, "fas", "fa-calendar-plus", "me-2"]], template: function QuickActionsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h5", 2);
      \u0275\u0275element(3, "i", 3);
      \u0275\u0275text(4, " Acciones R\xE1pidas ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 4)(6, "div", 5)(7, "a", 6);
      \u0275\u0275element(8, "i", 7);
      \u0275\u0275text(9, "Nuevo Paciente ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "a", 8);
      \u0275\u0275element(11, "i", 9);
      \u0275\u0275text(12, "Nuevo Doctor ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "a", 10);
      \u0275\u0275element(14, "i", 11);
      \u0275\u0275text(15, "Nueva Cita ");
      \u0275\u0275elementEnd()()()();
    }
  }, dependencies: [RouterLink], styles: ["/* src/app/components/administrador/quick-actions/quick-actions.component.css */\n.quick-actions-card {\n  border: none;\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  height: 100%;\n}\n.quick-actions-card .card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border-bottom: none;\n  border-radius: 12px 12px 0 0 !important;\n  padding: 1rem 1.5rem;\n}\n.quick-actions-card .card-header h5 {\n  font-weight: 600;\n  font-size: 1.1rem;\n}\n.quick-actions-card .card-body {\n  padding: 1.5rem;\n}\n.action-btn {\n  padding: 0.85rem 1.25rem;\n  font-weight: 500;\n  font-size: 0.95rem;\n  border-width: 2px;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n  text-align: left;\n  display: flex;\n  align-items: center;\n}\n.action-btn:hover {\n  transform: translateX(5px);\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);\n}\n.action-btn i {\n  font-size: 1.1rem;\n}\n/*# sourceMappingURL=quick-actions.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuickActionsComponent, [{
    type: Component,
    args: [{ selector: "app-quick-actions", imports: [RouterLink], encapsulation: ViewEncapsulation.None, template: '<div class="card quick-actions-card">\n  <div class="card-header">\n    <h5 class="mb-0">\n      <i class="fas fa-plus-circle me-2"></i>\n      Acciones R\xE1pidas\n    </h5>\n  </div>\n  <div class="card-body">\n    <div class="d-grid gap-2">\n      <a routerLink="/pacientes/formulario" class="btn btn-outline-primary action-btn">\n        <i class="fas fa-user-plus me-2"></i>Nuevo Paciente\n      </a>\n      <a href="#" class="btn btn-outline-success action-btn">\n        <i class="fas fa-user-md me-2"></i>Nuevo Doctor\n      </a>\n      <a href="#" class="btn btn-outline-warning action-btn">\n        <i class="fas fa-calendar-plus me-2"></i>Nueva Cita\n      </a>\n    </div>\n  </div>\n</div>\n', styles: ["/* src/app/components/administrador/quick-actions/quick-actions.component.css */\n.quick-actions-card {\n  border: none;\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  height: 100%;\n}\n.quick-actions-card .card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border-bottom: none;\n  border-radius: 12px 12px 0 0 !important;\n  padding: 1rem 1.5rem;\n}\n.quick-actions-card .card-header h5 {\n  font-weight: 600;\n  font-size: 1.1rem;\n}\n.quick-actions-card .card-body {\n  padding: 1.5rem;\n}\n.action-btn {\n  padding: 0.85rem 1.25rem;\n  font-weight: 500;\n  font-size: 0.95rem;\n  border-width: 2px;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n  text-align: left;\n  display: flex;\n  align-items: center;\n}\n.action-btn:hover {\n  transform: translateX(5px);\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);\n}\n.action-btn i {\n  font-size: 1.1rem;\n}\n/*# sourceMappingURL=quick-actions.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QuickActionsComponent, { className: "QuickActionsComponent", filePath: "src/app/components/administrador/quick-actions/quick-actions.component.ts", lineNumber: 11 });
})();

// src/app/components/administrador/system-status/system-status.component.ts
var SystemStatusComponent = class _SystemStatusComponent {
  static \u0275fac = function SystemStatusComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SystemStatusComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SystemStatusComponent, selectors: [["app-system-status"]], decls: 21, vars: 0, consts: [[1, "card", "system-status-card"], [1, "card-header"], [1, "mb-0"], [1, "fas", "fa-info-circle", "me-2"], [1, "card-body"], [1, "row"], [1, "col-6"], [1, "text-center", "status-item"], [1, "fas", "fa-check-circle", "fa-3x", "text-success", "mb-2"], [1, "fas", "fa-database", "fa-3x", "text-primary", "mb-2"], [1, "text-muted", "small", "mb-0"], [1, "fas", "fa-info-circle", "me-1"]], template: function SystemStatusComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h5", 2);
      \u0275\u0275element(3, "i", 3);
      \u0275\u0275text(4, " Estado del Sistema ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "div", 7);
      \u0275\u0275element(9, "i", 8);
      \u0275\u0275elementStart(10, "p", 2);
      \u0275\u0275text(11, "Sistema Activo");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "div", 6)(13, "div", 7);
      \u0275\u0275element(14, "i", 9);
      \u0275\u0275elementStart(15, "p", 2);
      \u0275\u0275text(16, "Base de Datos H2");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275element(17, "hr");
      \u0275\u0275elementStart(18, "p", 10);
      \u0275\u0275element(19, "i", 11);
      \u0275\u0275text(20, " Sistema configurado para desarrollo. Listo para migrar a PostgreSQL. ");
      \u0275\u0275elementEnd()()();
    }
  }, styles: ["/* src/app/components/administrador/system-status/system-status.component.css */\n.system-status-card {\n  border: none;\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  height: 100%;\n}\n.system-status-card .card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border-bottom: none;\n  border-radius: 12px 12px 0 0 !important;\n  padding: 1rem 1.5rem;\n}\n.system-status-card .card-header h5 {\n  font-weight: 600;\n  font-size: 1.1rem;\n}\n.system-status-card .card-body {\n  padding: 1.5rem;\n}\n.status-item {\n  padding: 1rem 0;\n}\n.status-item i {\n  transition: transform 0.3s ease;\n}\n.status-item:hover i {\n  transform: scale(1.1);\n}\n.status-item p {\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: #495057;\n}\n.system-status-card hr {\n  margin: 1.5rem 0;\n  opacity: 0.2;\n}\n/*# sourceMappingURL=system-status.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SystemStatusComponent, [{
    type: Component,
    args: [{ selector: "app-system-status", imports: [], encapsulation: ViewEncapsulation.None, template: '<div class="card system-status-card">\n  <div class="card-header">\n    <h5 class="mb-0">\n      <i class="fas fa-info-circle me-2"></i>\n      Estado del Sistema\n    </h5>\n  </div>\n  <div class="card-body">\n    <div class="row">\n      <div class="col-6">\n        <div class="text-center status-item">\n          <i class="fas fa-check-circle fa-3x text-success mb-2"></i>\n          <p class="mb-0">Sistema Activo</p>\n        </div>\n      </div>\n      <div class="col-6">\n        <div class="text-center status-item">\n          <i class="fas fa-database fa-3x text-primary mb-2"></i>\n          <p class="mb-0">Base de Datos H2</p>\n        </div>\n      </div>\n    </div>\n    <hr>\n    <p class="text-muted small mb-0">\n      <i class="fas fa-info-circle me-1"></i>\n      Sistema configurado para desarrollo. Listo para migrar a PostgreSQL.\n    </p>\n  </div>\n</div>\n', styles: ["/* src/app/components/administrador/system-status/system-status.component.css */\n.system-status-card {\n  border: none;\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  height: 100%;\n}\n.system-status-card .card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border-bottom: none;\n  border-radius: 12px 12px 0 0 !important;\n  padding: 1rem 1.5rem;\n}\n.system-status-card .card-header h5 {\n  font-weight: 600;\n  font-size: 1.1rem;\n}\n.system-status-card .card-body {\n  padding: 1.5rem;\n}\n.status-item {\n  padding: 1rem 0;\n}\n.status-item i {\n  transition: transform 0.3s ease;\n}\n.status-item:hover i {\n  transform: scale(1.1);\n}\n.status-item p {\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: #495057;\n}\n.system-status-card hr {\n  margin: 1.5rem 0;\n  opacity: 0.2;\n}\n/*# sourceMappingURL=system-status.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SystemStatusComponent, { className: "SystemStatusComponent", filePath: "src/app/components/administrador/system-status/system-status.component.ts", lineNumber: 10 });
})();

// src/app/pages/Administrador/dashboard/dashboard.component.ts
var DashboardComponent = class _DashboardComponent {
  static \u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 14, vars: 0, consts: [[1, "dashboard-container"], [1, "container-fluid"], [1, "row"], [1, "col-12"], [1, "mb-4"], [1, "fas", "fa-tachometer-alt", "me-2"], [1, "row", "mt-4"], [1, "col-md-6"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-admin-header");
      \u0275\u0275elementStart(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "h1", 4);
      \u0275\u0275element(6, "i", 5);
      \u0275\u0275text(7, " Dashboard ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(8, "app-stats-cards");
      \u0275\u0275elementStart(9, "div", 6)(10, "div", 7);
      \u0275\u0275element(11, "app-quick-actions");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 7);
      \u0275\u0275element(13, "app-system-status");
      \u0275\u0275elementEnd()()()();
    }
  }, dependencies: [
    AdminHeaderComponent,
    StatsCardsComponent,
    QuickActionsComponent,
    SystemStatusComponent
  ], styles: ["/* src/app/pages/Administrador/dashboard/dashboard.component.css */\n.dashboard-container {\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  padding-bottom: 2rem;\n}\n.dashboard-container h1 {\n  font-weight: 700;\n  color: #2c3e50;\n  font-size: 2.5rem;\n  margin-bottom: 1.5rem;\n}\n.dashboard-container h1 i {\n  color: #667eea;\n}\n@media (max-width: 768px) {\n  .dashboard-container h1 {\n    font-size: 2rem;\n  }\n  .stats-card h3 {\n    font-size: 1.5rem !important;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [
      AdminHeaderComponent,
      StatsCardsComponent,
      QuickActionsComponent,
      SystemStatusComponent
    ], encapsulation: ViewEncapsulation.None, template: '<app-admin-header></app-admin-header>\n\n<div class="dashboard-container">\n  <div class="container-fluid">\n    <div class="row">\n      <div class="col-12">\n        <h1 class="mb-4">\n          <i class="fas fa-tachometer-alt me-2"></i>\n          Dashboard\n        </h1>\n      </div>\n    </div>\n\n    <!-- Tarjetas de estad\xEDsticas -->\n    <app-stats-cards></app-stats-cards>\n\n    <div class="row mt-4">\n      <!-- Acciones r\xE1pidas -->\n      <div class="col-md-6">\n        <app-quick-actions></app-quick-actions>\n      </div>\n\n      <!-- Estado del sistema -->\n      <div class="col-md-6">\n        <app-system-status></app-system-status>\n      </div>\n    </div>\n  </div>\n</div>\n', styles: ["/* src/app/pages/Administrador/dashboard/dashboard.component.css */\n.dashboard-container {\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  padding-bottom: 2rem;\n}\n.dashboard-container h1 {\n  font-weight: 700;\n  color: #2c3e50;\n  font-size: 2.5rem;\n  margin-bottom: 1.5rem;\n}\n.dashboard-container h1 i {\n  color: #667eea;\n}\n@media (max-width: 768px) {\n  .dashboard-container h1 {\n    font-size: 2rem;\n  }\n  .stats-card h3 {\n    font-size: 1.5rem !important;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/pages/Administrador/dashboard/dashboard.component.ts", lineNumber: 20 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-APJFL4EG.js.map
