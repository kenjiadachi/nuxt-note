---
title: '[Rails]日別のランダムをどうするか？'
description: 'たまに使いたくなるやつ'
tags: ['Rails']
image: 'img/header/daily-random-in-rails.png'
createdAt: '2021-08-26'
isDraft: false
---

たとえば、「今日のピックアップ」みたいに、日別にランダムな一つを選択したいときってありますよね。

(「今日のピックアップ」が本当にランダムでいいのかと思いつついい例が思い浮かばなかった…)

そんな時に使える書き方をご紹介します。

------

## 一番スマートな書き方

個人的には、これが一番スマートかなと思いました。

`shuffle`メソッドに引数を渡して使うやり方です。

今回は、雑に`User`モデルを扱うものとします。

```:ruby

User.all.shuffle(random: Random.new(Date.today.to_time.to_i)).first
```


`shuffle`メソッドは、引数に`Random`オブジェクトを持つことができるので、seed値に日ごとに変わる適当な数字を入れた`Random`オブジェクトを渡してあげるという方法です。

これなら、「ランダムな並び順で複数個取ってくる」みたいなシーンでも、`first`メソッドを使わなければ並び順も保持したままとってこれますね。

------

## 他の方法

こんな方法もあるかも

```:ruby

random_idx = srand(Date.today.to_time.to_i) % User.all.count

User.all[random_idx]
```

配列のインデックスを、非別のランダム値をUserの個数で割った数字のあまりからランダムに作成する方法です。

オシャですが使い道はありません！！！

こっちの方がいいというシーンが思い浮かんだからはぜひ教えてください

-------

## 参考にした記事

- [Array#shuffle (Ruby 3.0.0 リファレンスマニュアル)](https://docs.ruby-lang.org/ja/latest/method/Array/i/shuffle.html)
