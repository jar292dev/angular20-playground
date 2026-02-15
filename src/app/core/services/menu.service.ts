import { Injectable, signal } from "@angular/core";
import { MenuItem } from "../models/menu.model";

/**
 * Servicio para gestionar la estructura del menú de navegación.
 * Define la estructura del menú y proporciona un signal de solo lectura para que los componentes puedan suscribirse a los cambios.
 */

@Injectable({
  providedIn: 'root'
})
export class MenuService {

    //Definir la estructura del menú
    private menuStructure = signal<MenuItem[]>([
        {
            label: "Home",
            icon: "home",
            route: "/"
        },
        {
            label: "Angular",
            icon: "javascript",
            expanded: false,
            children: [
                { label: "Overview", icon: "list", route: "/angular" },

                {
                label: "Project Setup",
                icon: "settings_suggest",
                expanded: false,
                children: [
                    { label: "CLI & Installation", icon: "download", route: "/angular/setup/install" },
                    { label: "Project Structure", icon: "folder_shared", route: "/angular/setup/structure" },
                    { label: "Application Config", icon: "tune", route: "/angular/setup/config" }, // provideRouter, provideHttpClient, etc.
                    { label: "Environment Setup", icon: "vignette", route: "/angular/setup/environments" },
                ]
                },
                
                // GRUPO 1: FUNDAMENTOS (TS/JS)
                {
                    label: "Language Basics",
                    icon: "terminal",
                    expanded: false,
                    children: [
                        { label: "Typescript & JS", icon: "code", route: "/angular/language" },
                        { label: "Data Types & Structs", icon: "storage", route: "/angular/data-structures" },
                        { label: "Variables & Functions", icon: "functions", route: "/angular/logic" },
                        { label: "Models & Interfaces", icon: "schema", route: "/angular/models" },
                        { label: "Classes & Decorators", icon: "class", route: "/angular/oop" },
                    ]
                },

                // GRUPO 2: CORE COMPONENTS
                {
                    label: "Architecture",
                    icon: "account_tree",
                    expanded: false,
                    children: [
                        { label: "Components & Standalone", icon: "widgets", route: "/angular/components" },
                        { label: "Templates & View", icon: "html", route: "/angular/templates" },
                        { label: "Modules (Legacy/Bridge)", icon: "view_module", route: "/angular/modules" },
                        { label: "Lifecycle", icon: "autorenew", route: "/angular/lifecycle" },
                        { label: "Modern Control Flow", icon: "alt_route", route: "/angular/control-flow" }, // Nuevo en v17+
                        { label: "Directives & Pipes", icon: "view_week", route: "/angular/directives-pipes" },
                        { label: "Deferrable Views", icon: "slow_motion_video", route: "/angular/defer", children: [] }, // Nuevo en v17+
                    ]
                },

                // GRUPO 3: REACTIVITY & STATE
                {
                    label: "Reactivity",
                    icon: "bolt",
                    expanded: false,
                    children: [
                        { label: "Signals", icon: "signal_cellular_alt", route: "/angular/signals" },
                        { label: "RxJS & Observables", icon: "visibility", route: "/angular/rxjs" },
                        { label: "Change Detection", icon: "change_history", route: "/angular/change-detection" },
                        { label: "State Management", icon: "inventory_2", route: "/angular/state-management" },
                    ]
                },

                // GRUPO 4: DATA & SERVICES
                {
                    label: "Data & Networking",
                    icon: "cloud_sync",
                    expanded: false,
                    children: [
                        { label: "Services & DI", icon: "build", route: "/angular/di" },
                        { label: "HttpClient", icon: "http", route: "/angular/http" },
                        { label: "Interceptors", icon: "settings_input_component", route: "/angular/interceptors" },
                        { label: "Forms", icon: "edit_note", route: "/angular/forms" },
                    ]
                },

                // GRUPO 5: INFRASTRUCTURE
                {
                    label: "Infrastructure",
                    icon: "settings",
                    expanded: false,
                    children: [
                        { label: "Routing", icon: "map", route: "/angular/routing" },
                        { label: "Performance", icon: "speed", route: "/angular/performance" },
                        { label: "Zoneless", icon: "blur_off", route: "/angular/zoneless" },
                        { label: "I18n", icon: "translate", route: "/angular/i18n" },
                        { label: "Testing", icon: "biotech", route: "/angular/testing" },
                    ]
                },

                // GRUPO 6: BEST PRACTICES & SECURITY
                {
                label: "Security",
                icon: "security",
                expanded: false,
                children: [
                    { label: "Auth Guards (Functional)", icon: "admin_panel_settings", route: "/security/guards" },
                    { label: "JWT & Interceptors", icon: "key", route: "/security/jwt" },
                    { label: "XSS & Sanitization", icon: "cleaning_services", route: "/security/sanitization" },
                    { label: "CSRF Protection", icon: "shield", route: "/security/csrf" },
                    { label: "Content Security Policy", icon: "lock", route: "/security/csp" },
                ]
                }
            ]
        },
        {
            label: "Estilos",
            icon: "css",
            expanded: false,
            children: [
                { label: "Estilos Globales", icon: "style", route: "/styles/global" },
                { label: "Scss", icon: "style", route: "/styles/scss" },
                { label: "Css", icon: "style", route: "/styles/css" },
            ]
        },
        {
            label: "Modulos y Librerías",
            icon: "widgets",
            expanded: false,
            children: [
                { label: "Ng Bootstrap", icon: "window", route: "/ng-bootstrap" },
                { label: "Formly", icon: "table_rows", route: "/formly" },
                { label: "Zod", icon: "diamond", route: "/zod" },
            ]
        },
        {
            label: "Testing",
            icon: "bug_report",
            expanded: false,
            children: [
                { label: "Jest", icon: "check_circle", route: "/testing/jest" },
            ]
        },
        {
            label: "Api",
            icon: "api",
            expanded: false,
        },
        {
            label: "Protegido",
            icon: "lock",
            expanded: false,
            route: "/protegido",
            children: [
                { label: "Acceso General", icon: "verified_user", route: "/protegido" },
                { label: "Página Admin", icon: "admin_panel_settings", route: "/protegido/pagina-admin" },
                { label: "Página Moderador", icon: "security", route: "/protegido/pagina-moderador" },
                { label: "Página Usuario", icon: "person", route: "/protegido/pagina-usuario" },
            ]
        },
        {
            label: "Experimental",
            icon: "science",
            expanded: false,
            route: "/experimental"
        }
    ]);

    menuItems = this.menuStructure.asReadonly(); // Exponer menu como un signal de solo lectura

    constructor() {}
}