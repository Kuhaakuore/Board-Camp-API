import dayjs from "dayjs";
import { db } from "../database/database.connection.js";

export async function createRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const customer = await db.query(
      `
        SELECT * from customers WHERE id = $1;`,
      [customerId]
    );
    if (customer.rowCount === 0)
      return res
        .status(400)
        .send({ message: "Id inválido, cliente não cadastrado!" });

    const result = await db.query(
      `
          SELECT * from games WHERE id = $1;`,
      [gameId]
    );
    if (result.rowCount === 0)
      return res
        .status(400)
        .send({ message: "Id inválido, jogo não cadastrado!" });

    const game = result.rows[0];

    const rentals = await db.query(
      `
        SELECT * from rentals
        WHERE "gameId" = $1;
    `,
      [gameId]
    );
    if (rentals.rowCount >= game.stockTotal)
      return res.status(400).send({
        message: `Todas as unidades do jogo ${game.name} já estão alugadas!`,
      });

    const rentDate = dayjs(Date.now()).format("YYYY-MM-DD");
    const originalPrice = daysRented * game.pricePerDay;

    await db.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
    );

    return res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}

export async function getRentals(req, res) {
  try {
    const result = await db.query(`
    SELECT rentals.id, rentals."customerId", rentals."gameId", 
    rentals."daysRented", rentals."originalPrice", rentals."delayFee", 
    customers.name AS "customerName", games.name AS "gameName",
      TO_CHAR("rentDate", 'YYYY-MM-DD') AS "rentDate",
      TO_CHAR("returnDate", 'YYYY-MM-DD') AS "returnDate"
      FROM rentals
      JOIN customers ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id;
    `);

    const rentals = [];

    result.rows.forEach((row) => {
      const {
        id,
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
        customerName,
        gameName,
      } = row;
      const customer = {
        id: customerId,
        name: customerName,
      };
      const game = {
        id: gameId,
        name: gameName,
      };
      const rental = {
        id,
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
        customer,
        game,
      };

      rentals.push(rental);
    });
    return res.send(rentals);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}
