import { db } from "../database/database.connection.js";

export async function createCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const result = await db.query(
      `
        SELECT * from customers WHERE cpf = $1;`,
      [cpf]
    );
    if (result.rowCount > 0)
      return res.status(409).send({ message: "Cliente já cadastrado!" });

    await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday)
        TO_CHAR(birthday, 'YYYY-MM-DD')
        VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]
    );

    return res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}

export async function getCustomers(req, res) {
  try {
    const customers = await db.query(
      `SELECT name, phone, cpf, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday from customers;`
    );
    res.send(customers.rows);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}
