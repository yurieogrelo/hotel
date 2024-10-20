import { Request, Response } from "express";
import { prisma } from "../../database/client";


export const ListandoClienteController = async (req: Request, res: Response) => {
	try {
		const cliente = await prisma.cliente.findMany({orderBy: {id: "asc"}});

		return res.status(200).json({ message: "Clientes Cadastrados", cliente  });

	} catch (error) {
		return res.status(400).json({message: "Error Servidor"});
	}


};