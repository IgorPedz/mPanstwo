-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2026 at 11:04 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mpanstwo`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dashboard_content`
--

CREATE TABLE `dashboard_content` (
  `id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `accent` varchar(100) NOT NULL,
  `icon` varchar(100) NOT NULL,
  `iconColor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dashboard_content`
--

INSERT INTO `dashboard_content` (`id`, `type`, `name`, `accent`, `icon`, `iconColor`) VALUES
(1, 'poslowie', 'Posłowie', 'from-blue-800 to-blue-600', 'UserGroupIcon', 'text-blue-800'),
(2, 'senatorowie', 'Senatorowie', 'from-indigo-800 to-indigo-600', 'UserIcon', 'text-indigo-800'),
(3, 'kluby', 'Kluby Parlamentarne', 'from-purple-700 to-purple-500', 'ScaleIcon', 'text-purple-700'),
(4, 'sejm', 'Sejm RP', 'from-emerald-700 to-emerald-500', 'BuildingLibraryIcon', 'text-emerald-700'),
(5, 'senat', 'Senat RP', 'from-orange-700 to-orange-500', 'BuildingLibraryIcon', 'text-orange-700'),
(6, 'rada', 'Rada Ministrów', 'from-rose-700 to-rose-500', 'BuildingOfficeIcon', 'text-rose-700'),
(7, 'ustawy', 'Ustawy', 'from-green-700 to-green-500', 'DocumentTextIcon', 'text-green-700'),
(8, 'kancelaria_prezydenta', 'Kancelaria Prezydenta RP', 'from-gray-700 to-gray-500', 'BriefcaseIcon', 'text-fuchsia-700'),
(9, 'prezydent', 'Prezydent RP', 'from-red-700 to-red-500', 'FlagIcon', 'text-red-700'),
(10, 'uokik', 'UOKiK', 'from-pink-700 to-pink-500', 'BanknotesIcon', 'text-pink-700'),
(11, 'tk', 'Trybunał Konstytucyjny', 'from-yellow-700 to-yellow-500', 'AcademicCapIcon', 'text-yellow-700'),
(12, 'nsa', 'Naczelny Sąd Administracyjny', 'from-cyan-700 to-cyan-500', 'BuildingOfficeIcon', 'text-cyan-700'),
(13, 'krs', 'Krajowa Rada Sądownictwa', 'from-teal-700 to-teal-500', 'BuildingOfficeIcon', 'text-teal-700');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, '', 'igorrpedziwilk@gmail.com', '$2b$10$KoKNM42i0rsw3C0F31thPuOMx4kiUi/zPY8NkS/HHKgl/aMiZ5uDa', '2026-02-24 20:36:07'),
(2, 'igorr', 'igor@wp.pl', '$2b$10$SGIT8GNRqbuylkLf1Hqig.yGQkmgoVwFN0NDx/fWOwOCJ9a6kPy/G', '2026-02-24 20:45:14');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `dashboard_content`
--
ALTER TABLE `dashboard_content`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_tiles`
--

CREATE TABLE `user_tiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tiles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`tiles`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indeksy dla tabeli `user_tiles`
--
ALTER TABLE `user_tiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `user_tiles`
--
ALTER TABLE `user_tiles`
  ADD CONSTRAINT `user_tiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- AUTO_INCREMENT for table `dashboard_content`
--
ALTER TABLE `dashboard_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
