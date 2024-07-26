import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { CategoriaModule } from "../categoria/categoria.module";


@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
    providers:[],
    controllers:[],
    exports:[]
})
export class ProdutoModule {}