import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { z, ZodError } from "zod";
import { hash } from "bcrypt";

const empresaSchema = z.object({
	nome: z.string().nonempty("Obrigatório"),
	email: z.string().email({message: "E-mail incorreto"}).nonempty("Obrigatório"),
	senha: z.string().nonempty("Obrigatório"),
	cnpj: z.string().nonempty("Obrigatório"),
	telefone: z.string().nonempty("Obrigatório"),
	celular: z.string().nonempty("Obrigatório"),
	endereco: z.string().nonempty("Obrigatório"),
	cep: z.string().nonempty("Obrigatório"),
	razaosocial: z.string().nonempty("Obrigatório"),
	cidadeId: z.number()
});

  type Empresa = z.infer <typeof empresaSchema>

export const CreateEmpresaController = async  (req: Request, res: Response, ) => {

	try {
		const { nome, email, senha, cnpj, telefone, celular, endereco, cep, razaosocial, cidadeId }: Empresa = empresaSchema.parse(req.body);

		const cidadeExiste = await prisma.cidade.findUnique({
			where: {
				id: Number(cidadeId)
			}
		});

		if (!cidadeExiste) {
			return res.status(400).json( "Essa Cidade Inexistente" );
		}

		const empresaExiste = await prisma.empresa.findUnique({
			where: {
				email
			}
		});

		if(empresaExiste) {
			return res.status(400).json({message: "Essa Empresa Já Existe!"});
		}

		const limparCnpj = cnpj.replace(/[^a-zA-Z0-9]/g, "");
		const limparTelefone = telefone.replace(/[^0-9]/g, "");
		const limparCelular = celular.replace(/[^0-9]/g, "");
		const limparCep = cep.replace(/[-]/g, "");

		const hash_password = await hash(senha, 8);

		const empresa = await prisma.empresa.create({
			data: {
				nome,
				email,
				senha: hash_password,
				cnpj: limparCnpj,
				telefone: limparTelefone,
				celular: limparCelular,
				endereco,
				cep: limparCep,
				razaosocial,
				cidadeId
			}

		});

		return res.status(201).json({ message: "Empresa Cadastrada", empresa });
	} catch (error) {
		if(error instanceof ZodError) {
			return res.status(400).json(error.issues.map((issue) => ({message: issue.message})));
		}
		return res.status(400).json({message: "Error Servidor" + error});
	}

};