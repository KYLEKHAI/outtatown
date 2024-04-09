--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Outtatown Web App; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "Outtatown Web App";


ALTER SCHEMA "Outtatown Web App" OWNER TO postgres;

--
-- Name: decrement_number_of_rooms(); Type: FUNCTION; Schema: Outtatown Web App; Owner: postgres
--

CREATE FUNCTION "Outtatown Web App".decrement_number_of_rooms() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN 
    -- Check if the trigger operation is INSERT
    IF TG_OP = 'INSERT' THEN
        -- Decrease the number of rooms for the hotel associated with the booked/rented room
        UPDATE "Outtatown Web App"."Hotel"
        SET "NumberOfRooms" = "NumberOfRooms" - 1
        WHERE "HotelID" = (
            SELECT "HotelID"
            FROM "Outtatown Web App"."Hotel_Room"
            WHERE "RoomNumber" = NEW."RoomNumber"
        );
    END IF;

    RETURN NULL; -- Return NULL to indicate that the triggering action has been handled by the trigger.
END;
$$;


ALTER FUNCTION "Outtatown Web App".decrement_number_of_rooms() OWNER TO postgres;

--
-- Name: increase_number_of_rooms(); Type: FUNCTION; Schema: Outtatown Web App; Owner: postgres
--

CREATE FUNCTION "Outtatown Web App".increase_number_of_rooms() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN 
    -- Check if the trigger operation is DELETE
    IF TG_OP = 'DELETE' THEN
        -- Increase the number of rooms when a booking or renting is removed
        UPDATE "Outtatown Web App"."Hotel"
        SET "NumberOfRooms" = "NumberOfRooms" + 1
        WHERE "HotelID" = (
            SELECT "HotelID"
            FROM "Outtatown Web App"."Hotel_Room"
            WHERE "RoomNumber" = OLD."RoomNumber"
        );
    END IF;

    RETURN NULL; -- Return NULL to indicate that the triggering action has been handled by the trigger.
END;
$$;


ALTER FUNCTION "Outtatown Web App".increase_number_of_rooms() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Archive; Type: TABLE; Schema: Outtatown Web App; Owner: postgres
--

CREATE TABLE "Outtatown Web App"."Archive" (
    "ArchiveID" integer NOT NULL
);


ALTER TABLE "Outtatown Web App"."Archive" OWNER TO postgres;

--
-- Name: Booking; Type: TABLE; Schema: Outtatown Web App; Owner: postgres
--

CREATE TABLE "Outtatown Web App"."Booking" (
    "BookingID" integer NOT NULL,
    "BookingDate" date,
    "HotelID" integer,
    "RoomNumber" integer,
    "CustomerID" text,
    CONSTRAINT "HotelID" CHECK ((("HotelID" > 300000) AND ("HotelID" < 400000))),
    CONSTRAINT "bookingID" CHECK ((("BookingID" >= 1000000000) AND ("BookingID" < '2000000000'::bigint))),
    CONSTRAINT "customerID" CHECK ((length("CustomerID") = 9))
);


ALTER TABLE "Outtatown Web App"."Booking" OWNER TO postgres;

--
-- Name: CentralOffice; Type: TABLE; Schema: Outtatown Web App; Owner: postgres
--

CREATE TABLE "Outtatown Web App"."CentralOffice" (
    "OfficeID" text NOT NULL,
    "Number" integer NOT NULL,
    "Street Name" text NOT NULL,
    "City" text NOT NULL,
    "Province" text NOT NULL,
    "PostalCode" text NOT NULL,
    "ChainID" integer,
    CONSTRAINT "chainID" CHECK ((("ChainID" >= 5000) AND ("ChainID" < 6000))),
    CONSTRAINT number CHECK (("Number" > 0)),
    CONSTRAINT office_id CHECK ((length("OfficeID") = 5)),
    CONSTRAINT postal_code CHECK ((length("PostalCode") = 6)),
    CONSTRAINT province_length CHECK ((length("Province") = 2))
);


ALTER TABLE "Outtatown Web App"."CentralOffice" OWNER TO postgres;

--
-- Name: Customer; Type: TABLE; Schema: Outtatown Web App; Owner: postgres
--

CREATE TABLE "Outtatown Web App"."Customer" (
    "CustomerID" text NOT NULL,
    "FirstName" text,
    "LastName" text,
    "PaymentCardNumber" bigint,
    "Number" integer,
    "StreetName" text,
    "City" text,
    "Province" text,
    "PostalCode" text,
    "RegistrationDate" date,
    CONSTRAINT "customerID_length" CHECK ((length("CustomerID") = 9)),
    CONSTRAINT number CHECK (("Number" > 0)),
    CONSTRAINT postal_code_length CHECK ((length("PostalCode") = 6)),
    CONSTRAINT province_length CHECK ((length("Province") = 2))
);


ALTER TABLE "Outtatown Web App"."Customer" OWNER TO postgres;

--
-- Name: Employee; Type: TABLE; Schema: Outtatown Web App; Owner: postgres
--

CREATE TABLE "Outtatown Web App"."Employee" (
    "SIN" bigint NOT NULL,
    "FirstName" text,
    "LastName" text,
    "Number" integer,
    "StreetName" text,
    "City" text,
    "Province" text,
    "PostalCode" text,
    "Role" text[],
    "HotelID" integer,
    CONSTRAINT hotel_id CHECK ((("HotelID" > 300000) AND ("HotelID" < 400000))),
    CONSTRAINT number CHECK (("Number" > 0)),
    CONSTRAINT postal_code CHECK ((length("PostalCode") = 6)),
    CONSTRAINT rating CHECK ((length("Province") = 2))
);


