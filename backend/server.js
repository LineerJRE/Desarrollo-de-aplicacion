const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

// Rutas
const adminRoutes = require('./routes/adminRoutes');
const recepcionistaRoutes = require('./routes/recepcionistaRoutes');
const medicoRoutes = require('./routes/medicoRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const examenRoutes = require("./routes/examenRoutes");
const profesionRoutes = require("./routes/profesionRoutes");

// Configuración de Express
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// CORS para peticiones HTTP
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware para recibir datos en formato JSON
app.use(express.json());

// Inyección de Socket.IO en los controladores
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Rutas API
app.use('/api/admin', adminRoutes);
app.use('/api/recepcionistas', recepcionistaRoutes);
app.use('/api/medicos', medicoRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/examen',examenRoutes);
app.use('/api/profesion',profesionRoutes)

// WebSocket: eventos
io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado:', socket.id);

  socket.on('pacienteLlamado', (data) => {
    io.emit('nuevoLlamado', data);  // Emitir a todas las pantallas de llamados
  });

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado:', socket.id);
  });
});

// Middleware de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/turnos',)
.then(() => {
  console.log('✅ Conectado a MongoDB');
  
// Iniciar servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
})
.catch((error) => {
console.error('❌ Error al conectar a MongoDB:', error);
});