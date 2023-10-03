'use client'

import { useState } from "react"

import { Message } from 'ai/react';
import { useChat } from 'ai/react';
import { ChatRequest, FunctionCallHandler, nanoid } from 'ai';

import Link from "next/link"

import {
  Note,
  NoteContent,
  NoteDescription,
  NoteHeader,
  NoteTitle,
  NoteTrigger,
  NoteWindow
} from "@/components/ui/note"

import { Textarea } from "@/components/ui/textarea"

import { BiPaperPlane } from "react-icons/bi"


export default function Home() {

  const [sendHover, setSendHover] = useState(false)


  // Chat Section **************************************************************

  const functionCallHandler: FunctionCallHandler = async (
    chatMessages,
    functionCall,
  ) => {
    if (functionCall.name === 'eval_code_in_browser') {
      if (functionCall.arguments) {
        // Parsing here does not always work since it seems that some characters in generated code aren't escaped properly.
        const parsedFunctionCallArguments: { code: string } = JSON.parse(
          functionCall.arguments,
        );
        // WARNING: Do NOT do this in real-world applications!
        eval(parsedFunctionCallArguments.code);
        const functionResponse = {
          messages: [
            ...chatMessages,
            {
              id: nanoid(),
              name: 'eval_code_in_browser',
              role: 'function' as const,
              content: parsedFunctionCallArguments.code,
            },
          ],
        };
        return functionResponse;
      }
    }
  };

  const { messages, input, handleInputChange, handleSubmit, data } = useChat({
    api: '/api/chat',
    experimental_onFunctionCall: functionCallHandler,
  });

  // Generate a map of message role to text color
  const roleToColorMap: Record<Message['role'], string> = {
    system: 'red',
    user: 'black',
    function: 'blue',
    assistant: 'green',
  };

  // End Chat Section **********************************************************

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] space-y-4">
      <div className="flex-grow mt-4" style={{ flex: '1' }}>
        <Note >
          <NoteTrigger className="bg-blue-200 hover:bg-blue-300 border hover:underline rounded-md p-2">Open Notes</NoteTrigger>
          <NoteContent className="w-80vh h-80vh">
            <NoteHeader>
              <NoteTitle>Current Notes</NoteTitle>
              <NoteDescription>
                The current note the AI is looking at will be available here.
              </NoteDescription>
            </NoteHeader>
            <NoteWindow slug="hello" />
          </NoteContent>
        </Note>

      </div>
      <div className="flex-grow" style={{ flex: '3' }}>
        <div className="flex flex-col w-full mx-auto stretch">
          {messages.length > 0
            ? messages.map((m: Message) => (
              <div
                key={m.id}
                className="whitespace-pre-wrap"
                style={{ color: roleToColorMap[m.role] }}
              >
                <strong>{`${m.role}: `}</strong>
                {m.content || JSON.stringify(m.function_call)}
                <br />
                <br />
              </div>
            ))
            : null}
        </div>
      </div>
      <div className="flex-grow" style={{ flex: '1' }}>
        <form onSubmit={(e) => {
          console.log("SUBMIT")
          handleSubmit(e)
          console.log("input submit: " + e)
        }
        }>
          <div className="flex flex-row space-x-4 items-center">
            <div className="w-4/5">
              <Textarea placeholder="Type your message here." value={input} onChange={(e) => {
                handleInputChange(e)
                console.log("input: " + e.target.value)
              }} />
            </div>
            <div
              className="w-1/5 cursor-pointer"
              onMouseEnter={() => setSendHover(true)}
              onMouseLeave={() => setSendHover(false)}
            >
              <button
                type="submit"
                className="cursor-pointer">
                {sendHover ?
                  <BiPaperPlane className="h-10 w-10 text-black" /> :
                  <BiPaperPlane className="h-10 w-10 text-gray-500 hover:text-gray-600" />
                }
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
