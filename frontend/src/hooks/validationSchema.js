import * as Yup from 'yup';

const ALLOWED_DOMAINS = ['@dac.unicamp.br', '@unicamp.br'];

export const isEmailValid = (email) => {
    return ALLOWED_DOMAINS.some(domain => email.endsWith(domain));
};


export const validationSchemaLogin = Yup.object().shape({
    email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
});

export const validationSchemaSignUp = Yup.object().shape({
    username: Yup.string().required('Nome de usuário é obrigatório'),
    fullName: Yup.string().required('Nome completo é obrigatório'),
    email: Yup.string()
        .email('Email inválido')
        .required('Email é obrigatório'),
    password: Yup.string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
        .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
        .matches(/[^a-zA-Z0-9]/, 'A senha deve conter pelo menos um caractere especial')
        .required('Senha é obrigatória'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'As senhas devem corresponder')
        .required('Confirmação de senha é obrigatória'),
    graduationYear: Yup.number()
        .required('')
        .positive('Ano de graduação deve ser um número positivo')
        .integer('Ano de graduação deve ser um número inteiro')
        .min(1500, 'Ano de graduação inválido'),
    course: Yup.string().required('Curso é obrigatório'),
    linkedin: Yup.string().optional()
});
