import * as Yup from 'yup';

const ALLOWED_DOMAINS = ['@dac.unicamp.br', '@example.com'];

const isEmailValid = (email) => {
    return ALLOWED_DOMAINS.some(domain => email.endsWith(domain));
};


export const validationSchemaLogin = Yup.object().shape({
    email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
});
