import { io, Socket } from "socket.io-client";
import socketListeners from "~/sockets/main";
import { defineStore } from "pinia";

export const useSocketStore = defineStore("socket", {
  state: () => ({
    socket: null as Socket | null,
    isConnected: false,
    transporter: false,
  }),

  actions: {
    connect() {
      if (this.socket) return;

      this.socket = io("http://localhost:3002", {
        withCredentials: true,
        transports: ["websocket"],
      });

      if (this.socket.connected) {
        this.onConnect();
      }

      this.socket.on("connect", () => {
        this.onConnect();
      });

      this.socket.on("disconnect", () => {
        this.onDisconnect();
      });

      socketListeners(this.socket as Socket);

      this.socket.io.engine.on("upgrade", (rawTransport) => {
        this.transporter = rawTransport.name === "websocket" ? true : false;
      });
    },

    onConnect() {
      this.isConnected = true;
      this.transporter = this.socket?.io.engine.transport.name === "websocket" ? true : false;
    },

    onDisconnect() {
      this.isConnected = false;
      this.transporter = false;
    },

    disconnect() {
      if (this.socket) {
        this.socket.disconnect();
        this.isConnected = false;
        this.transporter = false;
      }
    },
  },
  getters: {
    connected: (state) => {
      return state.isConnected && state.transporter;
    },
  },
});
