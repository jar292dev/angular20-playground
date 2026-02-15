import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';

/**
 * Servicio de autenticación para manejar el login, logout y gestión de tokens JWT.
 * Proporciona métodos para iniciar sesión, cerrar sesión, obtener el token almacenado y verificar la autenticación.
 * El token se almacena en localStorage bajo la clave 'access_token' y se decodifica para obtener información del usuario y sus roles.
 */

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser$ = new BehaviorSubject<User | null>(null);
  
  constructor(private http: HttpClient) {}

  /**
   * Inicia sesión con las credenciales proporcionadas. Si el login es exitoso, se carga la información del usuario y se actualiza el estado de autenticación.
   * @param credentials Credenciales del usuario (por ejemplo, nombre de usuario y contraseña).
   * @returns Observable que emite la información del usuario autenticado.
   */
  login(credentials: { username: string; password: string }) {
    // withCredentials: true permite enviar/recibir cookies
    return this.http.post('/api/auth/login', credentials, { 
      withCredentials: true 
    }).pipe(
      switchMap(() => this.loadUserInfo())
    );
  }

  /**
   * Cierra la sesión del usuario.
   * @returns Observable que emite cuando la sesión se ha cerrado correctamente.
   */
  logout() {
    return this.http.post('/api/auth/logout', {}, { 
      withCredentials: true 
    }).pipe(
      tap(() => this.currentUser$.next(null))
    );
  }

  /**
   * Obtiene el usuario actualmente autenticado.
   * @returns Observable que emite el usuario actual.
   */
  getCurrentUser() {
    return this.currentUser$.asObservable();
  }

  /**
   * Verifica si el usuario está autenticado.
   * @returns true si el usuario está autenticado, false en caso contrario.
   */
  isAuthenticated(): boolean {
    const user = this.currentUser$.value;
    if (!user) return false;

    if (!user.token) return false;

    if (this.isSessionExpired(user.token)) return false;

    return true;
  }

  /**
   * Retorna true si el usuario tiene al menos uno de los roles especificados.
   * @param roles 
   * @returns true si el usuario tiene alguno de los roles, false en caso contrario.
   */
  hasRole(roles: string[]): boolean {
    const user = this.currentUser$.value;
    return roles.some(role => user?.roles?.includes(role)) ?? false;
  }

  private loadUserInfo() {
    return this.http.get<User>('/api/me', { 
      withCredentials: true 
    }).pipe(
      tap(user => this.currentUser$.next(user))
    );
  }

  private isSessionExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return true; // Si no se puede decodificar, consideramos la sesión como expirada
    }
  }
}
