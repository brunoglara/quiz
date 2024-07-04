import Question from "@/components/Question/Question";
import questions from "./api/qustionsDB";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import Questionnaire from "@/components/Questionnaire/Questionnaire";
import QuestionModel from "@/model/question";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

export default function Home() {
	
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
	const router = useRouter();

	const [currentQuestion, setCurrentQuestion] = useState<QuestionModel>();
	const [idsQuestions, SetIdsQuestions] = useState<number[]>([]);
	const [correctAnswers, setCorrectAnswers] = useState<number>(0);

	useEffect(() => {
		loadQuestionsIds();
	}, []);
	useEffect(() => {
		if (idsQuestions.length > 0) {
			loadQuestion(idsQuestions[0]);
		}
	}, [idsQuestions]);

	async function loadQuestionsIds() {
		const resp = await fetch(`${BASE_URL}/questionnaire`);
		const ids = await resp.json();
		SetIdsQuestions(ids);
	}
	async function loadQuestion(id: number) {
		const resp = await fetch(`${BASE_URL}/questions/${id}`);
		const jsonQuestion = await resp.json();

		setCurrentQuestion(QuestionModel.fromObject(jsonQuestion));
	}
	function nextQuestionId() {
		if (currentQuestion) {
			const nextId = idsQuestions.indexOf(currentQuestion.id) + 1;
			return idsQuestions[nextId];
		}
	}

	function onAnswer(question: QuestionModel) {
		setCurrentQuestion(question);
		if (question.isCorrect) {
			setCorrectAnswers(correctAnswers + 1);
		}
	}

	function nextStep() {
		const nextId = nextQuestionId();
		if (nextId) {
			loadQuestion(nextId);
		} else {
			finished();
		}
	}

	function finished() {
		router.push({
			pathname: "/result",
			query: {
				totalQuestions: idsQuestions.length,
				correctAnswers,
			},
		});
	}

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
			}}
		>
			{!currentQuestion ? (
				<ClipLoader color="#000" size={150} />
			) : (
				<Questionnaire
					question={currentQuestion}
					lastQuestion={nextQuestionId() === undefined}
					onAnswer={onAnswer}
					nextStep={nextStep}
				/>
			)}
		</div>
	);
}
