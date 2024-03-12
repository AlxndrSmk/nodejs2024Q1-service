import { v4 as uuidv4 } from 'uuid';
import { Album } from 'src/routes/album/models';
import { Artist } from 'src/routes/artist/models';
import { CreateUserDto } from 'src/routes/user/models';
import { Favorites } from 'src/types/types';
import User from 'src/routes/user/entities/user.entity';
import { validate as uuidValidate } from 'uuid';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from 'src/routes/track/dto/create-track.dto';
import { Track } from 'src/routes/track/entities/track.entity';

class Database {
  users: User[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  favs: Favorites[] = [];

  constructor() {
    this.users = [];
    this.artists = [];
    this.tracks = [];
    this.albums = [];
    this.favs = [];
  }

  getUsers() {
    return this.users;
  }

  addUser(createUserDto: CreateUserDto) {
    const newUser = new User(createUserDto);
    this.users.push(newUser);
    const response = { ...newUser };
    delete response.password;
    return response;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  deleteUser(id: string) {
    if (!uuidValidate(id))
      throw new BadRequestException('userId is not a valid uuid');

    const userIndex = this.users.findIndex((user: User) => user.id === id);
    if (userIndex === -1)
      throw new NotFoundException(`User with ID ${id} not found`);

    this.users = this.users.filter((user) => user.id !== id);
  }

  addTrack(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;

    const newTrack = new Track();
    newTrack.id = uuidv4();
    newTrack.name = name;
    newTrack.duration = duration;
    newTrack.artistId = uuidValidate(artistId) ? artistId : null;
    newTrack.albumId = uuidValidate(albumId) ? albumId : null;
    this.tracks.push(newTrack);

    return newTrack;
  }
}

export default Database;
