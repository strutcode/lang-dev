# Welcome

This is the home of Tizz, my pet programming language.

## Motivation

There are many great programming languages out there, and Tizz isn't necessarily
meant to replace any of them. Instead, I started this project with some more
abstract goals:

- Deepen my own understanding of how existing languages work so that I can be a
  more effective developer and better utilize the work others have put into them.
- Understand how parsers and interpreters are crafted, so that I can work on or
  with existing implementations I'm interested in, such as GDScript.
- Explore the benefits and drawbacks of language features I sometimes wish
  existed to see what a practical implementation might actually look like.

## Development

First, set up the environment:

```bash
bun install
```

Then use `bun run` with one of the following options:

| Verb    | Description                                  |
| ------- | -------------------------------------------- |
| `build` | Build the lexer, parser and interpreter      |
| `test`  | Run the unit tests in interactive mode       |
| `cli`   | Run the CLI tool which defaults to REPL mode |
