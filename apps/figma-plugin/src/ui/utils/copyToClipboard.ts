export const copyToClipboard = (value: string) => {
  return new Promise<void>((res, rej) => {
    try {
      const $textarea = document.createElement("textarea");
      document.body.appendChild($textarea);
      $textarea.value = value;
      $textarea.select();
      document.execCommand("copy");
      document.body.removeChild($textarea);
      res();
    } catch {
      rej();
    }
  });
};
