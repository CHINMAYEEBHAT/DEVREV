import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyDoMrfpdGyc5vJYcj9XJN3uN1StZ98fMo0';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const schema = {
  type: SchemaType.OBJECT,
  properties: {
    summary: {
      type: SchemaType.STRING,
      description: 'Summary of the work',
      nullable: false,
    },
    part: {
      type: SchemaType.STRING,
      description: 'The part of the product to which the work belongs to',
      nullable: false,
    },
  },
  required: ['summary'],
};

const systemInstruction = `You are a middle man who segregates incoming works from devrev api into different parts of the product and the summary of the work. You will be given the below inputs:
1. Title of the work
2. Description of the work
3. Array of different parts present in the product containing name, description and type of the part
4. Tag prediction from external model

What you have to do is to provide the output in the provided schema with the below necessary outputs:
1. Summary of the work to be done
2. The part name to which the work might belong and it is not nullable.`;

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    responseMimeType: 'application/json',
    responseSchema: schema,
  },
  systemInstruction: systemInstruction,
});

export { systemInstruction, model, genAI };
