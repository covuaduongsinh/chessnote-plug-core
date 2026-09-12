---
name: Library/chessnote/Chess
tags: meta/library
files:
  - chess.plug.js
---
# Chess (core)

The core chess board widgets and PGN game indexer for ChessNote. Renders
```pgn```/```fen``` code blocks as interactive boards, indexes every PGN
block on the page into a `chess-game` Object Index entry, and finds related
games (same ECO / shared player).

**Depends on 3 other plugs, installed first** (see this repo's README for
the exact order):
[`chessnote-plug-themes`](https://github.com/covuaduongsinh/chessnote-plug-themes)
(piece sets/board themes),
[`chessnote-plug-engine`](https://github.com/covuaduongsinh/chessnote-plug-engine)
(move lists for PGN navigation), and
[`chessnote-plug-db`](https://github.com/covuaduongsinh/chessnote-plug-db)
(the SQLite game cache).

Exposes (for other chess-* plugs): `chess.isRepertoirePage`,
`chess.extractChessGames`, `chess.textExtractKeywords`,
`chess.renderStaticBoardHtml`, `chess.getCss`.

Originally built as part of
[ChessNote](https://github.com/covuaduongsinh/chessnote), a chess-focused
SilverBullet fork.

Source: [chessnote-plug-core](https://github.com/covuaduongsinh/chessnote-plug-core).
