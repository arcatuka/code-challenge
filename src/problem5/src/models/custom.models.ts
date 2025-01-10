export interface ResourceRequest {
  id?: string;
  name?: string;
  description?: string;
}

export interface ResourceResponse {
  id: number;
  name: string;
  description: string;
  status: string;
}

export interface ErrorResponse {
  message: string;
}
