import React from 'react';

const Card = ({ data, flipped, onClick }) => {
  // Ensure `data` and `data.number` exist
  if (!data || data.number === undefined) {
    return null;  // Return null if data is invalid
  }

  return (
    <div
      className={`w-20 h-20 bg-gray-200 rounded shadow transition-all duration-300 ${
        flipped ? 'bg-blue-400' : '' // Change background color when flipped
      }`}
      onClick={onClick}
    >
      {flipped && (
        <p className="text-white text-center text-lg font-bold">
          {data.number} {/* Display the number or pair */}
        </p>
      )}
    </div>
  );
};

export default Card;


// const Card = ({ data, flipped, onClick }) => {
//   if (!data || data.number === undefined) {
//     return null;  // Return null if data is invalid
//   }
//   return (
//     <div
//       className={`w-20 h-20 bg-gray-200 rounded shadow ${
//         flipped ? 'bg-blue-400' : ''
//       }`}
//       onClick={onClick}
//     >
//       {flipped && (
//         <p className="text-white text-center text-lg font-bold">
//           {data.pair.join(' ')}
//         </p>
//       )}
//     </div>
//   );
// };

// const Card = ({ data, flipped, onClick }) => {
//   // Ensure `data` and `data.number` exist
//   if (!data || data.number === undefined) {
//     return null;  // Return null if data is invalid
//   }

//   return (
//     <div
//       className={`card ${flipped ? 'flipped' : ''}`}
//       onClick={onClick}
//     >
//       {flipped ? data.number : '?'}
//     </div>
//   );
// };

// export default Card;

