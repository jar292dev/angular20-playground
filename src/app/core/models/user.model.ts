export interface User {
    id: string;
    username: string;
    email: string;
    roles: string[];
    token: string; // Agrega el token JWT al modelo de usuario
}