ALTER TABLE "Outtatown Web App"."Employee" OWNER TO postgres;

--
-- Name: Hotel; Type: TABLE; Schema: Outtatown Web App; Owner: postgres
--

CREATE TABLE "Outtatown Web App"."Hotel" (
    "HotelID" integer NOT NULL,
    "Name" text,
    "Number" integer,
    "StreetName" text,
    "City" text,
    "Province" text,
    "PostalCode" text,
    "Email" text,
    "NumberOfRooms" integer,
    "Rating" integer,
    "PhoneNumber" text[],
    "ChainID" integer,
    CONSTRAINT "Hotel_NumberOfRooms_check" CHECK (("NumberOfRooms" >= 5)),
    CONSTRAINT "hotel_ID" CHECK (("HotelID" > 300000)),
    CONSTRAINT number CHECK (("Number" > 0)),
    CONSTRAINT postal_code CHECK ((length("PostalCode") = 6)),
    CONSTRAINT province_length CHECK ((length("Province") = 2)),
    CONSTRAINT rating CHECK ((("Rating" >= 1) AND ("Rating" <= 5) AND (mod("Rating", 1) = 0)))
);


ALTER TABLE "Outtatown Web App"."Hotel" OWNER TO postgres;

--
-- Name: HotelChain; Type: TABLE; Schema: Outtatown Web App; Owner: postgres
--

CREATE TABLE "Outtatown Web App"."HotelChain" (
    "ChainID" integer NOT NULL,
    "Name" text NOT NULL,
    "NumberOfHotels" integer NOT NULL,
    "Email" text[] NOT NULL,
    "PhoneNumber" text[] NOT NULL,
    CONSTRAINT "chainID" CHECK ((("ChainID" >= 5000) AND ("ChainID" < 6000))),
    CONSTRAINT numberofhotels CHECK (("NumberOfHotels" >= 8))
);


ALTER TABLE "Outtatown Web App"."HotelChain" OWNER TO postgres;

--
-- Name: Hotel_Room; Type: TABLE; Schema: Outtatown Web App; Owner: postgres
--

CREATE TABLE "Outtatown Web App"."Hotel_Room" (
    "HotelID" integer NOT NULL,
    "RoomNumber" integer NOT NULL,
    "Amenities" text[],
    "Extendable" boolean,
    "ViewType" text,
    "Problems" text[],
    "Price" money,
    "RoomCapacity" text,
    CONSTRAINT "Hotel_Room_ViewType_check" CHECK ((("ViewType" = 'Mountain'::text) OR ("ViewType" = 'Sea'::text))),
    CONSTRAINT hotel_id CHECK ((("HotelID" > 300000) AND ("HotelID" < 400000))),
    CONSTRAINT room_capacity CHECK ((("RoomCapacity" = 'Single'::text) OR ("RoomCapacity" = 'Double'::text)))
);


ALTER TABLE "Outtatown Web App"."Hotel_Room" OWNER TO postgres;

--
-- Name: Renting; Type: TABLE; Schema: Outtatown Web App; Owner: postgres
--

CREATE TABLE "Outtatown Web App"."Renting" (
    "RentingID" integer NOT NULL,
    "CheckInDate" date,
    "CheckOutDate" date,
    "HotelID" integer,
    "RoomNumber" integer,
    "CustomerID" text,
    CONSTRAINT "HotelID" CHECK ((("HotelID" > 300000) AND ("HotelID" < 400000))),
    CONSTRAINT "customerID" CHECK ((length("CustomerID") = 9)),
    CONSTRAINT "rentingID" CHECK ((("RentingID" >= 2000000000) AND ("RentingID" < '3000000000'::bigint)))
);


ALTER TABLE "Outtatown Web App"."Renting" OWNER TO postgres;

--
-- Name: available_rooms_per_city; Type: VIEW; Schema: Outtatown Web App; Owner: postgres
--

CREATE VIEW "Outtatown Web App".available_rooms_per_city AS
 SELECT "City",
    sum("NumberOfRooms") AS totalnumberofrooms
   FROM "Outtatown Web App"."Hotel"
  GROUP BY "City";


ALTER VIEW "Outtatown Web App".available_rooms_per_city OWNER TO postgres;

--
-- Name: capacity_per_hotel; Type: VIEW; Schema: Outtatown Web App; Owner: postgres
--

CREATE VIEW "Outtatown Web App".capacity_per_hotel AS
 SELECT hr."HotelID",
    h."Name" AS "HotelName",
    (sum(
        CASE hr."RoomCapacity"
            WHEN 'Single'::text THEN 2
            WHEN 'Double'::text THEN 4
            ELSE 0
        END))::integer AS "TotalCapacity"
   FROM ("Outtatown Web App"."Hotel_Room" hr
     JOIN "Outtatown Web App"."Hotel" h ON ((hr."HotelID" = h."HotelID")))
  GROUP BY hr."HotelID", h."Name"
  ORDER BY hr."HotelID";


ALTER VIEW "Outtatown Web App".capacity_per_hotel OWNER TO postgres;

