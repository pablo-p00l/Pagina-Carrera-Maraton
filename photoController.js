const Photo = require('./Photo_model');

// Obtener todas las fotos
exports.getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: photos.length,
      data: photos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Obtener una foto por ID
exports.getPhotoById = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Foto no encontrada',
      });
    }
    photo.views += 1;
    await photo.save();
    res.json({
      success: true,
      data: photo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Crear nueva foto
exports.createPhoto = async (req, res) => {
  try {
    const { title, description, imageUrl, category } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Título e imagen son requeridos',
      });
    }

    const photo = new Photo({
      title,
      description,
      imageUrl,
      category: category || 'carrera',
    });

    await photo.save();
    res.status(201).json({
      success: true,
      message: 'Foto creada exitosamente',
      data: photo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Actualizar foto
exports.updatePhoto = async (req, res) => {
  try {
    const photo = await Photo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Foto no encontrada',
      });
    }

    res.json({
      success: true,
      message: 'Foto actualizada exitosamente',
      data: photo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Eliminar foto
exports.deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Foto no encontrada',
      });
    }

    res.json({
      success: true,
      message: 'Foto eliminada exitosamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
