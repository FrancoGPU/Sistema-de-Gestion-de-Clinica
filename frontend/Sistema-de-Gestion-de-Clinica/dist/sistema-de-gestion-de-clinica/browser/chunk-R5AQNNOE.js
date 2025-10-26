import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-AR7JWTXA.js";

// src/app/pages/Pacientes/campanias/campanias.component.ts
var CampaniasComponent = class _CampaniasComponent {
  suscripcionEmail = "";
  suscribirse() {
    if (this.suscripcionEmail) {
      console.log("Suscrito:", this.suscripcionEmail);
      alert(`\xA1Gracias por suscribirte! Recibir\xE1s informaci\xF3n en ${this.suscripcionEmail}`);
      this.suscripcionEmail = "";
    }
  }
  static \u0275fac = function CampaniasComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CampaniasComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CampaniasComponent, selectors: [["app-campanias"]], decls: 150, vars: 1, consts: [["href", "https://wa.me/51123456789", "target", "_blank", 1, "whatsapp-float"], [1, "fab", "fa-whatsapp"], [1, "py-5"], [1, "container"], [1, "text-center", "mb-5"], [1, "section-title"], [1, "section-subtitle"], [1, "hero-section", "mb-5"], [1, "card", "border-0", "shadow-lg"], [1, "row", "g-0"], [1, "col-md-6"], [1, "campaign-image-placeholder"], [1, "fas", "fa-heartbeat", "fa-5x"], [1, "card-body", "p-5"], [1, "badge", "bg-danger", "mb-3"], [1, "card-title"], [1, "card-text"], [1, "list-unstyled", "mb-4"], [1, "fas", "fa-check", "text-success", "me-2"], [1, "btn", "btn-primary", "btn-lg"], [1, "row", "g-4"], [1, "col-lg-6"], [1, "service-card"], [1, "campaign-header"], [1, "service-icon"], [1, "fas", "fa-baby"], [1, "campaign-content"], [1, "badge", "bg-success"], [1, "list-unstyled"], [1, "fas", "fa-calendar", "me-2"], [1, "fas", "fa-clock", "me-2"], [1, "fas", "fa-users", "me-2"], [1, "btn", "btn-outline-primary"], [1, "fas", "fa-eye"], [1, "badge", "bg-info"], [1, "fas", "fa-eye", "me-2"], [1, "fas", "fa-search", "me-2"], [1, "fas", "fa-percent", "me-2"], [1, "fas", "fa-ribbon"], [1, "badge", "bg-warning", "text-dark"], [1, "fas", "fa-x-ray", "me-2"], [1, "fas", "fa-chalkboard-teacher", "me-2"], [1, "fas", "fa-hands-helping", "me-2"], [1, "fas", "fa-syringe"], [1, "badge", "bg-primary"], [1, "fas", "fa-child", "me-2"], [1, "fas", "fa-user", "me-2"], [1, "fas", "fa-calendar-check", "me-2"], [1, "text-center", "mt-5"], [1, "card", "bg-primary", "text-white"], [1, "mb-4"], [1, "row", "justify-content-center"], [1, "input-group"], ["type", "email", "placeholder", "Tu correo electr\xF3nico", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", "btn-light", 3, "click"]], template: function CampaniasComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "a", 0);
      \u0275\u0275element(1, "i", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "main", 2)(3, "div", 3)(4, "div", 4)(5, "h1", 5);
      \u0275\u0275text(6, "Campa\xF1as de Salud");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 6);
      \u0275\u0275text(8, "Iniciativas de prevenci\xF3n y promoci\xF3n de la salud comunitaria");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 7)(10, "div", 8)(11, "div", 9)(12, "div", 10)(13, "div", 11);
      \u0275\u0275element(14, "i", 12);
      \u0275\u0275elementStart(15, "p");
      \u0275\u0275text(16, "Campa\xF1a de Salud");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "div", 10)(18, "div", 13)(19, "span", 14);
      \u0275\u0275text(20, "CAMPA\xD1A ACTIVA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "h3", 15);
      \u0275\u0275text(22, "Mes de la Prevenci\xF3n Cardiovascular");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "p", 16);
      \u0275\u0275text(24, "\xDAnete a nuestra campa\xF1a de salud cardiovascular. Evaluaciones gratuitas, charlas educativas y descuentos especiales en ex\xE1menes cardiol\xF3gicos.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "ul", 17)(26, "li");
      \u0275\u0275element(27, "i", 18);
      \u0275\u0275text(28, "Electrocardiograma gratuito");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "li");
      \u0275\u0275element(30, "i", 18);
      \u0275\u0275text(31, "Medici\xF3n de presi\xF3n arterial");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "li");
      \u0275\u0275element(33, "i", 18);
      \u0275\u0275text(34, "Consulta cardiol\xF3gica con descuento");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "li");
      \u0275\u0275element(36, "i", 18);
      \u0275\u0275text(37, "Material educativo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "button", 19);
      \u0275\u0275text(39, "Participar Ahora");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(40, "div", 20)(41, "div", 21)(42, "div", 22)(43, "div", 23)(44, "div", 24);
      \u0275\u0275element(45, "i", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "div", 26)(47, "h4");
      \u0275\u0275text(48, "Semana de la Lactancia Materna");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "span", 27);
      \u0275\u0275text(50, "PR\xD3XIMAMENTE");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(51, "p");
      \u0275\u0275text(52, "Talleres y consultas gratuitas para madres lactantes. Apoyo profesional y grupos de apoyo.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "ul", 28)(54, "li");
      \u0275\u0275element(55, "i", 29);
      \u0275\u0275text(56, "1-7 de Agosto");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "li");
      \u0275\u0275element(58, "i", 30);
      \u0275\u0275text(59, "Talleres diarios");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "li");
      \u0275\u0275element(61, "i", 31);
      \u0275\u0275text(62, "Grupos de apoyo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(63, "button", 32);
      \u0275\u0275text(64, "M\xE1s Informaci\xF3n");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(65, "div", 21)(66, "div", 22)(67, "div", 23)(68, "div", 24);
      \u0275\u0275element(69, "i", 33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "div", 26)(71, "h4");
      \u0275\u0275text(72, "D\xEDa Mundial de la Vista");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "span", 34);
      \u0275\u0275text(74, "OCTUBRE");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(75, "p");
      \u0275\u0275text(76, "Ex\xE1menes oftalmol\xF3gicos gratuitos para toda la familia. Detecci\xF3n temprana de problemas visuales.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "ul", 28)(78, "li");
      \u0275\u0275element(79, "i", 35);
      \u0275\u0275text(80, "Examen visual gratuito");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(81, "li");
      \u0275\u0275element(82, "i", 36);
      \u0275\u0275text(83, "Detecci\xF3n de glaucoma");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(84, "li");
      \u0275\u0275element(85, "i", 37);
      \u0275\u0275text(86, "Descuentos en lentes");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(87, "button", 32);
      \u0275\u0275text(88, "Reservar Cita");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(89, "div", 21)(90, "div", 22)(91, "div", 23)(92, "div", 24);
      \u0275\u0275element(93, "i", 38);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(94, "div", 26)(95, "h4");
      \u0275\u0275text(96, "Mes Rosa - Prevenci\xF3n del C\xE1ncer de Mama");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(97, "span", 39);
      \u0275\u0275text(98, "OCTUBRE");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(99, "p");
      \u0275\u0275text(100, "Mamograf\xEDas a precio especial y charlas educativas sobre la importancia de la detecci\xF3n temprana.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(101, "ul", 28)(102, "li");
      \u0275\u0275element(103, "i", 40);
      \u0275\u0275text(104, "Mamograf\xEDa con descuento");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(105, "li");
      \u0275\u0275element(106, "i", 41);
      \u0275\u0275text(107, "Charlas educativas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(108, "li");
      \u0275\u0275element(109, "i", 42);
      \u0275\u0275text(110, "Autoexamen guiado");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(111, "button", 32);
      \u0275\u0275text(112, "Agendar Mamograf\xEDa");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(113, "div", 21)(114, "div", 22)(115, "div", 23)(116, "div", 24);
      \u0275\u0275element(117, "i", 43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(118, "div", 26)(119, "h4");
      \u0275\u0275text(120, "Jornada de Vacunaci\xF3n Familiar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(121, "span", 44);
      \u0275\u0275text(122, "DISPONIBLE");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(123, "p");
      \u0275\u0275text(124, "Mant\xE9n al d\xEDa las vacunas de toda tu familia. Esquemas completos para ni\xF1os y adultos.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(125, "ul", 28)(126, "li");
      \u0275\u0275element(127, "i", 45);
      \u0275\u0275text(128, "Vacunas pedi\xE1tricas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(129, "li");
      \u0275\u0275element(130, "i", 46);
      \u0275\u0275text(131, "Vacunas para adultos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(132, "li");
      \u0275\u0275element(133, "i", 47);
      \u0275\u0275text(134, "Recordatorios autom\xE1ticos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(135, "button", 32);
      \u0275\u0275text(136, "Ver Esquemas");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(137, "div", 48)(138, "div", 49)(139, "div", 13)(140, "h3");
      \u0275\u0275text(141, "\xBFQuieres recibir informaci\xF3n sobre nuestras campa\xF1as?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(142, "p", 50);
      \u0275\u0275text(143, "Suscr\xEDbete a nuestro bolet\xEDn y mantente informado sobre todas nuestras iniciativas de salud.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(144, "div", 51)(145, "div", 10)(146, "div", 52)(147, "input", 53);
      \u0275\u0275twoWayListener("ngModelChange", function CampaniasComponent_Template_input_ngModelChange_147_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.suscripcionEmail, $event) || (ctx.suscripcionEmail = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(148, "button", 54);
      \u0275\u0275listener("click", function CampaniasComponent_Template_button_click_148_listener() {
        return ctx.suscribirse();
      });
      \u0275\u0275text(149, "Suscribirse");
      \u0275\u0275elementEnd()()()()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(147);
      \u0275\u0275twoWayProperty("ngModel", ctx.suscripcionEmail);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.section-title[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.section-subtitle[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: #6c757d;\n  margin-bottom: 2rem;\n}\n.campaign-image-placeholder[_ngcontent-%COMP%] {\n  height: 100%;\n  min-height: 300px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  border-radius: 15px 0 0 15px;\n}\n.campaign-image-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  font-size: 1.2rem;\n  font-weight: 600;\n}\n.service-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 15px;\n  padding: 2rem;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  height: 100%;\n}\n.service-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-10px);\n  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);\n}\n.campaign-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.service-icon[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n  color: white;\n  flex-shrink: 0;\n}\n.campaign-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.campaign-content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #333;\n  margin-bottom: 0.5rem;\n}\n.service-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6c757d;\n  line-height: 1.6;\n}\n.service-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 0.5rem 0;\n  color: #555;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border: none;\n  font-weight: 600;\n}\n.btn-outline-primary[_ngcontent-%COMP%] {\n  border-color: #667eea;\n  color: #667eea;\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-color: transparent;\n}\n.whatsapp-float[_ngcontent-%COMP%] {\n  position: fixed;\n  width: 60px;\n  height: 60px;\n  bottom: 40px;\n  right: 40px;\n  background-color: #25d366;\n  color: #fff;\n  border-radius: 50%;\n  text-align: center;\n  font-size: 30px;\n  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);\n  z-index: 100;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n}\n.whatsapp-float[_ngcontent-%COMP%]:hover {\n  background-color: #20ba5a;\n  transform: scale(1.1);\n  color: #fff;\n}\nbody.dark-mode[_ngcontent-%COMP%]   .service-card[_ngcontent-%COMP%] {\n  background: #2d3748;\n}\nbody.dark-mode[_ngcontent-%COMP%]   .campaign-content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  color: #fff;\n}\nbody.dark-mode[_ngcontent-%COMP%]   .service-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .service-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\n/*# sourceMappingURL=campanias.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CampaniasComponent, [{
    type: Component,
    args: [{ selector: "app-campanias", standalone: true, imports: [CommonModule, FormsModule], template: '<!-- Bot\xF3n flotante de WhatsApp -->\n<a href="https://wa.me/51123456789" class="whatsapp-float" target="_blank">\n  <i class="fab fa-whatsapp"></i>\n</a>\n\n<!-- CONTENIDO PRINCIPAL -->\n<main class="py-5">\n  <div class="container">\n    <div class="text-center mb-5">\n      <h1 class="section-title">Campa\xF1as de Salud</h1>\n      <p class="section-subtitle">Iniciativas de prevenci\xF3n y promoci\xF3n de la salud comunitaria</p>\n    </div>\n\n    <!-- Campa\xF1a destacada -->\n    <div class="hero-section mb-5">\n      <div class="card border-0 shadow-lg">\n        <div class="row g-0">\n          <div class="col-md-6">\n            <div class="campaign-image-placeholder">\n              <i class="fas fa-heartbeat fa-5x"></i>\n              <p>Campa\xF1a de Salud</p>\n            </div>\n          </div>\n          <div class="col-md-6">\n            <div class="card-body p-5">\n              <span class="badge bg-danger mb-3">CAMPA\xD1A ACTIVA</span>\n              <h3 class="card-title">Mes de la Prevenci\xF3n Cardiovascular</h3>\n              <p class="card-text">\xDAnete a nuestra campa\xF1a de salud cardiovascular. Evaluaciones gratuitas, charlas\n                educativas y descuentos especiales en ex\xE1menes cardiol\xF3gicos.</p>\n              <ul class="list-unstyled mb-4">\n                <li><i class="fas fa-check text-success me-2"></i>Electrocardiograma gratuito</li>\n                <li><i class="fas fa-check text-success me-2"></i>Medici\xF3n de presi\xF3n arterial</li>\n                <li><i class="fas fa-check text-success me-2"></i>Consulta cardiol\xF3gica con descuento</li>\n                <li><i class="fas fa-check text-success me-2"></i>Material educativo</li>\n              </ul>\n              <button class="btn btn-primary btn-lg">Participar Ahora</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Otras campa\xF1as -->\n    <div class="row g-4">\n      <div class="col-lg-6">\n        <div class="service-card">\n          <div class="campaign-header">\n            <div class="service-icon">\n              <i class="fas fa-baby"></i>\n            </div>\n            <div class="campaign-content">\n              <h4>Semana de la Lactancia Materna</h4>\n              <span class="badge bg-success">PR\xD3XIMAMENTE</span>\n            </div>\n          </div>\n          <p>Talleres y consultas gratuitas para madres lactantes. Apoyo profesional y grupos de apoyo.</p>\n          <ul class="list-unstyled">\n            <li><i class="fas fa-calendar me-2"></i>1-7 de Agosto</li>\n            <li><i class="fas fa-clock me-2"></i>Talleres diarios</li>\n            <li><i class="fas fa-users me-2"></i>Grupos de apoyo</li>\n          </ul>\n          <button class="btn btn-outline-primary">M\xE1s Informaci\xF3n</button>\n        </div>\n      </div>\n\n      <div class="col-lg-6">\n        <div class="service-card">\n          <div class="campaign-header">\n            <div class="service-icon">\n              <i class="fas fa-eye"></i>\n            </div>\n            <div class="campaign-content">\n              <h4>D\xEDa Mundial de la Vista</h4>\n              <span class="badge bg-info">OCTUBRE</span>\n            </div>\n          </div>\n          <p>Ex\xE1menes oftalmol\xF3gicos gratuitos para toda la familia. Detecci\xF3n temprana de problemas visuales.</p>\n          <ul class="list-unstyled">\n            <li><i class="fas fa-eye me-2"></i>Examen visual gratuito</li>\n            <li><i class="fas fa-search me-2"></i>Detecci\xF3n de glaucoma</li>\n            <li><i class="fas fa-percent me-2"></i>Descuentos en lentes</li>\n          </ul>\n          <button class="btn btn-outline-primary">Reservar Cita</button>\n        </div>\n      </div>\n\n      <div class="col-lg-6">\n        <div class="service-card">\n          <div class="campaign-header">\n            <div class="service-icon">\n              <i class="fas fa-ribbon"></i>\n            </div>\n            <div class="campaign-content">\n              <h4>Mes Rosa - Prevenci\xF3n del C\xE1ncer de Mama</h4>\n              <span class="badge bg-warning text-dark">OCTUBRE</span>\n            </div>\n          </div>\n          <p>Mamograf\xEDas a precio especial y charlas educativas sobre la importancia de la detecci\xF3n temprana.</p>\n          <ul class="list-unstyled">\n            <li><i class="fas fa-x-ray me-2"></i>Mamograf\xEDa con descuento</li>\n            <li><i class="fas fa-chalkboard-teacher me-2"></i>Charlas educativas</li>\n            <li><i class="fas fa-hands-helping me-2"></i>Autoexamen guiado</li>\n          </ul>\n          <button class="btn btn-outline-primary">Agendar Mamograf\xEDa</button>\n        </div>\n      </div>\n\n      <div class="col-lg-6">\n        <div class="service-card">\n          <div class="campaign-header">\n            <div class="service-icon">\n              <i class="fas fa-syringe"></i>\n            </div>\n            <div class="campaign-content">\n              <h4>Jornada de Vacunaci\xF3n Familiar</h4>\n              <span class="badge bg-primary">DISPONIBLE</span>\n            </div>\n          </div>\n          <p>Mant\xE9n al d\xEDa las vacunas de toda tu familia. Esquemas completos para ni\xF1os y adultos.</p>\n          <ul class="list-unstyled">\n            <li><i class="fas fa-child me-2"></i>Vacunas pedi\xE1tricas</li>\n            <li><i class="fas fa-user me-2"></i>Vacunas para adultos</li>\n            <li><i class="fas fa-calendar-check me-2"></i>Recordatorios autom\xE1ticos</li>\n          </ul>\n          <button class="btn btn-outline-primary">Ver Esquemas</button>\n        </div>\n      </div>\n    </div>\n\n    <!-- Secci\xF3n de registro -->\n    <div class="text-center mt-5">\n      <div class="card bg-primary text-white">\n        <div class="card-body p-5">\n          <h3>\xBFQuieres recibir informaci\xF3n sobre nuestras campa\xF1as?</h3>\n          <p class="mb-4">Suscr\xEDbete a nuestro bolet\xEDn y mantente informado sobre todas nuestras iniciativas de\n            salud.</p>\n          <div class="row justify-content-center">\n            <div class="col-md-6">\n              <div class="input-group">\n                <input type="email" class="form-control" placeholder="Tu correo electr\xF3nico"\n                  [(ngModel)]="suscripcionEmail">\n                <button class="btn btn-light" type="button" (click)="suscribirse()">Suscribirse</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>\n', styles: ["/* src/app/pages/Pacientes/campanias/campanias.component.css */\n.section-title {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.section-subtitle {\n  font-size: 1.2rem;\n  color: #6c757d;\n  margin-bottom: 2rem;\n}\n.campaign-image-placeholder {\n  height: 100%;\n  min-height: 300px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  border-radius: 15px 0 0 15px;\n}\n.campaign-image-placeholder p {\n  margin-top: 1rem;\n  font-size: 1.2rem;\n  font-weight: 600;\n}\n.service-card {\n  background: white;\n  border-radius: 15px;\n  padding: 2rem;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  height: 100%;\n}\n.service-card:hover {\n  transform: translateY(-10px);\n  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);\n}\n.campaign-header {\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.service-icon {\n  width: 60px;\n  height: 60px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n  color: white;\n  flex-shrink: 0;\n}\n.campaign-content {\n  flex: 1;\n}\n.campaign-content h4 {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #333;\n  margin-bottom: 0.5rem;\n}\n.service-card p {\n  color: #6c757d;\n  line-height: 1.6;\n}\n.service-card ul li {\n  padding: 0.5rem 0;\n  color: #555;\n}\n.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border: none;\n  font-weight: 600;\n}\n.btn-outline-primary {\n  border-color: #667eea;\n  color: #667eea;\n}\n.btn-outline-primary:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-color: transparent;\n}\n.whatsapp-float {\n  position: fixed;\n  width: 60px;\n  height: 60px;\n  bottom: 40px;\n  right: 40px;\n  background-color: #25d366;\n  color: #fff;\n  border-radius: 50%;\n  text-align: center;\n  font-size: 30px;\n  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);\n  z-index: 100;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n}\n.whatsapp-float:hover {\n  background-color: #20ba5a;\n  transform: scale(1.1);\n  color: #fff;\n}\nbody.dark-mode .service-card {\n  background: #2d3748;\n}\nbody.dark-mode .campaign-content h4,\nbody.dark-mode .card-title {\n  color: #fff;\n}\nbody.dark-mode .service-card p,\nbody.dark-mode .service-card ul li {\n  color: #a0aec0;\n}\n/*# sourceMappingURL=campanias.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CampaniasComponent, { className: "CampaniasComponent", filePath: "src/app/pages/Pacientes/campanias/campanias.component.ts", lineNumber: 12 });
})();
export {
  CampaniasComponent
};
//# sourceMappingURL=chunk-R5AQNNOE.js.map
