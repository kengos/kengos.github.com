---
layout: posts
title: メールヘッダー List-Unsubscribe とは?
js_files: []
tags: [メール配信]
---

先日不要なメールマガジンの購読を解除を Gmail の「迷惑メールを報告」のボタンで解除していた時に気づいた点です。

![迷惑メールを報告ボタン](/assets/images/20151128/2015_11_28_1.png)

メールの種類によって以下の2パターンが有りました。

A: いきなり迷惑メールとしてマークされるパターン

![迷惑メールマーク](/assets/images/20151128/2015_11_28_2.png)

B: 確認画面が出るパターン

![迷惑メール確認画面](/assets/images/20151128/2015_11_28_3.png)

この違いはなんだろうな?と調べてみたところたどり着いたのが<strong>「List-Unsubscribeヘッダー」</strong>です

## List-Unsubscribe ヘッダーとは

メールヘッダー中に含まれる以下のものを指します。

下記が含まれている場合、「B: 確認画面が出るパターン」となるようです。

Gmail や Yahoo! などの多くのメールサービスがサポートしています。

<pre><code>List-Unsubscribe: <mailto:unsubscribe@example.com>, <http://unsubscribe.example.com/></code></pre>

形式は mailto, http で始まるものが利用可能です。

## List-Unsubscribe ヘッダーは何が嬉しいのか?

メールの受取人が簡単な操作でメールの配信解除ができるようになります。

推測ですが、「A: いきなり迷惑メールとしてマーク」される件数が多いと

Gmailなどが自動的に迷惑メールとしてマークされる可能性が高くなりそうです。

=> 自社のメールアドレスが迷惑メールとしてフィルタリングされる可能性が低くなる(恐らく)

また、Gmailが公開している<a href="https://support.google.com/mail/answer/81126" target="_blank">一括送信ガイドライン</a>によれば

`List-Unsubscribe` の他に `Precedence: bulk` の付与も推奨されています。

## メール配信についてのキーワード

なんだかんだで、あまりメール配信についてあまり知らないことがわかりました。

以下に重要なキーワードをメモしておきます。

<ul>
  <li>SPFレコード</li>
  <li>DKIM認証</li>
  <li>DMARCポリシー</li>
  <li>Precedenceヘッダー</li>
  <li>List-Unsubscribeヘッダー</li>
</ul>