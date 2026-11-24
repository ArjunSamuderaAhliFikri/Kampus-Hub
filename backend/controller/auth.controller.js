const { College } = require("../model/College.model");
const { Admin } = require("../model/Admin.model");
const { RefreshToken } = require("../model/RefreshToken.model");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} = require("../utils/JWTToken");

const register = async (req, res) => {
  try {
    const { username, password, nim } = req.body;

    if (!username || !password || !nim) {
      return res
        .status(400)
        .json({ error: "Username, password, dan NIM harus diisi!" });
    }

    const isAccountExist = await College.findOne({ username, nim });

    if (!isAccountExist) {
      return res.status(404).json({ error: "Data mahasiswa tidak ditemukan!" });
    }

    if (isAccountExist.isActive) {
      return res.status(400).json({ error: "Akun sudah terdaftar!" });
    }

    const enabledAccount = await College.findOneAndUpdate(
      {
        _id: isAccountExist._id,
      },
      { username, password, nim, isActive: true },
      { new: true },
    );

    if (!enabledAccount) {
      return res.status(500).json({ error: "Akun tidak berhasil diaktifkan!" });
    }

    return res.json({ message: "Registrasi berhasil! Silakan login." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Username or Password harus di isi!",
        user: null,
      });
    }

    // 1. Cek apakah user adalah College (mahasiswa)
    const isValidCollege = await College.findOne({ username, password });

    let payload = null;
    let userDoc = null;

    if (isValidCollege && isValidCollege.isActive) {
      payload = {
        userId: isValidCollege._id,
        username: isValidCollege.username,
        role: "mahasiswa",
      };
      userDoc = isValidCollege;
    } else {
      // 2. Jika bukan college, cek apakah user adalah Admin
      const isValidAdmin = await Admin.findOne({ username, password });

      if (isValidAdmin) {
        payload = {
          userId: isValidAdmin._id,
          username: isValidAdmin.username,
          role: "admin",
        };
        userDoc = isValidAdmin;
      }
    }

    if (!payload || !userDoc) {
      return res.status(401).json({
        error: "Username atau password salah, atau akun belum aktif!",
        user: null,
      });
    }

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Simpan refresh token di database
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await RefreshToken.findOneAndUpdate(
      { userId: userDoc._id },
      {
        userId: userDoc._id,
        token: refreshToken,
        expiresAt: expiresAt,
      },
      { upsert: true, new: true },
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Simpan HANYA di httpOnly cookies — tidak dikirim di response body
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 hari
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 30 * 60 * 1000, // 30 menit
    });

    console.log(
      `=== LOGIN BERHASIL: ${payload.username} sebagai ${payload.role} ===`,
    );

    // Response hanya mengirim user info, BUKAN token
    return res.json({
      message: `Berhasil login sebagai ${payload.role}!`,
      user: payload,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    // Ambil refresh token dari cookie saja
    const token = req.cookies?.refresh_token;

    if (token) {
      await RefreshToken.deleteOne({ token });
    }

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return res.json({ message: "Logout berhasil!" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const refreshTokenHandler = async (req, res) => {
  try {
    // Refresh token HANYA dari httpOnly cookie
    const incomingRefreshToken = req.cookies?.refresh_token;

    if (!incomingRefreshToken) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Refresh token tidak ditemukan!",
      });
    }

    // 1. Verifikasi JWT signature
    const decoded = verifyRefreshToken(incomingRefreshToken);

    // 2. Cocokkan dengan database
    const tokenDoc = await RefreshToken.findOne({
      token: incomingRefreshToken,
      userId: decoded.userId,
    });

    if (!tokenDoc) {
      return res.status(403).json({
        error: "Forbidden",
        message: "Refresh token tidak valid atau telah dicabut!",
      });
    }

    // 3. Cari user di College atau Admin
    let userDoc = await College.findById(tokenDoc.userId);
    let role = "mahasiswa";

    if (!userDoc) {
      userDoc = await Admin.findById(tokenDoc.userId);
      role = "admin";
    }

    if (!userDoc) {
      return res.status(403).json({
        error: "Forbidden",
        message: "Akun user tidak ditemukan!",
      });
    }

    if (role === "mahasiswa" && !userDoc.isActive) {
      return res.status(403).json({
        error: "Forbidden",
        message: "Akun mahasiswa sedang tidak aktif!",
      });
    }

    const newPayload = {
      userId: userDoc._id,
      username: userDoc.username,
      role: role,
    };

    const newAccessToken = generateAccessToken(newPayload);

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 30 * 60 * 1000,
    });

    return res.json({
      message: "Token berhasil diperbarui!",
      user: newPayload,
    });
  } catch (error) {
    console.error("Refresh Token Error:", error.message);
    return res.status(403).json({
      error: "Refresh token tidak valid atau sudah kadaluarsa!",
    });
  }
};

// Endpoint GET /auth/me — cek siapa user yang sedang login via cookie
const getMe = async (req, res) => {
  try {
    const accessToken = req.cookies?.access_token;

    if (!accessToken) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Belum login!",
      });
    }

    const decoded = verifyAccessToken(accessToken);

    return res.json({
      user: {
        userId: decoded.userId,
        username: decoded.username,
        role: decoded.role,
      },
    });
  } catch (error) {
    // Access token expired/invalid — frontend harus panggil refresh-token
    return res.status(401).json({
      error: "Unauthorized",
      message: "Access token expired atau tidak valid!",
    });
  }
};

module.exports = { register, login, logout, refreshTokenHandler, getMe };
