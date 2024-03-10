import { Module } from '@nestjs/common';
import { FavsController } from 'src/routes/favs/favs.controller';
import { FavsService } from 'src/routes/favs/favs.service';

@Module({
  imports: [],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
