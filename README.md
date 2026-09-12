# chessnote-plug-core

ChessNote's core chess plug: interactive `fen`/`pgn`/`puzzle` board widgets,
the chess-game indexer/data model, and rule-based "related games" matching.
This is the foundational plug every other chessnote-plug-* depends on.

## ⚠️ Not independently installable

This is a **mirrored source snapshot** of `plugs/chess/` from the main
[chessnote](https://github.com/covuaduongsinh/chessnote) monorepo, kept as a
separate repository for clearer version tracking of this feature area.

It is **not** a standalone, installable SilverBullet plug:

- It depends on `chessSql` (custom SQLite-WASM-backed syscall) and exposes
  its own syscalls (`chess.renderStaticBoardHtml`, `chess.getCss`,
  `chess.extractChessGames`, `chess.textExtractKeywords`,
  `chess.isRepertoirePage`, ...) consumed by every other chessnote-plug-*.
- The actual build (compiling this into a `.plug.js`, registering it in
  `plugs/builtin_plugs.ts`) happens in the main chessnote repo, not here.

To use or modify this code, work in the main
[chessnote](https://github.com/covuaduongsinh/chessnote) repo instead — this
repo exists for reference and history, not standalone development.
