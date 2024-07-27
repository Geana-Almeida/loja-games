import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categoria } from "./entities/categoria.entity";
import { CategoriaService } from "./service/categoria.service";
import { CategoriaController } from "./controller/categoria.controllers";


@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    providers:[CategoriaService],
    controllers:[CategoriaController],
    exports:[TypeOrmModule],
})
export class CategoriaModule {}