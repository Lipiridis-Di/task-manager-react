import styles from './Filters.module.css';


function Filters({ filter, onChangeFilter }) {
    return (
        <div className={styles.filters}>
            <button
                className={filter === 'all' ? styles.active : ''}
                onClick={() => onChangeFilter('all')}
            >
                Все
            </button>
            <button
                className={filter === 'active' ? styles.active : ''}
                onClick={() => onChangeFilter('active')}
            >
                Активные
            </button>
            <button
                className={filter === 'completed' ? styles.active : ''}
                onClick={() => onChangeFilter('completed')}
            >
                Выполненные
            </button>
        </div>
    );
}

export default Filters;
