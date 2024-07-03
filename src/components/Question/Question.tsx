import QuestionModel from "@/model/question";
import styles from "./Question.module.css";
import QuestionStatement from "../QuestionStatement/QuestionStatement";
import Answer from "../Answer/Answer";
import Timer from "../Timer/Timer";

const letters = [
	{ value: "A", color: "#f2c866" },
	{ value: "B", color: "#f266ba" },
	{ value: "C", color: "#85d4f2" },
	{ value: "D", color: "#bce596" },
];
interface QuestionPropos {
	question: QuestionModel;
	timeToAnswer?: number;
	onAnswer: (index: number) => void;
	onTimerEnd: () => void;
}

export default function Question(props: QuestionPropos) {
	const question = props.question;

	function renderAnswer() {
		return question.answers.map((answer, index) => {
			return (
				<Answer
					key={`${question.id} - ${index}`}
					answer={answer}
					index={index}
					letter={letters[index].value}
					letterBackgroundColor={letters[index].color}
					onResponse={props.onAnswer}
				/>
			);
		});
	}

	return (
		<div className={styles.question}>
			<QuestionStatement text={question.qStatement} />

			<Timer 
				key={question.id}
				duration={props.timeToAnswer ?? 10} 
				onTimerEnd={props.onTimerEnd}/>

			{renderAnswer()}
		</div>
	);
}
