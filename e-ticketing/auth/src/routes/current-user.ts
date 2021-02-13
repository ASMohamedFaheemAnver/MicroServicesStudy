import express from "express";

const router = express.Router();

router.get("/api/users/current-user", (req, res) => {
  res.json({ msg: "/api/users/current-user" });
});

export { router as currentUserRouter };
