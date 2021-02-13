import express from "express";

const router = express.Router();

router.post("/api/users/signin", (req, res) => {
  res.json({ msg: "/api/users/signin" });
});

export { router as signinRouter };
