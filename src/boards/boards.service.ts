import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards; // 모든 board를 반환
  }

  getBoardById(id: string): Board {
    const board = this.boards.find((board) => board.id === id); // id에 해당하는 board를 반환

    if (!board) {
      throw new NotFoundException('해당하는 id를 가진 board가 없습니다.');
    }
    return board;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.boards.push(board);
    return board;
  }

  deleteBoard(id: string): void {
    const currentBoard = this.getBoardById(id);

    this.boards = this.boards.filter((board) => board.id !== currentBoard.id);
  }

  updateBoard(
    id: string,
    content: Pick<Board, 'title' | 'description'>,
  ): Board {
    const board = this.getBoardById(id); // id에 해당하는 board를 찾음
    board.title = content.title; // board의 title을 변경
    board.description = content.description; // board의 description을 변경
    board.updatedAt = new Date(); // board의 updatedAt을 변경
    return board; // 변경된 board를 반환
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id); // id에 해당하는 board를 찾음
    board.status = status; // board의 status를 변경
    board.updatedAt = new Date(); // board의 updatedAt을 변경
    return board; // 변경된 board를 반환
  }
}
