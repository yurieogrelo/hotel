import { Request, Response } from "express";
import { prisma } from "../../database/client";

export const DeletarOrcamentoController = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;

		const orcamentoExiste = await prisma.orcamento.findUnique({
			where: {
				id: Number(id)
			}
		});
		if(!orcamentoExiste){
			return res.status(400).json({massage: "Orcamento não encontrado!"});
		}

		const orcamento = await prisma.orcamento.delete({where: {id: Number(id)}});

		return res.status(200).json({ message: "Orcamento Deletado!", orcamento });

	} catch (error) {
		return res.status(400).json({message: "Error Servidor"});
	}

};