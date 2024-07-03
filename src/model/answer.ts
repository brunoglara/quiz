export default class AnswerModel {
	#value: string;
	#isCorrect: boolean;
	#revealed: boolean;

	constructor(value: string, isCorrect: boolean, revealed = false) {
		this.#value = value;
		this.#isCorrect = isCorrect;
		this.#revealed = revealed;
	}

    static correct(value: string){
        return new AnswerModel(value, true)
    }

    static wrong(value: string)  {
        return new AnswerModel(value, false)
    }

	get value(): string {
		return this.#value;
	}

	get isCorrect(): boolean {
		return this.#isCorrect;
	}

	get revealed(): boolean {
		return this.#revealed;
	}

	reveal() {
		return new AnswerModel(
			this.#value,
			this.#isCorrect,
			true
		)
	}

    toObject() {
        return {
            value: this.#value,
            isCorrect: this.#isCorrect,
            revealed: this.#revealed
        }
    }

	static fromObject(model: AnswerModel): AnswerModel {
		return new AnswerModel(model.value, model.isCorrect, model.revealed)
	}
}
