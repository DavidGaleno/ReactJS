import styles from './Button.module.css'

export default function Button({text,className}){
    return(
        <button className={styles[className]}>{text}</button>
    )
}