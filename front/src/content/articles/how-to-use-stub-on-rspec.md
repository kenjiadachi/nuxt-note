---
title: '[Rails]RSpecでstubを上手に使おう'
description: 'stubを使いこなして疎結合なコードとテストを書きましょう'
tags: ['Rails', 'RSpec']
image: 'img/header/how-to-use-stub-on-rspec.png'
createdAt: '2021-08-07'
isDraft: true
---

RSpec本当に便利で気持ちいいですよね。

大好きです。

今回は、stubの活用方法をご紹介します。

-------

<!--more-->

## ことばの紹介

まずは知らない方もいるかと思うので、ことばの紹介から。

わかってるよ！って人は飛ばしてください。

-------

### RSpecとは

[こちらの記事](https://machiiro.github.io/bootcamp/rspec/base/01_about.html)が分かりやすかったので引用させていただきます。

> RSpec とは、Ruby における BDD (behavior driven development、ビヘイビア駆動開発) のためのテストフレームワークです。 BDD という言葉に聞き慣れないかもしれませんが、 テストコードを、自然言語を用いて要求仕様のように (Spec = 仕様) 記述するための手法です。

テストによって振る舞いを決めるためのツールということですね。

TDD(テスト駆動開発)の基盤となっているBDDという概念についてはまた別記事でご紹介したいと思います。

-------

### stubとは

[Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%B9%E3%82%BF%E3%83%96)がいい感じの文章だったのでご紹介します。

> 呼び出す側（上位）のモジュールを検査する場合に、呼び出される側（下位）の部品モジュールが未完成であることがある。

> このとき、呼び出される側の部品モジュールの代用とする仮のモジュールを、「スタブ」と呼ぶ。

> スタブモジュールは設計仕様に定義されている全ての関数を実装してあるが、関数内部は正規の動作をせず、定数を返すだけという作りになっている事が多い。

ということで、偽物の関数を作っておいてそこの責務はそちらのテストに任せようという発想ですね。

-------

## 使ってみましょう

それでは早速使っていきましょう。

RSpecの使い方については[こちら](../../blog/how-to-use-rspec/)の記事をみてみてください。

今回は、`HogeUsecase`の`sample`メソッド内で`FugaUsecase`の`execute`メソッドの結果を返す感じにしようと思います。

`execute`メソッドの前にinitializeを行う形ですね。

```
# hoge_usecase.rb

def initialize(params)
  @hoge = Hoge.find(params[:id])
end

def sample
  result = FugaUsecase.new.execute
  @hoge.update!(result)
  return @hoge
end
```

さあ、このUsecaseのRSpecを書いてみましょう。

こんな感じになるかと思います。

```
# hoge_usecase_spec.rb

describe '.sample' do
  subject { hoge_usecase.sample }
  let(:hoge_usecase) { described_class.new }

  context 'when result is success' do
    # FugaUsecase.new.execute がうまくいくための処理
    let(:hoge) { # 返り値として期待するhoge }

    it 'returns hoge' do
      is_expected.to eq(hoge)
    end
  end

  context 'when result is failed' do
    # FugaUsecase.new.execute が失敗するための処理

    it 'raised Error' do
      is_expected.to raise_error(StandardError)
    end
  end
end

```

しかし、これは`FugaUsecase.new.execute`がうまくいくかどうかにかなり依存していることがわかります。

`FugaUsecase.new.execute`の実装が変わるたびにこちらのRSpecも修正しなければならない可能性が高く、手間ですよね。

また、APIを叩くようなテストが発生した時は毎回テストのたびにAPIが叩かれてしまうのはよくないですよね。

こんな感じの時にスタブを使います。

スタブは一部のメソッドを偽物にして、返事を指定できるものになっています。

```
# hoge_usecase_spec.rb

describe '.sample' do
  subject { hoge_usecase.sample }
  let(:hoge_usecase) { described_class.new }
  
  # FugaUsecaseのインスタンスのモックと、executeメソッドを許可してresultを返却するように設定
  let(:fuga_usecase_instance) { double('fuga_usecase_instance') }
  before do
    allow(FugaUsecase).to receive(:new).and_return(fuga_usecase_instance)
    allow(fuga_usecase_instance).to receive(:execute).and_return(result)
  end

  context 'when result is success' do
    let(:result) do
      {
        status_code: 200,
        message: 'Success'
      }
    end
    it 'returns hoge' do
      is_expected.to eq(hoge)
    end
  end

  context 'when result is failed' do
    let(:result) do
      {
        status_code: 422,
        message: 'Unprocessable Entity'
      }
    end

    it 'raised Error' do
      is_expected.to raise_error(StandardError)
    end
  end
end

```

こんな感じで設定してみました。

これなら、FugaUsecaseが返す値が変わらない限り、こちらのSpecは変更しなくても良くなりましたね。

今日はこの辺りで。

-------

## 参考にした記事

- [RSpec とは](https://machiiro.github.io/bootcamp/rspec/base/01_about.html)
- [Wikipedia - スタブ](https://ja.wikipedia.org/wiki/%E3%82%B9%E3%82%BF%E3%83%96)
