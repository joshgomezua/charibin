import * as Yup from 'yup'

enum Message {
  addressMin = 'Must have at least 1 character',
  addressMax = 'Must have at most 20 characters',
  addresPattern = 'Only letters, numbers, "." and "/" allowed',
  cityMin = 'Must have at least 1 characters',
  cityMax = 'Must have at most 20 characters',
  cityPattern = 'Only letters allowed',
  zipCodeMin = 'Must have at least 6 characters',
  zipCodeMax = 'Must have at most 20 characters',
  zipCodePattern = 'Only digits and "-" allowed',
  required = 'Required'
}

export const PaymentFormSchema = Yup.object().shape({
  address: Yup.string()
    .min(1, Message.addressMin)
    .max(20, Message.addressMax)
    .matches(/^[\p{L}\d.\/ ]{1,20}$/u, Message.addresPattern)
    .required(Message.required),
  city: Yup.string()
    .min(1, Message.cityMin)
    .max(20, Message.cityMax)
    .matches(/^\p{L}{1,20}$/u, Message.cityPattern)
    .required(Message.required),
  zipCode: Yup.string()
    .min(6, Message.zipCodeMin)
    .max(14, Message.zipCodeMax)
    .matches(/^[\d-a-z]{2,14}$/i, Message.zipCodePattern)
    .required(Message.required)
})
