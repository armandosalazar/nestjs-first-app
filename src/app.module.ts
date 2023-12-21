import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { LowdbService } from './lowdb/lowdb.service';

@Module({
  imports: [TasksModule, UsersModule], // Permite importar otros módulos
  controllers: [], // Permite importar controladores: Se definen las rutas con las que cuenta este módulo.
  providers: [LowdbService], // Permite importar servicios
})
export class AppModule {}
