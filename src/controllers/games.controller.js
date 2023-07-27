import { db } from "../database/database.connection.js";

export async function createGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    const game = await db.query(
      `
        SELECT * from games WHERE name = $1;`,
      [name]
    );
    if (game.rowCount > 0) return res.status(409).send({ message: "Jogo já cadastrado!" });

    await db.query(
      `INSERT INTO games (name, image, "stockTotal", "pricePerDay")
        VALUES ($1, $2, $3, $4);`,
      [name, image, stockTotal, pricePerDay]
    );

    return res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
}
