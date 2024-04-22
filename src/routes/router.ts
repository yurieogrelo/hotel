import { Router } from "express";
import { CreateClienteController } from "../controllers/createCliente/CreateClienteController";
import { ListandoClienteController } from "../controllers/createCliente/ListandoClienteController";
import { ListandoUmClienteController } from "../controllers/createCliente/ListandoUmClienteController";
import { DeletarClienteController } from "../controllers/createCliente/DeletandoClienteController";


const router = Router();



router.post("/cliente", CreateClienteController );
router.get("/clientes", ListandoClienteController );
router.get("/cliente/:consumidor", ListandoUmClienteController );
router.delete("/cliente", DeletarClienteController);




export { router };
