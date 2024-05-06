export default interface APIResponseSchema<T> {
  status: string
  message?: string
  data?: T
}