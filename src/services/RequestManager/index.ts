// Service
import SendRequestService from "./SendRequestService";
// Groups
import Auth from "./auth/Auth";
import User from "./base/User";
import Requisites from "./dashboard/Requisites";
import Company from "./Company";
import CommercialOffer from "./CommercialOffer";
import Counterparty from "./Counterparty";
import LPU from "./LPU";

class RequestManager {
  Auth: Auth;
  User: User;
  Requisites: Requisites;
  Company: Company;
  CommercialOffer: CommercialOffer;
  Counterparty: Counterparty;
  LPU: LPU;
  constructor() {
    this.Auth = new Auth(SendRequestService);
    this.User = new User(SendRequestService);
    this.Requisites = new Requisites(SendRequestService);
    this.Company = new Company(SendRequestService);
    this.CommercialOffer = new CommercialOffer(SendRequestService);
    this.Counterparty = new Counterparty(SendRequestService);
    this.LPU = new LPU(SendRequestService);
  }
}

export default new RequestManager();
