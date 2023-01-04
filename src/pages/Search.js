import React, {useEffect, useState} from 'react'
import axios from 'axios'
import SearchList from '../components/SearchList';


const Search = () => {
  const [searchField, setSearchField] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  useEffect(()=>{
    const fetchAllRestaurants = async ()=>{
      try {
        const res = await axios.get("http://localhost:5000/apis/restaurants");
        setRestaurants(res.data)
      } catch (error){
        console.log(error);
      }
    };
    fetchAllRestaurants();
  },[]);

  const handleChange = (e) =>{
    setSearchField(e.target.value);
  };
  const handleDelete = async (id) =>{
    try {
      await axios.delete(`http://localhost:5000/apis/restaurants/${id}`);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };
  const filteredRestarants = restaurants.filter((restaurant)=>{
    return (
     restaurant.name.includes(searchField) || 
     restaurant.type.includes(searchField
    ));
  })
  const searchlist = () =>{
    return (
      <SearchList 
          filteredRestarants={filteredRestarants} 
          handleDelete={handleDelete}
          />
    );
  }
  return (
    <div className='container'>
      <h1>Grab Restaurant</h1>
      <div className='row'>
        <input className='search' type="text" placeholder='Search restaurant' onChange={handleChange}/>
      </div>
      <div className='row'>
        <div className="restaurants">{searchlist()}</div>
      </div>
    </div>
  )
}

export default Search