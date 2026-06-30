import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let client = null;

export const connectWebSocket = (onMessageReceived) => {

  client = new Client({

    webSocketFactory: () =>
      new SockJS("http://localhost:8080/ws"),

    reconnectDelay: 5000,

    onConnect: () => {
      console.log("✅ Connected to WebSocket");

      client.subscribe("/topic/alerts", (message) => {
        onMessageReceived(message.body);
      });
    },

    onStompError: (frame) => {
      console.error(frame);
    },

  });

  client.activate();
};

export const disconnectWebSocket = () => {

  if (client) {
    client.deactivate();
  }

};