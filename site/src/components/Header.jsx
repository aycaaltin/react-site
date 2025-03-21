import React, { useState } from 'react'
import '../css/Header.css';
import '../App.css';
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';


function Header({product}) {

   const [theme , setTheme] = useState(false);

   const [searchTerm, setSearchTerm] = useState('');

   const navigate = useNavigate();

   const dispatch = useDispatch();

    const { products } = useSelector((store) => store.basket);
    

    const { title } = product || {} ;
  

   const changeTheme = () => {
    const root = document.getElementById("root");
    if(theme) {
      root.style.backgroundColor = "black";
      root.style.color = "#fff";
    } else {
      root.style.backgroundColor = "#fff";
      root.style.color = "black";
    }
    setTheme(!theme);
   }

   const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
   };

   const filteredProducts = products.filter((product) => product.title.trim().toLowerCase().includes(searchTerm.trim().toLowerCase()));
  
  

  return (
    <div style={{display: 'flex' , flexDirection:'center', justifyContent: 'space-between'}}>
        <div className='flex-row' onClick={() =>navigate("/")}>
            <img className='logo' src='./src/images/logo.png'/>
            <p className='logo-text'>AYÇA BUTİK</p>
        </div>
        

        <div className='flex-row'>
            <input className='search-input' type='text' placeholder='Bir şeyler ara'
            value={searchTerm}
            onChange={handleSearchChange}
            />
            <div>
              { theme ? <FaMoon className='icon' onClick={changeTheme}/> : <CiLight className='icon'onClick={changeTheme}/>}
              <Badge onClick={()=> dispatch(setDrawer())
              } badgeContent={products.length} color="error">
              <CiShoppingBasket className='icon' />    </Badge>
           
            </div>
        </div>

        {searchTerm && (
          <div>
            <ul>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product,index) =>(
                  <li key={index}>{product.title}</li>
                ))
              ) : (
                <p>Sonuç Bulunamadı.</p>
              )}
            </ul>
            </div>
        )}
    </div>
  );
}

export default Header
