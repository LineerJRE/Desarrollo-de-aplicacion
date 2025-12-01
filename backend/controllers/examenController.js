const Examen = require('../models/Exmenes');

//crear nuevo Examen
exports.registrarExamen = async (req, res) => {
  const { examen, profesion } = req.body;

  if (!examen || !profesion) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const yaExiste = await Examen.findOne({ examen });
  if (yaExiste) {
    return res.status(400).json({ message: 'El examen ya está registrado' });
  }

  const nuevoExamen = new Examen({ examen, profesion });
  await nuevoExamen.save();

  res.json({ message: 'Examen registrado con éxito' });
};

// Obtener todos los examenes
exports.obtenerExamen = async (req, res) => {
  try {
    const examen = await Examen.find();
    res.json(examen);
  } catch (error) {
    console.error('Error al obtener examen:', error);
    res.status(500).json({ message: 'Error al obtener examen' });
  }
};

// Actualizar datos del examen
exports.actualizarExamen = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const examenActualizado = await Examen.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (!examenActualizado) {
      return res.status(404).json({ mensaje: 'Examen no encontrado' });
    }

    res.json(examenActualizado);
  } catch (error) {
    console.error('Error al actualizar examen:', error);
    res.status(500).json({ mensaje: 'Error al actualizar examen' });
  }
};

//Eliminar examen
exports.eliminarExamen = async (req, res) => {
  try {
    const { id } = req.params;
    const examen = await Examen.findById(id);

    if (!examen) {
      return res.status(404).json({ mensaje: 'Examen no encontrado' });
    }

    await Examen.findByIdAndDelete(id);
    res.json({ mensaje: 'Examen eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar examen:', error);
    res.status(500).json({ mensaje: 'Error al eliminar examen' });
  }
};