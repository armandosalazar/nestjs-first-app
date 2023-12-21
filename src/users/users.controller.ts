import { Controller, Get } from '@nestjs/common';
import User from './user.entity';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(): User {
    const user: User = {
      id: 1,
      username: 'john',
      password: 'changeme',
    };

    return user;
  }
}
