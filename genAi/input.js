// This script takes user input from the command line

import readline from 'readline/promises'
import dotenv from 'dotenv'
dotenv.config()
import { ChatMistralAI } from '@langchain/mistralai'
import { HumanMessage } from 'langchain'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
// rl.question('Enter your input: ', (answer) => {
//   console.log(`You entered: ${answer}`)
//   rl.close();
// })

const model = new ChatMistralAI({
model: "mistral-small-latest",
temperature: 0
});

const messages = []

while (true) {
  const userinput = await rl.question('\x1b[36m[You]:\x1b[0m ');
  messages.push(new HumanMessage(userinput))
  const response = await model.invoke(messages);
  messages.push(response)
  console.log('\x1b[32m[Mistral]:\x1b[0m' + response.text);
  // const flag = await rl.question('want to continue? (y/n): ')
  // if(flag === 'n' || flag === 'N'){
  //   rl.close()
  //   break;
  // }
}
