import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "E:/Chat/mern-chat-app/frontend/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// Tạo một đối tượng multer với cấu hình đã thiết lập
const upload = multer({ storage: storage });

// Middleware upload file
const uploadMiddleware = upload.single("imgUrl"); // 'file' là tên của trường file trong form

export default uploadMiddleware;
