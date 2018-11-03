# niconico-Display2

[niconico-Display](https://github.com/UC-SADA/niconico-Display)のローカルサーバー用です。

社内のプレゼン等。閉じた環境で使ってみたい等方用に用意しました。

### 動かし方


node.js　と　electronをPCにインストールしてダウンロード。

本ソースコードを保存したディレクトリまで移動し下記コマンドを実行。

```bash
$ electron .
```

そうすると「透明ディスプレー」と「コントローラー」が表示されます。

「コントローラー」上のスタンプを押したり、コメントを記入すると使えます。

本アプリを起動したPC以外からアクセスしたいときは、同じネットワーク環境に入る必要があります。

そこでコントローラーのQR-codeを読み取ればスマホからでもアクセス可能です

閉じるときはコマンドプロンプト上でCnt+C を行うか、electronを閉じるかしてください。

### 参考にしたサイトは

[ニコニコメソッドプレゼンを全社会議に取り入れてみたら会議が面白くなった](http://tech.uzabase.com/entry/2015/06/01/143202)

[社内プレゼン大会にニコニコメソッドを取り入れてみた話](http://atoms.loftwork.jp/20170925_nicomethod/)
