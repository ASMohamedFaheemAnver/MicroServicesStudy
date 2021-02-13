import express from "express";

const router = express.Router();

router.post("/api/users/signup", (req, res) => {
  res.json({ msg: "/api/users/signup" });
});

export { router as signupRouter };
