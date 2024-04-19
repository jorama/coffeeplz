import React, { useState, useEffect } from 'react';

const FilterSort = ({ onFilter, onSort }) => {
  const [categories, setCategories] = useState([]);
  const [sortOptions, setSortOptions] = useState([
    { value: 'distance', label: 'Distance' },
    { value: 'rating', label: 'Rating' },
  ]);
  // eslint-disable-next-line no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [selectedSort, setSelectedSort] = useState('distance');

  useEffect(() => {
    // Fetch categories from the /categories endpoint
    // and update the categories state
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
    onSort(event.target.value);
  };

  return (
    <div className="flex items-center mb-4">
      <div className="mr-4">
        <label htmlFor="category" className="mr-2 font-semibold">
          Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="py-1 px-2 rounded-md border border-gray-300"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="sort" className="mr-2 font-semibold">
          Sort by:
        </label>
        <select
          id="sort"
          value={selectedSort}
          onChange={handleSortChange}
          className="py-1 px-2 rounded-md border border-gray-300"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSort;