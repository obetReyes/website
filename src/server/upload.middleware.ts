import multer from 'multer';

const storage = multer.memoryStorage(); // You can adjust storage as per your needs
const upload = multer({ storage: storage });
export default upload.array('files');
