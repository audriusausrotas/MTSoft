import { Socket } from "socket.io-client";
// import { useMessagesStore } from "@/stores/messages"; // Example of using another Pinia store

export default function archiveListeners(socket: Socket) {
  //   const messagesStore = useMessagesStore();

  socket.on("archiveDeleted", (data) => {
    // get data._id and data.location what can be archive, unconfirmed, deleted, backup
  });

  socket.on("restore archive", (data) => {
    // get data._id and data.location what can be archive, unconfirmed, deleted, backup
  });

  socket.on("addArchive", (data) => {
    // get data is archive object just push it to store and delete from projects
  });

  socket.on("addUnconfirmed", (data) => {
    // get data is unconfirmed data just push it to store and delete from projects
  });
}
