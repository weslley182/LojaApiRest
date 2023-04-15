import { IsNotEmpty } from 'class-validator';

export class ProductFeatureDTO {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    description: string;
}