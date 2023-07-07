export const login = (req, res) => {
  res.send("Login API is Working");
};

export const signup = (req, res) => {
  res.status(401).send("Signup API is Working");
};
