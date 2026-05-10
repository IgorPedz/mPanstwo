-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Maj 11, 2026 at 12:10 AM
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
(1, 'poslowie', 'Posłowie', 'blue', 'userGroup', 'blue'),
(2, 'senatorowie', 'Senatorowie', 'indigo', 'user', 'indigo'),
(3, 'kluby', 'Kluby Parlamentarne', 'purple', 'scale', 'purple'),
(4, 'sejm', 'Sejm RP', 'emerald', 'parliament', 'emerald'),
(5, 'senat', 'Senat RP', 'orange', 'parliament', 'orange'),
(6, 'rada', 'Rada Ministrów', 'rose', 'ministry', 'rose'),
(7, 'ustawy', 'Ustawy', 'green', 'document', 'green'),
(8, 'kancelaria_prezydenta', 'Kancelaria Prezydenta RP', 'teal', 'briefcase', 'teal'),
(9, 'prezydent', 'Prezydent RP', 'red', 'flag', 'red'),
(10, 'uokik', 'UOKiK', 'pink', 'banknotes', 'pink'),
(11, 'tk', 'Trybunał Konstytucyjny', 'yellow', 'courses', 'yellow'),
(12, 'nsa', 'Naczelny Sąd Administracyjny', 'cyan', 'ministry', 'cyan'),
(13, 'krs', 'Krajowa Rada Sądownictwa', 'teal', 'ministry', 'teal'),
(14, 'finanse', 'Ministerstwo Finansów i Gospodarki', 'emerald-gradient', 'banknotes', 'emerald-gradient'),
(15, 'zdrowie', 'Ministerstwo Zdrowia', 'red-gradient', 'heart', 'red-gradient'),
(16, 'obrona', 'Ministerstwo Obrony Narodowej', 'cyan', 'shield', 'cyan'),
(17, 'sprawiedliwosc', 'Ministerstwo Sprawiedliwości', 'purple-gradient', 'scale', 'purple-gradient'),
(18, 'zagranica', 'Ministerstwo Spraw Zagranicznych', 'sky-gradient', 'globe', 'sky-gradient'),
(19, 'infrastruktura', 'Ministerstwo Infrastruktury', 'orange-gradient', 'truck', 'orange-gradient'),
(20, 'rolnictwo', 'Min. Rolnictwa i Rozwoju Wsi', 'lime-gradient', 'tractor', 'lime-gradient'),
(21, 'klimat', 'Ministerstwo Klimatu i Środowiska', 'emerald-gradient', 'leaf', 'emerald-gradient'),
(22, 'aktywa', 'Ministerstwo Aktywów Państwowych', 'amber-gradient', 'factory', 'amber-gradient'),
(23, 'kultura', 'Min. Kultury i Dziedzictwa Narod.', 'pink-gradient', 'paintbrush', 'pink-gradient'),
(24, 'sport', 'Ministerstwo Sportu i Turystyki', 'cyan-gradient', 'trophy', 'cyan-gradient'),
(25, 'rodzina', 'Min. Rod. Pracy i Pol. Społecznej', 'rose-gradient', 'users', 'rose-gradient'),
(26, 'energia', 'Ministerstwo Energii', 'yellow', 'lighting', 'yellow'),
(27, 'edukacja', 'Ministerstwo Edukacji', 'emerald', 'courses', 'emerald'),
(28, 'fundusze', 'Ministerstwo Funduszy i Pol. Regionalnej', 'pink', 'euro', 'pink'),
(29, 'nauka', 'Min. Nauki i Szkol. Wyższego', 'lime-gradient', 'courses', 'lime-gradient'),
(30, 'wewnetrzne', 'Min. Spraw Wew. i Administracji', 'cyan-gradient', 'tablet', 'cyan-gradient'),
(31, 'cyfryzacja', 'Ministerstwo Cyfryzacji', 'amber-gradient', 'computer', 'amber-gradient'),
(32, 'kprm', 'Kancelaria Prezesa Rady Ministrów', 'rose-gradient', 'briefcase', 'rose-gradient');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `type`, `title`, `message`, `data`, `is_read`, `created_at`) VALUES
(33, 4, 'SURVEY_COMPLETED', 'Ankieta zakończona', '+50 XP za ukończenie ankiety', 'null', 1, '2026-05-09 18:23:52'),
(53, 2, 'SURVEY_COMPLETED', 'Ankieta zakończona', '+50 XP za ukończenie ankiety', 'null', 1, '2026-05-10 10:00:14');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `question_id`, `label`, `value`) VALUES
(17, 1, 'Tak', 'yes'),
(18, 1, 'Nie', 'no'),
(19, 2, 'Tak', 'yes'),
(20, 2, 'Nie', 'no'),
(21, 3, 'Tak', 'yes'),
(22, 3, 'Nie', 'no'),
(23, 4, 'Tak', 'yes'),
(24, 4, 'Nie', 'no'),
(25, 5, 'Tak', 'yes'),
(26, 5, 'Nie', 'no'),
(27, 6, 'Tak', 'yes'),
(28, 6, 'Nie', 'no'),
(29, 7, 'Tak', 'yes'),
(30, 7, 'Nie', 'no'),
(31, 8, 'Tak', 'yes'),
(32, 8, 'Nie', 'no'),
(33, 9, 'Tak', 'yes'),
(34, 9, 'Nie', 'no'),
(35, 10, 'Tak', 'yes'),
(36, 10, 'Nie', 'no'),
(37, 11, 'Tak', 'yes'),
(38, 11, 'Nie', 'no'),
(39, 12, 'Tak', 'yes'),
(40, 12, 'Nie', 'no');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `profile_stats`
--

