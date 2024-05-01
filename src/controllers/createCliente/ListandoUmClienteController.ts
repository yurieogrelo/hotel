import { Request, Response } from "express";
import { prisma } from "../../database/client";

export const ListandoUmClienteController = async (req: Request, res: Response) => {
	try {
		const { consumidor } = req.params;

		const cliente = await prisma.cliente.findUnique({
			where: {
				consumidor: String(consumidor)
			}
		});

		if(!cliente){
			return res.status(400).json({massage: "Nenhuma parcela foi encontrada!"});
		}



		return res.status(200).json({ message: "Cliente", cliente });

	} catch (error) {
		return res.status(400).json({message: "Error Servidor "});
	}

};