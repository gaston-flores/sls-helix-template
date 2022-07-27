import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

async function exampleHandler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Welcome to Serverless!",
      requestTime: event.requestContext.timeEpoch,
    }),
  };
}

export default exampleHandler;
