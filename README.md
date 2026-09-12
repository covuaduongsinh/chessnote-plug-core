# chessnote-plug-core

A standalone SilverBullet plug: interactive `fen`/`pgn`/`puzzle` board
widgets, the chess-game indexer/data model, and rule-based "related games"
matching — extracted from
[ChessNote](https://github.com/covuaduongsinh/chessnote) (a chess-focused
SilverBullet fork).

## Install

**Install 3 dependencies first, in this order** (each is its own standalone
plug — see its README for its own install URL):

1. [`chessnote-plug-themes`](https://github.com/covuaduongsinh/chessnote-plug-themes) — piece sets/board themes
2. [`chessnote-plug-engine`](https://github.com/covuaduongsinh/chessnote-plug-engine) — move lists for PGN navigation
3. [`chessnote-plug-db`](https://github.com/covuaduongsinh/chessnote-plug-db) — the SQLite game cache

Then, in SilverBullet, run the **"Library: Install"** command and paste this
URL:

```
https://raw.githubusercontent.com/covuaduongsinh/chessnote-plug-core/main/chess-library.md
```

This pulls in `chess.plug.js` (the compiled plug) along with the library
page. After installing, run **"Plugs: Reload"** if it doesn't load
automatically.

This is a dependency *for* `chessnote-plug-pdf-export`, `chessnote-plug-ai`,
and `chessnote-plug-repertoire`.

## What it provides

- Interactive `fen`/`pgn`/`puzzle` board widgets (piece-set/board-theme
  picker, move navigation, flip board).
- The `chess-game` Object Index entry per ```pgn``` block on a page (used by
  every other chess-* feature).
- Rule-based "related games" (same ECO code / shared player).
- Exposed for other chess-* plugs: `chess.isRepertoirePage`,
  `chess.extractChessGames`, `chess.textExtractKeywords`,
  `chess.renderStaticBoardHtml`, `chess.getCss`.

## Development

Source lives here **and** as `plugs/chess/` in the main
[chessnote](https://github.com/covuaduongsinh/chessnote) monorepo, which is
where `chess.plug.yaml` actually gets compiled during ChessNote's own build
(`npm run build:plugs`). This repo's `chess.plug.js` is a manually-published
snapshot — after changing the source here (or there), rebuild and re-copy
the compiled `.plug.js` to keep this repo's install URL up to date.

To compile it yourself from this repo directly, you'll need SilverBullet's
plug-compile tooling (see [Plug
Development](https://silverbullet.md/Plugs/Development) docs) pointed at
`chess.plug.yaml`, with `chessnote-plug-themes`, `chessnote-plug-engine`, and
`chessnote-plug-db` already installed in the target Space (this plug only
calls their syscalls by name at runtime — it doesn't need their source to
build).
