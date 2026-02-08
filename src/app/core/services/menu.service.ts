import { Injectable, signal } from "@angular/core";
import { MenuItem } from "../models/menu.model";

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
                { label: "Index", icon: "list", route: "/angular" },
                { label: "Lifecycle", icon: "autorenew", route: "/angular/lifecycle" },
                { label: "Components", icon: "widgets", route: "/angular/components" },
                { label: "Templates", icon: "view_compact", route: "/angular/templates" },
                { label: "Change Detection", icon: "change_history", route: "/angular/change-detection" },
                { label: "Services", icon: "build_circle", route: "/angular/services" },
                { label: "Dependency Injection", icon: "build", route: "/angular/di" },
                { label: "Observables", icon: "visibility", route: "/angular/observables" },
                { label: "Signals", icon: "signal_cellular_alt", route: "/angular/signals" },
                { label: "Directives", icon: "view_week", route: "/angular/directives" },
                { label: "Pipes", icon: "filter_alt", route: "/angular/pipes" },
                { label: "Routing", icon: "swap_horiz", route: "/angular/routing" },
                { label: "Forms", icon: "edit", route: "/angular/forms" },
                { label: "RxJS", icon: "sync_alt", route: "/angular/rxjs" },
                { label: "State Management", icon: "storage", route: "/angular/state-management" },
                { label: "Performance", icon: "speed", route: "/angular/performance" },
                { label: "Interceptors", icon: "settings_input_component", route: "/angular/interceptors" },
                { label: "HttpClient", icon: "cloud", route: "/angular/http" },
                { label: "Internationalization", icon: "language", route: "/angular/i18n" },
                { label: "Zoneless", icon: "sync", route: "/angular/zoneless" },
                { label: "Testing", icon: "bug_report", route: "/angular/testing" },
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
        }
    ]);

    menuItems = this.menuStructure.asReadonly(); // Exponer menu como un signal de solo lectura

    constructor() {}
}