import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { z, ZodError } from "zod";

const estadoSchema = z.object({
	sigla: z.string(),
});

type Estado = z.infer<typeof estadoSchema>

export const CreateEstadoController = async (req: Request, res: Response,) => {
	try {
		const { sigla }: Estado = estadoSchema.parse(req.body);

		const estado = await prisma.estado.create({
			data: {
				sigla
			}
		});
		return res.status(200).json({ message: "Estado Cadastrado", estado });
	} catch (error) {
		if (error instanceof ZodError) {
			return res.status(400).json(error.issues.map((issue) => ({ message: issue.message })));
		}

		return res.status(400).json({message: "Error Servidor"});
	}

};