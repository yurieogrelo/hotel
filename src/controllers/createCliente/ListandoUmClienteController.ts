import { Request, Response } from "express";
import { prisma } from "../../database/client";

export const ListandoUmClienteController = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;

		const clienteExiste = await prisma.cliente.findUnique({
			where: {
				id: Number(id)
			}
		});

		if(!clienteExiste){
			return res.status(400).json({massage: "Cliente não encontrado!"});
		}

		return res.status(200).json({ message: "Cliente", clienteExiste });

	} catch (error) {
		return res.status(400).json({message: "Error Servidor "});
	}

};