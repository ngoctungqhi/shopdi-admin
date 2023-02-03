import { apis } from 'apis/apis'
import { UpdatePasswordRequest } from './models/updatePassword/request'

const accountSettingApis = apis.injectEndpoints({
  endpoints: (builder) => ({
    updatePassword: builder.mutation<void, UpdatePasswordRequest>({
      query: (params) => ({
        url: 'password',
        method: 'PUT',
        body: params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useUpdatePasswordMutation } = accountSettingApis
