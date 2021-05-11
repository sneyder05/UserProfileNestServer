export interface IRequestResponse<T> {
  data?: T,
  statusCode: number,
  message: string,
  error?: string
}