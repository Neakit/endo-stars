// Service
import SendRequestService from "./SendRequestService";
// Groups
import Auth from "./auth/Auth";
import User from "./base/User";
import Requisites from "./dashboard/Requisites";
import Company from "./Company";
import CommercialOffer from "./CommercialOffer";
import Counterparty from "./Counterparty";
import EndCustomer from "./EndCustomer";
class RequestManager {
  Auth: Auth;
  User: User;
  Requisites: Requisites;
  Company: Company;
  CommercialOffer: CommercialOffer;
  Counterparty: Counterparty;
  EndCustomer: EndCustomer;

  constructor() {
    this.Auth = new Auth(SendRequestService);
    this.User = new User(SendRequestService);
    this.Requisites = new Requisites(SendRequestService);
    this.Company = new Company(SendRequestService);
    this.CommercialOffer = new CommercialOffer(SendRequestService);
    this.Counterparty = new Counterparty(SendRequestService);
    this.EndCustomer = new EndCustomer(SendRequestService);
  }
}

export default new RequestManager();
