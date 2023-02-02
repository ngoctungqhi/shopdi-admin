import { apis } from 'apis/apis'
import { GetOrdersRequest } from './models/getOrders/request'
import { GetOrdersResponse } from './models/getOrders/response'

const orderApis = apis.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<GetOrdersResponse, GetOrdersRequest>({
      query: (params) => ({
        url: 'hiddenprice/deposited',
        method: 'GET',
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLazyGetOrdersQuery } = orderApis
