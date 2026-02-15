import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateGuestbookEntryDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Message is required' })
  @MinLength(1, { message: 'Message is required' })
  @MaxLength(1000, { message: 'Message must not exceed 1000 characters' })
  message: string;
}

export class UpdateGuestbookEntryDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name?: string;

  @IsString()
  @MinLength(1, { message: 'Message is required' })
  @MaxLength(1000, { message: 'Message must not exceed 1000 characters' })
  message?: string;
}

export interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  created_at: string;
  updated_at?: string;
}
