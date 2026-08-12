
import { DndContext, closestCenter } from '@dnd-kit/core';
import {SortableContext,verticalListSortingStrategy,arrayMove} from '@dnd-kit/sortable';
import { useState, useEffect } from 'react';
import Filters from './components/Filters/Filters';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import TaskList from './components/TaskList/TaskList';
import TaskCounter from './components/TaskCounter/TaskCounter';
import styles from './App.module.css';
import Header from './components/Header/Header';




function App() {
    const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
    
    const [filter, setFilter] = useState('all'); // добавляем новый state

    const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // filter === 'all' — показываем всё
});

    const [theme , setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
});

useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}, [theme]);

    function toggleTheme() {
     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }

 
    
    function addTask(text, priority) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false,
            priority,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    function editTask(id, newText) {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, text: newText } : task
            )
        );
    }

     function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
        setTasks((prevTasks) => {
            const oldIndex = prevTasks.findIndex((task) => task.id === active.id);
            const newIndex = prevTasks.findIndex((task) => task.id === over.id);
            return arrayMove(prevTasks, oldIndex, newIndex);
        });
    }
}


    function toggleTask(id) {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }

    function deleteTask(id) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }

    return (
      <div className={styles.app}>
        <Header theme={theme} onToggleTheme={toggleTheme} />
            <AddTaskForm onAddTask={addTask} />
            <Filters filter={filter} onChangeFilter={setFilter} />
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={filteredTasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
                <TaskList tasks={filteredTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} onEditTask={editTask} />
              </SortableContext>
            </DndContext>
            <TaskCounter tasks={tasks} />
        </div>
    );

    
}





export default App;