import { NextApiRequest, NextApiResponse } from "next";
import questions from "../qustionsDB";

export default function Questions(req: NextApiRequest, res: NextApiResponse) {
	const selectedId = req.query.id;

	const selectedQuestion = questions.find(
        (question) => question.id === parseInt(selectedId as string)
    );

    if (selectedQuestion) {
        const questionWithShuffledAnswers = selectedQuestion.shuffleAnswers();
        const questionWithAnswer = questionWithShuffledAnswers.chooseAnswer(0);

        res.status(200).json(questionWithShuffledAnswers.toLiteralObject());
        // res.status(200).json(questionWithAnswer.toLiteralObject());
    } else {
        res.status(404).json({ message: "Question not found" });
    }
}
