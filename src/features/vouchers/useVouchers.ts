import { useEffect, useState } from 'react'
import { useLazyGetVouchersQuery } from './apis/voucherApis'

export const useVouchers = () => {
  const [lazyGetVouchersQuery, { isLoading }] = useLazyGetVouchersQuery()
  const [vouchers, setVouchers] = useState([])
  const [totalRecord, setTotalRecord] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getProducts = async () => {
      const response = await lazyGetVouchersQuery({
        pageIndex: page,
        pageSize: 10,
      }).unwrap()
      setVouchers(response.data)
      setTotalRecord(response.totalRecord)
    }

    getProducts()
  }, [lazyGetVouchersQuery, page])

  const handlePageChange = (page) => {
    setPage(page)
  }

  return { vouchers, isLoading, totalRecord, handlePageChange }
}
