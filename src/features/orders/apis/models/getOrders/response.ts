export type GetOrdersResponse = {
  status: boolean
  message: string
  pageIndex: number
  pageSize: number
  totalPaging: number
  totalRecord: number
  data: Order[] | null
}

type Order = {
  depositExpired: number
  depositPrice: number
  fullName: string | null
  phoneNumber: string | null
  productName: string
  sku: string
  soldPrice: number
  startingPrice: number
  userName: string | null
}
