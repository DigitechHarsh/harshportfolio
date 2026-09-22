const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'la4ig9t3',
  api_key: '427994134557492',
  api_secret: '_3vxKU6--GfaMPJqs-zuc9gB9lY',
  secure: true
});

function uploadFile(filePath, options) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(filePath, options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

async function test() {
  const path = require('path');
  const file = path.join(__dirname, 'AI Teasers', '13b92c9a-4329-42b1-8cee-ad0d4ba5ff5b-video.mp4');
  console.log('Testing upload for:', file);
  try {
    const res = await uploadFile(file, { resource_type: 'video', folder: 'portfolio/ai-teasers' });
    console.log('Upload success:', res.secure_url, res.public_id);
  } catch (err) {
    console.error('Upload failed:', err);
  }
}

test();
