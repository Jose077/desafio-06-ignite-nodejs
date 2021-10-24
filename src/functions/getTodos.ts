import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {

  const { id } = event.pathParameters;

  const response = await document.query({
    TableName: "todos",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise();

  const todo = response.Items[0];

  if (todo) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        todo
      }),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Todo não encontrado!",
    }),
  };
}