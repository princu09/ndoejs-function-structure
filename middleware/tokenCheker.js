import jwt from "jsonwebtoken";

export const checker = (req, res, next) => {
  var token = req.headers["authorization"];

  if (!token) {
    return res.status(500).json({ error: true, message: "Token Required..." });
  }

  var auth = token.substring(7, token.length);

  try {
    const decode = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decode.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: true, message: "Invalid Token..." });
  }
};

export const adminChecker = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: true, message: "Token Required..." });
  }
  const auth = token.substring(7, token.length);

  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded.user;
    if (req.user.isAdmin == true) {
      next();
    } else {
      return res.status(401).json({ error: true, message: "Invalid Token..." });
    }
  } catch (error) {
    return res.status(401).json({ error: true, message: "Invalid Token..." });
  }
};

export const socketChecker = (socket, next) => {
  try {
    const { token } = socket?.handshake?.headers;

    if (!token) {
      return next(new Error("Token Required..."));
    }

    const auth = token.substring(7, token.length);

    if (!jwt.verify(auth, process.env.JWT_SECRET)) {
      return next(new Error("Invalid token"));
    }

    socket.user = jwt.decode(auth).user;
    return next();
  } catch (error) {
    return next(new Error(error));
  }
};
