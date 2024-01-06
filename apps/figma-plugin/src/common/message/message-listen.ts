import { MessageMethod, REQ_ENDPOINT } from "./message-constant";

class _MessageListener {
  constructor() {
    this.initMessageListener();
  }

  private listeners: Record<
    string,
    { method: MessageMethod; endpoint: string; handler: () => any }
  > = {};

  private initMessageListener() {
    figma.ui.on("message", (pluginMessage: any) => {
      const validatedPluginMessageEndpoint = this.valiatePluginMessageEndpoint(
        pluginMessage?.endpoint
      );
      if (!validatedPluginMessageEndpoint) return;

      const listener = this.listeners[validatedPluginMessageEndpoint];
      if (!listener) {
        const [method, endpoint] = validatedPluginMessageEndpoint.split(":");
        this.sendResponseMessage(method as MessageMethod, endpoint, {
          success: false,
          error: "not found endpoint",
        });
      }

      try {
        const res = listener.handler();
        this.sendResponseMessage(listener.method, listener.endpoint, {
          success: true,
          data: res,
        });
      } catch (e) {
        console.error(e);
        this.sendResponseMessage(listener.method, listener.endpoint, {
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
    figma.ui.postMessage(
      Object.assign(data, { endpoint: REQ_ENDPOINT(method, endpoint) })
    );
  }

  private readonly EXIST_LISTENER_ERROR = new Error(
    "A listener already exists."
  );

  private registListner(
    method: MessageMethod,
    endpoint: string,
    handler: () => any
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

  get(endpoint: string, handler: () => any) {
    this.registListner("GET", endpoint, handler);
  }

  post(endpoint: string, handler: () => any) {
    this.registListner("POST", endpoint, handler);
  }

  put(endpoint: string, handler: () => any) {
    this.registListner("PUT", endpoint, handler);
  }

  patch(endpoint: string, handler: () => any) {
    this.registListner("PATCH", endpoint, handler);
  }

  delete(endpoint: string, handler: () => any) {
    this.registListner("DELETE", endpoint, handler);
  }
}

export const MessageListener = new _MessageListener();
