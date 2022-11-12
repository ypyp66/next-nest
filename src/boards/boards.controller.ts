import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id): Board {
    return this.boardsService.getBoardById(id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe) // << CreateBoardDto에 넣은 validation 체크가 작동함, 핸들러 레벨에서의 체크
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    // @Body에서 dto에 해당하는 부분을 가져옴
    return this.boardsService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id): void {
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id')
  updateBoard(@Param('id', ParseUUIDPipe) id, @Body() createBoardDto) {
    return this.boardsService.updateBoard(id, createBoardDto);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id,
    @Body('status', BoardStatusValidationPipe) status,
  ): Board {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
