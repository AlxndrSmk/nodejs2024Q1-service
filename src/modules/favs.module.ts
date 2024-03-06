import { Module } from '@nestjs/common';
import { FavsController } from 'src/controllers/favs.controller';
import { FavsService } from 'src/providers/favs.service';

@Module({
  imports: [],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
