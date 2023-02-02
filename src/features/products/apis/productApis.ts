import { apis } from 'apis/apis'
import { GetProductsRequest } from './models/getProducts/request'
import { GetProductsResponse } from './models/getProducts/response'

const productApis = apis.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsRequest>({
      query: (params) => ({
        url: 'products',
        method: 'GET',
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLazyGetProductsQuery } = productApis
