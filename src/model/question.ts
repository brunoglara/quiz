import { shufflesArray } from "@/function/arrays";
import AnswerModel from "./answer";

export default class QuestionModel {
	#id: number;
	#qStatement: string;
	#answers: AnswerModel[];
	#isCorrect: boolean;
	#answered: boolean
	constructor(
		id: number,
		qStatement: string,
		answers: AnswerModel[],
		isCorrect = false,
		answered = false
	) {
		this.#id = id;
		this.#qStatement = qStatement;
		this.#answers = answers;
		this.#isCorrect = isCorrect;
		this.#answered = answered
	}

	public get id(): number {
		return this.#id;
	}

	public get qStatement(): string {
		return this.#qStatement;
	}

	public get answers(): any[] {
		return this.#answers;
	}

	public get isCorrect(): boolean {
		return this.#isCorrect;
	}

	public get answered(): boolean {
		for (let answer of this.#answers) {
			if (answer.revealed) {
				return true;
			}
		}
		return false;
	}

	chooseAnswer(index: number) {
		const correctAnswer = this.#answers[index]?.isCorrect;
		const answers = this.#answers.map((answer, i) => {
			const answerSelected = index === i;

			// const shouldRevealAnswer = answerSelected; Does not reveal correct answer
			const shouldRevealAnswer = answerSelected || answer.isCorrect;

			if (shouldRevealAnswer) {
				return answer.reveal();
			} else {
				return answer;
			}
		});

		return new QuestionModel(
			this.#id,
			this.#qStatement,
			answers,
			correctAnswer
		);
	}

	shuffleAnswers(): QuestionModel {
		const answersShuffled = shufflesArray(this.#answers);
		return new QuestionModel(
			this.#id,
			this.#qStatement,
			answersShuffled,
			this.#isCorrect
		);
	}

	toLiteralObject() {
		return {
			id: this.#id,
			qStatement: this.#qStatement,
			answers: this.#answers.map((resp) => resp.toObject()),
			isCorrect: this.#isCorrect,
			answered: this.answered
		};
	}

	static fromObject(model: QuestionModel): QuestionModel {
		const answers = model.answers.map((resp) => AnswerModel.fromObject(resp))
		return new QuestionModel(model.id, model.qStatement, answers, model.isCorrect, model.answered)
	}
}
