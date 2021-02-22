import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/current-user", (req, res) => {
  if (!req.session?.jwt) {
    return res.json({ message: "invalid token" });
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ message: "valid token", currentUser: payload });
  } catch (err) {
    return res.json({ message: "invalid token" });
  }
});

export { router as currentUserRouter };
