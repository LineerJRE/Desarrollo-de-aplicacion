const Medico = require('../models/Medico');

// Crear nuevo médico
exports.crearMedico = async (req, res) => {
  const { nombre, identificacion, usuario, contraseña, profesion, consultorio } = req.body;

  if (!nombre || !identificacion || !usuario || !contraseña || !profesion || !consultorio) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const yaExiste = await Medico.findOne({ usuario });
  if (yaExiste) {
    return res.status(400).json({ message: 'El usuario ya está registrado' });
  }

  const nuevo = new Medico({
    nombre,
    identificacion,
    usuario,
    contraseña,
    profesion,
    consultorio,
  });

  await nuevo.save();
  res.status(201).json({ message: 'Médico creado correctamente' });
};

// Login médico
exports.loginMedico = async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    const medico = await Medico.findOne({ usuario });

    if (!medico || !(await medico.validarContraseña(contraseña))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    res.json({
      message: 'Login exitoso',
      medicoId: medico._id,
      nombre: medico.nombre,
      usuario:medico.usuario,
      profesion: medico.profesion,
      consultorio: medico.consultorio
    });

  } catch (error) {
    console.error('Error en login de médico:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Obtener todos los médicos
exports.obtenerMedicos = async (req, res) => {
  try {
    const medicos = await Medico.find();
    res.json(medicos);
  } catch (error) {
    console.error('Error al obtener médicos:', error);
    res.status(500).json({ message: 'Error al obtener médicos' });
  }
};  

// Actualizar datos del médico (sin contraseña)
exports.actualizarDatosMedico = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const medicoActualizado = await Medico.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (!medicoActualizado) {
      return res.status(404).json({ mensaje: 'Médico no encontrado' });
    }

    res.json(medicoActualizado);
  } catch (error) {
    console.error('Error al actualizar médico:', error);
    res.status(500).json({ mensaje: 'Error al actualizar médico' });
  }
};

// Cambiar contraseña del médico
exports.cambiarClaveMedico = async (req, res) => {
  try {
    const { id } = req.params;
    const { contraseña } = req.body;

    const medico = await Medico.findById(id);
    if (!medico) {
      return res.status(404).json({ mensaje: 'Médico no encontrado' });
    }

    medico.contraseña = contraseña;
    await medico.save();

    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al cambiar contraseña del médico:', error);
    res.status(500).json({ mensaje: 'Error al cambiar contraseña del médico' });
  }
};

//Eliminar Medico
exports.eliminarMedico = async (req, res) => {
  try {
    const { id } = req.params;
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({ mensaje: 'Médico no encontrado' });
    }

    await Medico.findByIdAndDelete(id);
    res.json({ mensaje: 'Médico eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar médico:', error);
    res.status(500).json({ mensaje: 'Error al eliminar médico' });
  }
};