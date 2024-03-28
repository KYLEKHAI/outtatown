-- Query 1: Retrieve All Hotel Chains along with Their Email and Phone Number
SELECT HC.Name, HC_Email.Email, HC_PhoneNumber.PhoneNumber
FROM HotelChain HC
JOIN HotelChain_Email HC_Email ON HC.ChainID = HC_Email.ChainID
JOIN HotelChain_PhoneNumber HC_PhoneNumber ON HC.ChainID = HC_PhoneNumber.ChainID;

-- Query 2: Find Hotels with the Highest Rating
SELECT Name, Rating
FROM Hotel
WHERE Rating = (SELECT MAX(Rating) FROM Hotel);

-- Query 3: Count the Number of Rooms in Each Hotel
SELECT H.Name, COUNT(HR.RoomNumber) AS NumberOfRooms
FROM Hotel H
JOIN Hotel_Room HR ON H.HotelID = HR.HotelID
GROUP BY H.Name;

-- Query 4: Retrieve Employees who Manage Other Employees
SELECT E.FirstName, E.LastName
FROM Employee E
JOIN manages M ON E.SIN = M.Employee_SIN;

-- Query 5: Calculate the Total Revenue Generated from Bookings in a Specific Month
SELECT SUM(HR.Price) AS TotalRevenue
FROM reserves.Booking B
JOIN Hotel_Room HR ON B.RoomNumber = HR.RoomNumber
WHERE EXTRACT(MONTH FROM B.BookingDate) = 5; -- Example: May

-- Query 6: Retrieve Customers Who Have Made Bookings and Rentings
SELECT C.FirstName, C.LastName
FROM Customer C
WHERE EXISTS (
    SELECT 1
    FROM reserves.Booking B
    WHERE B.CustomerID = C.CustomerID
) AND EXISTS (
    SELECT 1
    FROM reserves.Renting R
    WHERE R.CustomerID = C.CustomerID
);
