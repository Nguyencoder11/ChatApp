import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    httpOnly: false, // Cho phép JavaScript truy cập cookie
    sameSite: "none", // Cho phép gửi cookie qua các trang web khác
    secure: true, // Chỉ gửi cookie qua HTTPS
  });
};

export default generateTokenAndSetCookie;
