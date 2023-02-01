import { apis } from 'apis/apis'
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
  }),
  overrideExisting: false,
})

export const { useLoginMutation } = authApis
