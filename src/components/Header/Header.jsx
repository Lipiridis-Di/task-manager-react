import styles from './Header.module.css';

function Header({ theme, onToggleTheme }) {
    return (
        <header className={styles.header}>
            <h1>Task Manager</h1>
            <button onClick={onToggleTheme} className={styles.themeButton}>
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </header>
    );
}

export default Header;
