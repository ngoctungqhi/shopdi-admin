import { GetIdosResponse } from './models/getIdos/response'
import { GetIdoRequest } from './models/getIdo/request'
import { apis } from 'apis/apis'
import { InsertIdoRequest } from './models/insertIdo/request'
import { GetIdoResponse } from './models/getIdo/response'
import { GetIdosRequest } from './models/getIdos/request'
import { InsertIdoResponse } from './models/insertIdo/response'
import { UpdateIdoRequest } from './models/updateIdo/request'

const idoApis = apis.injectEndpoints({
  endpoints: (builder) => ({
    insertIdo: builder.mutation<InsertIdoResponse, InsertIdoRequest>({
      query: (params) => ({
        url: 'admin/idos',
        method: 'POST',
        body: params,
      }),
    }),
    getIdo: builder.query<GetIdoResponse, GetIdoRequest>({
      query: (params) => ({
        url: `admin/idos/${params.id}`,
        method: 'GET',
      }),
    }),
    getIdos: builder.query<GetIdosResponse, GetIdosRequest>({
      query: () => ({
        url: 'admin/idos',
        method: 'GET',
      }),
    }),
    updateIdo: builder.mutation<void, UpdateIdoRequest>({
      query: ({ _id, ...params }) => ({
        url: `admin/idos/${_id}`,
        method: 'PUT',
        body: params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useInsertIdoMutation,
  useLazyGetIdoQuery,
  useLazyGetIdosQuery,
  useUpdateIdoMutation,
} = idoApis
