import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { z, ZodError } from "zod";

// Esquema de validação do cliente
const clienteSchema = z.object({
  nome: z.string(),
  cpf: z.string(),
  quarto: z.string(),
});

type Cliente = z.infer<typeof clienteSchema>;

export const CreateClienteController = async (req: Request, res: Response) => {
  try {
    // Validação do body da requisição
    const { nome, cpf, quarto }: Cliente = clienteSchema.parse(req.body);

    // Verificar se já existe um cliente com o mesmo cpf
    const existingClienteCpf = await prisma.cliente.findUnique({
      where: { cpf }
    });

    if (existingClienteCpf) {
      return res.status(400).json({ error: 'CPF já existe.' });
    }

    // Verificar se já existe um cliente com o mesmo quarto
    const existingClienteQuarto = await prisma.cliente.findUnique({
      where: { quarto }
    });

    if (existingClienteQuarto) {
      return res.status(400).json({ error: 'Quarto ocupado.' });
    }

    // Se não existe, crie o cliente
    const cliente = await prisma.cliente.create({
      data: {
        nome,
        cpf,
        quarto
      }
    });

    // Retorna o cliente criado com status 201
    return res.status(201).json({ cliente });

  } catch (error) {
    // Tratamento de erros do Zod
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message
        }))
      });
    }

    // Tratamento de outros erros (Prisma, banco de dados, etc.)
    return res.status(500).json({ message: "Erro no servidor: " + error });
  }
};
