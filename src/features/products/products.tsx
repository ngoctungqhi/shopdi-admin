import { memo } from 'react'
import { useProducts } from './useProducts'

export const Products = memo(() => {
  const { products, isLoading, totalRecord, handlePageChange } = useProducts()
  return (
    <div>
      <h4 className="text-xl">Danh sách sản phẩm</h4>
    </div>
  )
})
