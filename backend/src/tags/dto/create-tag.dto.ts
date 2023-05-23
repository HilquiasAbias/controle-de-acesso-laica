import { IsHexadecimal, IsNotEmpty, IsNumber, IsNumberString, IsString, IsTaxId, Length } from "class-validator"

export class CreateTagDto {
    @IsHexadecimal()
    @IsNotEmpty()
    @Length(8, 16)
    content: string
    
    @IsNumber()
    userId: number
}
