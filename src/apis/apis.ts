import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from 'configs/constants/constants'

const customBaseQuery = (
  args: FetchBaseQueryArgs
): ReturnType<typeof fetchBaseQuery> => {
  const baseQuery = fetchBaseQuery(args)

  return async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    // ↑のリクエストが認証エラーでレスポンスが401だった場合にリトライ
    if (result.error && result.error.status === 401) {
      localStorage.clear()
      window.location.href = 'login'
    }

    return result
  }
}

export const apis = createApi({
  reducerPath: 'apis',
  baseQuery: customBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
})
