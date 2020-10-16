EnOceanのUSBドングルから受信したデータを見やすくデコードするノードです。

## 対象USBドングル
[EnOcean USB400J 受信用USBモジュール](https://www.amazon.co.jp/dp/B0107UUUGG)

## インストール

```shell
npm i node-red-contrib-enocean-telegram-decoder
```

## 利用イメージ

### enocean-decorder
serial inノードで受信したデータを見やすくデコードします。
Data1を使って判定処理を行ってください。

```json
{
    "Time": "時刻",
    "OriginatorID": "xxxxxxxx",
    "EEP": "1BS",
    "Data1": "00",
    "Data4": "00000000",
    "SubTelNum": [
        1
    ],
    "dBm": [
        41
    ]
}
```

## LINK

* [NodeRED](https://flows.nodered.org/node/node-red-contrib-enocean-telegram-decoder)
* [Libraries.io](https://libraries.io/npm/node-red-contrib-enocean-telegram-decoder)
* [npm](https://www.npmjs.com/package/node-red-contrib-enocean-telegram-decoder)

## release
* 2020/10/16: 初回リリース