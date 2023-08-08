import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { z, ZodError } from "zod";

const orcamentoSchema = z.object({
	valor: z.number(),
	id: z.number()

});

  type Orcamento = z.infer <typeof orcamentoSchema>


export const AtualizandoOrcamentoController = async (req: Request, res: Response) => {
	try {
		const { valor, id }: Orcamento = orcamentoSchema.parse(req.body);

		const orcamentoExiste = await prisma.orcamento.findUnique({
			where: {
				id: Number(id)
			}
		});
		if(!orcamentoExiste){
			return res.status(400).json({message: "Orcamento não Encontrado!"});
		}


		const orcamento = await prisma.orcamento.update({
			where: {
				id: Number(id)
			},

			data: {
				valor,
				id
			}
		});

		return res.status(200).json({ message: "Orcamento Atualizado", orcamento });

	} catch (error) {
		if(error instanceof ZodError) {
			return res.status(400).json(error.issues.map((issue) => ({message: issue.message})));
		}
	}

};