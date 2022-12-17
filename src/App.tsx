import React from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { TodoActions } from './redux/actions/TodoActions';
import { useEffect } from 'react';
import TodoItem from './components/todo/TodoItem';
import { AppText } from './constants/AppText';
import { Configuration } from './constants/Configuration';


function App() {
    const dispatch = useAppDispatch();

    const { todos } = useAppSelector((state) => state.todo.ui);

    // Initialize App
    useEffect(() => 
    {
        // Read data from somewhere
        dispatch(TodoActions.addTodoItem('Clean the house'));
        dispatch(TodoActions.addTodoItem('Prepare to Gym'));
        dispatch(TodoActions.addTodoItem('Search how to center a <div>'));
    }, []);

    const [todoItemBody, setTodoItemBody] = React.useState('');
  
    const onAddTodoItemButtonClick = () => {
        if (!todoItemBody) 
        return;

        dispatch(TodoActions.addTodoItem(todoItemBody));
        setTodoItemBody('');
    };

    const onRestoreFromTrashButtonClick = () => {
        dispatch(TodoActions.restoreFromTrash())
    }
    
      return (
        <div id="App">
            <h1>{AppText.homePage.todoListApp}</h1>
            <section className='todo-section'>
                <div className='form-container'>
                    <input type="text" value={todoItemBody} onChange={e => setTodoItemBody(e.target.value)}/>
                    <button onClick={onAddTodoItemButtonClick}>{AppText.homePage.addTodo}</button>
                </div>
                {Configuration.restoreFromTrashEnable && <button onClick={onRestoreFromTrashButtonClick}>{AppText.homePage.restoreFromTrash}</button>}
                <div className='todos-list-container'>
                    { todos.map((todo) => (
                        <TodoItem
                        key={todo.id}
                        todoItem={todo}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default App;
