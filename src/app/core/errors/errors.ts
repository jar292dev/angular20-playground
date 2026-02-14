// Error base para tu aplicación
export class AppError extends Error {
  constructor(public override message: string, public code?: string) {
    super(message);
    this.name = 'AppError';
  }
}

// Error de negocio
export class BusinessError extends AppError {
  constructor() {
    super('Error de negocio: Operación no permitida por reglas de negocio.', 'BUSINESS_ERROR');
    this.name = 'BusinessError';
  }
}

// Error de recurso no encontrado
export class NotFoundError extends AppError {
  constructor(id?: string) {
    super(`Recurso no encontrado. ID: ${id}`, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}


// Error de concurrencia (Auditoría)
export class VersionConflictError extends AppError {
  constructor() {
    super('Los datos han sido modificados por otro usuario.', 'VERSION_CONFLICT');
    this.name = 'VersionConflictError';
  }
}

// Error de autenticación
export class AuthenticationError extends AppError {
  constructor() {
    super('No estás autenticado. Por favor, inicia sesión.', 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

// Error de autorización
export class AuthorizationError extends AppError {
  constructor() {
    super('No tienes permisos para realizar esta acción.', 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

// Error de validación
export class ValidationError extends AppError {
  constructor(public validationErrors: { field: string; message: string }[]) {
    super('Error de validación en los datos proporcionados.', 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

// Error de base de datos
export class DatabaseError extends AppError {
  constructor() {
    super('Error de conexión a la base de datos.', 'DATABASE_ERROR');
    this.name = 'DatabaseError';
  }
}

// Error de sistema
export class SystemError extends AppError {
  constructor() {
    super('Ha ocurrido un error inesperado en el sistema.', 'SYSTEM_ERROR');
    this.name = 'SystemError';
  }
}

// Error de timeout
export class TimeoutError extends AppError {
  constructor() {
    super('La solicitud ha excedido el tiempo de espera.', 'TIMEOUT_ERROR');
    this.name = 'TimeoutError';
  }
}