CREATE TABLE `profile_stats` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `value_text` varchar(100) DEFAULT NULL,
  `value_number` int(11) DEFAULT NULL,
  `icon` varchar(50) NOT NULL,
  `color` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile_stats`
--

INSERT INTO `profile_stats` (`id`, `user_id`, `title`, `value_text`, `value_number`, `icon`, `color`, `created_at`, `updated_at`) VALUES
(1, 2, 'Dni aktywności', NULL, 24, 'calendar', 'red', '2026-05-10 11:57:53', '2026-05-10 11:57:53'),
(2, 2, 'Ostatnia aktywność', '2h temu', NULL, 'clock', 'zinc', '2026-05-10 11:57:53', '2026-05-10 11:57:53'),
(3, 2, 'Śledzone ustawy', NULL, 7, 'documents', 'indigo', '2026-05-10 11:57:53', '2026-05-10 11:57:53'),
(4, 2, 'Rola', 'Ekspert', NULL, 'achievements', 'purple', '2026-05-10 11:57:53', '2026-05-10 11:57:53'),
(5, 2, 'Oddane głosy', NULL, 128, 'vote', 'blue', '2026-05-10 11:57:53', '2026-05-10 11:57:53'),
(6, 2, 'Napisane Opinie', NULL, 34, 'comments', 'emerald', '2026-05-10 11:57:53', '2026-05-10 11:57:53'),
(7, 2, 'Ukończone kursy', NULL, 6, 'courses', 'purple', '2026-05-10 11:57:53', '2026-05-10 11:57:53'),
(8, 2, 'Punkty reputacji', NULL, 860, 'star', 'yellow', '2026-05-10 11:57:53', '2026-05-10 11:57:53'),
(9, 3, 'Dni aktywności', NULL, 0, 'calendar', 'red', '2026-05-10 12:18:39', '2026-05-10 12:18:39'),
(10, 3, 'Ostatnia aktywność', 'now', NULL, 'clock', 'zinc', '2026-05-10 12:18:39', '2026-05-10 12:18:39'),
(11, 3, 'Śledzone ustawy', NULL, 0, 'documents', 'indigo', '2026-05-10 12:18:39', '2026-05-10 12:18:39'),
(12, 3, 'Rola', 'Użytkownik', NULL, 'achievements', 'purple', '2026-05-10 12:18:39', '2026-05-10 12:18:39'),
(13, 3, 'Oddane głosy', NULL, 0, 'vote', 'blue', '2026-05-10 12:18:39', '2026-05-10 12:18:39'),
(14, 3, 'Napisane Opinie', NULL, 0, 'comments', 'emerald', '2026-05-10 12:18:39', '2026-05-10 12:18:39'),
(15, 3, 'Ukończone kursy', NULL, 0, 'courses', 'purple', '2026-05-10 12:18:39', '2026-05-10 12:18:39'),
(16, 3, 'Punkty reputacji', NULL, 0, 'star', 'yellow', '2026-05-10 12:18:39', '2026-05-10 12:18:39');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `survey_id` int(11) DEFAULT NULL,
  `title` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `survey_id`, `title`) VALUES
(1, 1, 'Czy popierasz uproszczenie podatków?'),
(2, 1, 'Czy PIT powinien być liniowy?'),
(3, 1, 'Czy ulgi podatkowe powinny zostać ograniczone?'),
(4, 2, 'Czy e-usługi w Polsce są wystarczające?'),
(5, 2, 'Czy administracja powinna być w 100% cyfrowa?'),
(6, 2, 'Czy mObywatel spełnia swoje zadanie?'),
(7, 3, 'Czy transport publiczny jest wystarczająco rozwinięty?'),
(8, 3, 'Czy bilety powinny być darmowe?'),
(9, 3, 'Czy metro powinno powstać w Twoim regionie?'),
(10, 4, 'Czy szkoły są dobrze przygotowane do nauki cyfrowej?'),
(11, 4, 'Czy tablety powinny zastąpić podręczniki?'),
(12, 4, 'Czy programowanie powinno być obowiązkowe?');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `surveys`
--

CREATE TABLE `surveys` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `reward` int(11) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL,
  `description` varchar(100) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `deadline` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `surveys`
--

INSERT INTO `surveys` (`id`, `title`, `category`, `reward`, `time`, `description`, `status`, `deadline`) VALUES
(1, 'Reformy Podatkowe 2026', 'Ekonomia', 150, '5 min', 'Pytamy Polaków o możliwe zmiany podatkowe', 'active', '2026-05-01'),
(2, 'Oczekiwania wobec Ministra Cyfryzacji', 'Technologia', 100, '3 min', 'Oczekiwania wobec ministra Cyfryzacji.', 'active', '2026-05-31'),
(3, 'Transport publiczny w Polsce', 'Infrastruktura', 120, '4 min', 'Transport publiczny.', 'active', '2026-05-03'),
(4, 'Edukacja cyfrowa w szkołach', 'Edukacja', 200, '6 min', 'Reforma edukacji', 'active', '2026-05-01');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `survey_answers`
--

CREATE TABLE `survey_answers` (
  `id` int(11) NOT NULL,
  `survey_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `answers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`answers`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `survey_answers`
--

INSERT INTO `survey_answers` (`id`, `survey_id`, `user_id`, `answers`, `created_at`) VALUES
(98, 2, 2, '{\"4\":\"yes\",\"5\":\"yes\",\"6\":\"yes\"}', '2026-05-10 10:00:14');

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
(2, 'igorp', 'igor@wp.pl', '$2b$10$nGHb96MKg/ozPM/yBSl3iONFyrhrgyxpfePYt9oVyxON/AuTkqGI.', '2026-02-24 20:45:14'),
(3, 'IgorPedz', 'pedz@wp.pl', '$2b$10$L10qTJ1I9g3wQEnhIOwvfuJAmtu8Aj6wjZwj2clDfs41aZiYPUySK', '2026-05-10 12:18:39');

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
-- Dumping data for table `user_tiles`
--

INSERT INTO `user_tiles` (`id`, `user_id`, `tiles`) VALUES
(0, 2, '[{\"id\":\"200161b7-cf4a-4b9c-bdfa-3d0690e2ad7d\",\"type\":\"senatorowie\",\"name\":\"Senatorowie\",\"accent\":\"indigo\",\"icon\":\"user\",\"iconColor\":\"indigo\"},{\"id\":\"fbdd0a00-d519-4fe2-9c92-08eb131cbb78\",\"type\":\"rada\",\"name\":\"Rada Ministrów\",\"accent\":\"rose\",\"icon\":\"ministry\",\"iconColor\":\"rose\"},{\"id\":\"d6608a20-9327-4f9a-b860-2029053b782d\",\"type\":\"senat\",\"name\":\"Senat RP\",\"accent\":\"orange\",\"icon\":\"parliament\",\"iconColor\":\"orange\"}]');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `dashboard_content`
--
ALTER TABLE `dashboard_content`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indeksy dla tabeli `profile_stats`
--
ALTER TABLE `profile_stats`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `survey_id` (`survey_id`);

--
-- Indeksy dla tabeli `surveys`
--
ALTER TABLE `surveys`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `survey_answers`
--
ALTER TABLE `survey_answers`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

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
-- AUTO_INCREMENT for table `dashboard_content`
--
ALTER TABLE `dashboard_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `profile_stats`
--
ALTER TABLE `profile_stats`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `surveys`
--
ALTER TABLE `surveys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `survey_answers`
--
ALTER TABLE `survey_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_tiles`
--
ALTER TABLE `user_tiles`
  ADD CONSTRAINT `user_tiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
