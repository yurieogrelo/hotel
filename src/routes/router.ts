import { Router } from "express";
import { CreateClienteController } from "../controllers/createCliente/CreateClienteController";
import { ListandoClienteController } from "../controllers/createCliente/ListandoClienteController";
import { ListandoUmClienteController } from "../controllers/createCliente/ListandoUmClienteController";
import { DeletarClienteController } from "../controllers/createCliente/DeletandoClienteController";
import { AtualizarClienteController } from "../controllers/createCliente/AtualizarClienteController";


const router = Router();



router.post("/cliente", CreateClienteController );
router.get("/clientes", ListandoClienteController );
router.get("/cliente/:cpf", ListandoUmClienteController );
router.delete("/cliente/:cpf", DeletarClienteController);
router.put("/clientes/:cpf", AtualizarClienteController);




export { router };
