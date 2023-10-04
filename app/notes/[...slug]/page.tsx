import { notFound } from "next/navigation"
import { allNotes } from "contentlayer/generated"

import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"

import { TokenProgress } from "@/components/ui/tokenProgress"

interface NoteProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: NoteProps["params"]) {
  const slug = params?.slug?.join("/")
  const note = allNotes.find((note) => note.slugAsParams === slug)

  if (!note) {
    null
  }

  return note
}

export async function generateMetadata({
  params,
}: NoteProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams(): Promise<NoteProps["params"][]> {
  return allNotes.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function NotePage({ params }: NoteProps) {
  const note = await getPostFromParams(params)

  if (!note) {
    notFound()
  }

  const numTokens = 1000;
  return (
    <article className="py-6 prose dark:prose-invert">
      <div>
      <p>Number of tokens used: </p>
      <TokenProgress value={100*note.body.raw.length/(4*numTokens)} />
      </div>
      <Mdx code={note.body.code} />
    </article>
  )
}
