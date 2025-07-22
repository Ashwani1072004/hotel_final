import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const RecommendedHotels = () => {
  const { rooms, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);
  const navigate = useNavigate();

  const filterHotels = () => {
    const filteredHotels = rooms.filter(room =>
      searchedCities.includes(room.hotel.city)
    );
    setRecommended(filteredHotels);
  }

  useEffect(() => {
     
  }, [rooms, searchedCities]);

  return recommended.length > 0 && (
    <div className="px-4">
      <Title
        title="Recommended Hotels"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
      />

      <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
        {recommended.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => {
            navigate('/rooms');
            scrollTo(0, 0);
          }}
          className="my-16 px-6 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-100 transition-all shadow-sm"
        >
          View All Destinations
        </button>
      </div>
    </div>
  );
}

export default RecommendedHotels;
