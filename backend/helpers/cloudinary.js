import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
3                                         
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "E-commerce",
  });
  return result;
}

// Helper function to test URL parsing
function extractPublicIdFromUrl(imageUrl) {
  if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
    return null;
  }

  const urlParts = imageUrl.split('/');
  const uploadIndex = urlParts.findIndex(part => part === 'upload');
  
  if (uploadIndex === -1) {
    return null;
  }
  
  const pathAfterUpload = urlParts.slice(uploadIndex + 2).join('/');
  let publicId = pathAfterUpload.split('.')[0];
  
  const pathSegments = publicId.split('/');
  const segmentsWithoutVersion = pathSegments.filter(segment => !segment.match(/^v\d+$/));
  publicId = segmentsWithoutVersion.join('/');
  
  return publicId;
}

async function deleteImageFromCloudinary(imageUrl) {
  try {
    if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
      return { result: 'not_cloudinary' };
    }

    const publicId = extractPublicIdFromUrl(imageUrl);
    
    if (!publicId) {
      throw new Error('Could not extract public ID from URL');
    }
 
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    
    return result;
  } catch (error) {
    console.error('❌ Error deleting image from Cloudinary:', error.message);
    console.error('Full error:', error);
    throw error;
  }
}

const upload = multer({ storage });

export { upload, imageUploadUtil, deleteImageFromCloudinary, extractPublicIdFromUrl };
