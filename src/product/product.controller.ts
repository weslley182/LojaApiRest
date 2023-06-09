import { Body, Controller, Post, Get } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/createProduct.dto';

@Controller('/products')
export class ProductController{
    constructor(private _productRepository: ProductRepository) {}

    @Post()
    async createProduct(@Body() product: CreateProductDTO) {
        this._productRepository.save(product);
        return product;
    }

    @Get()
    async listProduct() {
        return this._productRepository.list();
    }
}