import { Request, Response } from "express";
import { prisma } from "../../database/client";

export const DeletarEmpresaController = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;

		const empresaExiste = await prisma.empresa.findUnique({
			where: {
				id: Number(id)
			}
		});
		if(!empresaExiste){
			return res.status(400).json({massage: "Emprasa não encontrada!"});
		}

		const empresa = await prisma.empresa.delete({where: {id: Number(id)}});

		return res.status(200).json({ message: "empresa Deletado!", empresa });
	} catch (error) {
		return res.status(400).json({message: "Error Servidor" + error});
	}

};