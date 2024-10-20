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
exports.DeletarClienteController = void 0;
const client_1 = require("../../database/client");
const DeletarClienteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cpf } = req.params;
        const clienteExiste = yield client_1.prisma.cliente.findUnique({
            where: {
                cpf: cpf
            }
        });
        if (!clienteExiste) {
            return res.status(400).json({ massage: "Nome não Encontrdo!" });
        }
        const cliente = yield client_1.prisma.cliente.delete({ where: { cpf: cpf } });
        return res.status(200).json({ message: "Deletado com sucesso!!", cliente });
    }
    catch (error) {
        return res.status(400).json({ message: "Servidor não está rodando" });
    }
});
exports.DeletarClienteController = DeletarClienteController;
