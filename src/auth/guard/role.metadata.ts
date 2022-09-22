import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/enum/enum';

export const RoleMetadata = (...roles: Roles[]) => SetMetadata('roles', roles);