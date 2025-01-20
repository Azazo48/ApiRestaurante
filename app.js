import express from "express";
import {
seeAllReservations,
reservationsOrderedDate,
addReservation,
deleteReservation,
getTablesDisponibles
} from "./database.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/reservations", async (req, res) => {
  const reservations = await seeAllReservations();
  /* console.log('reservaciones obtenidas!'); */
  res.status(200).json(reservations);
});

app.get("/reservations/ordered", async (req, res) => {
  const reservations = await reservationsOrderedDate();
  /* console.log('reservaciones obtenidas!'); */
  res.status(200).json(reservations);
});

app.post("/addreservations", async (req, res) => {
  const { persons, name, phone, date, time } = req.body;
  console.log("Datos recibidos:", { persons, name, phone, date, time });

  try {
    await addReservation(persons, name, phone, date, time);
    res.status(201).json({ message: "Cita Completada!." });
  } catch (error) {
    if (error.code === '45000') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Todas las Mesas estan Reservadas" });
    }
  }
});


app.delete("/reservations/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await deleteReservation(Number(id));
    res.status(200).json({ message: "Reservation deleted successfully." });
  } catch (error) {
    if (error.code === '45000') {
      res.status(400).json({ error: error.message }); 
    } else {
      res.status(500).json({ error: "Cupos llenos" });
    }
  }
});

app.get("/tablesdisponibles", async (req, res) => {
  const { date, time } = req.query;

  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return res.status(400).json({ error: "Formato de Fecha No Valido" });
  }

  try {
    const formattedDate = parsedDate.toISOString().split('T')[0]; 

    const availableTables = await getTablesDisponibles(formattedDate, time);  

    res.status(200).json({ availableTables });
  } catch (error) {
    console.error("Error En Las Mesas Disponibles", error);
    res.status(500).json({ error: "Error En Las Mesas Disponibles." });
  }
});

app.listen(3000, () => {
  console.log("Servidor ejecutándose en el puerto 3000");
});