import { apis } from 'apis/apis'
import { GetVouchersRequest } from './models/getVouchers/request'
import { GetVouchersResponse } from './models/getVouchers/response'

const voucherApis = apis.injectEndpoints({
  endpoints: (builder) => ({
    getVouchers: builder.query<GetVouchersResponse, GetVouchersRequest>({
      query: (params) => ({
        url: 'campaign',
        method: 'GET',
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLazyGetVouchersQuery } = voucherApis
