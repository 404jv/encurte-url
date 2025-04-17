import { Module } from '@nestjs/common';
import { AuthGuard } from './jwt-auth.guard';
import { GetIdAuthGuard } from './get-id-auth.guard';

@Module({
  providers: [AuthGuard, GetIdAuthGuard],
  exports: [AuthGuard, GetIdAuthGuard],
})
export class AuthModule {}
