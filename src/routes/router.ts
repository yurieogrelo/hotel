import { Router } from "express";
import { CreateClienteController } from "../controllers/createCliente/CreateClienteController";
import { ListandoClienteController } from "../controllers/createCliente/ListandoClienteController";
import { ListandoUmClienteController } from "../controllers/createCliente/ListandoUmClienteController";


const router = Router();



router.post("/cliente", CreateClienteController );
router.get("/clientes", ListandoClienteController );
router.get("/cliente", ListandoUmClienteController );




export { router };
