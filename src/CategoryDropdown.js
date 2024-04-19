// CategoryDropdown.js
import React from 'react';

const categories = [
  { value: 'coffee', label: 'Coffee Shops' },
  { value: 'chinese', label: 'Chinese Restaurants' },
  { value: 'mexican', label: 'Mexican Restaurants' },
  { value: 'italian', label: 'Italian Restaurants' },
  { value: 'burgers', label: 'Burger Joints' },
  { value: 'pizza', label: 'Pizza Places' },
  { value: 'bars', label: 'Bars' },
  { value: 'bakeries', label: 'Bakeries' },
  { value: 'sushi', label: 'Sushi Restaurants' },
  { value: 'breakfast', label: 'Breakfast Spots' },
];

const CategoryDropdown = ({ onCategoryChange }) => {
  const handleChange = (event) => {
    onCategoryChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
        Select a category:
      </label>
      <select
        id="category"
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;