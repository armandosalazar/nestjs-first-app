import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule], // Permite importar otros módulos
  controllers: [AppController], // Permite importar controladores: Se definen las rutas con las que cuenta este módulo.
  providers: [AppService], // Permite importar servicios
})
export class AppModule {}
