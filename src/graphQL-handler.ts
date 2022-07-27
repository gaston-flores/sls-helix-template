import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { getGraphQLParameters, processRequest } from "graphql-helix";
import schema from './schema'
import { formatHelixRequest, formatHelixResponse } from "./utils";

async function graphQLHandler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const request = formatHelixRequest(event)
  // Extract the Graphql parameters from the request
  const { operationName, query, variables } = getGraphQLParameters(request);

  // Validate and execute the query
  const result = await processRequest({
    operationName,
    query,
    variables,
    request,
    schema,
  });

  return formatHelixResponse(result)
}

export default graphQLHandler;
