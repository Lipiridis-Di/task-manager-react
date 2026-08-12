import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';

function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask }) {
    return (
        <div className={styles.taskList}>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleTask={onToggleTask}
                    onDeleteTask={onDeleteTask}
                    onEditTask={onEditTask}
                />
            ))}
        </div>
    );
}

export default TaskList;