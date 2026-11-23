#!/usr/bin/env python3
"""ゲーム本体（game/index.html）に埋め込まれた画像を game/assets/ に書き出す。

使い方:  python3 tools/split_assets.py

- HTML の中に data:image/...;base64,... があれば、ファイルに書き出して
  "assets/<名前>.<ハッシュ8桁>.<拡張子>" に置き換える（中身が変わると名前も変わる）。
- 画像の縦横サイズを index.html の /*@IMGDIM*/ ブロックに書き込む。
- game/sw.js の /*@ASSETS*/ ブロック（オフライン用に先読みする画像の一覧）と
  VERSION を、index.html に合わせて書き換える。
- どこからも参照されなくなった assets/ の画像は削除する。

claude.ai のチャットなどで画像を埋め込んだ1ファイル版を作ったときも、
このスクリプトを1回流せば分割版に戻せる。
"""
import base64
import hashlib
import io
import json
import os
import re
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GAME = os.path.join(ROOT, 'game')
HTML = os.path.join(GAME, 'index.html')
SW = os.path.join(GAME, 'sw.js')
ASSETS = os.path.join(GAME, 'assets')
EXT = {'image/webp': 'webp', 'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif'}

URI_RE = re.compile(r'data:(image/(?:webp|png|jpeg|gif));base64,([A-Za-z0-9+/=]+)')
ASSET_RE = re.compile(r'assets/[A-Za-z0-9_\-]+\.[0-9a-f]{8}\.(?:webp|png|jpg|gif)')


def label_for(s, pos):
    """data URI の直前の JS から、わかりやすい名前を作る。"""
    line_start = s.rfind('\n', 0, pos) + 1
    # 同じ行の手前にある別の画像データは、名前探しの邪魔なので短く置き換える
    ctx = URI_RE.sub('D', s[line_start:pos])[-4000:]
    group = None
    m = None
    for m in re.finditer(r'(?:const|let|var)\s+([A-Za-z_][A-Za-z0-9_]*)\s*=|Object\.assign\(\s*([A-Za-z_][A-Za-z0-9_]*)', ctx):
        pass
    if m:
        group = (m.group(1) or m.group(2))
    key = re.search(r'["\']?([A-Za-z0-9_]+)["\']?\s*:\s*["\']$', ctx)
    parents = re.findall(r'["\']([A-Za-z0-9_]+)["\']\s*:\s*\{', ctx)
    parts = []
    if group:
        parts.append(group.lower())
    if group == 'IMGDATA' and parents:
        parts.append(parents[-1])
    if key:
        parts.append(key.group(1))
    name = '-'.join(parts) or 'img'
    return re.sub(r'[^A-Za-z0-9_\-]', '_', name)[:60]


def main():
    s = open(HTML, encoding='utf-8').read()
    os.makedirs(ASSETS, exist_ok=True)
    out, last, n_new = [], 0, 0
    for m in URI_RE.finditer(s):
        mime, b64 = m.group(1), m.group(2)
        data = base64.b64decode(b64)
        h = hashlib.sha1(data).hexdigest()[:8]
        fn = f'{label_for(s, m.start())}.{h}.{EXT[mime]}'
        with open(os.path.join(ASSETS, fn), 'wb') as f:
            f.write(data)
        out.append(s[last:m.start()])
        out.append('assets/' + fn)
        last = m.end()
        n_new += 1
    out.append(s[last:])
    s = ''.join(out)

    used = sorted(set(ASSET_RE.findall(s)))
    dims = {}
    for p in used:
        fp = os.path.join(GAME, p)
        if not os.path.exists(fp):
            sys.exit(f'見つからない画像があります: {p}')
        with Image.open(fp) as im:
            dims[p] = [im.width, im.height]
    block = '/*@IMGDIM*/const IMGDIM=' + json.dumps(dims, separators=(',', ':')) + ';/*@/IMGDIM*/'
    if '/*@IMGDIM*/' in s:
        s = re.sub(r'/\*@IMGDIM\*/.*?/\*@/IMGDIM\*/', lambda _: block, s, flags=re.S)
    else:
        sys.exit('index.html に /*@IMGDIM*/ ブロックがありません。')
    open(HTML, 'w', encoding='utf-8').write(s)

    # 参照されない画像を削除（アイコンなど、sw.js / manifest が直接使うものは残す）
    keep = set(os.path.basename(p) for p in used)
    for fn in os.listdir(ASSETS):
        if fn.startswith('icon-'):
            continue
        if fn not in keep:
            os.remove(os.path.join(ASSETS, fn))
            print('削除:', fn)

    ver = re.search(r"const VERSION='([^']+)'", s).group(1)
    sw = open(SW, encoding='utf-8').read()
    sw = re.sub(r"const VERSION='[^']*'", f"const VERSION='{ver}'", sw, count=1)
    sw = re.sub(r'/\*@ASSETS\*/.*?/\*@/ASSETS\*/',
                lambda _: '/*@ASSETS*/' + json.dumps(['./' + p for p in used], indent=0) + '/*@/ASSETS*/',
                sw, flags=re.S)
    open(SW, 'w', encoding='utf-8').write(sw)

    total = sum(os.path.getsize(os.path.join(GAME, p)) for p in used)
    print(f'埋め込み画像 {n_new} 枚を書き出し / 参照中 {len(used)} 枚・{total/1024/1024:.1f}MB / '
          f'index.html {os.path.getsize(HTML)/1024:.0f}KB / ver {ver}')


if __name__ == '__main__':
    main()
