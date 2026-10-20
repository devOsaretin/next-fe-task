# iTunes Search

Search for artists, albums and songs.

## Install

Node 22.12 or newer.

```bash
npm install
```

## Run

For development, this starts the app and the API together:

```bash
npm run dev
```

Open http://localhost:5173.

To run the built app through Express:

```bash
npm run build
npm start
```

Open http://localhost:3001.

To run the same built app in Docker, without installing Node:

```bash
docker build -t itunes-search .
docker run -p 3001:3001 itunes-search
```

Open http://localhost:3001.

## Tests

```bash
npm test
```

To open the test UI in the browser:

```bash
npm run test:ui
```
