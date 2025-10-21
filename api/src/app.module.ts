import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TareaModule } from './tareas/tarea.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './tareas/entities/tarea.entity';
import { Usuario } from './usuarios/entities/usuario.entity';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "dsm43",
        entities: [ Tarea ],
        synchronize: true,
        autoLoadEntities: true,
    }),
    TypeOrmModule.forRoot({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "magr574",
        database: "dsm43",
        entities: [ Usuario ],
        synchronize: true,
        autoLoadEntities: true,
    }),
    TareaModule,
    UsuariosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
