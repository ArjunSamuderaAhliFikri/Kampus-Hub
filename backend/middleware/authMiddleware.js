const { verifyAccessToken } = require("../utils/JWTToken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token =
      (authHeader && authHeader.split(" ")[1]) || req.cookies?.access_token;

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Token tidak ditemukan!",
      });
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};

module.exports = { authMiddleware };
