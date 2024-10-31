const express = require('express');
const db = require('./models');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

db.sequelize.sync({ force: false }) // 'force: true' si quieres sobrescribir las tablas existentes
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });

app.use(express.json());

const indexRoutes = require('./routes/indexRouter');
app.use('/api', indexRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
