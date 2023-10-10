# DiscoveryNotes

DiscoveryNotes is a project to turn an LLM into a community expert on drug discovery and development. It will have a curated database of information, selected by community experts, and will retrieve information from that database to answer questions. Each of it's answers will be fully-sourced and based on vetted information.

The goal is for the LLM to act as a Librarian, helping the user find documents and resources related to their questions and providing only direct characterizations of the underlying information. The LLM should not provide any of it's own opinions or interpretations.

The project is currently in the early stages of development and it is open-sourced under an MIT license, including both the code and the underlying data.

## Application

This can be run as follows
```
pnpm i
echo 'OPENAI_API_KEY="sk-..."' > .env.local
pnpm run dev
```

or can be found hosted at https://discoverynotes.davidhuang.blog.

## Contributing

Individuals may contribute by adding more notes in the `content/notes` section and organizing the notes in a coherent outline. The outline is organized as a directed graph with `content/notes/index.mdx` as the entrypoint and root of the graph. Subject-matter experts would be much appreciated.

### For companies

Companies may elect to sponsor the project by donating credits for the LLM API calls or to host their own mirror of the project.

## Acknowledgements

Uses the next-contentlayer from shadcn: https://github.com/shadcn/next-contentlayer.