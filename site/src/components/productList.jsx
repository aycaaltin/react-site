import React from 'react'
import { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'
import Product from './Product';

function productList() {
    const dispatch = useDispatch();
    const {products, selectedCategory} = useSelector((store) => store.product);
    console.log(products);

    const filteredProducts = selectedCategory ? products.filter((product) => product.category === selectedCategory) : products;

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
  return (
   
    <div className='flex-row' style={{flexWrap: 'wrap', marginTop: '25px' }}>
      {
        filteredProducts && filteredProducts.map((product) => {
           return <Product key={product.id} product = {product} />
        })
      }
    </div>
    
   
  )
}

export default productList
