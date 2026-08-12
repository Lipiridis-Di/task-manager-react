import{useState}from 'react';
import styles from'./AddTaskForm.module.css';

function AddTaskForm({onAddTask}){
const[text,setText]=useState('');
const[priority,setPriority]=useState('medium');

function handleSubmit(){
const trimmedText=text.trim();
if (!trimmedText) return;
    onAddTask(trimmedText, priority);
    setText('');
    setPriority('medium');
}


return(
<div className={styles.addTaskForm}>
    <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="новая задача"
    />
    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">низкий</option>
        <option value="medium">средний</option>
        <option value="high">высокий</option>
    </select>
    <button onClick={handleSubmit}>
        Добавить 
    </button>
</div>
);

}
export default AddTaskForm;
