import styles from './TaskCounter.module.css';


function TaskCounter({ tasks }) {
    const activeCount = tasks.filter((task) => !task.completed).length;
    return (
        <div className={styles.TaskCounter}>
            <p> Осталось задач : {activeCount}</p>
        </div>
    );
}

export default TaskCounter;