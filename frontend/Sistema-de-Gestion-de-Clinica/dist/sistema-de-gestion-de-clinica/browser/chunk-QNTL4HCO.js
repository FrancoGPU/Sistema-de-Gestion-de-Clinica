import {
  CheckboxControlValueAccessor,
  CheckboxRequiredValidator,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
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

// src/app/pages/Pacientes/contacto/contacto.component.ts
var ContactoComponent = class _ContactoComponent {
  formData = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
    aceptaPoliticas: false
  };
  onSubmit() {
    console.log("Formulario enviado:", this.formData);
    alert("Mensaje enviado con \xE9xito. Nos pondremos en contacto contigo pronto.");
    this.resetForm();
  }
  resetForm() {
    this.formData = {
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      asunto: "",
      mensaje: "",
      aceptaPoliticas: false
    };
  }
  static \u0275fac = function ContactoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContactoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContactoComponent, selectors: [["app-contacto"]], decls: 138, vars: 8, consts: [["contactForm", "ngForm"], ["href", "https://wa.me/51123456789", "target", "_blank", 1, "whatsapp-float"], [1, "fab", "fa-whatsapp"], [1, "py-5"], [1, "container"], [1, "text-center", "mb-5"], [1, "section-title"], [1, "section-subtitle"], [1, "row", "g-5"], [1, "col-lg-6"], [1, "contact-info"], [1, "mb-4"], [1, "contact-item", "mb-4"], [1, "d-flex", "align-items-center"], [1, "contact-icon", "me-3"], [1, "fas", "fa-map-marker-alt"], [1, "mb-0"], [1, "fas", "fa-phone"], [1, "fas", "fa-envelope"], [1, "fas", "fa-clock"], [1, "social-media", "mt-4"], [1, "social-links"], ["href", "#", 1, "social-link", "me-3"], [1, "fab", "fa-facebook", "fa-2x"], [1, "fab", "fa-instagram", "fa-2x"], [1, "fab", "fa-linkedin", "fa-2x"], ["href", "#", 1, "social-link"], [1, "fab", "fa-youtube", "fa-2x"], [1, "contact-form"], [3, "ngSubmit"], [1, "row"], [1, "col-md-6", "mb-3"], ["for", "nombre", 1, "form-label"], ["type", "text", "id", "nombre", "name", "nombre", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "apellido", 1, "form-label"], ["type", "text", "id", "apellido", "name", "apellido", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "email", 1, "form-label"], ["type", "email", "id", "email", "name", "email", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "telefono", 1, "form-label"], ["type", "tel", "id", "telefono", "name", "telefono", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "mb-3"], ["for", "asunto", 1, "form-label"], ["id", "asunto", "name", "asunto", "required", "", 1, "form-select", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "cita"], ["value", "consulta"], ["value", "reclamo"], ["value", "emergencia"], ["value", "otro"], ["for", "mensaje", 1, "form-label"], ["id", "mensaje", "rows", "5", "name", "mensaje", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "mb-3", "form-check"], ["type", "checkbox", "id", "politicas", "name", "aceptaPoliticas", "required", "", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "politicas", 1, "form-check-label"], ["href", "#"], ["type", "submit", 1, "btn", "btn-primary", "btn-lg", "w-100", 3, "disabled"], [1, "fas", "fa-paper-plane", "me-2"], [1, "mt-5"], [1, "text-center", "mb-4"], [1, "card"], [1, "card-body", "p-0"], [1, "map-placeholder", "bg-light", "d-flex", "align-items-center", "justify-content-center", 2, "height", "400px"], [1, "text-center"], [1, "fas", "fa-map-marked-alt", "fa-4x", "text-muted", "mb-3"], [1, "text-muted"], [1, "btn", "btn-outline-primary"]], template: function ContactoComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "a", 1);
      \u0275\u0275element(1, "i", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "main", 3)(3, "div", 4)(4, "div", 5)(5, "h1", 6);
      \u0275\u0275text(6, "Cont\xE1ctanos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 7);
      \u0275\u0275text(8, "Estamos aqu\xED para ayudarte con todas tus necesidades de salud");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 8)(10, "div", 9)(11, "div", 10)(12, "h3", 11);
      \u0275\u0275text(13, "Informaci\xF3n de Contacto");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 12)(15, "div", 13)(16, "div", 14);
      \u0275\u0275element(17, "i", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div")(19, "h5");
      \u0275\u0275text(20, "Direcci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "p", 16);
      \u0275\u0275text(22, "Av. Principal Gloria Grande, Lima, Per\xFA");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(23, "div", 12)(24, "div", 13)(25, "div", 14);
      \u0275\u0275element(26, "i", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div")(28, "h5");
      \u0275\u0275text(29, "Tel\xE9fonos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "p", 16);
      \u0275\u0275text(31, "+51 1 234-5678");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "p", 16);
      \u0275\u0275text(33, "Emergencias: +51 1 987-6543");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(34, "div", 12)(35, "div", 13)(36, "div", 14);
      \u0275\u0275element(37, "i", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div")(39, "h5");
      \u0275\u0275text(40, "Correo Electr\xF3nico");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "p", 16);
      \u0275\u0275text(42, "info@medicore.com");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "p", 16);
      \u0275\u0275text(44, "citas@medicore.com");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(45, "div", 12)(46, "div", 13)(47, "div", 14);
      \u0275\u0275element(48, "i", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "div")(50, "h5");
      \u0275\u0275text(51, "Horarios de Atenci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "p", 16);
      \u0275\u0275text(53, "Lunes - Viernes: 7:00 AM - 10:00 PM");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "p", 16);
      \u0275\u0275text(55, "S\xE1bados: 8:00 AM - 8:00 PM");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "p", 16);
      \u0275\u0275text(57, "Domingos: 9:00 AM - 6:00 PM");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(58, "div", 20)(59, "h5");
      \u0275\u0275text(60, "S\xEDguenos en Redes Sociales");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "div", 21)(62, "a", 22);
      \u0275\u0275element(63, "i", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "a", 22);
      \u0275\u0275element(65, "i", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "a", 22);
      \u0275\u0275element(67, "i", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "a", 26);
      \u0275\u0275element(69, "i", 27);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(70, "div", 9)(71, "div", 28)(72, "h3", 11);
      \u0275\u0275text(73, "Env\xEDanos un Mensaje");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "form", 29, 0);
      \u0275\u0275listener("ngSubmit", function ContactoComponent_Template_form_ngSubmit_74_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSubmit());
      });
      \u0275\u0275elementStart(76, "div", 30)(77, "div", 31)(78, "label", 32);
      \u0275\u0275text(79, "Nombre *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "input", 33);
      \u0275\u0275twoWayListener("ngModelChange", function ContactoComponent_Template_input_ngModelChange_80_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.nombre, $event) || (ctx.formData.nombre = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(81, "div", 31)(82, "label", 34);
      \u0275\u0275text(83, "Apellido *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(84, "input", 35);
      \u0275\u0275twoWayListener("ngModelChange", function ContactoComponent_Template_input_ngModelChange_84_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.apellido, $event) || (ctx.formData.apellido = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(85, "div", 30)(86, "div", 31)(87, "label", 36);
      \u0275\u0275text(88, "Correo Electr\xF3nico *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "input", 37);
      \u0275\u0275twoWayListener("ngModelChange", function ContactoComponent_Template_input_ngModelChange_89_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.email, $event) || (ctx.formData.email = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(90, "div", 31)(91, "label", 38);
      \u0275\u0275text(92, "Tel\xE9fono");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "input", 39);
      \u0275\u0275twoWayListener("ngModelChange", function ContactoComponent_Template_input_ngModelChange_93_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.telefono, $event) || (ctx.formData.telefono = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(94, "div", 40)(95, "label", 41);
      \u0275\u0275text(96, "Asunto *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(97, "select", 42);
      \u0275\u0275twoWayListener("ngModelChange", function ContactoComponent_Template_select_ngModelChange_97_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.asunto, $event) || (ctx.formData.asunto = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(98, "option", 43);
      \u0275\u0275text(99, "Seleccionar asunto");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(100, "option", 44);
      \u0275\u0275text(101, "Agendar Cita");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(102, "option", 45);
      \u0275\u0275text(103, "Consulta General");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(104, "option", 46);
      \u0275\u0275text(105, "Reclamo o Sugerencia");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(106, "option", 47);
      \u0275\u0275text(107, "Emergencia");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(108, "option", 48);
      \u0275\u0275text(109, "Otro");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(110, "div", 40)(111, "label", 49);
      \u0275\u0275text(112, "Mensaje *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(113, "textarea", 50);
      \u0275\u0275twoWayListener("ngModelChange", function ContactoComponent_Template_textarea_ngModelChange_113_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.mensaje, $event) || (ctx.formData.mensaje = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(114, "div", 51)(115, "input", 52);
      \u0275\u0275twoWayListener("ngModelChange", function ContactoComponent_Template_input_ngModelChange_115_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formData.aceptaPoliticas, $event) || (ctx.formData.aceptaPoliticas = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(116, "label", 53);
      \u0275\u0275text(117, " Acepto las ");
      \u0275\u0275elementStart(118, "a", 54);
      \u0275\u0275text(119, "pol\xEDticas de privacidad");
      \u0275\u0275elementEnd();
      \u0275\u0275text(120, " * ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(121, "button", 55);
      \u0275\u0275element(122, "i", 56);
      \u0275\u0275text(123, "Enviar Mensaje ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(124, "div", 57)(125, "h3", 58);
      \u0275\u0275text(126, "Nuestra Ubicaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(127, "div", 59)(128, "div", 60)(129, "div", 61)(130, "div", 62);
      \u0275\u0275element(131, "i", 63);
      \u0275\u0275elementStart(132, "h5", 64);
      \u0275\u0275text(133, "Mapa de Ubicaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(134, "p", 64);
      \u0275\u0275text(135, "Av. Principal Gloria Grande, Lima, Per\xFA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(136, "button", 65);
      \u0275\u0275text(137, "Ver en Google Maps");
      \u0275\u0275elementEnd()()()()()()()();
    }
    if (rf & 2) {
      const contactForm_r2 = \u0275\u0275reference(75);
      \u0275\u0275advance(80);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.nombre);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.apellido);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.email);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.telefono);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.asunto);
      \u0275\u0275advance(16);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.mensaje);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData.aceptaPoliticas);
      \u0275\u0275advance(6);
      \u0275\u0275property("disabled", !contactForm_r2.valid);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, CheckboxRequiredValidator, NgModel, NgForm], styles: ["\n\n.section-title[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.section-subtitle[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: #6c757d;\n  margin-bottom: 2rem;\n}\n.contact-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #333;\n  font-weight: 600;\n}\n.contact-item[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #333;\n  margin-bottom: 0.5rem;\n}\n.contact-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin-bottom: 0.25rem;\n}\n.contact-icon[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 1.5rem;\n}\n.social-links[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n}\n.social-link[_ngcontent-%COMP%] {\n  color: #667eea;\n  transition: all 0.3s ease;\n}\n.social-link[_ngcontent-%COMP%]:hover {\n  color: #764ba2;\n  transform: scale(1.1);\n}\n.contact-form[_ngcontent-%COMP%] {\n  background: white;\n  padding: 2rem;\n  border-radius: 15px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.contact-form[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #333;\n  font-weight: 600;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #333;\n}\n.form-control[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 0.75rem 1rem;\n  transition: all 0.3s ease;\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #667eea;\n  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border: none;\n  padding: 0.75rem 2rem;\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.map-placeholder[_ngcontent-%COMP%] {\n  border-radius: 10px;\n}\n.whatsapp-float[_ngcontent-%COMP%] {\n  position: fixed;\n  width: 60px;\n  height: 60px;\n  bottom: 40px;\n  right: 40px;\n  background-color: #25d366;\n  color: #fff;\n  border-radius: 50%;\n  text-align: center;\n  font-size: 30px;\n  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);\n  z-index: 100;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n}\n.whatsapp-float[_ngcontent-%COMP%]:hover {\n  background-color: #20ba5a;\n  transform: scale(1.1);\n  color: #fff;\n}\nbody.dark-mode[_ngcontent-%COMP%]   .contact-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .contact-info[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .contact-form[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .form-label[_ngcontent-%COMP%] {\n  color: #fff;\n}\nbody.dark-mode[_ngcontent-%COMP%]   .contact-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #a0aec0;\n}\nbody.dark-mode[_ngcontent-%COMP%]   .contact-form[_ngcontent-%COMP%] {\n  background: #2d3748;\n}\nbody.dark-mode[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%], \nbody.dark-mode[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%] {\n  background: #1a202c;\n  border-color: #4a5568;\n  color: #fff;\n}\nbody.dark-mode[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  background: #2d3748;\n}\n/*# sourceMappingURL=contacto.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContactoComponent, [{
    type: Component,
    args: [{ selector: "app-contacto", standalone: true, imports: [CommonModule, FormsModule], template: '<!-- Bot\xF3n flotante de WhatsApp -->\n<a href="https://wa.me/51123456789" class="whatsapp-float" target="_blank">\n  <i class="fab fa-whatsapp"></i>\n</a>\n\n<!-- CONTENIDO PRINCIPAL -->\n<main class="py-5">\n  <div class="container">\n    <div class="text-center mb-5">\n      <h1 class="section-title">Cont\xE1ctanos</h1>\n      <p class="section-subtitle">Estamos aqu\xED para ayudarte con todas tus necesidades de salud</p>\n    </div>\n\n    <div class="row g-5">\n      <!-- Informaci\xF3n de contacto -->\n      <div class="col-lg-6">\n        <div class="contact-info">\n          <h3 class="mb-4">Informaci\xF3n de Contacto</h3>\n\n          <div class="contact-item mb-4">\n            <div class="d-flex align-items-center">\n              <div class="contact-icon me-3">\n                <i class="fas fa-map-marker-alt"></i>\n              </div>\n              <div>\n                <h5>Direcci\xF3n</h5>\n                <p class="mb-0">Av. Principal Gloria Grande, Lima, Per\xFA</p>\n              </div>\n            </div>\n          </div>\n\n          <div class="contact-item mb-4">\n            <div class="d-flex align-items-center">\n              <div class="contact-icon me-3">\n                <i class="fas fa-phone"></i>\n              </div>\n              <div>\n                <h5>Tel\xE9fonos</h5>\n                <p class="mb-0">+51 1 234-5678</p>\n                <p class="mb-0">Emergencias: +51 1 987-6543</p>\n              </div>\n            </div>\n          </div>\n\n          <div class="contact-item mb-4">\n            <div class="d-flex align-items-center">\n              <div class="contact-icon me-3">\n                <i class="fas fa-envelope"></i>\n              </div>\n              <div>\n                <h5>Correo Electr\xF3nico</h5>\n                <p class="mb-0">info&#64;medicore.com</p>\n                <p class="mb-0">citas&#64;medicore.com</p>\n              </div>\n            </div>\n          </div>\n\n          <div class="contact-item mb-4">\n            <div class="d-flex align-items-center">\n              <div class="contact-icon me-3">\n                <i class="fas fa-clock"></i>\n              </div>\n              <div>\n                <h5>Horarios de Atenci\xF3n</h5>\n                <p class="mb-0">Lunes - Viernes: 7:00 AM - 10:00 PM</p>\n                <p class="mb-0">S\xE1bados: 8:00 AM - 8:00 PM</p>\n                <p class="mb-0">Domingos: 9:00 AM - 6:00 PM</p>\n              </div>\n            </div>\n          </div>\n\n          <div class="social-media mt-4">\n            <h5>S\xEDguenos en Redes Sociales</h5>\n            <div class="social-links">\n              <a href="#" class="social-link me-3">\n                <i class="fab fa-facebook fa-2x"></i>\n              </a>\n              <a href="#" class="social-link me-3">\n                <i class="fab fa-instagram fa-2x"></i>\n              </a>\n              <a href="#" class="social-link me-3">\n                <i class="fab fa-linkedin fa-2x"></i>\n              </a>\n              <a href="#" class="social-link">\n                <i class="fab fa-youtube fa-2x"></i>\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Formulario de contacto -->\n      <div class="col-lg-6">\n        <div class="contact-form">\n          <h3 class="mb-4">Env\xEDanos un Mensaje</h3>\n          <form (ngSubmit)="onSubmit()" #contactForm="ngForm">\n            <div class="row">\n              <div class="col-md-6 mb-3">\n                <label for="nombre" class="form-label">Nombre *</label>\n                <input type="text" class="form-control" id="nombre" [(ngModel)]="formData.nombre" name="nombre"\n                  required>\n              </div>\n              <div class="col-md-6 mb-3">\n                <label for="apellido" class="form-label">Apellido *</label>\n                <input type="text" class="form-control" id="apellido" [(ngModel)]="formData.apellido" name="apellido"\n                  required>\n              </div>\n            </div>\n\n            <div class="row">\n              <div class="col-md-6 mb-3">\n                <label for="email" class="form-label">Correo Electr\xF3nico *</label>\n                <input type="email" class="form-control" id="email" [(ngModel)]="formData.email" name="email"\n                  required>\n              </div>\n              <div class="col-md-6 mb-3">\n                <label for="telefono" class="form-label">Tel\xE9fono</label>\n                <input type="tel" class="form-control" id="telefono" [(ngModel)]="formData.telefono" name="telefono">\n              </div>\n            </div>\n\n            <div class="mb-3">\n              <label for="asunto" class="form-label">Asunto *</label>\n              <select class="form-select" id="asunto" [(ngModel)]="formData.asunto" name="asunto" required>\n                <option value="">Seleccionar asunto</option>\n                <option value="cita">Agendar Cita</option>\n                <option value="consulta">Consulta General</option>\n                <option value="reclamo">Reclamo o Sugerencia</option>\n                <option value="emergencia">Emergencia</option>\n                <option value="otro">Otro</option>\n              </select>\n            </div>\n\n            <div class="mb-3">\n              <label for="mensaje" class="form-label">Mensaje *</label>\n              <textarea class="form-control" id="mensaje" rows="5" [(ngModel)]="formData.mensaje" name="mensaje"\n                required></textarea>\n            </div>\n\n            <div class="mb-3 form-check">\n              <input type="checkbox" class="form-check-input" id="politicas" [(ngModel)]="formData.aceptaPoliticas"\n                name="aceptaPoliticas" required>\n              <label class="form-check-label" for="politicas">\n                Acepto las <a href="#">pol\xEDticas de privacidad</a> *\n              </label>\n            </div>\n\n            <button type="submit" class="btn btn-primary btn-lg w-100" [disabled]="!contactForm.valid">\n              <i class="fas fa-paper-plane me-2"></i>Enviar Mensaje\n            </button>\n          </form>\n        </div>\n      </div>\n    </div>\n\n    <!-- Mapa -->\n    <div class="mt-5">\n      <h3 class="text-center mb-4">Nuestra Ubicaci\xF3n</h3>\n      <div class="card">\n        <div class="card-body p-0">\n          <div class="map-placeholder bg-light d-flex align-items-center justify-content-center"\n            style="height: 400px;">\n            <div class="text-center">\n              <i class="fas fa-map-marked-alt fa-4x text-muted mb-3"></i>\n              <h5 class="text-muted">Mapa de Ubicaci\xF3n</h5>\n              <p class="text-muted">Av. Principal Gloria Grande, Lima, Per\xFA</p>\n              <button class="btn btn-outline-primary">Ver en Google Maps</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>\n', styles: ["/* src/app/pages/Pacientes/contacto/contacto.component.css */\n.section-title {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.section-subtitle {\n  font-size: 1.2rem;\n  color: #6c757d;\n  margin-bottom: 2rem;\n}\n.contact-info h3 {\n  color: #333;\n  font-weight: 600;\n}\n.contact-item h5 {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #333;\n  margin-bottom: 0.5rem;\n}\n.contact-item p {\n  color: #6c757d;\n  margin-bottom: 0.25rem;\n}\n.contact-icon {\n  width: 50px;\n  height: 50px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 1.5rem;\n}\n.social-links {\n  display: flex;\n  gap: 1rem;\n}\n.social-link {\n  color: #667eea;\n  transition: all 0.3s ease;\n}\n.social-link:hover {\n  color: #764ba2;\n  transform: scale(1.1);\n}\n.contact-form {\n  background: white;\n  padding: 2rem;\n  border-radius: 15px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.contact-form h3 {\n  color: #333;\n  font-weight: 600;\n}\n.form-label {\n  font-weight: 500;\n  color: #333;\n}\n.form-control,\n.form-select {\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 0.75rem 1rem;\n  transition: all 0.3s ease;\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: #667eea;\n  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);\n}\n.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border: none;\n  padding: 0.75rem 2rem;\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.btn-primary:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);\n}\n.btn-primary:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.map-placeholder {\n  border-radius: 10px;\n}\n.whatsapp-float {\n  position: fixed;\n  width: 60px;\n  height: 60px;\n  bottom: 40px;\n  right: 40px;\n  background-color: #25d366;\n  color: #fff;\n  border-radius: 50%;\n  text-align: center;\n  font-size: 30px;\n  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);\n  z-index: 100;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n}\n.whatsapp-float:hover {\n  background-color: #20ba5a;\n  transform: scale(1.1);\n  color: #fff;\n}\nbody.dark-mode .contact-info h3,\nbody.dark-mode .contact-info h5,\nbody.dark-mode .contact-form h3,\nbody.dark-mode .form-label {\n  color: #fff;\n}\nbody.dark-mode .contact-info p {\n  color: #a0aec0;\n}\nbody.dark-mode .contact-form {\n  background: #2d3748;\n}\nbody.dark-mode .form-control,\nbody.dark-mode .form-select {\n  background: #1a202c;\n  border-color: #4a5568;\n  color: #fff;\n}\nbody.dark-mode .card {\n  background: #2d3748;\n}\n/*# sourceMappingURL=contacto.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContactoComponent, { className: "ContactoComponent", filePath: "src/app/pages/Pacientes/contacto/contacto.component.ts", lineNumber: 12 });
})();
export {
  ContactoComponent
};
//# sourceMappingURL=chunk-QNTL4HCO.js.map
