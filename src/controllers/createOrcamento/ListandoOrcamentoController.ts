import { Request, Response } from "express";
import { prisma } from "../../database/client";


export const ListandoOrcametntoController = async (req: Request, res: Response) => {
	try {
		const orcamento = await prisma.orcamento.findMany({});

		return res.status(200).json({ message: "Todos Orcamento Cadastrado", orcamento  });

	} catch (error) {
		return res.status(400).json({message: "Error Servidor"});
	}

};