const Profesion = require('../models/Profesion');

//crear nueva profesion
exports.registrarProfesion = async (req, res) => {
  const { profesion } = req.body;

  if (!profesion) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const yaExiste = await Profesion.findOne({ profesion });
  if (yaExiste) {
    return res.status(400).json({ message: 'La profesion ya está registrada' });
  }

  const nuevoProfesion = new Profesion({ profesion });
  await nuevoProfesion.save();

  res.json({ message: 'Profesion registrada con éxito' });
};

// Obtener todas las profesiones
exports.obtenerProfesion = async (req, res) => {
  try {
    const profesion = await Profesion.find();
    res.json(profesion);
  } catch (error) {
    console.error('Error al obtener profesiones:', error);
    res.status(500).json({ message: 'Error al obtener profesiones' });
  }
};

// Actualizar profesiones
exports.actualizarProfesion = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const profesionActualizado = await Profesion.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (!profesionActualizado) {
      return res.status(404).json({ mensaje: 'Profesion no encontrada' });
    }

    res.json(profesionActualizado);
  } catch (error) {
    console.error('Error al actualizar profesion:', error);
    res.status(500).json({ mensaje: 'Error al actualizar profesion' });
  }
};

//Eliminar profesion
exports.eliminarProfesion = async (req, res) => {
  try {
    const { id } = req.params;
    const profesion = await Profesion.findById(id);

    if (!profesion) {
      return res.status(404).json({ mensaje: 'Profesion no encontrada' });
    }

    await Profesion.findByIdAndDelete(id);
    res.json({ mensaje: 'Profesion eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar profesion:', error);
    res.status(500).json({ mensaje: 'Error al eliminar profesion' });
  }
};