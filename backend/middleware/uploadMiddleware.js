const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'expense-tracker',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

// Initialize upload
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  },
});

module.exports = upload;