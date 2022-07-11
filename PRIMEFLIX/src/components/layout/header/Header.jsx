import styles from './Header.module.css'

export default function Header({background}){
    return(
        <header className={background ? styles.black: ''}>
            <span className={styles.word}><span className={styles.firstword}>PRIME</span>FLIX</span>
            <i className="fa-solid fa-user"></i>
        </header>
    )
}