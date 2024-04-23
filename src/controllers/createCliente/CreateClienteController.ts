import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { z, ZodError } from "zod";

const clienteSchema = z.object({
	consumidor: z.string(),
	nunerro: z.string(),
	datass: z.string(),
});




type Cliente = z.infer<typeof clienteSchema>

export const CreateClienteController = async (req: Request, res: Response,) => {
	try {
		const { consumidor, nunerro, datass }: Cliente = clienteSchema.parse(req.body);

		const cliente = await prisma.cliente.create({
			data: {
				consumidor,
				nunerro,
				datass
			}
		});
		return res.status(200).json({ cliente });
	} catch (error) {
		if (error instanceof ZodError) {
			return res.status(400).json(error.issues.map((issue) => ({ message: issue.message })));
		}
		return res.status(400).json({ message: "Error Servidor" + error });
	}

};