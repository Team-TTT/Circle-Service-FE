import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CHANNEL } from "../config/constants";

import socketFactory from "../util/socketFactory";

const { getSocket } = socketFactory;

export default function useSocket() {
  const [socket, setSocket] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) {
      setSocket(getSocket());
    } else {
      socket.connect();

      socket.io.on("error", () => {
        navigate("/error");
      });
    }

    return () => {
      if (socket) {
        socket.off(CHANNEL.ANSWER);
        socket.off(CHANNEL.EXISTED_CALLEES);
        socket.off(CHANNEL.RETURN_SIGNAL);
        socket.off(CHANNEL.USER_DISCONNECT);
        socket.off(CHANNEL.OFFER);
        socket.disconnect();
      }
    };
  }, [navigate, socket]);

  return socket;
}
