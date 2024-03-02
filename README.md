# pk

Pk is git based package manager for macos.

## Usage

First, build `pk` command and get executable.

```bash
bun run build && cp pk /your/bin/path
```

And then, configure pk

```bash
echo 'eval "$(pk init)"' > ~/.bashrc
```

Write `Pkfile.json` like below

```json
{
  "$schema": "https://raw.githubusercontent.com/mkanenobu/pk/main/pkfile-schema.json",
  "packages": [
    {
      "name": "hey",
      "gitUrl": "https://github.com/mkanenobu/hey",
      "buildCommand": "go build -o hey",
      "executablePath": "hey"
    }
  ]
}
```

Execute install

```bash
pk install
```

## For development

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run main.ts
```
