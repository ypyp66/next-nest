import {
  ArgumentMetadata,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly statusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value);
    console.log('metadata', metadata);

    value = value.toUpperCase();

    if (!this.checkStatusValid(value)) {
      throw new BadRequestException(`${value}는 유효한 상태가 아닙니다.`);
    }

    return value;
  }

  private checkStatusValid(status: any) {
    const idx = this.statusOptions.indexOf(status);
    return idx !== -1;
  }
}
