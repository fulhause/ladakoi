# ラダ恋！ リポジトリのメモ

- 公式サイトは `index.html`（GitHub Pages のトップ）、ゲーム本体は `game/index.html`。
- 公開版で遊んでいる人がいる。セーブの互換性は壊さないこと。
  - セーブデータは localStorage の `ladakoi-save-v1`。形を変えるときは、今までの記録を読める移行処理を必ず書く。
  - 設定（音量・文字の速さ・テーマなど）は `ladakoi-cfg-v1` に別に保存している。

## 画像
- 画像は `game/assets/` に置き、ファイル名に中身のハッシュを入れている（例 `cgs-rire.1a2b3c4d.webp`）。
- 画像を足したり差し替えたりしたら、`python3 tools/split_assets.py` を実行する。
  - HTML に data URI で埋め込んだ画像があれば、ファイルに書き出して置き換える（claude.ai のチャットで作った1ファイル版を取り込むときも、これを流せばよい）。
  - 画像の縦横サイズ（`IMGDIM`）と、`game/sw.js` の先読み一覧・`VERSION` も書き換える。
  - どこからも使われなくなった画像は消す（`icon-*` は残す）。

## 更新するとき
- `game/index.html` の `VERSION` を上げてから `tools/split_assets.py` を流す。
  `sw.js` の `VERSION` が変わり、ホーム画面に追加して遊んでいる人にも新しい版が届く。
- ゲーム本体はネット優先で読み込むので、公開すれば次に開いたときに新しい版になる。

## 音
- BGM と効果音は WebAudio で合成している（`TRACKS` と `SFX`）。音声ファイルはない。
- 曲ファイルに替えるときは `game/audio/` に置き、`BGM_FILES` にパスを書く。
