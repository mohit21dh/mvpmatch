export interface IGateway {
  gatewayId: string;
  userIds: string[];
  name: string;
  type: string;
  apiKey: string;
  secondaryApiKey: string;
  description: string;
}

export interface IGatewayResponseData {
  code: string;
  data: IGateway[];
  error: any;
}
