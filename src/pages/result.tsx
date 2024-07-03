import { useRouter } from "next/router";
import styles from "../styles/result.module.css";
import Statistics from "@/components/Statistics/Statistics";
import Button from "@/components/Button/Button";

export default function Result() {
	const router = useRouter();

	const totalQuestions: number = parseInt(
		router.query.totalQuestions as string
	);
	const correctAnswers: number = parseInt(
		router.query.correctAnswers as string
	);

	const percent = Math.round((correctAnswers / totalQuestions) * 100);

	return (
		<div className={styles.result}>
			<h1>Final Result</h1>
			<div
				style={{
					display: "flex",
				}}
			>
				<Statistics text="Questions" value={totalQuestions} />
				<Statistics
					text="Correct Answers"
					value={correctAnswers}
					backgroundColor="#9cd2a4"
				/>
				<Statistics
					text="Percentual"
					value={`${percent}%`}
					backgroundColor={
						percent <= 50
							? "#de6a33"
							: percent <= 70
							? "#f7dc6f"
							: "#9cd2a4"
					}
				/>
			</div>
            <Button href="/" text="Try Again" />
		</div>
	);
}
