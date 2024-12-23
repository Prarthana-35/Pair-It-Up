// Timer.js
class Timer {
    constructor(duration, callback) {
      this.duration = duration; // duration in seconds
      this.remainingTime = duration;
      this.callback = callback; // callback function to be called when timer reaches 0
      this.interval = null;
    }
  
    start() {
      if (this.interval) {
        return; // Timer is already running
      }
  
      this.interval = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
          console.log(`Time remaining: ${this.remainingTime}s`);
        } else {
          this.stop();
          this.callback(); // Trigger callback when timer reaches 0
        }
      }, 1000);
    }
  
    stop() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
        console.log("Timer stopped");
      }
    }
  
    reset() {
      this.stop();
      this.remainingTime = this.duration;
      console.log(`Timer reset to ${this.remainingTime}s`);
    }
  
    getTime() {
      return this.remainingTime;
    }
  }
  
  export default Timer;
  