import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductFeatureDTO } from './productFeature.dto';
import { ProductImageDTO } from './productImage.dto';

export class CreateProductDTO {
    @IsUUID(undefined, { message: 'User Id is invalid' })
    userId: string;

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