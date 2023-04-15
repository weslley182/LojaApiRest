import { IsNotEmpty, IsUrl } from 'class-validator';

export class ProductImageDTO {
    @IsUrl()
    url: string;
    
    @IsNotEmpty()
    description: string;
}