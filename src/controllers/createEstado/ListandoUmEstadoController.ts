import { Request, Response } from "express";
import { prisma } from "../../database/client";

export const ListandoUmEstadoController = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;

		const estadoExiste = await prisma.estado.findUnique({
			where: {
				id: Number(id)
			}
		});

		if(!estadoExiste){
			return res.status(400).json({massage: "Estado não encontrado!"});
		}

		return res.status(200).json({ message: "Estado", estadoExiste });

	} catch (error) {
		return res.status(400).json({message: "Error Servidor "});
	}

};