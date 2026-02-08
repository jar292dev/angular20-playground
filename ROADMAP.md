# 🗺️ Angular 2026: Mi Ruta de Maestría

Este roadmap traza el camino desde los fundamentos hasta la arquitectura avanzada en el ecosistema Angular moderno.

---

## 🛤️ Fase 1: El Despegue (Foundations)
> **Objetivo:** Dominar la nueva sintaxis y la estructura profesional.

- [ ] **Setup Pro:** Configuración de VS Code, ESLint, Prettier y Git Multicuenta.
- [ ] **Standalone Era:** Eliminar los `NgModules` y entender los `Standalone Components`.
- [ ] **Control Flow:** Dominar `@if`, `@for` y `@switch` (adiós `*ngIf`).
- [ ] **Estructura de Carpetas:** Implementar el patrón `core/`, `shared/`, `features/`.

---

## 🛰️ Fase 2: Reactividad de Nueva Generación (Signals)
> **Objetivo:** Abandonar gradualmente el uso excesivo de RxJS para el estado local.

- [ ] **Signals Core:** `signal`, `computed` y `effect`.
- [ ] **Signal Inputs:** Usar `input()` y `model()` para comunicación entre componentes.
- [ ] **RxJS Interop:** Aprender `toSignal()` y `toObservable()` para conectar ambos mundos.
- [ ] **Optimización:** Reducir los ciclos de *Change Detection* usando Signals.

---

## 🛠️ Fase 3: La Caja de Herramientas (Ecosystem)
> **Objetivo:** Integrar librerías que potencien el desarrollo.

- [ ] **Validación de Datos:** Implementar **Zod** o **Valibot** para contratos de API.
- [ ] **Formly:** Generación de formularios dinámicos a partir de configuraciones.
- [ ] **HTTP Interceptors:** Gestión global de tokens de auth y errores.
- [ ] **Estilos:** Integrar **Tailwind CSS** o **Shadcn/ng**.

---

## 🧪 Fase 4: Blindaje de Código (Testing & QA)
> **Objetivo:** Cero bugs en producción.

- [ ] **Unit Testing:** Pruebas de lógica con **Testing Library**.
- [ ] **Mocking:** Aprender a usar `Mocks` para servicios HTTP.
- [ ] **E2E:** Crear el primer flujo de navegación con **Cypress** o **Playwright**.
- [ ] **Linter:** Reglas estrictas de ESLint para mantener el código limpio.

---

## 🏆 Fase 5: Maestría y Arquitectura (Advanced)
> **Objetivo:** Crear aplicaciones escalables a nivel empresarial.

- [ ] **State Management:** Implementar **NgRx Signal Store** (el estándar ligero).
- [ ] **Performance:** Implementar `Deferrable Views` (`@defer`) para carga perezosa de componentes.
- [ ] **Monorepo:** Explorar **Nx** para manejar múltiples apps en un solo repo.
- [ ] **CI/CD:** Automatizar el despliegue con GitHub Actions.
