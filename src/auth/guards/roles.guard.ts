import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflecter: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredStatuses = this.reflecter.get<string[]>(
      'statuses',
      ctx.getHandler(),
    );

    if (!requiredStatuses) {
      return true;
    }

    const { user } = ctx.switchToHttp().getRequest();
    return requiredStatuses.some((status) => user.status.includes(status));
  }
}