--
-- Name: VIEW capacity_per_hotel; Type: COMMENT; Schema: Outtatown Web App; Owner: postgres
--

COMMENT ON VIEW "Outtatown Web App".capacity_per_hotel IS 'View #2 as requested from project description';


--
-- Data for Name: Archive; Type: TABLE DATA; Schema: Outtatown Web App; Owner: postgres
--

COPY "Outtatown Web App"."Archive" ("ArchiveID") FROM stdin;
\.


--
-- Data for Name: Booking; Type: TABLE DATA; Schema: Outtatown Web App; Owner: postgres
--

COPY "Outtatown Web App"."Booking" ("BookingID", "BookingDate", "HotelID", "RoomNumber", "CustomerID") FROM stdin;
\.


--
-- Data for Name: CentralOffice; Type: TABLE DATA; Schema: Outtatown Web App; Owner: postgres
--

COPY "Outtatown Web App"."CentralOffice" ("OfficeID", "Number", "Street Name", "City", "Province", "PostalCode", "ChainID") FROM stdin;
5001A	342	Mace Drive	Edmonton	AB	T5L3R9	5001
5000A	55	Woodroffe Avenue	Ottawa	ON	K2J5X8	5000
5000B	93	Switch Grass Crescent	Ottawa	ON	K5X9L2	5000
5003A	54	Georgetown Street	Vancouver	BC	V8Y9L4	5003
5003B	712	Chemin Victoria	MontrÃ©al	QC	M5G3L2	5003
5004A	6894	Marion Avenue	Edmonton	AB	L5G3R1	5004
5002A	66	Finch Avenue West	Toronto	ON	L1K4A7	5002
\.


--
-- Data for Name: Customer; Type: TABLE DATA; Schema: Outtatown Web App; Owner: postgres
--

COPY "Outtatown Web App"."Customer" ("CustomerID", "FirstName", "LastName", "PaymentCardNumber", "Number", "StreetName", "City", "Province", "PostalCode", "RegistrationDate") FROM stdin;
589485686	Kyle	Tran	\N	\N	\N	\N	\N	\N	2024-03-25
453568345	Nahiyan	Ishtiaque	\N	\N	\N	\N	\N	\N	2024-03-25
\.


--
-- Data for Name: Employee; Type: TABLE DATA; Schema: Outtatown Web App; Owner: postgres
--

COPY "Outtatown Web App"."Employee" ("SIN", "FirstName", "LastName", "Number", "StreetName", "City", "Province", "PostalCode", "Role", "HotelID") FROM stdin;
\.


--
-- Data for Name: Hotel; Type: TABLE DATA; Schema: Outtatown Web App; Owner: postgres
--

