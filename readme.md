#### Success Middleware

```
const successMiddleware = (data, req, res, next) => {
  const {
    status,
    message,
    error,
    total,
    remainingPages,
    remainingData,
    single,
  } = data[0];

  let resData = data.slice(1);

  return res.status(status).json({
    status,
    message,
    error: error == 1 ? true : false,
    data: resData.length == 0 ? undefined : single ? resData[0] : resData,
    pagination: single
      ? undefined
      : {
          total,
          remainingPages: remainingPages <= 0 ? false : remainingPages,
          remainingData: remainingData <= 0 ? false : remainingData,
        },
  });
};

export default successMiddleware;
```

#### Token Checkers

```
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
```
