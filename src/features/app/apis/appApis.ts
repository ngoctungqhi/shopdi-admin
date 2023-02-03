import { apis } from 'apis/apis'
import { GetAccountInfoResponse } from './models/getAccountInfo/response'
import { LoginRequest } from './models/login/request'
import { LoginResponse } from './models/login/response'

const authApis = apis.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (params) => ({
        url: 'admin/authenticate',
        method: 'POST',
        body: params,
      }),
    }),
    getAccountInfo: builder.query<GetAccountInfoResponse, void>({
      query: () => ({
        url: 'me',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useLazyGetAccountInfoQuery } = authApis
