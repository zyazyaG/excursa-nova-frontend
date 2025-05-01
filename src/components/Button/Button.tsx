import styles from './Button.module.css';


type ButtonProps = {
    variant?: 'primary' | 'secondary' | "third";
    style?:React.CSSProperties;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';

};

const Button = ({variant ='primary', children, className='', disabled=false, onClick, type='button', style} : ButtonProps) => {

    const baseButton = `${styles.base} ${variant === 'primary' ? styles.primary : variant === 'secondary' ? styles.secondary : ""}` +
                        `${disabled ? `${styles.disabled}`: ''}` + 
                        `${className ? `${className}` : ''}`;

    return <button className={baseButton} disabled = {disabled} onClick={onClick} type = {type} style={style}> { children } </button>

};
export default Button;