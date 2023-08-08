import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { z, ZodError } from "zod";

const empresaSchema = z.object({
	nome: z.string().min(3).max(50).nonempty("Obrigatório"),
	email: z.string().email({message: "E-mail incorreto"}).nonempty("Obrigatório"),
	senha: z.string().max(50).nonempty("Obrigatório"),
	cnpj: z.string().max(18, "14 Digitos").min(13, " 14 Digitos").nonempty("Obrigatório"),
	telefone: z.string().max(13, "11 Digitos").min(13, " 11 Digitos").nonempty("Obrigatório"),
	celular: z.string().max(13, "11 Digitos").min(13, " 11 Digitos").nonempty("Obrigatório"),
	endereco: z.string().nonempty("Obrigatório"),
	cep: z.string().max(9, "8 Digitos").min(9, "8 Digitos").nonempty("Obrigatório"),
	razaosocial: z.string().nonempty("Obrigatório"),
	id: z.number()

});

  type Empresa = z.infer <typeof empresaSchema>


export const AtualizandoEmpresaController = async (req: Request, res: Response) => {
	try {
		const { nome, email, senha, cnpj, telefone, celular, endereco, cep, razaosocial, id }: Empresa = empresaSchema.parse(req.body);

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
				razaosocial,
				id
			}

		});

		return res.status(200).json({ message: "Empresa Cadastrada", novaEmpresa });

	} catch (error) {
		if(error instanceof ZodError) {
			return res.status(400).json(error.issues.map((issue) => ({message: issue.message})));
		}
		return res.status(400).json({message: "Error Servidor"});
	}

};