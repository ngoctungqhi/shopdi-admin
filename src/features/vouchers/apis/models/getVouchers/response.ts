export type GetVouchersResponse = {
  status: boolean
  message: string
  pageIndex: number
  pageSize: number
  totalPaging: number
  totalRecord: number
  data: Voucher[] | null
}

type Voucher = {
  amountExpect: string
  createdDate: string
  descriptions: string | null
  expireDate: string
  id: string
  name: string
  total: number
  totalUse: number
}