COPY "Outtatown Web App"."Hotel" ("HotelID", "Name", "Number", "StreetName", "City", "Province", "PostalCode", "Email", "NumberOfRooms", "Rating", "PhoneNumber", "ChainID") FROM stdin;
300002	Hotel California	4990	Scott Street	Toronto	ON	R5K9L2	admin@hotelcalifornia.ca	5	5	{416-308-5342,647-358-6891}	5000
300008	Rocky Mountain Lodge	6548	Mountain View Road	Banff	AB	T1L1A1	hello@rockymountainlodge.ca	5	5	{403-453-8628,403-752-8768}	5000
300010	Comfy Inn Winnipeg	687	Reynolds Street	Winnipeg	MB	R6N8P2	info@comfyinnwinnipeg.ca	5	2	{256-814-0257}	5001
300012	Montreal Plaza Hotel	84	Rue Sainte-Catherine Ouest	MontrÃ©al	QC	H3B3E4	contact@montrealplazahotel.ca	5	5	{514-555-6789,514-863-8135}	5001
300014	Okanagan Valley Resort	1010	Vineyard Road	Kelowna	BC	V1W3L1	info@okanaganvalleyresort.com	5	4	{250-462-9012,250-537-4524}	5001
300016	Maritime Harbor Hotel	76	Waterfront Drive	Halifax	NS	B3J3R9	inquiry@maritimeharborhotel.com	5	2	{902-555-4373}	5001
300018	Sunset Vista Resort	2	Clara Boulevard	London	ON	M6T3G0	info@sunsetvistaresort.com	5	4	{250-296-6294,250-692-7834}	5002
300020	Sunrise Beach Inn	9024	Shoreline Avenue	Vancouver	BC	V6G1A4	contact@sunrisebeachinn.ca	5	5	{604-466-7682}	5002
300022	Tranquil Inn	246	Indiana Avenue	Hamilton	ON	P9G7N6	admin@tranquilinn.ca	5	5	{095-724-3801,905-890-1100}	5002
300024	The Bayview Motel	4224	Second Street	Vancouver	BC	V0K2X6	info@thebayviewmotel.com	5	5	{604-745-1050,604-467-2377,604-236-8089}	5002
300026	Majesty Hotel	567	Rue des Sondages	QuÃ©bec	QC	G5J5L2	info@majestyhotel.ca	5	3	{465-575-4671}	5002
300028	Comfy Inn North Bay	4	Patricia Street	North Bay	ON	H5G0L2	contact@comfyinnnorthbay.ca	5	3	{564-357-3477}	5003
300030	Churchill Hotel	876	Albus Avenue	Churchill	MB	C6G3R7	admin@churchillhotel.com	5	3	{459-792-3868}	5003
300032	James Naismith Hotel	999	Dufferin Boulevard	Charlottetown	PE	C1A4E6	contact@jnhotel.ca	5	4	{586-467-2487}	5003
300034	Renegade Hotel	83	Golden Knight Avenue	Victoria	BC	V9L0U2	contact@renegadehotel.com	5	3	{596-236-4368}	5003
300036	Coastal Inn	52	Hilroy Avenue	Victoria	BC	V8L2A9	info@coastalinn.com	5	4	{495-686-8347,495-283-1824}	5004
300038	Eternal Snowfall Chalet	890	Mountainview Drive	Banff	AB	T1M4A0	contact@eternalsnowfallchalet.ca	5	5	{403-692-8923}	5004
300040	Grand Concourse Hotel	339	Rue Saint-Hubert	Drummondville	QC	D9T7X1	info@grandconcourse.ca	5	4	{576-365-6868}	5004
300042	Transatlantic Inn	639	Seaport Road	Halifax	NS	H3L0U8	contact@transatlantic.com	5	4	{830-587-7829}	5004
300044	Lincoln Plaza Hotel	55	Finnigan Crescent	Guelph	ON	G3L2P4	info@lincolnplazahotel.com	5	5	{216-368-6826,216-682-9897}	5004
300001	Diamond Hotel	534	Avenue Boulevard	Edmonton	AB	T5F3X2	diamondhotel@gmail.com	5	4	{642-462-7521}	5000
300003	Prairie Lodge Inn	9799	Wheatfield Avenue	Regina	SK	S4R1R1	inquiries@saskprairielodge.ca	5	5	{306-782-1368}	5000
300005	Whistler Chalet Resort	78	Alpine Way	Whistler	BC	V8E1E5	admin@whistlerchalet.com	5	4	{604-072-0426}	5000
300007	Hotel Aurora	435	Main Street	Toronto	ON	M5V2K8	info@hotelaurora.com	5	4	{416-758-3455,647-865-1356}	5000
300009	Niagara Falls Hotel & Spa	3	Fallsview Boulevard	Niagara Falls	ON	L2G3W7	info@niagarafallshotel.com	5	3	{905-657-7863,905-326-6724,905-965-2572}	5000
300011	Capital Inn	885	Montreal Road	Ottawa	ON	K5Y6M3	admin@capitalinn.com	5	4	{613-643-4246,613-467-8845,343-714-2355}	5001
300013	Atlantic Seaside Inn	5436	Coastal Avenue	Saint John	NB	E2L3R7	hello@atlanticseasideinn.ca	5	3	{506-682-6753}	5001
300015	Polar Lodge	10	Tundra Trail	Churchill	MB	R0B0E0	info@polarbearlodge.ca	5	5	{204-467-8247}	5001
300017	Northern Lights Resort	971	Aurora Avenue	Yellowknife	NT	X1A2S7	contact@northernlightsresort.ca	5	5	{867-642-0356}	5001
300019	Seaside Serenity Hotel	54	Colossus Drive	Sydney	NS	B3L1A3	info@seasideserenityhotel.ca	5	4	{902-346-7534,902-752-3400}	5002
300021	Watershield Hotel	1001	Wolfpack Road	Whitehorse	YK	W9L5B8	hello@watershieldhotel.com	5	2	{906-358-1386}	5002
300023	Harbour View Hotel	75	Airport Parkway	Saskatoon	SK	S5L1W4	admin@harbourviewhotel.com	5	4	{568-621-7919}	5002
300025	Comfortable Inn	462	Bingo Road	Thunder Bay	ON	T5D6L1	admin@comfortableinn.com	5	2	{562-753-9151}	5002
300027	Rocky Retreat Inn	7331	Summit Avenue	Jasper	AB	T1L0C1	contact@rockymountainretreat.ca	5	4	{403-742-5692}	5002
300029	Silver Seven Hotel	624	Silver Seven Road	Ottawa	ON	K1M4A5	contact@silverseven.ca	5	4	{613-825-7594,613-459-7294}	5003
300031	Stem City Lodge	44	Rocky Mountain Road	Burnaby	BC	G4R2J1	inquiries@stemcitylodge.com	5	5	{662-492-6923,662-609-3969}	5003
300033	Toronto Lux Hotel	6772	Scotiabank Drive	Toronto	ON	R0L8R3	admin@torontoluxhotel.com	5	5	{416-347-8935,416-486-7824,647-683-4979}	5003
300035	Regina Holiday Hotel	67	Wheatcroft Road	Regina	SK	G9L7P8	admin@reginaholidayhotel.com	5	4	{892-486-2940}	5003
300037	Northern Haven Hotel	6	Haymitch Boulevard	Calgary	AB	H5P2V7	admin@northernhavenhotel.ca	5	5	{485-679-6829,485-792-4697}	5004
300039	Union Plaza	40	Scotiabank Road	Toronto	ON	J4V2L9	admin@unionplaza.com	5	4	{416-496-2869}	5004
300041	True North Hotel	7980	Trailblazer Avenue	Whitehorse	YK	W9G4M2	inquiries@truenorthhotel.ca	5	5	{985-681-6810}	5004
300043	Plain Seeds Inn	682	Wheatview Boulevard	Red Deer	AB	R9P2B3	admin@plainseedsinn.ca	5	3	{586-782-6824,586-238-6828}	5004
300004	Bay Beach Resort	776	Bayshore Drive	Alma	NB	E4H1E4	admin@baybeachresort.com	5	5	{506-007-6437,506-236-8734}	5000
300006	Maple Leaf Inn	3561	Maple Avenue	Vancouver	BC	V6B1V8	contact@mapleleafinn.com	5	3	{604-643-3524}	5000
\.


