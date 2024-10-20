import { Request, Response } from "express";
import { prisma } from "../../database/client";


export const DeletarClienteController = async (req: Request, res: Response) => {
	try {
		const { cpf } = req.params;

		const clienteExiste = await prisma.cliente.findUnique({
			where: {
				cpf: cpf
			}
		});
		if(!clienteExiste){
			return res.status(400).json({massage: "Nome não Encontrdo!"});
		}

		const cliente = await prisma.cliente.delete({where: {cpf: cpf}});

		return res.status(200).json({ message: "Deletado com sucesso!!", cliente });

	} catch (error) {
		return res.status(400).json({message: "Servidor não está rodando"});
	}

};