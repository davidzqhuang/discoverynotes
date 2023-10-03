'use client'

import { useState } from "react"

import Link from "next/link"

import {
  Note,
  NoteContent,
  NoteDescription,
  NoteHeader,
  NoteTitle,
  NoteTrigger,
} from "@/components/ui/note"

import { Textarea } from "@/components/ui/textarea"

import { BiPaperPlane } from "react-icons/bi"


export default function Home() {

  const [sendHover, setSendHover] = useState(false)

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
            <div className="flex flex-col space-y-4 w-80vh h-80vh">
            </div>
          </NoteContent>
        </Note>

      </div>
      <div className="flex-grow" style={{ flex: '3' }}>
        {/* Content for the second (3/5 height) div */}
        <p>Chat</p>
      </div>
      <div className="flex-grow flex flex-row space-x-4 items-center" style={{ flex: '1' }}>
        <div className="w-4/5">
          <Textarea placeholder="Type your message here." />
        </div>
        <div className="w-1/5" onMouseEnter={() => setSendHover(true)} onMouseLeave={() => setSendHover(false)}>
          {
            sendHover ?
              <BiPaperPlane className="h-10 w-10 text-blue-500 hover:text-blue-600 cursor-pointer" />
              :
              <BiPaperPlane className="h-10 w-10 text-gray-500 hover:text-gray-600 cursor-pointer" />
          }
        </div>
      </div>
    </div>
  );
}
