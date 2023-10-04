import {
    OpenAIStream,
    StreamingTextResponse,
    experimental_StreamData,
  } from 'ai';
  import OpenAI from 'openai';
  import type { ChatCompletionCreateParams } from 'openai/resources/chat';
  // Create an OpenAI API client (that's edge friendly!)
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });
  
  // IMPORTANT! Set the runtime to edge
  export const runtime = 'edge';
  
  const functions: ChatCompletionCreateParams.Function[] = [
    {
      name: 'Retrieve-Note',
      description: 'Retrieves a note by id',
      parameters: {
        type: 'object',
        properties: {
          note_id: {
            type: 'string',
            description: 'The id of the note to retrieve. Please ensure this is a valid note_id',
          },
        },
        required: ['note_id'],
      },
    }
  ];
  
  export async function POST(req: Request) {
    console.log("POST /api/chat")
    const { messages } = await req.json();
    console.log("messages", messages)
  
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0613',
      stream: true,
      messages,
      functions,
    });
  
    const data = new experimental_StreamData();
    const stream = OpenAIStream(response, {
      experimental_onFunctionCall: async (
        { name, arguments: args },
        createFunctionCallMessages,
      ) => { },
      onCompletion(completion) {
        console.log('completion', completion);
      },
      onFinal(completion) {
        data.close();
      },
      experimental_streamData: true,
    });

    return new StreamingTextResponse(stream, {}, data);
  }