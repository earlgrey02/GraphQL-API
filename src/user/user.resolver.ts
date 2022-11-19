import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards, UnauthorizedException } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthenticateUserDTO, CreateUserDTO, UpdateUserDTO } from './user.DTO'
import User from './user.entity'
import { GetUser, GqlAuthGuard } from './user.decorator'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  getUsers() {
    return this.userService.findAll()
  }

  @Query(() => User)
  getUser(@Args('id') id: number) {
    return this.userService.findById(id)
  }

  @Query(() => String)
  login(@Args('authenticateUserDTO') authenticateUserDTO: AuthenticateUserDTO) {
    return this.userService.authenticate(authenticateUserDTO)
  }

  @Mutation(() => User)
  createUser(@Args('createUserDTO') createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async updateUser(
    @Args('id') id: number,
    @Args('updateUserDTO') updateUserDTO: UpdateUserDTO,
    @GetUser() user: User,
  ) {
    console.log('dd')
    if (id === user.id) {
      return await this.userService.update(id, updateUserDTO)
    } else {
      throw new UnauthorizedException('권한이 없습니다.')
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  deleteUser(@Args('id') id: number, @GetUser() user: User) {
    if (id === user.id) {
      return this.userService.delete(id)
    } else {
      throw new UnauthorizedException('권한이 없습니다.')
    }
  }
}
