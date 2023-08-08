import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { z, ZodError } from "zod";

const cidadeSchema = z.object({
	nome: z.string(),
	estadoId: z.number()
});

type Cidade = z.infer<typeof cidadeSchema>

export const CreateCidadeController = async (req: Request, res: Response,) => {
	try {
		const { nome, estadoId }: Cidade = cidadeSchema.parse(req.body);

		const cidade = await prisma.cidade.create({
			data: {
				nome,
				estadoId
			}
		});
		return res.status(200).json({ message: "Cidade Cadastrada", cidade });
	} catch (error) {
		if (error instanceof ZodError) {
			return res.status(400).json(error.issues.map((issue) => ({ message: issue.message })));
		}

		return res.status(400).json({message: "Error Servidor"});
	}

};