import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * GET /api/profile
   * Get profile information
   */
  @Get()
  getProfile(): Profile {
    return this.profileService.getProfile();
  }
}
