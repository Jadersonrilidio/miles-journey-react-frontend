export default interface IDestination {
  uuid: string
  name: string
  price: number
  description: string
  meta: string
  photo_1: string
  photo_2?: string
  created_at: string
  updated_at: string
}