--
-- Data for Name: HotelChain; Type: TABLE DATA; Schema: Outtatown Web App; Owner: postgres
--

COPY "Outtatown Web App"."HotelChain" ("ChainID", "Name", "NumberOfHotels", "Email", "PhoneNumber") FROM stdin;
5000	LuxStay Hotels	9	{contact@luxstayhotels.com}	{532-552-6163}
5001	Grand Horizon Hotels	8	{hello@ghhotels.com,admin@ghhotels.com}	{642-671-9500,642-753-0088}
5002	Vista Resorts	10	{contact@vista.com}	{985-246-8652}
5004	Crystal Crown Corporation	9	{admin@crystalcrown.com,ceo@crystalcrown.com}	{613-856-1365,416-642-7568}
5003	ComfyInn Inc.	8	{admin@comfyinn.com}	{743-861-1257,643-642-1871,234-867-1000}
\.


--
-- Data for Name: Hotel_Room; Type: TABLE DATA; Schema: Outtatown Web App; Owner: postgres
--

COPY "Outtatown Web App"."Hotel_Room" ("HotelID", "RoomNumber", "Amenities", "Extendable", "ViewType", "Problems", "Price", "RoomCapacity") FROM stdin;
300032	106	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$276.00	Double
300001	103	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$179.00	Double
300001	104	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$179.00	Double
300001	100	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Mountain	{None}	$225.00	Single
300001	101	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Mountain	{None}	$225.00	Single
300001	102	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Mountain	{None}	$225.00	Single
300002	1000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,"Air Conditioner"}	f	Sea	{None}	$250.00	Single
300002	1001	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,"Air Conditioner"}	f	Sea	{None}	$250.00	Double
300002	1002	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,"Air Conditioner"}	f	Sea	{None}	$250.00	Single
300002	1003	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,"Air Conditioner"}	f	Sea	{None}	$250.00	Double
300002	1004	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,"Air Conditioner"}	f	Sea	{None}	$250.00	Single
300003	100	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,"Air Conditioner"}	f	Mountain	{None}	$299.00	Double
300012	1002	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$333.00	Single
300012	2000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$333.00	Single
300012	2001	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$333.00	Single
300032	108	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{"Broken Fridge"}	$276.00	Double
300035	102	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Mountain	{None}	$260.00	Single
300035	103	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$280.00	Double
300035	104	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Mountain	{None}	$260.00	Single
300035	105	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$280.00	Double
300018	100	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$278.00	Single
300018	102	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$278.00	Single
300018	104	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{"Broken Heater"}	$250.00	Double
300018	106	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{None}	$307.00	Double
300018	108	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{None}	$307.00	Double
300019	1000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$278.00	Single
300019	1002	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{"Broken Microwave"}	$278.00	Single
300019	1004	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{None}	$307.00	Double
300019	1006	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{None}	$307.00	Double
300022	100	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$331.00	Double
300022	200	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$331.00	Double
300022	300	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$331.00	Double
300022	400	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$290.00	Single
300022	500	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$331.00	Double
300023	100	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$269.00	Single
300023	101	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$269.00	Single
300021	101	{Wi-Fi,Fridge,Heater}	f	Mountain	{None}	$250.00	Single
300003	101	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,"Air Conditioner"}	f	Mountain	{None}	$299.00	Double
300003	200	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,"Air Conditioner"}	t	Mountain	{"Broken Fridge"}	$275.00	Single
300003	201	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,"Air Conditioner"}	t	Mountain	{None}	$259.00	Single
300003	202	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,"Air Conditioner"}	t	Mountain	{None}	$259.00	Single
300004	103	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi}	t	Sea	{"Damaged Heater"}	$249.00	Double
300004	104	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi}	t	Sea	{None}	$299.00	Double
300004	105	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi}	t	Sea	{None}	$299.00	Double
300034	103	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Sea	{None}	$221.00	Single
300034	104	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Sea	{None}	$221.00	Single
300005	1000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$199.00	Double
300006	100	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{None}	$169.00	Single
300004	101	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi}	t	Sea	{None}	$299.00	Double
300004	102	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi}	t	Sea	{None}	$299.00	Double
300036	1001	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{"Inconsistent Wi-Fi"}	$228.00	Single
300036	1002	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{"Inconsistent Wi-Fi"}	$228.00	Single
300006	101	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{None}	$169.00	Double
300007	1001	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$201.00	Single
300007	1002	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$201.00	Single
300007	1003	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$201.00	Single
300011	1000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{None}	$233.00	Double
300011	1001	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{None}	$233.00	Double
300011	1002	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{None}	$233.00	Double
300011	1003	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{None}	$233.00	Double
300011	1004	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{None}	$233.00	Double
300007	1004	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$201.00	Single
300017	100	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$375.00	Single
300007	1005	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{"TV not working"}	$189.00	Single
300017	101	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$375.00	Single
300017	102	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$375.00	Single
300012	1000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$333.00	Single
300012	1001	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$333.00	Single
300017	103	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$375.00	Single
300015	100	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$299.00	Double
300013	100	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Sea	{None}	$223.00	Single
300016	101	{Wi-Fi,Fridge}	f	Sea	{None}	$155.00	Single
300016	102	{Wi-Fi,Fridge}	f	Sea	{None}	$155.00	Single
300010	103	{"Free Breakfast",Wi-Fi,Fridge}	f	Mountain	{None}	$129.00	Single
300010	104	{"Free Breakfast",Wi-Fi,Fridge}	f	Mountain	{"Fridge not working"}	$129.00	Single
300016	103	{Wi-Fi,Fridge}	f	Sea	{None}	$155.00	Single
300016	104	{Wi-Fi,Fridge}	f	Sea	{None}	$155.00	Double
300015	101	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$299.00	Single
300013	102	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Sea	{"Microwave broken"}	$223.00	Single
300013	104	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Sea	{"Microwave broken"}	$223.00	Single
300013	106	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Sea	{None}	$223.00	Single
300013	108	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Sea	{"Fridge broken"}	$223.00	Single
300014	1000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Mountain	{None}	$266.00	Single
300005	2000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$199.00	Single
300005	3000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$199.00	Double
300005	4000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$199.00	Single
300005	5000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$199.00	Double
300006	102	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{None}	$169.00	Single
300006	103	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{None}	$169.00	Double
300006	104	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{None}	$169.00	Single
300008	100	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$329.00	Double
300008	101	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$329.00	Double
300008	102	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$329.00	Single
300008	103	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$329.00	Double
300008	104	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$329.00	Single
300009	100	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	t	Sea	{None}	$181.00	Single
300009	101	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	t	Sea	{"Damaged Air Conditioner"}	$161.00	Single
300009	200	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	t	Sea	{None}	$181.00	Single
300009	201	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	t	Sea	{None}	$181.00	Single
300009	202	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	t	Sea	{None}	$181.00	Single
300010	100	{"Free Breakfast",Wi-Fi,Fridge}	f	Mountain	{"Fridge not working"}	$129.00	Single
300010	101	{"Free Breakfast",Wi-Fi,Fridge}	f	Mountain	{None}	$129.00	Single
300010	102	{"Free Breakfast",Wi-Fi,Fridge}	f	Mountain	{"Fridge not working"}	$129.00	Single
300015	200	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$299.00	Single
300015	201	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Sea	{None}	$299.00	Single
300015	202	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Sea	{None}	$299.00	Double
300016	105	{Wi-Fi,Fridge}	f	Sea	{"Broken Bedframe"}	$155.00	Double
300017	104	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$375.00	Single
300014	1010	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$288.00	Double
300014	1020	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Mountain	{None}	$266.00	Single
300014	1030	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$288.00	Double
300014	1040	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Mountain	{None}	$266.00	Single
300036	1003	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{"Inconsistent Wi-Fi"}	$248.00	Double
300036	1004	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{"Inconsistent Wi-Fi"}	$248.00	Double
300036	1005	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{"Inconsistent Wi-Fi"}	$228.00	Single
300020	1001	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Sea	{None}	$245.00	Double
300020	1002	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Sea	{None}	$245.00	Double
300020	1003	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Sea	{None}	$245.00	Double
300020	1004	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Sea	{None}	$245.00	Double
300020	1005	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Sea	{None}	$245.00	Double
300021	102	{Wi-Fi,Fridge,Heater}	f	Mountain	{None}	$250.00	Single
300021	103	{Wi-Fi,Fridge,Heater}	f	Mountain	{None}	$250.00	Single
300021	104	{Wi-Fi,Fridge,Heater}	f	Mountain	{"Broken Heater"}	$170.00	Single
300021	105	{Wi-Fi,Fridge,Heater}	f	Mountain	{None}	$250.00	Single
300019	1010	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{None}	$307.00	Double
300037	100	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$313.00	Double
300037	101	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$313.00	Double
300037	200	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$313.00	Double
300037	201	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$313.00	Double
300037	300	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$313.00	Double
300039	1000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$234.00	Single
300039	1001	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{None}	$268.00	Double
300039	1002	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$234.00	Single
300039	1003	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Sea	{None}	$268.00	Double
300039	1004	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$234.00	Single
300040	100	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$268.00	Double
300040	101	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$239.00	Single
300040	102	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$268.00	Double
300044	102	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$366.00	Double
300044	103	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$366.00	Double
300044	104	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$366.00	Double
300023	102	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{"Broken Microwave"}	$269.00	Single
300023	103	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$269.00	Single
300023	104	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$269.00	Single
300024	1001	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Sea	{None}	$312.00	Double
300024	1002	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$292.00	Single
300024	1003	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Sea	{None}	$312.00	Double
300024	1004	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Mountain	{None}	$292.00	Single
300024	1005	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	t	Sea	{None}	$312.00	Double
300025	101	{Wi-Fi,Fridge,Heater}	f	Mountain	{"Broken Heater"}	$211.00	Single
300025	103	{Wi-Fi,Fridge,Heater}	f	Mountain	{"Broken Heater"}	$211.00	Single
300025	105	{Wi-Fi,Fridge,Heater}	f	Mountain	{None}	$233.00	Single
300025	107	{Wi-Fi,Fridge,Heater}	f	Mountain	{"Broken Heater"}	$211.00	Single
300025	109	{Wi-Fi,Fridge,Heater}	f	Mountain	{"Broken Heater"}	$211.00	Single
300026	100	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	t	Mountain	{None}	$275.00	Double
300026	101	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{None}	$275.00	Double
300026	200	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	t	Mountain	{None}	$275.00	Double
300026	201	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{"Faulty Fridge"}	$275.00	Double
300026	202	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	t	Mountain	{None}	$275.00	Double
300027	100	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$274.00	Single
300027	101	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$296.00	Double
300027	200	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$274.00	Single
300027	201	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$296.00	Single
300027	202	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$296.00	Double
300028	100	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	t	Mountain	{"Inconsistent Wi-Fi"}	$299.00	Single
300028	101	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Sea	{"Inconsistent Wi-Fi"}	$245.00	Single
300028	102	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{"Inconsistent Wi-Fi"}	$245.00	Single
300028	103	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Sea	{"Inconsistent Wi-Fi"}	$245.00	Single
300028	104	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{"Inconsistent Wi-Fi"}	$245.00	Single
300029	102	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Mountain	{None}	$251.00	Single
300029	103	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Mountain	{None}	$251.00	Single
300029	104	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Mountain	{None}	$251.00	Single
300030	1000	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{None}	$213.00	Single
300030	1001	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{"Broken Microwave"}	$201.00	Single
300030	1002	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{None}	$213.00	Single
300030	1003	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{"Broken Microwave"}	$201.00	Single
300030	1004	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{None}	$213.00	Single
300032	110	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$276.00	Double
300033	1000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	f	Sea	{None}	$299.00	Single
300033	2000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	f	Sea	{None}	$299.00	Single
300033	3000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	f	Sea	{None}	$299.00	Single
300033	4000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	f	Sea	{None}	$322.00	Double
300033	5000	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,"Gym Access"}	f	Sea	{None}	$322.00	Double
300034	100	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Sea	{"Broken Fridge"}	$221.00	Single
300034	101	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Sea	{None}	$221.00	Single
300034	102	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Sea	{"Broken Fridge"}	$221.00	Single
300038	100	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{"Broken Jacuzzi"}	$289.00	Double
300038	103	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$313.00	Double
300038	106	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$313.00	Double
300038	109	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$313.00	Double
300038	112	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{"Broken Jacuzzi"}	$289.00	Double
300029	100	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Mountain	{None}	$251.00	Single
300029	101	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Mountain	{None}	$251.00	Single
300031	100	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,"Air Conditioner"}	t	Mountain	{None}	$288.00	Single
300031	102	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,"Air Conditioner"}	f	Mountain	{None}	$313.00	Double
300031	104	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,"Air Conditioner"}	t	Mountain	{None}	$288.00	Single
300031	106	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,"Air Conditioner"}	f	Mountain	{None}	$313.00	Double
300031	108	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,"Air Conditioner"}	t	Mountain	{None}	$288.00	Single
300032	102	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$276.00	Double
300032	104	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{"Broken Fridge"}	$276.00	Double
300035	101	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$280.00	Double
300040	103	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$239.00	Single
300040	104	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	f	Mountain	{None}	$268.00	Double
300041	101	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{"Malfunctioning Heater"}	$270.00	Single
300041	102	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$303.00	Single
300041	103	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$303.00	Single
300041	104	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$303.00	Single
300041	105	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$303.00	Single
300042	1001	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{"Fridge Broken","Microwave Broken"}	$214.00	Single
300042	1002	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$234.00	Single
300042	1003	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$234.00	Single
300042	1004	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$234.00	Single
300042	1005	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave}	t	Sea	{None}	$234.00	Single
300043	100	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{None}	$255.00	Double
300043	101	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{None}	$255.00	Double
300043	102	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{None}	$255.00	Double
300043	200	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{None}	$255.00	Double
300043	201	{"Free Breakfast",Wi-Fi,Fridge,Microwave}	f	Mountain	{None}	$255.00	Double
300044	100	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$366.00	Double
300044	101	{"Free Breakfast",Wi-Fi,"Room Service",Fridge,Microwave,Jacuzzi,Heater}	t	Mountain	{None}	$366.00	Double
\.


