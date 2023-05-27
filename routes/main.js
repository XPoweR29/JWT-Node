import express from 'express';
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { users } from './db/users.js';

dotenv.config();


export const mainRouter = express.Router();

mainRouter

.get("/", (req, res) => {
	res.send("Witaj na stronie głównej");
})

.get("/admin", (req, res) => {
	res.send("Witaj w panelu admina");
})

.post("/login", (req, res) => {
	const user = users.find((u) => u.email === req.body.email);
	if (!user) {
		return res.status(401).json({
			isSuccess: false,
			message: "Błędne dane logowania",
		});
	}

	const payload = user;
	const token = jwt.sign(payload, process.env.ACCESS_TOKEN);

	res.json({ token });
})

