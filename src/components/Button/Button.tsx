import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
	href?: string;
	text: string;
	onClick?: (e: any) => void;
}

export default function Button(props: ButtonProps) {
    function renderButton () {
        return (
        <button 
            onClick={props.onClick} 
            className={styles.button}>
            {props.text}
        </button>
        )

    }
   
        return props.href ? (
            <Link href={props.href}>
                {renderButton()}
            </Link>
        )
        : renderButton()

}
