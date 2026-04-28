// src/services/cloudinary.service.js
import axios from 'axios';

// ⚠️ IMPORTANTE: Estos datos te los da Cloudinary al crear tu cuenta
const CLOUD_NAME = 'dovqtb1c9';
const UPLOAD_PRESET = 'cafeteria_fotos'; // El nombre exacto que elegiste en el paso 5
export const uploadToCloudinary = async (file: string | Blob) => {
  // Cloudinary requiere que enviemos la imagen en un FormData
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET); 

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );
    // Cloudinary nos devuelve un montón de datos, pero solo nos importa la URL segura
    return response.data.secure_url; 
  } catch (error) {
    console.error('Error al subir imagen a Cloudinary:', error);
    throw new Error('No se pudo subir la imagen');
  }
};