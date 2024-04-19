import React from 'react';

const PlaceCard = ({ place, onClick }) => {
  const isOpen = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();

    const hoursData = place.hours.week_timings;
    if (!hoursData) {
      return false;
    }

    const dayHours = hoursData.find((day) => day.day === currentDay);
    if (!dayHours || !dayHours.open) {
      return false;
    }

    const { open, close } = dayHours.segments[0];
    const openHour = parseInt(open.slice(0, 2), 10);
    const closeHour = parseInt(close.slice(0, 2), 10);

    return currentHour >= openHour && currentHour < closeHour;
  };

  const getPriceRange = () => {
    const priceRange = place.price ? place.price.tier : undefined;
    switch (priceRange) {
      case 1:
        return '$';
      case 2:
        return '$$';
      case 3:
        return '$$$';
      case 4:
        return '$$$$';
      default:
        return '';
    }
  };

  const getCategoryIcon = () => {
    const categoryIcon = place.categories.map((category) => {
      switch (category.id) {
        case '4bf58dd8d48988d16c941735':
          return '🍔';
        case '4bf58dd8d48988d145941735':
          return '🍕';
        case '4bf58dd8d48988d10c941735':
          return '🌮';
        case '4bf58dd8d48988d110941735':
          return '🥡';
        case '4bf58dd8d48988d112941735':
          return '🍛';
        default:
          return '🍽️';
      }
    });
    return categoryIcon.join('');
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">{place.name}</h2>
          {isOpen() ? (
            <span className="text-green-600 font-semibold">Open</span>
          ) : (
            <span className="text-red-600 font-semibold">Closed</span>
          )}
        </div>
        <p className="text-gray-600 mb-2">
          {place.location.address},<br />
          {place.location.locality}, {place.location.region}{' '}
          {place.location.postcode}
        </p>
        <div className="flex items-center mb-2">
          <span className="mr-2">{place.rating}</span>
          {Array(Math.floor(place.rating))
            .fill()
            .map((_, index) => (
              <svg
                key={index}
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          {place.rating % 1 !== 0 && (
            <svg
              className="h-5 w-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="flex items-center">
          <span className="mr-2">{getPriceRange()}</span>
          <span>{getCategoryIcon()}</span>
        </div>
        <p className="text-gray-600 text-sm">
          {(place.distance / 1000).toFixed(2)} km away
        </p>
      </div>
    </div>
  );
};

export const calculateDistance = (coordinates, targetLatitude, targetLongitude) => {
  if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
    return 0;
  }

  const { latitude, longitude } = coordinates;

  const toRad = (value) => (value * Math.PI) / 180;

  const distance =
    Math.acos(
      Math.sin(toRad(targetLatitude)) * Math.sin(toRad(latitude)) +
        Math.cos(toRad(targetLatitude)) *
          Math.cos(toRad(latitude)) *
          Math.cos(toRad(targetLongitude) - toRad(longitude))
    ) * 6371000;

  return distance;
};

export default PlaceCard;