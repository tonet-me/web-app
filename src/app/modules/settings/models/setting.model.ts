import {alpha, maxLength, minLength, numeric, prop, propObject, required} from "@rxweb/reactive-form-validators";
import {min} from "rxjs";
import {UserModel} from "@shared/models/user.model";


export class phoneNumber {
  @prop()
  prefix!: string;

  @prop()
  @numeric()
  number!: string;

  @prop()
  country_code!: string;
}

export class PersonalInfoForm {
  constructor(values?: UserModel) {
    if (values) {
      this.first_name = values.first_name
      this.last_name = values.last_name
      this.phone_number = values.phone_number
      this.profile_photo_url = values.profile_photo_url
    }
  }

  @required()
  @minLength({value: 2})
  @maxLength({value: 30})
  first_name!: string;

  @required()
  @minLength({value: 2})
  @maxLength({value: 30})
  last_name!: string;

  @propObject(phoneNumber, {defaultValue: phoneNumber})
  phone_number!: phoneNumber;

  @prop()
  profile_photo_url!: string;
}
