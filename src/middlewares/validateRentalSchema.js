export function validateRentalSchema(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body, {
      abortEarly: false,
    });

    let message = "";

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);

      Array.from(errors).forEach((error) => {
        if (error.includes("customerId"))
          message += "Id do usuário inválido (campo obrigatório)!\n";
        if (error.includes("gameId"))
          message += "Id do jogo inválido (campo obrigatório)!\n";
        if (error.message.includes("daysRented"))
          message +=
            "Quantidade de dias para locação inválido (campo obrigatório com valor mínimo de 1 dia)!\n ";
      });

      return res.status(400).send({ errors, message });
    }

    next();
  };
}
