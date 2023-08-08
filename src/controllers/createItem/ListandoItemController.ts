import { Request, Response } from "express";
import { prisma } from "../../database/client";


export const ListandoItemController = async (req: Request, res: Response) => {
	try {
		const item = await prisma.item.findMany({});

		return res.status(200).json({ message: "Todos item Cadastrado", item  });

	} catch (error) {
		return res.status(400).json({message: "Error Servidor"});
	}

};