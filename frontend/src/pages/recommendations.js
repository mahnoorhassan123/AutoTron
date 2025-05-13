import React, { useState } from 'react';

const HungerRecommendation = () => {
  const [userId, setUserId] = useState('');
  const [hungerLevel, setHungerLevel] = useState(5);
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = () => {
    if (!userId.trim()) {
      alert('Please enter a valid User ID.');
      return;
    }

    const foodRecommendations = {
      low: ['Fruit Salad', 'Yogurt', 'Smoothie'],
      medium: ['Chicken Wrap', 'Grilled Sandwich', 'Rice Bowl'],
      high: ['Burger', 'Pizza', 'Biryani']
    };

    let selected = [];
    if (hungerLevel <= 3) selected = foodRecommendations.low;
    else if (hungerLevel <= 7) selected = foodRecommendations.medium;
    else selected = foodRecommendations.high;

    setRecommendations(selected);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Hunger Level Detection + AI Recommendations
        </h2>

        <div className="mb-4 text-left">
          <label htmlFor="userId" className="block font-medium text-gray-700 mb-1">
            User ID
          </label>
          <input
            id="userId"
            type="text"
            placeholder="Enter your user ID..."
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-6 text-left">
          <label htmlFor="hungerLevel" className="block font-medium text-gray-700 mb-1">
            Hunger Level: <span className="font-bold text-purple-700">{hungerLevel}</span>
          </label>
          <input
            id="hungerLevel"
            type="range"
            min="1"
            max="10"
            value={hungerLevel}
            onChange={(e) => setHungerLevel(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <button
          onClick={getRecommendations}
          className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition duration-200"
        >
          Get Recommendations
        </button>
        {recommendations && recommendations.userName && (
          <p className="mt-2 text-lg font-semibold text-gray-800">
            Hello, {recommendations.userName}!
          </p>
        )}
        {recommendations.length > 0 && (
          <div className="mt-6 text-left">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Recommended Foods:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {recommendations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HungerRecommendation;
