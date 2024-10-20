import { Request, Response } from "express";
import { prisma } from "../../database/client";
import { z, ZodError } from "zod";

// Esquema de validação do cliente
const clienteSchema = z.object({
  nome: z.string().optional(), // Campo opcional
  quarto: z.string().optional(), // Campo opcional
});

type Cliente = z.infer<typeof clienteSchema>;

export const AtualizarClienteController = async (req: Request, res: Response) => {
  try {
    // O cpf é obtido dos parâmetros da requisição
    const { cpf } = req.params;

    // Validação do body da requisição
    const { nome, quarto }: Partial<Cliente> = clienteSchema.parse(req.body);

    // Verificar se o cliente existe pelo cpf
    const existingCliente = await prisma.cliente.findUnique({
      where: { cpf }
    });

    // Se não existe o cliente, retorne um erro
    if (!existingCliente) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    // Atualiza o cliente
    const clienteAtualizado = await prisma.cliente.update({
      where: { cpf },
      data: {
        nome: nome !== undefined ? nome : existingCliente.nome,
        quarto: quarto !== undefined ? quarto : existingCliente.quarto,
      },
    });

    // Retorna o cliente atualizado com status 200
    return res.status(200).json({ cliente: clienteAtualizado });

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
