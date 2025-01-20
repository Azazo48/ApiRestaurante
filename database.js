import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();


export async function seeAllReservations() {
  const [rows] = await pool.query(`CALL seeAllReservations();`);
  return rows[0];  
}

export async function reservationsOrderedDate() {
  const [rows] = await pool.query(`CALL reservationsOrderedDate();`);
  return rows[0];  
}

export async function addReservation(persons, name, phone, date, time) {
  const [result] = await pool.query(
    `CALL addReservation(?, ?, ?, ?, ?);`,
    [persons, name, phone, date, time]
  );
  return result;
}


export async function deleteReservation(id) {
  try {
    const [result] = await pool.query(`CALL deleteReservation(?);`, [id]);
    return result;
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw error;
  }
}

export async function getTablesDisponibles(date, time) {
  // Obtener las mesas reservadas para esa fecha y hora
  const [rows] = await pool.query(`
    SELECT reservation_mesa
    FROM reservations
    WHERE reservation_date = ? AND reservation_time = ?;
  `, [date, time]);

  const allTables = ["mesa1", "mesa2", "mesa3", "mesa4", "mesa5", "mesa6"];

  // Extraemos solo las mesas que ya están reservadas
  const reservedTables = rows.map(row => row.reservation_mesa);

  // Filtramos las mesas disponibles
  const availableTables = allTables.filter(table => !reservedTables.includes(table));

  return availableTables; // Devolvemos solo las mesas disponibles
}
