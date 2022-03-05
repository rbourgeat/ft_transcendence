import { Controller, Get, Post, UseGuards, Res, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth42Guard } from 'src/auth/42auth/guard/42auth.guard';
import { Auth42Service } from './42auth.service';

@ApiTags('42auth')
@Controller('api/42auth')
export class Auth42Controller {
    constructor(
        private readonly auth42Service: Auth42Service
    ) { }

    @ApiOperation({ summary: 'login with 42 API' })
    @UseGuards(Auth42Guard)
    @Get('login')
    async login() { }

    @ApiOperation({ summary: 'Redirection to front home page after 42 authentication' })
    @Get('redirect')
    @UseGuards(Auth42Guard)
    //async redirect(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    async redirect() {
        // const login = req.user['login'];
        //let auth: boolean = false;
        //const payload: JwtPayload = { login, auth };
        //const accessToken: string = await this.jwtService.sign(payload);
        //res.cookie('jwt', accessToken, { httpOnly: true });
        //res.redirect(process.env.IP_BACKEND);
        console.log('in redirect of 42auth');
    }
}
