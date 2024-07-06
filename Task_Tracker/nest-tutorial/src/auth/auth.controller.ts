import { Body, Controller , Post, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto/auth.dto';
import { SigninDto } from 'src/dto';
@Controller({
})
export class AuthController {
    constructor(private authService:AuthService){}
    @Post("/signup")
    signup(@Body() dto:AuthDto){
        this.authService.signup(dto);
    }
    
    @Post("/signin")
    signin(@Body() dto:SigninDto){
        return this.authService.signin(dto);
    }
}
