import { useEffect, useState } from 'react'
import { useLazyGetProductsQuery } from './apis/productApis'

export const useProducts = () => {
  const [lazyGetProductsQuery, { isLoading }] = useLazyGetProductsQuery()
  const [products, setProducts] = useState([])
  const [totalRecord, setTotalRecord] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getProducts = async () => {
      const response = await lazyGetProductsQuery({
        pageIndex: page,
        pageSize: 10,
      }).unwrap()
      setProducts(response.data)
      setTotalRecord(response.totalRecord)
    }

    getProducts()
  }, [lazyGetProductsQuery, page])

  const handlePageChange = (page) => {
    setPage(page)
  }

  return { products, isLoading, totalRecord, handlePageChange }
}
