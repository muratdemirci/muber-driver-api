import { request } from 'undici'

export async function requestHandler(channelUrl: string, accessToken: string): Promise<Object> {
  // send request with http client
  const { statusCode, headers, body } = await request(channelUrl, {
    headers: { 'x-access-token': accessToken },
  })

  const channelBody = await body.json()
  const channelHeaders = await headers
  const channelStatusCode = await statusCode

  const channelData = {
    channelStatusCode: channelStatusCode,
    channelHeaders: channelHeaders,
    channelBody: channelBody,
  }
  return channelData
}
