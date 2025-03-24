import { io, Socket } from "socket.io-client";
import { defineStore } from "pinia";

export const useSocketStore = defineStore("socket", {
  state: () => ({
    socket: null as Socket | null,
    isConnected: false,
    transporter: false,
    user: null as any,
  }),

  actions: {
    connect(userID: string, accountType: string, username: string, email: string) {
      if (this.socket) return; // Prevent duplicate connections

      this.socket = io("http://localhost:3002", {
        withCredentials: true, // Needed if using cookies
        transports: ["websocket"], // Ensure WebSocket connection
      });

      // Initial connection check
      if (this.socket.connected) {
        this.onConnect();
      }

      // Listen to connection events
      this.socket.on("connect", this.onConnect);
      this.socket.on("disconnect", this.onDisconnect);

      // Listen to transport upgrades (for example, if switching to WebSocket from polling)
      this.socket.io.engine.on("upgrade", (rawTransport) => {
        this.transporter = true; // Set transporter to true when upgraded
      });

      // Send user data immediately after connecting
      this.socket.on("connect", () => {
        this.socket?.emit("userID", { userID, accountType, username, email });
      });
    },

    onConnect() {
      this.isConnected = true;
      this.transporter = true; // Set transporter to true when connected
    },

    onDisconnect() {
      this.isConnected = false;
      this.transporter = false; // Set transporter to false when disconnected
    },

    disconnect() {
      if (this.socket) {
        this.socket.disconnect();
        this.isConnected = false;
        this.transporter = false; // Set transporter to false when disconnected
      }
    },
  },
});
