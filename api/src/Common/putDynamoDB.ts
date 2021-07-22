// パッケージのインストール
import aws from 'aws-sdk';

// 必要なAWSサービス
const dynamodb = new aws.DynamoDB();

export const putDynamoDB = (dayTime: string, input: string, output: string) => {
  return new Promise((resolve, reject) => {
    const params = {
      Item: {
        TimeStamp: {
          S: dayTime,
        },
        InputText: {
          S: input,
        },
        OutputText: {
          S: output,
        },
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: 'translations',
    };

    dynamodb.putItem(params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
