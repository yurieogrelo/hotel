import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { z, ZodError } from "zod";

const orcamentoSchema = z.object({
	valor: z.number(),
	empresaId: z.number(),
	clienteId: z.number(),

});


type Orcamento = z.infer<typeof orcamentoSchema>

export const CreateOrcamentoController = async (req: Request, res: Response,) => {
	try {
		const { valor, clienteId, empresaId }: Orcamento = orcamentoSchema.parse(req.body);

		const clienteExiste = await prisma.cliente.findUnique({
			where: {
				id: Number(clienteId)
			}
		});

		if (!clienteExiste) {
			return res.status(400).json({ message: "Esse CLiente Inexistente!" });
		}

		const empresaExiste = await prisma.empresa.findUnique({
			where: {
				id: Number(empresaId)
			}
		});

		if (!empresaExiste) {
			return res.status(400).json({ message: "Esse Empresa Inexistente!" });
		}

		const orcamento = await prisma.orcamento.create({
			data: {
				valor,
				empresaId,
				clienteId

			}
		});
		return res.status(200).json({ message: "Orcamento Cadastrado", orcamento });
	} catch (error) {
		if (error instanceof ZodError) {
			return res.status(400).json(error.issues.map((issue) => ({ message: issue.message })));
		}

		return res.status(400).json({message: "Error Servidor" + error});
	}

};