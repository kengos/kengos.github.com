---
layout: posts
title: (WIP) 5分で理解したつもりになるBlockchain(ブロックチェーン)
js_files: []
tags: [Blockchain]
---

<div class="ui warning message">
<div class="header">注意事項</div>
内容については、個人的に調べたもので正確性に欠ける場合があります。<br>
またIT技術者向けの用語を含みます。
</div>

## Blockchain(ブロックチェーン)とは?

誰でも(<span id="anyone-original"><a href="#anyone" rel="nofollow">※1</a></span>)書き込める/読み込める分散型のデータベース

ビットコインなどの仮想通貨はブロックチェーン技術の上に成り立っています。

データベースなので、原理的にはどんなデータでも記録が可能ですが、通貨の移動や在庫の移動、権利の移動の記録などの取引データの取扱に長けています。

これは、ブロックチェーンの仕組みとして、以下の特徴を持っているからです。

* 同時に多数の取引データが発生しても分散ネットワーク上で整合性を持って処理することが可能
* 取引データの改ざんが難しい

特に、銀行業界では以下のような点から非常に注目されているようです。

* 高価なシステムを導入せずとも、整合性の取れた取引データの記録が可能
* 分散ネットワークのノード数を増やすことで取引件数の増大に対応可能

<div class="ui warning message" style="font-size:0.8rem;">
<div class="header">用語の定義</div>
<dl>
  <dt>ユーザー</dt><dd>ブロックチェーン上に取引データを記録したい人</dd>
  <dt>ノード</dt><dd>取引データをブロックチェーン上に書き込む人</dd>
  <dt>分散ネットワーク</dt><dd>ノード同士がデータのやり取りをするネットワーク(P2Pネットワーク)</dd>
</dl>
</div>

## 何故取引データの取扱に長けているのか?

ブロックチェーンはその名の通り、ブロックが数珠つなぎになったデータ構造をしています

<img src="/assets/images/20161114/blockchain_1.png" style="max-width:100%;width:714px;height:auto;" />

ブロックの内部データを模式的に表すと以下のようなデータ構造を持ちます

<div class="ui card">
  <div class="content">そのブロックのハッシュ値</div>
  <div class="content">前のブロックのハッシュ値</div>
  <div class="content">Nonce</div>
  <div class="content">
    <ul class="ui lit">
      <li>記録したいデータ</li>
      <li>記録したいデータ</li>
      <li>記録したいデータ</li>
      <li>記録したいデータ</li>
      <li>...</li>
    </ul>
  </div>
</div>

ここでブロックチェーン上での2つの重要なルールがあります。

<span style="font-size:1.2rem;color:#f00;"><strong>「そのブロックのハッシュ値」</strong>は各ブロックチェーンが定義する特定のルールに従った値でないといけない</span>

例: ビットコインにおいては「そのブロックのハッシュ値」の先頭は"0"が指定した個数連続していなければならない

「そのブロックのハッシュ値」は<code>前のブロックのハッシュ値 + Nonce + 記録したいデータのハッシュ値</code>で計算できるものとします。

<span style="font-size:1.2rem;color:#f00;"><strong>「ブロックが分岐した場合」</strong>は連鎖するブロックが長いほうを正とする</span>

このルールと、<strong>Nonce(number used once: ノンス)</strong>によってブロックチェーン上のブロックの改ざんを難しくしています。

### 改ざんが難しいのはなぜか?

以下のような取引データがブロックチェーンに記録されているものとします。

<img src="/assets/images/20161114/blockchain_2.png" style="max-width:100%;width:704px;height:auto;" />

ここでAさんがBさんへ送った<strong>100</strong>の数値を改ざんしたとします。

<img src="/assets/images/20161114/blockchain_3.png" style="max-width:100%;width:704px;height:auto;" />

<ol>
<li>AさんからBさんへの取引データが変更されたこと => <strong>記録したいデータのハッシュ値</strong>変化する</li>
<li>記録したいデータのハッシュ値が変化する => <strong>Nonce</strong>の値を再計算しないと<span style="font-size:1.2rem;color:#f00;"><strong>「そのブロックのハッシュ値」</strong>は各ブロックチェーンが定義する特定のルールに従った値でないといけない</span>のルールを満たせなくなる</li>
</ol>

仮にNonceの値の再計算ができたとしても、

<span style="font-size:1.2rem;color:#f00;"><strong>「ブロックが分岐した場合」</strong>は連鎖するブロックが長いほうが正とする</span>のルールにより、次のブロックも再生成していかないといけません。

その間も正規のノードによりブロックはどんどん追加されていくため、改ざんをするためには、

<code>改ざんしたブロックの生成スピード > ブロックの生成スピード</code>

となる必要があります。

※ビットコインのおいては51%攻撃と呼ばれます。(参照: <a href="https://bitflyer.jp/glossary/fifty_one_percent_attack" rel="nofollow">https://bitflyer.jp/glossary/fifty_one_percent_attack</a>)

### ブロックを書き込めるのは誰?

まず、ノードがブロックチェーン上にブロックを追加することを「採掘(マイニング)」と呼びます。

ブロックチェーンの実装方法によって、このブロックの書き込む権利を得る方法は異なります。

ビットコインにおいては、"0"が一定個数連続する「Nonce」を見つけたノードが書き込む権利を得ることが出来ます。

なお、書き込めたとしても、

前述の<strong>「ブロックが分岐した場合」は連鎖するブロックが長いほうが正とする</strong>

のルールにより、同時に書き込んだノードが存在した場合は採用されない場合もあります。

詳細については、本記事では割愛します。

<div class="ui segment">
<h4 id="#anyone" class="ui header">※1: 誰でも</h4>
<p>今回は全世界の誰でも書き込める/読み込めるパターンについて記述しているが、以下のパターンもある</p>
<h5>Permissioned Blockchain(許可型ブロックチェーン)</h5>
<ul class="ui list">
<li>限られた人のみしか書き込めない/読み込めない</li>
<li>限られた人のみしか書き込めない/誰でも読み込める</li>
</ul>
<p>対義語は Permissionless Blockchain<br>許可型ブロックチェーンにおいて更に細分化された以下のような呼ばれ方をすることもある</p>
<ul class="ui list">
<li>Consortium Blockchain(コンソシアム型ブロックチェーン)<br>
  (提携した)特定の企業間のみで書き込める/読み込めるBlockchain<br>
  Permissioned Blockchainの中でも、`特定の企業間`というところを強調したような言い方<br>
  銀行業界で積極的な様子</li>
<li>Private Blockchain(プライベートブロックチェーン)<br>
  ある企業内のみでしか書き込めない/読み込めないBlockchain<br>
  ようするにBlockchainの分散データベース技術を使っただけのただのデータベース<br>
  IoTなどと相性が良い</li>
</ul>
<p><a href="#anyone-original" rel="nofollow">参照元に戻る</a></p>
</div>
