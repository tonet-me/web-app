import {
  alphaNumeric,
  email,
  maxLength,
  minLength, numeric, pattern,
  prop,
  propArray,
  required,
  unique,
  url
} from "@rxweb/reactive-form-validators";
import {SocialMediaEnum} from "@shared/enums/social-media.enum";
import {CardActivationEnum} from "@shared/enums/card-activation.enum";
import {custom_link_regex} from "@shared/helper/my-helper";

export class BasicInfoForm {

  constructor(values?: cardManagementPayload) {
    if (values) {
      this.title = values?.title
      this.name = values?.name
      this.photo_url = values?.photo_url
      this.about = values?.about
      this.status = values?.status === CardActivationEnum.active
    }
  }

  @required()
  @minLength({value: 1})
  @maxLength({value: 20})
  title!: string;

  @required()
  @pattern({
      expression: {'custom_link': custom_link_regex},
      message: 'the link you entered is not valid.'
    }
  )
  @minLength({value: 4})
  @maxLength({value: 25})
  name!: string;

  @prop()
  photo_url!: string;

  @prop()
  about!: string;

  @prop()
  status: boolean = true;
}


export class socialMedia {
  constructor(values?: socialMedia) {
    if (values) {
      this.type = values?.type
      this.title = values?.title
      this.active = values?.active
      this.name = values?.name
    }
  }

  @required()
  @unique()
  type!: SocialMediaEnum

  @prop()
  @url()
  title!: string

  @prop()
  active!: boolean;

  @prop()
  name!: string;
}


export class socialMediaForm {
  @propArray(socialMedia)
  socialMedias!: socialMedia[];
}

export class EmailsForm {
  constructor(values?: EmailsForm) {
    if (values) {
      this.title = values?.title
      this.value = values.value
    }
  }

  @required()
  title!: string;

  @required()
  @email()
  value!: string;
}

export class PhoneNumbersForm {

  constructor(values: PhoneNumbersForm) {
    if (values) {
      this.title = values?.title
      this.number = values?.number
      this.country_code = values.country_code
      this.prefix = values.prefix
    }
  }

  @required()
  title!: string;

  @required()
  @numeric()
  number!: string;

  @required()
  country_code!: string;

  @required()
  prefix!: string;
}

export class ContactInfoForm {
  @propArray(PhoneNumbersForm)
  phoneNumbers!: PhoneNumbersForm[];

  @propArray(EmailsForm)
  emails!: EmailsForm[];
}

export class extraLink {
  constructor(values?: extraLink) {
    if (values) {
      this.title = values?.title
      this.value = values.value
    }
  }

  @required()
  title!: string;

  @required()
  @url()
  value!: string;
}


export class ExtraLinkForm {
  @propArray(extraLink)
  extraLinks!: extraLink[];
}


export interface cardManagementPayload {
  name: string,
  title: string,
  photo_url: string,
  about: string,
  phone_numbers: phoneNumberInterface[],
  emails: keyValueInterface[],
  social_medias: socialMediaInterface[],
  links: keyValueInterface[],
  status: CardActivationEnum,
}


interface phoneNumberInterface {
  title: string
  value: {
    prefix: string;
    number: string;
    country_code: string
  }
}

interface keyValueInterface {
  title: string;
  value: string
}

interface socialMediaInterface {
  type: SocialMediaEnum,
  value: string
}
