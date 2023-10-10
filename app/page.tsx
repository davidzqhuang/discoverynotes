'use client'

import { useEffect, useState } from "react"

import { Message } from 'ai/react';
import { useChat } from 'ai/react';
import { ChatRequest, FunctionCallHandler, nanoid } from 'ai';

import Link from "next/link"

import { allNotes } from "contentlayer/generated"

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

function findNoteIds(inputText: string): string[] {
  const pattern = /\(notes\/(.+)\.mdx\)/g;
  const ids: string[] = [];

  let match: RegExpExecArray | null;
  while (match = pattern.exec(inputText)) {
    const noteIdMatch = match[0].match(/notes\/(.+)\.mdx/);
    if (noteIdMatch && noteIdMatch[1]) {
      ids.push("notes/" + noteIdMatch[1] + ".mdx");
    }
  }
  return ids;
}

export default function Home() {

  const [sendHover, setSendHover] = useState(false)

  // Start Notes Section *******************************************************

  const [currentNoteId, setCurrentNoteId] = useState("notes/index.mdx")

  // End Notes Section *********************************************************


  // Chat Section **************************************************************

  const functionCallHandler: FunctionCallHandler = async (
    chatMessages,
    functionCall,
  ) => {
    if (functionCall.name === 'Retrieve-Note') {
      console.log("functionCall.arguments: ", functionCall.arguments)
      if (functionCall.arguments) {
        // Parsing here does not always work since it seems that some characters in generated code aren't escaped properly.
        const parsedFunctionCallArguments: { note_id: string } = JSON.parse(
          functionCall.arguments,
        );

        setCurrentNoteId(parsedFunctionCallArguments.note_id)

        const note = allNotes.find((note) => note._id === parsedFunctionCallArguments.note_id)

        if (!note) {
          const functionResponse = {
            messages: [
              ...chatMessages,
              {
                id: nanoid(),
                name: "Retrieve-Note",
                role: 'function' as const,
                note_id: parsedFunctionCallArguments.note_id,
                content: 'Note not found.',
              },
            ],
          };
          return functionResponse;
        } else {
          const noteIds = findNoteIds(note.body.raw);
          const functionResponse = {
            messages: [
              ...chatMessages,
              {
                id: nanoid(),
                name: "Retrieve-Note",
                role: 'function' as const,
                note_id: parsedFunctionCallArguments.note_id,
                content: note.body.raw,
              },
              // {
              //   id: nanoid(),
              //   role: 'system' as const,
              //   content: `Available note ids: ${noteIds.join(', ')}`,
              // }
            ],
          };
          return functionResponse;
        }
      }
    }
  };

  const indexNote = allNotes.find((note) => note._id === "notes/index.mdx")
  const indexNoteIds = findNoteIds(indexNote.body.raw);
  const { messages, input, handleInputChange, handleSubmit, data } = useChat({
    api: '/api/chat',
    experimental_onFunctionCall: functionCallHandler,
    initialMessages: [
      {
        id: nanoid(),
        role: 'system' as const,
        content: 'You are a helpful librarian. Your job is to quote and contextual useful material for the user. You always have available the Index and you can retrieve more notes by id. The id will be given in the notes as [note title](note id). Please only select notes with known ids which are given in another note. You should retrieve notes for an answer as much as possible. If the answer is common sense or common knowledge, state your answer and ask if they would like a reference. Please keep your answers short and to the point.',
      },
      {
        id: nanoid(),
        name: "Retrieve-Note",
        role: 'function' as const,
        note_id: "notes/index.mdx",
        content: indexNote.body.raw,
      },
      {
        id: nanoid(),
        role: 'system' as const,
        content: `Available note ids: ${indexNoteIds.join(', ')}`,
      }
    ],
  });

  // Generate a map of message role to text color
  const roleToColorMap: Record<Message['role'], string> = {
    system: 'red',
    user: 'black',
    function: 'blue',
    assistant: 'green',
  };

  // End Chat Section **********************************************************

  console.log(messages)

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] space-y-4">
      <div className="flex-grow mt-4" style={{ flex: '1' }}>
        <Note >
          <NoteTrigger className="bg-blue-200 hover:bg-blue-300 border hover:underline rounded-md p-2">Open Current Note</NoteTrigger>
          <NoteContent className="w-80vh h-80vh">
            <NoteHeader>
              <NoteTitle>Current Notes</NoteTitle>
              <NoteDescription>
                The current note the AI is looking at will be available here.
              </NoteDescription>
            </NoteHeader>
            <NoteWindow className="overflow-y-auto" id={currentNoteId} />
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
                {
                  m.role === "system" || m.role === "user" || m.role === "assistant" ?
                    m.content : (

                      m.role === "function" ? (
                        <p>
                          {`Retrieving note with id is ${m.note_id}.`}
                        </p>) : null
                    )

                }
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
