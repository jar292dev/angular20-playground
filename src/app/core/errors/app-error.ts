/**
 * Clase base para todos los errores de la aplicación.
 * Permite manejar errores de forma consistente y tipada.
 */
export class AppError extends Error {
  constructor(
    public override message: string,
    public code: string,
    public status?: number,
    public details?: any,
    public serverMessage?: string,
  ) {
    super(message);
    this.name = 'AppError';
    
  }

  /**
   * Obtiene el mensaje a mostrar (prioriza servidor sobre default)
   */
  getDisplayMessage(): string {
    return this.serverMessage || this.message;
  }

  /**
   * Serializa el error para logs o envío al backend
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      serverMessage: this.serverMessage,
      displayMessage: this.getDisplayMessage(),
      code: this.code,
      status: this.status,
      details: this.details,
      stack: this.stack
    };
  }
}