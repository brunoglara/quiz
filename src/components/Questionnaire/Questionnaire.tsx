import QuestionModel from "@/model/question";
import styles from "./Questionnaire.module.css";
import Question from "../Question/Question";
import Button from "../Button/Button";

interface QuestionnaireProps {
	question: QuestionModel;
	lastQuestion: boolean;
	onAnswer: (question: QuestionModel) => void;
	nextStep: () => void;
}

export default function Questionnaire(props: QuestionnaireProps) {
	function onAnswer(index: number) {
        if(!props.question.answered){
            props.onAnswer(props.question.chooseAnswer(index))  
        }
    }

	return (
		<div className={styles.questionnaire}>
			{props.question ? (
				<>
					<Question
						question={props.question}
						timeToAnswer={10}
						onAnswer={onAnswer}
						onTimerEnd={props.nextStep}
					/>

					<Button
						text={props.lastQuestion ? "Finish" : "Next"}
						onClick={props.nextStep}
					/>
				</>
			) : (
				false
			)}
		</div>
	);
}
