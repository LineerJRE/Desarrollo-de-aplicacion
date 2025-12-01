const Admin = require('../models/Admin');

// Verificar Admin
exports.verificarExistenciaAdmin = async (req, res) => {
  const existe = await Admin.exists({});
  res.send({ existe });
};

//crear nuevo Admin
exports.registrarAdmin = async (req, res) => {
  const { nombreCompleto, identificacion, usuario, contraseña } = req.body;

  if (!nombreCompleto || !identificacion || !usuario || !contraseña) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const yaExiste = await Admin.findOne({ usuario });
  if (yaExiste) {
    return res.status(400).json({ message: 'El usuario ya está registrado' });
  }

  const nuevoAdmin = new Admin({ nombreCompleto, identificacion, usuario, contraseña });
  await nuevoAdmin.save();

  res.json({ message: 'Administrador registrado con éxito' });
};

//Login Admin
exports.loginAdmin = async (req, res) => {
  const { usuario, contraseña } = req.body;
  const admin = await Admin.findOne({ usuario });
  if (!admin || !(await admin.validarContraseña(contraseña))) {
    return res.status(401).send({ message: 'Credenciales inválidas' });
  }

  res.send({ message: 'Login exitoso', adminId: admin._id });
};

// Obtener todos los admin
exports.obtenerAdmin = async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json(admin);
  } catch (error) {
    console.error('Error al obtener administrador:', error);
    res.status(500).json({ message: 'Error al obtener administrador' });
  }
};

// Actualizar datos del admin (sin contraseña)
exports.actualizarDatosAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const adminActualizado = await Admin.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (!adminActualizado) {
      return res.status(404).json({ mensaje: 'Administrador no encontrado' });
    }

    res.json(adminActualizado);
  } catch (error) {
    console.error('Error al actualizar Administrador:', error);
    res.status(500).json({ mensaje: 'Error al actualizar administrador' });
  }
};

// Cambiar contraseña del admin
exports.cambiarClaveAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { contraseña } = req.body;

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ mensaje: 'Administrador no encontrado' });
    }

    admin.contraseña = contraseña;
    await admin.save();

    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al cambiar contraseña del administrador:', error);
    res.status(500).json({ mensaje: 'Error al cambiar contraseña del administrador' });
  }
};

//Eliminar Admin
exports.eliminarAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ mensaje: 'Administrador no encontrado' });
    }

    await Admin.findByIdAndDelete(id);
    res.json({ mensaje: 'Administrador eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar administrador:', error);
    res.status(500).json({ mensaje: 'Error al eliminar administrador' });
  }
};