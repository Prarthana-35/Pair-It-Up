// Multiplayer.js
class Multiplayer {
    constructor(serverUrl) {
      this.serverUrl = serverUrl;
      this.socket = null;
    }
  
    connect() {
      this.socket = new WebSocket(this.serverUrl);
  
      this.socket.onopen = () => {
        console.log("Connected to the multiplayer server.");
      };
  
      this.socket.onmessage = (message) => {
        this.handleMessage(message);
      };
  
      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
  
      this.socket.onclose = () => {
        console.log("Disconnected from the multiplayer server.");
      };
    }
  
    sendMessage(message) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(message);
        console.log("Message sent:", message);
      } else {
        console.error("Unable to send message, not connected.");
      }
    }
  
    handleMessage(message) {
      const data = JSON.parse(message.data);
      console.log("Received message:", data);
  
      if (data.type === "gameState") {
        this.updateGameState(data.state);
      }
    }
  
    updateGameState(state) {
      console.log("Game state updated:", state);
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
      }
    }
  }
  
  export default Multiplayer;
  