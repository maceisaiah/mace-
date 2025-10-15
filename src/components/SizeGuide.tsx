'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuide({ isOpen, onClose }: SizeGuideProps) {
  const [activeTab, setActiveTab] = useState('hoodies');

  const sizeData = {
    hoodies: {
      title: 'Hoodies & Sweatshirts',
      measurements: [
        { size: 'XS', chest: '32-34"', length: '26"', sleeve: '24"' },
        { size: 'S', chest: '34-36"', length: '27"', sleeve: '25"' },
        { size: 'M', chest: '36-38"', length: '28"', sleeve: '26"' },
        { size: 'L', chest: '38-40"', length: '29"', sleeve: '27"' },
        { size: 'XL', chest: '40-42"', length: '30"', sleeve: '28"' },
        { size: '2XL', chest: '42-44"', length: '31"', sleeve: '29"' },
      ]
    },
    tees: {
      title: 'T-Shirts',
      measurements: [
        { size: 'XS', chest: '30-32"', length: '25"', sleeve: '7"' },
        { size: 'S', chest: '32-34"', length: '26"', sleeve: '7.5"' },
        { size: 'M', chest: '34-36"', length: '27"', sleeve: '8"' },
        { size: 'L', chest: '36-38"', length: '28"', sleeve: '8.5"' },
        { size: 'XL', chest: '38-40"', length: '29"', sleeve: '9"' },
        { size: '2XL', chest: '40-42"', length: '30"', sleeve: '9.5"' },
      ]
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold tracking-wider">SIZE GUIDE</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <div className="flex space-x-4 border-b border-gray-700">
              {Object.keys(sizeData).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`pb-2 px-1 font-medium transition-colors ${
                    activeTab === category
                      ? 'text-white border-b-2 border-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {sizeData[category as keyof typeof sizeData].title}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold">Size</th>
                  <th className="text-left py-3 px-4 font-semibold">Chest</th>
                  <th className="text-left py-3 px-4 font-semibold">Length</th>
                  <th className="text-left py-3 px-4 font-semibold">
                    {activeTab === 'hoodies' ? 'Sleeve' : 'Sleeve Length'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizeData[activeTab as keyof typeof sizeData].measurements.map((item) => (
                  <tr key={item.size} className="border-b border-gray-800">
                    <td className="py-3 px-4 font-semibold">{item.size}</td>
                    <td className="py-3 px-4">{item.chest}</td>
                    <td className="py-3 px-4">{item.length}</td>
                    <td className="py-3 px-4">{item.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <h3 className="font-semibold mb-2">How to Measure:</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Chest:</strong> Measure around the fullest part of your chest</li>
              <li>• <strong>Length:</strong> Measure from the highest point of the shoulder to the bottom hem</li>
              <li>• <strong>Sleeve:</strong> Measure from shoulder seam to cuff</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}



