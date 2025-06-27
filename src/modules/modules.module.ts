import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { ModuleEntity } from './entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity])], // 🟢 Entity bilan bog‘landi
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [TypeOrmModule], // 🟢 Boshqa modullarda ishlatish uchun export qilyapti
})
export class ModulesModule {}