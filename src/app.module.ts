import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule], // Permite importar otros módulos
  controllers: [], // Permite importar controladores: Se definen las rutas con las que cuenta este módulo.
  providers: [], // Permite importar servicios
})
export class AppModule {}
