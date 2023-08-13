import { Request, Response } from "express";
import { prisma } from "../../database/client";


export const ListandoEmpresaController = async (req: Request, res: Response) => {
	try {
		const empresa = await prisma.empresa.findMany({});

		return res.status(200).json({ message: "Todas Empresas Cadastrada", empresa  });
	} catch (error) {
		return res.status(400).json({message: "Error Servidor" + error});
	}

};