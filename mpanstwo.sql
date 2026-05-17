-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Maj 17, 2026 at 06:29 PM
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
-- Struktura tabeli dla tabeli `achievements`
--

CREATE TABLE `achievements` (
  `id` bigint(20) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `category_id` bigint(20) NOT NULL,
  `xp_reward` int(11) DEFAULT 0,
  `metric_key` varchar(50) NOT NULL,
  `requirement_value` int(11) NOT NULL,
  `rarity` enum('common','rare','epic','legendary') DEFAULT 'common',
  `icon` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `active` tinyint(1) DEFAULT 1,
  `hidden` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `achievements`
--

INSERT INTO `achievements` (`id`, `slug`, `title`, `description`, `category_id`, `xp_reward`, `metric_key`, `requirement_value`, `rarity`, `icon`, `created_at`, `active`, `hidden`) VALUES
(44, 'survey_first', 'Pierwsza ankieta', 'Wypełnij pierwszą ankietę', 2, 10, 'survey_completed', 1, 'common', '📝', '2026-05-17 14:28:21', 1, 0),
(45, 'survey_5', 'Aktywny uczestnik', 'Wypełnij 5 ankiet', 2, 25, 'survey_completed', 5, 'common', '📊', '2026-05-17 14:28:21', 1, 0),
(46, 'survey_10', 'Głos społeczności', 'Wypełnij 10 ankiet', 2, 50, 'survey_completed', 10, 'rare', '📈', '2026-05-17 14:28:21', 1, 0),
(47, 'survey_25', 'Ekspert opinii', 'Wypełnij 25 ankiet', 2, 100, 'survey_completed', 25, 'epic', '🏆', '2026-05-17 14:28:21', 1, 0),
(48, 'survey_50', 'Legenda ankiet', 'Wypełnij 50 ankiet', 2, 200, 'survey_completed', 50, 'legendary', '👑', '2026-05-17 14:28:21', 1, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `achievement_categories`
--

CREATE TABLE `achievement_categories` (
  `id` bigint(20) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `achievement_categories`
--

INSERT INTO `achievement_categories` (`id`, `slug`, `name`) VALUES
(1, 'activity', 'Aktywność'),
(2, 'surveys', 'Ankiety'),
(3, 'opinions', 'Opinie'),
(4, 'marks', 'Oceny'),
(5, 'special', 'Specjalne');

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
  `icon` varchar(50) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `type`, `title`, `message`, `data`, `icon`, `is_read`, `created_at`) VALUES
(53, 2, 'SURVEY_COMPLETED', 'Ankieta zakończona', '+50 XP za ukończenie ankiety', 'null', NULL, 1, '2026-05-10 10:00:14'),
(55, 5, 'SURVEY_COMPLETED', 'Ankieta zakończona', '+50 XP za ukończenie ankiety', 'null', NULL, 1, '2026-05-14 20:44:46'),
(56, 6, 'SURVEY_COMPLETED', 'Ankieta zakończona', '+50 XP za ukończenie ankiety', 'null', NULL, 1, '2026-05-15 12:13:46'),
(146, 7, 'ACHIEVEMENT_UNLOCK', 'Osiągnięcie odblokowane', 'Zdobyto osiągniecię: Pierwsza ankieta', '{\"achievementId\":44,\"xp\":10}', 'achievement_unlock', 1, '2026-05-17 14:49:42'),
(147, 7, 'SURVEY_COMPLETED', 'Ankieta zakończona', 'Wypełniono ankiete', '{\"xp\":50,\"totalXP\":50}', 'survey_completed', 1, '2026-05-17 14:49:42'),
(148, 4, 'SURVEY_COMPLETED', 'Ankieta zakończona', 'Wypełniono ankiete', '{\"xp\":50,\"totalXP\":4980}', 'survey_completed', 1, '2026-05-17 15:33:23'),
(149, 4, 'SURVEY_COMPLETED', 'Ankieta zakończona', 'Wypełniono ankiete', '{\"xp\":50,\"totalXP\":5030}', 'survey_completed', 1, '2026-05-17 15:36:34'),
(150, 4, 'SURVEY_COMPLETED', 'Ankieta zakończona', 'Wypełniono ankiete', '{\"xp\":50,\"totalXP\":5080}', 'survey_completed', 1, '2026-05-17 16:27:47');

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
-- Struktura tabeli dla tabeli `ranks`
--

CREATE TABLE `ranks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `level` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `required_xp` int(11) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ranks`
--

INSERT INTO `ranks` (`id`, `level`, `name`, `required_xp`, `icon`, `color`, `created_at`) VALUES
(6, 1, 'Obywatel', 0, 'user', '#9CA3AF', '2026-05-17 13:17:07'),
(7, 2, 'Działacz Lokalny', 500, 'users', '#22C55E', '2026-05-17 13:17:07'),
(8, 3, 'Radny Społeczny', 1500, 'building', '#14B8A6', '2026-05-17 13:17:07'),
(9, 4, 'Analityk Sejmowy', 3000, 'bar-chart-3', '#3B82F6', '2026-05-17 13:17:07'),
(10, 5, 'Komisarz Obywatelski', 6000, 'shield', '#6366F1', '2026-05-17 13:17:07'),
(11, 6, 'Strażnik Demokracji', 10000, 'scale', '#8B5CF6', '2026-05-17 13:17:07'),
(12, 7, 'Ekspert Legislacyjny', 16000, 'scroll-text', '#A855F7', '2026-05-17 13:17:07'),
(13, 8, 'Obserwator Państwowy', 25000, 'eye', '#D946EF', '2026-05-17 13:17:07'),
(14, 9, 'Marszałek Debaty', 40000, 'crown', '#F59E0B', '2026-05-17 13:17:07'),
(15, 10, 'Architekt Demokracji', 65000, 'landmark', '#EF4444', '2026-05-17 13:17:07');

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
(1, 'Reformy Podatkowe 2026', 'Ekonomia', 50, '5 min', 'Pytamy Polaków o możliwe zmiany podatkowe', 'active', '2026-05-31'),
(2, 'Oczekiwania wobec Ministra Cyfryzacji', 'Technologia', 50, '3 min', 'Oczekiwania wobec ministra Cyfryzacji.', 'active', '2026-05-31'),
(3, 'Transport publiczny w Polsce', 'Infrastruktura', 50, '4 min', 'Transport publiczny.', 'active', '2026-05-21'),
(4, 'Edukacja cyfrowa w szkołach', 'Edukacja', 50, '6 min', 'Reforma edukacji', 'active', '2026-05-20');

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
(183, 1, 4, '{\"1\":\"yes\",\"2\":\"yes\",\"3\":\"yes\"}', '2026-05-17 14:29:10'),
(184, 1, 7, '{\"1\":\"yes\",\"2\":\"yes\",\"3\":\"yes\"}', '2026-05-17 14:49:42'),
(185, 2, 4, '{\"4\":\"yes\",\"5\":\"yes\",\"6\":\"yes\"}', '2026-05-17 15:33:23'),
(186, 3, 4, '{\"7\":\"yes\",\"8\":\"yes\",\"9\":\"yes\"}', '2026-05-17 15:36:34'),
(187, 4, 4, '{\"10\":\"yes\",\"11\":\"yes\",\"12\":\"yes\"}', '2026-05-17 16:27:47');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_strong` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_exp` bigint(20) DEFAULT NULL,
  `login_streak` int(11) DEFAULT 0,
  `last_login_date` date DEFAULT NULL,
  `active_days` int(11) DEFAULT 0,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `verification_code` varchar(255) DEFAULT NULL,
  `verification_expires` bigint(20) DEFAULT NULL,
  `last_streak_notified_date` date DEFAULT NULL,
  `xp` int(11) DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_strong`, `created_at`, `reset_token`, `reset_token_exp`, `login_streak`, `last_login_date`, `active_days`, `is_verified`, `verification_code`, `verification_expires`, `last_streak_notified_date`, `xp`, `level`) VALUES
(1, '', 'igorrpedziwilk@gmail.com', '$2b$10$KoKNM42i0rsw3C0F31thPuOMx4kiUi/zPY8NkS/HHKgl/aMiZ5uDa', 0, '2026-02-24 20:36:07', NULL, NULL, 1, '2026-05-14', 1, 0, NULL, NULL, NULL, 0, 1),
(2, 'qwe', 'igor@wp.pl', '$2b$10$nGHb96MKg/ozPM/yBSl3iONFyrhrgyxpfePYt9oVyxON/AuTkqGI.', 0, '2026-02-24 20:45:14', '56fb4d26-e893-4a29-a772-7529ac6ec39c', 20260514, 1, '2026-05-14', 1, 0, NULL, NULL, NULL, 0, 1),
(3, 'IgorPedz', 'pedz@wp.pl', '$2b$10$L10qTJ1I9g3wQEnhIOwvfuJAmtu8Aj6wjZwj2clDfs41aZiYPUySK', 0, '2026-05-10 12:18:39', NULL, NULL, 1, '2026-05-14', 1, 0, NULL, NULL, NULL, 0, 1),
(4, 'igor', 'qigorq@wp.pl', '$2b$10$P4AlEULBNpKLfexNz/DqD.A4GsKn74S27bYX5jh9tLxTiJH2OaPQy', 1, '2026-05-14 18:56:00', NULL, NULL, 9, '2026-05-17', 17, 1, NULL, NULL, '2026-05-17', 5080, 3),
(5, 'test', 'test@wp.pl', '$2b$10$QGBop034Lo4eRK5mtynH0O.aauocBwppzn6YnuR/8CHnZ12SR4olO', 0, '2026-05-14 20:34:46', NULL, NULL, 1, '2026-05-14', 1, 0, NULL, NULL, NULL, 0, 1),
(6, 'testowekonto', 'testtest@wp.pl', '$2b$10$OCUhJzWMZVnWlR3vTIaM8uv4joGWMUJkZG44IVTHlfkD/Zv72Jh66', 0, '2026-05-15 12:12:30', NULL, NULL, 1, '2026-05-15', 1, 0, NULL, NULL, NULL, 0, 1),
(7, 'igorpedzi', 'pedziwilk@gmail.com', '$2b$10$5jqt3ellaNs2D5bmibQ9X.62s9kfLf1br780mOJVBtMqDLhI.E2..', 1, '2026-05-17 14:49:27', NULL, NULL, 1, '2026-05-17', 1, 0, NULL, NULL, '2026-05-17', 60, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_achievements`
--

CREATE TABLE `user_achievements` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `achievement_id` bigint(20) NOT NULL,
  `progress` int(11) DEFAULT 0,
  `unlocked` tinyint(1) DEFAULT 0,
  `unlocked_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_achievements`
--

INSERT INTO `user_achievements` (`id`, `user_id`, `achievement_id`, `progress`, `unlocked`, `unlocked_at`, `created_at`) VALUES
(159, 4, 44, 1, 1, '2026-05-17 16:14:44', '2026-05-17 16:14:44'),
(160, 4, 45, 5, 1, '2026-05-17 16:29:10', '2026-05-17 16:14:44'),
(161, 4, 46, 8, 0, NULL, '2026-05-17 16:14:44'),
(162, 4, 47, 8, 0, NULL, '2026-05-17 16:14:44'),
(163, 4, 48, 8, 0, NULL, '2026-05-17 16:14:44'),
(180, 7, 44, 1, 1, '2026-05-17 16:49:42', '2026-05-17 16:49:42'),
(181, 7, 45, 1, 0, NULL, '2026-05-17 16:49:42'),
(182, 7, 46, 1, 0, NULL, '2026-05-17 16:49:42'),
(183, 7, 47, 1, 0, NULL, '2026-05-17 16:49:42'),
(184, 7, 48, 1, 0, NULL, '2026-05-17 16:49:42');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_activity`
--

CREATE TABLE `user_activity` (
  `user_id` int(11) NOT NULL,
  `activity_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_metrics`
--

CREATE TABLE `user_metrics` (
  `user_id` int(11) NOT NULL,
  `xp` int(11) DEFAULT 0,
  `votes_count` int(11) DEFAULT 0,
  `survey_completed` int(11) DEFAULT 0,
  `opinions_written` int(11) DEFAULT 0,
  `courses_completed` int(11) DEFAULT 0,
  `login_streak` int(11) DEFAULT 0,
  `max_login_streak` int(11) DEFAULT 0,
  `tracked_laws_count` int(11) DEFAULT 0,
  `comments_count` int(11) DEFAULT 0,
  `likes_received` int(11) DEFAULT 0,
  `achievements_unlocked` int(11) DEFAULT 0,
  `created_surveys` int(11) DEFAULT 0,
  `reputation` int(11) DEFAULT 0,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_metrics`
--

INSERT INTO `user_metrics` (`user_id`, `xp`, `votes_count`, `survey_completed`, `opinions_written`, `courses_completed`, `login_streak`, `max_login_streak`, `tracked_laws_count`, `comments_count`, `likes_received`, `achievements_unlocked`, `created_surveys`, `reputation`, `updated_at`) VALUES
(4, 50, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2026-05-17 18:27:47'),
(7, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2026-05-17 16:49:42');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_stats`
--

CREATE TABLE `user_stats` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `key` varchar(50) NOT NULL,
  `value_number` int(11) DEFAULT NULL,
  `value_text` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_stats`
--

INSERT INTO `user_stats` (`id`, `user_id`, `key`, `value_number`, `value_text`) VALUES
(1, 4, 'votes', 213, NULL),
(2, 4, 'courses', 6, NULL),
(4, 4, 'role', NULL, 'Użytkownik'),
(6, 4, 'opinions', 10, NULL),
(8, 5, 'role', NULL, 'Użytkownik'),
(9, 5, 'votes', 1, NULL),
(10, 5, 'opinions', 0, NULL),
(11, 5, 'courses', 0, NULL),
(15, 6, 'role', NULL, 'Użytkownik'),
(16, 6, 'votes', 1, NULL),
(17, 6, 'opinions', 0, NULL),
(18, 6, 'courses', 0, NULL),
(103, 7, 'trackedLaws', 0, NULL),
(104, 7, 'role', NULL, 'Użytkownik'),
(105, 7, 'votes', 1, NULL),
(106, 7, 'opinions', 0, NULL),
(107, 7, 'courses', 0, NULL);

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
(0, 4, '[{\"id\":\"9050c1bc-ca5d-41ba-ab56-ee62065730ef\",\"type\":\"zdrowie\",\"name\":\"Ministerstwo Zdrowia\",\"accent\":\"red-gradient\",\"icon\":\"heart\",\"iconColor\":\"red-gradient\"},{\"id\":\"c8ce28b9-9fef-463c-853b-fbc7bfd76e90\",\"type\":\"obrona\",\"name\":\"Ministerstwo Obrony Narodowej\",\"accent\":\"cyan\",\"icon\":\"shield\",\"iconColor\":\"cyan\"},{\"id\":\"ccf220b8-61f2-4cf0-8317-067c14722866\",\"type\":\"sprawiedliwosc\",\"name\":\"Ministerstwo Sprawiedliwości\",\"accent\":\"purple-gradient\",\"icon\":\"scale\",\"iconColor\":\"purple-gradient\"}]'),
(1, 6, '[]'),
(2, 5, '[{\"id\":\"bed47375-71d2-4fae-b705-67a2d2cfbe52\",\"type\":\"senatorowie\",\"name\":\"Senatorowie\",\"accent\":\"indigo\",\"icon\":\"user\",\"iconColor\":\"indigo\"},{\"id\":\"e247bbb8-086a-49c7-9dfb-2a1a82822717\",\"type\":\"rada\",\"name\":\"Rada Ministrów\",\"accent\":\"rose\",\"icon\":\"ministry\",\"iconColor\":\"rose\"},{\"id\":\"45350418-3aff-499a-970e-2c9efbb79dcd\",\"type\":\"uokik\",\"name\":\"UOKiK\",\"accent\":\"pink\",\"icon\":\"banknotes\",\"iconColor\":\"pink\"},{\"id\":\"f5fada37-f4b0-49e4-b2a2-baf2b883f408\",\"type\":\"prezydent\",\"name\":\"Prezydent RP\",\"accent\":\"red\",\"icon\":\"flag\",\"iconColor\":\"red\"},{\"id\":\"88a950a9-e9df-4537-89e6-4eab9b339ab8\",\"type\":\"senat\",\"name\":\"Senat RP\",\"accent\":\"orange\",\"icon\":\"parliament\",\"iconColor\":\"orange\"},{\"id\":\"3ea6f6b3-5bbc-4406-89c4-48dbec122b7e\",\"type\":\"poslowie\",\"name\":\"Posłowie\",\"accent\":\"blue\",\"icon\":\"userGroup\",\"iconColor\":\"blue\"}]'),
(3, 3, '[{\"id\":\"5b69f735-23c1-4505-bf6d-650e824a934f\",\"type\":\"senatorowie\",\"name\":\"Senatorowie\",\"accent\":\"indigo\",\"icon\":\"user\",\"iconColor\":\"indigo\"}]');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `xp_logs`
--

CREATE TABLE `xp_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `xp_logs`
--

INSERT INTO `xp_logs` (`id`, `user_id`, `amount`, `reason`, `created_at`) VALUES
(1, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:08:58'),
(2, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:14:00'),
(3, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:15:45'),
(4, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:15:50'),
(5, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:17:28'),
(6, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:19:59'),
(7, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:21:25'),
(8, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:24:04'),
(9, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:25:06'),
(10, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:29:24'),
(11, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:31:32'),
(12, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:32:56'),
(13, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:34:03'),
(14, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:35:20'),
(15, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:36:15'),
(16, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:36:49'),
(17, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:38:25'),
(18, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:39:06'),
(19, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:39:35'),
(20, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:46:26'),
(21, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:47:08'),
(22, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:47:11'),
(23, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:47:13'),
(24, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:47:21'),
(25, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:49:18'),
(26, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:58:32'),
(27, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 14:59:45'),
(28, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:00:47'),
(29, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:06:13'),
(30, 4, 10, 'ACHIEVEMENT', '2026-05-17 15:06:13'),
(31, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:10:28'),
(32, 4, 10, 'ACHIEVEMENT', '2026-05-17 15:10:28'),
(33, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:12:30'),
(34, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:12:38'),
(35, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:12:54'),
(36, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:13:30'),
(37, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:15:47'),
(38, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:15:49'),
(39, 4, 10, 'ACHIEVEMENT', '2026-05-17 15:15:49'),
(40, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:15:51'),
(41, 4, 10, 'ACHIEVEMENT', '2026-05-17 15:15:51'),
(42, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:15:53'),
(43, 4, 10, 'ACHIEVEMENT', '2026-05-17 15:15:53'),
(44, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:17:25'),
(45, 4, 10, 'ACHIEVEMENT', '2026-05-17 15:17:25'),
(46, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:17:42'),
(47, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:17:52'),
(48, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:17:53'),
(49, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:18:12'),
(50, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:19:00'),
(51, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:19:51'),
(52, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:20:36'),
(53, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:20:45'),
(54, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:20:57'),
(55, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:21:32'),
(56, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:21:34'),
(57, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:21:36'),
(58, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:21:47'),
(59, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:21:49'),
(60, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:24:42'),
(61, 4, 10, 'ACHIEVEMENT', '2026-05-17 15:24:42'),
(62, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:24:53'),
(63, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:46:00'),
(64, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:48:32'),
(65, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 15:52:26'),
(66, 4, 25, 'ACHIEVEMENT', '2026-05-17 15:52:26'),
(67, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 16:03:41'),
(68, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 16:09:55'),
(69, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 16:12:28'),
(70, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 16:13:07'),
(71, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 16:13:23'),
(72, 4, 50, 'ACHIEVEMENT', '2026-05-17 16:13:23'),
(73, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 16:14:44'),
(74, 4, 10, 'ACHIEVEMENT', '2026-05-17 16:14:44'),
(75, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 16:26:09'),
(76, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 16:26:44'),
(77, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 16:27:22'),
(78, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 16:29:10'),
(79, 4, 25, 'ACHIEVEMENT', '2026-05-17 16:29:10'),
(80, 7, 50, 'SURVEY_COMPLETED', '2026-05-17 16:49:42'),
(81, 7, 10, 'ACHIEVEMENT', '2026-05-17 16:49:42'),
(82, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 17:33:23'),
(83, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 17:36:34'),
(84, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 18:27:47');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `category_id` (`category_id`);

--
-- Indeksy dla tabeli `achievement_categories`
--
ALTER TABLE `achievement_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

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
-- Indeksy dla tabeli `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `survey_id` (`survey_id`);

--
-- Indeksy dla tabeli `ranks`
--
ALTER TABLE `ranks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `level` (`level`);

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
-- Indeksy dla tabeli `user_achievements`
--
ALTER TABLE `user_achievements`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`achievement_id`),
  ADD KEY `achievement_id` (`achievement_id`);

--
-- Indeksy dla tabeli `user_activity`
--
ALTER TABLE `user_activity`
  ADD PRIMARY KEY (`user_id`,`activity_date`);

--
-- Indeksy dla tabeli `user_metrics`
--
ALTER TABLE `user_metrics`
  ADD PRIMARY KEY (`user_id`);

--
-- Indeksy dla tabeli `user_stats`
--
ALTER TABLE `user_stats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_key` (`user_id`,`key`);

--
-- Indeksy dla tabeli `user_tiles`
--
ALTER TABLE `user_tiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id_2` (`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `xp_logs`
--
ALTER TABLE `xp_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_xp_user` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achievements`
--
ALTER TABLE `achievements`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `achievement_categories`
--
ALTER TABLE `achievement_categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `dashboard_content`
--
ALTER TABLE `dashboard_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `ranks`
--
ALTER TABLE `ranks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `surveys`
--
ALTER TABLE `surveys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `survey_answers`
--
ALTER TABLE `survey_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=188;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_achievements`
--
ALTER TABLE `user_achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;

--
-- AUTO_INCREMENT for table `user_stats`
--
ALTER TABLE `user_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `xp_logs`
--
ALTER TABLE `xp_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `achievements`
--
ALTER TABLE `achievements`
  ADD CONSTRAINT `achievements_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `achievement_categories` (`id`);

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
-- Constraints for table `user_achievements`
--
ALTER TABLE `user_achievements`
  ADD CONSTRAINT `user_achievements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_achievements_ibfk_2` FOREIGN KEY (`achievement_id`) REFERENCES `achievements` (`id`);

--
-- Constraints for table `user_activity`
--
ALTER TABLE `user_activity`
  ADD CONSTRAINT `user_activity_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_metrics`
--
ALTER TABLE `user_metrics`
  ADD CONSTRAINT `fk_user_metrics_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_tiles`
--
ALTER TABLE `user_tiles`
  ADD CONSTRAINT `user_tiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `xp_logs`
--
ALTER TABLE `xp_logs`
  ADD CONSTRAINT `fk_xp_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
