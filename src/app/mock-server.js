const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// =============================================================================
// Mensajes de error personalizados
// =============================================================================
const errorMessages = {
  200: { message: 'Operación exitosa', data: { id: 1, name: 'Usuario Test', email: 'test@example.com' } },
  400: { error: 'Bad Request', message: 'Los datos enviados son inválidos', details: 'Faltan campos requeridos' },
  401: { error: 'Unauthorized', message: 'No autorizado', details: 'Token de autenticación inválido o expirado' },
  403: { error: 'Forbidden', message: 'Acceso prohibido', details: 'No tienes permisos para acceder a este recurso' },
  404: { error: 'Not Found', message: 'Recurso no encontrado', details: 'El recurso solicitado no existe en el servidor' },
  422: { error: 'Unprocessable Entity', message: 'Error de validación', details: { email: ['El email ya está en uso'], password: ['La contraseña debe tener al menos 8 caracteres'] } },
  500: { error: 'Internal Server Error', message: 'Error interno del servidor', details: 'Ocurrió un error inesperado. Por favor, contacta al administrador' },
  503: { error: 'Service Unavailable', message: 'Servicio no disponible', details: 'El servidor está temporalmente fuera de servicio' }
};

// =============================================================================
// Endpoint genérico para cualquier código de error
// =============================================================================
app.get('/api/error/:code', (req, res) => {
  const code = parseInt(req.params.code);
  const response = errorMessages[code] || { 
    error: 'Unknown Error', 
    message: `Error ${code}`,
    code: code 
  };
  
  console.log(`📤 Enviando respuesta ${code}`);
  res.status(code).json({
    ...response,
    timestamp: new Date().toISOString()
  });
});

// =============================================================================
// Endpoints específicos por tipo de error
// =============================================================================

// 200 - Success
app.get('/api/success', (req, res) => {
  console.log('✅ 200 - Success');
  res.status(200).json({
    message: 'Operación completada exitosamente',
    data: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date().toISOString()
    }
  });
});

// 400 - Bad Request
app.post('/api/validate', (req, res) => {
  console.log('❌ 400 - Bad Request');
  res.status(400).json({
    error: 'Validation Error',
    message: 'Los datos enviados no son válidos',
    fields: {
      name: 'El nombre es requerido',
      email: 'El formato del email es incorrecto'
    }
  });
});

// 401 - Unauthorized
app.get('/api/protected', (req, res) => {
  console.log('🔒 401 - Unauthorized');
  res.status(401).json({
    error: 'Unauthorized',
    message: 'Credenciales inválidas',
    details: 'El token de autenticación no es válido o ha expirado'
  });
});

// 403 - Forbidden
app.get('/api/admin', (req, res) => {
  console.log('🚫 403 - Forbidden');
  res.status(403).json({
    error: 'Forbidden',
    message: 'Acceso denegado',
    details: 'No tienes permisos suficientes para acceder a este recurso'
  });
});

// 404 - Not Found
app.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  if (id === '999') {
    console.log('🔍 404 - Not Found');
    res.status(404).json({
      error: 'Not Found',
      message: `Usuario con ID ${id} no encontrado`,
      details: 'El recurso solicitado no existe'
    });
  } else {
    res.status(200).json({
      id: id,
      name: 'Usuario Encontrado',
      email: `user${id}@example.com`
    });
  }
});

// 422 - Unprocessable Entity (errores de validación)
app.post('/api/register', (req, res) => {
  console.log('⚠️  422 - Unprocessable Entity');
  res.status(422).json({
    error: 'Validation Failed',
    message: 'Los datos no cumplen con las reglas de validación',
    errors: {
      email: ['El email ya está registrado en el sistema'],
      password: [
        'La contraseña debe tener al menos 8 caracteres',
        'La contraseña debe contener al menos una mayúscula',
        'La contraseña debe contener al menos un número'
      ],
      phone: ['El formato del teléfono es inválido']
    }
  });
});

// 500 - Internal Server Error
app.get('/api/crash', (req, res) => {
  console.log('💥 500 - Internal Server Error');
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Error inesperado en el servidor',
    details: 'Se ha producido un error al procesar la solicitud',
    errorId: `ERR-${Date.now()}`
  });
});

// 503 - Service Unavailable
app.get('/api/maintenance', (req, res) => {
  console.log('🔧 503 - Service Unavailable');
  res.status(503).json({
    error: 'Service Unavailable',
    message: 'Servicio temporalmente no disponible',
    details: 'El servidor está en mantenimiento. Intenta nuevamente en unos minutos',
    retryAfter: 300 // segundos
  });
});

// =============================================================================
// Endpoints con delays (timeout)
// =============================================================================

// Delay de 3 segundos
app.get('/api/slow', (req, res) => {
  console.log('⏱️  Iniciando respuesta lenta (3s)...');
  setTimeout(() => {
    console.log('✅ Respuesta lenta completada');
    res.json({
      message: 'Respuesta después de 3 segundos',
      data: { delayed: true, seconds: 3 }
    });
  }, 3000);
});

// Delay de 10 segundos
app.get('/api/very-slow', (req, res) => {
  console.log('⏱️  Iniciando respuesta muy lenta (10s)...');
  setTimeout(() => {
    console.log('✅ Respuesta muy lenta completada');
    res.json({
      message: 'Respuesta después de 10 segundos',
      data: { delayed: true, seconds: 10 }
    });
  }, 10000);
});

