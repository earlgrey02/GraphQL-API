import { Field, InputType, PartialType, PickType } from '@nestjs/graphql'
import { MinLength, MaxLength, Matches } from 'class-validator'

@InputType()
class UserDTO {
  @MinLength(8)
  @MaxLength(20)
  @Field()
  username: string

  @MinLength(8)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/)
  @Field()
  password: string
}

@InputType()
class CreateUserDTO extends UserDTO {}

@InputType()
class UpdateUserDTO extends PartialType(UserDTO) {}

@InputType()
class AuthenticateUserDTO extends PickType(UserDTO, [
  'username',
  'password',
] as const) {}

export { CreateUserDTO, UpdateUserDTO, AuthenticateUserDTO }
