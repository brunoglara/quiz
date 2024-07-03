import styles from "./QuestionStatement.module.css"

interface QuestionStatementProps {
    text: string
}

export default function QuestionStatement(props: QuestionStatementProps) {
return (
    <div className={styles.statement}>
        <div className={styles.text}>
            {props.text}
            
        </div>

    </div>
)
}