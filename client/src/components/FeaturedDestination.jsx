import React from 'react'
// import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const FeaturedDestination = () => {
  // const navigate = useNavigate();
  const {rooms,navigate}=useAppContext();

  return rooms.length>0 && (
    <div className="px-4"> {/* Added padding to prevent edge overflow */}
      {/* Section Title */}
      <Title
        title="Featured Destination"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
      />

      {/* Cards Section */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
        {rooms.slice(0, 4).map((room, index) => (
          <HotelCard key={room.id} room={room} index={index} />
        ))}
      </div>

      {/* Button Section */}
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

export default FeaturedDestination
