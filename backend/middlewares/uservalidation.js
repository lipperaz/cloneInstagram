const {body} = require("express-validator")

const userCreateValidation = () => {
    return [
        body("name")
            .isString().withMessage("O nome é obrigátorio!")
            .isLength({ min:3 }).withMessage("O nome precisa ter no minimo 3 caracteres!"),
        body("email")
            .isString().withMessage("O email é obrigátorio!")
            .isEmail().withMessage("insira um e-mail válido!"),
        body("password")
            .isString().withMessage("A senha é obrigátoria!")
            .isLength({ min:8 }).withMessage("A senha precisa ter no minimo 8 caracteres!")
            .matches(/[A-Z]/).withMessage("A senha precisa conter pelo menos uma letra maiúscula!") // Letra maiúscula
            .matches(/[0-9]/).withMessage("A senha precisa conter pelo menos um número!") // Número
            .matches(/[@$!%*?&#]/).withMessage("A senha precisa conter pelo menos um símbolo especial (@, $, !, %, *, ?, &, #, etc)!"), // Símbolo especial
        body("confirmpassword")
            .isString().withMessage("A confirmação de senha é obrigátoria!")
            .custom((value, {req}) => {
                if(value != req.body.password){
                    throw new Error("As senhas não são iguais!")
                }
                return true;
        }),
    ];
};

const loginValidation = () => {
    return [
        body("email")
            .isString().withMessage("O email é obrigatório!")
            .isEmail().withMessage("Insira um email válido!"),
        body("password")
            .isString().withMessage("A senha é obrigátoria!")
    ];
};

module.exports = {
    userCreateValidation,
    loginValidation,
};