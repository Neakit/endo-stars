import { reactive, computed } from "@vue/composition-api";
import { AUTH_TOKEN } from "@enum/index";
import CookiesWorker from "@services/LocalStorageManager";
import RequestManager from "@services/RequestManager";
import isNull from "lodash/isNull";
import User from "@dto/User";

type LoginForm = {
  email: string;
  password: string;
};

enum USER {
  USER_EMAIL = "USER_EMAIL",
}

console.log("AUTH_TOKEN.ACCESS_TOKEN", CookiesWorker.get(AUTH_TOKEN.ACCESS_TOKEN));

const state = reactive({
  token: CookiesWorker.get(AUTH_TOKEN.ACCESS_TOKEN),
  email: CookiesWorker.get(USER.USER_EMAIL),
  user: new User({}),
});

export const useAuth = () => {
  // const refreshUser = async () => {
  //   try {
  //     const result = await RequestManager.User.getUser(state.email);
  //     CookiesWorker.add(USER.USER_EMAIL, result[0].email);
  //     state.user = result[0];
  //   } catch (e) {
  //     console.error(e);
  //     throw e;
  //   }
  // };

  const login = async (form: LoginForm) => {
    try {
      const result = await RequestManager.Auth.login(form);
      CookiesWorker.add(AUTH_TOKEN.ACCESS_TOKEN, result.token);
      CookiesWorker.add(USER.USER_EMAIL, result.user.email);
      const user = await RequestManager.Auth.user();
      state.token = result.token;
      state.user = new User(user);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const logout = async () => {
    CookiesWorker.remove(AUTH_TOKEN.ACCESS_TOKEN);
    CookiesWorker.remove(USER.USER_EMAIL);
    state.token = null;
    state.user = new User({});
  };

  // GETTERS
  const authSuccess = computed(() => !isNull(state.token) && !isNull(state.user.email));
  const userRole = computed(() => state.user.access_group);
  const user = computed(() => state.user);

  return {
    login,
    logout,
    // refreshUser,
    authSuccess,
    userRole,
    user,
  };
};

export default useAuth;
