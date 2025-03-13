const express = require('express');
const mongoose = require('mongoose');
const Usuario = require('./models/Usuario');
const Producto = require('./models/Producto');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware global para contar operaciones
let operationCount = 0;
app.use((req, res, next) => {
  operationCount++;
  next();
});

// Rutas existentes (usuarios, productos, etc.)
app.use('/usuarios', require('./routes/usuarios'));
app.use('/productos', require('./routes/productos'));

// Endpoint para contar documentos en Usuarios y Productos
app.get('/contadores', async (req, res) => {
  try {
    const countUsuarios = await Usuario.countDocuments();
    const countProductos = await Producto.countDocuments();
    res.json({
      usuarios: countUsuarios,
      productos: countProductos,
      total: countUsuarios + countProductos
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para ver el contador de operaciones
app.get('/operaciones', (req, res) => {
  res.json({ operaciones: operationCount });
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor Node.js con Express, CRUD y contadores funcionando');
});

// Conexión a MongoDB
const mongoURI = 'mongodb://localhost:27017/mi_basedatos';
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB correctamente'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
