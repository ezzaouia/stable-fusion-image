import { Controller, Get, Param } from '@nestjs/common';

import { IconsService } from './icons.service';
import { mapIconsResult, mapIconResult } from './util';

@Controller('icons')
export class IconsController {
  constructor(private readonly iconsService: IconsService) {}

  @Get('ping')
  async ping(): Promise<any> {
    return { ok: 'pong' };
  }

  @Get('search/:term')
  async getByTerm(@Param('term') term: string): Promise<any> {
    
    const response = await this.iconsService.getByTerm(term).toPromise();

    console.log("Generated : ",response);

    return response.data;
  }

  @Get('download/:id')
  async getById(@Param('id') id: string): Promise<any> {
    const response = await this.iconsService.getById(id).toPromise();
    const mappedRes = mapIconResult(response.data);
    const filename = await this.iconsService.downloadIcon(mappedRes);

    console.log('download/:id', filename);

    return filename;
  }
}
