import * as dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET_JWT;

import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { z } from "zod";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

const empresaSchema = z.object({
	id: z.number(),
	email: z.string().email({message: "E-mail incorreto"}).nonempty("Obrigatório"),
	senha: z.string().nonempty("Obrigatório"),
});

  type Empresa = z.infer <typeof empresaSchema>


export const AuthAutorizaController = async  (req: Request, res: Response ) => {

	try {
		const { email, senha}: Empresa = empresaSchema.parse = (req.body);

		const empresa = await prisma.empresa.findUnique({
			where: {
				email
			}
		});

		if(!empresa) {
			return res.status(400).json({message: "Essa Empresa Não Existe"});
		}

		const Validar_password = await compare(senha, empresa.senha);

		if(!Validar_password) {
			return res.json({error: "Senha Inválida"});
		}

		const token = sign ({id: empresa.id}, SECRET as string, {expiresIn: "20s"});

		const  { id } = empresa;

		return res.status(201).json({ empresa: {id, email}, token });
	} catch (error) {

		return res.status(400).json({message: "Error Servidor" + error});
	}

};