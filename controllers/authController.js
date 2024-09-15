const bcrypt = require('./../node_modules/bcryptjs');
const jwt = require('./../node_modules/jsonwebtoken');
const { User, Role } = require('../models');

// Registro
exports.register = async (req, res) => {
  const { name, email, password, roleId } = req.body;

  try {
    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email ya registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId
    });

    return res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario
    const user = await User.findOne({ where: { email }, include: ['role'] });
    if (!user) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }
    

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    // Crear el token JWT
    const token = jwt.sign({ id: user.id, role: user.role.name }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.json({ token, user: { id: user.id, name: user.name, role: user.role.name } });
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor', error });
  }
};
