import UserClass from "@dto/User";

const prepareLoginRes = (res: any) => {
  return res.map((user: any) => new UserClass(user));
};

export default class User {
  private sendRequestService: any;

  constructor(SendRequestService: any) {
    this.sendRequestService = SendRequestService;
  }

  getUser(email: string | null) {
    return this.sendRequestService(
      "GET:PRIVATE",
      "api://440/users/",
      {
        params: {
          email: email,
        },
      },
      prepareLoginRes,
    );
  }
}
