import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto/entities/produto.entity';
import { ProdutoModule } from './produto/produto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_lojagames',
      entities: [Produto, Categoria],
      synchronize: true,
      bigNumberStrings: false,
    }),
    ProdutoModule,
    CategoriaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
