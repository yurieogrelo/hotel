
import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";


export const AuthController = async (req: Request, res: Response,) => {

	try {
		const { email, senha } = (req.body);

		const empresa = await prisma.empresa.findUnique({
			where: {
				email
			}
		});

		if (!empresa) {
			return res.status(400).json({ message: "Essa Empresa não Existe!" });
		}

		const isValue_password = await compare(senha, empresa.senha);

		if (!isValue_password) {
			return res.status(400).json({ message: "Senha Inválida" });
		}


		const token = sign({id: empresa.id}, "lkadskfalkdsfçlakj", {expiresIn: "30s"});

		const {id} = empresa;

		return res.status(200).json({ empresa: {id, email}, token });
	} catch (error) {

		return res.status(400).json({ message: "Error Servidor" });
	}

};


