// Service
import SendRequestService from "./SendRequestService";
// Groups
import Auth from "./auth/Auth";
import User from "./base/User";
import Requisites from "./dashboard/Requisites";

class RequestManager {
  Auth: Auth;
  User: User;
  Requisites: Requisites;
  constructor() {
    this.Auth = new Auth(SendRequestService);
    this.User = new User(SendRequestService);
    this.Requisites = new Requisites(SendRequestService);
  }
}

export default new RequestManager();
