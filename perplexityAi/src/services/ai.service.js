import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY
})

export const testAi =  () => {
  model.invoke("what is the capital of india?")
    .then((res) => {
      console.log(res.text)
    })
}