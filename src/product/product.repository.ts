import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
    private product = [];
    
    async save(product) {
        this.product.push(product);
    }
    
    async list() {
        return this.product;
    }


}