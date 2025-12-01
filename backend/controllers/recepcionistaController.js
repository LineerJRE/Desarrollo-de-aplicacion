const Recepcionista = require('../models/Recepcionista');

//Crear nuevo recepcionista
exports.crearRecepcionista = async (req, res) => {
  const { nombre, identificacion, usuario, contraseña, modulo } = req.body;

  if (!nombre || !identificacion || !usuario || !contraseña || !modulo) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const yaExiste = await Recepcionista.findOne({ usuario });
  if (yaExiste) {
    return res.status(400).json({ message: 'El usuario ya está registrado' });
  }

  const nuevo = new Recepcionista({
    nombre,
    identificacion,
    usuario,
    contraseña,
    modulo,
  });

  await nuevo.save();
  res.status(201).json({ message: 'Recepcionista creado correctamente' });
};

//Login recepcionista
exports.loginRecepcionista = async (req, res) => {
  const { usuario, contraseña } = req.body;
  const recepcionista = await Recepcionista.findOne({ usuario });
  if (!recepcionista || !(await recepcionista.validarContraseña(contraseña))) {
    return res.status(401).send({ message: 'Credenciales inválidas' });
  }

  res.send({ 
    message: 'Login exitoso',
    recepcionistaId: recepcionista._id,
    nombre: recepcionista.nombre,
    usuario: recepcionista.usuario,
    modulo: recepcionista.modulo 
  });
};

  // Obtener todos los recepcionistas
exports.obtenerRecepcionistas = async (req, res) => {
  try {
    const recepcionistas = await Recepcionista.find();
    res.json(recepcionistas);
  } catch (error) {
    console.error('Error al obtener recepcionistas:', error);
    res.status(500).json({ message: 'Error al obtener recepcionistas' });
  }
};

// Actualizar datos del recepcionista (sin contraseña)
exports.actualizarDatosRecepcionista = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, modulo } = req.body;

    const recepcionista = await Recepcionista.findById(id);
    if (!recepcionista) {
      return res.status(404).json({ mensaje: 'Recepcionista no encontrado' });
    }

    recepcionista.nombre = nombre;
    recepcionista.modulo = modulo;
    await recepcionista.save();

    res.json({ mensaje: 'Datos del recepcionista actualizados correctamente' });
  } catch (error) {
    console.error('Error al actualizar datos del recepcionista:', error);
    res.status(500).json({ mensaje: 'Error al actualizar datos del recepcionista' });
  }
};

// Cambiar contraseña del recepcionista
exports.cambiarClaveRecepcionista = async (req, res) => {
  try {
    const { id } = req.params;
    const { contraseña } = req.body;

    const recepcionista = await Recepcionista.findById(id);
    if (!recepcionista) {
      return res.status(404).json({ mensaje: 'Recepcionista no encontrado' });
    }

    recepcionista.contraseña = contraseña;
    await recepcionista.save();

    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al cambiar contraseña del recepcionista:', error);
    res.status(500).json({ mensaje: 'Error al cambiar contraseña del recepcionista' });
  }
};

//Eliminar recepcionista
exports.eliminarRecepcionista = async (req, res) => {
  try {
    const { id } = req.params;
    const recepcionista = await Recepcionista.findById(id);

    if (!recepcionista) {
      return res.status(404).json({ mensaje: 'Recepcionista no encontrado' });
    }

    await Recepcionista.findByIdAndDelete(id);
    res.json({ mensaje: 'Recepcionista eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar recepcionista:', error);
    res.status(500).json({ mensaje: 'Error al eliminar recepcionista' });
  }
};