import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
@UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    const userId = req.user.id;
    return this.todoService.create(createTodoDto, userId);
  }

  @Get()
  async findUserTodos(@Req() req) {
    const userId = req.userId;
    return this.todoService.findByUser(userId);
  }

  // @Get()
  // findAll() {
  //   return this.todoService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.todoService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
