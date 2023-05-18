import { IsString } from "class-validator"

export class CreateTagDto {
    @IsString()
    content: string
    
    userId: number
}
