import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { CategoriaModule } from "../categoria/categoria.module";
import { ProdutoService } from "./services/produto.service";
import { ProdutoController } from "./controller/produto.controller";
import { CategoriaService } from "../categoria/service/categoria.service";


@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
    providers:[ProdutoService, CategoriaService],
    controllers:[ProdutoController],
    exports:[TypeOrmModule]
})
export class ProdutoModule {}