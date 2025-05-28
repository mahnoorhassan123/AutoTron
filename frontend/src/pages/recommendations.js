import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUtensils } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import { BeatLoader } from 'react-spinners'; // Spinner

const HungerRecommendation = () => {
  const [hungerLevel, setHungerLevel] = useState(5);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (!priceMin || !priceMax) {
      toast.error('Please enter a valid price range!');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8080/api/recommend', {
        hungerLevel,
        priceRange: { min: parseInt(priceMin), max: parseInt(priceMax) }
      });
      setRecommendations(res.data.recommendations);
      toast.success('Recommendations fetched successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 p-6">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="backdrop-blur-md bg-white/30 p-10 rounded-3xl shadow-2xl w-full max-w-2xl">
        {/* Hero Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🍽 AI Food Recommendations
          </h1>
          <p className="text-gray-600">Find the best meal for your hunger and budget</p>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          {/* Hunger Slider */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Hunger Level: {hungerLevel}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={hungerLevel}
              onChange={(e) => setHungerLevel(parseInt(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>

          {/* Price Inputs with spacing */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6 mb-6">
            {/* Min Price */}
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <label className="block text-gray-700 font-semibold mb-2">Min Price (PKR)</label>
              <input
                type="number"
                placeholder="Min"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-purple-500"
              />
            </div>

            {/* Max Price */}
            <div className="w-full sm:w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">Max Price (PKR)</label>
              <input
                type="number"
                placeholder="Max"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-purple-500"
              />
            </div>
          </div>

          {/* Get Recommendations Button */}
          <div className="flex justify-center mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={getRecommendations}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-10 rounded-full transition-all duration-300 shadow-md hover:shadow-xl"
            >
              {loading ? <BeatLoader color="#fff" size={8} /> : 'Get Recommendations'}
            </motion.button>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="mt-12">
          <AnimatePresence>
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col space-y-4"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!loading && recommendations.length > 0 && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {recommendations.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FaUtensils className="text-purple-600 text-3xl" />
                    <span className="font-semibold text-gray-800">{item.itemName}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Results Message */}
          <AnimatePresence>
            {!loading && recommendations.length === 0 && (
              <motion.div
                className="flex flex-col items-center justify-center text-gray-600 mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-5xl mb-4">😔</p>
                <h3 className="text-xl font-semibold mb-2">No food items found!</h3>
                <p className="text-sm text-gray-400 mb-6">Try adjusting your hunger level or price range.</p>

                {/* Retry Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={getRecommendations}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg transition"
                >
                  {loading ? <BeatLoader color="#fff" size={8} /> : 'Retry'}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HungerRecommendation;