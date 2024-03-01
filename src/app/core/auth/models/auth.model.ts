import {SocialProviderEnum} from "@core/auth/enums/social-provider";
import {UserModel} from "@shared/models/user.model";

export interface loginPayload {
  token: string;
  provider_id: SocialProviderEnum;
}

export interface LoginModel {
  new_user: boolean;
  tokens:tokensModel;
  user: UserModel
}


export interface tokensModel {
  access_token: string,
  refresh_token: string
}
