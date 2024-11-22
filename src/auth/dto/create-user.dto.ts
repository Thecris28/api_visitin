import { IsEmail, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";
import { Unique } from "typeorm";

export class CreateUserDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(3)@MinLength(3)
    lastname: string;

    @IsString()
    @IsEmail()
    @Unique(['email'])
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    rol: string;

}