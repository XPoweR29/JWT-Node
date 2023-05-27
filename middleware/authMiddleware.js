import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

// własny middleware odpowiadający za autoryzację
export const authMiddleware = (req, res, next) => {
	const token = req.headers["authorization"]?.split(" ")[1]; //druga część nagłówka 'authorization'
	if (!token) {
		return res.status(401).json({
			isSuccess: false,
			message: "Niepoprawna autoryzacja",
		});
	}

	jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
		if (err) {
			return res.status(403).json({
				isSuccess: false,
				message: "Niepoprawna autoryzacja",
			});
		}

		req.user = data;
		next();
	});
};