--
-- Data for Name: Renting; Type: TABLE DATA; Schema: Outtatown Web App; Owner: postgres
--

COPY "Outtatown Web App"."Renting" ("RentingID", "CheckInDate", "CheckOutDate", "HotelID", "RoomNumber", "CustomerID") FROM stdin;
\.


--
-- Name: Archive Archive_pkey; Type: CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."Archive"
    ADD CONSTRAINT "Archive_pkey" PRIMARY KEY ("ArchiveID");


--
-- Name: Booking Booking_pkey; Type: CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY ("BookingID");


--
-- Name: CentralOffice CentralOffice_pkey; Type: CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."CentralOffice"
    ADD CONSTRAINT "CentralOffice_pkey" PRIMARY KEY ("OfficeID");


--
-- Name: Customer Customer_pkey; Type: CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("CustomerID");


--
-- Name: Employee Employee_pkey; Type: CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."Employee"
    ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("SIN");


--
-- Name: HotelChain HotelChain_pkey; Type: CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."HotelChain"
    ADD CONSTRAINT "HotelChain_pkey" PRIMARY KEY ("ChainID");


--
-- Name: Hotel_Room Hotel_Room_pkey; Type: CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."Hotel_Room"
    ADD CONSTRAINT "Hotel_Room_pkey" PRIMARY KEY ("HotelID", "RoomNumber");


