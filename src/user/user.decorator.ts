import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import User from './user.entity'

const GetUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const gqlContext = GqlExecutionContext.create(context).getContext()
    return gqlContext.req.user
  },
)

class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext().req
  }
}

export { GetUser, GqlAuthGuard }
