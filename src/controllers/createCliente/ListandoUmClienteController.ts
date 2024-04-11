import { Request, Response } from "express";
import { prisma } from "../../database/client";

export const ListandoUmClienteController = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;

		const cliente = await prisma.cliente.findUnique({
			where: {
				id: Number(id)
			}
		});

		if(!cliente){
			return res.status(400).json({massage: "Cliente não encontrado!"});
		}



		return res.status(200).json({ message: "Cliente", cliente });

	} catch (error) {
		return res.status(400).json({message: "Error Servidor "});
	}

};