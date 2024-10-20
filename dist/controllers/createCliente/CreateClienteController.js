"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClienteController = void 0;
const client_1 = require("../../database/client");
const zod_1 = require("zod");
// Esquema de validação do cliente
const clienteSchema = zod_1.z.object({
    nome: zod_1.z.string(),
    cpf: zod_1.z.string(),
    quarto: zod_1.z.string(),
});
const CreateClienteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validação do body da requisição
        const { nome, cpf, quarto } = clienteSchema.parse(req.body);
        // Verificar se já existe um cliente com o mesmo cpf
        const existingClienteCpf = yield client_1.prisma.cliente.findUnique({
            where: { cpf }
        });
        if (existingClienteCpf) {
            return res.status(400).json({ error: 'CPF já existe.' });
        }
        // Verificar se já existe um cliente com o mesmo quarto
        const existingClienteQuarto = yield client_1.prisma.cliente.findUnique({
            where: { quarto }
        });
        if (existingClienteQuarto) {
            return res.status(400).json({ error: 'Quarto ocupado.' });
        }
        // Se não existe, crie o cliente
        const cliente = yield client_1.prisma.cliente.create({
            data: {
                nome,
                cpf,
                quarto
            }
        });
        // Retorna o cliente criado com status 201
        return res.status(201).json({ cliente });
    }
    catch (error) {
        // Tratamento de erros do Zod
        if (error instanceof zod_1.ZodError) {
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
});
exports.CreateClienteController = CreateClienteController;
