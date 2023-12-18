import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, jwtConstants } from "passport-jwt"
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor( config: ConfigService, private prisma: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get('JWT_SECRET')
		})
	}
	async validate(payload: {
		sub: number,
		email: string
	}) {
		const user = await this.prisma.user.findUnique({
			where:{
				id: payload.sub,
			}
		});
		delete user.hash;
		// console.log(payload)
		return user;
	}
}