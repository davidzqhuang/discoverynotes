import Image from 'next/image';

import { allNotes, Note as NoteType } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"

const c = {
    Image,
    h1: (props: any) => <h1 className="ml-4 mt-8 mb-4 text-4xl font-bold" {...props} />,
    h2: (props: any) => <h2 className="ml-4 mt-6 mb-2 text-3xl font-bold" {...props} />,
    h3: (props: any) => <h3 className="ml-4 mt-4 mb-2 text-2xl font-bold" {...props} />,
    h4: (props: any) => <h4 className="ml-4 mt-4 mb-2 text-xl font-bold" {...props} />,
    h5: (props: any) => <h5 className="ml-4 mt-4 mb-2 text-lg font-bold" {...props} />,
    h6: (props: any) => <h6 className="ml-4 mt-4 mb-2 text-md font-bold" {...props} />,
    a: (props: any) => <a className="text-blue-500 hover:underline" {...props} />,
    p: (props: any) => <p className="text-md mt-2" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside" {...props} />,
    ul: (props: any) => <ul className="list-disc list-inside" {...props} />,
    li: (props: any) => <li className="text-md mt-2" {...props} />,
  };

export default function NotesPage() {

    const indexNote = allNotes.find((note) => note._id === "notes/index.mdx") as NoteType;

    return (
        <div>
            <c.h1>Notes</c.h1>
            <c.p>A Note is like a small collection of information (suggested max of 1000 tokens/ 4000 characters) which the LLM uses to answer questions and find information. Notes are organized as a directed graph with the <em>index</em> note as the root. </c.p>
            <c.p>What you see rendered is almost exactly what is shown to the LLM.</c.p>
            <c.h2>Index Note</c.h2>
            <div className="bg-sky-50 p-4">
                <Mdx code={indexNote.body.code} />
            </div>
        </div>
    )
}