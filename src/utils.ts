
import { APIGatewayProxyEventHeaders, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ProcessRequestResult, Request } from 'graphql-helix';

/**
 * Renames all keys of the header object to lower case
 *
 * @param headers Raw headers from API Gateway
 * @returns Header object with keys in lowercase
 */
function headersToLower(headers: APIGatewayProxyEventHeaders) {
  return Object.keys(headers).reduce((acc, headerKey) => ({
    ...acc,
    [headerKey.toLowerCase()]: headers[headerKey]
  }), {});
}

/**
 * Formats an API Gateway request to the format used by graphql-helix
 *
 * @param event Raw event from API Gateway
 * @returns Request event for use with graphql-helix
 */
export function formatHelixRequest(event: APIGatewayProxyEventV2): Request {
  return {
    body: event.body ? JSON.parse(event.body) : null,
    headers: headersToLower(event.headers),
    method: event.requestContext.http.method,
    query: event.queryStringParameters
  };
}

/**
 * Formats a response from graphql-helix to the APIGateway format
 *
 * @param result Response from the graphql handler
 * @returns APIGateway compatible response
 */
export function formatHelixResponse<TContext, TRootValue>(
  result: ProcessRequestResult<TContext, TRootValue>
): APIGatewayProxyResultV2 {
  if (result.type === 'RESPONSE') {
    const { headers, status, payload } = result;
    return {
      headers: headers.reduce(
        (acc, header) => ({ ...acc, [header.name]: header.value }),
        {}
      ),
      statusCode: status,
      body: JSON.stringify(payload)
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'unsupported operation type' })
    };
  }
}