--
-- Name: Hotel Hotel_pkey; Type: CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."Hotel"
    ADD CONSTRAINT "Hotel_pkey" PRIMARY KEY ("HotelID");


--
-- Name: Renting Renting_pkey; Type: CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."Renting"
    ADD CONSTRAINT "Renting_pkey" PRIMARY KEY ("RentingID");


--
-- Name: fki_hotel_fk; Type: INDEX; Schema: Outtatown Web App; Owner: postgres
--

CREATE INDEX fki_hotel_fk ON "Outtatown Web App"."Booking" USING btree ("HotelID", "RoomNumber");


--
-- Name: fki_hotel_id_fk; Type: INDEX; Schema: Outtatown Web App; Owner: postgres
--

CREATE INDEX fki_hotel_id_fk ON "Outtatown Web App"."Employee" USING btree ("HotelID");


--
-- Name: index_city; Type: INDEX; Schema: Outtatown Web App; Owner: postgres
--

CREATE INDEX index_city ON "Outtatown Web App"."Hotel" USING btree ("City");


--
-- Name: index_city_rating; Type: INDEX; Schema: Outtatown Web App; Owner: postgres
--

CREATE INDEX index_city_rating ON "Outtatown Web App"."Hotel" USING btree ("City", "Rating");


--
-- Name: index_hotel_room; Type: INDEX; Schema: Outtatown Web App; Owner: postgres
--

