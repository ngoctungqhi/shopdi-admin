import { apis } from 'apis/apis'
import { GetUsersRequest } from './models/getUsers/request'
import { GetUsersResponse } from './models/getUsers/response'

const userApis = apis.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, GetUsersRequest>({
      query: (params) => ({
        url: 'admin/users',
        method: 'GET',
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLazyGetUsersQuery } = userApis
