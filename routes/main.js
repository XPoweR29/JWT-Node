import express from 'express';
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { users } from '../db/users.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { refreshTokens, removeRefreshToken } from '../db/refreshTokens.js';

dotenv.config();


export const mainRouter = express.Router();

mainRouter

.get("/", (req, res) => {
	res.send("Witaj na stronie głównej");
})

.get("/admin", authMiddleware, (req, res) => { 
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
	const token = jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: '15s'});
	const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN);
    refreshTokens.push(refreshToken);

	res.json({ token, refreshToken });
})

.post('/refresh-token', (req, res) => {
    const {token} = req.body;
    if(!refreshTokens.includes(token)) {
        return res.status(403).json({ isSuccess: false, message: 'nieprawidłowy refreshToken' });
    }

    jwt.verify(token, process.env.REFRESH_TOKEN, (err, data) => {
        if(err) {
            return res.status(403).json({ isSuccess: false, message: 'refreshToken nie przechodzi weryfikacji' });
        }

        const payload = { // nie podajemy tutaj wszystkich danych 
            email: data.email,
            name: data.name,
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: '15s'});
        res.json({newAccessToken: accessToken,});
    });
})

.patch('/logout', (req, res) => {
    const {refreshToken} = req.body;
    removeRefreshToken(refreshToken); 
    
    return res.json({isSuccess: true});
})

