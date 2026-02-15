import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Profile } from './dto';

@Injectable()
export class ProfileService {
  constructor(private configService: ConfigService) {}

  /**
   * Get profile information
   * In a real app, this could come from a database or environment variables
   */
  getProfile(): Profile {
    return {
      name: this.configService.get<string>('PROFILE_NAME') || 'Your Name',
      title: this.configService.get<string>('PROFILE_TITLE') || 'Full Stack Developer',
      bio:
        this.configService.get<string>('PROFILE_BIO') ||
        'Welcome to my personal profile! I am a passionate developer who loves building web applications. Feel free to leave a message in my guestbook!',
      avatar: this.configService.get<string>('PROFILE_AVATAR') || undefined,
      email: this.configService.get<string>('PROFILE_EMAIL') || undefined,
      location: this.configService.get<string>('PROFILE_LOCATION') || undefined,
      socialLinks: this.getSocialLinks(),
      skills: this.getSkills(),
    };
  }

  private getSocialLinks() {
    const links = [];
    
    const github = this.configService.get<string>('PROFILE_GITHUB');
    if (github) {
      links.push({ platform: 'GitHub', url: github, icon: 'github' });
    }

    const linkedin = this.configService.get<string>('PROFILE_LINKEDIN');
    if (linkedin) {
      links.push({ platform: 'LinkedIn', url: linkedin, icon: 'linkedin' });
    }

    const twitter = this.configService.get<string>('PROFILE_TWITTER');
    if (twitter) {
      links.push({ platform: 'Twitter', url: twitter, icon: 'twitter' });
    }

    const website = this.configService.get<string>('PROFILE_WEBSITE');
    if (website) {
      links.push({ platform: 'Website', url: website, icon: 'globe' });
    }

    return links;
  }

  private getSkills(): string[] {
    const skillsStr = this.configService.get<string>('PROFILE_SKILLS');
    if (skillsStr) {
      return skillsStr.split(',').map((s) => s.trim());
    }
    return ['JavaScript', 'TypeScript', 'React', 'NestJS', 'Node.js', 'Supabase'];
  }
}
