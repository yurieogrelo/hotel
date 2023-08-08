import { Request, Response } from "express";
import { prisma } from "../../database/client";

export const ListandoUmaCidadeController = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;

		const cidadeExiste = await prisma.cidade.findUnique({
			where: {
				id: Number(id)
			}
		});

		if(!cidadeExiste){
			return res.status(400).json({massage: "Cidade não encontrado!"});
		}

		return res.status(200).json({ message: "Cidade", cidadeExiste });

	} catch (error) {
		return res.status(400).json({message: "Error Servidor "});
	}

};