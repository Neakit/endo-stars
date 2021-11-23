import { reactive, computed } from "@vue/composition-api";
import { AUTH_TOKEN } from "@enum/index";
import LocalStorageWorker from "@services/LocalStorageManager";
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

const state = reactive({
  token: LocalStorageWorker.get(AUTH_TOKEN.ACCESS_TOKEN),
  email: LocalStorageWorker.get(USER.USER_EMAIL),
  user: new User({}),
});

export const useAuth = () => {
  const refreshUser = async () => {
    try {
      const result = await RequestManager.User.getUser(state.email);
      LocalStorageWorker.add(USER.USER_EMAIL, result[0].email);
      state.user = result[0];
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const login = async (form: LoginForm) => {
    try {
      const result = await RequestManager.Auth.login(form);
      LocalStorageWorker.add(AUTH_TOKEN.ACCESS_TOKEN, result.accessToken);
      LocalStorageWorker.add(USER.USER_EMAIL, result.user.email);
      state.token = result.accessToken;
      state.user = result.user;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const logout = async () => {
    LocalStorageWorker.remove(AUTH_TOKEN.ACCESS_TOKEN);
    LocalStorageWorker.remove(USER.USER_EMAIL);
    state.token = null;
    state.user = new User({});
  };

  // GETTERS
  const authSuccess = computed(() => !isNull(state.token) && !isNull(state.user.email));
  const userRole = computed(() => state.user.role);
  const user = computed(() => state.user);

  return {
    login,
    logout,
    refreshUser,
    authSuccess,
    userRole,
    user,
  };
};

export default useAuth;
