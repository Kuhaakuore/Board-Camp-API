export function validateGamesSchemas(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body, {
      abortEarly: false,
    });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      let message = "";

      Array.from(errors).forEach((error) => {
        if (error.includes("name"))
          message += "Nome inválido (campo obrigatório)!\n";
        if (error.includes("image"))
          message += "Imagem inválida (campo obrigatório)!\n";
        if (error.includes("stockTotal"))
          message +=
            "Quantidade em estoque inválida (valor mínimo precisa ser 1)!\n";
        if (error.includes("pricePerDay"))
          message +=
            "Preço por unidade inválido inválido (valor mínimo precisa ser 1)!\n";
      });

      return res.status(400).send({ errors, message });
    }

    next();
  };
}
