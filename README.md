## LINE MessagingAPI で作った翻訳アプリを AWS の SAM テンプレートを使ってデプロイしてみる！

### 手順

#### master

・`sam init`を実行

#### feature/Create_SAMTemplate

・パッケージをインストール

・SAM Template を記載する

・環境変数を SSM パラメータストアを使う

・SSM のポリシーを SAM Template の Function に追記

・SSM パラメータが取得できているか console.log で検証

・sam build, sam deploy（SSM の値が取れているか確認する）

#### feature/Create_TranslateApp

・実際の動作を作成していく

■ 参考

https://qiita.com/Ryo9597/items/9f4c76791ec238923387#%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%83%AC%E3%82%B9%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3%E3%81%A8%E3%81%AF
