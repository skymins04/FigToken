import { useEffect } from "react";
import { sendRequestMessage } from "../common/message/message-request";

function App() {
  useEffect(() => {
    sendRequestMessage("GET", "/")
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log("success", res);
      })
      .catch((e) => {
        console.error("error", e);
      });
  }, []);

  return <></>;
}

export default App;
