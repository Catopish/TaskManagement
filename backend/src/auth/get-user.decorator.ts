//NOTE: buat extract user dari token

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { user } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): user => {
    //NOTE: extract user dari req body
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
