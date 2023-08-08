import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { z, ZodError } from "zod";

const clienteSchema = z.object({
	nome: z.string().min(3).max(50).nonempty("Obrigatório"),
	email: z.string().email({ message: "E-mail incorreto" }).nonempty("Obrigatório"),
	cnpjcpf: z.string().max(18, "14 Digitos").min(13, " 14 Digitos").nonempty("Obrigatório"),
	telefone: z.string().max(13, "11 Digitos").min(13, " 11 Digitos").nonempty("Obrigatório"),
	celular: z.string().max(13, "11 Digitos").min(13, " 11 Digitos").nonempty("Obrigatório"),
	endereco: z.string().nonempty("Obrigatório"),
	cep: z.string().max(9, "8 Digitos").min(9, "8 Digitos").nonempty("Obrigatório"),
	razaosocial: z.string().nonempty("Obrigatório"),
	empresaId: z.number(),
	cidadeId: z.number()
});


type Cliente = z.infer<typeof clienteSchema>

export const CreateClienteController = async (req: Request, res: Response,) => {
	try {
		const { nome, email, cnpjcpf, telefone, celular, endereco, cep, razaosocial, empresaId, cidadeId }: Cliente = clienteSchema.parse(req.body);

		const cidadeExiste = await prisma.cidade.findUnique({
			where: {
				id: Number(cidadeId)
			}
		});

		if (!cidadeExiste) {
			return res.status(400).json({ message: "Essa Cidade Inexistente!" });
		}

		const empresaExiste = await prisma.empresa.findUnique({
			where: {
				id: Number(empresaId)
			}
		});

		if (!empresaExiste) {
			return res.status(400).json({ message: "Esse Empresa Inexistente!" });
		}

		const limparCnpj = cnpjcpf.replace(/[^a-zA-Z0-9]/g, "");
		const limparTelefone = telefone.replace(/[^0-9]/g, "");
		const limparCelular = celular.replace(/[^0-9]/g, "");
		const limparCep = cep.replace(/[-]/g, "");

		const cliente = await prisma.cliente.create({
			data: {
				nome,
				email,
				cnpjcpf: limparCnpj,
				telefone: limparTelefone,
				celular: limparCelular,
				endereco,
				cep: limparCep,
				razaosocial,
				empresaId,
				cidadeId

			}
		});
		return res.status(200).json({ message: "Cliente Cadastrado", cliente });
	} catch (error) {
		if (error instanceof ZodError) {
			return res.status(400).json(error.issues.map((issue) => ({ message: issue.message })));
		}

		return res.status(400).json({ message: "Error Servidor" });
	}

};