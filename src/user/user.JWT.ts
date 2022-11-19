import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from 'typeorm'
import User from './user.entity'

export default class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate(payload: { id: number }): Promise<User> {
    const user = this.userRepository.findOneBy({ id: payload.id })
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 유저입니다.')
    } else {
      return user
    }
  }
}
