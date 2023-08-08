import { Request, Response } from "express";
import { prisma } from "../../database/client";

export const DeletarEstadoController = async (req: Request, res: Response) => {
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

		const estado = await prisma.estado.delete({where: {id: Number(id)}});

		return res.status(200).json({ message: "Estado Deletado!", estado });

	} catch (error) {
		return res.status(400).json({message: "Error Servidor"});
	}

};