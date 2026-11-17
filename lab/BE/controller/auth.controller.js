const USER_AVAILABLE = [
  {
    username: "Arjun Samudera Ahli Fikri",
    password: "wahidiyah",
  },
  {
    username: "Muhammad Brilliant Ghousti",
    password: "wahidiyah",
  },
  {
    username: "Muhammad Anggoro Wijaya",
    password: "wahidiyah",
  },
  {
    username: "Arif Rahmat Darmawan",
    password: "wahidiyah",
  },
];

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({
      error: "Username or Password harus di isi!",
      user: null,
    });
  }

  const isValidUsername = USER_AVAILABLE.find(
    (user) => user.username.toLowerCase() === username.toLowerCase(),
  );

  const isValidPassword = USER_AVAILABLE.find(
    (user) => user.password === password,
  );

  // it means, username and password must be right.
  const isAuthorize = isValidUsername && isValidPassword;

  if (isAuthorize) {
    const payload = { username };

    return res.json({
      message: `User dengan username ${username} berhasil login!`,
      user: payload,
    });
  } else {
    return res.json({ error: "Tidak ada user yang terdaftar!", user: null });
  }
};

module.exports = { login };
