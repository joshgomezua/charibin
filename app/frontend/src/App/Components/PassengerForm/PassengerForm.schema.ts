import * as Yup from 'yup'

const currentYear = new Date().getFullYear()

enum Message {
  nameMin = 'Must have at least 1 character',
  nameMax = 'Must have at most 20 characters',
  namePattern = 'Only letters allowed',
  required = 'Required',
  phoneMin = 'Must have at least 6 characters',
  phoneMax = 'Must have at most 14 characters',
  phonePattern = 'Only digits, "-" and spaces allowed',
  emailMin = 'Must have at least 5 characters',
  emailMax = 'Must have at most 40 characters',
  emailPattern = 'Must be a valid email',
  countryCodePattern = 'Country code must have at least 2 digit',
  birthdateValue = 'Must be a value between 1 and 31',
  birthmonthValue = 'Must be a value between 1 and 12'
}

export const PassengerFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, Message.nameMin)
    .max(29, Message.nameMax)
    .matches(/^\p{L}+$/u, Message.namePattern)
    .required(Message.required),
  middleName: Yup.string()
    .min(1, Message.nameMin)
    .max(29, Message.nameMax)
    .matches(/^\p{L}+$/u, Message.namePattern),
  lastName: Yup.string()
    .min(1, Message.nameMin)
    .max(29, Message.nameMax)
    .matches(/^\p{L}+$/u, Message.namePattern)
    .required(Message.required),
  phone: Yup.string()
    .min(6, Message.phoneMin)
    .max(14, Message.phoneMax)
    .matches(/^[\d\- ]{6,14}$/, Message.phonePattern)
    .required(Message.required),
  email: Yup.string()
    .min(5, Message.emailMin)
    .max(40, Message.emailMax)
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,10}))$/,
      Message.emailPattern
    )
    .required(Message.required),
  birthyear: Yup.number()
    .required(Message.required)
    .min(1900, `Must be a value between 1900 and ${currentYear}`)
    .max(currentYear, `Must be a value between 1900 and ${currentYear}`),
  birthmonth: Yup.number()
    .required(Message.required)
    .min(1, Message.birthmonthValue)
    .max(12, Message.birthmonthValue),
  birthdate: Yup.number()
    .required(Message.required)
    .min(1, Message.birthdateValue)
    .max(31, Message.birthdateValue)
})
