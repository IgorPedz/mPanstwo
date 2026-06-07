-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Cze 07, 2026 at 07:12 PM
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
  `category_id` bigint(20) NOT NULL,
  `xp_reward` int(11) DEFAULT 0,
  `metric_key` varchar(50) NOT NULL,
  `metric_source` varchar(50) NOT NULL,
  `requirement_value` int(11) NOT NULL,
  `rarity` enum('common','rare','epic','legendary') DEFAULT 'common',
  `created_at` datetime DEFAULT current_timestamp(),
  `active` tinyint(1) DEFAULT 1,
  `hidden` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `achievements`
--

INSERT INTO `achievements` (`id`, `slug`, `category_id`, `xp_reward`, `metric_key`, `metric_source`, `requirement_value`, `rarity`, `created_at`, `active`, `hidden`) VALUES
(44, 'survey_first', 2, 25, 'survey_completed', 'users_metrics', 1, 'common', '2026-05-17 14:28:21', 1, 0),
(45, 'survey_5', 2, 50, 'survey_completed', 'users_metrics', 5, 'common', '2026-05-17 14:28:21', 1, 0),
(46, 'survey_10', 2, 100, 'survey_completed', 'users_metrics', 10, 'rare', '2026-05-17 14:28:21', 1, 0),
(47, 'survey_25', 2, 150, 'survey_completed', 'users_metrics', 25, 'epic', '2026-05-17 14:28:21', 1, 0),
(48, 'survey_50', 2, 500, 'survey_completed', 'users_metrics', 50, 'legendary', '2026-05-17 14:28:21', 1, 0),
(49, 'xp_100', 1, 10, 'xp', 'users', 100, 'common', '2026-05-18 18:21:36', 1, 0),
(50, 'xp_1000', 1, 50, 'xp', 'users', 1000, 'rare', '2026-05-18 18:21:36', 1, 0),
(51, 'xp_5000', 1, 100, 'xp', 'users', 5000, 'epic', '2026-05-18 18:21:36', 1, 0),
(52, 'login_3', 1, 25, 'login_streak', 'users', 3, 'common', '2026-05-18 18:20:40', 1, 0),
(53, 'login_7', 1, 50, 'login_streak', 'users', 7, 'rare', '2026-05-18 18:20:40', 1, 0),
(54, 'login_14', 1, 120, 'login_streak', 'users', 14, 'epic', '2026-05-18 18:20:40', 1, 0),
(55, 'login_30', 1, 250, 'login_streak', 'users', 30, 'legendary', '2026-05-18 18:27:38', 1, 0),
(60, 'active_1', 1, 10, 'active_days', 'users', 1, 'common', '2026-05-18 18:30:47', 1, 0),
(61, 'active_7', 1, 50, 'active_days', 'users', 7, 'common', '2026-05-18 18:30:47', 1, 0),
(62, 'active_14', 1, 100, 'active_days', 'users', 14, 'rare', '2026-05-18 18:30:47', 1, 0),
(63, 'active_30', 1, 300, 'active_days', 'users', 30, 'rare', '2026-05-18 18:30:47', 1, 0),
(64, 'active_60', 1, 700, 'active_days', 'users', 60, 'rare', '2026-05-18 18:30:47', 1, 0),
(65, 'active_100', 1, 1000, 'active_days', 'users', 100, 'epic', '2026-05-18 18:30:47', 1, 0),
(66, 'active_180', 1, 2500, 'active_days', 'users', 180, 'epic', '2026-05-18 18:30:47', 1, 0),
(67, 'active_365', 1, 5000, 'active_days', 'users', 365, 'legendary', '2026-05-18 18:30:47', 1, 0),
(70, 'mp_rated_1', 4, 15, 'mps_rated', 'users_metrics', 1, 'common', '2026-06-03 18:10:26', 1, 0),
(71, 'mp_rated_10', 4, 75, 'mps_rated', 'users_metrics', 10, 'rare', '2026-06-03 18:10:26', 1, 0),
(72, 'mp_rated_100', 4, 300, 'mps_rated', 'users_metrics', 100, 'epic', '2026-06-03 18:10:26', 1, 0),
(73, 'mp_rated_all', 4, 1000, 'mps_rated', 'users_metrics', 460, 'legendary', '2026-06-03 18:10:26', 1, 0),
(74, 'club_rated_ko', 4, 2000, 'club_rated_ko', 'users_metrics', 156, 'legendary', '2026-06-03 18:16:07', 1, 0),
(75, 'club_rated_lewica', 4, 300, 'club_rated_lewica', 'users_metrics', 21, 'rare', '2026-06-03 18:16:07', 1, 0),
(76, 'club_rated_razem', 4, 100, 'club_rated_razem', 'users_metrics', 4, 'common', '2026-06-03 18:16:07', 1, 0),
(77, 'club_rated_psl_td', 4, 300, 'club_rated_psl_td', 'users_metrics', 32, 'rare', '2026-06-03 18:16:07', 1, 0),
(78, 'club_rated_polska2050', 4, 100, 'club_rated_polska2050', 'users_metrics', 15, 'common', '2026-06-03 18:16:07', 1, 0),
(79, 'club_rated_pis', 4, 2000, 'club_rated_pis', 'users_metrics', 186, 'legendary', '2026-06-03 18:16:07', 1, 0),
(80, 'club_rated_konfederacja', 4, 100, 'club_rated_konfederacja', 'users_metrics', 16, 'common', '2026-06-03 18:16:07', 1, 0),
(81, 'club_rated_konfederacja_kp', 4, 100, 'club_rated_konfederacja_kp', 'users_metrics', 3, 'common', '2026-06-03 18:16:07', 1, 0),
(82, 'club_rated_centrum', 4, 100, 'club_rated_centrum', 'users_metrics', 15, 'common', '2026-06-03 18:16:07', 1, 0),
(83, 'club_rated_demokracja', 4, 100, 'club_rated_demokracja', 'users_metrics', 4, 'common', '2026-06-03 18:16:07', 1, 0),
(84, 'clubs_all_rated', 4, 500, 'clubs_rated_count', 'users_metrics', 10, 'epic', '2026-06-03 18:16:07', 1, 0),
(85, 'coalition_all_rated', 4, 3000, 'coalition_rated', 'users_metrics', 239, 'legendary', '2026-06-03 18:21:55', 1, 0),
(86, 'opposition_all_rated', 4, 3000, 'opposition_rated', 'users_metrics', 221, 'legendary', '2026-06-03 18:21:55', 1, 0),
(101, 'module_1', 3, 10, 'modules_completed', 'users_metrics', 1, 'common', '2026-05-31 14:33:21', 1, 0),
(102, 'module_10', 3, 50, 'modules_completed', 'users_metrics', 10, 'common', '2026-05-31 14:33:21', 1, 0),
(103, 'module_50', 3, 150, 'modules_completed', 'users_metrics', 50, 'rare', '2026-05-31 14:33:21', 1, 0),
(104, 'module_master', 3, 300, 'modules_completed', 'users_metrics', 100, 'epic', '2026-05-31 14:33:21', 1, 0),
(110, 'course_1', 3, 50, 'courses_completed', 'users_metrics', 1, 'common', '2026-05-31 14:33:21', 1, 0),
(111, 'course_3', 3, 150, 'courses_completed', 'users_metrics', 3, 'rare', '2026-05-31 14:33:21', 1, 0),
(112, 'course_10', 3, 500, 'courses_completed', 'users_metrics', 10, 'epic', '2026-05-31 14:33:21', 1, 0),
(120, 'lesson_1', 3, 5, 'lessons_completed', 'users_metrics', 1, 'common', '2026-05-31 14:33:21', 1, 0),
(121, 'lesson_25', 3, 30, 'lessons_completed', 'users_metrics', 25, 'common', '2026-05-31 14:33:21', 1, 0),
(122, 'lesson_100', 3, 120, 'lessons_completed', 'users_metrics', 100, 'rare', '2026-05-31 14:33:21', 1, 0),
(123, 'opinions_1', 5, 50, 'opinions_written', 'user_metrics', 1, 'common', '2026-06-03 20:18:59', 1, 0),
(124, 'opinions_10', 5, 150, 'opinions_written', 'user_metrics', 10, 'common', '2026-06-03 20:23:58', 1, 0),
(125, 'opinions_25', 5, 200, 'opinions_written', 'user_metrics', 25, 'rare', '2026-06-03 20:24:15', 1, 0),
(126, 'opinions_50', 5, 300, 'opinions_written', 'user_metrics', 50, 'epic', '2026-06-03 20:24:38', 1, 0),
(127, 'opinions_100', 5, 450, 'opinions_written', 'user_metrics', 100, 'epic', '2026-06-03 20:24:58', 1, 0),
(130, 'opinion_endorsed_1', 5, 75, 'opinions_endorsed', 'user_metrics', 1, 'rare', '2026-06-07 18:03:03', 1, 0),
(131, 'opinion_endorsed_3', 5, 150, 'opinions_endorsed', 'user_metrics', 3, 'rare', '2026-06-07 18:03:03', 1, 0),
(132, 'opinion_endorsed_5', 5, 300, 'opinions_endorsed', 'user_metrics', 5, 'epic', '2026-06-07 18:03:03', 1, 0),
(133, 'opinion_endorsed_10', 5, 600, 'opinions_endorsed', 'user_metrics', 10, 'legendary', '2026-06-07 18:03:03', 1, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `achievement_categories`
--

CREATE TABLE `achievement_categories` (
  `id` bigint(20) NOT NULL,
  `slug` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `achievement_categories`
--

INSERT INTO `achievement_categories` (`id`, `slug`) VALUES
(1, 'activity'),
(3, 'courses'),
(4, 'marks'),
(5, 'opinions'),
(2, 'surveys');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ban_appeals`
--

CREATE TABLE `ban_appeals` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reason` varchar(1000) NOT NULL,
  `admin_response` varchar(1000) DEFAULT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `reviewed_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ban_appeals`
--

INSERT INTO `ban_appeals` (`id`, `user_id`, `reason`, `admin_response`, `status`, `created_at`, `reviewed_at`, `reviewed_by`) VALUES
(1, 2, 'rwqeqweqweqweqweqweqweqwe', NULL, 'approved', '2026-06-07 15:46:26', '2026-06-07 15:46:49', 4),
(2, 2, 'q3rew', NULL, 'approved', '2026-06-07 16:29:20', '2026-06-07 16:29:42', 4);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `img` varchar(25) NOT NULL,
  `estimated_hours` int(11) DEFAULT 0,
  `is_published` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `slug`, `img`, `estimated_hours`, `is_published`, `created_at`) VALUES
(1, 'parlamentary_course', 'sejmRP.jpg', 4, 1, '2026-05-29 15:33:49'),
(2, 'executive_course', 'KPRM.jpg', 3, 1, '2026-05-30 16:05:44'),
(3, 'court_course', 'sadRP.jpeg', 2, 1, '2026-05-30 16:05:44');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dashboard_content`
--

CREATE TABLE `dashboard_content` (
  `id` int(11) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `accent` varchar(100) NOT NULL,
  `icon` varchar(100) NOT NULL,
  `iconColor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dashboard_content`
--

INSERT INTO `dashboard_content` (`id`, `slug`, `accent`, `icon`, `iconColor`) VALUES
(1, 'members_of_parliament', 'blue', 'userGroup', 'blue'),
(2, 'senators', 'indigo', 'user', 'indigo'),
(3, 'parliamentary_clubs', 'purple', 'scale', 'purple'),
(4, 'sejm', 'emerald', 'parliament', 'emerald'),
(5, 'senate', 'orange', 'parliament', 'orange'),
(6, 'council_of_ministers', 'rose', 'ministry', 'rose'),
(8, 'presidential_chancellery', 'teal', 'briefcase', 'teal'),
(9, 'president', 'red', 'flag', 'red'),
(10, 'sn', 'pink', 'documents', 'pink'),
(11, 'constitutional_tribunal', 'yellow', 'courses', 'yellow'),
(12, 'supreme_administrative_court', 'cyan', 'ministry', 'cyan'),
(13, 'national_council_of_the_judiciary', 'teal', 'ministry', 'teal'),
(14, 'ministry_of_finance', 'emerald-gradient', 'banknotes', 'emerald-gradient'),
(15, 'ministry_of_health', 'red-gradient', 'heart', 'red-gradient'),
(16, 'ministry_of_national_defence', 'cyan', 'shield', 'cyan'),
(17, 'ministry_of_justice', 'purple-gradient', 'scale', 'purple-gradient'),
(18, 'ministry_of_foreign_affairs', 'sky-gradient', 'globe', 'sky-gradient'),
(19, 'ministry_of_infrastructure', 'orange-gradient', 'truck', 'orange-gradient'),
(20, 'ministry_of_agriculture', 'lime-gradient', 'tractor', 'lime-gradient'),
(21, 'ministry_of_climate_and_environment', 'emerald-gradient', 'leaf', 'emerald-gradient'),
(22, 'ministry_of_state_assets', 'amber-gradient', 'factory', 'amber-gradient'),
(23, 'ministry_of_culture_and_national_heritage', 'pink-gradient', 'paintbrush', 'pink-gradient'),
(24, 'ministry_of_sport_and_tourism', 'cyan-gradient', 'trophy', 'cyan-gradient'),
(25, 'ministry_of_family_labour_and_social_policy', 'rose-gradient', 'users', 'rose-gradient'),
(26, 'ministry_of_energy', 'yellow', 'lighting', 'yellow'),
(27, 'ministry_of_education', 'emerald', 'courses', 'emerald'),
(28, 'ministry_of_funds_and_regional_policy', 'pink', 'euro', 'pink'),
(29, 'ministry_of_science_and_higher_education', 'lime-gradient', 'courses', 'lime-gradient'),
(30, 'ministry_of_internal_affairs_and_administration', 'cyan-gradient', 'tablet', 'cyan-gradient'),
(31, 'ministry_of_digital_affairs', 'amber-gradient', 'computer', 'amber-gradient'),
(32, 'chancellery_of_the_prime_minister', 'rose-gradient', 'briefcase', 'rose-gradient');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `institution_follows`
--

CREATE TABLE `institution_follows` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `institution_id` varchar(100) NOT NULL,
  `institution_title` varchar(255) NOT NULL,
  `institution_type` varchar(50) NOT NULL DEFAULT 'ministry',
  `icon` varchar(100) DEFAULT NULL,
  `accent` varchar(50) DEFAULT NULL,
  `path` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_notified_url` varchar(1000) DEFAULT NULL,
  `institution_title_key` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `institution_follows`
--

INSERT INTO `institution_follows` (`id`, `user_id`, `institution_id`, `institution_title`, `institution_type`, `icon`, `accent`, `path`, `created_at`, `last_notified_url`, `institution_title_key`) VALUES
(31, 4, 'council_of_ministers', 'Rada Ministrów', 'ministry', 'ministry', 'rose', '/ministry/council_of_ministers', '2026-06-07 12:49:47', 'https://www.gov.pl/web/premier/projekt-ustawy-o-zmianie-ustawy-o-nabywaniu-nieruchomosci-przez-cudzoziemcow-oraz-ustawy--prawo-o-notariacie2', 'dashboard.dashboardContent.council_of_ministers.title'),
(32, 4, 'constitutional_tribunal', 'Trybunał Konstytucyjny', 'ministry', 'scale', 'purple', '/courts/constitutional_tribunal', '2026-06-07 12:50:30', 'https://trybunal.gov.pl/postepowanie-i-orzeczenia/wyroki/art/tryb-uchwalenia-ustawy-27', 'staticData.judicial.constitutional_tribunal.type'),
(33, 4, 'ministry_of_national_defence', 'Ministerstwo Obrony Narodowej', 'ministry', 'shield', 'cyan', '/ministry/ministry_of_national_defence', '2026-06-07 12:50:45', 'https://www.gov.pl/web/obrona-narodowa/wyznaczenia-na-nowe-stanowiska-sluzbowe3', 'dashboard.dashboardContent.ministry_of_national_defence.title'),
(34, 4, 'ministry_of_energy', 'Ministerstwo Energii', 'ministry', 'lighting', 'yellow', '/ministry/ministry_of_energy', '2026-06-07 12:50:53', 'https://www.gov.pl/web/energia/maksymalna-cena-detaliczna-paliw-obowiazujaca-w-dniach-6-8-czerwca-2026-r', 'dashboard.dashboardContent.ministry_of_energy.title'),
(35, 4, 'ministry_of_finance', 'Ministerstwo Finansów i Gospodarki', 'ministry', 'banknotes', 'emerald-gradient', '/ministry/ministry_of_finance', '2026-06-07 12:55:18', 'https://www.gov.pl/web/finanse/zapraszamy-na-konsultacje-dotyczace-zmian-w-ksef', 'dashboard.dashboardContent.ministry_of_finance.title');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `institution_news_cache`
--

CREATE TABLE `institution_news_cache` (
  `institution_id` varchar(100) NOT NULL,
  `institution_type` varchar(50) NOT NULL DEFAULT 'ministry',
  `last_news_title` varchar(500) DEFAULT NULL,
  `last_news_url` varchar(1000) DEFAULT NULL,
  `checked_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `institution_news_cache`
--

INSERT INTO `institution_news_cache` (`institution_id`, `institution_type`, `last_news_title`, `last_news_url`, `checked_at`) VALUES
('council_of_ministers', 'ministry', 'Projekt ustawy o zmianie ustawy o nabywaniu nieruchomości przez cudzoziemców oraz ustawy - Prawo o notariacie', 'https://www.gov.pl/web/premier/projekt-ustawy-o-zmianie-ustawy-o-nabywaniu-nieruchomosci-przez-cudzoziemcow-oraz-ustawy--prawo-o-notariacie2', '2026-06-07 15:00:00'),
('ministry_of_energy', 'ministry', 'Maksymalna cena detaliczna paliw obowiązująca w dniach 6-8 czerwca 2026 r.', 'https://www.gov.pl/web/energia/maksymalna-cena-detaliczna-paliw-obowiazujaca-w-dniach-6-8-czerwca-2026-r', '2026-06-07 15:00:00'),
('ministry_of_finance', 'ministry', 'Zapraszamy na konsultacje dotyczące zmian w KSeF', 'https://www.gov.pl/web/finanse/zapraszamy-na-konsultacje-dotyczace-zmian-w-ksef', '2026-06-07 15:00:00'),
('ministry_of_national_defence', 'ministry', 'Wyznaczenia na nowe stanowiska służbowe', 'https://www.gov.pl/web/obrona-narodowa/wyznaczenia-na-nowe-stanowiska-sluzbowe3', '2026-06-07 15:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `legislation_opinions`
--

CREATE TABLE `legislation_opinions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `print_num` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `endorsed_by` int(11) DEFAULT NULL,
  `endorsed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `legislation_opinions`
--

INSERT INTO `legislation_opinions` (`id`, `user_id`, `print_num`, `content`, `created_at`, `endorsed_by`, `endorsed_at`) VALUES
(7, 4, '2529', 'rtge', '2026-06-07 15:35:13', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `slug` varchar(10) NOT NULL,
  `order_index` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `course_id`, `slug`, `order_index`) VALUES
(1, 1, 'l1', 1),
(2, 1, 'l2', 2),
(3, 1, 'l3', 3),
(4, 1, 'l4', 4),
(5, 1, 'l5', 5),
(6, 1, 'l6', 6),
(7, 1, 'l7', 7),
(8, 1, 'l8', 8),
(9, 1, 'l9', 9),
(10, 1, 'l10', 10),
(11, 1, 'l11', 11),
(12, 1, 'l12', 12),
(13, 2, 'l1', 1),
(14, 2, 'l2', 2),
(15, 2, 'l3', 3),
(16, 2, 'l4', 4),
(17, 2, 'l5', 5),
(18, 2, 'l6', 6),
(19, 2, 'l7', 7),
(20, 2, 'l8', 8),
(21, 2, 'l9', 9),
(22, 2, 'l10', 10),
(23, 2, 'l11', 11),
(24, 2, 'l12', 12),
(25, 3, 'l1', 1),
(26, 3, 'l2', 2),
(27, 3, 'l3', 3),
(28, 3, 'l4', 4),
(29, 3, 'l5', 5),
(30, 3, 'l6', 6),
(31, 3, 'l7', 7),
(32, 3, 'l8', 8),
(33, 3, 'l9', 9),
(34, 3, 'l10', 10),
(35, 3, 'l11', 11),
(36, 3, 'l12', 12);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lesson_quizzes`
--

CREATE TABLE `lesson_quizzes` (
  `id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`answers`)),
  `correct_index` int(11) NOT NULL,
  `order_index` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lesson_quizzes`
--

INSERT INTO `lesson_quizzes` (`id`, `lesson_id`, `question`, `answers`, `correct_index`, `order_index`) VALUES
(44, 1, 'Czym jest władza ustawodawcza?', '[\"Tworzenie prawa\",\"Wykonywanie prawa\",\"Sądzenie\",\"Dowodzenie armią\"]', 0, 1),
(45, 1, 'Kto sprawuje władzę ustawodawczą w Polsce?', '[\"Sejm i Senat\",\"Rząd\",\"Prezydent\",\"Sądy\"]', 0, 2),
(46, 1, 'Główna funkcja parlamentu to:', '[\"Tworzenie prawa\",\"Wykonywanie prawa\",\"Sądzenie\",\"Administracja\"]', 0, 3),
(47, 2, 'Czym jest Sejm?', '[\"Izba niższa parlamentu\",\"Sąd\",\"Rząd\",\"Prezydent\"]', 0, 1),
(48, 2, 'Ilu posłów liczy Sejm?', '[\"100\",\"230\",\"460\",\"560\"]', 2, 2),
(49, 2, 'Sejm uchwala:', '[\"ustawy\",\"wyroki\",\"dekrety\",\"rozkazy\"]', 0, 3),
(50, 3, 'Czym jest Senat?', '[\"Izba wyższa parlamentu\",\"Rząd\",\"Sąd\",\"Policja\"]', 0, 1),
(51, 3, 'Ilu senatorów jest w Polsce?', '[\"100\",\"230\",\"460\",\"560\"]', 0, 2),
(52, 3, 'Senat:', '[\"rozpatruje ustawy\",\"wykonuje prawo\",\"sądzi\",\"tworzy rząd\"]', 0, 3),
(53, 4, 'Posłowie i senatorowie tworzą:', '[\"Parlament\",\"Rząd\",\"Sąd\",\"Policję\"]', 0, 1),
(54, 4, 'Mandat posła oznacza:', '[\"prawo do głosowania\",\"prawo do sądzenia\",\"prawo do egzekucji\",\"prawo do policji\"]', 0, 2),
(55, 4, 'Parlament składa się z:', '[\"Sejmu i Senatu\",\"Prezydenta i rządu\",\"Sądu i prokuratury\",\"Policji\"]', 0, 3),
(56, 5, 'Proces legislacyjny to:', '[\"tworzenie ustawy\",\"wykonywanie prawa\",\"sądzenie\",\"kontrola policji\"]', 0, 1),
(57, 5, 'Pierwszy etap ustawy to:', '[\"projekt ustawy\",\"wyrok\",\"egzekucja\",\"podpis\"]', 0, 2),
(58, 5, 'Ustawa jest uchwalana przez:', '[\"Sejm\",\"Sąd\",\"Policję\",\"Rząd\"]', 0, 3),
(59, 6, 'Drugi etap procesu legislacyjnego to:', '[\"praca w komisjach\",\"egzekucja prawa\",\"wyrok\",\"wojsko\"]', 0, 1),
(60, 6, 'Ustawę zatwierdza:', '[\"Sejm i Senat\",\"Policja\",\"Sąd\",\"Wojsko\"]', 0, 2),
(61, 6, 'Ostatecznie ustawę podpisuje:', '[\"Prezydent\",\"Premier\",\"Senat\",\"Sąd\"]', 0, 3),
(62, 7, 'Inicjatywa ustawodawcza to:', '[\"prawo tworzenia projektu ustawy\",\"prawo sądzenia\",\"prawo egzekucji\",\"prawo głosowania\"]', 0, 1),
(63, 7, 'Kto ma inicjatywę ustawodawczą?', '[\"Sejm, Senat, Prezydent, Rząd\",\"Policja\",\"Sądy\",\"Wojsko\"]', 0, 2),
(64, 7, 'Projekt ustawy zaczyna się od:', '[\"inicjatywy\",\"wyroku\",\"egzekucji\",\"aresztowania\"]', 0, 3),
(65, 8, 'Prezydent może:', '[\"podpisać lub zawetować ustawę\",\"sądzić\",\"tworzyć policję\",\"wykonywać wyroki\"]', 0, 1),
(66, 8, 'Weto oznacza:', '[\"odrzucenie ustawy\",\"podpisanie ustawy\",\"tworzenie ustawy\",\"wykonanie ustawy\"]', 0, 2),
(67, 8, 'Sejm może odrzucić weto większością:', '[\"3/5\",\"1/2\",\"1/3\",\"2/3\"]', 3, 3),
(68, 9, 'Konstytucja to:', '[\"najwyższy akt prawny\",\"ustawa zwykła\",\"wyrok\",\"regulamin\"]', 0, 1),
(69, 9, 'Każda ustawa musi być zgodna z:', '[\"Konstytucją\",\"policją\",\"rządem\",\"premierem\"]', 0, 2),
(70, 9, 'Trybunał Konstytucyjny:', '[\"kontroluje zgodność prawa\",\"tworzy policję\",\"wykonuje prawo\",\"sądzi ludzi\"]', 0, 3),
(71, 10, 'Komisje sejmowe:', '[\"analizują projekty ustaw\",\"wydają wyroki\",\"egzekwują prawo\",\"tworzą rząd\"]', 0, 1),
(72, 10, 'Komisje działają w:', '[\"Sejmie\",\"Sądzie\",\"Policji\",\"Rządzie\"]', 0, 2),
(73, 10, 'Ich zadaniem jest:', '[\"praca nad ustawami\",\"sądzenie\",\"aresztowanie\",\"egzekucja\"]', 0, 3),
(74, 11, 'Kontrola parlamentarna to:', '[\"kontrola rządu\",\"tworzenie sądów\",\"egzekucja prawa\",\"policja\"]', 0, 1),
(75, 11, 'Rząd odpowiada przed:', '[\"Sejmem\",\"Policją\",\"Sądem\",\"Wojskiem\"]', 0, 2),
(76, 11, 'Interpelacja to:', '[\"pytanie posła do rządu\",\"wyrok\",\"ustawa\",\"areszt\"]', 0, 3),
(77, 12, 'Egzamin końcowy sprawdza:', '[\"całość materiału\",\"tylko Sejm\",\"tylko Senat\",\"tylko rząd\"]', 0, 1),
(78, 12, 'Kto tworzy prawo w Polsce?', '[\"Parlament\",\"Policja\",\"Sąd\",\"Wojsko\"]', 0, 2),
(79, 12, 'Główna rola Sejmu to:', '[\"tworzenie ustaw\",\"sądzenie\",\"egzekucja\",\"policja\"]', 0, 3),
(80, 13, 'Czym jest władza wykonawcza?', '[\"Wykonywanie prawa\",\"Tworzenie prawa\",\"Sądzenie\",\"Kontrola\"]', 0, 1),
(81, 13, 'Władza wykonawcza to:', '[\"rząd i prezydent\",\"sądy\",\"parlament\",\"policja\"]', 0, 2),
(82, 13, 'Jej zadaniem jest:', '[\"realizacja ustaw\",\"tworzenie ustaw\",\"sądzenie\",\"pisanie konstytucji\"]', 0, 3),
(83, 14, 'Prezydent RP jest:', '[\"głową państwa\",\"premierem\",\"sędzią\",\"posłem\"]', 0, 1),
(84, 14, 'Prezydent:', '[\"reprezentuje państwo\",\"sądzi\",\"pisze ustawy\",\"egzekwuje wyroki\"]', 0, 1),
(85, 14, 'Prezydent podpisuje:', '[\"ustawy\",\"wyroki\",\"dekrety sądowe\",\"mandaty\"]', 0, 0),
(86, 15, 'Rada Ministrów to:', '[\"rząd\",\"parlament\",\"sąd\",\"policja\"]', 0, 1),
(87, 15, 'Na czele rządu stoi:', '[\"premier\",\"prezydent\",\"marszałek\",\"sędzia\"]', 0, 1),
(88, 15, 'Rząd wykonuje:', '[\"politykę państwa\",\"wyroki\",\"ustawy\",\"konstytucję\"]', 0, 0),
(89, 16, 'Premier kieruje:', '[\"rządem\",\"sądem\",\"sejmem\",\"policją\"]', 0, 1),
(90, 16, 'Premier jest:', '[\"szefem rządu\",\"prezydentem\",\"sędzią\",\"posłem\"]', 0, 0),
(91, 16, 'Premier odpowiada przed:', '[\"Sejmem\",\"Sądem\",\"Policją\",\"Wojskiem\"]', 0, 0),
(92, 17, 'Ministerstwa odpowiadają za:', '[\"różne dziedziny państwa\",\"sądy\",\"sejm\",\"konstytucję\"]', 0, 1),
(93, 17, 'Minister kieruje:', '[\"resortem\",\"sądem\",\"parlamentem\",\"policją\"]', 0, 1),
(94, 17, 'Przykład ministerstwa:', '[\"edukacji\",\"sądu\",\"sejmu\",\"konstytucji\"]', 0, 0),
(95, 18, 'Administracja rządowa to:', '[\"urzędy wykonawcze\",\"parlament\",\"sądy\",\"policja\"]', 0, 1),
(96, 18, 'Jej zadaniem jest:', '[\"wdrażanie prawa\",\"tworzenie prawa\",\"sądzenie\",\"pisanie ustaw\"]', 0, 0),
(97, 18, 'Urząd wojewódzki to przykład:', '[\"administracji\",\"sądu\",\"parlamentu\",\"wojska\"]', 0, 0),
(98, 19, 'Polityka wewnętrzna dotyczy:', '[\"spraw kraju\",\"relacji międzynarodowych\",\"wojny\",\"sądu\"]', 0, 1),
(99, 19, 'Obejmuje:', '[\"edukację i zdrowie\",\"wojnę\",\"dyplomację\",\"sądy\"]', 0, 0),
(100, 19, 'Kto ją realizuje?', '[\"rząd\",\"sąd\",\"parlament\",\"policja\"]', 0, 0),
(101, 20, 'Polityka zagraniczna to:', '[\"relacje z innymi krajami\",\"sprawy sądowe\",\"policja\",\"edukacja\"]', 0, 1),
(102, 20, 'Reprezentuje ją:', '[\"prezydent i rząd\",\"sąd\",\"sejm\",\"policja\"]', 0, 0),
(103, 20, 'Dotyczy:', '[\"dyplomacji\",\"wyroków\",\"ustaw\",\"lokalnych spraw\"]', 0, 0),
(104, 21, 'Siły zbrojne to:', '[\"wojsko\",\"policja\",\"sąd\",\"parlament\"]', 0, 1),
(105, 21, 'Naczelny dowódca to:', '[\"prezydent\",\"premier\",\"marszałek\",\"sędzia\"]', 0, 0),
(106, 21, 'Ich zadaniem jest:', '[\"obrona kraju\",\"tworzenie prawa\",\"sądzenie\",\"administracja\"]', 0, 0),
(107, 22, 'Służby państwowe to m.in.:', '[\"policja i ABW\",\"sejm\",\"sąd\",\"rząd\"]', 0, 1),
(108, 22, 'Ich rola to:', '[\"bezpieczeństwo\",\"tworzenie prawa\",\"sądzenie\",\"pisanie ustaw\"]', 0, 0),
(109, 22, 'Podlegają:', '[\"rządowi\",\"sejmowi\",\"sądom\",\"obywatelom\"]', 0, 0),
(110, 23, 'Rząd współpracuje z:', '[\"parlamentem\",\"tylko sądami\",\"tylko policją\",\"nikim\"]', 0, 1),
(111, 23, 'Kontrolę nad rządem sprawuje:', '[\"Sejm\",\"Sąd\",\"Policja\",\"Prezydent tylko\"]', 0, 0),
(112, 23, 'Rząd musi uzyskać:', '[\"wotum zaufania\",\"wyrok\",\"mandat\",\"konstytucję\"]', 0, 0),
(113, 24, 'Podsumowanie dotyczy:', '[\"całej władzy wykonawczej\",\"tylko premiera\",\"tylko prezydenta\",\"tylko policji\"]', 0, 1),
(114, 24, 'Władza wykonawcza:', '[\"realizuje prawo\",\"tworzy prawo\",\"sądzi\",\"pisze konstytucję\"]', 0, 0),
(115, 24, 'Składa się z:', '[\"rządu i prezydenta\",\"sądu\",\"sejmu\",\"policji\"]', 0, 0),
(116, 25, 'Czym jest władza sądownicza?', '[\"Sądzenie i interpretacja prawa\",\"Tworzenie prawa\",\"Wykonywanie prawa\",\"Policja\"]', 0, 1),
(117, 25, 'Władza sądownicza to:', '[\"sądy i trybunały\",\"parlament\",\"rząd\",\"prezydent\"]', 0, 0),
(118, 25, 'Jej zadaniem jest:', '[\"wydawanie wyroków\",\"tworzenie ustaw\",\"egzekucja prawa\",\"administracja\"]', 0, 0),
(119, 26, 'Sądy w Polsce dzielą się na:', '[\"powszechne i specjalne\",\"tylko jeden typ\",\"parlamentarne\",\"rządowe\"]', 0, 1),
(120, 26, 'Sądy:', '[\"rozstrzygają spory\",\"tworzą prawo\",\"egzekwują prawo\",\"piszą ustawy\"]', 0, 0),
(121, 26, 'Najważniejszą funkcją jest:', '[\"wymiar sprawiedliwości\",\"tworzenie prawa\",\"policja\",\"administracja\"]', 0, 0),
(122, 27, 'Sąd Najwyższy:', '[\"najwyższy organ sądowy\",\"parlament\",\"rząd\",\"policja\"]', 0, 1),
(123, 27, 'Jego rola to:', '[\"kontrola orzeczeń\",\"tworzenie ustaw\",\"egzekucja prawa\",\"policja\"]', 0, 0),
(124, 27, 'Działa w zakresie:', '[\"kasacji\",\"ustaw\",\"polityki\",\"administracji\"]', 0, 0),
(125, 28, 'Sądy powszechne zajmują się:', '[\"sprawami cywilnymi i karnymi\",\"ustawami\",\"rządem\",\"wojskiem\"]', 0, 1),
(126, 28, 'To są:', '[\"sądy rejonowe i okręgowe\",\"sejm\",\"senat\",\"policja\"]', 0, 0),
(127, 28, 'Ich zadanie to:', '[\"rozstrzyganie spraw obywateli\",\"tworzenie prawa\",\"egzekucja\",\"polityka\"]', 0, 0),
(128, 29, 'Trybunał Konstytucyjny:', '[\"kontroluje zgodność prawa\",\"tworzy prawo\",\"egzekwuje prawo\",\"policja\"]', 0, 1),
(129, 29, 'Sprawdza zgodność z:', '[\"Konstytucją\",\"rządem\",\"policją\",\"sejmem\"]', 0, 0),
(130, 29, 'Może unieważnić:', '[\"niezgodną ustawę\",\"wyrok policji\",\"decyzję premiera\",\"mandat\"]', 0, 0),
(131, 30, 'Prokuratura:', '[\"oskarża w sprawach karnych\",\"sądzi\",\"tworzy prawo\",\"egzekwuje ustawy\"]', 0, 1),
(132, 30, 'Prokurator:', '[\"reprezentuje państwo\",\"jest sędzią\",\"jest posłem\",\"jest policją\"]', 0, 0),
(133, 30, 'Zajmuje się:', '[\"przestępstwami\",\"ustawami\",\"polityką\",\"konstytucją\"]', 0, 0),
(134, 31, 'Sędziowie są:', '[\"niezawiśli\",\"podporządkowani rządowi\",\"polityczni\",\"wybierani przez policję\"]', 0, 1),
(135, 31, 'Sędzia wydaje:', '[\"wyroki\",\"ustawy\",\"dekrety\",\"rozkazy\"]', 0, 0),
(136, 31, 'Ich niezależność oznacza:', '[\"brak wpływu polityków\",\"kontrolę rządu\",\"podległość policji\",\"kontrolę sejmu\"]', 0, 0),
(137, 32, 'Niezależność sądów oznacza:', '[\"brak wpływu władzy politycznej\",\"kontrolę rządu\",\"tworzenie prawa\",\"egzekucję\"]', 0, 1),
(138, 32, 'Sądy są:', '[\"oddzielne od rządu\",\"częścią rządu\",\"częścią sejmu\",\"policją\"]', 0, 0),
(139, 32, 'To gwarantuje:', '[\"sprawiedliwość\",\"politykę\",\"ustawy\",\"administrację\"]', 0, 0),
(140, 33, 'Proces sądowy to:', '[\"rozpatrywanie sprawy\",\"tworzenie prawa\",\"egzekucja\",\"policja\"]', 0, 1),
(141, 33, 'Składa się z:', '[\"rozprawy i wyroku\",\"ustaw\",\"rządu\",\"policji\"]', 0, 0),
(142, 33, 'Kończy się:', '[\"wyrokiem\",\"ustawą\",\"dekretem\",\"mandatem\"]', 0, 0),
(143, 34, 'Prawo karne dotyczy:', '[\"przestępstw\",\"umów\",\"konstytucji\",\"administracji\"]', 0, 1),
(144, 34, 'Jego celem jest:', '[\"kara i ochrona społeczeństwa\",\"tworzenie prawa\",\"polityka\",\"rząd\"]', 0, 0),
(145, 34, 'Odpowiada za nie:', '[\"sąd karny\",\"sejm\",\"rząd\",\"policja\"]', 0, 0),
(146, 35, 'Prawo cywilne dotyczy:', '[\"sporów między obywatelami\",\"przestępstw\",\"polityki\",\"wojska\"]', 0, 1),
(147, 35, 'Obejmuje:', '[\"umowy i własność\",\"wojnę\",\"policję\",\"rząd\"]', 0, 0),
(148, 35, 'Rozstrzyga je:', '[\"sąd cywilny\",\"sejm\",\"rząd\",\"wojsko\"]', 0, 0),
(149, 36, 'Podsumowanie lekcji dotyczy:', '[\"całej władzy sądowniczej\",\"rządu\",\"sejmu\",\"policji\"]', 0, 1),
(150, 36, 'Władza sądownicza:', '[\"wydaje wyroki\",\"tworzy prawo\",\"wykonuje prawo\",\"rządzi państwem\"]', 0, 0),
(151, 36, 'Jej celem jest:', '[\"sprawiedliwość\",\"polityka\",\"ustawy\",\"administracja\"]', 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `modules`
--

CREATE TABLE `modules` (
  `id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `type` enum('text','card','image','interactive') NOT NULL,
  `order_index` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `lesson_id`, `type`, `order_index`) VALUES
(10, 1, 'text', 1),
(11, 1, 'text', 2),
(12, 1, 'text', 3),
(13, 2, 'text', 1),
(14, 2, 'text', 2),
(15, 2, 'text', 3),
(16, 3, 'text', 1),
(17, 3, 'text', 2),
(18, 3, 'text', 3),
(19, 4, 'text', 1),
(20, 4, 'text', 2),
(21, 4, 'text', 3),
(22, 5, 'text', 1),
(23, 5, 'text', 2),
(24, 5, 'text', 3),
(25, 6, 'text', 1),
(26, 6, 'text', 2),
(27, 6, 'text', 3),
(28, 7, 'text', 1),
(29, 7, 'text', 2),
(30, 7, 'text', 3),
(31, 8, 'text', 1),
(32, 8, 'text', 2),
(33, 8, 'text', 3),
(34, 9, 'text', 1),
(35, 9, 'text', 2),
(36, 9, 'text', 3),
(37, 10, 'text', 1),
(38, 10, 'text', 2),
(39, 10, 'text', 3),
(40, 11, 'text', 1),
(41, 11, 'text', 2),
(42, 11, 'text', 3),
(43, 12, 'text', 1),
(44, 12, 'text', 2),
(45, 12, 'text', 3),
(46, 13, 'text', 1),
(47, 13, 'text', 2),
(48, 13, 'text', 3),
(49, 14, 'text', 1),
(50, 14, 'text', 2),
(51, 14, 'text', 3),
(52, 15, 'text', 1),
(53, 15, 'text', 2),
(54, 15, 'text', 3),
(55, 16, 'text', 1),
(56, 16, 'text', 2),
(57, 16, 'text', 3),
(58, 17, 'text', 1),
(59, 17, 'text', 2),
(60, 17, 'text', 3),
(61, 18, 'text', 1),
(62, 18, 'text', 2),
(63, 18, 'text', 3),
(64, 19, 'text', 1),
(65, 19, 'text', 2),
(66, 19, 'text', 3),
(67, 20, 'text', 1),
(68, 20, 'text', 2),
(69, 20, 'text', 3),
(70, 21, 'text', 1),
(71, 21, 'text', 2),
(72, 21, 'text', 3),
(73, 22, 'text', 1),
(74, 22, 'text', 2),
(75, 22, 'text', 3),
(76, 23, 'text', 1),
(77, 23, 'text', 2),
(78, 23, 'text', 3),
(79, 24, 'text', 1),
(80, 24, 'text', 2),
(81, 24, 'text', 3),
(82, 25, 'text', 1),
(83, 25, 'text', 2),
(84, 25, 'text', 3),
(85, 26, 'text', 1),
(86, 26, 'text', 2),
(87, 26, 'text', 3),
(88, 27, 'text', 1),
(89, 27, 'text', 2),
(90, 27, 'text', 3),
(91, 28, 'text', 1),
(92, 28, 'text', 2),
(93, 28, 'text', 3),
(94, 29, 'text', 1),
(95, 29, 'text', 2),
(96, 29, 'text', 3),
(97, 30, 'text', 1),
(98, 30, 'text', 2),
(99, 30, 'text', 3),
(100, 31, 'text', 1),
(101, 31, 'text', 2),
(102, 31, 'text', 3),
(103, 32, 'text', 1),
(104, 32, 'text', 2),
(105, 32, 'text', 3),
(106, 33, 'text', 1),
(107, 33, 'text', 2),
(108, 33, 'text', 3),
(109, 34, 'text', 1),
(110, 34, 'text', 2),
(111, 34, 'text', 3),
(112, 35, 'text', 1),
(113, 35, 'text', 2),
(114, 35, 'text', 3),
(115, 36, 'text', 1),
(116, 36, 'text', 2),
(117, 36, 'text', 3),
(118, 1, 'text', 4),
(120, 2, 'text', 4),
(121, 3, 'text', 4),
(122, 4, 'text', 4),
(123, 5, 'text', 4),
(124, 6, 'text', 4),
(125, 7, 'text', 4),
(126, 8, 'text', 4),
(127, 9, 'text', 4),
(128, 10, 'text', 4),
(129, 11, 'text', 4),
(130, 12, 'text', 4),
(131, 13, 'text', 4),
(132, 14, 'text', 4),
(133, 15, 'text', 4),
(134, 16, 'text', 4),
(135, 17, 'text', 4),
(136, 18, 'text', 4),
(137, 19, 'text', 4),
(138, 20, 'text', 4),
(139, 21, 'text', 4),
(140, 22, 'text', 4),
(141, 23, 'text', 4),
(142, 24, 'text', 4),
(143, 25, 'text', 4),
(144, 26, 'text', 4),
(145, 27, 'text', 4),
(146, 28, 'text', 4),
(147, 29, 'text', 4),
(148, 30, 'text', 4),
(149, 31, 'text', 4),
(150, 32, 'text', 4),
(151, 33, 'text', 4),
(152, 34, 'text', 4),
(153, 35, 'text', 4),
(154, 36, 'text', 4),
(155, 1, 'text', 5),
(156, 2, 'text', 5),
(157, 3, 'text', 5),
(158, 4, 'text', 5),
(159, 5, 'text', 5),
(160, 6, 'text', 5),
(161, 7, 'text', 5),
(162, 8, 'text', 5),
(163, 9, 'text', 5),
(164, 10, 'text', 5),
(165, 11, 'text', 5),
(166, 12, 'text', 5),
(167, 13, 'text', 5),
(168, 14, 'text', 5),
(169, 15, 'text', 5),
(170, 16, 'text', 5),
(171, 17, 'text', 5),
(172, 18, 'text', 5),
(173, 19, 'text', 5),
(174, 20, 'text', 5),
(175, 21, 'text', 5),
(176, 22, 'text', 5),
(177, 23, 'text', 5),
(178, 24, 'text', 5),
(179, 25, 'text', 5),
(180, 26, 'text', 5),
(181, 27, 'text', 5),
(182, 28, 'text', 5),
(183, 29, 'text', 5),
(184, 30, 'text', 5),
(185, 31, 'text', 5),
(186, 32, 'text', 5),
(187, 33, 'text', 5),
(188, 34, 'text', 5),
(189, 35, 'text', 5),
(190, 36, 'text', 5),
(191, 1, 'text', 6),
(192, 2, 'text', 6),
(193, 3, 'text', 6),
(194, 4, 'text', 6),
(195, 5, 'text', 6),
(196, 6, 'text', 6),
(197, 7, 'text', 6),
(198, 8, 'text', 6),
(199, 9, 'text', 6),
(200, 10, 'text', 6),
(201, 11, 'text', 6),
(202, 12, 'text', 6),
(203, 13, 'text', 6),
(204, 14, 'text', 6),
(205, 15, 'text', 6),
(206, 16, 'text', 6),
(207, 17, 'text', 6),
(208, 18, 'text', 6),
(209, 19, 'text', 6),
(210, 20, 'text', 6),
(211, 21, 'text', 6),
(212, 22, 'text', 6),
(213, 23, 'text', 6),
(214, 24, 'text', 6),
(215, 25, 'text', 6),
(216, 26, 'text', 6),
(217, 27, 'text', 6),
(218, 28, 'text', 6),
(219, 29, 'text', 6),
(220, 30, 'text', 6),
(221, 31, 'text', 6),
(222, 32, 'text', 6),
(223, 33, 'text', 6),
(224, 34, 'text', 6),
(225, 35, 'text', 6),
(226, 36, 'text', 6);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `mp_ratings`
--

CREATE TABLE `mp_ratings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `mp_id` int(11) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `club` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mp_ratings`
--

INSERT INTO `mp_ratings` (`id`, `user_id`, `mp_id`, `rating`, `created_at`, `updated_at`, `club`) VALUES
(1, 4, 2, 5, '2026-06-03 16:08:09', '2026-06-03 16:08:09', NULL),
(2, 4, 4, 5, '2026-06-03 16:12:03', '2026-06-03 16:12:03', NULL),
(3, 4, 1, 5, '2026-06-03 16:30:24', '2026-06-03 16:30:24', 'PiS'),
(4, 4, 81, 5, '2026-06-03 16:31:05', '2026-06-03 16:31:05', 'Konfederacja_KP'),
(5, 4, 340, 5, '2026-06-03 16:31:11', '2026-06-03 16:31:11', 'Konfederacja_KP'),
(6, 4, 446, 5, '2026-06-03 16:31:14', '2026-06-03 16:31:14', 'Konfederacja_KP'),
(7, 4, 6, 5, '2026-06-03 16:33:54', '2026-06-03 16:33:54', 'Demokracja'),
(8, 4, 10, 4, '2026-06-03 16:46:40', '2026-06-03 16:46:43', 'KO'),
(10, 4, 234, 1, '2026-06-03 19:35:56', '2026-06-03 19:35:56', 'PiS'),
(11, 4, 146, 4, '2026-06-03 19:39:24', '2026-06-03 19:39:24', 'PiS'),
(12, 4, 50, 5, '2026-06-03 22:45:02', '2026-06-03 22:45:02', 'PiS'),
(13, 4, 7, 4, '2026-06-04 09:54:09', '2026-06-04 09:54:09', 'PiS');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `icon` varchar(50) DEFAULT NULL,
  `color` varchar(50) NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `type`, `data`, `icon`, `color`, `is_read`, `created_at`) VALUES
(53, 2, 'SURVEY_COMPLETED', 'null', NULL, '', 1, '2026-05-10 10:00:14'),
(55, 5, 'SURVEY_COMPLETED', 'null', NULL, '', 1, '2026-05-14 20:44:46'),
(56, 6, 'SURVEY_COMPLETED', 'null', NULL, '', 1, '2026-05-15 12:13:46'),
(146, 7, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":44,\"xp\":10}', 'achievement_unlock', '', 1, '2026-05-17 14:49:42'),
(147, 7, 'SURVEY_COMPLETED', '{\"xp\":50,\"totalXP\":50}', 'survey_completed', '', 1, '2026-05-17 14:49:42'),
(190, 8, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":44,\"xp\":10}', 'trophy', '', 1, '2026-05-19 19:15:37'),
(191, 8, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":60,\"xp\":10}', 'trophy', '', 1, '2026-05-19 19:15:37'),
(192, 8, 'SURVEY_COMPLETED', '{\"xp\":50,\"totalXP\":50}', 'survey_completed', '', 1, '2026-05-19 19:15:37'),
(193, 8, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":49,\"xp\":20}', 'trophy', '', 1, '2026-05-19 19:16:23'),
(194, 8, 'SURVEY_COMPLETED', '{\"xp\":50,\"totalXP\":120}', 'survey_completed', '', 1, '2026-05-19 19:16:23'),
(195, 8, 'SURVEY_COMPLETED', '{\"xp\":50,\"totalXP\":190}', 'survey_completed', '', 1, '2026-05-19 19:16:25'),
(196, 8, 'SURVEY_COMPLETED', '{\"xp\":50,\"totalXP\":240}', 'survey_completed', '', 1, '2026-05-19 19:16:28'),
(197, 9, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":44,\"xp\":10}', 'trophy', '', 1, '2026-05-19 19:18:44'),
(198, 9, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":60,\"xp\":10}', 'trophy', '', 1, '2026-05-19 19:18:44'),
(199, 9, 'SURVEY_COMPLETED', '{\"xp\":50,\"totalXP\":50}', 'survey_completed', '', 1, '2026-05-19 19:18:44'),
(325, 4, 'SURVEY_COMPLETED', '{\"xp\":50,\"totalXP\":2725}', 'survey_completed', 'emerald', 1, '2026-06-07 11:43:49'),
(326, 4, 'OPINION_POSTED', '{\"xp\":10,\"totalXP\":2735}', 'messages', 'sky', 1, '2026-06-07 13:26:56'),
(327, 11, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":60,\"achievementSlug\":\"active_1\",\"xp\":10}', 'trophy', 'amber', 0, '2026-06-07 13:28:44'),
(328, 11, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":123,\"achievementSlug\":\"opinions_1\",\"xp\":50}', 'trophy', 'amber', 0, '2026-06-07 13:28:45'),
(329, 11, 'OPINION_POSTED', '{\"xp\":10,\"totalXP\":10}', 'messages', 'sky', 0, '2026-06-07 13:28:45'),
(330, 4, 'REPORT_RESOLVED', '{\"message\":\"Twoje zgłoszenie dotyczące opinii do druku 2529 zostało rozpatrzone — opinia została usunięta.\"}', 'flag', 'emerald', 1, '2026-06-07 13:32:34'),
(331, 4, 'OPINION_POSTED', '{\"xp\":10,\"totalXP\":2745}', 'messages', 'sky', 1, '2026-06-07 13:35:13'),
(332, 2, 'APPEAL_APPROVED', '{\"message\":\"Twoje odwołanie zostało rozpatrzone pozytywnie — konto zostało odblokowane. Możesz się teraz zalogować.\"}', 'unlock', 'emerald', 1, '2026-06-07 13:46:49'),
(333, 2, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":60,\"achievementSlug\":\"active_1\",\"xp\":10}', 'trophy', 'amber', 1, '2026-06-07 13:59:16'),
(334, 2, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":123,\"achievementSlug\":\"opinions_1\",\"xp\":50}', 'trophy', 'amber', 1, '2026-06-07 13:59:16'),
(335, 2, 'OPINION_POSTED', '{\"xp\":10,\"totalXP\":10}', 'messages', 'sky', 1, '2026-06-07 13:59:16'),
(336, 2, 'OPINION_ENDORSED', '{\"message\":\"Ekspert igor uznał Twoją opinię za ważną!\"}', 'star', 'amber', 1, '2026-06-07 14:01:11'),
(337, 2, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":128,\"achievementSlug\":\"opinion_endorsed\",\"xp\":75}', 'trophy', 'amber', 1, '2026-06-07 14:01:11'),
(338, 2, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":49,\"achievementSlug\":\"xp_100\",\"xp\":10}', 'trophy', 'amber', 1, '2026-06-07 14:05:37'),
(339, 2, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":130,\"achievementSlug\":\"opinion_endorsed_1\",\"xp\":75}', 'trophy', 'amber', 1, '2026-06-07 14:05:37'),
(340, 2, 'OPINION_POSTED', '{\"xp\":10,\"totalXP\":155}', 'messages', 'sky', 1, '2026-06-07 14:05:37'),
(341, 2, 'OPINION_ENDORSED', '{\"message\":\"Ekspert igor uznał Twoją opinię za ważną!\"}', 'star', 'yellow', 1, '2026-06-07 14:06:02'),
(342, 2, 'OPINION_ENDORSED', '{\"message\":\"Ekspert igor uznał Twoją opinię za ważną!\"}', 'star', 'yellow', 1, '2026-06-07 14:06:05'),
(343, 2, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":131,\"achievementSlug\":\"opinion_endorsed_3\",\"xp\":150}', 'trophy', 'amber', 1, '2026-06-07 14:06:05'),
(344, 2, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":44,\"achievementSlug\":\"survey_first\",\"xp\":25}', 'trophy', 'amber', 1, '2026-06-07 14:10:21'),
(345, 2, 'SURVEY_COMPLETED', '{\"xp\":50,\"totalXP\":440}', 'survey_completed', 'emerald', 1, '2026-06-07 14:10:21'),
(346, 2, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":101,\"achievementSlug\":\"module_1\",\"xp\":10}', 'trophy', 'amber', 1, '2026-06-07 14:10:42'),
(347, 2, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":120,\"achievementSlug\":\"lesson_1\",\"xp\":5}', 'trophy', 'amber', 1, '2026-06-07 14:10:56'),
(348, 2, 'LEVEL_UP', '{\"oldRank\":{\"id\":6,\"level\":1,\"name\":\"rank1\",\"required_xp\":0,\"color\":\"#9CA3AF\",\"created_at\":\"2026-05-17T13:17:07.000Z\"},\"newRank\":{\"id\":7,\"level\":2,\"name\":\"rank2\",\"required_xp\":500,\"color\":\"#22C55E\",\"created_at\":\"2026-05-17T13:17:07.000Z\"},\"xp\":530}', 'trophy', 'yellow', 1, '2026-06-07 14:11:13'),
(349, 2, 'ACHIEVEMENT_UNLOCK', '{\"achievementId\":102,\"achievementSlug\":\"module_10\",\"xp\":50}', 'trophy', 'amber', 1, '2026-06-07 14:11:13'),
(350, 4, 'REPORT_RESOLVED', '{\"message\":\"Twoje zgłoszenie dotyczące opinii do druku 2529 zostało rozpatrzone — opinia została usunięta.\"}', 'flag', 'green', 1, '2026-06-07 14:14:17'),
(351, 4, 'REPORT_DISMISSED', '{\"message\":\"Twoje zgłoszenie dotyczące opinii do druku 2529 zostało odrzucone — opinia nie naruszała zasad.\"}', 'flag', 'slate', 1, '2026-06-07 14:14:19'),
(352, 2, 'APPEAL_APPROVED', '{\"message\":\"Twoje odwołanie zostało rozpatrzone pozytywnie — konto zostało odblokowane. Możesz się teraz zalogować.\"}', 'unlock', 'cyan', 0, '2026-06-07 14:29:42'),
(353, 4, 'REPORT_RESOLVED', '{\"message\":\"Twoje zgłoszenie dotyczące opinii do druku 2529 zostało rozpatrzone — opinia została usunięta.\"}', 'flag', 'green', 1, '2026-06-07 15:07:33');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `opinion_reports`
--

CREATE TABLE `opinion_reports` (
  `id` int(11) NOT NULL,
  `opinion_id` int(11) NOT NULL,
  `reporter_id` int(11) NOT NULL,
  `reason` varchar(500) NOT NULL,
  `status` enum('pending','reviewed','dismissed') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `reviewed_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `opinion_reports`
--

INSERT INTO `opinion_reports` (`id`, `opinion_id`, `reporter_id`, `reason`, `status`, `created_at`, `reviewed_at`, `reviewed_by`) VALUES
(1, 6, 4, 'ewqeqwewqeqw', 'reviewed', '2026-06-07 15:32:22', NULL, NULL),
(3, 8, 4, 'rtge', 'reviewed', '2026-06-07 17:07:26', '2026-06-07 17:07:33', 4),
(4, 9, 4, 'wer', 'reviewed', '2026-06-07 16:13:02', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `question_id`, `value`) VALUES
(17, 1, 'yes'),
(18, 1, 'no'),
(19, 2, 'yes'),
(20, 2, 'no'),
(21, 3, 'yes'),
(22, 3, 'no'),
(23, 4, 'yes'),
(24, 4, 'no'),
(25, 5, 'yes'),
(26, 5, 'no'),
(27, 6, 'yes'),
(28, 6, 'no'),
(29, 7, 'yes'),
(30, 7, 'no'),
(31, 8, 'yes'),
(32, 8, 'no'),
(33, 9, 'yes'),
(34, 9, 'no'),
(35, 10, 'yes'),
(36, 10, 'no'),
(37, 11, 'yes'),
(38, 11, 'no'),
(39, 12, 'yes'),
(40, 12, 'no');

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
  `color` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ranks`
--

INSERT INTO `ranks` (`id`, `level`, `name`, `required_xp`, `color`, `created_at`) VALUES
(6, 1, 'rank1', 0, '#9CA3AF', '2026-05-17 13:17:07'),
(7, 2, 'rank2', 500, '#22C55E', '2026-05-17 13:17:07'),
(8, 3, 'rank3', 1500, '#14B8A6', '2026-05-17 13:17:07'),
(9, 4, 'rank4', 3000, '#3B82F6', '2026-05-17 13:17:07'),
(10, 5, 'rank5', 6000, '#6366F1', '2026-05-17 13:17:07'),
(11, 6, 'rank6', 10000, '#8B5CF6', '2026-05-17 13:17:07'),
(12, 7, 'rank7', 16000, '#A855F7', '2026-05-17 13:17:07'),
(13, 8, 'rank8', 25000, '#D946EF', '2026-05-17 13:17:07'),
(14, 9, 'rank9', 40000, '#F59E0B', '2026-05-17 13:17:07'),
(15, 10, 'rank10', 65000, '#EF4444', '2026-05-17 13:17:07');

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
(1, 'Reformy Podatkowe 2026', 'Ekonomia', 50, '5 min', 'Pytamy Polaków o możliwe zmiany podatkowe', 'active', '2026-06-16'),
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
(256, 1, 4, '{\"1\":\"yes\",\"2\":\"yes\",\"3\":\"yes\"}', '2026-06-07 13:43:49'),
(257, 1, 2, '{\"1\":\"yes\",\"2\":\"yes\",\"3\":\"yes\"}', '2026-06-07 16:10:21');

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
  `level` int(11) NOT NULL DEFAULT 1,
  `role` varchar(20) NOT NULL DEFAULT 'Użytkownik'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_strong`, `created_at`, `reset_token`, `reset_token_exp`, `login_streak`, `last_login_date`, `active_days`, `is_verified`, `verification_code`, `verification_expires`, `last_streak_notified_date`, `xp`, `level`, `role`) VALUES
(1, '', 'igorrpedziwilk@gmail.com', '$2b$10$KoKNM42i0rsw3C0F31thPuOMx4kiUi/zPY8NkS/HHKgl/aMiZ5uDa', 0, '2026-02-24 20:36:07', NULL, NULL, 1, '2026-05-14', 1, 0, NULL, NULL, NULL, 0, 1, 'Zbanowany'),
(2, 'qwe', 'igor@wp.pl', '$2b$10$nGHb96MKg/ozPM/yBSl3iONFyrhrgyxpfePYt9oVyxON/AuTkqGI.', 0, '2026-02-24 20:45:14', '56fb4d26-e893-4a29-a772-7529ac6ec39c', 20260514, 1, '2026-06-07', 2, 0, NULL, NULL, '2026-06-07', 530, 1, 'Zbanowany'),
(3, 'IgorPedz', 'pedz@wp.pl', '$2b$10$L10qTJ1I9g3wQEnhIOwvfuJAmtu8Aj6wjZwj2clDfs41aZiYPUySK', 0, '2026-05-10 12:18:39', NULL, NULL, 1, '2026-05-14', 1, 0, NULL, NULL, NULL, 0, 1, 'Zbanowany'),
(4, 'igor', 'qigorq@wp.pl', '$2b$10$P4AlEULBNpKLfexNz/DqD.A4GsKn74S27bYX5jh9tLxTiJH2OaPQy', 1, '2026-05-14 18:56:00', 'c5be64bf-e8cb-4c0e-9dc8-64b27b0f323b', 1779820035820, 2, '2026-06-07', 40, 1, NULL, NULL, '2026-06-07', 2745, 3, 'Administrator'),
(5, 'test', 'test@wp.pl', '$2b$10$QGBop034Lo4eRK5mtynH0O.aauocBwppzn6YnuR/8CHnZ12SR4olO', 0, '2026-05-14 20:34:46', NULL, NULL, 1, '2026-05-14', 1, 0, NULL, NULL, NULL, 0, 1, 'Moderator'),
(6, 'testowekonto', 'testtest@wp.pl', '$2b$10$OCUhJzWMZVnWlR3vTIaM8uv4joGWMUJkZG44IVTHlfkD/Zv72Jh66', 0, '2026-05-15 12:12:30', NULL, NULL, 1, '2026-05-15', 1, 0, NULL, NULL, NULL, 0, 1, 'Zbanowany'),
(7, 'igorpedzi', 'pedziwilk@gmail.com', '$2b$10$5jqt3ellaNs2D5bmibQ9X.62s9kfLf1br780mOJVBtMqDLhI.E2..', 1, '2026-05-17 14:49:27', NULL, NULL, 1, '2026-05-17', 1, 0, NULL, NULL, '2026-05-17', 60, 1, 'Zbanowany'),
(8, 'IgorTest', 'testtesttest@wp.pl', '$2b$10$t9JNYXg5xvtESp3BawVX4uQeJH8pRKseRaMN7oHHcCaX9kmzq8VbG', 0, '2026-05-19 19:15:07', NULL, NULL, 1, '2026-05-19', 1, 0, NULL, NULL, '2026-05-19', 240, 1, 'Zbanowany'),
(9, 'testowekonto', 'test@gmail.com', '$2b$10$SjSHuuE0rgyB2iaYVkil/OQMswW/oAJHWh36btr5x.ZSKZqSaIcJq', 1, '2026-05-19 19:18:34', NULL, NULL, 1, '2026-05-19', 1, 0, NULL, NULL, '2026-05-19', 70, 1, 'Zbanowany'),
(10, 'TestoweKontonumer10', 'test10@wp.pl', '$2b$10$GWQG9JFgVX80NO2JKg6mOu3tMj2pOOm5OEYQTEee8D2jAFh5NqUoi', 1, '2026-06-07 15:21:30', NULL, NULL, 1, '2026-06-07', 1, 0, NULL, NULL, '2026-06-07', 0, 1, 'Zbanowany'),
(11, 'nowe', 'nowe@wp.pl', '$2b$10$P.DdyKSJmdOeP5JfVUJhM.K6F3M9CBEwhSQpFmOksGN.DOby9EVZe', 1, '2026-06-07 15:28:36', NULL, NULL, 1, '2026-06-07', 1, 0, NULL, NULL, '2026-06-07', 70, 1, 'Użytkownik');

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
(205, 4, 44, 1, 1, '2026-05-18 18:05:27', '2026-05-18 18:05:27'),
(206, 4, 45, 5, 1, '2026-05-18 18:06:21', '2026-05-18 18:05:56'),
(207, 4, 46, 10, 1, '2026-05-19 19:25:51', '2026-05-18 18:05:56'),
(208, 4, 47, 25, 1, '2026-05-20 16:56:32', '2026-05-18 18:05:56'),
(209, 4, 48, 50, 1, NULL, '2026-05-18 18:05:56'),
(353, 4, 49, 100, 1, '2026-05-19 19:44:44', '2026-05-19 19:36:41'),
(354, 4, 50, 1000, 1, '2026-05-19 19:44:44', '2026-05-19 19:36:41'),
(355, 4, 51, 5000, 1, '2026-05-19 19:44:44', '2026-05-19 19:36:41'),
(356, 4, 52, 3, 1, '2026-05-19 19:44:44', '2026-05-19 19:36:41'),
(357, 4, 53, 7, 1, '2026-05-19 19:44:44', '2026-05-19 19:36:41'),
(358, 4, 54, 14, 1, '2026-05-19 22:01:59', '2026-05-19 19:36:41'),
(359, 4, 55, 2, 0, NULL, '2026-05-19 19:36:41'),
(360, 4, 60, 1, 1, '2026-05-19 19:49:31', '2026-05-19 19:36:41'),
(361, 4, 61, 7, 1, '2026-05-19 19:49:31', '2026-05-19 19:36:41'),
(362, 4, 62, 14, 1, '2026-05-19 19:49:31', '2026-05-19 19:36:41'),
(363, 4, 63, 30, 1, '2026-05-28 17:48:35', '2026-05-19 19:36:41'),
(364, 4, 64, 40, 0, NULL, '2026-05-19 19:36:41'),
(365, 4, 65, 40, 0, NULL, '2026-05-19 19:36:41'),
(366, 4, 66, 40, 0, NULL, '2026-05-19 19:36:41'),
(367, 4, 67, 40, 0, NULL, '2026-05-19 19:36:41'),
(490, 8, 44, 1, 1, '2026-05-19 21:15:37', '2026-05-19 21:15:37'),
(491, 8, 45, 4, 0, NULL, '2026-05-19 21:15:37'),
(492, 8, 46, 4, 0, NULL, '2026-05-19 21:15:37'),
(493, 8, 47, 4, 0, NULL, '2026-05-19 21:15:37'),
(494, 8, 48, 4, 0, NULL, '2026-05-19 21:15:37'),
(495, 8, 49, 100, 1, '2026-05-19 21:16:23', '2026-05-19 21:15:37'),
(496, 8, 50, 240, 0, NULL, '2026-05-19 21:15:37'),
(497, 8, 51, 240, 0, NULL, '2026-05-19 21:15:37'),
(498, 8, 52, 1, 0, NULL, '2026-05-19 21:15:37'),
(499, 8, 53, 1, 0, NULL, '2026-05-19 21:15:37'),
(500, 8, 54, 1, 0, NULL, '2026-05-19 21:15:37'),
(501, 8, 55, 1, 0, NULL, '2026-05-19 21:15:37'),
(502, 8, 60, 1, 1, '2026-05-19 21:15:37', '2026-05-19 21:15:37'),
(503, 8, 61, 1, 0, NULL, '2026-05-19 21:15:37'),
(504, 8, 62, 1, 0, NULL, '2026-05-19 21:15:37'),
(505, 8, 63, 1, 0, NULL, '2026-05-19 21:15:37'),
(506, 8, 64, 1, 0, NULL, '2026-05-19 21:15:37'),
(507, 8, 65, 1, 0, NULL, '2026-05-19 21:15:37'),
(508, 8, 66, 1, 0, NULL, '2026-05-19 21:15:37'),
(509, 8, 67, 1, 0, NULL, '2026-05-19 21:15:37'),
(562, 9, 44, 1, 1, '2026-05-19 21:18:44', '2026-05-19 21:18:44'),
(563, 9, 45, 1, 0, NULL, '2026-05-19 21:18:44'),
(564, 9, 46, 1, 0, NULL, '2026-05-19 21:18:44'),
(565, 9, 47, 1, 0, NULL, '2026-05-19 21:18:44'),
(566, 9, 48, 1, 0, NULL, '2026-05-19 21:18:44'),
(567, 9, 49, 50, 0, NULL, '2026-05-19 21:18:44'),
(568, 9, 50, 50, 0, NULL, '2026-05-19 21:18:44'),
(569, 9, 51, 50, 0, NULL, '2026-05-19 21:18:44'),
(570, 9, 52, 1, 0, NULL, '2026-05-19 21:18:44'),
(571, 9, 53, 1, 0, NULL, '2026-05-19 21:18:44'),
(572, 9, 54, 1, 0, NULL, '2026-05-19 21:18:44'),
(573, 9, 55, 1, 0, NULL, '2026-05-19 21:18:44'),
(574, 9, 60, 1, 1, '2026-05-19 21:18:44', '2026-05-19 21:18:44'),
(575, 9, 61, 1, 0, NULL, '2026-05-19 21:18:44'),
(576, 9, 62, 1, 0, NULL, '2026-05-19 21:18:44'),
(577, 9, 63, 1, 0, NULL, '2026-05-19 21:18:44'),
(578, 9, 64, 1, 0, NULL, '2026-05-19 21:18:44'),
(579, 9, 65, 1, 0, NULL, '2026-05-19 21:18:44'),
(580, 9, 66, 1, 0, NULL, '2026-05-19 21:18:44'),
(581, 9, 67, 1, 0, NULL, '2026-05-19 21:18:44'),
(853, 4, 101, 1, 1, '2026-05-31 14:36:32', '2026-05-31 14:36:32'),
(854, 4, 102, 10, 1, '2026-05-31 14:43:24', '2026-05-31 14:36:32'),
(855, 4, 103, 50, 1, '2026-05-31 16:22:01', '2026-05-31 14:36:32'),
(856, 4, 104, 81, 0, NULL, '2026-05-31 14:36:32'),
(857, 4, 110, 1, 1, '2026-05-31 16:25:36', '2026-05-31 14:36:32'),
(858, 4, 111, 3, 1, '2026-05-31 16:35:16', '2026-05-31 14:36:32'),
(859, 4, 112, 7, 0, NULL, '2026-05-31 14:36:32'),
(860, 4, 120, 1, 1, '2026-05-31 14:36:32', '2026-05-31 14:36:32'),
(861, 4, 121, 13, 0, NULL, '2026-05-31 14:36:32'),
(862, 4, 122, 13, 0, NULL, '2026-05-31 14:36:32'),
(1981, 4, 70, 1, 1, '2026-06-03 18:12:03', '2026-06-03 18:12:03'),
(1982, 4, 71, 10, 1, '2026-06-03 21:39:24', '2026-06-03 18:12:03'),
(1983, 4, 72, 13, 0, NULL, '2026-06-03 18:12:03'),
(1984, 4, 73, 13, 0, NULL, '2026-06-03 18:12:03'),
(1997, 4, 74, 1, 0, NULL, '2026-06-03 18:30:24'),
(1998, 4, 75, 0, 0, NULL, '2026-06-03 18:30:24'),
(1999, 4, 76, 0, 0, NULL, '2026-06-03 18:30:24'),
(2000, 4, 77, 0, 0, NULL, '2026-06-03 18:30:24'),
(2001, 4, 78, 1, 0, NULL, '2026-06-03 18:30:24'),
(2002, 4, 79, 5, 0, NULL, '2026-06-03 18:30:24'),
(2003, 4, 80, 0, 0, NULL, '2026-06-03 18:30:24'),
(2004, 4, 81, 3, 1, '2026-06-03 18:31:14', '2026-06-03 18:30:24'),
(2005, 4, 82, 0, 0, NULL, '2026-06-03 18:30:24'),
(2006, 4, 83, 1, 0, NULL, '2026-06-03 18:30:24'),
(2007, 4, 85, 2, 0, NULL, '2026-06-03 18:30:24'),
(2008, 4, 86, 9, 0, NULL, '2026-06-03 18:30:24'),
(2102, 4, 84, 3, 0, NULL, '2026-06-03 18:33:54'),
(2205, 4, 123, 1, 1, '2026-06-03 20:20:35', '2026-06-03 20:20:35'),
(2254, 4, 124, 6, 0, NULL, '2026-06-03 21:35:56'),
(2255, 4, 125, 6, 0, NULL, '2026-06-03 21:35:56'),
(2256, 4, 126, 6, 0, NULL, '2026-06-03 21:35:56'),
(2257, 4, 127, 6, 0, NULL, '2026-06-03 21:35:56'),
(2583, 11, 44, 0, 0, NULL, '2026-06-07 17:28:44'),
(2584, 11, 45, 0, 0, NULL, '2026-06-07 17:28:44'),
(2585, 11, 46, 0, 0, NULL, '2026-06-07 17:28:44'),
(2586, 11, 47, 0, 0, NULL, '2026-06-07 17:28:44'),
(2587, 11, 48, 0, 0, NULL, '2026-06-07 17:28:44'),
(2588, 11, 49, 10, 0, NULL, '2026-06-07 17:28:44'),
(2589, 11, 50, 10, 0, NULL, '2026-06-07 17:28:44'),
(2590, 11, 51, 10, 0, NULL, '2026-06-07 17:28:44'),
(2591, 11, 52, 1, 0, NULL, '2026-06-07 17:28:44'),
(2592, 11, 53, 1, 0, NULL, '2026-06-07 17:28:44'),
(2593, 11, 54, 1, 0, NULL, '2026-06-07 17:28:44'),
(2594, 11, 55, 1, 0, NULL, '2026-06-07 17:28:44'),
(2595, 11, 60, 1, 1, '2026-06-07 17:28:44', '2026-06-07 17:28:44'),
(2596, 11, 61, 1, 0, NULL, '2026-06-07 17:28:44'),
(2597, 11, 62, 1, 0, NULL, '2026-06-07 17:28:44'),
(2598, 11, 63, 1, 0, NULL, '2026-06-07 17:28:44'),
(2599, 11, 64, 1, 0, NULL, '2026-06-07 17:28:44'),
(2600, 11, 65, 1, 0, NULL, '2026-06-07 17:28:44'),
(2601, 11, 66, 1, 0, NULL, '2026-06-07 17:28:44'),
(2602, 11, 67, 1, 0, NULL, '2026-06-07 17:28:44'),
(2603, 11, 70, 0, 0, NULL, '2026-06-07 17:28:44'),
(2604, 11, 71, 0, 0, NULL, '2026-06-07 17:28:44'),
(2605, 11, 72, 0, 0, NULL, '2026-06-07 17:28:44'),
(2606, 11, 73, 0, 0, NULL, '2026-06-07 17:28:44'),
(2607, 11, 74, 0, 0, NULL, '2026-06-07 17:28:44'),
(2608, 11, 75, 0, 0, NULL, '2026-06-07 17:28:44'),
(2609, 11, 76, 0, 0, NULL, '2026-06-07 17:28:44'),
(2610, 11, 77, 0, 0, NULL, '2026-06-07 17:28:44'),
(2611, 11, 78, 0, 0, NULL, '2026-06-07 17:28:44'),
(2612, 11, 79, 0, 0, NULL, '2026-06-07 17:28:45'),
(2613, 11, 80, 0, 0, NULL, '2026-06-07 17:28:45'),
(2614, 11, 81, 0, 0, NULL, '2026-06-07 17:28:45'),
(2615, 11, 82, 0, 0, NULL, '2026-06-07 17:28:45'),
(2616, 11, 83, 0, 0, NULL, '2026-06-07 17:28:45'),
(2617, 11, 84, 0, 0, NULL, '2026-06-07 17:28:45'),
(2618, 11, 85, 0, 0, NULL, '2026-06-07 17:28:45'),
(2619, 11, 86, 0, 0, NULL, '2026-06-07 17:28:45'),
(2620, 11, 101, 0, 0, NULL, '2026-06-07 17:28:45'),
(2621, 11, 102, 0, 0, NULL, '2026-06-07 17:28:45'),
(2622, 11, 103, 0, 0, NULL, '2026-06-07 17:28:45'),
(2623, 11, 104, 0, 0, NULL, '2026-06-07 17:28:45'),
(2624, 11, 110, 0, 0, NULL, '2026-06-07 17:28:45'),
(2625, 11, 111, 0, 0, NULL, '2026-06-07 17:28:45'),
(2626, 11, 112, 0, 0, NULL, '2026-06-07 17:28:45'),
(2627, 11, 120, 0, 0, NULL, '2026-06-07 17:28:45'),
(2628, 11, 121, 0, 0, NULL, '2026-06-07 17:28:45'),
(2629, 11, 122, 0, 0, NULL, '2026-06-07 17:28:45'),
(2630, 11, 123, 1, 1, '2026-06-07 17:28:45', '2026-06-07 17:28:45'),
(2631, 11, 124, 1, 0, NULL, '2026-06-07 17:28:45'),
(2632, 11, 125, 1, 0, NULL, '2026-06-07 17:28:45'),
(2633, 11, 126, 1, 0, NULL, '2026-06-07 17:28:45'),
(2634, 11, 127, 1, 0, NULL, '2026-06-07 17:28:45'),
(2662, 2, 44, 1, 1, '2026-06-07 18:10:21', '2026-06-07 17:59:16'),
(2663, 2, 45, 1, 0, NULL, '2026-06-07 17:59:16'),
(2664, 2, 46, 1, 0, NULL, '2026-06-07 17:59:16'),
(2665, 2, 47, 1, 0, NULL, '2026-06-07 17:59:16'),
(2666, 2, 48, 1, 0, NULL, '2026-06-07 17:59:16'),
(2667, 2, 49, 100, 1, '2026-06-07 18:05:37', '2026-06-07 17:59:16'),
(2668, 2, 50, 530, 0, NULL, '2026-06-07 17:59:16'),
(2669, 2, 51, 530, 0, NULL, '2026-06-07 17:59:16'),
(2670, 2, 52, 1, 0, NULL, '2026-06-07 17:59:16'),
(2671, 2, 53, 1, 0, NULL, '2026-06-07 17:59:16'),
(2672, 2, 54, 1, 0, NULL, '2026-06-07 17:59:16'),
(2673, 2, 55, 1, 0, NULL, '2026-06-07 17:59:16'),
(2674, 2, 60, 1, 1, '2026-06-07 17:59:16', '2026-06-07 17:59:16'),
(2675, 2, 61, 2, 0, NULL, '2026-06-07 17:59:16'),
(2676, 2, 62, 2, 0, NULL, '2026-06-07 17:59:16'),
(2677, 2, 63, 2, 0, NULL, '2026-06-07 17:59:16'),
(2678, 2, 64, 2, 0, NULL, '2026-06-07 17:59:16'),
(2679, 2, 65, 2, 0, NULL, '2026-06-07 17:59:16'),
(2680, 2, 66, 2, 0, NULL, '2026-06-07 17:59:16'),
(2681, 2, 67, 2, 0, NULL, '2026-06-07 17:59:16'),
(2682, 2, 70, 0, 0, NULL, '2026-06-07 17:59:16'),
(2683, 2, 71, 0, 0, NULL, '2026-06-07 17:59:16'),
(2684, 2, 72, 0, 0, NULL, '2026-06-07 17:59:16'),
(2685, 2, 73, 0, 0, NULL, '2026-06-07 17:59:16'),
(2686, 2, 74, 0, 0, NULL, '2026-06-07 17:59:16'),
(2687, 2, 75, 0, 0, NULL, '2026-06-07 17:59:16'),
(2688, 2, 76, 0, 0, NULL, '2026-06-07 17:59:16'),
(2689, 2, 77, 0, 0, NULL, '2026-06-07 17:59:16'),
(2690, 2, 78, 0, 0, NULL, '2026-06-07 17:59:16'),
(2691, 2, 79, 0, 0, NULL, '2026-06-07 17:59:16'),
(2692, 2, 80, 0, 0, NULL, '2026-06-07 17:59:16'),
(2693, 2, 81, 0, 0, NULL, '2026-06-07 17:59:16'),
(2694, 2, 82, 0, 0, NULL, '2026-06-07 17:59:16'),
(2695, 2, 83, 0, 0, NULL, '2026-06-07 17:59:16'),
(2696, 2, 84, 0, 0, NULL, '2026-06-07 17:59:16'),
(2697, 2, 85, 0, 0, NULL, '2026-06-07 17:59:16'),
(2698, 2, 86, 0, 0, NULL, '2026-06-07 17:59:16'),
(2699, 2, 101, 1, 1, '2026-06-07 18:10:42', '2026-06-07 17:59:16'),
(2700, 2, 102, 10, 1, '2026-06-07 18:11:13', '2026-06-07 17:59:16'),
(2701, 2, 103, 12, 0, NULL, '2026-06-07 17:59:16'),
(2702, 2, 104, 12, 0, NULL, '2026-06-07 17:59:16'),
(2703, 2, 110, 0, 0, NULL, '2026-06-07 17:59:16'),
(2704, 2, 111, 0, 0, NULL, '2026-06-07 17:59:16'),
(2705, 2, 112, 0, 0, NULL, '2026-06-07 17:59:16'),
(2706, 2, 120, 1, 1, '2026-06-07 18:10:56', '2026-06-07 17:59:16'),
(2707, 2, 121, 2, 0, NULL, '2026-06-07 17:59:16'),
(2708, 2, 122, 2, 0, NULL, '2026-06-07 17:59:16'),
(2709, 2, 123, 1, 1, '2026-06-07 17:59:16', '2026-06-07 17:59:16'),
(2710, 2, 124, 2, 0, NULL, '2026-06-07 17:59:16'),
(2711, 2, 125, 2, 0, NULL, '2026-06-07 17:59:16'),
(2712, 2, 126, 2, 0, NULL, '2026-06-07 17:59:16'),
(2713, 2, 127, 2, 0, NULL, '2026-06-07 17:59:16'),
(2815, 2, 130, 1, 1, '2026-06-07 18:05:37', '2026-06-07 18:05:37'),
(2816, 2, 131, 3, 1, '2026-06-07 18:06:05', '2026-06-07 18:05:37'),
(2817, 2, 132, 3, 0, NULL, '2026-06-07 18:05:37'),
(2818, 2, 133, 3, 0, NULL, '2026-06-07 18:05:37');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_courses`
--

CREATE TABLE `user_courses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `exam_score` int(11) DEFAULT 0,
  `completed` tinyint(1) DEFAULT 0,
  `started_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_courses`
--

INSERT INTO `user_courses` (`id`, `user_id`, `course_id`, `exam_score`, `completed`, `started_at`, `completed_at`) VALUES
(7, 4, 1, 9, 1, '2026-05-31 14:38:11', '2026-05-31 14:38:11'),
(8, 4, 2, 10, 1, '2026-05-31 14:42:14', '2026-05-31 14:42:14');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_lesson_progress`
--

CREATE TABLE `user_lesson_progress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `completed` tinyint(1) DEFAULT 0,
  `quiz_completed` tinyint(1) DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_lesson_progress`
--

INSERT INTO `user_lesson_progress` (`id`, `user_id`, `lesson_id`, `completed`, `quiz_completed`, `updated_at`) VALUES
(1, 4, 1, 1, 1, '2026-05-30 12:46:18'),
(2, 4, 2, 1, 1, '2026-05-30 16:38:28'),
(6, 4, 13, 1, 1, '2026-05-30 16:48:22'),
(8, 4, 3, 1, 1, '2026-05-30 16:53:55'),
(9, 4, 14, 1, 1, '2026-05-30 17:04:26'),
(10, 4, 15, 1, 1, '2026-05-30 17:04:57'),
(11, 4, 25, 1, 1, '2026-05-30 17:15:48'),
(12, 4, 26, 1, 1, '2026-05-30 17:16:06'),
(13, 4, 4, 1, 1, '2026-05-30 17:39:07'),
(14, 4, 16, 1, 1, '2026-05-30 17:39:43'),
(15, 4, 17, 1, 1, '2026-05-30 17:40:03'),
(16, 4, 5, 1, 1, '2026-05-30 19:27:27'),
(17, 4, 6, 1, 1, '2026-05-30 19:27:40'),
(18, 4, 7, 1, 1, '2026-05-30 19:27:55'),
(19, 4, 8, 1, 1, '2026-05-30 19:28:07'),
(20, 4, 9, 1, 1, '2026-05-30 19:28:19'),
(21, 4, 10, 1, 1, '2026-05-30 19:28:30'),
(22, 4, 11, 1, 1, '2026-05-30 19:28:42'),
(23, 4, 12, 1, 1, '2026-05-30 19:29:02'),
(24, 4, 27, 1, 1, '2026-05-31 10:15:40'),
(25, 4, 28, 1, 1, '2026-05-31 12:04:45'),
(26, 4, 18, 1, 1, '2026-05-31 12:25:49'),
(27, 4, 19, 1, 1, '2026-05-31 12:29:30'),
(28, 4, 20, 1, 1, '2026-05-31 12:29:52'),
(29, 4, 21, 1, 1, '2026-05-31 12:45:21'),
(30, 4, 29, 1, 1, '2026-05-31 12:47:07'),
(31, 4, 22, 1, 1, '2026-05-31 13:18:32'),
(32, 4, 23, 1, 1, '2026-05-31 14:16:01'),
(33, 4, 24, 1, 1, '2026-05-31 14:16:22'),
(34, 4, 30, 1, 1, '2026-05-31 14:19:55'),
(35, 4, 31, 1, 1, '2026-05-31 14:21:55'),
(36, 4, 32, 1, 1, '2026-05-31 14:22:15'),
(37, 4, 33, 1, 1, '2026-05-31 14:22:31'),
(38, 4, 34, 1, 1, '2026-05-31 14:22:49'),
(39, 4, 35, 1, 1, '2026-05-31 14:23:08'),
(40, 4, 36, 1, 1, '2026-05-31 14:23:30'),
(41, 2, 1, 1, 1, '2026-06-07 16:10:56'),
(42, 2, 2, 1, 1, '2026-06-07 16:11:24');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_metrics`
--

CREATE TABLE `user_metrics` (
  `user_id` int(11) NOT NULL,
  `votes_count` int(11) DEFAULT 0,
  `survey_completed` int(11) DEFAULT 0,
  `opinions_written` int(11) DEFAULT 0,
  `courses_completed` int(11) DEFAULT 0,
  `modules_completed` int(11) DEFAULT 0,
  `comments_count` int(11) DEFAULT 0,
  `lessons_completed` int(11) DEFAULT 0,
  `achievements_unlocked` int(11) DEFAULT 0,
  `created_surveys` int(11) DEFAULT 0,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `mps_rated` int(11) DEFAULT 0,
  `clubs_rated_count` int(11) DEFAULT 0,
  `club_rated_ko` smallint(6) DEFAULT 0,
  `club_rated_lewica` smallint(6) DEFAULT 0,
  `club_rated_razem` smallint(6) DEFAULT 0,
  `club_rated_psl_td` smallint(6) DEFAULT 0,
  `club_rated_polska2050` smallint(6) DEFAULT 0,
  `club_rated_pis` smallint(6) DEFAULT 0,
  `club_rated_konfederacja` smallint(6) DEFAULT 0,
  `club_rated_konfederacja_kp` smallint(6) DEFAULT 0,
  `club_rated_centrum` smallint(6) DEFAULT 0,
  `club_rated_demokracja` smallint(6) DEFAULT 0,
  `coalition_rated` smallint(6) DEFAULT 0,
  `opposition_rated` smallint(6) DEFAULT 0,
  `opinions_endorsed` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_metrics`
--

INSERT INTO `user_metrics` (`user_id`, `votes_count`, `survey_completed`, `opinions_written`, `courses_completed`, `modules_completed`, `comments_count`, `lessons_completed`, `achievements_unlocked`, `created_surveys`, `updated_at`, `mps_rated`, `clubs_rated_count`, `club_rated_ko`, `club_rated_lewica`, `club_rated_razem`, `club_rated_psl_td`, `club_rated_polska2050`, `club_rated_pis`, `club_rated_konfederacja`, `club_rated_konfederacja_kp`, `club_rated_centrum`, `club_rated_demokracja`, `coalition_rated`, `opposition_rated`, `opinions_endorsed`) VALUES
(2, 0, 1, 2, 0, 12, 0, 2, 0, 0, '2026-06-07 18:11:25', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3),
(4, 0, 77, 6, 7, 81, 0, 13, 0, 0, '2026-06-07 17:35:13', 13, 3, 1, 0, 0, 0, 1, 5, 0, 3, 0, 1, 2, 9, 0),
(7, 0, 1, 0, 0, 0, 0, 0, 0, 0, '2026-05-17 16:49:42', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(8, 0, 4, 0, 0, 0, 0, 0, 0, 0, '2026-05-19 21:16:28', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(9, 0, 1, 0, 0, 0, 0, 0, 0, 0, '2026-05-19 21:18:44', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(10, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2026-06-07 17:21:30', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(11, 0, 0, 1, 0, 0, 0, 0, 0, 0, '2026-06-07 17:28:44', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_module_progress`
--

CREATE TABLE `user_module_progress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `module_index` int(11) NOT NULL,
  `completed` tinyint(1) DEFAULT 0,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_module_progress`
--

INSERT INTO `user_module_progress` (`id`, `user_id`, `lesson_id`, `module_index`, `completed`, `updated_at`) VALUES
(1, 4, 1, 0, 1, '2026-05-30 16:23:51'),
(7, 4, 1, 1, 1, '2026-05-30 16:23:51'),
(8, 4, 1, 2, 1, '2026-05-30 16:23:51'),
(10, 4, 2, 0, 1, '2026-05-30 16:31:56'),
(14, 4, 2, 1, 1, '2026-05-30 16:38:36'),
(15, 4, 2, 2, 1, '2026-05-30 16:38:37'),
(16, 4, 3, 0, 1, '2026-05-30 16:45:12'),
(17, 4, 3, 1, 1, '2026-05-30 16:45:13'),
(18, 4, 3, 2, 1, '2026-05-30 16:45:14'),
(48, 4, 14, 0, 1, '2026-05-30 17:03:54'),
(49, 4, 13, 0, 1, '2026-05-30 17:04:09'),
(50, 4, 13, 1, 1, '2026-05-30 17:04:10'),
(51, 4, 13, 2, 1, '2026-05-30 17:04:11'),
(52, 4, 14, 1, 1, '2026-05-30 17:04:18'),
(53, 4, 14, 2, 1, '2026-05-30 17:04:19'),
(54, 4, 15, 0, 1, '2026-05-30 17:04:40'),
(55, 4, 15, 1, 1, '2026-05-30 17:04:41'),
(56, 4, 15, 2, 1, '2026-05-30 17:04:42'),
(57, 4, 16, 0, 1, '2026-05-30 17:06:04'),
(58, 4, 25, 0, 1, '2026-05-30 17:11:56'),
(78, 4, 25, 1, 1, '2026-05-30 17:15:37'),
(79, 4, 25, 2, 1, '2026-05-30 17:15:40'),
(80, 4, 26, 0, 1, '2026-05-30 17:15:54'),
(83, 4, 26, 1, 1, '2026-05-30 17:15:58'),
(85, 4, 26, 2, 1, '2026-05-30 17:16:00'),
(86, 4, 4, 0, 1, '2026-05-30 17:26:08'),
(87, 4, 4, 1, 1, '2026-05-30 17:26:10'),
(88, 4, 4, 2, 1, '2026-05-30 17:26:12'),
(89, 4, 16, 1, 1, '2026-05-30 17:39:29'),
(90, 4, 16, 2, 1, '2026-05-30 17:39:31'),
(91, 4, 17, 0, 1, '2026-05-30 17:39:50'),
(92, 4, 17, 1, 1, '2026-05-30 17:39:52'),
(93, 4, 17, 2, 1, '2026-05-30 17:39:54'),
(94, 4, 5, 0, 1, '2026-05-30 19:27:16'),
(95, 4, 5, 1, 1, '2026-05-30 19:27:17'),
(96, 4, 5, 2, 1, '2026-05-30 19:27:18'),
(97, 4, 6, 0, 1, '2026-05-30 19:27:28'),
(98, 4, 6, 1, 1, '2026-05-30 19:27:29'),
(99, 4, 6, 2, 1, '2026-05-30 19:27:31'),
(100, 4, 7, 0, 1, '2026-05-30 19:27:42'),
(101, 4, 7, 1, 1, '2026-05-30 19:27:43'),
(102, 4, 7, 2, 1, '2026-05-30 19:27:44'),
(103, 4, 8, 0, 1, '2026-05-30 19:27:56'),
(104, 4, 8, 1, 1, '2026-05-30 19:27:58'),
(105, 4, 8, 2, 1, '2026-05-30 19:27:59'),
(106, 4, 9, 0, 1, '2026-05-30 19:28:08'),
(107, 4, 9, 1, 1, '2026-05-30 19:28:09'),
(108, 4, 9, 2, 1, '2026-05-30 19:28:11'),
(109, 4, 10, 0, 1, '2026-05-30 19:28:20'),
(110, 4, 10, 1, 1, '2026-05-30 19:28:21'),
(111, 4, 10, 2, 1, '2026-05-30 19:28:23'),
(112, 4, 11, 0, 1, '2026-05-30 19:28:32'),
(113, 4, 11, 1, 1, '2026-05-30 19:28:33'),
(114, 4, 11, 2, 1, '2026-05-30 19:28:34'),
(115, 4, 12, 0, 1, '2026-05-30 19:28:45'),
(116, 4, 12, 1, 1, '2026-05-30 19:28:48'),
(117, 4, 12, 2, 1, '2026-05-30 19:28:50'),
(118, 4, 18, 0, 1, '2026-05-30 19:35:19'),
(126, 4, 27, 0, 1, '2026-05-31 09:31:28'),
(127, 4, 27, 1, 1, '2026-05-31 09:31:30'),
(128, 4, 27, 2, 1, '2026-05-31 09:31:32'),
(129, 4, 27, 3, 1, '2026-05-31 09:47:42'),
(130, 4, 27, 4, 1, '2026-05-31 09:47:43'),
(131, 4, 27, 5, 1, '2026-05-31 09:47:44'),
(132, 4, 18, 1, 1, '2026-05-31 11:41:08'),
(133, 4, 18, 2, 1, '2026-05-31 11:41:09'),
(134, 4, 18, 3, 1, '2026-05-31 11:41:10'),
(135, 4, 18, 4, 1, '2026-05-31 11:41:12'),
(136, 4, 18, 5, 1, '2026-05-31 11:42:01'),
(138, 4, 1, 3, 1, '2026-05-31 11:53:40'),
(139, 4, 1, 4, 1, '2026-05-31 11:53:41'),
(140, 4, 1, 5, 1, '2026-05-31 11:53:42'),
(141, 4, 28, 0, 1, '2026-05-31 12:04:28'),
(142, 4, 28, 1, 1, '2026-05-31 12:04:29'),
(143, 4, 28, 2, 1, '2026-05-31 12:04:30'),
(144, 4, 28, 3, 1, '2026-05-31 12:04:33'),
(145, 4, 28, 4, 1, '2026-05-31 12:04:35'),
(146, 4, 28, 5, 1, '2026-05-31 12:04:36'),
(147, 4, 19, 0, 1, '2026-05-31 12:25:51'),
(149, 4, 19, 1, 1, '2026-05-31 12:26:50'),
(150, 4, 19, 2, 1, '2026-05-31 12:27:09'),
(151, 4, 19, 3, 1, '2026-05-31 12:28:12'),
(152, 4, 19, 4, 1, '2026-05-31 12:28:16'),
(153, 4, 19, 5, 1, '2026-05-31 12:28:27'),
(154, 4, 20, 0, 1, '2026-05-31 12:29:37'),
(155, 4, 20, 1, 1, '2026-05-31 12:29:38'),
(156, 4, 20, 2, 1, '2026-05-31 12:29:39'),
(157, 4, 20, 3, 1, '2026-05-31 12:29:40'),
(158, 4, 20, 4, 1, '2026-05-31 12:29:41'),
(159, 4, 20, 5, 1, '2026-05-31 12:29:42'),
(160, 4, 21, 0, 1, '2026-05-31 12:41:32'),
(161, 4, 21, 1, 1, '2026-05-31 12:41:36'),
(162, 4, 21, 2, 1, '2026-05-31 12:41:37'),
(163, 4, 21, 3, 1, '2026-05-31 12:41:55'),
(164, 4, 21, 4, 1, '2026-05-31 12:41:56'),
(165, 4, 21, 5, 1, '2026-05-31 12:41:57'),
(166, 4, 29, 0, 1, '2026-05-31 12:43:24'),
(167, 4, 22, 0, 1, '2026-05-31 12:45:26'),
(168, 4, 29, 1, 1, '2026-05-31 12:46:53'),
(169, 4, 29, 2, 1, '2026-05-31 12:46:55'),
(170, 4, 29, 3, 1, '2026-05-31 12:46:56'),
(171, 4, 29, 4, 1, '2026-05-31 12:46:57'),
(172, 4, 29, 5, 1, '2026-05-31 12:46:59'),
(173, 4, 22, 1, 1, '2026-05-31 12:48:54'),
(174, 4, 22, 2, 1, '2026-05-31 12:48:54'),
(175, 4, 22, 3, 1, '2026-05-31 12:49:18'),
(176, 4, 22, 4, 1, '2026-05-31 12:49:19'),
(177, 4, 22, 5, 1, '2026-05-31 12:49:20'),
(178, 4, 30, 0, 1, '2026-05-31 13:09:01'),
(179, 4, 30, 1, 1, '2026-05-31 13:09:03'),
(180, 4, 30, 2, 1, '2026-05-31 13:09:04'),
(181, 4, 30, 3, 1, '2026-05-31 13:09:05'),
(182, 4, 30, 4, 1, '2026-05-31 13:09:06'),
(183, 4, 30, 5, 1, '2026-05-31 13:09:08'),
(184, 4, 23, 0, 1, '2026-05-31 14:15:45'),
(185, 4, 23, 1, 1, '2026-05-31 14:15:46'),
(186, 4, 23, 2, 1, '2026-05-31 14:15:47'),
(187, 4, 23, 3, 1, '2026-05-31 14:15:48'),
(188, 4, 23, 4, 1, '2026-05-31 14:15:49'),
(189, 4, 23, 5, 1, '2026-05-31 14:15:50'),
(190, 4, 24, 0, 1, '2026-05-31 14:16:02'),
(191, 4, 24, 1, 1, '2026-05-31 14:16:03'),
(193, 4, 24, 2, 1, '2026-05-31 14:16:05'),
(194, 4, 24, 3, 1, '2026-05-31 14:16:06'),
(195, 4, 24, 4, 1, '2026-05-31 14:16:07'),
(196, 4, 24, 5, 1, '2026-05-31 14:16:08'),
(197, 4, 31, 0, 1, '2026-05-31 14:21:39'),
(198, 4, 31, 1, 1, '2026-05-31 14:21:40'),
(199, 4, 31, 2, 1, '2026-05-31 14:21:41'),
(200, 4, 31, 3, 1, '2026-05-31 14:21:42'),
(201, 4, 31, 4, 1, '2026-05-31 14:21:43'),
(202, 4, 31, 5, 1, '2026-05-31 14:21:44'),
(203, 4, 32, 0, 1, '2026-05-31 14:21:58'),
(204, 4, 32, 1, 1, '2026-05-31 14:21:59'),
(205, 4, 32, 2, 1, '2026-05-31 14:22:00'),
(206, 4, 32, 3, 1, '2026-05-31 14:22:01'),
(207, 4, 32, 4, 1, '2026-05-31 14:22:02'),
(208, 4, 32, 5, 1, '2026-05-31 14:22:03'),
(209, 4, 33, 0, 1, '2026-05-31 14:22:17'),
(210, 4, 33, 1, 1, '2026-05-31 14:22:18'),
(211, 4, 33, 2, 1, '2026-05-31 14:22:19'),
(212, 4, 33, 3, 1, '2026-05-31 14:22:20'),
(213, 4, 33, 4, 1, '2026-05-31 14:22:20'),
(214, 4, 33, 5, 1, '2026-05-31 14:22:21'),
(215, 4, 34, 0, 1, '2026-05-31 14:22:33'),
(216, 4, 34, 1, 1, '2026-05-31 14:22:34'),
(217, 4, 34, 2, 1, '2026-05-31 14:22:35'),
(218, 4, 34, 3, 1, '2026-05-31 14:22:36'),
(219, 4, 34, 4, 1, '2026-05-31 14:22:37'),
(220, 4, 34, 5, 1, '2026-05-31 14:22:38'),
(221, 4, 35, 0, 1, '2026-05-31 14:22:51'),
(222, 4, 35, 1, 1, '2026-05-31 14:22:52'),
(223, 4, 35, 2, 1, '2026-05-31 14:22:53'),
(224, 4, 35, 3, 1, '2026-05-31 14:22:54'),
(225, 4, 35, 4, 1, '2026-05-31 14:22:54'),
(226, 4, 35, 5, 1, '2026-05-31 14:22:55'),
(227, 4, 36, 0, 1, '2026-05-31 14:23:09'),
(228, 4, 36, 1, 1, '2026-05-31 14:23:10'),
(229, 4, 36, 2, 1, '2026-05-31 14:23:11'),
(230, 4, 36, 3, 1, '2026-05-31 14:23:12'),
(231, 4, 36, 4, 1, '2026-05-31 14:23:13'),
(232, 4, 36, 5, 1, '2026-05-31 14:23:14'),
(235, 4, 7, 3, 1, '2026-06-04 14:58:19'),
(236, 4, 7, 4, 1, '2026-06-04 14:58:22'),
(237, 4, 7, 5, 1, '2026-06-04 14:58:27'),
(238, 2, 1, 0, 1, '2026-06-07 16:10:42'),
(239, 2, 1, 1, 1, '2026-06-07 16:10:43'),
(240, 2, 1, 2, 1, '2026-06-07 16:10:44'),
(241, 2, 1, 3, 1, '2026-06-07 16:10:45'),
(242, 2, 1, 4, 1, '2026-06-07 16:10:46'),
(243, 2, 1, 5, 1, '2026-06-07 16:10:47'),
(244, 2, 2, 0, 1, '2026-06-07 16:11:09'),
(245, 2, 2, 1, 1, '2026-06-07 16:11:10'),
(246, 2, 2, 2, 1, '2026-06-07 16:11:12'),
(247, 2, 2, 3, 1, '2026-06-07 16:11:13'),
(248, 2, 2, 4, 1, '2026-06-07 16:11:14'),
(249, 2, 2, 5, 1, '2026-06-07 16:11:15');

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
(0, 4, '[{\"id\":\"747b5163-f09d-4b3a-8ade-f2241d216095\",\"slug\":\"members_of_parliament\",\"accent\":\"blue\",\"icon\":\"userGroup\",\"iconColor\":\"blue\"},{\"id\":\"1abe991b-28ae-4c82-9fb8-a9ed7a09615f\",\"slug\":\"senators\",\"accent\":\"indigo\",\"icon\":\"user\",\"iconColor\":\"indigo\"},{\"id\":\"0e5d50fb-644b-44a6-9061-830823171c6f\",\"slug\":\"presidential_chancellery\",\"accent\":\"teal\",\"icon\":\"briefcase\",\"iconColor\":\"teal\"},{\"id\":\"7f6a0d6b-914d-44bd-b9eb-e5320fb526d8\",\"slug\":\"council_of_ministers\",\"accent\":\"rose\",\"icon\":\"ministry\",\"iconColor\":\"rose\"},{\"id\":\"af0d5b7d-2263-45f5-ab46-6ddcf61a07fc\",\"slug\":\"constitutional_tribunal\",\"accent\":\"yellow\",\"icon\":\"courses\",\"iconColor\":\"yellow\"},{\"id\":\"894aba71-47f2-4f95-9658-9835f8102056\",\"slug\":\"supreme_administrative_court\",\"accent\":\"cyan\",\"icon\":\"ministry\",\"iconColor\":\"cyan\"},{\"id\":\"7cd0f09e-daa1-440d-a377-22d2fc5b08fe\",\"slug\":\"ministry_of_national_defence\",\"accent\":\"cyan\",\"icon\":\"shield\",\"iconColor\":\"cyan\"},{\"id\":\"4dfbd2de-3ba5-4586-a3d9-22748393d449\",\"slug\":\"ministry_of_health\",\"accent\":\"red-gradient\",\"icon\":\"heart\",\"iconColor\":\"red-gradient\"},{\"id\":\"be9dc1ad-71dc-409c-9567-0ec96f60a947\",\"slug\":\"president\",\"accent\":\"red\",\"icon\":\"flag\",\"iconColor\":\"red\"},{\"id\":\"7c26790f-d4ad-40cf-b93c-f4cc7b6c8100\",\"slug\":\"ministry_of_digital_affairs\",\"accent\":\"amber-gradient\",\"icon\":\"computer\",\"iconColor\":\"amber-gradient\"},{\"id\":\"0c3bc69f-53ff-4d98-af6e-b29ecb9289ba\",\"slug\":\"ministry_of_internal_affairs_and_administration\",\"accent\":\"cyan-gradient\",\"icon\":\"tablet\",\"iconColor\":\"cyan-gradient\"},{\"id\":\"c2001763-06b9-41b3-b37e-22399647828a\",\"slug\":\"ministry_of_energy\",\"accent\":\"yellow\",\"icon\":\"lighting\",\"iconColor\":\"yellow\"},{\"id\":\"45f0d047-7a3e-49f0-9c9e-2b0f1d1ee376\",\"slug\":\"ministry_of_education\",\"accent\":\"emerald\",\"icon\":\"courses\",\"iconColor\":\"emerald\"},{\"id\":\"6419effb-c586-403a-aba9-3f10c3393b3c\",\"slug\":\"ministry_of_funds_and_regional_policy\",\"accent\":\"pink\",\"icon\":\"euro\",\"iconColor\":\"pink\"},{\"id\":\"0c1e88ef-66b3-4e25-94dd-b673f756c02d\",\"slug\":\"ministry_of_science_and_higher_education\",\"accent\":\"lime-gradient\",\"icon\":\"courses\",\"iconColor\":\"lime-gradient\"},{\"id\":\"4ba263b4-369f-4660-910a-ae77ef9595a4\",\"slug\":\"ministry_of_family_labour_and_social_policy\",\"accent\":\"rose-gradient\",\"icon\":\"users\",\"iconColor\":\"rose-gradient\"},{\"id\":\"dc9e4ddc-122d-4ca1-ab91-59827907f35d\",\"slug\":\"ministry_of_sport_and_tourism\",\"accent\":\"cyan-gradient\",\"icon\":\"trophy\",\"iconColor\":\"cyan-gradient\"},{\"id\":\"ce487054-0fcd-4dd2-9a9f-b9f1151fdffc\",\"slug\":\"ministry_of_culture_and_national_heritage\",\"accent\":\"pink-gradient\",\"icon\":\"paintbrush\",\"iconColor\":\"pink-gradient\"},{\"id\":\"63c5d502-aac4-4aaf-a18f-ea159f4179bc\",\"slug\":\"ministry_of_state_assets\",\"accent\":\"amber-gradient\",\"icon\":\"factory\",\"iconColor\":\"amber-gradient\"},{\"id\":\"b3812956-ed51-444a-bcee-5b90f54574ea\",\"slug\":\"ministry_of_foreign_affairs\",\"accent\":\"sky-gradient\",\"icon\":\"globe\",\"iconColor\":\"sky-gradient\"},{\"id\":\"68d262ac-e8e5-4c80-93e0-4281cb1524b5\",\"slug\":\"ministry_of_infrastructure\",\"accent\":\"orange-gradient\",\"icon\":\"truck\",\"iconColor\":\"orange-gradient\"},{\"id\":\"15d3c55a-30ad-4ac2-a638-7e189e658af4\",\"slug\":\"ministry_of_finance\",\"accent\":\"emerald-gradient\",\"icon\":\"banknotes\",\"iconColor\":\"emerald-gradient\"},{\"id\":\"4c3a81ae-d0b8-4143-9d5a-457a57941fc9\",\"slug\":\"ministry_of_agriculture\",\"accent\":\"lime-gradient\",\"icon\":\"tractor\",\"iconColor\":\"lime-gradient\"},{\"id\":\"3599e96f-2e22-4aa0-8692-5515277640cc\",\"slug\":\"ministry_of_climate_and_environment\",\"accent\":\"emerald-gradient\",\"icon\":\"leaf\",\"iconColor\":\"emerald-gradient\"},{\"id\":\"840ad398-5d59-4429-8fa6-b98045527288\",\"slug\":\"ministry_of_justice\",\"accent\":\"purple-gradient\",\"icon\":\"scale\",\"iconColor\":\"purple-gradient\"},{\"id\":\"1d635667-d58c-447b-a679-839f44c43e9c\",\"slug\":\"senate\",\"accent\":\"orange\",\"icon\":\"parliament\",\"iconColor\":\"orange\"},{\"id\":\"47f21482-42cc-4f4e-b4eb-c798674ca939\",\"slug\":\"sejm\",\"accent\":\"emerald\",\"icon\":\"parliament\",\"iconColor\":\"emerald\"},{\"id\":\"ad76df76-f563-40c9-80ea-0c10cb1c4fd7\",\"slug\":\"sn\",\"accent\":\"pink\",\"icon\":\"documents\",\"iconColor\":\"pink\"},{\"id\":\"786a6480-cc7d-4967-975a-6bb6c8a19d3b\",\"slug\":\"national_council_of_the_judiciary\",\"accent\":\"teal\",\"icon\":\"ministry\",\"iconColor\":\"teal\"},{\"id\":\"5f6b2e65-8a70-47d5-82be-464d13a1b470\",\"slug\":\"parliamentary_clubs\",\"accent\":\"purple\",\"icon\":\"scale\",\"iconColor\":\"purple\"},{\"id\":\"e7db84f2-251a-4645-882a-31e3f467596d\",\"slug\":\"chancellery_of_the_prime_minister\",\"accent\":\"rose-gradient\",\"icon\":\"briefcase\",\"iconColor\":\"rose-gradient\"}]'),
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
(84, 4, 50, 'SURVEY_COMPLETED', '2026-05-17 18:27:47'),
(85, 4, 50, 'SURVEY_COMPLETED', '2026-05-18 17:25:52'),
(86, 4, 50, 'SURVEY_COMPLETED', '2026-05-18 17:26:17'),
(87, 4, 50, 'ACHIEVEMENT', '2026-05-18 17:26:17'),
(88, 4, 25, 'LOGIN_STREAK_BIG', '2026-05-18 17:51:53'),
(89, 4, 50, 'SURVEY_COMPLETED', '2026-05-18 18:05:27'),
(90, 4, 10, 'ACHIEVEMENT', '2026-05-18 18:05:27'),
(91, 4, 50, 'SURVEY_COMPLETED', '2026-05-18 18:05:56'),
(92, 4, 50, 'SURVEY_COMPLETED', '2026-05-18 18:06:07'),
(93, 4, 50, 'SURVEY_COMPLETED', '2026-05-18 18:06:10'),
(94, 4, 50, 'SURVEY_COMPLETED', '2026-05-18 18:06:20'),
(95, 4, 25, 'ACHIEVEMENT', '2026-05-18 18:06:21'),
(96, 4, 50, 'SURVEY_COMPLETED', '2026-05-18 18:11:07'),
(97, 4, 50, 'SURVEY_COMPLETED', '2026-05-18 18:11:32'),
(98, 4, 25, 'LOGIN_STREAK_BIG', '2026-05-19 18:53:10'),
(99, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 19:09:33'),
(100, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 19:25:48'),
(101, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 19:25:51'),
(102, 4, 50, 'ACHIEVEMENT', '2026-05-19 19:25:51'),
(103, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 19:32:29'),
(104, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 19:35:13'),
(105, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 19:36:11'),
(106, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 19:36:41'),
(107, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 19:36:54'),
(108, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 19:41:14'),
(109, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 19:43:20'),
(110, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 19:44:44'),
(111, 4, 20, 'ACHIEVEMENT', '2026-05-19 19:44:44'),
(112, 4, 100, 'ACHIEVEMENT', '2026-05-19 19:44:44'),
(113, 4, 300, 'ACHIEVEMENT', '2026-05-19 19:44:44'),
(114, 4, 25, 'ACHIEVEMENT', '2026-05-19 19:44:44'),
(115, 4, 50, 'ACHIEVEMENT', '2026-05-19 19:44:44'),
(116, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 19:48:12'),
(117, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 19:48:26'),
(118, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 19:49:30'),
(119, 4, 10, 'ACHIEVEMENT', '2026-05-19 19:49:31'),
(120, 4, 50, 'ACHIEVEMENT', '2026-05-19 19:49:31'),
(121, 4, 100, 'ACHIEVEMENT', '2026-05-19 19:49:31'),
(122, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 19:51:07'),
(123, 4, 50, 'SURVEY_COMPLETED', '2026-05-19 20:15:58'),
(124, 8, 50, 'SURVEY_COMPLETED', '2026-05-19 21:15:37'),
(125, 8, 10, 'ACHIEVEMENT', '2026-05-19 21:15:37'),
(126, 8, 10, 'ACHIEVEMENT', '2026-05-19 21:15:37'),
(127, 8, 50, 'SURVEY_COMPLETED', '2026-05-19 21:16:23'),
(128, 8, 20, 'ACHIEVEMENT', '2026-05-19 21:16:23'),
(129, 8, 50, 'SURVEY_COMPLETED', '2026-05-19 21:16:25'),
(130, 8, 50, 'SURVEY_COMPLETED', '2026-05-19 21:16:28'),
(131, 9, 50, 'SURVEY_COMPLETED', '2026-05-19 21:18:44'),
(132, 9, 10, 'ACHIEVEMENT', '2026-05-19 21:18:44'),
(133, 9, 10, 'ACHIEVEMENT', '2026-05-19 21:18:44'),
(134, 4, 25, 'LOGIN_STREAK_BIG', '2026-05-19 21:51:27'),
(135, 4, 25, 'LOGIN_STREAK_BIG', '2026-05-19 22:01:59'),
(136, 4, 120, 'ACHIEVEMENT', '2026-05-19 22:01:59'),
(137, 4, 25, 'LOGIN_STREAK_BIG', '2026-05-19 22:17:32'),
(138, 4, 25, 'LOGIN_STREAK_BIG', '2026-05-20 16:55:01'),
(139, 4, 50, 'SURVEY_COMPLETED', '2026-05-20 16:56:02'),
(140, 4, 50, 'SURVEY_COMPLETED', '2026-05-20 16:56:32'),
(141, 4, 100, 'ACHIEVEMENT', '2026-05-20 16:56:32'),
(142, 4, 10, 'LOGIN_STREAK_SMALL', '2026-05-26 19:41:02'),
(143, 4, 50, 'SURVEY_COMPLETED', '2026-05-26 22:11:13'),
(144, 4, 10, 'LOGIN_STREAK_SMALL', '2026-05-27 00:33:49'),
(145, 4, 50, 'SURVEY_COMPLETED', '2026-05-27 00:39:54'),
(146, 4, 50, 'SURVEY_COMPLETED', '2026-05-27 00:42:26'),
(147, 4, 50, 'SURVEY_COMPLETED', '2026-05-27 00:43:46'),
(148, 4, 50, 'SURVEY_COMPLETED', '2026-05-27 00:45:06'),
(149, 4, 50, 'SURVEY_COMPLETED', '2026-05-27 00:46:22'),
(150, 4, 10, 'LOGIN_STREAK_SMALL', '2026-05-28 17:28:48'),
(151, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 17:34:01'),
(152, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 17:37:47'),
(153, 4, 25, 'LOGIN_STREAK_BIG', '2026-05-28 17:48:35'),
(154, 4, 300, 'ACHIEVEMENT', '2026-05-28 17:48:35'),
(155, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 17:51:49'),
(156, 4, 200, 'ACHIEVEMENT', '2026-05-28 17:51:49'),
(157, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 17:57:45'),
(158, 4, 200, 'ACHIEVEMENT', '2026-05-28 17:57:45'),
(159, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 18:04:10'),
(160, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 18:07:04'),
(161, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 18:11:15'),
(162, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 18:12:23'),
(163, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 18:24:03'),
(164, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 18:24:14'),
(165, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 18:25:03'),
(166, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 18:40:01'),
(167, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 18:40:33'),
(168, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 18:43:57'),
(169, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 19:50:32'),
(170, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 19:51:12'),
(171, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 19:54:33'),
(172, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 19:57:52'),
(173, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 19:58:22'),
(174, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 19:58:33'),
(175, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 19:59:45'),
(176, 4, 50, 'SURVEY_COMPLETED', '2026-05-28 19:59:48'),
(177, 4, 25, 'LOGIN_STREAK_BIG', '2026-05-29 17:03:17'),
(178, 4, 50, 'SURVEY_COMPLETED', '2026-05-29 17:14:29'),
(179, 4, 25, 'LOGIN_STREAK_BIG', '2026-05-30 09:14:36'),
(180, 4, 25, 'LOGIN_STREAK_BIG', '2026-05-31 00:11:55'),
(181, 4, 25, 'LOGIN_STREAK_BIG', '2026-05-31 00:11:55'),
(182, 4, 25, 'LOGIN_STREAK_BIG', '2026-05-31 00:11:55'),
(183, 4, 50, 'SURVEY_COMPLETED', '2026-05-31 14:36:32'),
(184, 4, 10, 'ACHIEVEMENT', '2026-05-31 14:36:32'),
(185, 4, 5, 'ACHIEVEMENT', '2026-05-31 14:36:32'),
(186, 4, 50, 'ACHIEVEMENT', '2026-05-31 14:43:24'),
(187, 4, 50, 'SURVEY_COMPLETED', '2026-05-31 14:47:33'),
(188, 4, 50, 'SURVEY_COMPLETED', '2026-05-31 14:48:16'),
(189, 4, 50, 'SURVEY_COMPLETED', '2026-05-31 14:48:45'),
(190, 4, 150, 'ACHIEVEMENT', '2026-05-31 16:22:01'),
(191, 4, 50, 'ACHIEVEMENT', '2026-05-31 16:25:36'),
(192, 4, 150, 'ACHIEVEMENT', '2026-05-31 16:35:16'),
(193, 4, 50, 'SURVEY_COMPLETED', '2026-05-31 16:37:40'),
(194, 4, 200, 'COURSES_COMPLETED', '2026-05-31 16:46:03'),
(195, 4, 25, 'LOGIN_STREAK_BIG', '2026-06-01 00:23:13'),
(196, 4, 25, 'LOGIN_STREAK_BIG', '2026-06-01 00:23:13'),
(197, 4, 25, 'LOGIN_STREAK_BIG', '2026-06-01 00:27:56'),
(198, 4, 200, 'COURSES_COMPLETED', '2026-06-01 00:28:42'),
(199, 4, 25, 'LOGIN_STREAK_BIG', '2026-06-02 10:08:42'),
(200, 4, 25, 'LOGIN_STREAK_BIG', '2026-06-03 12:20:13'),
(201, 4, 5, 'MP_RATED', '2026-06-03 18:08:09'),
(202, 4, 5, 'MP_RATED', '2026-06-03 18:12:03'),
(203, 4, 15, 'ACHIEVEMENT', '2026-06-03 18:12:03'),
(204, 4, 5, 'MP_RATED', '2026-06-03 18:30:24'),
(205, 4, 5, 'MP_RATED', '2026-06-03 18:31:05'),
(206, 4, 5, 'MP_RATED', '2026-06-03 18:31:11'),
(207, 4, 5, 'MP_RATED', '2026-06-03 18:31:14'),
(208, 4, 100, 'ACHIEVEMENT', '2026-06-03 18:31:14'),
(209, 4, 5, 'MP_RATED', '2026-06-03 18:33:54'),
(210, 4, 5, 'MP_RATED', '2026-06-03 18:46:40'),
(211, 4, 10, 'OPINION_POSTED', '2026-06-03 19:10:31'),
(212, 4, 10, 'OPINION_POSTED', '2026-06-03 20:20:35'),
(213, 4, 50, 'ACHIEVEMENT', '2026-06-03 20:20:35'),
(214, 4, 10, 'OPINION_POSTED', '2026-06-03 20:23:00'),
(215, 4, 5, 'MP_RATED', '2026-06-03 21:35:56'),
(216, 4, 5, 'MP_RATED', '2026-06-03 21:39:24'),
(217, 4, 75, 'ACHIEVEMENT', '2026-06-03 21:39:24'),
(218, 4, 25, 'LOGIN_STREAK_BIG', '2026-06-04 00:20:07'),
(219, 4, 10, 'OPINION_POSTED', '2026-06-04 00:20:34'),
(220, 4, 5, 'MP_RATED', '2026-06-04 00:45:02'),
(221, 4, 5, 'MP_RATED', '2026-06-04 11:54:09'),
(222, 4, 5, 'MP_RATED', '2026-06-04 12:08:09'),
(223, 4, 50, 'SURVEY_COMPLETED', '2026-06-06 22:42:34'),
(224, 4, 50, 'SURVEY_COMPLETED', '2026-06-07 15:43:49'),
(225, 4, 10, 'OPINION_POSTED', '2026-06-07 17:26:56'),
(226, 11, 10, 'OPINION_POSTED', '2026-06-07 17:28:44'),
(227, 11, 10, 'ACHIEVEMENT', '2026-06-07 17:28:44'),
(228, 11, 50, 'ACHIEVEMENT', '2026-06-07 17:28:45'),
(229, 4, 10, 'OPINION_POSTED', '2026-06-07 17:35:13'),
(230, 2, 10, 'OPINION_POSTED', '2026-06-07 17:59:16'),
(231, 2, 10, 'ACHIEVEMENT', '2026-06-07 17:59:16'),
(232, 2, 50, 'ACHIEVEMENT', '2026-06-07 17:59:16'),
(233, 2, 75, 'ACHIEVEMENT', '2026-06-07 18:01:11'),
(234, 2, 10, 'OPINION_POSTED', '2026-06-07 18:05:37'),
(235, 2, 10, 'ACHIEVEMENT', '2026-06-07 18:05:37'),
(236, 2, 75, 'ACHIEVEMENT', '2026-06-07 18:05:37'),
(237, 2, 150, 'ACHIEVEMENT', '2026-06-07 18:06:05'),
(238, 2, 50, 'SURVEY_COMPLETED', '2026-06-07 18:10:21'),
(239, 2, 25, 'ACHIEVEMENT', '2026-06-07 18:10:21'),
(240, 2, 10, 'ACHIEVEMENT', '2026-06-07 18:10:42'),
(241, 2, 5, 'ACHIEVEMENT', '2026-06-07 18:10:56'),
(242, 2, 50, 'ACHIEVEMENT', '2026-06-07 18:11:13');

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
-- Indeksy dla tabeli `ban_appeals`
--
ALTER TABLE `ban_appeals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_appeal_user` (`user_id`),
  ADD KEY `fk_appeal_reviewer` (`reviewed_by`);

--
-- Indeksy dla tabeli `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `dashboard_content`
--
ALTER TABLE `dashboard_content`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `institution_follows`
--
ALTER TABLE `institution_follows`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_user_inst` (`user_id`,`institution_id`);

--
-- Indeksy dla tabeli `institution_news_cache`
--
ALTER TABLE `institution_news_cache`
  ADD PRIMARY KEY (`institution_id`);

--
-- Indeksy dla tabeli `legislation_opinions`
--
ALTER TABLE `legislation_opinions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `idx_print_num` (`print_num`);

--
-- Indeksy dla tabeli `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lessons_ibfk_1` (`course_id`);

--
-- Indeksy dla tabeli `lesson_quizzes`
--
ALTER TABLE `lesson_quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- Indeksy dla tabeli `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- Indeksy dla tabeli `mp_ratings`
--
ALTER TABLE `mp_ratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_mp` (`user_id`,`mp_id`);

--
-- Indeksy dla tabeli `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `opinion_reports`
--
ALTER TABLE `opinion_reports`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_report` (`opinion_id`,`reporter_id`),
  ADD KEY `fk_opinion` (`opinion_id`),
  ADD KEY `fk_reporter` (`reporter_id`);

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
-- Indeksy dla tabeli `user_courses`
--
ALTER TABLE `user_courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`course_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indeksy dla tabeli `user_lesson_progress`
--
ALTER TABLE `user_lesson_progress`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_lesson` (`user_id`,`lesson_id`);

--
-- Indeksy dla tabeli `user_metrics`
--
ALTER TABLE `user_metrics`
  ADD PRIMARY KEY (`user_id`);

--
-- Indeksy dla tabeli `user_module_progress`
--
ALTER TABLE `user_module_progress`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_progress` (`user_id`,`lesson_id`,`module_index`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT for table `achievement_categories`
--
ALTER TABLE `achievement_categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ban_appeals`
--
ALTER TABLE `ban_appeals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dashboard_content`
--
ALTER TABLE `dashboard_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `institution_follows`
--
ALTER TABLE `institution_follows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `legislation_opinions`
--
ALTER TABLE `legislation_opinions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `lesson_quizzes`
--
ALTER TABLE `lesson_quizzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=227;

--
-- AUTO_INCREMENT for table `mp_ratings`
--
ALTER TABLE `mp_ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=354;

--
-- AUTO_INCREMENT for table `opinion_reports`
--
ALTER TABLE `opinion_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=258;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_achievements`
--
ALTER TABLE `user_achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3651;

--
-- AUTO_INCREMENT for table `user_courses`
--
ALTER TABLE `user_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_lesson_progress`
--
ALTER TABLE `user_lesson_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `user_module_progress`
--
ALTER TABLE `user_module_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=250;

--
-- AUTO_INCREMENT for table `xp_logs`
--
ALTER TABLE `xp_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `achievements`
--
ALTER TABLE `achievements`
  ADD CONSTRAINT `achievements_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `achievement_categories` (`id`);

--
-- Constraints for table `legislation_opinions`
--
ALTER TABLE `legislation_opinions`
  ADD CONSTRAINT `legislation_opinions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `lesson_quizzes`
--
ALTER TABLE `lesson_quizzes`
  ADD CONSTRAINT `lesson_quizzes_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `modules`
--
ALTER TABLE `modules`
  ADD CONSTRAINT `modules_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `mp_ratings`
--
ALTER TABLE `mp_ratings`
  ADD CONSTRAINT `mp_ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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
-- Constraints for table `user_courses`
--
ALTER TABLE `user_courses`
  ADD CONSTRAINT `user_courses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_courses_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

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
