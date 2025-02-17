"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateClienteController_1 = require("../controllers/createCliente/CreateClienteController");
const ListandoClienteController_1 = require("../controllers/createCliente/ListandoClienteController");
const ListandoUmClienteController_1 = require("../controllers/createCliente/ListandoUmClienteController");
const DeletandoClienteController_1 = require("../controllers/createCliente/DeletandoClienteController");
const AtualizarClienteController_1 = require("../controllers/createCliente/AtualizarClienteController");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/cliente", CreateClienteController_1.CreateClienteController);
router.get("/clientes", ListandoClienteController_1.ListandoClienteController);
router.get("/cliente/:cpf", ListandoUmClienteController_1.ListandoUmClienteController);
router.delete("/cliente/:cpf", DeletandoClienteController_1.DeletarClienteController);
router.put("/clientes/:cpf", AtualizarClienteController_1.AtualizarClienteController);
