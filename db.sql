CREATE DATABASE reservations_db;
USE reservations_db;

CREATE TABLE reservations (
    id_reservation INT AUTO_INCREMENT PRIMARY KEY,
    reservation_persons INT(1),
    reservation_name VARCHAR(100),
    reservation_phone VARCHAR(10),
    reservation_date DATE,
    reservation_time TIME
);

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `seeAllReservations`()
BEGIN
    SELECT * FROM reservations;
END;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservationsOrderedDate`()
BEGIN
    SELECT * FROM reservations ORDER BY reservation_date;
END;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addReservation`(
    IN p_reservation_persons INT,
    IN p_reservation_name VARCHAR(100),
    IN p_reservation_phone VARCHAR(10),
    IN p_reservation_date DATE,
    IN p_reservation_time TIME
)
BEGIN
    INSERT INTO reservations (
        reservation_persons,
        reservation_name,
        reservation_phone,
        reservation_date,
        reservation_time
    )
    VALUES (
        p_reservation_persons,
        p_reservation_name,
        p_reservation_phone,
        p_reservation_date,
        p_reservation_time
    );
END;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteReservation`(
    IN p_id_reservation INT
)
BEGIN
    DELETE FROM reservations
    WHERE id_reservation = p_id_reservation;
END;;
DELIMITER ;


