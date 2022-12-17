import React, { Attributes, FC } from "react";
import "./todo-item.css";
import { ITodoItem } from '../../interfaces/ITodoItem';
import { ETodoItemStatus } from "../../data-structures/ETodoItemStatus";
import { useAppDispatch } from "../../redux/hooks";
import { TodoActions } from "../../redux/actions/TodoActions";
import { AppText } from "../../constants/AppText";

interface Props extends Attributes {
  todoItem: ITodoItem
}

const TodoItem: FC<Props> = ({ todoItem }) => 
{
  const dispatch = useAppDispatch();
  
    return (
      <div id='Todo'>
        <span style={{ textDecoration: todoItem.status == ETodoItemStatus.MARKED ? 'line-through' : '' }}>{todoItem.body}</span>
        <button className='action-btn' onClick={() => dispatch(TodoActions.updateTodoItemStatus(todoItem.id, ETodoItemStatus.MARKED))}>{AppText.todoItem.mark}</button>
        <button className='action-btn' onClick={() => dispatch(TodoActions.updateTodoItemStatus(todoItem.id, ETodoItemStatus.IN_TRASH))}>{AppText.todoItem.moveToTrash}</button>
      </div>
    );
};

export default TodoItem;