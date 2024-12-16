const express = require('express');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
app.use(express.json());

// Middleware para manejar CORS
app.use(bodyParser.json());
app.use(cors({
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Prueba de conexión a la base de datos
const db = require('./config'); 
db.getConnection()
    .then(() => {
        console.log('VAMO CHILE CONECTO');
    })
    .catch(err => {
        console.error('CREO QUE EL PROBLEMA ES EL HASWER:', err);
    });

// Inicio del servidor
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

// Leer la URL de la API desde el archivo .env
const API_URL = process.env.apiUrl;
console.log('La URL de la API es:', API_URL);


// Ruta para obtener un usuario por email
app.get('/api/auth/user', async (req, res) => {
    const email = req.query.email;
  
    if (!email) {
      return res.status(400).send({ error: 'El parámetro email es obligatorio' });
    }
  
    try {
      // Supongamos que tienes un modelo `User` para interactuar con tu base de datos
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
      }
  
      // Devuelve el nombre del usuario
      res.send({ name: user.nombre });
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      res.status(500).send({ error: 'Error interno del servidor' });
    }
  });