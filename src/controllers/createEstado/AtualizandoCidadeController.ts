import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { z, ZodError } from "zod";

const estadoSchema = z.object({
	sigla: z.string(),
	id: z.number()

});

  type Estado = z.infer <typeof estadoSchema>


export const AtualizandoEstadoController = async (req: Request, res: Response) => {
	try {
		const { sigla, id }: Estado = estadoSchema.parse(req.body);

		const estadoExiste = await prisma.estado.findUnique({
			where: {
				id: Number(id)
			}
		});
		if(!estadoExiste){
			return res.status(400).json({message: "Estado não Encontrado!"});
		}


		const estado = await prisma.estado.update({
			where: {
				id: Number(id)
			},

			data: {
				sigla,
				id
			}
		});

		return res.status(200).json({ message: "Estado Atualizado", estado });

	} catch (error) {
		if(error instanceof ZodError) {
			return res.status(400).json(error.issues.map((issue) => ({message: issue.message})));
		}
		return res.status(400).json({message: "Error Servidor"});
	}

};