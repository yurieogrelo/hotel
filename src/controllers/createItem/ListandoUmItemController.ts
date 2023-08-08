import { Request, Response } from "express";
import { prisma } from "../../database/client";

export const ListandoUmItemController = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;

		const itemExiste = await prisma.item.findUnique({
			where: {
				id: Number(id)
			}
		});

		if(!itemExiste){
			return res.status(400).json({massage: "item não encontrado!"});
		}

		return res.status(200).json({ message: "Orcamento", itemExiste });

	} catch (error) {
		return res.status(400).json({message: "Error Servidor "});
	}

};