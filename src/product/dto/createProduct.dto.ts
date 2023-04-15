import { ArrayMinSize, IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { ProductFeatureDTO } from './productFeature.dto';
import { ProductImageDTO } from './productImage.dto';
import { Type } from 'class-transformer';

export class CreateProductDTO {
    @IsNotEmpty()
    name: string;
    
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    amount: number;
    
    @IsNumber()
    quantity: number;
    
    @IsNotEmpty()
    description: string;
    
    @ValidateNested()
    @IsArray()
    @ArrayMinSize(2)
    @Type(() => ProductFeatureDTO)
    features: ProductFeatureDTO[];
    
    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ProductImageDTO)
    images: ProductImageDTO[];
    
    @IsNotEmpty()
    category: string;

    @IsDateString()
    createdDate: Date;
    
    @IsOptional()
    @IsDateString()
    updateDate: Date;
  }