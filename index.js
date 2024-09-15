const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.json());

// const reservasRoutes = require('./routes/reservas');
// app.use('/api', reservasRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
