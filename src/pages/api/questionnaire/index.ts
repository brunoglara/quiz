import { NextApiRequest, NextApiResponse } from "next";
import questions from "../qustionsDB";
import { shufflesArray } from "@/function/arrays";

export default function Questionnaire(req: NextApiRequest, res: NextApiResponse) {
    const questionsIds = questions.map(question => question.id)
    res.status(200).json(shufflesArray(questionsIds))
}