CREATE INDEX index_hotel_room ON "Outtatown Web App"."Hotel_Room" USING btree ("RoomNumber", "HotelID");


--
-- Name: Booking decrease_rooms_count_booking; Type: TRIGGER; Schema: Outtatown Web App; Owner: postgres
--

CREATE TRIGGER decrease_rooms_count_booking AFTER INSERT ON "Outtatown Web App"."Booking" FOR EACH ROW EXECUTE FUNCTION "Outtatown Web App".decrement_number_of_rooms();


--
-- Name: Renting decrease_rooms_count_renting; Type: TRIGGER; Schema: Outtatown Web App; Owner: postgres
--

CREATE TRIGGER decrease_rooms_count_renting AFTER INSERT ON "Outtatown Web App"."Renting" FOR EACH ROW EXECUTE FUNCTION "Outtatown Web App".decrement_number_of_rooms();


--
-- Name: Booking increase_rooms_count_booking; Type: TRIGGER; Schema: Outtatown Web App; Owner: postgres
--

CREATE TRIGGER increase_rooms_count_booking AFTER DELETE ON "Outtatown Web App"."Booking" FOR EACH ROW EXECUTE FUNCTION "Outtatown Web App".increase_number_of_rooms();


--
-- Name: Renting increase_rooms_count_renting; Type: TRIGGER; Schema: Outtatown Web App; Owner: postgres
--

CREATE TRIGGER increase_rooms_count_renting AFTER DELETE ON "Outtatown Web App"."Renting" FOR EACH ROW EXECUTE FUNCTION "Outtatown Web App".increase_number_of_rooms();


--
-- Name: Archive BookingID; Type: FK CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."Archive"
    ADD CONSTRAINT "BookingID" FOREIGN KEY ("ArchiveID") REFERENCES "Outtatown Web App"."Booking"("BookingID");


--
-- Name: CentralOffice ChainID; Type: FK CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."CentralOffice"
    ADD CONSTRAINT "ChainID" FOREIGN KEY ("ChainID") REFERENCES "Outtatown Web App"."HotelChain"("ChainID");


--
-- Name: Hotel ChainID; Type: FK CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."Hotel"
    ADD CONSTRAINT "ChainID" FOREIGN KEY ("ChainID") REFERENCES "Outtatown Web App"."HotelChain"("ChainID");


--
-- Name: Archive RentingID; Type: FK CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."Archive"
    ADD CONSTRAINT "RentingID" FOREIGN KEY ("ArchiveID") REFERENCES "Outtatown Web App"."Renting"("RentingID");


--
-- Name: Renting customerID_fk; Type: FK CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."Renting"
    ADD CONSTRAINT "customerID_fk" FOREIGN KEY ("CustomerID") REFERENCES "Outtatown Web App"."Customer"("CustomerID");


--
-- Name: Booking customerID_fk; Type: FK CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."Booking"
    ADD CONSTRAINT "customerID_fk" FOREIGN KEY ("CustomerID") REFERENCES "Outtatown Web App"."Customer"("CustomerID");


--
-- Name: Renting hotel_fk; Type: FK CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."Renting"
    ADD CONSTRAINT hotel_fk FOREIGN KEY ("HotelID", "RoomNumber") REFERENCES "Outtatown Web App"."Hotel_Room"("HotelID", "RoomNumber");


--
-- Name: Booking hotel_fk; Type: FK CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."Booking"
    ADD CONSTRAINT hotel_fk FOREIGN KEY ("HotelID", "RoomNumber") REFERENCES "Outtatown Web App"."Hotel_Room"("HotelID", "RoomNumber");


--
-- Name: Employee hotel_id_fk; Type: FK CONSTRAINT; Schema: Outtatown Web App; Owner: postgres
--

ALTER TABLE ONLY "Outtatown Web App"."Employee"
    ADD CONSTRAINT hotel_id_fk FOREIGN KEY ("HotelID") REFERENCES "Outtatown Web App"."Hotel"("HotelID");


--
-- PostgreSQL database dump complete
--