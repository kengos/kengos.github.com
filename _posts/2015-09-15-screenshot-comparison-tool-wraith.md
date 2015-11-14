---
layout: posts
title: スクリーンショット比較ツール "Wraith"
js_files: []
tags: [スクリーンショット比較]
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/gE_19L0l2q0" frameborder="0" allowfullscreen></iframe>

## はじめに

スクリーンショットの比較ツールである <strong>"Wraith"</strong>の紹介です。

[Github](https://github.com/BBC-News/wraith)
[Document](http://bbc-news.github.io/wraith/index.html)

これを利用すると CSSの変更時の見た目の差分のチェックなどができます。

<img src="/assets/images/20150915/20150915_1.png" alt="実行後のイメージ" style="max-width:80%;" />

左が 開発環境, 右が今の本番の状態です。

<img src="/assets/images/20150915/20150915_2.png" alt="差分表示のイメージ" style="max-width:80%;" />

diff のイメージをクリックすると差分の箇所が青くなっている画像が表示されます。

今回は 表示されている画像の width を 100% にしてしまっていたため、縦長の画像が拡大されすぎていたのを修正しました。

1/6 ほど幅が狭くなっている感じですね。

## インストール

OS X 10.10 系 + [homebrew](http://brew.sh/index_ja.html) の環境でインストールしていきます。

```sh
$ brew -v
Homebrew 0.9.5 (git revision 4c6e7; last commit 2015-09-12)
$ ruby -v
ruby 2.2.3p173 (2015-08-18 revision 51636) [x86_64-darwin14]
```

### phantomjs, imagemagick のインストール

```sh
$ brew install phantomjs imagemagick
```

(すでに入っていたので,入っていない場合の挙動は不明)

### Wraith のインストール

```sh
$ gem install wraith
```

rbenv の場合は `rehash` すること

```sh
$ rbenv rehash
```

## Wraith の設定

任意のディレクトリを作成して、そこに移動して作業します。

```sh
$ mkdir -p ~/wraith
$ cd ~/wraith
```

```sh
$ wraith setup
```

configs/config.yaml というファイルができています。

そのファイルに設定をいれていきます。

```sh
$ vi configs/config.yaml
```

下のような感じで設定しました。

ポイントとなるのは <strong>domains</strong>, <strong>screen_widths</strong>, <strong>paths</strong> でしょうか。

```yaml
browser:
  phantomjs: "phantomjs"

snap_file: "javascript/snap.js"

directory: 'shots'

domains:
  production: "http://kengos.jp" # 元となるページのドメイン
  develpoment: "http://localhost:4000" # 比較したいページのドメイン

# チェックしたい画面幅(この場合は 320px, 600px, 1280px の3種類)
screen_widths:
  - 320
  - 600
  - 1280

# チェックするパス
# この場合は "/" と "/2015/09/13/password.html" の 2つのパス
paths:
  home: /
  2015_09_13: /2015/09/13/password.html

fuzz: '20%'

spider_days:
  - 10

mode: diffs_first

threshold: 5
```

## Wraith の実行

```sh
$ wraith capture configs/config.yaml
```

しばらく待つと 以下のように <strong>shots</strong> というディレクトリができ、内部に画像ができています。

<img src="/assets/images/20150915/20150915_3.png" alt="ディレクトリ構造" style="max-width:100%;" />

<strong>gallery.html</strong>をブラウザで開くことで、冒頭の画像が表示されます。

## どうやって Compareしているの？

Capture程度であれば phantomjs を簡単に触ればできてしまいます。

一番気になったのが, Compareのやり方。

Openソースなので ソースコードを見ればわかる！っていうのがいいですよね。

[Compareの該当ソースの場所](https://github.com/BBC-News/wraith/blob/master/lib/wraith/compare_images.rb#L30)

```ruby
def compare_task(base, compare, output, info)
  cmdline = "compare -dissimilarity-threshold 1 -fuzz #{wraith.fuzz} -metric AE -highlight-color #{wraith.highlight_color} #{base} #{compare.shellescape} #{output}"
  px_value = Open3.popen3(cmdline) { |_stdin, _stdout, stderr, _wait_thr| stderr.read }.to_f
  begin
    img_size = ImageSize.path(output).size.inject(:*)
    percentage(img_size, px_value, info)
  rescue
    File.open(info, "w") { |file| file.write("invalid") } unless File.exist?(output)
  end
end
```

ImageMagick の compareコマンドを使っていることがわかりますね。

[ImageMagick-compare](http://www.imagemagick.org/script/compare.php)

該当のソースの箇所のオプション値を調整/変更することで、自分のサイトに合った調整にできるかもしれないですね。

(compareコマンドの使い方調べてないのでわからない)

## 最後に

単体だと中々使いにくいなという感じがします。

CI に組み込んだり、Wraith をライブラリとして利用した簡単なWebアプリケーションを作り、

簡単に設定、実行できるようにしたりなどするといい感じになるかもしれませんね。