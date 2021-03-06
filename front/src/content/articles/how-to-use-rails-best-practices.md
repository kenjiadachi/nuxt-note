---
title: '[Rails]rails_best_practicesを使おう'
description: 'キレイなコードは気持ちがいい'
tags: ['Rails']
image: 'img/header/how-to-use-rails-best-practices.png'
createdAt: '2020-07-29'
isDraft: false
---

リファクタリング、CI、コードレビュー。

どんな言葉が適切かはわからないのですが、最近こんな文脈にハマっています。

自分は間違ってないんだなという気持ちにさせてくれるのがすごく素敵…

今回はそんなツールの中の一つ、rails_best_practicesというgemを紹介したいと思います。

-------

<!--more-->

## ことばの紹介

まずは知らない方もいるかと思うので、ことばの紹介から。

わかってるよ！って人は飛ばしてください。

-------

### rails_best_practicesとは

なんかちゃんと定義されている文章が見つからなかったのですが、調べてみると[Rails Best Practices](https://rails-bestpractices.com/)というHPで様々なrailsの記法について議論がなされているそうです。

その中で多くの支持を得られたものがrails_best_practicesのgem内で使用されるルールとして決められています。

-------

## 使ってみましょう

それでは早速使っていきましょう。

まずはgemfileに追加しましょう。

CIに入れる関係上testでも使うので、僕はdevelopmentとtestの両方で設定しています。

```
# gemfile

group :development, :test do
  gem 'rails_best_practices'
end

```

`bundle install`を忘れずしてくださいね。

そして、下記ファイルを作成してみてください。

```
# config/rails_best_practices.yml

AddModelVirtualAttributeCheck: { }
AlwaysAddDbIndexCheck: { }
CheckSaveReturnValueCheck: { }
CheckDestroyReturnValueCheck: { }
DefaultScopeIsEvilCheck: { }
DryBundlerInCapistranoCheck: { }
HashSyntaxCheck: { }
IsolateSeedDataCheck: { }
KeepFindersOnTheirOwnModelCheck: { }
LawOfDemeterCheck: { }
LongLineCheck: { max_line_length: 120 }
MoveCodeIntoControllerCheck: { }
MoveCodeIntoHelperCheck: { array_count: 3 }
MoveCodeIntoModelCheck: { use_count: 2 }
MoveFinderToNamedScopeCheck: { }
MoveModelLogicIntoModelCheck: { use_count: 4 }
NeedlessDeepNestingCheck: { nested_count: 2 }
NotRescueExceptionCheck: { }
NotUseDefaultRouteCheck: { }
NotUseTimeAgoInWordsCheck: { }
OveruseRouteCustomizationsCheck: { customize_count: 3 }
ProtectMassAssignmentCheck: { }
RemoveEmptyHelpersCheck: { }
RemoveTabCheck: { }
RemoveTrailingWhitespaceCheck: { }
RemoveUnusedMethodsInControllersCheck: { except_methods: [] }
RemoveUnusedMethodsInHelpersCheck: { except_methods: [] }
RemoveUnusedMethodsInModelsCheck: { except_methods: [] }
ReplaceComplexCreationWithFactoryMethodCheck: { attribute_assignment_count: 2 }
ReplaceInstanceVariableWithLocalVariableCheck: { }
RestrictAutoGeneratedRoutesCheck: { }
SimplifyRenderInControllersCheck: { }
SimplifyRenderInViewsCheck: { }
UseBeforeFilterCheck: { customize_count: 2 }
UseModelAssociationCheck: { }
UseMultipartAlternativeAsContentTypeOfEmailCheck: { }
UseParenthesesInMethodDefCheck: { }
UseObserverCheck: { }
UseQueryAttributeCheck: { }
UseSayWithTimeInMigrationsCheck: { }
UseScopeAccessCheck: { }
UseTurboSprocketsRails3Check: { }

```

その後、`bundle exec rails_best_practices`を実行すると下記のようにwarningが表示されます。

```
~/app_name ❯❯❯ bundle exec rails_best_practices
Starting test_db ... done
Source Code: |=====================================================================|
/app/controllers/users_controller.rb:36 - check 'destroy' return value or use 'destroy!'
/app/controllers/users_controller.rb:5 - remove unused methods (UsersController#index)

Please go to https://rails-bestpractices.com to see more useful Rails Best Practices.

Found 2 warnings.

```

これらのwarningが発生しないように修正するか、warningが不要だと感じたら`config/rails_best_practices.yml`自体を修正してしまいましょう。

-------

## 参考にした記事

- [Rails Best Practices](https://rails-bestpractices.com/)
- [flyerhzm/rails_best_practices - GitHub](https://github.com/flyerhzm/rails_best_practices)
