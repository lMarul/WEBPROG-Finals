import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import {
  CreateGuestbookEntryDto,
  UpdateGuestbookEntryDto,
  GuestbookEntry,
} from './dto';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  /**
   * GET /api/guestbook
   * Get all guestbook entries
   */
  @Get()
  async findAll(): Promise<GuestbookEntry[]> {
    return this.guestbookService.findAll();
  }

  /**
   * GET /api/guestbook/count
   * Get total count of entries
   */
  @Get('count')
  async count(): Promise<{ count: number }> {
    const count = await this.guestbookService.count();
    return { count };
  }

  /**
   * GET /api/guestbook/:id
   * Get a single guestbook entry
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<GuestbookEntry> {
    return this.guestbookService.findOne(id);
  }

  /**
   * POST /api/guestbook
   * Create a new guestbook entry
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateGuestbookEntryDto): Promise<GuestbookEntry> {
    return this.guestbookService.create(dto);
  }

  /**
   * PUT /api/guestbook/:id
   * Update an existing guestbook entry
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGuestbookEntryDto,
  ): Promise<GuestbookEntry> {
    return this.guestbookService.update(id, dto);
  }

  /**
   * DELETE /api/guestbook/:id
   * Delete a guestbook entry
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.guestbookService.delete(id);
  }
}
