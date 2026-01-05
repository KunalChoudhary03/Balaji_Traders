const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudName = (process.env.CLOUDINARY_CLOUD_NAME || '').toLowerCase();
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Guardrail: log if Cloudinary env is missing to surface config issues
if (!cloudName || !apiKey || !apiSecret) {
  console.error('Cloudinary env missing. Please set CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET.');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'balaji-traders/categories',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;
