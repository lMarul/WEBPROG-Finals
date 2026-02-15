import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import {
  CreateGuestbookEntryDto,
  UpdateGuestbookEntryDto,
  GuestbookEntry,
} from './dto';

@Injectable()
export class GuestbookService {
  private readonly logger = new Logger(GuestbookService.name);
  private readonly tableName = 'guestbook';

  constructor(private supabaseService: SupabaseService) {}

  /**
   * Get all guestbook entries, ordered by newest first
   */
  async findAll(): Promise<GuestbookEntry[]> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from(this.tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        this.logger.error(`Error fetching guestbook entries: ${error.message}`);
        throw new InternalServerErrorException('Failed to fetch guestbook entries');
      }

      return data || [];
    } catch (error) {
      this.logger.error(`Error in findAll: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get a single guestbook entry by ID
   */
  async findOne(id: number): Promise<GuestbookEntry> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new NotFoundException(`Guestbook entry with ID ${id} not found`);
        }
        this.logger.error(`Error fetching guestbook entry: ${error.message}`);
        throw new InternalServerErrorException('Failed to fetch guestbook entry');
      }

      return data;
    } catch (error) {
      this.logger.error(`Error in findOne: ${error.message}`);
      throw error;
    }
  }

  /**
   * Create a new guestbook entry
   */
  async create(dto: CreateGuestbookEntryDto): Promise<GuestbookEntry> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from(this.tableName)
        .insert([
          {
            name: dto.name.trim(),
            message: dto.message.trim(),
          },
        ])
        .select()
        .single();

      if (error) {
        this.logger.error(`Error creating guestbook entry: ${error.message}`);
        throw new InternalServerErrorException('Failed to create guestbook entry');
      }

      this.logger.log(`Created guestbook entry with ID: ${data.id}`);
      return data;
    } catch (error) {
      this.logger.error(`Error in create: ${error.message}`);
      throw error;
    }
  }

  /**
   * Update an existing guestbook entry
   */
  async update(id: number, dto: UpdateGuestbookEntryDto): Promise<GuestbookEntry> {
    try {
      // First check if entry exists
      await this.findOne(id);

      const updateData: Partial<GuestbookEntry> = {};
      if (dto.name) updateData.name = dto.name.trim();
      if (dto.message) updateData.message = dto.message.trim();

      const { data, error } = await this.supabaseService
        .getClient()
        .from(this.tableName)
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        this.logger.error(`Error updating guestbook entry: ${error.message}`);
        throw new InternalServerErrorException('Failed to update guestbook entry');
      }

      this.logger.log(`Updated guestbook entry with ID: ${id}`);
      return data;
    } catch (error) {
      this.logger.error(`Error in update: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete a guestbook entry
   */
  async delete(id: number): Promise<{ message: string }> {
    try {
      // First check if entry exists
      await this.findOne(id);

      const { error } = await this.supabaseService
        .getClient()
        .from(this.tableName)
        .delete()
        .eq('id', id);

      if (error) {
        this.logger.error(`Error deleting guestbook entry: ${error.message}`);
        throw new InternalServerErrorException('Failed to delete guestbook entry');
      }

      this.logger.log(`Deleted guestbook entry with ID: ${id}`);
      return { message: `Guestbook entry with ID ${id} deleted successfully` };
    } catch (error) {
      this.logger.error(`Error in delete: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get total count of guestbook entries
   */
  async count(): Promise<number> {
    try {
      const { count, error } = await this.supabaseService
        .getClient()
        .from(this.tableName)
        .select('*', { count: 'exact', head: true });

      if (error) {
        this.logger.error(`Error counting guestbook entries: ${error.message}`);
        throw new InternalServerErrorException('Failed to count guestbook entries');
      }

      return count || 0;
    } catch (error) {
      this.logger.error(`Error in count: ${error.message}`);
      throw error;
    }
  }
}
