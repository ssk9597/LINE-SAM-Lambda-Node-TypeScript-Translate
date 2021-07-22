// パッケージのインストール
import { ClientConfig, Client, WebhookEvent, TextMessage } from '@line/bot-sdk';
import aws from 'aws-sdk';

// モジュールのインストール
import { getTranslate } from './Common/getTranslate';

// SSM
const ssm = new aws.SSM();
const LINE_TRANSLATE_CHANNEL_ACCESS_TOKEN = {
  Name: 'LINE_TRANSLATE_CHANNEL_ACCESS_TOKEN',
  WithDecryption: false,
};
const LINE_TRANSLATE_CHANNEL_SECRET = {
  Name: 'LINE_TRANSLATE_CHANNEL_SECRET',
  WithDecryption: false,
};

exports.handler = async (event: any, context: any) => {
  try {
    // SSM (.env)
    const CHANNEL_ACCESS_TOKEN: any = await ssm
      .getParameter(LINE_TRANSLATE_CHANNEL_ACCESS_TOKEN)
      .promise();
    const CHANNEL_SECRET: any = await ssm.getParameter(LINE_TRANSLATE_CHANNEL_SECRET).promise();

    const channelAccessToken: string = CHANNEL_ACCESS_TOKEN.Parameter.Value;
    const channelSecret: string = CHANNEL_SECRET.Parameter.Value;

    // client
    const clientConfig: ClientConfig = {
      channelAccessToken: channelAccessToken,
      channelSecret: channelSecret,
    };
    const client: Client = new Client(clientConfig);

    // JSONとして解析して値やオブジェクトを構築する
    const body: any = JSON.parse(event.body);
    // LINE Eventを取得
    const response: WebhookEvent = body.events[0];

    // 送られるメッセージがテキスト以外の場合
    if (response.type !== 'message' || response.message.type !== 'text') {
      return;
    }

    // 翻訳を行うために必要な情報
    const input_text: string = response.message.text;
    const sourceLang: string = 'ja';
    const targetLang: string = 'en';

    const res: any = await getTranslate(input_text, sourceLang, targetLang);
    const output_text: string = res.TranslatedText;

    console.log(output_text);

    // メッセージ送信のために必要な情報
    const replyToken = response.replyToken;
    const post: TextMessage = {
      type: 'text',
      text: output_text,
    };

    // メッセージの送信
    await client.replyMessage(replyToken, post);
  } catch (err) {
    console.log(err);
  }
};
