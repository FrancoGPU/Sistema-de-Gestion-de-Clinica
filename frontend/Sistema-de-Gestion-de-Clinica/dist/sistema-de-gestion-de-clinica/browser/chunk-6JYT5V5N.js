import {
  Router
} from "./chunk-DMXX7ROZ.js";
import {
  BehaviorSubject,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-AR7JWTXA.js";

// src/app/services/auth.service.ts
var AuthService = class _AuthService {
  router;
  currentUserSubject;
  currentUser;
  // Usuarios de ejemplo (simulación)
  DEMO_USERS = [
    {
      email: "administrador@administrador.com",
      password: "admin123",
      role: "administrador",
      nombre: "Administrador Sistema"
    },
    {
      email: "paciente@paciente.com",
      password: "paciente123",
      role: "paciente",
      nombre: "Juan P\xE9rez"
    }
  ];
  constructor(router) {
    this.router = router;
    const storedUser = localStorage.getItem("currentUser");
    this.currentUserSubject = new BehaviorSubject(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  /**
   * Obtener el valor actual del usuario
   */
  get currentUserValue() {
    return this.currentUserSubject.value;
  }
  /**
   * Iniciar sesión
   */
  login(email, password) {
    const user = this.DEMO_USERS.find((u) => u.email === email && u.password === password);
    if (user) {
      const userData = {
        email: user.email,
        role: user.role,
        nombre: user.nombre
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));
      this.currentUserSubject.next(userData);
      this.redirectByRole(user.role);
      return { success: true, user: userData };
    }
    return { success: false, message: "Email o contrase\xF1a incorrectos" };
  }
  /**
   * Cerrar sesión
   */
  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
  }
  /**
   * Verificar si está autenticado
   */
  isAuthenticated() {
    return this.currentUserValue !== null;
  }
  /**
   * Obtener el rol del usuario actual
   */
  getUserRole() {
    return this.currentUserValue?.role || null;
  }
  /**
   * Obtener el nombre del usuario actual
   */
  getUserName() {
    return this.currentUserValue?.nombre || "";
  }
  /**
   * Verificar si el usuario es administrador
   */
  isAdmin() {
    return this.getUserRole() === "administrador";
  }
  /**
   * Verificar si el usuario es paciente
   */
  isPaciente() {
    return this.getUserRole() === "paciente";
  }
  /**
   * Redirigir según el rol del usuario
   */
  redirectByRole(role) {
    if (role === "administrador") {
      this.router.navigate(["/admin/index"]);
    } else if (role === "paciente") {
      this.router.navigate(["/MediCore"]);
    }
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: Router }], null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-6JYT5V5N.js.map
