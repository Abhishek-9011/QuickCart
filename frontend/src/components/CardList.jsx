import React, { useState } from 'react';

const Card = ({ image, title, description, additionalInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`relative rounded-3xl overflow-hidden shadow-md transition-all duration-300  ${
        isExpanded ? 'w-96 h-auto' : 'w-52 h-72'
      } cursor-pointer`}
      onClick={toggleExpand}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 p-4 text-white bg-black bg-opacity-50">
        <h2 className="text-xl font-semibold">{title}</h2>
        {!isExpanded && <p className="text-sm">{description}</p>}
        {isExpanded && (
          <div className="mt-2">
            <p className="text-sm">{additionalInfo}</p>
          </div>
        )}
      </div>
      {isExpanded && (
        <button
          onClick={toggleExpand}
          className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 hover:bg-gray-300 text-gray-800"
        >
          X
        </button>
      )}
    </div>
  );
};

const CardList = () => {
  const cardData = [
    {
      image: 'https://pplx-res.cloudinary.com/image/upload/v1741188536/user_uploads/PiYYGzUDwBPmrmE/image.jpg',
      title: 'Mini-crocodile',
      description: 'A small crocodile in a tank.',
      additionalInfo: 'More information about mini crocodiles and their care.',
    },
    {
      image: 'https://pplx-res.cloudinary.com/image/upload/v1741188536/user_uploads/PiYYGzUDwBPmrmE/image.jpg',
      title: 'Snake',
      description: 'A snake in a terrarium.',
      additionalInfo: 'Details about snake species and habitat.',
    },
    {
      image: 'https://pplx-res.cloudinary.com/image/upload/v1741188536/user_uploads/PiYYGzUDwBPmrmE/image.jpg',
      title: 'Japanese carp',
      description: 'Beautiful Japanese carp swimming.',
      additionalInfo: 'Information about koi and pond maintenance.',
    },
    {
      image: 'https://pplx-res.cloudinary.com/image/upload/v1741188536/user_uploads/PiYYGzUDwBPmrmE/image.jpg',
      title: 'Turtle',
      description: 'A turtle resting on the rocks.',
      additionalInfo: 'Care instructions for pet turtles.',
    },
    {
      image: 'https://pplx-res.cloudinary.com/image/upload/v1741188536/user_uploads/PiYYGzUDwBPmrmE/image.jpg',
      title: 'Octopus',
      description: 'An octopus in its aquarium.',
      additionalInfo: 'Interesting facts about octopuses and their behavior.',
    },
  ];

  return (
    <div className="flex flex-row justify-center items-center gap-4">
      {cardData.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
          additionalInfo={card.additionalInfo}
        />
      ))}
    </div>
  );
};

export default CardList;
