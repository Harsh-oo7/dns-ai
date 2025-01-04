import { startUdpServer, createResponse, createTxtAnswer } from "denamed";
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'

const genAI = new GoogleGenerativeAI(String(process.env.GEMINI_API_KEY));
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

startUdpServer(async (query) => {
    try {
        const question = query.questions[0];

        const prompt = `
        Answer the question in one word or sentence.
        Question: ${question.name.split('.').join(' ')}`

        const result = await model.generateContent(prompt)

        return createResponse(query, [
            createTxtAnswer(question, result.response.text())
        ]);
    }
    catch(e) {
        console.log("e", e)
    }

}, { port: 8000 });
