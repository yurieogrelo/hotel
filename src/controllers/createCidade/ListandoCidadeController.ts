import { Request, Response } from "express";
import { prisma } from "../../database/client";


export const ListandoCidadeController = async (req: Request, res: Response) => {
	try {
		const cidade = await prisma.cidade.findMany({});

		return res.status(200).json({ message: "Todas Cidade Cadastrada", cidade  });

	} catch (error) {
		return res.status(400).json({message: "Error Servidor"});
	}

};