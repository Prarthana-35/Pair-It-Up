import React from 'react';

const Card = ({ data, flipped, onClick }) => {
  if (!data || data.number === undefined) {
    return null;
  }
  return (
    <div
      className={`w-20 h-20 bg-gray-200 rounded shadow transition-all duration-300 ${
        flipped ? 'bg-blue-400' : ''
      }`}
      onClick={onClick}
    >
      {flipped && (
        <p className="text-white text-center text-lg font-bold">
          {data.number}
        </p>
      )}
    </div>
  );
};

export default Card;








//timer.js
// class Timer {
//   constructor(callback) {
//     this.duration = 0; // Count elapsed time
//     this.interval = null;
//     this.callback = callback;
//   }

//   start() {
//     if (this.interval) return; // Prevent multiple intervals

//     console.log("Timer started");
//     this.interval = setInterval(() => {
//       this.duration++;
//       console.log(`Time elapsed: ${this.duration}s`);
//       if (this.callback) this.callback(this.duration);
//     }, 1000);
//   }

//   stop() {
//     if (this.interval) {
//       clearInterval(this.interval);
//       this.interval = null;
//       console.log("Timer stopped");
//     }
//   }

//   reset() {
//     this.stop();
//     this.duration = 0;
//     console.log("Timer reset");
//   }
// }

// export default Timer;
