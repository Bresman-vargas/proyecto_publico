import * as authService from "../services/auth.services.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user} = await authService.loginUser(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login exitoso",
        id: user.id,
        nombre: user.nombre,
        email: user.email
    });
  } catch (error) {
    if (error.message === "USER_NOT_FOUND" || error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const register = async (req, res) => {
  try {
    
    const {token, user} = await authService.registerUser(req.body)

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 día de duración
    });

    res.status(201).json({
      message: "Usuario creado con éxito",
      id: user.id,
      nombre: user.nombre,
      email: user.email,
    });
  } catch (error) {
    if (error.message === "ALREADY_REGISTERED_USER") {
      return res.status(401).json({ message: "Usuario ya registrado" });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  res.status(200).json({
    email: req.user.email,
  });
};


export const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    
    const user = await authService.verifyTokenService(token);

    if (!user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};