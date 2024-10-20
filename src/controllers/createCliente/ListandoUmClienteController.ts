import { Request, Response } from "express";
import { prisma } from "../../database/client";

export const ListandoUmClienteController = async (req: Request, res: Response) => {
	try {
		const { cpf } = req.params;

		const cliente = await prisma.cliente.findUnique({
			where: {
				cpf: cpf
			}
		});

		if(!cliente){
			return res.status(400).json({massage: "Nenhuma cliente foi encontrado!"});
		}



		return res.status(200).json({ message: "Cliente", cliente });

	} catch (error) {
		return res.status(400).json({message: "Error Servidor "});
	}

};