import { Request, Response } from "express";
import { prisma } from "../../database/client";


export const ListandoEstadoController = async (req: Request, res: Response) => {
	try {
		const estado = await prisma.estado.findMany({});

		return res.status(200).json({ message: "Todos Cidade Cadastrado", estado  });

	} catch (error) {
		return res.status(400).json({message: "Error Servidor"});
	}

};