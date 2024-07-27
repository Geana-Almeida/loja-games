import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import {  DeleteResult, MoreThanOrEqual, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/service/categoria.service";
import { Min, MIN, min } from "class-validator";



@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService 
    ){ }


    async findAll(): Promise<Produto[]>{
        return await this.produtoRepository.find({
            relations:{
                categoria: true
            }
        })
    }

    async findById(id: number): Promise<Produto>{
        
        let buscaProduto = await this.produtoRepository.findOne({
            where:{
                id
            },
            relations:{
                categoria: true
            }
        })

        if(!buscaProduto){
            throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND);
        }

        return buscaProduto;
    }

    async create(produto: Produto): Promise<Produto> {

        if(produto.categoria){
            let categoria = await this.categoriaService.findById(produto.categoria.id)

            if(!categoria){
                throw new HttpException("Tema não foi encontrado", HttpStatus.NOT_FOUND)
            }

            else{
                return await this.produtoRepository.save(produto)
            }
        }
    }

    async update(produto: Produto): Promise<Produto>{
        let buscaProduto = await this.findById(produto.id);

        if(!buscaProduto || !produto.categoria.id){
            throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND)
        }

        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult>{
        let buscaProduto = await this.findById(id);

        if(!buscaProduto){
            throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND)
        }

        return await this.produtoRepository.delete(id);
    }

    async findByProdutoBiggerValueTyped(valor: number): Promise<Produto[]>{
        let precoASC = await this.produtoRepository.find({
            order:{
                preco: 'asc'
            },
        })

        let produtosValorAcimaDigitado = []

        precoASC.filter((produto) => {
            
            if(produto.preco > valor){
                produtosValorAcimaDigitado.push(produto)
            }
        })

        return produtosValorAcimaDigitado
    }

    async findByProdutoSmallerValueTyped(valor: number): Promise<Produto[]>{
        let precoDesc = await this.produtoRepository.find({
            order:{
                preco: 'desc'
            },
        })

        let produtosValorAbaixoDigitado = []

        precoDesc.filter((produto) => {
            
            if(produto.preco < valor){
                produtosValorAbaixoDigitado.push(produto)
            }
        })

        return produtosValorAbaixoDigitado
    }

}