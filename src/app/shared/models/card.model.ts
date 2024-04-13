import {CardActivationEnum} from "@shared/enums/card-activation.enum";
import {SocialMediaEnum} from "@shared/enums/social-media.enum";

export interface CardModel {
  id: string,
  user_id: string,
  name: string,
  title: string,
  about: string,
  photo_url: string,
  phone_numbers: phoneNumber[],
  emails: keyValue[]
  social_medias: SocialMedia[],
  links: keyValue[],
  status: CardActivationEnum,
  created_at: string,
  updated_at: string,
  show_operations?: boolean
}

interface SocialMedia{
  type: SocialMediaEnum,
  value: string
}
interface keyValue {
  title: string;
  value: string
}

interface phoneNumber {
  title: string;
  value: {
    number: string,
    prefix: string,
    country_code: string
  }
}
