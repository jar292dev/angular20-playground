export interface MenuItem {
    label: string;
    icon: string;
    route?: string; // Opcional si es un menú desplegable
    external?: boolean; // Para enlaces externos
    expanded?: boolean; // Para controlar el estado del menú desplegable
    children?: MenuItem[]; // Para submenús
}