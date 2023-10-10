import { notFound } from "next/navigation"
import { allNotes } from "contentlayer/generated"

import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"

import { TokenProgress } from "@/components/ui/tokenProgress"

interface NoteProps {
  params: {
    slug: string[],
    title?: string,
    description?: string,
  }
}

async function getPostFromParams(params: NoteProps["params"]) {
  let slug = params?.slug?.join("/")
  if (slug.endsWith(".mdx")) {
    slug = slug.slice(0, -4)
  }
  if (slug.startsWith("notes/")) {
    slug = slug.slice(6)
  }
  console.log("rendering note: ", slug)
  const note = allNotes.find((note) => note.slugAsParams === slug)

  if (!note) {
    console.log("note not found")
    return allNotes.find((note) => note.slugAsParams === "index")
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
    title: post?.title,
    description: post?.description,
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
      {
        100*note.body.raw.length/(4*numTokens) > 100 ?(
          <TokenProgress value={100*note.body.raw.length/(4*numTokens) - 100} />
        ) : null
      }
      </div>
      <Mdx code={note.body.code} />
    </article>
  )
}
