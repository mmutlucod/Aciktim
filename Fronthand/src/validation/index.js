import { object, string, ref } from 'yup';

const validations = object({
    name: string().required("Lütfen ad ve soyadınızı giriniz."),
    userName: string().required("Lütfen kullanıcı adı giriniz."),
    email: string().email("Lütfen geçerli bir e-posta adresi giriniz.").required("Lütfen e-posta adresinizi giriniz."),
    phoneNumber: string().required("Lütfen telefon numaranızı giriniz."),
    address: string().required("Lütfen adresinizi giriniz."),
    password: string().min(5, "En az 5 karakter olmalı.").required("Lütfen şifrenizi giriniz."),
    passwordVerification: string().oneOf([ref("password")],"Lütfen aynı parolayı giriniz.").required()

  });

  export default validations 