import io from "socket.io-client";
import store from "./store";
import {
  removeOfflineUser,
  addOnlineUser,
  receiveNewMessage,
} from "./store/conversations";

export default function createSocket(token) {
  const socket = io(window.location.origin, {
    query: {token}
  });
  
  socket.on("connect", () => {
  
    socket.on("add-online-user", (id) => {
      store.dispatch(addOnlineUser(id));
    });
  
    socket.on("remove-offline-user", (id) => {
      store.dispatch(removeOfflineUser(id));
    });
    socket.on("new-message", (data) => {
      store.dispatch(receiveNewMessage(data.message, data.sender));
    });
  });

  return socket;
}
