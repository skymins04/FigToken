import { MessageMethod, REQ_ENDPOINT } from "./message-constant";

export const sendRequestMessage = async (
  method: MessageMethod,
  endpoint: string,
  body: Record<string, unknown> = {}
) => {
  parent.postMessage(
    {
      pluginMessage: {
        body,
        endpoint: REQ_ENDPOINT(method, endpoint),
      },
    },
    "*"
  );
  return new Promise<any>((resolve, reject) => {
    const responseListener = (event: MessageEvent<any>) => {
      const { pluginMessage } = event.data;
      if (
        pluginMessage &&
        pluginMessage.success !== undefined &&
        pluginMessage.endpoint === REQ_ENDPOINT(method, endpoint)
      ) {
        window.removeEventListener("message", responseListener);

        if (pluginMessage.success) {
          resolve(pluginMessage);
        } else {
          reject(pluginMessage);
        }
      }
    };

    window.addEventListener("message", responseListener);
  });
};
