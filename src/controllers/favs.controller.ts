import { Controller, Get } from '@nestjs/common';
import { FavsService } from 'src/providers/favs.service';
import { Favorites } from 'src/types/types';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getUsers(): Favorites[] {
    return this.favsService.getFavs();
  }
}
