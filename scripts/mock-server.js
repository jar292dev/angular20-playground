const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const SECRET_JWT_KEY = 'mysecretkey12345'; // Clave secreta para firmar los JWT (en un entorno real, usar una variable de entorno)

app.use(cors(
  {
    origin: 'http://localhost:4200', // Cambia esto al origen de tu frontend
    credentials: true // Permite enviar cookies en las solicitudes CORS
  }
));
app.use(cookieParser());
app.use(express.json());

// Middleware para manejar la sesión y verificar el token JWT
app.use((req, res, next) => {
    console.log(`🛠️ Middleware: ${req.method} ${req.url}`);
    console.log('📥 Cookies recibidas:', req.cookies);
    const token = req.cookies.access_token; // Obtiene el token de la cookie

    req.session = { user: null }; // Inicializa la sesión con user en null

    if (!token) {
        console.log('⚠️ Middleware: No se encontró token en las cookies');
    }

    try {
        const data = jwt.verify(token, SECRET_JWT_KEY); // Verifica el token con la clave secreta
        req.session.user = data.user; // Si el token es válido, asigna el usuario a la sesión
        console.log(`✅ Middleware: Token válido, usuario: ${JSON.stringify(data.user)}`);
    } catch (error) {
        console.log(`❌ Middleware: Error al verificar el token: ${error.message}`);
    }
    next(); // Llama a next() para pasar al siguiente middleware o ruta
})

// =============================================================================
// Definir array de objetos de usuarios para simular una base de datos
// =============================================================================
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'valid', roles: ['user'], status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'valid', roles: ['user'], status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', password: 'valid', roles: ['user', 'editor'], status: 'active' },
  { id: 4, name: 'Admin User', email: 'admin@example.com', password: 'admin', roles: ['user', 'editor', 'admin'], status: 'active' },
  { id: 5, name: 'Blocked User', email: 'blocked@example.com', password: 'valid', roles: ['user'], status: 'blocked' },
  { id: 6, name: 'Inactive User', email: 'inactive@example.com', password: 'valid', roles: ['user'], status: 'inactive' },
];

// =============================================================================

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
  
  // Realizar login exitoso (en un entorno real, aquí se verificarían las credenciales contra una base de datos)
  try {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      console.log('🔒 401 - Login: credenciales incorrectas (usuario no encontrado)');
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Email o contraseña incorrectos'
      });
    }

    if (user.status === 'blocked' || user.status === 'inactive') {
      console.log('🚫 403 - Login: usuario bloqueado');
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Tu cuenta ha sido bloqueada'
      });
    }

    // Excluir password antes de meter en el token
    const { password: _, ...userWithoutPassword } = user;

    // Login exitoso, generar token JWT con la información del usuario
    const token = jwt.sign({ user: userWithoutPassword }, SECRET_JWT_KEY, { expiresIn: '1h' });

    console.log('✅ 200 - Login exitoso');
    res
      .cookie('access_token', token, { 
        httpOnly: true, 
        secure: false, 
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60, // 1 hora
      }) // En producción, secure debería ser true
      .status(200)
      .send({ user });

  } catch (error) {
    console.error(error.message, error.stack);
    res.status(401).send({ error: `Error logging in: ${error.message}` });
  }
})

// =============================================================================
// Endpoint listar usuarios (solo para usuarios autenticados)
// =============================================================================
app.get('/api/users', (req, res) => {
  if (!req.session.user) {
    console.log('🔒 401 - Listar usuarios: no autenticado');
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Debes iniciar sesión para acceder a esta información'
    });
  }

  console.log('✅ 200 - Listar usuarios: autenticado');
  res.status(200).json(users);
});

app.get('/api/users/:id', (req, res) => {
  if (!req.session.user) {
    console.log('🔒 401 - Detalle usuario: no autenticado');
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Debes iniciar sesión para acceder a esta información'
    });
  }

  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (!user) {
    console.log(`❌ 404 - Detalle usuario: usuario con ID ${userId} no encontrado`);
    return res.status(404).json({
      error: 'Not Found',
      message: 'Usuario no encontrado'
    });
  }

  console.log(`✅ 200 - Detalle usuario: usuario con ID ${userId} encontrado`);
  res.status(200).json(user);
});

app.get('/api/me', (req, res) => {
  console.log('📥 Solicitud recibida en /api/me');
  if (!req.session.user) {
    console.log('🔒 401 - /me: no autenticado');
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Debes iniciar sesión para acceder a esta información'
    });
  }

  console.log('✅ 200 - /me: autenticado');

  // Excluir password antes de meter en el token
  const { password: _, ...userWithoutPassword } = req.session.user;
  
  res.status(200).json(userWithoutPassword);
});


