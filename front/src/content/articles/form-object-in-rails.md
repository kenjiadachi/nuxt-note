---
title: '[Rails]FormObjectを使ってcontrollerをきれいにしよう'
description: 'FormObjectはいいぞ'
tags: ['Rails']
image: 'img/header/form-object-in-rails.png'
createdAt: '2021-08-10'
isDraft: false
---

こんにちは。

今日はRailsのForm周りをシンプルに書くためのFormObjectについてご紹介します。

-------

<!--more-->

## `accepts_nested_attributes_for`だるすぎませんか

こんなことを思ったことある方多いんじゃないでしょうか？

`accepts_nested_attributes_for`めんどくせえ！！

僕はよく思います。

理由としては以下の3つが多いんじゃないかなと

- Modelで同時に保存されるものがあるかどうかで書き方変えたくない
(Model層でFormの書き方(view層)についての指示を出したくない)
- 独自の書き方が必要になってくる
(`form.fields_for`とかめんどくさい)
- `validation`よくわからん
リレーションある場合のフォームで保存される時のみ…みたいなことしようとするとめんどくさい

Railsを作成したDHHも`accepts_nested_attributes_for`については以前から苦言を呈しており、廃止したいという旨のコメントがあったりします。

> I'd actually like to kill accepts_nested_attributes_for in due time. Don't think we should promote it for this new API. Rather, let's just show how to do it by hand in the controller.

[https://github.com/rails/rails/pull/26976#discussion_r87855694](https://github.com/rails/rails/pull/26976#discussion_r87855694)

こんな問題を考えなくて良いように今回はform_objectをActiveModelを用いて作成します！

-------

## やってみよう

### ActiveModel書いてみるよ

シンプルに、今回はmodelsディレクトリに作成します。

いろいろ種類が出てくれば、form_objectsディレクトリを作成しても良いかもしれませんね。

以下のようなシンプルなモデルがあったとします。

```
# Gemfile

class User < ApplicationRecord
  has_one :address, dependent: :destroy

  validates :name, presence: true
end

```

その後`bundle install`を実行してください。

そのまま脳死で`rails g rspec:install`としてください。

すると、以下のような感じになるはずです。

```
Running via Spring preloader in process 9045
      create  .rspec
      create  spec
      create  spec/spec_helper.rb
      create  spec/rails_helper.rb
```

その後、それぞれのファイルを編集していきましょう。

```
# config/application.rb

config.generators do |g|
  g.test_framework :rspec,
  fixtures: false,
  view_specs: false,
  helper_specs: false,
  routing_specs: false
end
```

```
# .rspec

--require spec_helper
--format documentation
```

```
# spec/rails_helper.rb

# 省略
RSpec.configure do |config|

  # 省略
  config.include FactoryBot::Syntax::Methods

end
```

こんな感じで設定すれば、キレイに動くはずです。

またテストの書き方については別記事で書きますね。

今日はこのあたりで。
