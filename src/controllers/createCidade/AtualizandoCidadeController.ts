import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { z, ZodError } from "zod";

const cidadeSchema = z.object({
	nome: z.string(),
	id: z.number()

});

  type Cidade = z.infer <typeof cidadeSchema>


export const AtualizandoCidadeController = async (req: Request, res: Response) => {
	try {
		const { nome, id }: Cidade = cidadeSchema.parse(req.body);

		const cidadeExiste = await prisma.cidade.findUnique({
			where: {
				id: Number(id)
			}
		});

		if(!cidadeExiste){
			return res.status(400).json({message: "Cidade não Encontrado!"});
		}


		const cidade = await prisma.cidade.update({
			where: {
				id: Number(id)
			},

			data: {
				nome,
				id
			}
		});

		return res.status(200).json({ message: "Cidade Atualizado", cidade });

	} catch (error) {
		if(error instanceof ZodError) {
			return res.status(400).json(error.issues.map((issue) => ({message: issue.message})));
		}
		return res.status(400).json({message: "Error Servidor"});
	}

};