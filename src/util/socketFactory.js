import io from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

const createSocket = () => {
  let socket = null;

  const getSocket = () => {
    if (socket) {
      return socket;
    }

    socket = io(SOCKET_URL, {
      path: "/circle-io",
      transports: ["websocket"],
    });

    return socket;
  };

  return { getSocket };
};

const socketFactory = createSocket();

export default socketFactory;
