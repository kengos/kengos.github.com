---
layout: posts
title: 【Ruby】expect(0.1 + 0.2 == 0.3).to be_falsey
js_files: []
tags: [ruby]
---

<pre><code>$ irb
irb(main):001:0> 0.1 + 0.2 == 0.3
=> false</code></pre>

<a href="http://0.30000000000000004.com/" target="_blank">元ネタはこちら</a>

浮動小数点絡みの問題ですね。

有名な例ですが、消費税の計算(8%)、端数切り上げの場合を見てみます。

<pre><code>(450 * 1.08).ceil
=> 487</code></pre>

電卓等で計算すると <a href="https://www.google.co.jp/search?q=450*1.08" target="_blank">486</a>ですね。

<div class="ui warning message">
  <div class="header">
    Rubyのバージョンについて
  </div>
  ruby 2.2.3p173 (2015-08-18 revision 51636) [x86_64-darwin14] でのお話です。
</div>

## <a href="http://ruby-doc.org/core-2.2.0/Rational.html" target="_blank">Rational</a> クラスを利用する

Rationalを利用すると 消費税率 `1.08`を `108/100r` と表現できます。

<pre><code>(450*108/100r).ceil
=> 486</code></pre>

`0.1 + 0.2 == 0.3` を Rational で計算してみます。

<pre><code>(1/10r + 2/10r) == 0.3
=> true</code></pre>

`true` になりました！

(右辺を `3/10r` とするべきなのかはよく調べてないです。)

### `to_r` メソッドもあります。

<pre><code>"1/2".to_r
# => (1/2)
"0.5".to_r
# => (1/2)
0.5.to_r
# => (1/2)</code></pre>

ただし、以下の場合はこんな変なことになるので注意

<pre><code>0.2.to_r
=> (3602879701896397/18014398509481984)
"0.2".to_r
=> (1/5)</code></pre>

なんかバグっぽい挙動ですね。

## <a href="http://ruby-doc.org/stdlib-2.2.0/libdoc/bigdecimal/rdoc/BigDecimal.html" target="_blank">BigDecimal</a> を使う

<pre><code>require 'bigdecimal'
(BigDecimal.new("450") * BigDecimal.new("1.08")).ceil
=> 486</code></pre>

<pre><code>BigDecimal.new("0.1") + BigDecimal.new("0.2") == 0.3
=> true</code></pre>

なんか面倒ですね。

## Railsの場合

例えば、日付によって有効な税率を切り替えるような実装をしている場合

<pre><code># migration file
class CreateTaxes &lt; ActiveRecord::Migration
  def change
    create_table :taxes do |t|
      t.decimal :rate, precision: 3, scale: 2
      t.timestamps null: false
    end
  end
end</code></pre>

<pre><code>$ bin/rails c
Loading development environment (Rails 4.2.5)
irb(main):001:0> Tax.create!(rate: 1.08)
irb(main):002:0> tax = Tax.first
=> #&lt;Tax id: 1, rate: #<BigDecimal:7fd7970fac28,'0.108E1',18(27)&gt;, created_at: "2015-11-17 16:03:12", updated_at: "2015-11-17 16:03:12">
irb(main):003:0> (450 * tax.rate).ceil
=> 486</code></pre>

BigDecimalのほうに自動的に切り替えてくれるので安全ですね。

(安全じゃないパターンもあるのでしょうか?)


