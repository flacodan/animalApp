import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  
  const [categories, setCategories] = useState([]);
  const [species, setSpecies] = useState([]);
  const [formData, setFormData] = useState({});

      
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categoryList');
        setCategories(response.data);
      } catch (err) {
        console.error('Error getting categories: ', response.status);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await axios.get('/api/getAllSpecies');
        setSpecies(response.data);
      } catch (err) {
        console.error('Error getting species: ', response.status);
      };
    };
    fetchSpecies();
  }, []);

  const handleFilterList = async () => {
    try {
      console.log("handleFilter: " + category_id);
      const response = await axios.get('/api/getSpeciesByCategory', { params: category_id });
      setSpecies(response.data);
    } catch (err) {
      console.error('Error getting filtered species: ', response.status);
    };
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'length' || name === 'category') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: +value,
      }));
    } else {
      setFormData((prevData) => ({
          ...prevData,
          [name]: value,
      }));
    }
    console.log("Name " + name + " value " + value);
  };

  const handleSave = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    console.log("Form: " + JSON.stringify(formData));
    // if(formData.name && formData.length && formData.category && formData.color) {
    //     onSaveChanges(formData);
    // } else {
    //   console.log("Must enter values");
    // }
  };


  return (
    <>
      <div id='app-top'>
        <div id="title-filter">
          <div id='app-title'>THE ANIMAL APP</div>
          <label>
            Filter by:
            <select
              onChange={(e) => handleFilterList(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option
                  key={category.category_id}
                  id={`filter-category-${category.category_id}`}
                  name={`filter-category-${category.name}`}
                  value={category.category_id}
                  onChange={(e) => {
                    // setFormData(e.currentTarget.value);
                  }}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div id="animal-input">
          <form>
              <label>
                Name:
                <input
                    type='text'
                    autoFocus
                    name='name'
                    onChange={handleInputChange}
                />
              </label>
              <label>
                Animal category: 
                <select
                    onChange={(e) => setFormData({ ...formData, category: +e.target.value })}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option
                      key={category.category_id}
                      id={`category-${category.category_id}`}
                      name={category.name}
                      value={category.category_id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Length (ft):
                <input
                    type='integer'
                    name='length'
                    onChange={handleInputChange}
                />
              </label>
              <label>
                Color:
                <input
                    type='text'
                    name='color'
                    onChange={handleInputChange}
                />
              </label>
              <label>
                Picture URL:
                <input
                    type='text'
                    name='url'
                    onChange={handleInputChange}
                />
              </label>
          </form>
          <button type="submit" onClick={handleSave}>Submit</button>
        </div>
      </div> 
      <div id='animal-card-container'>
        {species.map((species) => (
          <div
            key={species.species_id}
            id={species.species_id}
            name={species.name}
            className='card'
            background-color={categories[species.category_id-1].color}
          >
            <h3>{species.name}</h3>
            <img src={species.url} alt={species.name} />
            <h4>Length: {species.length} ft.</h4>
            <h4>Color: {species.color}</h4>
            <h4>Category: {categories[species.category_id-1].name}</h4>
          </div>
        ))}
      </div>
    </>
  )
}

export default App

// give each animal card background color from it's category
// each animal card has Name, Length, Color, Category, Picture