// Delay configurable vía query param
app.get('/api/delay', (req, res) => {
  const seconds = parseInt(req.query.seconds) || 5;
  console.log(`⏱️  Delay de ${seconds} segundos...`);
  setTimeout(() => {
    console.log(`✅ Delay de ${seconds}s completado`);
    res.json({
      message: `Respuesta después de ${seconds} segundos`,
      data: { delayed: true, seconds }
    });
  }, seconds * 1000);
});

// =============================================================================
// Simular error de conexión (cierra la conexión abruptamente)
// =============================================================================
app.get('/api/connection-error', (req, res) => {
  console.log('💔 Simulando error de conexión (cerrando socket)...');
  // Destruye la conexión sin enviar respuesta
  req.socket.destroy();
});

// Simular timeout del servidor (no responde nunca)
app.get('/api/timeout', (req, res) => {
  console.log('⏰ Simulando timeout (nunca responde)...');
  // No hace nada, deja la petición colgada
  // El cliente debería configurar un timeout
});

// =============================================================================
// Endpoints combinados (múltiples escenarios en uno)
// =============================================================================
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    console.log('❌ 400 - Login: campos faltantes');
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Email y contraseña son requeridos'
    });
  }
  
  if (email === 'blocked@example.com') {
    console.log('🚫 403 - Login: usuario bloqueado');
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Tu cuenta ha sido bloqueada'
    });
  }
  
  if (password === 'wrong') {
    console.log('🔒 401 - Login: credenciales incorrectas');
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Email o contraseña incorrectos'
    });
  }
  
  console.log('✅ 200 - Login exitoso');
  res.status(200).json({
    message: 'Login exitoso',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    user: {
      id: 1,
      email: email,
      name: 'Usuario Test'
    }
  });
});

// =============================================================================
// Endpoint de información (lista todos los endpoints disponibles)
// =============================================================================
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Mock API Server está funcionando',
    endpoints: {
      'Códigos de estado genéricos': [
        'GET /api/error/200 - Success',
        'GET /api/error/400 - Bad Request',
        'GET /api/error/401 - Unauthorized',
        'GET /api/error/403 - Forbidden',
        'GET /api/error/404 - Not Found',
        'GET /api/error/422 - Unprocessable Entity',
        'GET /api/error/500 - Internal Server Error',
        'GET /api/error/503 - Service Unavailable'
      ],
      'Endpoints específicos': [
        'GET /api/success - Respuesta exitosa',
        'POST /api/validate - Error 400 de validación',
        'GET /api/protected - Error 401 (no autorizado)',
        'GET /api/admin - Error 403 (prohibido)',
        'GET /api/users/999 - Error 404 (no encontrado)',
        'POST /api/register - Error 422 (validación)',
        'GET /api/crash - Error 500 (servidor)',
        'GET /api/maintenance - Error 503 (mantenimiento)'
      ],
      'Delays y timeouts': [
        'GET /api/slow - Delay de 3 segundos',
        'GET /api/very-slow - Delay de 10 segundos',
        'GET /api/delay?seconds=N - Delay configurable',
        'GET /api/timeout - Nunca responde (timeout)'
      ],
      'Errores de conexión': [
        'GET /api/connection-error - Cierra la conexión abruptamente'
      ],
      'Escenarios combinados': [
        'POST /api/login - Login con múltiples casos (envía {email, password})'
      ]
    },
    examples: {
      'Login exitoso': 'POST /api/login con {"email":"test@test.com","password":"valid"}',
      'Login bloqueado': 'POST /api/login con {"email":"blocked@example.com","password":"any"}',
      'Login inválido': 'POST /api/login con {"email":"test@test.com","password":"wrong"}',
      'Delay 5s': 'GET /api/delay?seconds=5'
    }
  });
});

// =============================================================================
// Servidor
// =============================================================================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║   ✅ Mock API Server corriendo en http://localhost:${PORT}     ║
║                                                                ║
║   📚 Documentación: http://localhost:${PORT}/                  ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝

Endpoints disponibles:

📍 Códigos HTTP:
   GET  http://localhost:${PORT}/api/error/200   → Success
   GET  http://localhost:${PORT}/api/error/400   → Bad Request
   GET  http://localhost:${PORT}/api/error/401   → Unauthorized
   GET  http://localhost:${PORT}/api/error/403   → Forbidden
   GET  http://localhost:${PORT}/api/error/404   → Not Found
   GET  http://localhost:${PORT}/api/error/422   → Unprocessable Entity
   GET  http://localhost:${PORT}/api/error/500   → Internal Server Error
   GET  http://localhost:${PORT}/api/error/503   → Service Unavailable

⏱️  Delays:
   GET  http://localhost:${PORT}/api/slow        → 3s delay
   GET  http://localhost:${PORT}/api/very-slow   → 10s delay
   GET  http://localhost:${PORT}/api/delay?seconds=5 → Custom delay
   GET  http://localhost:${PORT}/api/timeout     → Never responds

💔 Errores de conexión:
   GET  http://localhost:${PORT}/api/connection-error → Socket destroyed

🔐 Login (POST con body JSON):
   POST http://localhost:${PORT}/api/login
   Body: {"email":"test@test.com","password":"valid"}
  `);
});