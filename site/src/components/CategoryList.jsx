import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../redux/slices/productSlice';

function CategoryList() {
    const { categories } = useSelector((store) => store.product);
    const dispatch = useDispatch();

    const handleCategorySelect = (category) => {
        dispatch(setSelectedCategory(category));
    };

  return (
    <div className='category-list' style={{ width: "250px" , padding: "20px", borderRight: "1px solid #ccc"}}>
      <h3>Kategoriler</h3>
      <ul style={{listStyleType: "none", padding: "0"}}>
        {categories.map((category,index) => (
            <li key = {index} onClick={() => handleCategorySelect(category)} style={{cursor: "pointer" , padding: "10px", borderBottom: "1px solid #ccc"}} >
                  {category}
            </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList
