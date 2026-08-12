
import { useState } from 'react';
import styles from './TaskItem.module.css';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';


function TaskItem({ task, onToggleTask, onDeleteTask, onEditTask }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
};

    const[isEditing, setIsEditing] = useState(false);
    const [draftText, setDraftText] = useState(task.text);  

    function handleSave() {
        const trimmedText = draftText.trim();
        if (trimmedText) {
            onEditTask(task.id, trimmedText);
            setIsEditing(false);
        } 
    }
    const priorityClass = {
    high: styles.priorityHigh,
    medium: styles.priorityMedium,
    low: styles.priorityLow,
    }[task.priority]; 

    return (    
        <div ref={setNodeRef} style={style} className={styles.taskItem}>
             <span className={styles.dragHandle} {...attributes} {...listeners}>⠿</span>

             <input 
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
            />

            {isEditing ? (
                <input 
                    type="text"
                    value={draftText}
                    onChange={(e) => setDraftText(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    autoFocus
                />
            ) : (
                <span
                    className={task.completed ? styles.completedText : styles.text}
                    onDoubleClick={() => { console.log('Double clicked'); setIsEditing(true); }}
                >
                    {task.text}
                </span>
            )}
            <span className={`${styles.priority} ${priorityClass}`}>{task.priority}</span>
            <button onClick={() => onDeleteTask(task.id)}>Удалить</button>
        </div>
    );
}

export default TaskItem;

