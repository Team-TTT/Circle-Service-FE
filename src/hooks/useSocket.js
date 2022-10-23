import { useEffect, useState } from "react";
import { CHANNEL } from "../config/constants";

import socketFactory from "../util/socketFactory";

const { getSocket } = socketFactory;

export default function useSocket() {
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (!socket) {
      setSocket(getSocket());
    } else {
      socket.connect();

      socket.on("connect", () => {
        console.log("소켓 연결성공");
      });
    }

    return () => {
      if (socket) {
        console.log("소켓 연결 종료");
        socket.off(CHANNEL.ANSWER);
        socket.off(CHANNEL.EXISTED_CALLEES);
        socket.off(CHANNEL.RETURN_SIGNAL);
        socket.off(CHANNEL.USER_DISCONNECT);
        socket.off(CHANNEL.OFFER);
        socket.disconnect();
      }
    };
  }, [socket]);

  return socket;
}
