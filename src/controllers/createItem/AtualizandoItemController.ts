import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { z, ZodError } from "zod";

const itemSchema = z.object({
	descricao: z.string(),
	unidade: z.string(),
	quantidade: z.string(),
	preco: z.number(),
	id: z.number()

});

type Item = z.infer<typeof itemSchema>


export const AtualizandoItemController = async (req: Request, res: Response) => {
	try {
		const { descricao, unidade, quantidade, preco, id }: Item = itemSchema.parse(req.body);

		const itemExiste = await prisma.item.findUnique({
			where: {
				id: Number(id)
			}
		});
		if (!itemExiste) {
			return res.status(400).json({ message: "item não Encontrado!" });
		}

		const item = await prisma.item.update({
			where: {
				id: Number(id)
			},

			data: {
				descricao,
				unidade,
				quantidade,
				preco,
				id
			}
		});

		return res.status(200).json({ message: "item Atualizado", item });

	} catch (error) {
		if (error instanceof ZodError) {
			return res.status(400).json(error.issues.map((issue) => ({ message: issue.message })));
		}
		return res.status(400).json({message: "Error Servidor"});
	}

};