import {UserStatusEnum} from "@shared/enums/user-status";
import {phoneNumber} from "@app/modules/settings/models/setting.model";

export interface UserModel {
  email: string;
  email_verified: boolean;
  first_name: string;
  id: string;
  last_name: string;
  phone_number: phoneNumber;
  profile_photo_url: string;
  status: UserStatusEnum
}
