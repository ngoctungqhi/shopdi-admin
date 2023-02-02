export type GetUsersResponse = {
  status: boolean
  message: string
  pageIndex: number
  pageSize: number
  totalPaging: number
  totalRecord: number
  data: User[] | null
}

type User = {
  avatar: string | null
  birthDay: string | null
  bonusRefernal: number | null
  email: string | null
  error: string | null
  facebookKey: string | null
  gender: number
  googleKey: string | null
  kol: number
  name: string | null
  phone: string | null
  point: number
  userId: string
  walletCode: string | null
}
