class Timer {
    constructor(duration, callback) {
      this.duration = duration; 
      this.remainingTime = duration;
      this.callback = callback;
      this.interval = null;
    }
  
    start() {
      if (this.interval) {
        return; 
      }
  
      this.interval = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
          console.log(`Time remaining: ${this.remainingTime}s`);
        } else {
          this.stop();
          this.callback(); 
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
  