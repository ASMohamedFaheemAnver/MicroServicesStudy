import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvKeys } from '../constants/strings';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(EnvKeys.MONGODB_URI),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
