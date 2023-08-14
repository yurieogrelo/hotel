import * as dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET_JWT;

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number
  SECRET: string;
}

export function AuthMiddleware (req: Request, res: Response, next: NextFunction){
	const { authorization } = req.headers;

	if(!authorization) {
		return res.status(401).json({error: "Token não Autorizado"});
	}

	const [, token] = authorization.split(" ");

	try {
		const decoded = verify(token, SECRET as string);
		const { id } = decoded as TokenPayload;

		req.empresaId = id;
		next();
	} catch (error) {
		return res.status(401).json({error: "Token Inválido"});
	}

}