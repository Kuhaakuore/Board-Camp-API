export function validateCustomerSchema(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body, {
      abortEarly: false,
    });

    let message = "";

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);

      Array.from(errors).forEach((error) => {
        if (error.includes("name"))
          message += "Nome inválido (campo obrigatório)!\n";
        if (error.includes("phone"))
          message +=
            "Telefone inválido (digite pelo menos 10 valores numéricos e no máximo 11)!\n";
        if (error.includes("cpf"))
          message += "CPF inválido (digite todos os 11 valores)!\n";
        if (error.includes("birthday"))
          message += "Data de nascimento inválida (campo obrigatório)!\n";
      });

      return res.status(400).send({ errors, message });
    }

    if (isNaN(Number(req.body.cpf)))
      message += "CPF inválido (digite apenas valores numéricos)!";

    if (isNaN(Number(req.body.phone)))
      message += "Telefone inválido (digite apenas valores numéricos)!";

    if (message.length > 0) return res.status(400).send({ message });

    next();
  };
}
