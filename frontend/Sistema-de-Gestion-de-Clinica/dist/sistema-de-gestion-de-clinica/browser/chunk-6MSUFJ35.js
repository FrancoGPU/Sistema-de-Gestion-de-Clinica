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
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-AR7JWTXA.js";

// src/app/components/administrador/hero-section/hero-section.component.ts
var HeroSectionComponent = class _HeroSectionComponent {
  static \u0275fac = function HeroSectionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HeroSectionComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeroSectionComponent, selectors: [["app-hero-section"]], decls: 12, vars: 0, consts: [[1, "row", "mb-5"], [1, "col-12"], [1, "hero-jumbotron"], [1, "container", "text-center"], [1, "display-4"], [1, "fas", "fa-hospital-alt", "me-3"], [1, "lead"], ["routerLink", "/admin/dashboard", "role", "button", 1, "btn", "btn-light", "btn-lg"], [1, "fas", "fa-tachometer-alt", "me-2"]], template: function HeroSectionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4);
      \u0275\u0275element(5, "i", 5);
      \u0275\u0275text(6, " Sistema de Gesti\xF3n de Cl\xEDnica ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 6);
      \u0275\u0275text(8, "Administre pacientes, doctores y citas de manera eficiente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "a", 7);
      \u0275\u0275element(10, "i", 8);
      \u0275\u0275text(11, "Ir al Dashboard ");
      \u0275\u0275elementEnd()()()()();
    }
  }, dependencies: [RouterLink], styles: ['/* src/app/components/administrador/hero-section/hero-section.component.css */\n.hero-jumbotron {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  padding: 4rem 2rem;\n  border-radius: 16px;\n  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);\n  position: relative;\n  overflow: hidden;\n}\n.hero-jumbotron::before {\n  content: "";\n  position: absolute;\n  top: -50%;\n  right: -20%;\n  width: 60%;\n  height: 200%;\n  background: rgba(255, 255, 255, 0.05);\n  transform: rotate(-15deg);\n}\n.hero-jumbotron .container {\n  position: relative;\n  z-index: 1;\n}\n.hero-jumbotron .display-4 {\n  font-weight: 700;\n  margin-bottom: 1.5rem;\n  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);\n}\n.hero-jumbotron .lead {\n  font-size: 1.5rem;\n  margin-bottom: 2rem;\n  opacity: 0.95;\n}\n.hero-jumbotron .btn-light {\n  padding: 0.85rem 2rem;\n  font-size: 1.1rem;\n  font-weight: 600;\n  border-radius: 50px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);\n  transition: all 0.3s ease;\n}\n.hero-jumbotron .btn-light:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);\n}\n@media (max-width: 768px) {\n  .hero-jumbotron {\n    padding: 3rem 1.5rem;\n  }\n  .hero-jumbotron .display-4 {\n    font-size: 2rem;\n  }\n  .hero-jumbotron .lead {\n    font-size: 1.2rem;\n  }\n}\n/*# sourceMappingURL=hero-section.component.css.map */\n'], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeroSectionComponent, [{
    type: Component,
    args: [{ selector: "app-hero-section", imports: [RouterLink], encapsulation: ViewEncapsulation.None, template: '<!-- Hero Section -->\n<div class="row mb-5">\n  <div class="col-12">\n    <div class="hero-jumbotron">\n      <div class="container text-center">\n        <h1 class="display-4">\n          <i class="fas fa-hospital-alt me-3"></i>\n          Sistema de Gesti\xF3n de Cl\xEDnica\n        </h1>\n        <p class="lead">Administre pacientes, doctores y citas de manera eficiente</p>\n        <a class="btn btn-light btn-lg" routerLink="/admin/dashboard" role="button">\n          <i class="fas fa-tachometer-alt me-2"></i>Ir al Dashboard\n        </a>\n      </div>\n    </div>\n  </div>\n</div>\n', styles: ['/* src/app/components/administrador/hero-section/hero-section.component.css */\n.hero-jumbotron {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  padding: 4rem 2rem;\n  border-radius: 16px;\n  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);\n  position: relative;\n  overflow: hidden;\n}\n.hero-jumbotron::before {\n  content: "";\n  position: absolute;\n  top: -50%;\n  right: -20%;\n  width: 60%;\n  height: 200%;\n  background: rgba(255, 255, 255, 0.05);\n  transform: rotate(-15deg);\n}\n.hero-jumbotron .container {\n  position: relative;\n  z-index: 1;\n}\n.hero-jumbotron .display-4 {\n  font-weight: 700;\n  margin-bottom: 1.5rem;\n  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);\n}\n.hero-jumbotron .lead {\n  font-size: 1.5rem;\n  margin-bottom: 2rem;\n  opacity: 0.95;\n}\n.hero-jumbotron .btn-light {\n  padding: 0.85rem 2rem;\n  font-size: 1.1rem;\n  font-weight: 600;\n  border-radius: 50px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);\n  transition: all 0.3s ease;\n}\n.hero-jumbotron .btn-light:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);\n}\n@media (max-width: 768px) {\n  .hero-jumbotron {\n    padding: 3rem 1.5rem;\n  }\n  .hero-jumbotron .display-4 {\n    font-size: 2rem;\n  }\n  .hero-jumbotron .lead {\n    font-size: 1.2rem;\n  }\n}\n/*# sourceMappingURL=hero-section.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeroSectionComponent, { className: "HeroSectionComponent", filePath: "src/app/components/administrador/hero-section/hero-section.component.ts", lineNumber: 11 });
})();

// src/app/components/administrador/quick-actions-cards/quick-actions-cards.component.ts
var QuickActionsCardsComponent = class _QuickActionsCardsComponent {
  static \u0275fac = function QuickActionsCardsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _QuickActionsCardsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QuickActionsCardsComponent, selectors: [["app-quick-actions-cards"]], decls: 49, vars: 0, consts: [[1, "row", "mb-4"], [1, "col-12"], [1, "text-center", "mb-4", "section-title"], [1, "row"], [1, "col-md-3", "mb-4"], [1, "card", "h-100", "text-center", "quick-card"], [1, "card-body"], [1, "fas", "fa-user-plus", "fa-3x", "text-primary", "mb-3", "icon-animation"], [1, "card-title"], [1, "card-text"], ["routerLink", "/pacientes/formulario", 1, "btn", "btn-primary"], [1, "fas", "fa-plus", "me-1"], [1, "fas", "fa-user-md", "fa-3x", "text-success", "mb-3", "icon-animation"], ["href", "#", 1, "btn", "btn-success"], [1, "fas", "fa-calendar-plus", "fa-3x", "text-warning", "mb-3", "icon-animation"], ["href", "#", 1, "btn", "btn-warning"], [1, "fas", "fa-calendar-check", "fa-3x", "text-info", "mb-3", "icon-animation"], ["href", "#", 1, "btn", "btn-info"], [1, "fas", "fa-eye", "me-1"]], template: function QuickActionsCardsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3, "Acciones R\xE1pidas");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "div", 6);
      \u0275\u0275element(8, "i", 7);
      \u0275\u0275elementStart(9, "h5", 8);
      \u0275\u0275text(10, "Nuevo Paciente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "p", 9);
      \u0275\u0275text(12, "Registrar un nuevo paciente en el sistema");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "a", 10);
      \u0275\u0275element(14, "i", 11);
      \u0275\u0275text(15, "Agregar ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(16, "div", 4)(17, "div", 5)(18, "div", 6);
      \u0275\u0275element(19, "i", 12);
      \u0275\u0275elementStart(20, "h5", 8);
      \u0275\u0275text(21, "Nuevo Doctor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "p", 9);
      \u0275\u0275text(23, "Registrar un nuevo doctor en el sistema");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "a", 13);
      \u0275\u0275element(25, "i", 11);
      \u0275\u0275text(26, "Agregar ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(27, "div", 4)(28, "div", 5)(29, "div", 6);
      \u0275\u0275element(30, "i", 14);
      \u0275\u0275elementStart(31, "h5", 8);
      \u0275\u0275text(32, "Nueva Cita");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "p", 9);
      \u0275\u0275text(34, "Programar una nueva cita m\xE9dica");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "a", 15);
      \u0275\u0275element(36, "i", 11);
      \u0275\u0275text(37, "Programar ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(38, "div", 4)(39, "div", 5)(40, "div", 6);
      \u0275\u0275element(41, "i", 16);
      \u0275\u0275elementStart(42, "h5", 8);
      \u0275\u0275text(43, "Citas de Hoy");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "p", 9);
      \u0275\u0275text(45, "Ver las citas programadas para hoy");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "a", 17);
      \u0275\u0275element(47, "i", 18);
      \u0275\u0275text(48, "Ver ");
      \u0275\u0275elementEnd()()()()();
    }
  }, dependencies: [RouterLink], styles: ["/* src/app/components/administrador/quick-actions-cards/quick-actions-cards.component.css */\n.section-title {\n  font-weight: 700;\n  color: #2c3e50;\n  font-size: 2rem;\n}\n.quick-card {\n  border: none;\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n  overflow: hidden;\n}\n.quick-card:hover {\n  transform: translateY(-10px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n}\n.quick-card .card-body {\n  padding: 2rem 1.5rem;\n}\n.icon-animation {\n  transition: transform 0.3s ease;\n}\n.quick-card:hover .icon-animation {\n  transform: scale(1.2) rotate(10deg);\n}\n.quick-card .card-title {\n  font-size: 1.2rem;\n  font-weight: 600;\n  margin-bottom: 1rem;\n  color: #2c3e50;\n}\n.quick-card .card-text {\n  color: #6c757d;\n  font-size: 0.95rem;\n  margin-bottom: 1.5rem;\n}\n.quick-card .btn {\n  padding: 0.6rem 1.5rem;\n  font-weight: 500;\n  border-radius: 50px;\n  transition: all 0.3s ease;\n}\n.quick-card .btn:hover {\n  transform: scale(1.05);\n}\n@media (max-width: 768px) {\n  .section-title {\n    font-size: 1.6rem;\n  }\n  .quick-card .card-body {\n    padding: 1.5rem 1rem;\n  }\n}\n/*# sourceMappingURL=quick-actions-cards.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuickActionsCardsComponent, [{
    type: Component,
    args: [{ selector: "app-quick-actions-cards", imports: [RouterLink], encapsulation: ViewEncapsulation.None, template: '<!-- Quick Actions -->\n<div class="row mb-4">\n  <div class="col-12">\n    <h2 class="text-center mb-4 section-title">Acciones R\xE1pidas</h2>\n  </div>\n</div>\n\n<div class="row">\n  <div class="col-md-3 mb-4">\n    <div class="card h-100 text-center quick-card">\n      <div class="card-body">\n        <i class="fas fa-user-plus fa-3x text-primary mb-3 icon-animation"></i>\n        <h5 class="card-title">Nuevo Paciente</h5>\n        <p class="card-text">Registrar un nuevo paciente en el sistema</p>\n        <a routerLink="/pacientes/formulario" class="btn btn-primary">\n          <i class="fas fa-plus me-1"></i>Agregar\n        </a>\n      </div>\n    </div>\n  </div>\n\n  <div class="col-md-3 mb-4">\n    <div class="card h-100 text-center quick-card">\n      <div class="card-body">\n        <i class="fas fa-user-md fa-3x text-success mb-3 icon-animation"></i>\n        <h5 class="card-title">Nuevo Doctor</h5>\n        <p class="card-text">Registrar un nuevo doctor en el sistema</p>\n        <a href="#" class="btn btn-success">\n          <i class="fas fa-plus me-1"></i>Agregar\n        </a>\n      </div>\n    </div>\n  </div>\n\n  <div class="col-md-3 mb-4">\n    <div class="card h-100 text-center quick-card">\n      <div class="card-body">\n        <i class="fas fa-calendar-plus fa-3x text-warning mb-3 icon-animation"></i>\n        <h5 class="card-title">Nueva Cita</h5>\n        <p class="card-text">Programar una nueva cita m\xE9dica</p>\n        <a href="#" class="btn btn-warning">\n          <i class="fas fa-plus me-1"></i>Programar\n        </a>\n      </div>\n    </div>\n  </div>\n\n  <div class="col-md-3 mb-4">\n    <div class="card h-100 text-center quick-card">\n      <div class="card-body">\n        <i class="fas fa-calendar-check fa-3x text-info mb-3 icon-animation"></i>\n        <h5 class="card-title">Citas de Hoy</h5>\n        <p class="card-text">Ver las citas programadas para hoy</p>\n        <a href="#" class="btn btn-info">\n          <i class="fas fa-eye me-1"></i>Ver\n        </a>\n      </div>\n    </div>\n  </div>\n</div>\n', styles: ["/* src/app/components/administrador/quick-actions-cards/quick-actions-cards.component.css */\n.section-title {\n  font-weight: 700;\n  color: #2c3e50;\n  font-size: 2rem;\n}\n.quick-card {\n  border: none;\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n  overflow: hidden;\n}\n.quick-card:hover {\n  transform: translateY(-10px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n}\n.quick-card .card-body {\n  padding: 2rem 1.5rem;\n}\n.icon-animation {\n  transition: transform 0.3s ease;\n}\n.quick-card:hover .icon-animation {\n  transform: scale(1.2) rotate(10deg);\n}\n.quick-card .card-title {\n  font-size: 1.2rem;\n  font-weight: 600;\n  margin-bottom: 1rem;\n  color: #2c3e50;\n}\n.quick-card .card-text {\n  color: #6c757d;\n  font-size: 0.95rem;\n  margin-bottom: 1.5rem;\n}\n.quick-card .btn {\n  padding: 0.6rem 1.5rem;\n  font-weight: 500;\n  border-radius: 50px;\n  transition: all 0.3s ease;\n}\n.quick-card .btn:hover {\n  transform: scale(1.05);\n}\n@media (max-width: 768px) {\n  .section-title {\n    font-size: 1.6rem;\n  }\n  .quick-card .card-body {\n    padding: 1.5rem 1rem;\n  }\n}\n/*# sourceMappingURL=quick-actions-cards.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QuickActionsCardsComponent, { className: "QuickActionsCardsComponent", filePath: "src/app/components/administrador/quick-actions-cards/quick-actions-cards.component.ts", lineNumber: 11 });
})();

// src/app/components/administrador/features-section/features-section.component.ts
var FeaturesSectionComponent = class _FeaturesSectionComponent {
  static \u0275fac = function FeaturesSectionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FeaturesSectionComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FeaturesSectionComponent, selectors: [["app-features-section"]], decls: 29, vars: 0, consts: [[1, "row", "mt-5"], [1, "col-12"], [1, "text-center", "mb-4", "section-title"], [1, "row"], [1, "col-md-4", "mb-3"], [1, "card", "feature-card"], [1, "card-body"], [1, "card-title"], [1, "fas", "fa-users", "text-primary", "me-2"], [1, "card-text"], [1, "fas", "fa-user-md", "text-success", "me-2"], [1, "fas", "fa-calendar-alt", "text-warning", "me-2"]], template: function FeaturesSectionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3, "Caracter\xEDsticas del Sistema");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "h5", 7);
      \u0275\u0275element(9, "i", 8);
      \u0275\u0275text(10, " Gesti\xF3n de Pacientes ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "p", 9);
      \u0275\u0275text(12, "Registre y administre la informaci\xF3n completa de sus pacientes, incluyendo datos personales y historial m\xE9dico.");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(13, "div", 4)(14, "div", 5)(15, "div", 6)(16, "h5", 7);
      \u0275\u0275element(17, "i", 10);
      \u0275\u0275text(18, " Gesti\xF3n de Doctores ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "p", 9);
      \u0275\u0275text(20, "Mantenga un registro detallado de los m\xE9dicos, sus especialidades y disponibilidad.");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(21, "div", 4)(22, "div", 5)(23, "div", 6)(24, "h5", 7);
      \u0275\u0275element(25, "i", 11);
      \u0275\u0275text(26, " Sistema de Citas ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "p", 9);
      \u0275\u0275text(28, "Programe, confirme y gestione citas m\xE9dicas de manera eficiente y organizada.");
      \u0275\u0275elementEnd()()()()();
    }
  }, styles: ["/* src/app/components/administrador/features-section/features-section.component.css */\n.section-title {\n  font-weight: 700;\n  color: #2c3e50;\n  font-size: 2rem;\n}\n.feature-card {\n  border: none;\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);\n  transition: all 0.3s ease;\n  height: 100%;\n}\n.feature-card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);\n}\n.feature-card .card-body {\n  padding: 2rem;\n}\n.feature-card .card-title {\n  font-size: 1.2rem;\n  font-weight: 600;\n  margin-bottom: 1rem;\n  color: #2c3e50;\n}\n.feature-card .card-title i {\n  font-size: 1.5rem;\n  vertical-align: middle;\n}\n.feature-card .card-text {\n  color: #6c757d;\n  font-size: 0.95rem;\n  line-height: 1.6;\n}\n@media (max-width: 768px) {\n  .section-title {\n    font-size: 1.6rem;\n  }\n  .feature-card .card-body {\n    padding: 1.5rem;\n  }\n}\n/*# sourceMappingURL=features-section.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FeaturesSectionComponent, [{
    type: Component,
    args: [{ selector: "app-features-section", imports: [], encapsulation: ViewEncapsulation.None, template: '<!-- Features Section -->\n<div class="row mt-5">\n  <div class="col-12">\n    <h2 class="text-center mb-4 section-title">Caracter\xEDsticas del Sistema</h2>\n  </div>\n</div>\n\n<div class="row">\n  <div class="col-md-4 mb-3">\n    <div class="card feature-card">\n      <div class="card-body">\n        <h5 class="card-title">\n          <i class="fas fa-users text-primary me-2"></i>\n          Gesti\xF3n de Pacientes\n        </h5>\n        <p class="card-text">Registre y administre la informaci\xF3n completa de sus pacientes, incluyendo datos personales y historial m\xE9dico.</p>\n      </div>\n    </div>\n  </div>\n\n  <div class="col-md-4 mb-3">\n    <div class="card feature-card">\n      <div class="card-body">\n        <h5 class="card-title">\n          <i class="fas fa-user-md text-success me-2"></i>\n          Gesti\xF3n de Doctores\n        </h5>\n        <p class="card-text">Mantenga un registro detallado de los m\xE9dicos, sus especialidades y disponibilidad.</p>\n      </div>\n    </div>\n  </div>\n\n  <div class="col-md-4 mb-3">\n    <div class="card feature-card">\n      <div class="card-body">\n        <h5 class="card-title">\n          <i class="fas fa-calendar-alt text-warning me-2"></i>\n          Sistema de Citas\n        </h5>\n        <p class="card-text">Programe, confirme y gestione citas m\xE9dicas de manera eficiente y organizada.</p>\n      </div>\n    </div>\n  </div>\n</div>\n', styles: ["/* src/app/components/administrador/features-section/features-section.component.css */\n.section-title {\n  font-weight: 700;\n  color: #2c3e50;\n  font-size: 2rem;\n}\n.feature-card {\n  border: none;\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);\n  transition: all 0.3s ease;\n  height: 100%;\n}\n.feature-card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);\n}\n.feature-card .card-body {\n  padding: 2rem;\n}\n.feature-card .card-title {\n  font-size: 1.2rem;\n  font-weight: 600;\n  margin-bottom: 1rem;\n  color: #2c3e50;\n}\n.feature-card .card-title i {\n  font-size: 1.5rem;\n  vertical-align: middle;\n}\n.feature-card .card-text {\n  color: #6c757d;\n  font-size: 0.95rem;\n  line-height: 1.6;\n}\n@media (max-width: 768px) {\n  .section-title {\n    font-size: 1.6rem;\n  }\n  .feature-card .card-body {\n    padding: 1.5rem;\n  }\n}\n/*# sourceMappingURL=features-section.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FeaturesSectionComponent, { className: "FeaturesSectionComponent", filePath: "src/app/components/administrador/features-section/features-section.component.ts", lineNumber: 10 });
})();

// src/app/pages/Administrador/index/index.component.ts
var IndexComponent = class _IndexComponent {
  static \u0275fac = function IndexComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _IndexComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _IndexComponent, selectors: [["app-index"]], decls: 6, vars: 0, consts: [[1, "admin-index-container"], [1, "container-fluid", "py-4"]], template: function IndexComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-admin-header");
      \u0275\u0275elementStart(1, "div", 0)(2, "div", 1);
      \u0275\u0275element(3, "app-hero-section")(4, "app-quick-actions-cards")(5, "app-features-section");
      \u0275\u0275elementEnd()();
    }
  }, dependencies: [
    AdminHeaderComponent,
    HeroSectionComponent,
    QuickActionsCardsComponent,
    FeaturesSectionComponent
  ], styles: ["/* src/app/pages/Administrador/index/index.component.css */\n.admin-index-container {\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  padding-bottom: 2rem;\n}\n@media (max-width: 768px) {\n  .admin-index-container .container-fluid {\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n}\n/*# sourceMappingURL=index.component.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IndexComponent, [{
    type: Component,
    args: [{ selector: "app-index", standalone: true, imports: [
      AdminHeaderComponent,
      HeroSectionComponent,
      QuickActionsCardsComponent,
      FeaturesSectionComponent
    ], encapsulation: ViewEncapsulation.None, template: '<app-admin-header></app-admin-header>\n\n<div class="admin-index-container">\n  <div class="container-fluid py-4">\n    <!-- Hero Section -->\n    <app-hero-section></app-hero-section>\n\n    <!-- Quick Actions Cards -->\n    <app-quick-actions-cards></app-quick-actions-cards>\n\n    <!-- Features Section -->\n    <app-features-section></app-features-section>\n  </div>\n</div>\n', styles: ["/* src/app/pages/Administrador/index/index.component.css */\n.admin-index-container {\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  padding-bottom: 2rem;\n}\n@media (max-width: 768px) {\n  .admin-index-container .container-fluid {\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n}\n/*# sourceMappingURL=index.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(IndexComponent, { className: "IndexComponent", filePath: "src/app/pages/Administrador/index/index.component.ts", lineNumber: 20 });
})();
export {
  IndexComponent
};
//# sourceMappingURL=chunk-6MSUFJ35.js.map
