import { document } from "src/utils/dynamodbClient";

interface ICreateTodo {
  title: string;
  deadline: Date;
}

export const handle = async (event) => {
  
  const { deadline, title } = JSON.parse(event.body) as ICreateTodo;
  
  const { id } = event.pathParameters;

  await document.put({
    TableName: "todos",
    Item: {
      id: "cbf730b8-e752-4f12-bda6-119438911317",
      user_id: id,
      done: false,
      title,
      deadline: new Date(deadline)
    },
  }).promise();
  
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo criado com sucesso!",
    }),

    headers: {
      "Content-type": "application/json",
    },
  };
};