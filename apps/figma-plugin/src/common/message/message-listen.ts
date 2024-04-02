import { MessageMethod, REQ_ENDPOINT } from "./message-constant";

type MessageListenerHandler = (body: Record<string, any>) => Promise<any>;

class _MessageListener {
  constructor() {
    this.initMessageListener();
  }

  private listeners: Record<
    string,
    {
      method: MessageMethod;
      endpoint: string;
      handler: MessageListenerHandler;
    }
  > = {};

  private initMessageListener() {
    figma.ui.on("message", async (pluginMessage: any) => {
      const validatedPluginMessageEndpoint = this.valiatePluginMessageEndpoint(
        pluginMessage?.endpoint
      );
      if (!validatedPluginMessageEndpoint) return;

      const listener = this.listeners[validatedPluginMessageEndpoint];
      if (listener === undefined) {
        const [method, endpoint] = validatedPluginMessageEndpoint.split(":");
        return this.sendResponseMessage(method as MessageMethod, endpoint, {
          success: false,
          error: "not found endpoint",
        });
      }

      try {
        const res = await listener.handler(pluginMessage.body);
        return this.sendResponseMessage(listener.method, listener.endpoint, {
          success: true,
          data: res,
        });
      } catch (e) {
        console.error(e);
        return this.sendResponseMessage(listener.method, listener.endpoint, {
          success: false,
          error: e,
        });
      }
    });
  }

  private valiatePluginMessageEndpoint(endpoint?: string) {
    if (!endpoint) return null;

    const regex = /^(GET|POST|PUT|PATCH|DELETE):.+$/;
    return regex.test(endpoint) ? endpoint : null;
  }

  private sendResponseMessage(
    method: MessageMethod,
    endpoint: string,
    data: Record<string, unknown>
  ) {
    figma.ui.postMessage({
      ...data,
      endpoint: REQ_ENDPOINT(method, endpoint),
    });
  }

  private readonly EXIST_LISTENER_ERROR = new Error(
    "A listener already exists."
  );

  private registListner(
    method: MessageMethod,
    endpoint: string,
    handler: MessageListenerHandler
  ) {
    const requestEndpoint = REQ_ENDPOINT(method, endpoint);
    if (this.listeners[requestEndpoint]) {
      throw this.EXIST_LISTENER_ERROR;
    }

    this.listeners[requestEndpoint] = {
      method,
      endpoint,
      handler,
    };
  }

  get(endpoint: string, handler: MessageListenerHandler) {
    this.registListner("GET", endpoint, handler);
  }

  post(endpoint: string, handler: MessageListenerHandler) {
    this.registListner("POST", endpoint, handler);
  }

  put(endpoint: string, handler: MessageListenerHandler) {
    this.registListner("PUT", endpoint, handler);
  }

  patch(endpoint: string, handler: MessageListenerHandler) {
    this.registListner("PATCH", endpoint, handler);
  }

  delete(endpoint: string, handler: MessageListenerHandler) {
    this.registListner("DELETE", endpoint, handler);
  }
}

export const MessageListener = new _MessageListener();
