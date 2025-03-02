import React, { useState } from 'react';

function PriceRange({ min, max }) {
  const [minVal, setMinValue] = useState(min);
  const [maxVal, setMaxValue] = useState(max);
  const [curPrice, setCurPrice] = useState(max);

  const handleChange = (e) => {
    setCurPrice(e.target.value);
  };

  return (
    <div>
        <div>
        <p>Current Price: {curPrice}</p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={curPrice}
        onChange={handleChange}
      />
      
    </div>
  );
}

export default PriceRange;
