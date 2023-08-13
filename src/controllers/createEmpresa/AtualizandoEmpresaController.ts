import { Request, Response } from "express";
import { prisma } from "../../database/client";

export const AtualizandoEmpresaController = async (req: Request, res: Response) => {
	try {
		const { nome, email, senha, cnpj, telefone, celular, endereco, cep, razaosocial, id } =  (req.body);

		const empresaExiste = await prisma.empresa.findUnique({
			where: {
				id: Number(id)
			}
		});
		if(!empresaExiste){
			return res.status(400).json({message: "Empresa não Encontrada!"});
		}

		const novaEmpresa = await prisma.empresa.update({
			where: {
				id: Number(id)
			},
			data: {
				nome,
				email,
				senha,
				cnpj,
				telefone,
				celular,
				endereco,
				cep,
				razaosocial
			}

		});

		return res.status(200).json({ message: "Empresa Cadastrada", novaEmpresa });

	} catch (error) {
		return res.status(400).json({message: "Error Servidor"});
	}

};