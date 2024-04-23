import React from 'react';
import axios from 'axios';

const PlacesSearch = ({ address, category, onPlacesUpdate }) => {
  const handleSearch = async () => {
    try {
      const searchParams = new URLSearchParams({
        near: address,
        categories: category,
        limit: 10,
        fields: 'fsq_id,name,location,rating,categories',
      });

      const response = await axios.get(
        `https://api.foursquare.com/v3/places/search?${searchParams}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: 'fsq38XyJZ6AXlWejpMClNvTsDrdeIoosHP6icQ7QiiDsHuI=',
          },
        }
      );

      const places = response.data.results;

      const placesWithPhotos = await Promise.all(
        places.map(async (place) => {
          try {
            const photoParams = new URLSearchParams({
              limit: 1,
            });

            const photoResponse = await axios.get(
              `https://api.foursquare.com/v3/places/${place.fsq_id}/photos?${photoParams}`,
              {
                headers: {
                  Accept: 'application/json',
                  Authorization: 'fsq38XyJZ6AXlWejpMClNvTsDrdeIoosHP6icQ7QiiDsHuI=',
                },
              }
            );

            const photoData = photoResponse.data;
            const photos = photoData.map((photo) => photo.prefix + 'original' + photo.suffix);

            return {
              ...place,
              photos,
            };
          } catch (error) {
            console.error(`Error fetching photos for place ${place.fsq_id}:`, error);
            return place;
          }
        })
      );

      onPlacesUpdate(placesWithPhotos);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  return (
    <div>
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  );
};

export default PlacesSearch;