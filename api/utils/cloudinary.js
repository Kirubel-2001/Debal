import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

// Use memory storage 
const storage = multer.memoryStorage();

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (allowedFormats.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG and WEBP are allowed.'));
        }
    }
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'room-photos',
                transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        uploadStream.end(buffer);
    });
};

export { cloudinary, upload, uploadToCloudinary };