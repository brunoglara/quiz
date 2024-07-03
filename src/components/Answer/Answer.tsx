import AnswerModel from "@/model/answer";
import styles from "./Answer.module.css";
interface AnswerProps {
	answer: AnswerModel;
	index: number;
	letter: string;
	letterBackgroundColor: string;
	onResponse: (index: number) => void;
}

export default function Answer(props: AnswerProps) {
	const answerRetrieved = props.answer;
	const revealedAnswer = answerRetrieved.revealed
		? styles.answerRevealed
		: "";
	return (
		<div
			className={styles.answer}
			onClick={() => props.onResponse(props.index)}
		>
			<div className={`${revealedAnswer} ${styles.content}`}>
				
				<div className={styles.frontFlip}>
					<div
						className={styles.letter}
						style={{
							backgroundColor: props.letterBackgroundColor,
						}}
					>
						{props.letter}
					</div>

					<div className={styles.textAnswer}>
						{answerRetrieved.value}
					</div>
				</div>

				<div className={styles.backFlip}>
					{answerRetrieved.isCorrect ? (
						<div className={styles.rightAnswer}>
							<div>The right answer is...</div>
							<div className={styles.letter}>
								{answerRetrieved.value}
							</div>
						</div>
					) : (
						<div className={styles.wrongAnswer}>
							<div>The answer is wrong...</div>
							<div className={styles.letter}>
								{answerRetrieved.value}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
