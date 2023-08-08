import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { z, ZodError } from "zod";

const itemSchema = z.object({
	descricao: z.string(),
	unidade: z.string(),
	quantidade: z.string(),
	preco: z.number(),
	orcamentoId: z.number(),
});


type Item = z.infer<typeof itemSchema>

export const CreateItemController = async (req: Request, res: Response,) => {
	try {
		const { descricao, unidade, quantidade, preco, orcamentoId }: Item = itemSchema.parse(req.body);

		const orcamentoExiste = await prisma.orcamento.findUnique({
			where: {
				id: Number(orcamentoId)
			}
		});

		if (!orcamentoExiste) {
			return res.status(400).json({ message: "Esse Orcamento Inexistente!" });
		}

		const item = await prisma.item.create({
			data: {
				descricao,
				unidade,
				quantidade,
				preco,
				orcamentoId
			}
		});
		return res.status(200).json({ message: "item Cadastrado", item });
	} catch (error) {
		if (error instanceof ZodError) {
			return res.status(400).json(error.issues.map((issue) => ({ message: issue.message })));
		}

		return res.status(400).json({message: "Error Servidor"});
	}

};