// CRUD completo de usuarios (solo para admins)
app.post('/api/users', (req, res) => {
  if (!req.session.user || !req.session.user.roles.includes('admin')) {
    console.log('🔒 403 - Crear usuario: no autorizado');
    return res.status(403).json({
      error: 'Forbidden',
      message: 'No tienes permisos para realizar esta acción'
    });
  }

  const { name, email, password, roles } = req.body;
  if (!name || !email || !password) {
    console.log('❌ 400 - Crear usuario: campos faltantes');
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Nombre, email y contraseña son requeridos'
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    roles: roles || ['user'],
    status: 'active'
  };
  users.push(newUser);

  console.log('✅ 201 - Crear usuario: exitoso');
  res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  if (!req.session.user || !req.session.user.roles.includes('admin')) {
    console.log('🔒 403 - Actualizar usuario: no autorizado')
    return res.status(403).json({
      error: 'Forbidden',
      message: 'No tienes permisos para realizar esta acción'
    });
  }

  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (!user) {
    console.log(`❌ 404 - Actualizar usuario: usuario con ID ${userId} no encontrado`);
    return res.status(404).json({
      error: 'Not Found',
      message: 'Usuario no encontrado'
    });
  }

  const { name, email, password, roles, status } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = password;
  if (roles) user.roles = roles;
  if (status) user.status = status;

  console.log(`✅ 200 - Actualizar usuario: usuario con ID ${userId} actualizado`);
  res.status(200).json(user);
});


app.delete('/api/users/:id', (req, res) => {
  if (!req.session.user || !req.session.user.roles.includes('admin')) {
    console.log('🔒 403 - Eliminar usuario: no autorizado');
    return res.status(403).json({
      error: 'Forbidden',
      message: 'No tienes permisos para realizar esta acción'
    });
  }

  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    console.log(`❌ 404 - Eliminar usuario: usuario con ID ${userId} no encontrado`);
    return res.status(404).json({
      error: 'Not Found',
      message: 'Usuario no encontrado'
    });
  }

  users.splice(userIndex, 1);
  console.log(`✅ 200 - Eliminar usuario: usuario con ID ${userId} eliminado`);
  res.status(200).json({ message: 'Usuario eliminado correctamente' });
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

app.get('/api/cities', (req, res) => {
  const term = req.query.term || '';
  const onlyCapitals = req.query.onlyCapitals === 'true';
  const limit = parseInt(req.query.limit, 10) || 10;
  console.log(`🔍 Buscando ciudades con término: "${term}", limit: ${limit}`);
  // Ciudades de España y booleano de si es capital de comunidad autónoma para el ejemplo
  const cities = [
    { id: 1, name: 'Madrid', capital: true },
    { id: 2, name: 'Barcelona', capital: false },
    { id: 3, name: 'Valencia', capital: false },
    { id: 4, name: 'Sevilla', capital: true },
    { id: 5, name: 'Zaragoza', capital: true },
    { id: 6, name: 'Málaga', capital: false },
    { id: 7, name: 'Murcia', capital: false },
    { id: 8, name: 'Palma de Mallorca', capital: true },
    { id: 9, name: 'Las Palmas de Gran Canaria', capital: true },
    { id: 10, name: 'Bilbao', capital: true },
    { id: 11, name: 'Santander', capital: true },
    { id: 12, name: 'Valladolid', capital: false },
    { id: 13, name: 'Vitoria-Gasteiz', capital: false },
    { id: 14, name: 'Oviedo', capital: true },
    { id: 15, name: 'Gijón', capital: false },
    { id: 16, name: 'A Coruña', capital: true },
    { id: 17, name: 'Granada', capital: false },
    { id: 18, name: 'Tenerife', capital: false },
    { id: 19, name: 'Córdoba', capital: false },
    { id: 20, name: 'Almería', capital: false },
    { id: 21, name: 'Cádiz', capital: false },
    { id: 22, name: 'Huelva', capital: false },
    { id: 23, name: 'Logroño', capital: false },
    { id: 24, name: 'Badajoz', capital: false },
    { id: 25, name: 'Salamanca', capital: false },
  ];
  //const filtered = cities.filter(city => city.name.toLowerCase().includes(term.toLowerCase()));
  //const filtered = cities.filter(city => city.name.toLowerCase().includes(term.toLowerCase())).slice(0, limit);
  let filtered = cities.filter(city => city.name.toLowerCase().includes(term.toLowerCase()));
  if (onlyCapitals) {
    filtered = filtered.filter(city => city.capital);
  }
  filtered = filtered.slice(0, limit);
  res.json(filtered);
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