import { Looker40SDK, DefaultSettings } from "@looker/sdk";
import { AuthToken, AuthSession, BrowserTransport } from "@looker/sdk-rtl";

import config from '../config.js'


class PblSession extends AuthSession {
  constructor(settings, transport) {
    super(settings, transport || new BrowserTransport(settings));

    this.activeToken = new AuthToken();
  }

  fetchToken() {
    return fetch (
      "/api/token?id=" + config.authenticatedUser.external_user_id
    );
  }
  
  isAuthenticated() {
    const token = this.activeToken;
    if (!(token && token.access_token)) return false;
    return token.isActive();
  }

  async getToken() {
    if (!this.isAuthenticated()) {
      const token = await this.fetchToken();
      const res = await token.json()
      this.activeToken.setToken(res.user_token);
    }
    return this.activeToken;
  }

  async authenticate(props) {
    const token = await this.getToken();
    if (token && token.access_token) {
      props.mode = "cors";
      delete props.credentials;
      props.headers = {
        ...props.headers,
        Authorization: `Bearer ${this.activeToken.access_token}`
      };
    }
    return props;
  }
}

const session = new PblSession({
  ...DefaultSettings,
  base_url: config.LOOKERSDK_BASE_URL
});

export const sdk = new Looker40SDK(session);