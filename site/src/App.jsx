import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import CategoryList from './components/CategoryList'
import ProductList from './components/productList'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux'
import { calculateBasket, setDrawer, removeProduct} from './redux/slices/basketSlice'
import { useEffect } from 'react'


function App() {

  const { products , drawer, totalAmount } = useSelector((store) => store.basket);

  const dispatch = useDispatch();


 
  const removeProductFromBasket = (productId) => {
    // localStorage'dan silme işlemi
    dispatch(removeProduct(productId)); 
    const updatedBasket = products.filter((product) => product.id !== productId);
    writeFromBasketStorage(updatedBasket);
   
  }

  useEffect(() =>{
    dispatch(calculateBasket());
  },[products]);
  
  return (
    <div className="app">
      
      <Header />
      
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
       
        <div style={{ width: '250px', padding: '20px', height: '100%', overflowY: 'auto' }}>
          <CategoryList />
        </div>

        <div style={{ flex: 1, padding: '20px', height: '100%', overflowY: 'auto' }}>
          <ProductList />
        </div>
      </div>
      <Drawer
        anchor="right"
        sx={{ padding: '20px' }}
        onClose={() => dispatch(setDrawer())}
        open={drawer}
      >
        {products && products.map((product) => (
          <div key={product.id}>
            <div className="flex-row" style={{ padding: '20px' }}>
              <img style={{ marginRight: '5px' }} src={product.image} width={50} height={50} />
              <p style={{ width: '320px', marginRight: '5px' }}>{product.title} ({product.count})</p>
              <p style={{ fontWeight: 'bold', marginRight: '10px', width: '60px' }}>{product.price} TL</p>
              <button
                onClick={() => removeProductFromBasket(product.id)}
                style={{
                  padding: '5px',
                  borderRadius: '5px',
                  backgroundColor: 'rgb(185,76,76)',
                  border: 'none',
                  color: '#fff',
                  width: '50px'
                }}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
        <div>
          <p>Toplam Tutar: {totalAmount}</p>
        </div>
      </Drawer>
    </div>
  )
}

export default App
