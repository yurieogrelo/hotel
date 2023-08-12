import { Router } from "express";
import { CreateEmpresaController } from "../controllers/createEmpresa/CreateEmpresaController";
import { ListandoEmpresaController } from "../controllers/createEmpresa/ListandoEpresaController";
import { DeletarEmpresaController } from "../controllers/createEmpresa/DeletandoEmpresaController";
import { AtualizandoEmpresaController } from "../controllers/createEmpresa/AtualizandoEmpresaController";
import { CreateClienteController } from "../controllers/createCliente/CreateClienteController";
import { ListandoClienteController } from "../controllers/createCliente/ListandoClienteController";
import { ListandoUmaEmpresaController } from "../controllers/createEmpresa/ListandoUmaEmpresaController";
import { ListandoUmClienteController } from "../controllers/createCliente/ListandoUmClienteController";
import { AtualizandoClienteController } from "../controllers/createCliente/AtualizandoClienteController";
import { DeletarClienteController } from "../controllers/createCliente/DeletandoClienteController";
import { CreateOrcamentoController } from "../controllers/createOrcamento/CreateOrcamentoController";
import { ListandoOrcametntoController } from "../controllers/createOrcamento/ListandoOrcamentoController";
import { ListandoUmOrcamentoController } from "../controllers/createOrcamento/ListandoUmOrcamentoController";
import { DeletarOrcamentoController } from "../controllers/createOrcamento/DeletandoOrcamentoController";
import { AtualizandoOrcamentoController } from "../controllers/createOrcamento/AtualizandoOrcamentoController";
import { CreateItemController } from "../controllers/createItem/CreateItemController";
import { ListandoItemController } from "../controllers/createItem/ListandoItemController";
import { ListandoUmItemController } from "../controllers/createItem/ListandoUmItemController";
import { DeletarItemController } from "../controllers/createItem/DeletandoItemController";
import { AtualizandoItemController } from "../controllers/createItem/AtualizandoItemController";
import { CreateCidadeController } from "../controllers/createCidade/CreateCidadeController";
import { CreateEstadoController } from "../controllers/createEstado/CreateEstadoController";
import { ListandoCidadeController } from "../controllers/createCidade/ListandoCidadeController";
import { ListandoUmaCidadeController } from "../controllers/createCidade/ListandoUmCidadeController";
import { DeletarCidadeController } from "../controllers/createCidade/DeletandoCIdadeController";
import { AtualizandoCidadeController } from "../controllers/createCidade/AtualizandoCidadeController";
import { ListandoEstadoController } from "../controllers/createEstado/ListandoEstadoController";
import { ListandoUmEstadoController } from "../controllers/createEstado/ListandoUmEstadoController";
import { DeletarEstadoController } from "../controllers/createEstado/DeletandoCIdadeController";
import { AtualizandoEstadoController } from "../controllers/createEstado/AtualizandoCidadeController";
import { AuthMiddlewares } from "../controllers/middlewares/auth";
import { AuthController } from "../controllers/authtoken/AuthController";

const router = Router();

router.post("/empresa", CreateEmpresaController );
router.get("/empresas", AuthMiddlewares, ListandoEmpresaController );
router.get("/empresa", ListandoUmaEmpresaController );
router.put("/empresa", AtualizandoEmpresaController);
router.delete("/empresa", DeletarEmpresaController);
router.post("/auth", AuthController);

router.post("/cliente", CreateClienteController );
router.get("/clientes", ListandoClienteController );
router.get("/cliente", ListandoUmClienteController );
router.put("/cliente", AtualizandoClienteController);
router.delete("/cliente", DeletarClienteController);

router.post("/orcamento", CreateOrcamentoController );
router.get("/orcamentos", ListandoOrcametntoController );
router.get("/orcamento", ListandoUmOrcamentoController );
router.delete("/orcamento", DeletarOrcamentoController);
router.put("/orcamento", AtualizandoOrcamentoController);

router.post("/item", CreateItemController );
router.get("/itens", ListandoItemController );
router.get("/item", ListandoUmItemController );
router.delete("/item", DeletarItemController);
router.put("/item", AtualizandoItemController);

router.post("/cidade", CreateCidadeController );
router.get("/cidades", ListandoCidadeController );
router.get("/cidade", ListandoUmaCidadeController );
router.delete("/cidade", DeletarCidadeController);
router.put("/cidade", AtualizandoCidadeController);

router.post("/estado", CreateEstadoController );
router.get("/estados", ListandoEstadoController );
router.get("/estado", ListandoUmEstadoController );
router.delete("/estado", DeletarEstadoController);
router.put("/estado", AtualizandoEstadoController);


export { router };
