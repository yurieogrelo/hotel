import * as dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET_JWT as string;

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number
}

export function AuthMiddleware (req: Request, res: Response, next: NextFunction){
	const { authorization } = req.headers;

	if(!authorization) {
		return res.status(401).json({error: "Token não Autorizado"});
	}

	const [, token] = authorization.split(" ");

	try {
		const decoded = verify(token, SECRET);
		const { id } = decoded as TokenPayload;

		req.empresaId = id;
		next();
	} catch (error) {
		return res.status(401).json({error: "Token Inválido"});
	}

}