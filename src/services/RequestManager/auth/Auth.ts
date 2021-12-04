import User from "@dto/User";

type Credentials = {
  email: string;
  password: string;
};

const prepareLoginRes = (res: any) => {
  res.user = new User(res.user);
  return res;
};

export default class Auth {
  private sendRequestService: any;

  constructor(SendRequestService: any) {
    this.sendRequestService = SendRequestService;
  }

  login(credentials: Credentials) {
    return this.sendRequestService("POST:PUBLIC", "api://login/", { data: credentials }, prepareLoginRes);
  }

  user() {
    return this.sendRequestService("GET:PRIVATE", "api://user/me", {});
  }
}
