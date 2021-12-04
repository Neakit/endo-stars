class CookiesWorker {
  /*
   * General utils for managing cookies in Typescript.
   */
  add(key: string, val: string) {
    const date = new Date();
    const value = val;

    // Set it expire in  day
    date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);

    // Set it
    document.cookie = key + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
  }

  get(key: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + key + "=");

    if (Array.isArray(parts) && parts.length == 2) {
      return parts.pop()?.split(";").shift();
    }
  }

  remove(key: string) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

    // Set it
    document.cookie = key + "=; expires=" + date.toUTCString() + "; path=/";
  }
}

export default new CookiesWorker();
