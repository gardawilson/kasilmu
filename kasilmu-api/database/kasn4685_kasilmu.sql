-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 29, 2026 at 03:40 PM
-- Server version: 10.11.18-MariaDB-cll-lve
-- PHP Version: 8.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kasn4685_kasilmu`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` varchar(255) NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `harga_pakets`
--

CREATE TABLE `harga_pakets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kelas_id` bigint(20) UNSIGNED NOT NULL,
  `paket_id` bigint(20) UNSIGNED NOT NULL,
  `harga` decimal(12,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `harga_pakets`
--

INSERT INTO `harga_pakets` (`id`, `kelas_id`, `paket_id`, `harga`, `created_at`, `updated_at`) VALUES
(4, 7, 3, 200000.00, '2026-07-28 17:44:14', '2026-07-28 17:44:14'),
(5, 14, 3, 200000.00, '2026-08-03 00:38:19', '2026-08-03 00:38:19'),
(6, 13, 1, 250000.00, '2026-08-03 00:38:44', '2026-08-03 00:38:44'),
(7, 13, 2, 300000.00, '2026-08-03 00:38:47', '2026-08-03 00:38:47'),
(8, 12, 1, 100000.00, '2026-08-03 00:39:07', '2026-08-03 00:39:07'),
(9, 12, 3, 200000.00, '2026-08-03 00:39:10', '2026-08-03 00:39:10'),
(10, 11, 3, 200000.00, '2026-08-03 00:39:21', '2026-08-03 00:39:21'),
(11, 10, 3, 200000.00, '2026-08-03 00:39:34', '2026-08-03 00:39:34'),
(12, 9, 3, 200000.00, '2026-08-03 00:39:57', '2026-08-03 00:39:57'),
(13, 8, 3, 200000.00, '2026-08-03 00:40:09', '2026-08-03 00:40:09'),
(14, 7, 1, 100000.00, '2026-08-03 06:35:17', '2026-08-03 06:35:17'),
(15, 8, 1, 100000.00, '2026-08-03 06:35:39', '2026-08-03 06:35:39'),
(16, 15, 3, 200000.00, '2026-08-03 07:05:04', '2026-08-03 07:05:04'),
(17, 16, 3, 200000.00, '2026-08-03 07:15:56', '2026-08-03 07:15:56'),
(18, 10, 1, 100000.00, '2026-08-03 07:32:34', '2026-08-03 07:32:34'),
(19, 13, 4, 300000.00, '2026-08-03 07:52:38', '2026-08-03 07:52:38'),
(20, 17, 3, 250000.00, '2026-08-03 08:26:14', '2026-08-03 08:26:14'),
(21, 18, 3, 200000.00, '2026-08-19 04:17:53', '2026-08-19 04:17:53');

-- --------------------------------------------------------

--
-- Table structure for table `jenjangs`
--

CREATE TABLE `jenjangs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kode` varchar(20) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `urutan` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jenjangs`
--

INSERT INTO `jenjangs` (`id`, `kode`, `nama`, `urutan`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'SD', 'Sekolah Dasar', 1, 1, '2026-07-29 05:02:02', '2026-07-29 05:02:02'),
(2, 'SMP', 'Sekolah Menengah Pertama', 2, 1, '2026-07-29 05:02:02', '2026-07-29 05:02:02'),
(3, 'SMA', 'Sekolah Menengah Atas', 3, 1, '2026-07-29 05:02:02', '2026-07-29 05:02:02'),
(4, 'TK', 'Taman Kanak', 0, 1, '2026-08-03 00:24:16', '2026-08-03 00:24:16');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` smallint(5) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `mata_pelajaran` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `kapasitas` int(11) NOT NULL DEFAULT 0,
  `tarif_per_pertemuan` decimal(12,2) NOT NULL DEFAULT 0.00,
  `ruang` varchar(50) DEFAULT NULL,
  `status` enum('aktif','selesai') NOT NULL DEFAULT 'aktif',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id`, `nama`, `mata_pelajaran`, `deskripsi`, `kapasitas`, `tarif_per_pertemuan`, `ruang`, `status`, `created_at`, `updated_at`) VALUES
(7, 'KELAS 1-2', 'MM & Eng', NULL, 20, 0.00, NULL, 'aktif', '2026-07-28 17:43:05', '2026-08-03 00:40:22'),
(8, 'KELAS 3-4', 'MATH & ENG', NULL, 20, 0.00, NULL, 'aktif', '2026-08-03 00:23:43', '2026-08-03 00:23:43'),
(9, 'KELAS 5-6', 'MATH & ENG', NULL, 20, 0.00, NULL, 'aktif', '2026-08-03 00:23:57', '2026-08-03 00:23:57'),
(10, 'KELAS 7', 'MATH & ENG', NULL, 20, 0.00, NULL, 'aktif', '2026-08-03 00:24:06', '2026-08-03 00:24:06'),
(11, 'KELAS 8', 'MATH & ENG', NULL, 20, 0.00, NULL, 'aktif', '2026-08-03 00:24:17', '2026-08-03 00:24:17'),
(12, 'KELAS 9', 'MATH & ENG', NULL, 20, 0.00, NULL, 'aktif', '2026-08-03 00:24:29', '2026-08-03 00:24:29'),
(13, 'KELAS PRIVATE', 'MATH & ENG', NULL, 20, 0.00, NULL, 'aktif', '2026-08-03 00:24:41', '2026-08-03 00:24:41'),
(14, 'KELAS TK', 'CALISTUNG', NULL, 20, 0.00, NULL, 'aktif', '2026-08-03 00:24:55', '2026-08-03 00:24:55'),
(15, 'KELAS 3-4 B', 'MATH & ENG', NULL, 20, 0.00, NULL, 'aktif', '2026-08-03 07:04:04', '2026-08-03 07:04:04'),
(16, 'KELAS SD SORE', 'MATH & ENG', NULL, 20, 0.00, NULL, 'aktif', '2026-08-03 07:15:47', '2026-08-03 07:15:47'),
(17, 'KELAS SMA', 'MATH & ENG', NULL, 20, 0.00, NULL, 'aktif', '2026-08-03 08:26:04', '2026-08-03 08:26:04'),
(18, 'KELAS SD SORE II', 'MM & ENG', NULL, 20, 0.00, NULL, 'aktif', '2026-08-19 00:30:18', '2026-08-19 00:30:18');

-- --------------------------------------------------------

--
-- Table structure for table `kelas_siswa`
--

CREATE TABLE `kelas_siswa` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kelas_id` bigint(20) UNSIGNED NOT NULL,
  `siswa_id` bigint(20) UNSIGNED NOT NULL,
  `tgl_masuk` date NOT NULL,
  `tgl_keluar` date DEFAULT NULL,
  `status` enum('aktif','pindah','lulus') NOT NULL DEFAULT 'aktif',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kelas_siswa`
--

INSERT INTO `kelas_siswa` (`id`, `kelas_id`, `siswa_id`, `tgl_masuk`, `tgl_keluar`, `status`, `created_at`, `updated_at`) VALUES
(15, 7, 13, '2026-07-13', NULL, 'aktif', '2026-08-03 00:30:33', '2026-08-03 00:30:33'),
(18, 7, 16, '2026-08-03', NULL, 'aktif', '2026-08-03 00:34:40', '2026-08-03 00:34:40'),
(19, 7, 17, '2026-07-13', NULL, 'aktif', '2026-08-03 00:46:36', '2026-08-03 00:46:36'),
(21, 7, 12, '2026-08-03', NULL, 'aktif', '2026-08-03 00:50:51', '2026-08-03 00:50:51'),
(23, 7, 19, '2026-07-14', NULL, 'aktif', '2026-08-03 06:37:38', '2026-08-03 06:37:38'),
(26, 7, 22, '2026-07-13', NULL, 'aktif', '2026-08-03 06:40:31', '2026-08-03 06:40:31'),
(27, 7, 23, '2026-07-14', NULL, 'aktif', '2026-08-03 06:41:17', '2026-08-03 06:41:17'),
(28, 7, 24, '2026-07-13', NULL, 'aktif', '2026-08-03 06:42:01', '2026-08-03 06:42:01'),
(29, 7, 25, '2026-08-14', NULL, 'aktif', '2026-08-03 06:43:49', '2026-08-03 06:43:49'),
(31, 7, 27, '2026-08-20', NULL, 'aktif', '2026-08-03 06:45:27', '2026-08-03 06:45:27'),
(33, 8, 29, '2026-07-27', NULL, 'aktif', '2026-08-03 06:46:48', '2026-08-03 06:46:48'),
(34, 8, 30, '2026-07-13', NULL, 'aktif', '2026-08-03 06:47:29', '2026-08-03 06:47:29'),
(35, 8, 31, '2026-07-13', NULL, 'aktif', '2026-08-03 06:48:51', '2026-08-03 06:48:51'),
(36, 8, 32, '2026-08-13', NULL, 'aktif', '2026-08-03 06:50:45', '2026-08-03 06:50:45'),
(37, 8, 33, '2026-07-22', NULL, 'aktif', '2026-08-03 06:51:48', '2026-08-03 06:51:48'),
(38, 8, 34, '2026-07-14', NULL, 'aktif', '2026-08-03 06:52:53', '2026-08-03 06:52:53'),
(39, 8, 35, '2026-07-13', NULL, 'aktif', '2026-08-03 06:53:48', '2026-08-03 06:53:48'),
(40, 8, 36, '2026-07-14', NULL, 'aktif', '2026-08-03 06:54:20', '2026-08-03 06:54:20'),
(41, 8, 37, '2026-07-14', NULL, 'aktif', '2026-08-03 06:55:03', '2026-08-03 06:55:03'),
(42, 8, 38, '2026-07-14', NULL, 'aktif', '2026-08-03 06:55:39', '2026-08-03 06:55:39'),
(46, 8, 42, '2026-07-15', NULL, 'aktif', '2026-08-03 06:58:50', '2026-08-03 06:58:50'),
(48, 8, 44, '2026-07-20', NULL, 'aktif', '2026-08-03 07:00:13', '2026-08-03 07:00:13'),
(49, 8, 45, '2026-07-21', NULL, 'aktif', '2026-08-03 07:00:54', '2026-08-03 07:00:54'),
(50, 8, 46, '2026-07-13', NULL, 'aktif', '2026-08-03 07:01:38', '2026-08-03 07:01:38'),
(53, 15, 51, '2026-07-20', NULL, 'aktif', '2026-08-03 07:09:49', '2026-08-03 07:09:49'),
(54, 15, 52, '2026-07-22', NULL, 'aktif', '2026-08-03 07:10:45', '2026-08-03 07:10:45'),
(55, 15, 53, '2026-07-20', NULL, 'aktif', '2026-08-03 07:11:43', '2026-08-03 07:11:43'),
(56, 15, 54, '2026-07-22', NULL, 'aktif', '2026-08-03 07:12:33', '2026-08-03 07:12:33'),
(57, 15, 55, '2026-07-27', NULL, 'aktif', '2026-08-03 07:14:55', '2026-08-03 07:14:55'),
(58, 16, 56, '2026-07-13', NULL, 'aktif', '2026-08-03 07:16:33', '2026-08-03 07:16:33'),
(59, 9, 57, '2026-07-14', NULL, 'aktif', '2026-08-03 07:17:05', '2026-08-03 07:17:05'),
(60, 9, 58, '2026-07-14', NULL, 'aktif', '2026-08-03 07:17:44', '2026-08-03 07:17:44'),
(61, 9, 59, '2026-07-21', NULL, 'aktif', '2026-08-03 07:18:26', '2026-08-03 07:18:26'),
(62, 9, 60, '2026-07-13', NULL, 'aktif', '2026-08-03 07:19:03', '2026-08-03 07:19:03'),
(63, 9, 61, '2026-07-22', NULL, 'aktif', '2026-08-03 07:19:36', '2026-08-03 07:19:36'),
(64, 9, 62, '2026-07-21', NULL, 'aktif', '2026-08-03 07:20:11', '2026-08-03 07:20:11'),
(65, 9, 63, '2026-07-20', NULL, 'aktif', '2026-08-03 07:20:39', '2026-08-03 07:20:39'),
(69, 16, 67, '2026-07-15', NULL, 'aktif', '2026-08-03 07:24:18', '2026-08-03 07:24:18'),
(70, 16, 68, '2026-07-14', NULL, 'aktif', '2026-08-03 07:24:48', '2026-08-03 07:24:48'),
(71, 16, 69, '2026-07-13', NULL, 'aktif', '2026-08-03 07:25:27', '2026-08-03 07:25:27'),
(72, 16, 70, '2026-07-20', NULL, 'aktif', '2026-08-03 07:26:55', '2026-08-03 07:26:55'),
(73, 16, 71, '2026-07-20', NULL, 'aktif', '2026-08-03 07:27:22', '2026-08-03 07:27:22'),
(74, 10, 72, '2026-07-20', NULL, 'aktif', '2026-08-03 07:27:58', '2026-08-03 07:27:58'),
(75, 10, 73, '2026-07-20', NULL, 'aktif', '2026-08-03 07:28:32', '2026-08-03 07:28:32'),
(76, 10, 74, '2026-07-27', NULL, 'aktif', '2026-08-03 07:29:03', '2026-08-03 07:29:03'),
(77, 10, 75, '2026-07-21', NULL, 'aktif', '2026-08-03 07:29:36', '2026-08-03 07:29:36'),
(78, 10, 76, '2026-07-20', NULL, 'aktif', '2026-08-03 07:30:08', '2026-08-03 07:30:08'),
(79, 10, 77, '2026-07-13', NULL, 'aktif', '2026-08-03 07:30:48', '2026-08-03 07:30:48'),
(80, 10, 78, '2026-07-13', NULL, 'aktif', '2026-08-03 07:33:10', '2026-08-03 07:33:10'),
(81, 10, 79, '2026-07-24', NULL, 'aktif', '2026-08-03 07:33:52', '2026-08-03 07:33:52'),
(82, 11, 80, '2026-07-14', NULL, 'aktif', '2026-08-03 07:34:41', '2026-08-03 07:34:41'),
(84, 11, 82, '2026-07-13', NULL, 'aktif', '2026-08-03 07:35:39', '2026-08-03 07:35:39'),
(85, 11, 83, '2026-07-13', NULL, 'aktif', '2026-08-03 07:36:10', '2026-08-03 07:36:10'),
(86, 11, 84, '2026-07-22', NULL, 'aktif', '2026-08-03 07:36:43', '2026-08-03 07:36:43'),
(87, 11, 85, '2026-07-27', NULL, 'aktif', '2026-08-03 07:37:10', '2026-08-03 07:37:10'),
(88, 11, 86, '2026-07-20', NULL, 'aktif', '2026-08-03 07:37:40', '2026-08-03 07:37:40'),
(89, 11, 87, '2026-07-13', NULL, 'aktif', '2026-08-03 07:38:10', '2026-08-03 07:38:10'),
(90, 11, 88, '2026-07-13', NULL, 'aktif', '2026-08-03 07:38:38', '2026-08-03 07:38:38'),
(91, 12, 89, '2026-07-14', NULL, 'aktif', '2026-08-03 07:39:19', '2026-08-03 07:39:19'),
(92, 12, 90, '2026-07-21', NULL, 'aktif', '2026-08-03 07:39:43', '2026-08-03 07:39:43'),
(93, 12, 91, '2026-07-20', NULL, 'aktif', '2026-08-03 07:40:37', '2026-08-03 07:40:37'),
(94, 12, 92, '2026-07-14', NULL, 'aktif', '2026-08-03 07:41:09', '2026-08-03 07:41:09'),
(95, 12, 93, '2026-07-20', NULL, 'aktif', '2026-08-03 07:42:09', '2026-08-03 07:42:09'),
(96, 12, 94, '2026-07-13', NULL, 'aktif', '2026-08-03 07:43:05', '2026-08-03 07:43:05'),
(97, 13, 95, '2026-07-15', NULL, 'aktif', '2026-08-03 07:44:16', '2026-08-03 07:44:16'),
(98, 13, 96, '2026-07-15', NULL, 'aktif', '2026-08-03 07:44:52', '2026-08-03 07:44:52'),
(99, 13, 97, '2026-07-15', NULL, 'aktif', '2026-08-03 07:45:19', '2026-08-03 07:45:19'),
(100, 13, 98, '2026-07-15', NULL, 'aktif', '2026-08-03 07:45:51', '2026-08-03 07:45:51'),
(101, 13, 99, '2026-07-21', NULL, 'aktif', '2026-08-03 07:46:21', '2026-08-03 07:46:21'),
(102, 13, 100, '2026-07-22', NULL, 'aktif', '2026-08-03 07:47:04', '2026-08-03 07:47:04'),
(103, 13, 101, '2026-07-14', NULL, 'aktif', '2026-08-03 07:47:41', '2026-08-03 07:47:41'),
(104, 13, 102, '2026-07-14', NULL, 'aktif', '2026-08-03 07:48:14', '2026-08-03 07:48:14'),
(105, 13, 103, '2026-07-14', NULL, 'aktif', '2026-08-03 07:48:59', '2026-08-03 07:48:59'),
(106, 13, 104, '2026-07-14', NULL, 'aktif', '2026-08-03 07:49:25', '2026-08-03 07:49:25'),
(107, 13, 105, '2026-07-14', NULL, 'aktif', '2026-08-03 07:49:55', '2026-08-03 07:49:55'),
(108, 13, 106, '2026-07-14', NULL, 'aktif', '2026-08-03 07:50:33', '2026-08-03 07:50:33'),
(109, 13, 107, '2026-07-14', NULL, 'aktif', '2026-08-03 07:53:16', '2026-08-03 07:53:16'),
(110, 13, 108, '2026-07-14', NULL, 'aktif', '2026-08-03 07:53:57', '2026-08-03 07:53:57'),
(111, 13, 109, '2026-07-14', NULL, 'aktif', '2026-08-03 07:54:45', '2026-08-03 07:54:45'),
(112, 13, 110, '2026-07-21', NULL, 'aktif', '2026-08-03 07:55:12', '2026-08-03 07:55:12'),
(113, 13, 111, '2026-07-21', NULL, 'aktif', '2026-08-03 07:55:40', '2026-08-03 07:55:40'),
(114, 14, 112, '2026-07-13', NULL, 'aktif', '2026-08-03 07:56:20', '2026-08-03 07:56:20'),
(115, 14, 113, '2026-07-13', NULL, 'aktif', '2026-08-03 07:56:49', '2026-08-03 07:56:49'),
(116, 14, 114, '2026-07-21', NULL, 'aktif', '2026-08-03 07:57:18', '2026-08-03 07:57:18'),
(117, 14, 115, '2026-07-15', NULL, 'aktif', '2026-08-03 07:57:50', '2026-08-03 07:57:50'),
(119, 10, 117, '2026-08-03', NULL, 'aktif', '2026-08-03 08:13:07', '2026-08-03 08:13:07'),
(120, 10, 118, '2026-08-03', NULL, 'aktif', '2026-08-03 08:13:44', '2026-08-03 08:13:44'),
(121, 10, 119, '2026-08-03', NULL, 'aktif', '2026-08-03 08:14:38', '2026-08-03 08:14:38'),
(122, 8, 120, '2026-08-03', NULL, 'aktif', '2026-08-03 08:15:18', '2026-08-03 08:15:18'),
(123, 15, 121, '2026-08-03', NULL, 'aktif', '2026-08-03 08:16:13', '2026-08-03 08:16:13'),
(124, 7, 122, '2026-08-03', NULL, 'aktif', '2026-08-03 08:17:05', '2026-08-03 08:17:05'),
(125, 7, 123, '2026-08-03', NULL, 'aktif', '2026-08-03 08:17:29', '2026-08-03 08:17:29'),
(126, 9, 124, '2026-08-03', NULL, 'aktif', '2026-08-03 08:19:00', '2026-08-03 08:19:00'),
(127, 9, 125, '2026-08-03', NULL, 'aktif', '2026-08-03 08:19:28', '2026-08-03 08:19:28'),
(128, 17, 126, '2026-08-03', NULL, 'aktif', '2026-08-03 08:26:42', '2026-08-03 08:26:42'),
(129, 15, 127, '2026-08-04', NULL, 'aktif', '2026-08-04 23:46:41', '2026-08-04 23:46:41'),
(130, 11, 128, '2026-07-13', NULL, 'aktif', '2026-08-04 23:48:29', '2026-08-04 23:48:29'),
(131, 11, 129, '2026-08-04', NULL, 'aktif', '2026-08-05 00:47:11', '2026-08-05 00:47:11'),
(132, 16, 130, '2026-08-05', NULL, 'aktif', '2026-08-09 06:44:27', '2026-08-09 06:44:27'),
(133, 15, 131, '2026-08-06', NULL, 'aktif', '2026-08-09 06:47:21', '2026-08-09 06:47:21'),
(134, 10, 132, '2026-08-10', NULL, 'aktif', '2026-08-09 16:23:00', '2026-08-09 16:23:00'),
(135, 12, 133, '2026-08-10', NULL, 'aktif', '2026-08-10 23:45:31', '2026-08-10 23:45:31'),
(136, 7, 134, '2026-08-10', NULL, 'aktif', '2026-08-10 23:46:06', '2026-08-10 23:46:06'),
(137, 7, 135, '2026-08-10', NULL, 'aktif', '2026-08-10 23:46:36', '2026-08-10 23:46:36'),
(138, 14, 136, '2026-08-10', NULL, 'aktif', '2026-08-10 23:47:45', '2026-08-10 23:47:45'),
(139, 9, 137, '2026-08-11', NULL, 'aktif', '2026-08-11 00:11:37', '2026-08-11 00:11:37'),
(140, 9, 138, '2026-08-11', NULL, 'aktif', '2026-08-12 00:57:38', '2026-08-12 00:57:38'),
(141, 9, 139, '2026-08-12', NULL, 'aktif', '2026-08-12 00:59:27', '2026-08-12 00:59:27'),
(142, 15, 140, '2026-08-12', NULL, 'aktif', '2026-08-12 01:00:23', '2026-08-12 01:00:23'),
(143, 7, 141, '2026-08-12', NULL, 'aktif', '2026-08-12 01:10:58', '2026-08-12 01:10:58'),
(144, 7, 142, '2026-08-12', NULL, 'aktif', '2026-08-12 02:20:21', '2026-08-12 02:20:21'),
(145, 14, 143, '2026-07-24', NULL, 'aktif', '2026-08-18 22:54:17', '2026-08-18 22:54:17'),
(146, 18, 28, '2026-07-22', NULL, 'aktif', '2026-08-19 00:39:19', '2026-08-19 04:18:55'),
(147, 18, 47, '2026-08-22', NULL, 'aktif', '2026-08-19 00:39:24', '2026-08-19 04:19:05'),
(148, 18, 26, '2026-07-22', NULL, 'aktif', '2026-08-19 00:39:41', '2026-08-19 04:18:43'),
(150, 7, 20, '2026-07-17', NULL, 'aktif', '2026-08-20 01:38:18', '2026-08-20 01:39:25'),
(151, 7, 144, '2026-08-20', NULL, 'aktif', '2026-08-20 01:40:44', '2026-08-20 01:40:44'),
(152, 11, 145, '2026-08-24', NULL, 'aktif', '2026-08-26 00:53:07', '2026-08-26 00:53:07');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_06_18_141725_create_permission_tables', 1),
(5, '2026_06_18_141725_create_personal_access_tokens_table', 1),
(6, '2026_06_18_141730_create_programs_table', 1),
(7, '2026_06_18_141731_create_tutors_table', 1),
(8, '2026_06_18_141732_create_siswas_table', 1),
(9, '2026_06_18_141733_create_kelas_table', 1),
(10, '2026_06_18_141734_create_kelas_siswa_table', 1),
(11, '2026_06_18_141735_create_jadwals_table', 1),
(12, '2026_06_18_141736_create_pertemuans_table', 1),
(13, '2026_06_18_141737_create_tagihans_table', 1),
(14, '2026_06_18_141738_create_pembayarans_table', 1),
(15, '2026_06_18_141739_create_presensis_table', 1),
(16, '2026_06_18_141740_create_nilais_table', 1),
(17, '2026_07_11_071731_add_tingkat_jenjang_to_siswas_table', 1),
(18, '2026_07_14_151805_add_mata_pelajaran_to_kelas_and_drop_programs', 1),
(19, '2026_07_22_105728_create_sekolahs_table', 1),
(20, '2026_07_22_105729_add_sekolah_id_to_siswas_table', 1),
(21, '2026_07_22_111440_add_user_id_to_tutors_table', 1),
(22, '2026_07_23_014433_add_catatan_to_presensis_table', 1),
(23, '2026_07_24_113710_add_tutor_id_to_pertemuans_table', 1),
(24, '2026_07_24_115133_simplify_status_to_hadir_tidak_hadir_in_presensis_table', 1),
(25, '2026_07_26_000001_create_pakets_table', 1),
(26, '2026_07_26_000002_create_siswa_pakets_table', 1),
(27, '2026_07_26_000003_drop_jadwals_table', 1),
(28, '2026_07_28_100000_drop_tutor_id_from_kelas_table', 2),
(29, '2026_07_28_101000_drop_durasi_bulan_from_kelas_table', 2),
(30, '2026_07_28_110000_create_harga_pakets_table', 2),
(31, '2026_07_28_120000_drop_harga_from_kelas_table', 2),
(32, '2026_07_28_130000_add_username_to_users_table', 2),
(33, '2026_07_29_000001_create_master_pendidikan_tables', 3),
(34, '2026_07_29_000002_support_scheduled_package_changes', 3),
(35, '2026_08_04_090000_add_tarif_per_pertemuan_to_kelas_table', 4),
(36, '2026_08_04_090100_drop_tarif_per_pertemuan_from_tutors_table', 4),
(37, '2026_08_04_180000_add_tarif_per_pertemuan_to_pertemuans_table', 4),
(38, '2026_08_04_190000_split_status_terlaksana_in_pertemuans_table', 4),
(39, '2026_08_04_200000_add_unique_pertemuan_ke_per_kelas_to_pertemuans_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 4),
(2, 'App\\Models\\User', 5),
(2, 'App\\Models\\User', 6),
(2, 'App\\Models\\User', 7),
(2, 'App\\Models\\User', 8),
(3, 'App\\Models\\User', 3);

-- --------------------------------------------------------

--
-- Table structure for table `nilais`
--

CREATE TABLE `nilais` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `siswa_id` bigint(20) UNSIGNED NOT NULL,
  `kelas_id` bigint(20) UNSIGNED NOT NULL,
  `jenis_nilai` enum('tugas','uts','uas') NOT NULL,
  `nilai` decimal(5,2) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pakets`
--

CREATE TABLE `pakets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jumlah_pertemuan` int(11) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pakets`
--

INSERT INTO `pakets` (`id`, `nama`, `jumlah_pertemuan`, `deskripsi`, `created_at`, `updated_at`) VALUES
(1, 'Paket 12x Pertemuan', 12, '12 pertemuan per bulan', '2026-07-27 09:34:39', '2026-07-27 09:34:39'),
(2, 'Paket 16x Pertemuan', 16, '16 pertemuan per bulan', '2026-07-27 09:34:39', '2026-07-27 09:34:39'),
(3, 'Paket 20x Pertemuan', 20, '20 pertemuan per bulan', '2026-07-27 09:34:39', '2026-07-27 09:34:39'),
(4, 'Paket 12x Pertemuan SMP', 12, '12 pertemuan per bulan', '2026-08-03 07:52:02', '2026-08-03 07:52:28');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pembayarans`
--

CREATE TABLE `pembayarans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tagihan_id` bigint(20) UNSIGNED NOT NULL,
  `jumlah` decimal(12,2) NOT NULL,
  `metode` enum('tunai','transfer') NOT NULL,
  `tgl_bayar` date NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pembayarans`
--

INSERT INTO `pembayarans` (`id`, `tagihan_id`, `jumlah`, `metode`, `tgl_bayar`, `keterangan`, `created_at`, `updated_at`) VALUES
(1, 100, 200000.00, 'tunai', '2026-08-19', NULL, '2026-08-18 20:12:39', '2026-08-18 20:12:39');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'siswa.create', 'web', '2026-07-27 09:34:37', '2026-07-27 09:34:37'),
(2, 'siswa.read', 'web', '2026-07-27 09:34:37', '2026-07-27 09:34:37'),
(3, 'siswa.update', 'web', '2026-07-27 09:34:37', '2026-07-27 09:34:37'),
(4, 'siswa.delete', 'web', '2026-07-27 09:34:37', '2026-07-27 09:34:37'),
(5, 'tutor.create', 'web', '2026-07-27 09:34:37', '2026-07-27 09:34:37'),
(6, 'tutor.read', 'web', '2026-07-27 09:34:37', '2026-07-27 09:34:37'),
(7, 'tutor.update', 'web', '2026-07-27 09:34:37', '2026-07-27 09:34:37'),
(8, 'tutor.delete', 'web', '2026-07-27 09:34:37', '2026-07-27 09:34:37'),
(9, 'kelas.create', 'web', '2026-07-27 09:34:37', '2026-07-27 09:34:37'),
(10, 'kelas.read', 'web', '2026-07-27 09:34:37', '2026-07-27 09:34:37'),
(11, 'kelas.update', 'web', '2026-07-27 09:34:37', '2026-07-27 09:34:37'),
(12, 'kelas.delete', 'web', '2026-07-27 09:34:38', '2026-07-27 09:34:38'),
(13, 'presensi.create', 'web', '2026-07-27 09:34:38', '2026-07-27 09:34:38'),
(14, 'presensi.read', 'web', '2026-07-27 09:34:38', '2026-07-27 09:34:38'),
(15, 'nilai.create', 'web', '2026-07-27 09:34:38', '2026-07-27 09:34:38'),
(16, 'nilai.read', 'web', '2026-07-27 09:34:38', '2026-07-27 09:34:38'),
(17, 'nilai.update', 'web', '2026-07-27 09:34:38', '2026-07-27 09:34:38'),
(18, 'pembayaran.create', 'web', '2026-07-27 09:34:38', '2026-07-27 09:34:38'),
(19, 'pembayaran.read', 'web', '2026-07-27 09:34:38', '2026-07-27 09:34:38'),
(20, 'pembayaran.delete', 'web', '2026-07-27 09:34:38', '2026-07-27 09:34:38'),
(21, 'laporan.read', 'web', '2026-07-27 09:34:38', '2026-07-27 09:34:38'),
(22, 'dashboard.read', 'web', '2026-07-27 09:34:38', '2026-07-27 09:34:38');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'kasilmu-token', '71f9e74a419c1efe167a07122db47c349e8cf9eaa19c57d2c9db6b04b9ddc100', '[\"*\"]', NULL, NULL, '2026-07-27 09:45:11', '2026-07-27 09:45:11'),
(2, 'App\\Models\\User', 1, 'kasilmu-token', 'c74a2a42b06eb1d215787a60b05c529e5b49446d684def5a0b255a1ee15a83d5', '[\"*\"]', '2026-07-27 09:53:15', NULL, '2026-07-27 09:53:03', '2026-07-27 09:53:15'),
(4, 'App\\Models\\User', 1, 'kasilmu-token', 'e52f33d7eddd2f12f5f73f1d172ab3790642c85a63c4790940fe47169d0c9ebf', '[\"*\"]', '2026-07-27 18:33:09', NULL, '2026-07-27 18:33:08', '2026-07-27 18:33:09'),
(5, 'App\\Models\\User', 1, 'kasilmu-token', '5d46c2d3fce06f1d8285afe7e7fa0d5a924466a23624ba78041d52c417adbe32', '[\"*\"]', NULL, NULL, '2026-07-27 18:33:08', '2026-07-27 18:33:08'),
(6, 'App\\Models\\User', 1, 'kasilmu-token', 'b57edd1a5275a814a2d828f5aed63e4af3528263c060e801e703f0da0632e498', '[\"*\"]', '2026-07-27 21:34:29', NULL, '2026-07-27 18:33:08', '2026-07-27 21:34:29'),
(8, 'App\\Models\\User', 1, 'kasilmu-token', 'f47d46e6605adcaf2d61acd2167c4ad24e45997ac50c829a209ae52237994908', '[\"*\"]', '2026-07-28 06:36:04', NULL, '2026-07-28 06:36:03', '2026-07-28 06:36:04'),
(9, 'App\\Models\\User', 1, 'kasilmu-token', '3f39a301b3135922734b15376886e4eede8f08301e5aa8d4e9bb301c4dd919e1', '[\"*\"]', '2026-07-28 06:38:39', NULL, '2026-07-28 06:36:04', '2026-07-28 06:38:39'),
(10, 'App\\Models\\User', 1, 'kasilmu-token', '34a3a7e79aa9ccfd6d105a6cc97215a0b00a6a823a6826e23fd63d5e52d7c974', '[\"*\"]', '2026-07-28 16:10:32', NULL, '2026-07-28 06:44:20', '2026-07-28 16:10:32'),
(11, 'App\\Models\\User', 1, 'kasilmu-token', 'b094857ba684c5101576ea14aa966cb97a7f5d17aeccd25a81fdb68b0c6a9657', '[\"*\"]', '2026-08-05 00:02:01', NULL, '2026-07-28 07:57:38', '2026-08-05 00:02:01'),
(12, 'App\\Models\\User', 1, 'kasilmu-token', '1052abef600b2a2471b2ce0c94f3bb0e42a25aa699e597118b4477c8a4649994', '[\"*\"]', '2026-07-28 19:16:03', NULL, '2026-07-28 19:08:41', '2026-07-28 19:16:03'),
(13, 'App\\Models\\User', 1, 'kasilmu-token', '1e2567bb0af217c3d1c4750635c3500e226060686d6ed7ffc3dabd36e8b4e465', '[\"*\"]', '2026-07-29 01:13:50', NULL, '2026-07-28 19:20:14', '2026-07-29 01:13:50'),
(14, 'App\\Models\\User', 1, 'kasilmu-token', '36a86b616073cdedce4837e72b9cd24baa12a16c00bb7cdd2ac03d2a5a4b2645', '[\"*\"]', '2026-07-28 19:26:10', NULL, '2026-07-28 19:25:55', '2026-07-28 19:26:10'),
(15, 'App\\Models\\User', 1, 'kasilmu-token', '02a2c32e84022647508299d20492e4d0d43937773a04e49e2357819b2ea0ba3e', '[\"*\"]', '2026-07-29 05:02:33', NULL, '2026-07-29 03:13:38', '2026-07-29 05:02:33'),
(18, 'App\\Models\\User', 1, 'kasilmu-token', 'd1a57fba4869f958f551df1c74935bbb3b40f424e35f9ef96e0964b98a886f9c', '[\"*\"]', '2026-07-29 18:33:35', NULL, '2026-07-29 18:33:34', '2026-07-29 18:33:35'),
(22, 'App\\Models\\User', 1, 'kasilmu-token', '8a46a3b420aec884a9f372014c1ac5639dde38dc0cc716f3a0eefdc2f2b4c324', '[\"*\"]', '2026-08-03 04:01:40', NULL, '2026-08-03 00:55:09', '2026-08-03 04:01:40'),
(24, 'App\\Models\\User', 7, 'kasilmu-token', 'f1fa09b0a17c5777e97d778cc1195e4e0010ffbcd3f09e0ec924e85579f0ce67', '[\"*\"]', '2026-08-03 08:23:34', NULL, '2026-08-03 08:08:39', '2026-08-03 08:23:34'),
(26, 'App\\Models\\User', 6, 'kasilmu-token', 'ef0a90d569f446d297de4e28a1b0d86895bcdc1dede900b50de93d6f01a88c8f', '[\"*\"]', '2026-08-07 04:30:19', NULL, '2026-08-03 08:11:35', '2026-08-07 04:30:19'),
(29, 'App\\Models\\User', 5, 'kasilmu-token', '8c048fc44fc346efdf26df52e6b8422a63e84015d8a62c5db5b762ba1d7098df', '[\"*\"]', '2026-08-07 03:35:56', NULL, '2026-08-03 08:23:54', '2026-08-07 03:35:56'),
(31, 'App\\Models\\User', 1, 'kasilmu-token', '75c7902dda3c16ca71f2a364c0c5e3bf509cf571a85a871e71261fb189699e89', '[\"*\"]', '2026-08-06 04:05:00', NULL, '2026-08-03 09:27:28', '2026-08-06 04:05:00'),
(32, 'App\\Models\\User', 1, 'kasilmu-token', '0f3e38400a561690f8edd1912ae458f155b357981913336b526ca76f58211786', '[\"*\"]', NULL, NULL, '2026-08-03 18:18:22', '2026-08-03 18:18:22'),
(33, 'App\\Models\\User', 1, 'kasilmu-token', 'a3e98ff3b6c6018339f0e5ed8ce3e1ac6c4d302d416ac2217fcf406252167685', '[\"*\"]', NULL, NULL, '2026-08-03 18:18:22', '2026-08-03 18:18:22'),
(34, 'App\\Models\\User', 1, 'kasilmu-token', 'a99c739065793ac231a483c69202b1c32d62bc7cae7ef9f639c1f53e17d4b8e7', '[\"*\"]', '2026-08-03 18:18:46', NULL, '2026-08-03 18:18:22', '2026-08-03 18:18:46'),
(35, 'App\\Models\\User', 8, 'kasilmu-token', '2a431ed3c0d3f22972c589bffbe1c2f763b4ed8670887297bd4f9d16e2aa315f', '[\"*\"]', '2026-08-05 01:39:59', NULL, '2026-08-03 18:27:52', '2026-08-05 01:39:59'),
(36, 'App\\Models\\User', 1, 'kasilmu-token', 'da0ac00cc59cd47da788b4eb368836a17dc9ebdfca1568c434c7775744deef68', '[\"*\"]', '2026-08-04 23:11:50', NULL, '2026-08-04 01:54:47', '2026-08-04 23:11:50'),
(37, 'App\\Models\\User', 7, 'kasilmu-token', 'db208c58088bd9b2fff69f74d03c20f2f835650bd5ee898b3e1699ca510d6f62', '[\"*\"]', '2026-08-07 03:30:33', NULL, '2026-08-04 02:45:10', '2026-08-07 03:30:33'),
(38, 'App\\Models\\User', 1, 'kasilmu-token', 'a7e0af8f7f6804ce2894ddd31741e6389dd9928eed29ae432b849bc660c4af82', '[\"*\"]', '2026-08-04 03:57:52', NULL, '2026-08-04 03:48:44', '2026-08-04 03:57:52'),
(39, 'App\\Models\\User', 1, 'kasilmu-token', '27dee315798fdb691c76a73e5d869fd6788510297f9e47877346f33dfcbcff41', '[\"*\"]', '2026-08-07 18:47:59', NULL, '2026-08-04 05:46:20', '2026-08-07 18:47:59'),
(44, 'App\\Models\\User', 1, 'kasilmu-token', 'b3909d2b4d3231a9e8b2f49fb5cded96cef9c20fa81f912f5c79d052c2599663', '[\"*\"]', '2026-08-05 00:47:11', NULL, '2026-08-05 00:46:06', '2026-08-05 00:47:11'),
(45, 'App\\Models\\User', 8, 'kasilmu-token', '1ba300c45bb0e32b120bdf6d39646ccac92e6fe8062bba63baeca792b312691e', '[\"*\"]', '2026-08-07 03:56:51', NULL, '2026-08-05 01:40:27', '2026-08-07 03:56:51'),
(46, 'App\\Models\\User', 1, 'kasilmu-token', 'd65af9abbed7773e6a696433422e78eb8cc736fbe71a207f8e1f2fa07d5a820f', '[\"*\"]', '2026-08-05 03:03:48', NULL, '2026-08-05 02:57:51', '2026-08-05 03:03:48'),
(47, 'App\\Models\\User', 1, 'kasilmu-token', '3eec1223caac7d15a5811f40a2751057a6bfe67c82ebfe37f849b7d456adc433', '[\"*\"]', '2026-08-05 08:37:21', NULL, '2026-08-05 08:37:16', '2026-08-05 08:37:21'),
(48, 'App\\Models\\User', 1, 'kasilmu-token', '8b491e4365c99fa3f7bf00a0f6fb772c65385412397712f0131c5708544ea74f', '[\"*\"]', '2026-08-07 03:45:14', NULL, '2026-08-06 02:26:34', '2026-08-07 03:45:14'),
(49, 'App\\Models\\User', 5, 'kasilmu-token', 'be9042baec4a8990a6114f93ab15a493eb9800d27eb1f011d2b9208c0f27e9ff', '[\"*\"]', NULL, NULL, '2026-08-07 03:59:32', '2026-08-07 03:59:32'),
(50, 'App\\Models\\User', 5, 'kasilmu-token', '95a7e5de3c9e4385e9f6cf1b5be9aee4dcf5785875f589e4eb75bab16e682de7', '[\"*\"]', '2026-08-07 04:02:34', NULL, '2026-08-07 03:59:32', '2026-08-07 04:02:34'),
(51, 'App\\Models\\User', 1, 'kasilmu-token', 'fd3178ce9060617df07009dd82adbb83817fd5ac2bc106602c54c27ee287d3ee', '[\"*\"]', '2026-08-29 01:38:33', NULL, '2026-08-07 20:17:54', '2026-08-29 01:38:33'),
(52, 'App\\Models\\User', 1, 'kasilmu-token', '815a7659a6e646a96c8c5fbebe0045fe753398db06434cef9308fde038dfea08', '[\"*\"]', '2026-08-13 09:47:01', NULL, '2026-08-08 08:05:42', '2026-08-13 09:47:01'),
(54, 'App\\Models\\User', 1, 'kasilmu-token', 'ec56734499a854025053f879f6f1d29e605ed718af44e3ecd7992b19225bde5b', '[\"*\"]', '2026-08-10 20:30:22', NULL, '2026-08-09 16:20:27', '2026-08-10 20:30:22'),
(55, 'App\\Models\\User', 6, 'kasilmu-token', '94b4cb68d967c8f2de24392f812701f123fdc3b5dad0184fb31a7755b46ff455', '[\"*\"]', '2026-08-28 03:06:33', NULL, '2026-08-09 23:55:57', '2026-08-28 03:06:33'),
(56, 'App\\Models\\User', 8, 'kasilmu-token', '3d8a964543a00cb13019d1b7361249e549c029c45aa09c7e8248586d21984e42', '[\"*\"]', '2026-08-28 03:12:43', NULL, '2026-08-10 01:32:42', '2026-08-28 03:12:43'),
(57, 'App\\Models\\User', 5, 'kasilmu-token', 'e8fd0be599542a6c7fd7ef94735cdcbf7d2a15516775d0444960dbd97f1e4496', '[\"*\"]', '2026-08-21 03:48:26', NULL, '2026-08-10 01:39:44', '2026-08-21 03:48:26'),
(58, 'App\\Models\\User', 7, 'kasilmu-token', '43b9d0c3fcd6c6682cbe46bc1952e850e4faeff6fedb055b6aeae94312af3ec6', '[\"*\"]', '2026-08-11 02:40:22', NULL, '2026-08-10 02:52:06', '2026-08-11 02:40:22'),
(61, 'App\\Models\\User', 4, 'kasilmu-token', '239e4ece6f036a0e457ecb80c3eaa1eb517bf054b99f088fe39c79e1b31197ed', '[\"*\"]', '2026-08-11 02:36:09', NULL, '2026-08-11 02:33:46', '2026-08-11 02:36:09'),
(63, 'App\\Models\\User', 4, 'kasilmu-token', '4a58f61160d666d935224701c59d75a060eb568cad924eaff5f1f8707fe3951a', '[\"*\"]', '2026-08-27 21:14:05', NULL, '2026-08-11 03:14:56', '2026-08-27 21:14:05'),
(64, 'App\\Models\\User', 1, 'kasilmu-token', '03392bf91fa733312289cbef1817e6c43cdec772bb767547af549e688a0a3fef', '[\"*\"]', NULL, NULL, '2026-08-11 07:01:06', '2026-08-11 07:01:06'),
(65, 'App\\Models\\User', 1, 'kasilmu-token', '77693cd65328a22e634d07d0dc33b2cdcddb74e531d24ecb6ba2db318a3784da', '[\"*\"]', '2026-08-12 00:23:15', NULL, '2026-08-11 07:01:06', '2026-08-12 00:23:15'),
(66, 'App\\Models\\User', 1, 'kasilmu-token', '67bcdd1f839fd9f35f6b565c1a7fe186d2e16f200ac2bdd25e58acdc6cf2eee9', '[\"*\"]', '2026-08-12 00:25:38', NULL, '2026-08-12 00:24:12', '2026-08-12 00:25:38'),
(68, 'App\\Models\\User', 1, 'kasilmu-token', '67e092288d3b20803e625560490f79d88728e27c50298255178ebcc0d080bdd0', '[\"*\"]', '2026-08-20 00:54:23', NULL, '2026-08-12 00:58:24', '2026-08-20 00:54:23'),
(70, 'App\\Models\\User', 7, 'kasilmu-token', '135ddb6483629ce1db7ef1a0fc1026213b1e719c2937168cde0fc12a72dc150b', '[\"*\"]', '2026-08-28 03:16:28', NULL, '2026-08-12 02:42:06', '2026-08-28 03:16:28'),
(71, 'App\\Models\\User', 1, 'kasilmu-token', '1a0c095306af5c36ec4bcfd7eeb7a55ab087792db0dc74458b6bc6a1cf588827', '[\"*\"]', '2026-08-12 02:55:07', NULL, '2026-08-12 02:55:06', '2026-08-12 02:55:07'),
(72, 'App\\Models\\User', 1, 'kasilmu-token', '0ef00810fba3e91eb24d74080a69518e8a9a7aaf621f68e92db5e96da6002e45', '[\"*\"]', '2026-08-18 02:43:17', NULL, '2026-08-12 02:55:07', '2026-08-18 02:43:17'),
(73, 'App\\Models\\User', 1, 'kasilmu-token', 'bdc3cbad02522b874ce8e2b751895a6a21bfea69fb590baa3f9993a0cca6a7a7', '[\"*\"]', '2026-08-18 08:31:45', NULL, '2026-08-18 08:31:44', '2026-08-18 08:31:45'),
(76, 'App\\Models\\User', 1, 'kasilmu-token', '2acc35ea0fc014dc1ea8b17f0236b1e413dc58558fbec3fc6a1cb5d008792eb8', '[\"*\"]', '2026-08-21 18:13:24', NULL, '2026-08-18 20:46:58', '2026-08-21 18:13:24'),
(78, 'App\\Models\\User', 1, 'kasilmu-token', '53b3942e32a93e690d3cd14a6e13163b1ee949e91ede729e799417d5dd9b5604', '[\"*\"]', '2026-08-19 00:12:03', NULL, '2026-08-19 00:12:02', '2026-08-19 00:12:03'),
(79, 'App\\Models\\User', 1, 'kasilmu-token', 'e98197ef00d0c9993c61bfee2be32322de857b73ae137932fb63e93848b767a3', '[\"*\"]', '2026-08-19 07:16:34', NULL, '2026-08-19 00:12:02', '2026-08-19 07:16:34'),
(81, 'App\\Models\\User', 1, 'kasilmu-token', '2a084018ab5f7827ede4077ea7df4675bca8dd9e70d342818fe0242dc9055379', '[\"*\"]', '2026-08-25 22:27:58', NULL, '2026-08-20 05:58:25', '2026-08-25 22:27:58'),
(82, 'App\\Models\\User', 5, 'kasilmu-token', 'fd2d40e6696d9e11bf3b9feaf1d230b53afdffc7379bf1709a43aba6a938cbb6', '[\"*\"]', '2026-08-28 01:42:36', NULL, '2026-08-24 01:28:04', '2026-08-28 01:42:36'),
(83, 'App\\Models\\User', 1, 'kasilmu-token', 'b95f2f1a489d405a27eefdb50c266ff9c286cd67eeeb510b073cf6197a0db432', '[\"*\"]', NULL, NULL, '2026-08-26 00:50:58', '2026-08-26 00:50:58'),
(86, 'App\\Models\\User', 5, 'kasilmu-token', '57dd86ac12a365bebfaf3e295535df123171e4c5e00371acdd41f357f5d08408', '[\"*\"]', '2026-08-28 03:09:13', NULL, '2026-08-28 03:09:11', '2026-08-28 03:09:13'),
(87, 'App\\Models\\User', 5, 'kasilmu-token', 'b8fd436123c4f4794b6c24fc4a38c12da0b853677233e9f747486b35b6a421a9', '[\"*\"]', '2026-08-28 05:55:09', NULL, '2026-08-28 03:09:13', '2026-08-28 05:55:09'),
(88, 'App\\Models\\User', 1, 'kasilmu-token', 'f62bb37669b10b8cbeed2fdbac9d1ba8d529b537fc4b466426e92a35666b5129', '[\"*\"]', '2026-08-28 03:41:02', NULL, '2026-08-28 03:40:57', '2026-08-28 03:41:02');

-- --------------------------------------------------------

--
-- Table structure for table `pertemuans`
--

CREATE TABLE `pertemuans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kelas_id` bigint(20) UNSIGNED NOT NULL,
  `tutor_id` bigint(20) UNSIGNED DEFAULT NULL,
  `pertemuan_ke` int(11) NOT NULL,
  `tgl` date NOT NULL,
  `materi` text DEFAULT NULL,
  `status` enum('berlangsung','selesai','libur') NOT NULL DEFAULT 'berlangsung',
  `tarif_per_pertemuan` decimal(12,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pertemuans`
--

INSERT INTO `pertemuans` (`id`, `kelas_id`, `tutor_id`, `pertemuan_ke`, `tgl`, `materi`, `status`, `tarif_per_pertemuan`, `created_at`, `updated_at`) VALUES
(6, 13, 6, 1, '2026-08-03', NULL, 'selesai', 0.00, '2026-08-03 08:09:38', '2026-08-03 08:09:38'),
(7, 15, 9, 1, '2026-08-03', NULL, 'selesai', 0.00, '2026-08-03 08:13:11', '2026-08-03 08:13:11'),
(8, 14, 8, 1, '2026-08-03', NULL, 'selesai', 0.00, '2026-08-03 08:16:58', '2026-08-03 08:16:58'),
(9, 7, 8, 1, '2026-08-03', NULL, 'selesai', 0.00, '2026-08-03 08:24:51', '2026-08-03 08:24:51'),
(10, 9, 7, 1, '2026-08-03', NULL, 'selesai', 0.00, '2026-08-03 08:24:52', '2026-08-03 08:24:52'),
(11, 10, 7, 1, '2026-08-03', NULL, 'selesai', 0.00, '2026-08-03 08:25:56', '2026-08-03 08:25:56'),
(13, 8, 8, 1, '2026-08-03', NULL, 'selesai', 0.00, '2026-08-03 08:52:18', '2026-08-03 08:52:18'),
(14, 11, 8, 1, '2026-08-03', NULL, 'selesai', 0.00, '2026-08-03 09:03:47', '2026-08-03 09:03:47'),
(15, 17, 7, 1, '2026-08-03', NULL, 'selesai', 0.00, '2026-08-03 18:01:22', '2026-08-03 18:01:22'),
(16, 16, 10, 1, '2026-08-03', 'Materi kelas 5: Membahas soal cerita dari buku paket kelas 5 dan kelipatan\n\nMateri kelas 6:  Membahas soal pecahan dalam bentuk perkalian,pembagian,penjumlahan dan pengura.', 'selesai', 0.00, '2026-08-03 18:48:46', '2026-08-03 18:59:37'),
(17, 14, 8, 2, '2026-08-04', NULL, 'selesai', 0.00, '2026-08-04 00:01:01', '2026-08-04 00:01:01'),
(18, 9, 7, 2, '2026-08-04', NULL, 'selesai', 0.00, '2026-08-04 01:06:18', '2026-08-04 01:06:18'),
(19, 8, 8, 2, '2026-08-04', 'Kelas 3: menyatakan pendapat sederhana \"like&likes,don\'t like&doesnt like,sesuai materi disekolah\nKelas 4:pengertian present continuous tense,sesuai materi disekolah', 'selesai', 0.00, '2026-08-04 01:09:08', '2026-08-04 01:40:46'),
(20, 7, 10, 2, '2026-08-04', NULL, 'selesai', 0.00, '2026-08-04 01:11:08', '2026-08-04 01:11:08'),
(21, 15, 9, 2, '2026-08-04', NULL, 'selesai', 0.00, '2026-08-04 02:45:32', '2026-08-04 02:45:32'),
(22, 10, 8, 2, '2026-08-04', 'Simple Present Tense', 'selesai', 0.00, '2026-08-04 02:48:57', '2026-08-04 03:00:45'),
(23, 11, 7, 2, '2026-08-04', NULL, 'selesai', 0.00, '2026-08-04 03:10:31', '2026-08-04 03:10:31'),
(24, 16, 10, 2, '2026-08-04', NULL, 'selesai', 0.00, '2026-08-04 03:33:00', '2026-08-04 03:33:00'),
(25, 13, 6, 2, '2026-08-04', NULL, 'berlangsung', 0.00, '2026-08-04 23:50:16', '2026-08-04 23:50:16'),
(26, 14, 8, 3, '2026-08-05', NULL, 'selesai', 0.00, '2026-08-05 00:56:33', '2026-08-05 00:58:41'),
(27, 7, 8, 3, '2026-08-05', NULL, 'selesai', 0.00, '2026-08-05 01:32:08', '2026-08-05 01:34:04'),
(28, 8, 10, 3, '2026-08-05', NULL, 'selesai', 0.00, '2026-08-05 01:40:51', '2026-08-05 01:46:29'),
(29, 9, 7, 3, '2026-08-05', NULL, 'selesai', 0.00, '2026-08-05 02:49:52', '2026-08-05 02:51:50'),
(30, 11, 8, 3, '2026-08-05', 'Kls 8 : willingness and unwillingness (sesuai dengan materi disekolah)\nKls 9 : expression of congratulation and condolonces(sesuai dengan materi disekolah)', 'selesai', 0.00, '2026-08-05 02:51:03', '2026-08-05 03:36:34'),
(31, 10, 7, 3, '2026-08-05', NULL, 'selesai', 0.00, '2026-08-05 02:51:58', '2026-08-05 02:53:15'),
(32, 16, 10, 3, '2026-08-05', NULL, 'selesai', 0.00, '2026-08-05 03:06:04', '2026-08-05 03:08:23'),
(33, 15, 9, 3, '2026-08-05', NULL, 'selesai', 0.00, '2026-08-05 03:25:30', '2026-08-05 03:25:52'),
(34, 14, 8, 4, '2026-08-06', NULL, 'selesai', 0.00, '2026-08-06 00:01:05', '2026-08-06 00:01:50'),
(35, 8, 8, 4, '2026-08-06', NULL, 'selesai', 0.00, '2026-08-06 01:23:27', '2026-08-06 01:25:32'),
(36, 15, 8, 4, '2026-08-06', NULL, 'selesai', 0.00, '2026-08-06 01:26:05', '2026-08-06 01:27:29'),
(37, 9, 7, 4, '2026-08-06', NULL, 'selesai', 0.00, '2026-08-06 01:48:53', '2026-08-06 01:50:02'),
(38, 10, 8, 4, '2026-08-06', NULL, 'selesai', 0.00, '2026-08-06 03:26:45', '2026-08-06 03:28:13'),
(39, 7, 9, 4, '2026-08-06', NULL, 'selesai', 0.00, '2026-08-06 04:22:29', '2026-08-06 04:29:28'),
(40, 16, 9, 4, '2026-08-06', NULL, 'selesai', 0.00, '2026-08-06 04:29:56', '2026-08-06 04:31:38'),
(41, 11, 7, 4, '2026-08-06', NULL, 'selesai', 0.00, '2026-08-06 04:30:58', '2026-08-06 04:31:31'),
(42, 17, 7, 2, '2026-08-06', NULL, 'selesai', 0.00, '2026-08-06 05:27:03', '2026-08-06 05:27:49'),
(43, 17, 7, 3, '2026-08-05', NULL, 'selesai', 0.00, '2026-08-06 05:32:57', '2026-08-06 05:33:06'),
(44, 14, 8, 5, '2026-08-07', NULL, 'selesai', 0.00, '2026-08-07 00:33:38', '2026-08-07 00:33:50'),
(45, 7, 8, 5, '2026-08-07', NULL, 'selesai', 0.00, '2026-08-07 01:18:43', '2026-08-07 01:22:06'),
(46, 9, 7, 5, '2026-08-07', NULL, 'selesai', 0.00, '2026-08-07 01:25:09', '2026-08-07 01:25:49'),
(47, 8, 10, 5, '2026-08-07', NULL, 'selesai', 0.00, '2026-08-07 02:15:33', '2026-08-07 02:18:36'),
(48, 10, 7, 5, '2026-08-07', NULL, 'selesai', 0.00, '2026-08-07 02:53:06', '2026-08-07 02:53:44'),
(49, 15, 9, 5, '2026-08-07', NULL, 'selesai', 0.00, '2026-08-07 03:27:31', '2026-08-07 03:30:29'),
(50, 16, 10, 5, '2026-08-07', NULL, 'selesai', 0.00, '2026-08-07 03:55:49', '2026-08-07 03:56:44'),
(51, 11, 8, 5, '2026-08-07', NULL, 'selesai', 0.00, '2026-08-07 04:28:57', '2026-08-07 04:29:54'),
(52, 14, 8, 6, '2026-08-10', NULL, 'selesai', 0.00, '2026-08-09 23:56:45', '2026-08-09 23:57:14'),
(53, 7, 8, 6, '2026-08-10', NULL, 'selesai', 0.00, '2026-08-10 01:31:54', '2026-08-10 01:33:50'),
(54, 8, 10, 6, '2026-08-10', NULL, 'selesai', 0.00, '2026-08-10 01:32:56', '2026-08-10 02:04:06'),
(55, 9, 7, 6, '2026-08-10', NULL, 'selesai', 0.00, '2026-08-10 01:40:09', '2026-08-10 01:40:45'),
(56, 15, 9, 6, '2026-08-10', NULL, 'selesai', 0.00, '2026-08-10 02:52:24', '2026-08-10 02:54:09'),
(57, 10, 8, 6, '2026-08-10', NULL, 'selesai', 0.00, '2026-08-10 02:52:29', '2026-08-10 02:53:36'),
(58, 11, 7, 6, '2026-08-10', NULL, 'selesai', 0.00, '2026-08-10 03:05:26', '2026-08-10 03:07:07'),
(59, 16, 10, 6, '2026-08-10', NULL, 'selesai', 0.00, '2026-08-10 03:32:34', '2026-08-10 03:34:00'),
(60, 14, 8, 7, '2026-08-11', NULL, 'selesai', 0.00, '2026-08-11 00:50:27', '2026-08-11 00:54:36'),
(61, 9, 7, 7, '2026-08-11', NULL, 'selesai', 0.00, '2026-08-11 01:25:17', '2026-08-11 03:12:47'),
(62, 8, 8, 7, '2026-08-11', 'Kelas 3: Pengulangan Pembahasan like&likes,don\'t like&doesnt like,sesuai materi disekolah\nKelas 4:Present Continuous tense, sesuai materi disekolah', 'selesai', 0.00, '2026-08-11 01:36:45', '2026-08-11 01:41:00'),
(63, 7, 10, 7, '2026-08-11', NULL, 'selesai', 0.00, '2026-08-11 02:00:39', '2026-08-11 03:05:05'),
(64, 13, 6, 3, '2026-08-11', NULL, 'selesai', 0.00, '2026-08-11 02:35:02', '2026-08-11 02:35:56'),
(65, 15, 9, 7, '2026-08-11', NULL, 'selesai', 0.00, '2026-08-11 02:39:27', '2026-08-11 02:40:13'),
(66, 16, 10, 7, '2026-08-11', NULL, 'selesai', 0.00, '2026-08-11 03:05:39', '2026-08-11 03:10:38'),
(67, 10, 7, 7, '2026-08-11', NULL, 'selesai', 0.00, '2026-08-11 03:10:52', '2026-08-11 03:11:44'),
(68, 11, 8, 7, '2026-08-11', NULL, 'selesai', 0.00, '2026-08-11 03:18:11', '2026-08-11 03:19:24'),
(69, 14, 8, 8, '2026-08-12', NULL, 'selesai', 0.00, '2026-08-11 23:57:00', '2026-08-12 00:16:05'),
(70, 7, 8, 8, '2026-08-12', NULL, 'selesai', 0.00, '2026-08-12 01:18:16', '2026-08-12 01:24:08'),
(71, 8, 10, 8, '2026-08-12', NULL, 'selesai', 0.00, '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(72, 13, 6, 4, '2026-08-12', NULL, 'selesai', 0.00, '2026-08-12 02:21:44', '2026-08-12 02:22:11'),
(73, 12, 6, 1, '2026-08-11', NULL, 'selesai', 0.00, '2026-08-12 02:24:05', '2026-08-12 02:24:31'),
(74, 12, 6, 2, '2026-08-10', NULL, 'selesai', 0.00, '2026-08-12 02:25:06', '2026-08-12 02:25:24'),
(75, 15, 9, 8, '2026-08-12', NULL, 'selesai', 0.00, '2026-08-12 02:42:19', '2026-08-12 02:45:17'),
(76, 9, 7, 8, '2026-08-12', NULL, 'selesai', 0.00, '2026-08-12 03:01:14', '2026-08-12 03:03:06'),
(77, 11, 7, 8, '2026-08-12', NULL, 'selesai', 0.00, '2026-08-12 03:03:12', '2026-08-12 03:04:05'),
(78, 16, 10, 8, '2026-08-12', NULL, 'selesai', 0.00, '2026-08-12 03:16:02', '2026-08-12 03:17:27'),
(79, 10, 8, 8, '2026-08-12', 'Pengulangan pembahasan simple Present Tense,Sesuai dengan materi disekolah,dan Personal Pronoun: Subject&Possesive adjective', 'selesai', 0.00, '2026-08-12 03:31:00', '2026-08-12 03:35:57'),
(80, 14, 8, 9, '2026-08-13', NULL, 'selesai', 0.00, '2026-08-12 23:45:59', '2026-08-12 23:46:13'),
(81, 8, 8, 9, '2026-08-13', 'Kelas 3:Mengenal waktu makan dalam bahasa inggris sesuai materi disekolah,\nKelas 4: Pengulangan Pembahasan Present Continuous tense sesuai materi disekolah', 'selesai', 0.00, '2026-08-13 01:18:43', '2026-08-13 01:25:50'),
(82, 7, 10, 9, '2026-08-13', NULL, 'selesai', 0.00, '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(83, 9, 7, 9, '2026-08-13', NULL, 'selesai', 0.00, '2026-08-13 02:21:27', '2026-08-13 02:24:01'),
(84, 15, 9, 9, '2026-08-13', NULL, 'selesai', 0.00, '2026-08-13 02:51:13', '2026-08-13 02:51:38'),
(85, 11, 8, 9, '2026-08-13', NULL, 'selesai', 0.00, '2026-08-13 03:05:14', '2026-08-13 03:06:14'),
(86, 16, 10, 9, '2026-08-13', NULL, 'selesai', 0.00, '2026-08-13 03:31:04', '2026-08-13 06:31:24'),
(87, 10, 7, 9, '2026-08-13', NULL, 'selesai', 0.00, '2026-08-13 03:36:02', '2026-08-13 03:39:44'),
(88, 7, 8, 10, '2026-08-14', NULL, 'selesai', 0.00, '2026-08-14 02:05:16', '2026-08-14 02:07:27'),
(89, 8, 10, 10, '2026-08-14', NULL, 'selesai', 0.00, '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(90, 14, 8, 10, '2026-08-18', NULL, 'selesai', 0.00, '2026-08-18 00:10:16', '2026-08-18 00:11:27'),
(91, 9, 7, 10, '2026-08-18', NULL, 'selesai', 0.00, '2026-08-18 01:04:21', '2026-08-18 01:05:47'),
(92, 7, 10, 11, '2026-08-18', NULL, 'selesai', 0.00, '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(93, 8, 8, 11, '2026-08-18', NULL, 'selesai', 0.00, '2026-08-18 01:36:41', '2026-08-18 01:38:20'),
(94, 16, 10, 10, '2026-08-18', NULL, 'selesai', 0.00, '2026-08-18 03:09:20', '2026-08-18 03:13:47'),
(95, 15, 9, 10, '2026-08-18', NULL, 'selesai', 0.00, '2026-08-18 03:13:34', '2026-08-18 03:13:58'),
(96, 10, 7, 10, '2026-08-18', NULL, 'selesai', 0.00, '2026-08-18 03:14:04', '2026-08-18 03:15:04'),
(97, 11, 8, 10, '2026-08-18', NULL, 'selesai', 0.00, '2026-08-18 03:21:30', '2026-08-18 03:23:02'),
(98, 13, 6, 5, '2026-08-18', NULL, 'selesai', 0.00, '2026-08-18 08:41:02', '2026-08-18 08:42:25'),
(99, 12, 6, 3, '2026-08-18', NULL, 'selesai', 0.00, '2026-08-18 08:42:38', '2026-08-18 08:43:11'),
(100, 14, 8, 11, '2026-08-19', NULL, 'selesai', 0.00, '2026-08-19 01:01:02', '2026-08-19 01:01:39'),
(101, 9, 7, 11, '2026-08-19', NULL, 'selesai', 0.00, '2026-08-19 02:33:07', '2026-08-19 02:38:38'),
(102, 10, 7, 11, '2026-08-19', NULL, 'selesai', 0.00, '2026-08-19 02:54:07', '2026-08-19 02:55:09'),
(103, 11, 7, 11, '2026-08-19', NULL, 'selesai', 0.00, '2026-08-19 03:01:32', '2026-08-19 03:02:13'),
(104, 15, 9, 11, '2026-08-19', NULL, 'selesai', 0.00, '2026-08-19 04:07:07', '2026-08-19 04:08:13'),
(105, 16, 9, 11, '2026-08-19', NULL, 'selesai', 0.00, '2026-08-19 04:08:36', '2026-08-19 04:08:54'),
(106, 18, 9, 1, '2026-08-19', NULL, 'selesai', 0.00, '2026-08-19 04:19:49', '2026-08-19 04:20:07'),
(107, 14, 8, 12, '2026-08-20', NULL, 'selesai', 0.00, '2026-08-19 23:48:09', '2026-08-19 23:48:23'),
(108, 7, 9, 12, '2026-08-20', NULL, 'selesai', 0.00, '2026-08-20 01:21:56', '2026-08-20 01:27:31'),
(109, 8, 8, 12, '2026-08-20', NULL, 'selesai', 0.00, '2026-08-20 01:29:33', '2026-08-20 01:30:36'),
(110, 15, 8, 12, '2026-08-20', NULL, 'selesai', 0.00, '2026-08-20 01:31:00', '2026-08-20 01:34:30'),
(111, 9, 7, 12, '2026-08-20', NULL, 'selesai', 0.00, '2026-08-20 01:49:07', '2026-08-20 01:51:32'),
(112, 11, 8, 12, '2026-08-20', NULL, 'selesai', 0.00, '2026-08-20 02:50:06', '2026-08-20 03:05:22'),
(113, 18, 9, 2, '2026-08-20', NULL, 'selesai', 0.00, '2026-08-20 03:11:18', '2026-08-20 03:11:37'),
(114, 16, 9, 12, '2026-08-20', NULL, 'selesai', 0.00, '2026-08-20 03:12:00', '2026-08-20 03:12:54'),
(115, 10, 7, 12, '2026-08-20', NULL, 'selesai', 0.00, '2026-08-20 03:36:21', '2026-08-20 03:38:53'),
(116, 13, 6, 6, '2026-08-20', NULL, 'selesai', 0.00, '2026-08-20 05:53:08', '2026-08-20 05:53:28'),
(117, 12, 6, 4, '2026-08-20', NULL, 'selesai', 0.00, '2026-08-20 05:53:45', '2026-08-20 05:54:02'),
(118, 12, 6, 5, '2026-08-19', NULL, 'selesai', 0.00, '2026-08-20 05:54:22', '2026-08-20 05:54:47'),
(119, 13, 6, 7, '2026-08-19', NULL, 'selesai', 0.00, '2026-08-20 05:55:04', '2026-08-20 05:55:22'),
(120, 17, 7, 4, '2026-08-20', NULL, 'selesai', 0.00, '2026-08-20 06:02:00', '2026-08-20 06:02:21'),
(121, 8, 9, 13, '2026-08-19', NULL, 'berlangsung', 0.00, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(122, 7, 8, 13, '2026-08-19', NULL, 'selesai', 0.00, '2026-08-20 06:41:36', '2026-08-20 06:42:59'),
(123, 11, 7, 13, '2026-08-21', NULL, 'selesai', 0.00, '2026-08-20 18:14:20', '2026-08-21 03:48:25'),
(125, 15, 9, 13, '2026-08-15', NULL, 'berlangsung', 0.00, '2026-08-20 18:45:44', '2026-08-20 18:45:44'),
(126, 14, 8, 13, '2026-08-21', NULL, 'selesai', 0.00, '2026-08-21 01:06:41', '2026-08-21 01:07:05'),
(127, 7, 8, 14, '2026-08-21', NULL, 'selesai', 0.00, '2026-08-21 01:10:21', '2026-08-21 01:39:29'),
(128, 9, 7, 13, '2026-08-21', NULL, 'selesai', 0.00, '2026-08-21 01:47:37', '2026-08-21 01:49:38'),
(129, 8, 10, 14, '2026-08-21', NULL, 'selesai', 0.00, '2026-08-21 01:54:04', '2026-08-21 01:57:19'),
(130, 15, 9, 14, '2026-08-21', NULL, 'selesai', 0.00, '2026-08-21 02:56:03', '2026-08-21 02:56:38'),
(131, 16, 10, 13, '2026-08-21', NULL, 'selesai', 0.00, '2026-08-21 02:58:13', '2026-08-21 02:58:59'),
(132, 18, 9, 3, '2026-08-21', NULL, 'selesai', 0.00, '2026-08-21 02:59:16', '2026-08-21 02:59:28'),
(133, 10, 8, 13, '2026-08-21', NULL, 'selesai', 0.00, '2026-08-21 03:45:18', '2026-08-21 03:46:19'),
(134, 14, 8, 14, '2026-08-24', NULL, 'selesai', 0.00, '2026-08-24 01:09:55', '2026-08-24 01:10:17'),
(135, 7, 8, 15, '2026-08-24', NULL, 'selesai', 0.00, '2026-08-24 01:10:46', '2026-08-24 01:55:15'),
(136, 9, 7, 14, '2026-08-24', NULL, 'selesai', 0.00, '2026-08-24 01:28:27', '2026-08-24 01:29:08'),
(137, 8, 10, 15, '2026-08-24', NULL, 'selesai', 0.00, '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(138, 11, 8, 14, '2026-08-24', NULL, 'selesai', 0.00, '2026-08-24 02:50:49', '2026-08-26 23:13:35'),
(139, 10, 8, 14, '2026-08-24', NULL, 'selesai', 0.00, '2026-08-24 02:52:22', '2026-08-24 02:53:17'),
(140, 16, 10, 14, '2026-08-24', NULL, 'selesai', 0.00, '2026-08-24 03:28:59', '2026-08-24 03:30:34'),
(141, 15, 9, 15, '2026-08-24', NULL, 'selesai', 0.00, '2026-08-26 00:51:17', '2026-08-26 00:52:04'),
(142, 18, 9, 4, '2026-08-24', NULL, 'selesai', 0.00, '2026-08-26 00:52:20', '2026-08-26 00:52:25'),
(143, 9, 7, 15, '2026-08-26', NULL, 'selesai', 0.00, '2026-08-26 01:20:25', '2026-08-26 01:21:15'),
(144, 14, 8, 15, '2026-08-26', NULL, 'selesai', 0.00, '2026-08-26 01:52:38', '2026-08-26 01:53:22'),
(145, 7, 8, 16, '2026-08-26', NULL, 'selesai', 0.00, '2026-08-26 01:53:54', '2026-08-26 01:56:50'),
(146, 10, 7, 15, '2026-08-26', NULL, 'selesai', 0.00, '2026-08-26 02:59:15', '2026-08-26 03:00:21'),
(147, 11, 8, 15, '2026-08-26', NULL, 'selesai', 0.00, '2026-08-26 03:06:12', '2026-08-26 03:06:58'),
(148, 8, 9, 16, '2026-08-26', NULL, 'selesai', 0.00, '2026-08-26 03:07:37', '2026-08-26 03:09:32'),
(149, 18, 9, 5, '2026-08-26', NULL, 'selesai', 0.00, '2026-08-26 03:10:55', '2026-08-26 03:10:59'),
(150, 15, 9, 16, '2026-08-26', NULL, 'selesai', 0.00, '2026-08-26 03:11:11', '2026-08-26 03:12:12'),
(151, 16, 9, 15, '2026-08-26', NULL, 'selesai', 0.00, '2026-08-26 03:12:28', '2026-08-26 03:12:41'),
(152, 14, 8, 16, '2026-08-27', NULL, 'selesai', 0.00, '2026-08-26 23:51:44', '2026-08-26 23:51:54'),
(153, 9, 7, 16, '2026-08-27', NULL, 'selesai', 0.00, '2026-08-27 01:02:33', '2026-08-27 01:42:20'),
(154, 8, 8, 17, '2026-08-27', NULL, 'selesai', 0.00, '2026-08-27 01:15:37', '2026-08-27 01:17:47'),
(155, 7, 10, 17, '2026-08-27', NULL, 'selesai', 0.00, '2026-08-27 01:33:32', '2026-08-27 01:37:23'),
(156, 16, 10, 16, '2026-08-27', NULL, 'selesai', 0.00, '2026-08-27 02:46:47', '2026-08-27 04:00:08'),
(157, 11, 7, 16, '2026-08-27', NULL, 'selesai', 0.00, '2026-08-27 03:11:08', '2026-08-27 03:12:08'),
(158, 10, 8, 16, '2026-08-27', NULL, 'selesai', 0.00, '2026-08-27 03:31:23', '2026-08-27 03:32:04'),
(159, 18, 9, 6, '2026-08-27', NULL, 'selesai', 0.00, '2026-08-27 03:31:56', '2026-08-27 03:32:02'),
(160, 15, 9, 17, '2026-08-27', NULL, 'selesai', 0.00, '2026-08-27 03:32:12', '2026-08-27 03:32:26'),
(161, 13, 6, 8, '2026-08-27', NULL, 'selesai', 0.00, '2026-08-27 03:52:35', '2026-08-27 03:52:56'),
(162, 13, 6, 9, '2026-08-26', NULL, 'selesai', 0.00, '2026-08-27 03:53:16', '2026-08-27 03:53:41'),
(163, 12, 6, 6, '2026-08-26', NULL, 'selesai', 0.00, '2026-08-27 03:54:07', '2026-08-27 03:54:20'),
(164, 14, 8, 17, '2026-08-28', NULL, 'selesai', 0.00, '2026-08-28 00:11:03', '2026-08-28 00:11:17'),
(165, 8, 10, 18, '2026-08-28', NULL, 'selesai', 0.00, '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(166, 7, 8, 18, '2026-08-28', NULL, 'selesai', 0.00, '2026-08-28 01:40:43', '2026-08-28 01:41:44'),
(167, 9, 7, 17, '2026-08-28', NULL, 'selesai', 0.00, '2026-08-28 01:41:58', '2026-08-28 01:42:35'),
(168, 11, 8, 17, '2026-08-28', NULL, 'selesai', 0.00, '2026-08-28 03:05:39', '2026-08-28 03:06:20'),
(169, 10, 7, 17, '2026-08-28', NULL, 'selesai', 0.00, '2026-08-28 03:09:48', '2026-08-28 03:10:39'),
(170, 16, 10, 17, '2026-08-28', NULL, 'selesai', 0.00, '2026-08-28 03:11:44', '2026-08-28 03:12:43'),
(171, 18, 9, 7, '2026-08-28', NULL, 'selesai', 0.00, '2026-08-28 03:15:47', '2026-08-28 03:15:52'),
(172, 15, 9, 18, '2026-08-28', NULL, 'selesai', 0.00, '2026-08-28 03:16:08', '2026-08-28 03:16:27'),
(173, 13, 6, 10, '2026-08-28', NULL, 'selesai', 0.00, '2026-08-28 03:40:07', '2026-08-28 03:40:32'),
(174, 17, 7, 5, '2026-08-28', NULL, 'selesai', 0.00, '2026-08-28 05:53:53', '2026-08-28 05:54:02'),
(175, 17, 7, 6, '2026-08-21', NULL, 'selesai', 0.00, '2026-08-28 05:54:16', '2026-08-28 05:54:22'),
(176, 17, 7, 7, '2026-08-24', NULL, 'selesai', 0.00, '2026-08-28 05:54:32', '2026-08-28 05:54:36'),
(177, 17, 7, 8, '2026-08-26', NULL, 'selesai', 0.00, '2026-08-28 05:55:04', '2026-08-28 05:55:08');

-- --------------------------------------------------------

--
-- Table structure for table `presensis`
--

CREATE TABLE `presensis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pertemuan_id` bigint(20) UNSIGNED NOT NULL,
  `siswa_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('hadir','tidak_hadir') NOT NULL,
  `keterangan` text DEFAULT NULL,
  `catatan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `presensis`
--

INSERT INTO `presensis` (`id`, `pertemuan_id`, `siswa_id`, `status`, `keterangan`, `catatan`, `created_at`, `updated_at`) VALUES
(16, 6, 95, 'hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:09:38'),
(17, 6, 96, 'tidak_hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:10:18'),
(18, 6, 97, 'hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:09:38'),
(19, 6, 98, 'hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:09:38'),
(20, 6, 99, 'hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:09:38'),
(21, 6, 100, 'hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:09:38'),
(22, 6, 101, 'hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:09:38'),
(23, 6, 102, 'hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:09:38'),
(24, 6, 103, 'tidak_hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:10:18'),
(25, 6, 104, 'hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:09:38'),
(26, 6, 105, 'hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:09:38'),
(27, 6, 106, 'tidak_hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:10:18'),
(28, 6, 107, 'tidak_hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:10:18'),
(29, 6, 108, 'tidak_hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:10:18'),
(30, 6, 109, 'tidak_hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:10:18'),
(31, 6, 110, 'tidak_hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:10:18'),
(32, 6, 111, 'tidak_hadir', NULL, NULL, '2026-08-03 08:09:38', '2026-08-03 08:10:18'),
(33, 7, 50, 'hadir', NULL, 'Sudah bisa menyebutkan perkalian 1-7, membaca sudah mulai lancar, tetapi menulis masih sangat lamban', '2026-08-03 08:13:11', '2026-08-03 08:19:56'),
(34, 7, 51, 'hadir', NULL, 'Sudah bisa menyebutkan lambang bilangan sampai jutaan, untuk perkalian masih belum hapal', '2026-08-03 08:13:11', '2026-08-03 08:19:56'),
(35, 7, 52, 'hadir', NULL, 'Sudah hapal semua perkalian, dan menyebutkan lambang bilangan sampai jutaan', '2026-08-03 08:13:11', '2026-08-03 08:19:56'),
(36, 7, 53, 'hadir', NULL, 'Sudah hapal sampai perkalian 7 dan sudah bisa menyebutkan lambang bilangan sampai jutaan', '2026-08-03 08:13:11', '2026-08-03 08:19:56'),
(37, 7, 54, 'hadir', NULL, 'Masih sampai perkalian 3, dan sudah bisa menyebutkan lambang bilangan sampai jutaan', '2026-08-03 08:13:11', '2026-08-03 08:19:56'),
(38, 7, 55, 'hadir', NULL, 'Hari ini tulisan nya sudah mulai sedikit rapi, tetapi penjumlahan puluhan dengan puluhan masih perlu dilatih', '2026-08-03 08:13:11', '2026-08-03 08:19:56'),
(39, 8, 112, 'hadir', NULL, 'Tulisan semakin bagus,dan sudah mulai mengenal huruf', '2026-08-03 08:16:58', '2026-08-03 08:23:50'),
(40, 8, 113, 'hadir', NULL, 'Tulisan semakin rapi dan bagus,ejaan sudah semakin bagus dan lancar', '2026-08-03 08:16:58', '2026-08-03 08:23:50'),
(41, 8, 114, 'hadir', NULL, 'Belum bisa memegang pensil dengan benar,menulis huruf masih harus dibantu,belum mengenal huruf', '2026-08-03 08:16:58', '2026-08-03 08:23:50'),
(42, 8, 115, 'hadir', NULL, 'Tulisan sudah semakin bagus,mengenal huruf sebagian', '2026-08-03 08:16:58', '2026-08-03 08:23:50'),
(43, 8, 116, 'hadir', NULL, 'Tulisan sudah mulai bagus,mengenal huruf sebagian,ejaan bagus', '2026-08-03 08:16:58', '2026-08-03 08:23:50'),
(44, 7, 121, 'hadir', NULL, 'Sudah bisa menyebutkan nama bilangan sampai jutaan', '2026-08-03 08:20:54', '2026-08-03 08:20:54'),
(45, 9, 12, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik,tulisan bagus dan rapi', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(46, 9, 13, 'hadir', NULL, 'Harus banyak dibantu,sering kesusahan dalam menulis,sering tertinggal', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(47, 9, 14, 'hadir', NULL, 'Perlu dibantu,bisa memindahkan tulisan dari papan tulis,dikte kurang', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(48, 9, 15, 'hadir', NULL, 'dikte bagus,bisa mengikuti pelajaran tapi harus dibantu', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(49, 9, 16, 'hadir', NULL, 'Harus dibantu,karena kesusahan memindahkan tulisan dari papan tulis,dikte bagus', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(50, 9, 17, 'hadir', NULL, 'Bisa mengikuti pelajaran,mandiri,dikte kurang', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(52, 9, 19, 'hadir', NULL, 'Harus dibantu, kesusahan memindahkan tulisan dari papan tulis,sulit fokus', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(53, 9, 20, 'hadir', NULL, 'Bisa mengikuti pelajaran,sering tertinggal saat menulis karena banyak ribut dikelas ,kurang fokus', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(54, 9, 22, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik sekali', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(55, 9, 23, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik,namun sering tertinggal saat menulis', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(56, 9, 24, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik,', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(57, 9, 25, 'hadir', NULL, 'Bisa mengikuti pelajaran,sering tertinggal menulis', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(58, 9, 26, 'hadir', NULL, 'Perlu dibantu sekali dalam segala hal,menulis,fokus,dan tentang materi yang diajarkan', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(59, 9, 27, 'hadir', NULL, 'Bisa mengikuti pelajaran', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(60, 9, 122, 'hadir', NULL, 'Perlu dibantu,bisa memindahkan tulisan dari papan tulis dengan baik,dikte bagus', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(61, 9, 123, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik', '2026-08-03 08:24:51', '2026-08-03 08:51:45'),
(62, 10, 57, 'hadir', NULL, 'Sudah paham bilangan cacah, namun perkalian kebawah masih kurang teliti', '2026-08-03 08:24:52', '2026-08-03 08:41:31'),
(63, 10, 58, 'hadir', NULL, 'Malas mengerjakan soal, dan kurang teliti dalam perkalian', '2026-08-03 08:24:52', '2026-08-03 08:41:31'),
(64, 10, 59, 'hadir', NULL, 'Sejauh ini masih bisa, belum dapat dideskripsikan karna orang nya pendiam', '2026-08-03 08:24:52', '2026-08-03 08:41:31'),
(65, 10, 60, 'hadir', NULL, 'Sudah paham bilangan cacah, sudah paham perkalian, pokoknya good', '2026-08-03 08:24:52', '2026-08-03 08:41:31'),
(66, 10, 61, 'hadir', NULL, 'Sudah paham bilangan cacah, perlu latihan perkalian karna kurang teliti/mungkin perkalian blm hafal mati', '2026-08-03 08:24:52', '2026-08-03 08:41:31'),
(67, 10, 62, 'hadir', NULL, 'Sudah paham bilangan cacah, perkalian kurang teliti', '2026-08-03 08:24:52', '2026-08-03 08:41:31'),
(68, 10, 63, 'hadir', NULL, 'Lama mengerjakan soal, jd belum tau apakah dia sudah paham bilangan cacah, dan perkalian sangat sangat kurang', '2026-08-03 08:24:52', '2026-08-03 08:41:31'),
(69, 10, 124, 'hadir', NULL, 'Belum tau apakah mengerti bilangan cacah dan perkalia, tadi belum selesai mengerjakan soalnya karena cerita² sama Tania', '2026-08-03 08:24:52', '2026-08-03 08:41:31'),
(70, 10, 125, 'hadir', NULL, 'Belum paham bilangan cacah dan perkalian, anak baru bgt, dan pendiam luar biasa', '2026-08-03 08:24:52', '2026-08-03 08:41:31'),
(71, 11, 72, 'hadir', NULL, 'Sudah bisa operasi campuran bilangan bulat namun sedikit kurang teliti terhadap tanda negatif', '2026-08-03 08:25:56', '2026-08-03 08:47:15'),
(72, 11, 73, 'tidak_hadir', 'Alpha', '-', '2026-08-03 08:25:56', '2026-08-03 08:47:15'),
(73, 11, 74, 'hadir', NULL, 'Sudah bisa operasi campuran bilangan bulat namun sedikit kurang teliti terhadap tanda negatif', '2026-08-03 08:25:56', '2026-08-03 08:47:15'),
(74, 11, 75, 'hadir', NULL, 'Belum paham operasi campuran bilangan bulat, perlu berlatih banyak', '2026-08-03 08:25:56', '2026-08-03 08:47:15'),
(75, 11, 76, 'hadir', NULL, 'Sudah bisa operasi campuran bilangan bulat namun sedikit kurang teliti terhadap tanda negatif', '2026-08-03 08:25:56', '2026-08-03 08:47:15'),
(76, 11, 77, 'tidak_hadir', 'Alpha', '-', '2026-08-03 08:25:56', '2026-08-03 08:47:15'),
(77, 11, 78, 'hadir', NULL, 'Sudah bisa operasi campuran bilangan bulat namun sedikit kurang teliti terhadap tanda negatif', '2026-08-03 08:25:56', '2026-08-03 08:47:15'),
(78, 11, 79, 'tidak_hadir', 'Alpha', '-', '2026-08-03 08:25:56', '2026-08-03 08:47:15'),
(79, 11, 117, 'hadir', NULL, 'Belum tau sudah paham atau tidak, karena tadi belum selesai dan pertama x masuk', '2026-08-03 08:25:56', '2026-08-03 08:47:15'),
(80, 11, 118, 'hadir', NULL, 'Sudah bisa operasi campuran bilangan bulat namun sedikit kurang teliti terhadap tanda negatif dan terlalu banyak berbicara', '2026-08-03 08:25:56', '2026-08-03 08:47:15'),
(81, 11, 119, 'hadir', NULL, 'Belum tau paham atau tidak karena td belum selesai', '2026-08-03 08:25:56', '2026-08-03 08:47:15'),
(91, 13, 28, 'hadir', NULL, 'Perlu dibantu,tulisan susah dibaca', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(92, 13, 29, 'hadir', NULL, 'Sejauh ini bisa mengikuti pelajaran', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(93, 13, 30, 'hadir', NULL, 'Bisa mengikuti pelajaran,tulisan harus banyak diperbaiki', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(94, 13, 31, 'hadir', NULL, 'Bisa mengikuti pelajaran', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(95, 13, 32, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(96, 13, 33, 'hadir', NULL, 'Bisa mengikuti pelajaran', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(97, 13, 34, 'hadir', NULL, 'Perlu dibantu,tulisan juga harus diperbaiki supaya bisa dibaca', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(98, 13, 35, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik sekali', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(99, 13, 36, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik sekali', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(100, 13, 37, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(101, 13, 38, 'hadir', NULL, 'Bisa mengikuti pelajaran,perlu sedikit dibantu', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(102, 13, 42, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik sekali', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(103, 13, 44, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik sekali', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(104, 13, 45, 'hadir', NULL, 'Bisa mengikuti pelajaran', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(105, 13, 46, 'hadir', NULL, 'Bisa mengikuti pelajaran namun harus dibantu', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(106, 13, 47, 'hadir', NULL, 'Bisa mengikuti pelajaran,namun harus dibantu', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(107, 13, 120, 'hadir', NULL, 'Belum ada masuk kelas b.ing hari ini ,mngkn baru?', '2026-08-03 08:52:18', '2026-08-03 09:02:32'),
(108, 14, 80, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik sekali', '2026-08-03 09:03:47', '2026-08-03 09:09:46'),
(109, 14, 81, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik', '2026-08-03 09:03:47', '2026-08-03 09:09:46'),
(110, 14, 82, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik sekali', '2026-08-03 09:03:47', '2026-08-03 09:09:46'),
(111, 14, 83, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik , namun pemahaman grammar kurang, vocabulary bagus', '2026-08-03 09:03:47', '2026-08-03 09:09:46'),
(112, 14, 84, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik namun harus dibantu', '2026-08-03 09:03:47', '2026-08-03 09:09:46'),
(113, 14, 85, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik', '2026-08-03 09:03:47', '2026-08-03 09:09:46'),
(114, 14, 86, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik vocabulary bagus', '2026-08-03 09:03:47', '2026-08-03 09:09:46'),
(115, 14, 87, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik, pemahaman grammar bagus, vocabulary kurang', '2026-08-03 09:03:47', '2026-08-03 09:09:46'),
(116, 14, 88, 'hadir', NULL, 'Bisa mengikuti pelajaran dengan baik, pemahaman grammar bagus, vocabulary kurang', '2026-08-03 09:03:47', '2026-08-03 09:09:46'),
(117, 15, 126, 'hadir', NULL, 'Sudah memahami eksponen', '2026-08-03 18:01:22', '2026-08-03 18:02:02'),
(118, 16, 56, 'hadir', NULL, 'Sudah paham perkalian .Membahas soal cerita dan kelipatan', '2026-08-03 18:48:46', '2026-08-03 18:57:59'),
(119, 16, 67, 'hadir', NULL, 'Sudah paham perkalian. Membahas soal pecahan dalam bentuk perkalian,pembagian,pengurangan dan penjumlahan.', '2026-08-03 18:48:46', '2026-08-03 18:57:59'),
(120, 16, 68, 'hadir', NULL, 'Sudah paham perkalian. Membahas soal pecahan dalam bentuk perkalian,pembagian,pengurangan dan penjumlahan.', '2026-08-03 18:48:46', '2026-08-03 18:57:59'),
(121, 16, 69, 'hadir', NULL, 'Sudah paham perkalian. Membahas soal pecahan dalam bentuk perkalian,pembagian,pengurangan dan penjumlahan.', '2026-08-03 18:48:46', '2026-08-03 18:57:59'),
(122, 16, 70, 'hadir', NULL, 'Sudah paham perkalian. Membahas soal pecahan dalam bentuk perkalian,pembagian,pengurangan dan penjumlahan.', '2026-08-03 18:48:46', '2026-08-03 18:57:59'),
(123, 16, 71, 'hadir', NULL, 'Sudah paham perkalian .Membahas soal cerita dan kelipatan', '2026-08-03 18:48:46', '2026-08-03 18:57:59'),
(124, 17, 112, 'hadir', NULL, NULL, '2026-08-04 00:01:01', '2026-08-04 00:01:01'),
(125, 17, 113, 'hadir', NULL, NULL, '2026-08-04 00:01:01', '2026-08-04 00:01:01'),
(126, 17, 114, 'hadir', NULL, NULL, '2026-08-04 00:01:01', '2026-08-04 00:01:01'),
(127, 17, 115, 'hadir', NULL, NULL, '2026-08-04 00:01:01', '2026-08-04 00:01:01'),
(128, 17, 116, 'hadir', NULL, NULL, '2026-08-04 00:01:01', '2026-08-04 00:01:01'),
(129, 18, 57, 'hadir', NULL, 'Perlu berlatih simple present tense', '2026-08-04 01:06:18', '2026-08-04 07:31:36'),
(130, 18, 58, 'hadir', NULL, 'Perlu berlatih simple present tense', '2026-08-04 01:06:18', '2026-08-04 07:31:36'),
(131, 18, 59, 'hadir', NULL, 'Perlu berlatih simple present tense', '2026-08-04 01:06:18', '2026-08-04 07:31:36'),
(132, 18, 60, 'hadir', NULL, 'Perlu berlatih simple present tense', '2026-08-04 01:06:18', '2026-08-04 07:31:36'),
(133, 18, 61, 'hadir', NULL, 'Perlu berlatih simple present tense', '2026-08-04 01:06:18', '2026-08-04 07:31:36'),
(134, 18, 62, 'hadir', NULL, 'Perlu berlatih simple present tense', '2026-08-04 01:06:18', '2026-08-04 07:31:36'),
(135, 18, 63, 'hadir', NULL, 'Perlu berlatih simple present tense', '2026-08-04 01:06:18', '2026-08-04 07:31:36'),
(136, 18, 124, 'hadir', NULL, 'Perlu berlatih simple present tense', '2026-08-04 01:06:18', '2026-08-04 07:31:36'),
(137, 18, 125, 'hadir', NULL, 'Perlu berlatih simple present tense', '2026-08-04 01:06:18', '2026-08-04 07:31:36'),
(138, 19, 28, 'hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:09:08'),
(139, 19, 29, 'hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:09:08'),
(140, 19, 30, 'hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:09:08'),
(141, 19, 31, 'tidak_hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:42:14'),
(142, 19, 32, 'hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:09:08'),
(143, 19, 33, 'hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:09:08'),
(144, 19, 34, 'hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:09:08'),
(145, 19, 35, 'tidak_hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:42:14'),
(146, 19, 36, 'hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:09:08'),
(147, 19, 37, 'hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:09:08'),
(148, 19, 38, 'hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:09:08'),
(149, 19, 42, 'hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:09:08'),
(150, 19, 44, 'hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:09:08'),
(151, 19, 45, 'hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:09:08'),
(152, 19, 46, 'hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:09:08'),
(153, 19, 47, 'hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:09:08'),
(154, 19, 120, 'hadir', NULL, NULL, '2026-08-04 01:09:08', '2026-08-04 01:09:08'),
(155, 20, 12, 'hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:11:08'),
(156, 20, 13, 'hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:11:08'),
(157, 20, 14, 'tidak_hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:19:27'),
(158, 20, 15, 'hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:11:08'),
(159, 20, 16, 'hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:11:08'),
(160, 20, 17, 'hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:11:08'),
(162, 20, 19, 'tidak_hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:19:27'),
(163, 20, 20, 'hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:11:08'),
(164, 20, 22, 'hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:11:08'),
(165, 20, 23, 'hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:11:08'),
(166, 20, 24, 'hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:11:08'),
(167, 20, 25, 'hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:11:08'),
(168, 20, 26, 'hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:11:08'),
(169, 20, 27, 'hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:11:08'),
(170, 20, 122, 'hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:11:08'),
(171, 20, 123, 'hadir', NULL, NULL, '2026-08-04 01:11:08', '2026-08-04 01:11:08'),
(172, 21, 50, 'hadir', NULL, NULL, '2026-08-04 02:45:32', '2026-08-04 02:45:32'),
(173, 21, 51, 'hadir', NULL, NULL, '2026-08-04 02:45:32', '2026-08-04 02:45:32'),
(174, 21, 52, 'hadir', NULL, NULL, '2026-08-04 02:45:32', '2026-08-04 02:45:32'),
(175, 21, 53, 'hadir', NULL, NULL, '2026-08-04 02:45:32', '2026-08-04 02:45:32'),
(176, 21, 54, 'hadir', NULL, NULL, '2026-08-04 02:45:32', '2026-08-04 02:45:32'),
(177, 21, 55, 'hadir', NULL, NULL, '2026-08-04 02:45:32', '2026-08-04 02:45:32'),
(178, 21, 121, 'hadir', NULL, NULL, '2026-08-04 02:45:32', '2026-08-04 02:45:32'),
(179, 22, 72, 'hadir', NULL, NULL, '2026-08-04 02:48:57', '2026-08-04 02:48:57'),
(180, 22, 73, 'hadir', NULL, NULL, '2026-08-04 02:48:57', '2026-08-04 02:48:57'),
(181, 22, 74, 'hadir', NULL, NULL, '2026-08-04 02:48:57', '2026-08-04 02:48:57'),
(182, 22, 75, 'hadir', NULL, NULL, '2026-08-04 02:48:57', '2026-08-04 02:48:57'),
(183, 22, 76, 'hadir', NULL, NULL, '2026-08-04 02:48:57', '2026-08-04 02:48:57'),
(184, 22, 77, 'tidak_hadir', NULL, NULL, '2026-08-04 02:48:57', '2026-08-04 02:54:10'),
(185, 22, 78, 'hadir', NULL, NULL, '2026-08-04 02:48:57', '2026-08-04 02:48:57'),
(186, 22, 79, 'hadir', NULL, NULL, '2026-08-04 02:48:57', '2026-08-04 02:48:57'),
(187, 22, 117, 'hadir', NULL, NULL, '2026-08-04 02:48:57', '2026-08-04 02:48:57'),
(188, 22, 118, 'hadir', NULL, NULL, '2026-08-04 02:48:57', '2026-08-04 02:48:57'),
(189, 22, 119, 'hadir', NULL, NULL, '2026-08-04 02:48:57', '2026-08-04 02:48:57'),
(190, 23, 80, 'hadir', NULL, 'Lumayan paham mengenai aljabar dan fungsi f(x)', '2026-08-04 03:10:31', '2026-08-04 07:30:32'),
(191, 23, 81, 'tidak_hadir', 'Alpha', '-', '2026-08-04 03:10:31', '2026-08-04 07:30:32'),
(192, 23, 82, 'hadir', NULL, 'Sudah memahami aljabar dan fungsi f(x)', '2026-08-04 03:10:31', '2026-08-04 07:30:32'),
(193, 23, 83, 'hadir', NULL, 'Kurang memahami aljabar dan fungsi f(x)', '2026-08-04 03:10:31', '2026-08-04 07:30:32'),
(194, 23, 84, 'tidak_hadir', 'Alpha', '-', '2026-08-04 03:10:31', '2026-08-04 07:30:32'),
(195, 23, 85, 'tidak_hadir', 'Alpha', '-', '2026-08-04 03:10:31', '2026-08-04 07:30:32'),
(196, 23, 86, 'hadir', NULL, 'Kurang memahami aljabar dan fungsi f(x)', '2026-08-04 03:10:31', '2026-08-04 07:30:32'),
(197, 23, 87, 'hadir', NULL, 'Lumayan paham mengenai aljabar dan fungsi f(x)', '2026-08-04 03:10:31', '2026-08-04 07:30:32'),
(198, 23, 88, 'tidak_hadir', 'Sakit', '-', '2026-08-04 03:10:31', '2026-08-04 07:30:32'),
(199, 24, 56, 'tidak_hadir', 'Absen', NULL, '2026-08-04 03:33:00', '2026-08-04 03:33:29'),
(200, 24, 67, 'hadir', NULL, NULL, '2026-08-04 03:33:00', '2026-08-04 03:33:00'),
(201, 24, 68, 'tidak_hadir', 'Absen', NULL, '2026-08-04 03:33:00', '2026-08-04 03:33:29'),
(202, 24, 69, 'hadir', NULL, NULL, '2026-08-04 03:33:00', '2026-08-04 03:33:00'),
(203, 24, 70, 'hadir', NULL, NULL, '2026-08-04 03:33:00', '2026-08-04 03:33:00'),
(204, 24, 71, 'hadir', NULL, NULL, '2026-08-04 03:33:00', '2026-08-04 03:33:00'),
(205, 25, 95, 'tidak_hadir', NULL, NULL, '2026-08-04 23:50:16', '2026-08-04 23:55:04'),
(206, 25, 96, 'tidak_hadir', NULL, NULL, '2026-08-04 23:50:16', '2026-08-04 23:55:04'),
(207, 25, 97, 'tidak_hadir', NULL, NULL, '2026-08-04 23:50:16', '2026-08-04 23:55:04'),
(208, 25, 98, 'tidak_hadir', NULL, NULL, '2026-08-04 23:50:16', '2026-08-04 23:55:04'),
(209, 25, 99, 'tidak_hadir', NULL, NULL, '2026-08-04 23:50:16', '2026-08-04 23:55:04'),
(210, 25, 100, 'tidak_hadir', NULL, NULL, '2026-08-04 23:50:16', '2026-08-04 23:55:04'),
(211, 25, 101, 'tidak_hadir', NULL, NULL, '2026-08-04 23:50:16', '2026-08-04 23:55:04'),
(212, 25, 102, 'hadir', NULL, NULL, '2026-08-04 23:50:16', '2026-08-04 23:50:16'),
(213, 25, 103, 'hadir', NULL, NULL, '2026-08-04 23:50:16', '2026-08-04 23:50:16'),
(214, 25, 104, 'tidak_hadir', 'sakit', NULL, '2026-08-04 23:50:16', '2026-08-04 23:55:04'),
(215, 25, 105, 'tidak_hadir', 'sakit', NULL, '2026-08-04 23:50:16', '2026-08-04 23:55:04'),
(216, 25, 106, 'hadir', NULL, NULL, '2026-08-04 23:50:16', '2026-08-04 23:50:16'),
(217, 25, 107, 'hadir', NULL, NULL, '2026-08-04 23:50:16', '2026-08-04 23:50:16'),
(218, 25, 108, 'hadir', NULL, NULL, '2026-08-04 23:50:16', '2026-08-04 23:50:16'),
(219, 25, 109, 'hadir', NULL, NULL, '2026-08-04 23:50:16', '2026-08-04 23:50:16'),
(220, 25, 110, 'hadir', NULL, NULL, '2026-08-04 23:50:16', '2026-08-04 23:50:16'),
(221, 25, 111, 'hadir', NULL, NULL, '2026-08-04 23:50:16', '2026-08-04 23:50:16'),
(222, 26, 112, 'hadir', NULL, NULL, '2026-08-05 00:56:33', '2026-08-05 00:56:33'),
(223, 26, 113, 'hadir', NULL, NULL, '2026-08-05 00:56:33', '2026-08-05 00:56:33'),
(224, 26, 114, 'hadir', NULL, NULL, '2026-08-05 00:56:33', '2026-08-05 00:56:33'),
(225, 26, 115, 'hadir', NULL, NULL, '2026-08-05 00:56:33', '2026-08-05 00:56:33'),
(226, 26, 116, 'hadir', NULL, NULL, '2026-08-05 00:56:33', '2026-08-05 00:56:33'),
(227, 27, 12, 'hadir', NULL, NULL, '2026-08-05 01:32:08', '2026-08-05 01:32:08'),
(228, 27, 13, 'tidak_hadir', NULL, NULL, '2026-08-05 01:32:08', '2026-08-05 01:34:02'),
(229, 27, 14, 'tidak_hadir', NULL, NULL, '2026-08-05 01:32:08', '2026-08-05 01:34:02'),
(230, 27, 15, 'hadir', NULL, NULL, '2026-08-05 01:32:08', '2026-08-05 01:32:08'),
(231, 27, 16, 'hadir', NULL, NULL, '2026-08-05 01:32:08', '2026-08-05 01:32:08'),
(232, 27, 17, 'hadir', NULL, NULL, '2026-08-05 01:32:08', '2026-08-05 01:32:08'),
(234, 27, 19, 'tidak_hadir', 'Sakit', NULL, '2026-08-05 01:32:08', '2026-08-05 01:34:02'),
(235, 27, 20, 'hadir', NULL, NULL, '2026-08-05 01:32:08', '2026-08-05 01:32:08'),
(236, 27, 22, 'hadir', NULL, NULL, '2026-08-05 01:32:08', '2026-08-05 01:32:08'),
(237, 27, 23, 'hadir', NULL, NULL, '2026-08-05 01:32:08', '2026-08-05 01:32:08'),
(238, 27, 24, 'hadir', NULL, NULL, '2026-08-05 01:32:08', '2026-08-05 01:32:08'),
(239, 27, 25, 'hadir', NULL, NULL, '2026-08-05 01:32:08', '2026-08-05 01:32:08'),
(240, 27, 26, 'hadir', NULL, NULL, '2026-08-05 01:32:08', '2026-08-05 01:32:08'),
(241, 27, 27, 'hadir', NULL, NULL, '2026-08-05 01:32:08', '2026-08-05 01:32:08'),
(242, 27, 122, 'hadir', NULL, NULL, '2026-08-05 01:32:08', '2026-08-05 01:32:08'),
(243, 27, 123, 'hadir', NULL, NULL, '2026-08-05 01:32:08', '2026-08-05 01:32:08'),
(244, 28, 28, 'hadir', NULL, 'Menulis dan menentukan bilangan cacah', '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(245, 28, 29, 'hadir', NULL, 'Menulis dan menentukan bilangan cacah', '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(246, 28, 30, 'tidak_hadir', NULL, NULL, '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(247, 28, 31, 'tidak_hadir', NULL, NULL, '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(248, 28, 32, 'hadir', NULL, 'Menulis dan menentukan bilangan cacah', '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(249, 28, 33, 'hadir', NULL, 'Menulis dan menentukan bilangan cacah', '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(250, 28, 34, 'hadir', NULL, 'Menulis dan menentukan bilangan cacah', '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(251, 28, 35, 'hadir', NULL, 'Menulis dan menentukan bilangan cacah', '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(252, 28, 36, 'hadir', NULL, 'Menulis dan menentukan bilangan cacah', '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(253, 28, 37, 'hadir', NULL, 'Menulis dan menentukan bilangan cacah', '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(254, 28, 38, 'hadir', NULL, 'Menulis dan menentukan bilangan cacah', '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(255, 28, 42, 'hadir', NULL, 'Membahas soal pecahan dan bilangan', '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(256, 28, 44, 'hadir', NULL, 'Membahas soal pecahan dan bilangan', '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(257, 28, 45, 'hadir', NULL, 'Membahas soal pecahan dan bilangan', '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(258, 28, 46, 'hadir', NULL, 'Membahas soal pecahan dan bilangan', '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(259, 28, 47, 'hadir', NULL, 'Membahas soal pecahan dan bilangan', '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(260, 28, 120, 'hadir', NULL, 'Membahas soal pecahan dan bilangan cacah', '2026-08-05 01:40:51', '2026-08-05 01:46:28'),
(261, 29, 57, 'hadir', NULL, 'Sudah paham mengenai lebih dari, kurang dari dan sama dengan\nPerlu latihan perkalian kebawah', '2026-08-05 02:49:52', '2026-08-05 02:51:49'),
(262, 29, 58, 'hadir', NULL, 'Kurang teliti mengenai operasi hitung campuran', '2026-08-05 02:49:52', '2026-08-05 02:51:49'),
(263, 29, 59, 'hadir', NULL, 'Kurang teliti mengenai operasi hitung campuran', '2026-08-05 02:49:52', '2026-08-05 02:51:49'),
(264, 29, 60, 'hadir', NULL, 'Kurang teliti mengenai operasi hitung campuran', '2026-08-05 02:49:52', '2026-08-05 02:51:49'),
(265, 29, 61, 'hadir', NULL, 'Kurang teliti mengenai operasi hitung campuran', '2026-08-05 02:49:52', '2026-08-05 02:51:49'),
(266, 29, 62, 'hadir', NULL, 'Kurang teliti mengenai operasi hitung campuran', '2026-08-05 02:49:52', '2026-08-05 02:51:49'),
(267, 29, 63, 'hadir', NULL, 'Kurang paham dan teliti mengenai operasi hitung campuran', '2026-08-05 02:49:52', '2026-08-05 02:51:49'),
(268, 29, 124, 'hadir', NULL, 'Kurang paham dan teliti mengenai operasi hitung campuran', '2026-08-05 02:49:52', '2026-08-05 02:51:49'),
(269, 29, 125, 'hadir', NULL, 'Belum hafal perkalian', '2026-08-05 02:49:52', '2026-08-05 02:51:49'),
(270, 30, 80, 'hadir', NULL, NULL, '2026-08-05 02:51:03', '2026-08-05 02:51:03'),
(271, 30, 81, 'tidak_hadir', 'Latihan drumband', NULL, '2026-08-05 02:51:03', '2026-08-05 03:33:17'),
(272, 30, 82, 'hadir', NULL, NULL, '2026-08-05 02:51:03', '2026-08-05 02:51:03'),
(273, 30, 83, 'hadir', NULL, NULL, '2026-08-05 02:51:03', '2026-08-05 02:51:03'),
(274, 30, 84, 'tidak_hadir', NULL, NULL, '2026-08-05 02:51:03', '2026-08-05 03:33:17'),
(275, 30, 85, 'tidak_hadir', NULL, NULL, '2026-08-05 02:51:03', '2026-08-05 03:33:17'),
(276, 30, 86, 'tidak_hadir', NULL, NULL, '2026-08-05 02:51:03', '2026-08-05 03:33:17'),
(277, 30, 87, 'hadir', NULL, NULL, '2026-08-05 02:51:03', '2026-08-05 02:51:03'),
(278, 30, 88, 'hadir', NULL, NULL, '2026-08-05 02:51:03', '2026-08-05 02:51:03'),
(279, 30, 128, 'hadir', NULL, NULL, '2026-08-05 02:51:03', '2026-08-05 02:51:03'),
(280, 30, 129, 'hadir', NULL, NULL, '2026-08-05 02:51:03', '2026-08-05 02:51:03'),
(281, 31, 72, 'hadir', NULL, 'Mengerjakan pr sekolah', '2026-08-05 02:51:58', '2026-08-05 03:51:15'),
(282, 31, 73, 'hadir', NULL, 'Kurang teliti mengenai operasi hitung campuran', '2026-08-05 02:51:58', '2026-08-05 03:51:15'),
(283, 31, 74, 'hadir', NULL, 'Kurang teliti mengenai operasi hitung campuran', '2026-08-05 02:51:58', '2026-08-05 03:51:15'),
(284, 31, 75, 'hadir', NULL, 'Sangat kurang memahami operasi hitung campuran', '2026-08-05 02:51:58', '2026-08-05 03:51:15'),
(285, 31, 76, 'hadir', NULL, 'Kurang teliti mengenai operasi hitung campuran', '2026-08-05 02:51:58', '2026-08-05 03:51:15'),
(286, 31, 77, 'hadir', NULL, 'Sangat kurang memahami operasi hitung campuran', '2026-08-05 02:51:58', '2026-08-05 03:51:15'),
(287, 31, 78, 'hadir', NULL, 'Kurang teliti mengenai operasi hitung campuran', '2026-08-05 02:51:58', '2026-08-05 03:51:15'),
(288, 31, 79, 'tidak_hadir', 'Alpha', '-', '2026-08-05 02:51:58', '2026-08-05 03:51:15'),
(289, 31, 117, 'hadir', NULL, 'Mengerjakan pr sekolah', '2026-08-05 02:51:58', '2026-08-05 03:51:15'),
(290, 31, 118, 'hadir', NULL, 'Kurang teliti mengenai operasi hitung campuran', '2026-08-05 02:51:58', '2026-08-05 03:51:15'),
(291, 31, 119, 'hadir', NULL, 'Kurang teliti mengenai operasi hitung campuran', '2026-08-05 02:51:58', '2026-08-05 03:51:15'),
(292, 32, 56, 'hadir', NULL, 'Membahas operasi hitung bilangan', '2026-08-05 03:06:04', '2026-08-05 03:08:23'),
(293, 32, 67, 'hadir', NULL, 'Membahas soal pecahan', '2026-08-05 03:06:04', '2026-08-05 03:08:23'),
(294, 32, 68, 'tidak_hadir', NULL, 'Membahas soal pecahan', '2026-08-05 03:06:04', '2026-08-05 03:08:23'),
(295, 32, 69, 'hadir', NULL, 'Membahas soal pecahan', '2026-08-05 03:06:04', '2026-08-05 03:08:23'),
(296, 32, 70, 'hadir', NULL, 'Membahas soal pecahan', '2026-08-05 03:06:04', '2026-08-05 03:08:23'),
(297, 32, 71, 'hadir', NULL, 'Membahas operasi hitung bilangan', '2026-08-05 03:06:04', '2026-08-05 03:08:23'),
(298, 33, 50, 'hadir', NULL, NULL, '2026-08-05 03:25:30', '2026-08-05 03:25:30'),
(299, 33, 51, 'hadir', NULL, NULL, '2026-08-05 03:25:30', '2026-08-05 03:25:30'),
(300, 33, 52, 'hadir', NULL, NULL, '2026-08-05 03:25:30', '2026-08-05 03:25:30'),
(301, 33, 53, 'hadir', NULL, NULL, '2026-08-05 03:25:30', '2026-08-05 03:25:30'),
(302, 33, 54, 'hadir', NULL, NULL, '2026-08-05 03:25:30', '2026-08-05 03:25:30'),
(303, 33, 55, 'hadir', NULL, NULL, '2026-08-05 03:25:30', '2026-08-05 03:25:30'),
(304, 33, 121, 'hadir', NULL, NULL, '2026-08-05 03:25:30', '2026-08-05 03:25:30'),
(305, 33, 127, 'hadir', NULL, NULL, '2026-08-05 03:25:30', '2026-08-05 03:25:30'),
(306, 34, 112, 'hadir', NULL, NULL, '2026-08-06 00:01:05', '2026-08-06 00:01:05'),
(307, 34, 113, 'hadir', NULL, NULL, '2026-08-06 00:01:05', '2026-08-06 00:01:05'),
(308, 34, 114, 'hadir', NULL, NULL, '2026-08-06 00:01:05', '2026-08-06 00:01:05'),
(309, 34, 115, 'hadir', NULL, NULL, '2026-08-06 00:01:05', '2026-08-06 00:01:05'),
(310, 34, 116, 'hadir', NULL, NULL, '2026-08-06 00:01:05', '2026-08-06 00:01:05'),
(311, 35, 28, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(312, 35, 29, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(313, 35, 30, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(314, 35, 31, 'tidak_hadir', 'Alpha', NULL, '2026-08-06 01:23:27', '2026-08-06 01:25:31'),
(315, 35, 32, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(316, 35, 33, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(317, 35, 34, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(318, 35, 35, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(319, 35, 36, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(320, 35, 37, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(321, 35, 38, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(322, 35, 42, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(323, 35, 44, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(324, 35, 45, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(325, 35, 46, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(326, 35, 47, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(327, 35, 120, 'hadir', NULL, NULL, '2026-08-06 01:23:27', '2026-08-06 01:23:27'),
(328, 36, 50, 'hadir', NULL, NULL, '2026-08-06 01:26:05', '2026-08-06 01:26:05'),
(329, 36, 51, 'hadir', NULL, NULL, '2026-08-06 01:26:05', '2026-08-06 01:26:05'),
(330, 36, 52, 'hadir', NULL, NULL, '2026-08-06 01:26:05', '2026-08-06 01:26:05'),
(331, 36, 53, 'hadir', NULL, NULL, '2026-08-06 01:26:05', '2026-08-06 01:26:05'),
(332, 36, 54, 'hadir', NULL, NULL, '2026-08-06 01:26:05', '2026-08-06 01:26:05'),
(333, 36, 55, 'tidak_hadir', 'Alpha', NULL, '2026-08-06 01:26:05', '2026-08-06 01:27:28'),
(334, 36, 121, 'hadir', NULL, NULL, '2026-08-06 01:26:05', '2026-08-06 01:26:05'),
(335, 36, 127, 'hadir', NULL, NULL, '2026-08-06 01:26:05', '2026-08-06 01:26:05'),
(336, 37, 57, 'hadir', NULL, 'Perlu perbanyak kosakata dan membaca dalam bahasa Inggris', '2026-08-06 01:48:53', '2026-08-06 05:29:32'),
(337, 37, 58, 'hadir', NULL, 'Perlu perbanyak kosakata dan membaca dalam bahasa', '2026-08-06 01:48:53', '2026-08-06 05:29:32'),
(338, 37, 59, 'hadir', NULL, 'Perlu perbanyak kosakata dan membaca dalam bahasa', '2026-08-06 01:48:53', '2026-08-06 05:29:32'),
(339, 37, 60, 'hadir', NULL, 'Perlu perbanyak kosakata dan membaca dalam bahasa', '2026-08-06 01:48:53', '2026-08-06 05:29:32'),
(340, 37, 61, 'hadir', NULL, 'Perlu perbanyak kosakata dan membaca dalam bahasa', '2026-08-06 01:48:53', '2026-08-06 05:29:32'),
(341, 37, 62, 'tidak_hadir', 'Alpha', '-', '2026-08-06 01:48:53', '2026-08-06 05:29:32'),
(342, 37, 63, 'hadir', NULL, 'Perlu perbanyak kosakata dan membaca dalam bahasa', '2026-08-06 01:48:53', '2026-08-06 05:29:32'),
(343, 37, 124, 'hadir', NULL, 'Perlu perbanyak kosakata dan membaca dalam bahasa', '2026-08-06 01:48:53', '2026-08-06 05:29:32'),
(344, 37, 125, 'hadir', NULL, 'Perlu perbanyak kosakata dan membaca dalam bahasa', '2026-08-06 01:48:53', '2026-08-06 05:29:32'),
(345, 38, 72, 'hadir', NULL, NULL, '2026-08-06 03:26:45', '2026-08-06 03:26:45'),
(346, 38, 73, 'hadir', NULL, NULL, '2026-08-06 03:26:45', '2026-08-06 03:26:45'),
(347, 38, 74, 'hadir', NULL, NULL, '2026-08-06 03:26:45', '2026-08-06 03:26:45'),
(348, 38, 75, 'hadir', NULL, NULL, '2026-08-06 03:26:45', '2026-08-06 03:26:45'),
(349, 38, 76, 'hadir', NULL, NULL, '2026-08-06 03:26:45', '2026-08-06 03:26:45'),
(350, 38, 77, 'hadir', NULL, NULL, '2026-08-06 03:26:45', '2026-08-06 03:26:45'),
(351, 38, 78, 'hadir', NULL, NULL, '2026-08-06 03:26:45', '2026-08-06 03:26:45'),
(352, 38, 79, 'tidak_hadir', 'Sakit', NULL, '2026-08-06 03:26:45', '2026-08-06 03:28:12'),
(353, 38, 117, 'hadir', NULL, NULL, '2026-08-06 03:26:45', '2026-08-06 03:26:45'),
(354, 38, 118, 'hadir', NULL, NULL, '2026-08-06 03:26:45', '2026-08-06 03:26:45'),
(355, 38, 119, 'hadir', NULL, NULL, '2026-08-06 03:26:45', '2026-08-06 03:26:45'),
(356, 39, 12, 'hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:22:29'),
(357, 39, 13, 'hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:22:29'),
(358, 39, 14, 'tidak_hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:29:27'),
(359, 39, 15, 'hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:22:29'),
(360, 39, 16, 'hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:22:29'),
(361, 39, 17, 'hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:22:29'),
(363, 39, 19, 'hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:22:29'),
(364, 39, 20, 'hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:22:29'),
(365, 39, 22, 'hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:22:29'),
(366, 39, 23, 'hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:22:29'),
(367, 39, 24, 'hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:22:29'),
(368, 39, 25, 'hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:22:29'),
(369, 39, 26, 'hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:22:29'),
(370, 39, 27, 'hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:22:29'),
(371, 39, 122, 'hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:22:29'),
(372, 39, 123, 'hadir', NULL, NULL, '2026-08-06 04:22:29', '2026-08-06 04:22:29'),
(373, 40, 56, 'hadir', NULL, NULL, '2026-08-06 04:29:56', '2026-08-06 04:29:56'),
(374, 40, 67, 'hadir', NULL, NULL, '2026-08-06 04:29:56', '2026-08-06 04:29:56'),
(375, 40, 68, 'hadir', NULL, NULL, '2026-08-06 04:29:56', '2026-08-06 04:29:56'),
(376, 40, 69, 'hadir', NULL, NULL, '2026-08-06 04:29:56', '2026-08-06 04:29:56'),
(377, 40, 70, 'hadir', NULL, NULL, '2026-08-06 04:29:56', '2026-08-06 04:29:56'),
(378, 40, 71, 'hadir', NULL, NULL, '2026-08-06 04:29:56', '2026-08-06 04:29:56'),
(379, 41, 80, 'hadir', NULL, 'Perlu perbanyak soal² perpangkatan', '2026-08-06 04:30:58', '2026-08-06 05:30:56'),
(380, 41, 81, 'tidak_hadir', 'Alpha', '-', '2026-08-06 04:30:58', '2026-08-06 05:32:46'),
(381, 41, 82, 'hadir', NULL, 'Sudah paham perpangkatan', '2026-08-06 04:30:58', '2026-08-06 05:30:56'),
(382, 41, 83, 'tidak_hadir', 'Alpha', '-', '2026-08-06 04:30:58', '2026-08-06 05:30:56'),
(383, 41, 84, 'tidak_hadir', 'Alpha', '-', '2026-08-06 04:30:58', '2026-08-06 05:30:56'),
(384, 41, 85, 'tidak_hadir', 'Alpha', '-', '2026-08-06 04:30:58', '2026-08-06 05:30:56'),
(385, 41, 86, 'hadir', NULL, 'Perlu perbanyak soal² perpangkatan', '2026-08-06 04:30:58', '2026-08-06 05:30:56'),
(386, 41, 87, 'hadir', NULL, 'Perlu perbanyak soal² perpangkatan', '2026-08-06 04:30:58', '2026-08-06 05:30:56'),
(387, 41, 88, 'tidak_hadir', 'Sakit', '-', '2026-08-06 04:30:58', '2026-08-06 05:30:56'),
(388, 41, 128, 'hadir', NULL, 'Perlu perbanyak soal² perpangkatan', '2026-08-06 04:30:58', '2026-08-06 05:30:56'),
(389, 41, 129, 'hadir', NULL, 'Perlu perbanyak soal² perpangkatan', '2026-08-06 04:30:58', '2026-08-06 05:30:56'),
(390, 42, 126, 'hadir', NULL, 'Sudah paham eksponen, perlu perbanyak soal soal aja', '2026-08-06 05:27:03', '2026-08-06 05:27:48'),
(391, 43, 126, 'tidak_hadir', 'Izin', NULL, '2026-08-06 05:32:57', '2026-08-06 05:33:05'),
(392, 44, 112, 'hadir', NULL, NULL, '2026-08-07 00:33:38', '2026-08-07 00:33:38'),
(393, 44, 113, 'hadir', NULL, NULL, '2026-08-07 00:33:38', '2026-08-07 00:33:38'),
(394, 44, 114, 'hadir', NULL, NULL, '2026-08-07 00:33:38', '2026-08-07 00:33:38'),
(395, 44, 115, 'hadir', NULL, NULL, '2026-08-07 00:33:38', '2026-08-07 00:33:38'),
(396, 44, 116, 'hadir', NULL, NULL, '2026-08-07 00:33:38', '2026-08-07 00:33:38'),
(397, 45, 12, 'hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:18:43'),
(398, 45, 13, 'hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:18:43'),
(399, 45, 14, 'tidak_hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:22:05'),
(400, 45, 15, 'tidak_hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:22:05'),
(401, 45, 16, 'hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:18:43'),
(402, 45, 17, 'hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:18:43'),
(404, 45, 19, 'hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:18:43'),
(405, 45, 20, 'hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:18:43'),
(406, 45, 22, 'tidak_hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:22:05'),
(407, 45, 23, 'hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:18:43'),
(408, 45, 24, 'hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:18:43'),
(409, 45, 25, 'hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:18:43'),
(410, 45, 26, 'hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:18:43'),
(411, 45, 27, 'tidak_hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:22:05'),
(412, 45, 122, 'hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:18:43'),
(413, 45, 123, 'hadir', NULL, NULL, '2026-08-07 01:18:43', '2026-08-07 01:18:43'),
(414, 46, 57, 'hadir', NULL, 'Perlu latihan perkalian', '2026-08-07 01:25:09', '2026-08-07 04:00:37'),
(415, 46, 58, 'hadir', NULL, 'Perlu latihan perkalian', '2026-08-07 01:25:09', '2026-08-07 04:00:37'),
(416, 46, 59, 'hadir', NULL, 'Perlu latihan perkalian', '2026-08-07 01:25:09', '2026-08-07 04:00:37'),
(417, 46, 60, 'hadir', NULL, 'Kurang teliti perkalian', '2026-08-07 01:25:09', '2026-08-07 04:00:37'),
(418, 46, 61, 'hadir', NULL, 'Kurang teliti perkalian', '2026-08-07 01:25:09', '2026-08-07 04:00:37'),
(419, 46, 62, 'hadir', NULL, 'Kurang teliti perkalian', '2026-08-07 01:25:09', '2026-08-07 04:00:37'),
(420, 46, 63, 'hadir', NULL, 'Perlu latihan perkalian', '2026-08-07 01:25:09', '2026-08-07 04:00:37'),
(421, 46, 124, 'hadir', NULL, 'Perlu latihan perkalian', '2026-08-07 01:25:09', '2026-08-07 04:00:37'),
(422, 46, 125, 'hadir', NULL, 'Perlu latihan perkalian', '2026-08-07 01:25:09', '2026-08-07 04:00:37'),
(423, 47, 28, 'tidak_hadir', NULL, NULL, '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(424, 47, 29, 'tidak_hadir', NULL, NULL, '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(425, 47, 30, 'tidak_hadir', NULL, NULL, '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(426, 47, 31, 'hadir', NULL, 'Evaluasi dan membahas soal cerita', '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(427, 47, 32, 'hadir', NULL, 'Evaluasi dan membahas soal cerita', '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(428, 47, 33, 'hadir', NULL, 'Evaluasi dan membahas soal cerita', '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(429, 47, 34, 'hadir', NULL, 'Evaluasi dan membahas soal cerita', '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(430, 47, 35, 'hadir', NULL, 'Evaluasi dan membahas soal cerita', '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(431, 47, 36, 'hadir', NULL, 'Evaluasi dan membahas soal cerita', '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(432, 47, 37, 'tidak_hadir', NULL, NULL, '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(433, 47, 38, 'hadir', NULL, 'Evaluasi dan membahas soal cerita', '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(434, 47, 42, 'hadir', NULL, 'Evaluasi dan membahas soal cerita', '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(435, 47, 44, 'hadir', NULL, 'Evaluasi dan membahas soal cerita', '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(436, 47, 45, 'hadir', NULL, 'Evaluasi dan membahas soal cerita', '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(437, 47, 46, 'hadir', NULL, 'Evaluasi dan membahas soal cerita', '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(438, 47, 47, 'hadir', NULL, 'Evaluasi dan membahas soal cerita', '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(439, 47, 120, 'hadir', NULL, 'Evaluasi dan membahas soal cerita', '2026-08-07 02:15:33', '2026-08-07 02:18:35'),
(440, 48, 72, 'hadir', NULL, 'Kurang teliti perkalian', '2026-08-07 02:53:06', '2026-08-07 04:02:29'),
(441, 48, 73, 'hadir', NULL, 'Kurang teliti perkalian', '2026-08-07 02:53:06', '2026-08-07 04:02:29'),
(442, 48, 74, 'hadir', NULL, 'Sudah bisa perkalian', '2026-08-07 02:53:06', '2026-08-07 04:02:29'),
(443, 48, 75, 'tidak_hadir', 'Sakit', '-', '2026-08-07 02:53:06', '2026-08-07 04:02:29'),
(444, 48, 76, 'hadir', NULL, 'Sudah bisa perkalian', '2026-08-07 02:53:06', '2026-08-07 04:02:29'),
(445, 48, 77, 'hadir', NULL, 'Perlu latihan perkalian', '2026-08-07 02:53:06', '2026-08-07 04:02:29'),
(446, 48, 78, 'hadir', NULL, 'Kurang teliti perkalian', '2026-08-07 02:53:06', '2026-08-07 04:02:29'),
(447, 48, 79, 'hadir', NULL, 'Kurang teliti perkalian', '2026-08-07 02:53:06', '2026-08-07 04:02:29'),
(448, 48, 117, 'hadir', NULL, 'Perlu latihan perkalian', '2026-08-07 02:53:06', '2026-08-07 04:02:29'),
(449, 48, 118, 'hadir', NULL, 'Kurang teliti perkalian', '2026-08-07 02:53:06', '2026-08-07 04:02:29'),
(450, 48, 119, 'hadir', NULL, 'Perlu latihan perkalian', '2026-08-07 02:53:06', '2026-08-07 04:02:29'),
(451, 49, 50, 'hadir', NULL, 'Sudah mulai paham menulis nama bilangan sampai jutaan', '2026-08-07 03:27:31', '2026-08-07 03:30:28'),
(452, 49, 51, 'hadir', NULL, 'Masih dimateri yg sama', '2026-08-07 03:27:31', '2026-08-07 03:30:28'),
(453, 49, 52, 'hadir', NULL, 'Sudah bisa perkalian ratusan dengan ratusan', '2026-08-07 03:27:31', '2026-08-07 03:30:28'),
(454, 49, 53, 'hadir', NULL, 'Masih dimateri yg sama, nama bilangan jutaan dan perkalian', '2026-08-07 03:27:31', '2026-08-07 03:30:28'),
(455, 49, 54, 'hadir', NULL, 'Masih jutaan', '2026-08-07 03:27:31', '2026-08-07 03:30:28'),
(456, 49, 55, 'hadir', NULL, 'Sudah bisa menulis nama bilangan sampai ribuan', '2026-08-07 03:27:31', '2026-08-07 03:30:28'),
(457, 49, 121, 'hadir', NULL, 'Sudah bisa perkalian dan menuliskan nama bilangan hingga jutaan', '2026-08-07 03:27:31', '2026-08-07 03:30:28'),
(458, 49, 127, 'hadir', NULL, 'Masih perlu latihan perkalian lebih banyak', '2026-08-07 03:27:31', '2026-08-07 03:30:28'),
(459, 50, 56, 'tidak_hadir', NULL, NULL, '2026-08-07 03:55:49', '2026-08-07 03:56:43'),
(460, 50, 67, 'hadir', NULL, 'Evaluasi pelajaran', '2026-08-07 03:55:49', '2026-08-07 03:56:43'),
(461, 50, 68, 'tidak_hadir', NULL, NULL, '2026-08-07 03:55:49', '2026-08-07 03:56:43'),
(462, 50, 69, 'hadir', NULL, 'Evaluasi pelajaran', '2026-08-07 03:55:49', '2026-08-07 03:56:43'),
(463, 50, 70, 'hadir', NULL, 'Evaluasi pelajaran', '2026-08-07 03:55:49', '2026-08-07 03:56:43'),
(464, 50, 71, 'hadir', NULL, 'Evaluasi pelajaran', '2026-08-07 03:55:49', '2026-08-07 03:56:43'),
(465, 51, 80, 'tidak_hadir', NULL, NULL, '2026-08-07 04:28:57', '2026-08-07 04:29:53'),
(466, 51, 81, 'tidak_hadir', NULL, NULL, '2026-08-07 04:28:57', '2026-08-07 04:29:53'),
(467, 51, 82, 'hadir', NULL, NULL, '2026-08-07 04:28:57', '2026-08-07 04:28:57'),
(468, 51, 83, 'hadir', NULL, NULL, '2026-08-07 04:28:57', '2026-08-07 04:28:57'),
(469, 51, 84, 'hadir', NULL, NULL, '2026-08-07 04:28:57', '2026-08-07 04:28:57'),
(470, 51, 85, 'hadir', NULL, NULL, '2026-08-07 04:28:57', '2026-08-07 04:28:57'),
(471, 51, 86, 'hadir', NULL, NULL, '2026-08-07 04:28:57', '2026-08-07 04:28:57'),
(472, 51, 87, 'tidak_hadir', NULL, NULL, '2026-08-07 04:28:57', '2026-08-07 04:29:53'),
(473, 51, 88, 'tidak_hadir', NULL, NULL, '2026-08-07 04:28:57', '2026-08-07 04:29:53'),
(474, 51, 128, 'hadir', NULL, NULL, '2026-08-07 04:28:57', '2026-08-07 04:28:57'),
(475, 51, 129, 'hadir', NULL, NULL, '2026-08-07 04:28:57', '2026-08-07 04:28:57'),
(476, 52, 112, 'hadir', NULL, NULL, '2026-08-09 23:56:45', '2026-08-09 23:56:45'),
(477, 52, 113, 'hadir', NULL, NULL, '2026-08-09 23:56:45', '2026-08-09 23:56:45'),
(478, 52, 114, 'tidak_hadir', NULL, NULL, '2026-08-09 23:56:45', '2026-08-09 23:57:13'),
(479, 52, 115, 'hadir', NULL, NULL, '2026-08-09 23:56:45', '2026-08-09 23:56:45'),
(480, 52, 116, 'tidak_hadir', NULL, NULL, '2026-08-09 23:56:45', '2026-08-09 23:57:13'),
(481, 53, 12, 'hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:31:54'),
(482, 53, 13, 'tidak_hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:33:49'),
(483, 53, 14, 'tidak_hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:33:49'),
(484, 53, 15, 'tidak_hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:33:49'),
(485, 53, 16, 'hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:31:54'),
(486, 53, 17, 'hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:31:54'),
(487, 53, 19, 'tidak_hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:33:49'),
(488, 53, 20, 'tidak_hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:33:49'),
(489, 53, 22, 'hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:31:54'),
(490, 53, 23, 'tidak_hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:33:49'),
(491, 53, 24, 'hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:31:54'),
(492, 53, 25, 'tidak_hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:33:49'),
(493, 53, 26, 'tidak_hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:33:49'),
(494, 53, 27, 'tidak_hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:33:49'),
(495, 53, 122, 'hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:31:54'),
(496, 53, 123, 'tidak_hadir', NULL, NULL, '2026-08-10 01:31:54', '2026-08-10 01:33:49'),
(497, 54, 28, 'tidak_hadir', NULL, NULL, '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(498, 54, 29, 'hadir', NULL, 'Materi tentang perkalian dan pembagian', '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(499, 54, 30, 'tidak_hadir', NULL, NULL, '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(500, 54, 31, 'hadir', NULL, 'Materi tentang perkalian dan pembagian', '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(501, 54, 32, 'tidak_hadir', NULL, NULL, '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(502, 54, 33, 'hadir', NULL, 'Materi tentang perkalian dan pembagian', '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(503, 54, 34, 'tidak_hadir', NULL, NULL, '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(504, 54, 35, 'tidak_hadir', NULL, NULL, '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(505, 54, 36, 'tidak_hadir', NULL, NULL, '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(506, 54, 37, 'tidak_hadir', NULL, NULL, '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(507, 54, 38, 'hadir', NULL, 'Materi tentang perkalian dan pembagian', '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(508, 54, 42, 'tidak_hadir', NULL, NULL, '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(509, 54, 44, 'hadir', NULL, 'Dekomposisi bilangan', '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(510, 54, 45, 'tidak_hadir', NULL, NULL, '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(511, 54, 46, 'hadir', NULL, 'Dekomposisi bilangan', '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(512, 54, 47, 'tidak_hadir', NULL, NULL, '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(513, 54, 120, 'tidak_hadir', NULL, NULL, '2026-08-10 01:32:56', '2026-08-10 02:04:05'),
(514, 55, 57, 'hadir', NULL, 'Perbanyak latihan perkalian dan pembagian agar terbiasa', '2026-08-10 01:40:09', '2026-08-10 02:32:00'),
(515, 55, 58, 'hadir', NULL, 'Perbanyak latihan perkalian dan pembagian agar terbiasa', '2026-08-10 01:40:09', '2026-08-10 02:32:00'),
(516, 55, 59, 'tidak_hadir', 'Alpha', '-', '2026-08-10 01:40:09', '2026-08-10 02:32:00'),
(517, 55, 60, 'hadir', NULL, 'Perbanyak latihan perkalian dan pembagian agar terbiasa', '2026-08-10 01:40:09', '2026-08-10 02:32:00'),
(518, 55, 61, 'hadir', NULL, 'Perbanyak latihan perkalian dan pembagian agar terbiasa', '2026-08-10 01:40:09', '2026-08-10 02:32:00'),
(519, 55, 62, 'tidak_hadir', 'Alpha', '-', '2026-08-10 01:40:09', '2026-08-10 02:32:00'),
(520, 55, 63, 'hadir', NULL, 'Perbanyak latihan perkalian dan pembagian agar terbiasa', '2026-08-10 01:40:09', '2026-08-10 02:32:00'),
(521, 55, 124, 'tidak_hadir', 'Alpha', '-', '2026-08-10 01:40:09', '2026-08-10 02:32:00'),
(522, 55, 125, 'hadir', NULL, 'Belum hafal perkalian', '2026-08-10 01:40:09', '2026-08-10 02:32:00'),
(523, 56, 50, 'hadir', NULL, 'Sudah mulai bisa mengerjakan soal perkalian 2 angka dengan 2 angka', '2026-08-10 02:52:24', '2026-08-10 02:54:09'),
(524, 56, 51, 'hadir', NULL, 'Sudah hapal perkalian 2&3', '2026-08-10 02:52:24', '2026-08-10 02:54:09'),
(525, 56, 52, 'hadir', NULL, 'Sudah bisa mengerjakan soal pembagian ribuan dengan satua dan nama bilangan sampvi miliran', '2026-08-10 02:52:24', '2026-08-10 02:54:09'),
(526, 56, 53, 'tidak_hadir', NULL, NULL, '2026-08-10 02:52:24', '2026-08-10 02:54:09'),
(527, 56, 54, 'hadir', NULL, 'Perlu lebih banyak dilatih soal perkalian 2 angka dengan 2 angka lagi', '2026-08-10 02:52:24', '2026-08-10 02:54:09');
INSERT INTO `presensis` (`id`, `pertemuan_id`, `siswa_id`, `status`, `keterangan`, `catatan`, `created_at`, `updated_at`) VALUES
(528, 56, 55, 'tidak_hadir', NULL, NULL, '2026-08-10 02:52:24', '2026-08-10 02:54:09'),
(529, 56, 121, 'tidak_hadir', NULL, NULL, '2026-08-10 02:52:24', '2026-08-10 02:54:09'),
(530, 56, 127, 'tidak_hadir', NULL, NULL, '2026-08-10 02:52:24', '2026-08-10 02:54:09'),
(531, 56, 131, 'tidak_hadir', NULL, NULL, '2026-08-10 02:52:24', '2026-08-10 02:54:09'),
(532, 57, 72, 'tidak_hadir', NULL, NULL, '2026-08-10 02:52:29', '2026-08-10 02:53:35'),
(533, 57, 73, 'hadir', NULL, NULL, '2026-08-10 02:52:29', '2026-08-10 02:52:29'),
(534, 57, 74, 'tidak_hadir', NULL, NULL, '2026-08-10 02:52:29', '2026-08-10 02:53:35'),
(535, 57, 75, 'tidak_hadir', NULL, NULL, '2026-08-10 02:52:29', '2026-08-10 02:53:35'),
(536, 57, 76, 'hadir', NULL, NULL, '2026-08-10 02:52:29', '2026-08-10 02:52:29'),
(537, 57, 77, 'hadir', NULL, NULL, '2026-08-10 02:52:29', '2026-08-10 02:52:29'),
(538, 57, 78, 'hadir', NULL, NULL, '2026-08-10 02:52:29', '2026-08-10 02:52:29'),
(539, 57, 79, 'tidak_hadir', NULL, NULL, '2026-08-10 02:52:29', '2026-08-10 02:53:35'),
(540, 57, 117, 'tidak_hadir', NULL, NULL, '2026-08-10 02:52:29', '2026-08-10 02:53:35'),
(541, 57, 118, 'tidak_hadir', NULL, NULL, '2026-08-10 02:52:29', '2026-08-10 02:53:35'),
(542, 57, 119, 'hadir', NULL, NULL, '2026-08-10 02:52:29', '2026-08-10 02:52:29'),
(543, 57, 132, 'hadir', NULL, NULL, '2026-08-10 02:52:29', '2026-08-10 02:52:29'),
(544, 58, 80, 'tidak_hadir', 'Alpha', '-', '2026-08-10 03:05:26', '2026-08-10 03:07:06'),
(545, 58, 81, 'tidak_hadir', 'Sakit', '-', '2026-08-10 03:05:26', '2026-08-10 03:07:06'),
(546, 58, 82, 'hadir', NULL, NULL, '2026-08-10 03:05:26', '2026-08-10 03:05:26'),
(547, 58, 83, 'hadir', NULL, NULL, '2026-08-10 03:05:26', '2026-08-10 03:05:26'),
(548, 58, 84, 'tidak_hadir', 'Alpha', '-', '2026-08-10 03:05:26', '2026-08-10 03:07:06'),
(549, 58, 85, 'tidak_hadir', 'Alpha', '-', '2026-08-10 03:05:26', '2026-08-10 03:07:06'),
(550, 58, 86, 'tidak_hadir', 'Alpha', '-', '2026-08-10 03:05:26', '2026-08-10 03:07:06'),
(551, 58, 87, 'tidak_hadir', 'Alpha', '-', '2026-08-10 03:05:26', '2026-08-10 03:07:06'),
(552, 58, 88, 'tidak_hadir', 'Izin', '-', '2026-08-10 03:05:26', '2026-08-10 03:07:06'),
(553, 58, 128, 'hadir', NULL, NULL, '2026-08-10 03:05:26', '2026-08-10 03:05:26'),
(554, 58, 129, 'tidak_hadir', 'Alpha', '-', '2026-08-10 03:05:26', '2026-08-10 03:07:06'),
(555, 59, 56, 'hadir', NULL, 'Membahas kpk dan fpb', '2026-08-10 03:32:34', '2026-08-10 03:33:59'),
(556, 59, 67, 'hadir', NULL, 'Pecahan biasa ditambah bilangan bulat', '2026-08-10 03:32:34', '2026-08-10 03:33:59'),
(557, 59, 68, 'tidak_hadir', NULL, NULL, '2026-08-10 03:32:34', '2026-08-10 03:33:59'),
(558, 59, 69, 'tidak_hadir', NULL, NULL, '2026-08-10 03:32:34', '2026-08-10 03:33:59'),
(559, 59, 70, 'hadir', NULL, 'Pecahan biasa ditambah bilangan bulat', '2026-08-10 03:32:34', '2026-08-10 03:33:59'),
(560, 59, 71, 'tidak_hadir', NULL, NULL, '2026-08-10 03:32:34', '2026-08-10 03:33:59'),
(561, 59, 130, 'tidak_hadir', NULL, NULL, '2026-08-10 03:32:34', '2026-08-10 03:33:59'),
(562, 60, 112, 'hadir', NULL, 'Sudah pandai mengeja,semakin kenal bnyk huruf', '2026-08-11 00:50:27', '2026-08-11 00:54:35'),
(563, 60, 113, 'hadir', NULL, 'Sudah semakin lancar mengeja', '2026-08-11 00:50:27', '2026-08-11 00:54:35'),
(564, 60, 114, 'hadir', NULL, 'Masih perlu dibantu untuk menulis dan mengenal huruf', '2026-08-11 00:50:27', '2026-08-11 00:54:35'),
(565, 60, 115, 'hadir', NULL, 'Sudah pandai mengeja,semakin kenal bnyk huruf', '2026-08-11 00:50:27', '2026-08-11 00:54:35'),
(566, 60, 116, 'hadir', NULL, 'Sudah pandai mengeja,semakin kenal bnyk huruf', '2026-08-11 00:50:27', '2026-08-11 00:54:35'),
(567, 60, 136, 'hadir', NULL, 'Mengeja lancar,tapi belum lancar  menyatukan ejaan bacaan nya', '2026-08-11 00:50:27', '2026-08-11 00:54:35'),
(568, 61, 57, 'hadir', NULL, 'Perlu latihan mentraslate', '2026-08-11 01:25:17', '2026-08-11 03:12:46'),
(569, 61, 58, 'hadir', NULL, 'Perlu latihan mentraslate', '2026-08-11 01:25:17', '2026-08-11 03:12:46'),
(570, 61, 59, 'hadir', NULL, 'Perlu latihan mentraslate', '2026-08-11 01:25:17', '2026-08-11 03:12:46'),
(571, 61, 60, 'hadir', NULL, 'Perlu latihan mentraslate', '2026-08-11 01:25:17', '2026-08-11 03:12:46'),
(572, 61, 61, 'hadir', NULL, 'Perlu latihan mentraslate', '2026-08-11 01:25:17', '2026-08-11 03:12:46'),
(573, 61, 62, 'hadir', NULL, 'Perlu latihan mentraslate', '2026-08-11 01:25:17', '2026-08-11 03:12:46'),
(574, 61, 63, 'hadir', NULL, 'Perlu latihan mentraslate', '2026-08-11 01:25:17', '2026-08-11 03:12:46'),
(575, 61, 124, 'hadir', NULL, 'Perlu latihan mentraslate', '2026-08-11 01:25:17', '2026-08-11 03:12:46'),
(576, 61, 125, 'hadir', NULL, 'Perlu latihan mentraslate', '2026-08-11 01:25:17', '2026-08-11 03:12:46'),
(577, 61, 137, 'hadir', NULL, 'Perlu latihan mentraslate', '2026-08-11 01:25:17', '2026-08-11 03:12:46'),
(578, 62, 28, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(579, 62, 29, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(580, 62, 30, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(581, 62, 31, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(582, 62, 32, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(583, 62, 33, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(584, 62, 34, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(585, 62, 35, 'tidak_hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:38:31'),
(586, 62, 36, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(587, 62, 37, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(588, 62, 38, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(589, 62, 42, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(590, 62, 44, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(591, 62, 45, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(592, 62, 46, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(593, 62, 47, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(594, 62, 120, 'hadir', NULL, NULL, '2026-08-11 01:36:45', '2026-08-11 01:36:45'),
(595, 63, 12, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(596, 63, 13, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(597, 63, 14, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(598, 63, 15, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(599, 63, 16, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(600, 63, 17, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(601, 63, 19, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(602, 63, 20, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(603, 63, 22, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(604, 63, 23, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(605, 63, 24, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(606, 63, 25, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(607, 63, 26, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(608, 63, 27, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(609, 63, 122, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(610, 63, 123, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(611, 63, 134, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(612, 63, 135, 'hadir', NULL, NULL, '2026-08-11 02:00:39', '2026-08-11 02:00:39'),
(613, 64, 95, 'tidak_hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 02:35:55'),
(614, 64, 96, 'tidak_hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 02:35:55'),
(615, 64, 97, 'tidak_hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 02:35:55'),
(616, 64, 98, 'tidak_hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 02:35:55'),
(617, 64, 99, 'tidak_hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 02:35:55'),
(618, 64, 100, 'tidak_hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 02:35:55'),
(619, 64, 101, 'tidak_hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 03:15:37'),
(620, 64, 102, 'tidak_hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 03:15:37'),
(621, 64, 103, 'tidak_hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 03:15:37'),
(622, 64, 104, 'tidak_hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 03:15:37'),
(623, 64, 105, 'hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 02:35:02'),
(624, 64, 106, 'hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 02:35:02'),
(625, 64, 107, 'hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 02:35:02'),
(626, 64, 108, 'tidak_hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 02:35:55'),
(627, 64, 109, 'hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 02:35:02'),
(628, 64, 110, 'hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 02:35:02'),
(629, 64, 111, 'tidak_hadir', NULL, NULL, '2026-08-11 02:35:02', '2026-08-11 02:35:55'),
(630, 65, 50, 'hadir', NULL, NULL, '2026-08-11 02:39:27', '2026-08-11 02:39:27'),
(631, 65, 51, 'hadir', NULL, NULL, '2026-08-11 02:39:27', '2026-08-11 02:39:27'),
(632, 65, 52, 'hadir', NULL, NULL, '2026-08-11 02:39:27', '2026-08-11 02:39:27'),
(633, 65, 53, 'hadir', NULL, NULL, '2026-08-11 02:39:27', '2026-08-11 02:39:27'),
(634, 65, 54, 'hadir', NULL, NULL, '2026-08-11 02:39:27', '2026-08-11 02:39:27'),
(635, 65, 55, 'tidak_hadir', NULL, NULL, '2026-08-11 02:39:27', '2026-08-11 02:40:12'),
(636, 65, 121, 'hadir', NULL, NULL, '2026-08-11 02:39:27', '2026-08-11 02:39:27'),
(637, 65, 127, 'hadir', NULL, NULL, '2026-08-11 02:39:27', '2026-08-11 02:39:27'),
(638, 65, 131, 'hadir', NULL, NULL, '2026-08-11 02:39:27', '2026-08-11 02:39:27'),
(639, 66, 56, 'tidak_hadir', NULL, NULL, '2026-08-11 03:05:39', '2026-08-11 03:10:38'),
(640, 66, 67, 'hadir', NULL, NULL, '2026-08-11 03:05:39', '2026-08-11 03:05:39'),
(641, 66, 68, 'hadir', NULL, NULL, '2026-08-11 03:05:39', '2026-08-11 03:05:39'),
(642, 66, 69, 'hadir', NULL, NULL, '2026-08-11 03:05:39', '2026-08-11 03:05:39'),
(643, 66, 70, 'hadir', NULL, NULL, '2026-08-11 03:05:39', '2026-08-11 03:05:39'),
(644, 66, 71, 'hadir', NULL, NULL, '2026-08-11 03:05:39', '2026-08-11 03:05:39'),
(645, 66, 130, 'hadir', NULL, NULL, '2026-08-11 03:05:39', '2026-08-11 03:05:39'),
(646, 67, 72, 'hadir', NULL, NULL, '2026-08-11 03:10:52', '2026-08-11 03:10:52'),
(647, 67, 73, 'hadir', NULL, NULL, '2026-08-11 03:10:52', '2026-08-11 03:10:52'),
(648, 67, 74, 'hadir', NULL, NULL, '2026-08-11 03:10:52', '2026-08-11 03:10:52'),
(649, 67, 75, 'tidak_hadir', 'Sakit', NULL, '2026-08-11 03:10:52', '2026-08-11 03:11:43'),
(650, 67, 76, 'hadir', NULL, NULL, '2026-08-11 03:10:52', '2026-08-11 03:10:52'),
(651, 67, 77, 'hadir', NULL, NULL, '2026-08-11 03:10:52', '2026-08-11 03:10:52'),
(652, 67, 78, 'hadir', NULL, NULL, '2026-08-11 03:10:52', '2026-08-11 03:10:52'),
(653, 67, 79, 'tidak_hadir', 'Alpha', NULL, '2026-08-11 03:10:52', '2026-08-11 03:11:43'),
(654, 67, 117, 'hadir', NULL, NULL, '2026-08-11 03:10:52', '2026-08-11 03:10:52'),
(655, 67, 118, 'hadir', NULL, NULL, '2026-08-11 03:10:52', '2026-08-11 03:10:52'),
(656, 67, 119, 'hadir', NULL, NULL, '2026-08-11 03:10:52', '2026-08-11 03:10:52'),
(657, 67, 132, 'hadir', NULL, NULL, '2026-08-11 03:10:52', '2026-08-11 03:10:52'),
(658, 68, 80, 'hadir', NULL, NULL, '2026-08-11 03:18:11', '2026-08-11 03:18:11'),
(659, 68, 81, 'tidak_hadir', NULL, NULL, '2026-08-11 03:18:11', '2026-08-11 03:19:23'),
(660, 68, 82, 'hadir', NULL, NULL, '2026-08-11 03:18:11', '2026-08-11 03:18:11'),
(661, 68, 83, 'tidak_hadir', 'Latihan drumband', NULL, '2026-08-11 03:18:11', '2026-08-11 03:19:23'),
(662, 68, 84, 'hadir', NULL, NULL, '2026-08-11 03:18:11', '2026-08-11 03:18:11'),
(663, 68, 85, 'hadir', NULL, NULL, '2026-08-11 03:18:11', '2026-08-11 03:18:11'),
(664, 68, 86, 'hadir', NULL, NULL, '2026-08-11 03:18:11', '2026-08-11 03:18:11'),
(665, 68, 87, 'hadir', NULL, NULL, '2026-08-11 03:18:11', '2026-08-11 03:18:11'),
(666, 68, 88, 'hadir', NULL, NULL, '2026-08-11 03:18:11', '2026-08-11 03:18:11'),
(667, 68, 128, 'hadir', NULL, NULL, '2026-08-11 03:18:11', '2026-08-11 03:18:11'),
(668, 68, 129, 'hadir', NULL, NULL, '2026-08-11 03:18:11', '2026-08-11 03:18:11'),
(669, 69, 112, 'hadir', NULL, NULL, '2026-08-11 23:57:01', '2026-08-11 23:57:01'),
(670, 69, 113, 'hadir', NULL, NULL, '2026-08-11 23:57:02', '2026-08-11 23:57:02'),
(671, 69, 114, 'hadir', NULL, NULL, '2026-08-11 23:57:02', '2026-08-11 23:57:02'),
(672, 69, 115, 'hadir', NULL, NULL, '2026-08-11 23:57:02', '2026-08-11 23:57:02'),
(673, 69, 116, 'hadir', NULL, NULL, '2026-08-11 23:57:02', '2026-08-11 23:57:02'),
(674, 69, 136, 'hadir', NULL, NULL, '2026-08-11 23:57:02', '2026-08-11 23:57:02'),
(675, 70, 12, 'hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:18:16'),
(676, 70, 13, 'tidak_hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:24:06'),
(677, 70, 14, 'tidak_hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:24:06'),
(678, 70, 15, 'tidak_hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:24:06'),
(679, 70, 16, 'hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:18:16'),
(680, 70, 17, 'hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:18:16'),
(681, 70, 19, 'hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:18:16'),
(682, 70, 20, 'hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:18:16'),
(683, 70, 22, 'hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:18:16'),
(684, 70, 23, 'hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:18:16'),
(685, 70, 24, 'hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:18:16'),
(686, 70, 25, 'hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:18:16'),
(687, 70, 26, 'hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:18:16'),
(688, 70, 27, 'hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:18:16'),
(689, 70, 122, 'hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:18:16'),
(690, 70, 123, 'hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:18:16'),
(691, 70, 134, 'hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:18:16'),
(692, 70, 135, 'tidak_hadir', 'Sakit', NULL, '2026-08-12 01:18:16', '2026-08-12 01:24:06'),
(693, 70, 141, 'hadir', NULL, NULL, '2026-08-12 01:18:16', '2026-08-12 01:18:16'),
(694, 71, 28, 'hadir', NULL, 'Membahas bilangan cacah jutaan', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(695, 71, 29, 'hadir', NULL, 'Membahas bilangan cacah jutaan', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(696, 71, 30, 'tidak_hadir', NULL, '-', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(697, 71, 31, 'tidak_hadir', NULL, '-', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(698, 71, 32, 'hadir', NULL, 'Membahas bilangan cacah jutaan', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(699, 71, 33, 'hadir', NULL, 'Membahas bilangan cacah jutaan', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(700, 71, 34, 'hadir', NULL, 'Membahas bilangan cacah jutaan', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(701, 71, 35, 'hadir', NULL, 'Membahas bilangan cacah jutaan', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(702, 71, 36, 'hadir', NULL, 'Membahas bilangan cacah jutaan', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(703, 71, 37, 'hadir', NULL, 'Membahas bilangan cacah jutaan', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(704, 71, 38, 'hadir', NULL, 'Membahas bilangan cacah jutaan', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(705, 71, 42, 'hadir', NULL, 'Membahas materi dekomposisi bilangan', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(706, 71, 44, 'hadir', NULL, 'Membahas materi dekomposisi bilangan', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(707, 71, 45, 'hadir', NULL, 'Membahas materi dekomposisi bilangan', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(708, 71, 46, 'hadir', NULL, 'Membahas materi dekomposisi bilangan', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(709, 71, 47, 'hadir', NULL, 'Membahas materi dekomposisi bilangan', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(710, 71, 120, 'hadir', NULL, 'Membahas materi dekomposisi bilangan', '2026-08-12 01:43:22', '2026-08-12 01:49:51'),
(711, 72, 95, 'hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:21:44'),
(712, 72, 96, 'tidak_hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:22:10'),
(713, 72, 97, 'hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:21:44'),
(714, 72, 98, 'hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:21:44'),
(715, 72, 99, 'hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:21:44'),
(716, 72, 100, 'hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:21:44'),
(717, 72, 101, 'hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:21:44'),
(718, 72, 102, 'hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:21:44'),
(719, 72, 103, 'hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:21:44'),
(720, 72, 104, 'hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:21:44'),
(721, 72, 105, 'hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:21:44'),
(722, 72, 106, 'hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:21:44'),
(723, 72, 107, 'tidak_hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:22:10'),
(724, 72, 108, 'tidak_hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:22:10'),
(725, 72, 109, 'tidak_hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:22:10'),
(726, 72, 110, 'tidak_hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:22:10'),
(727, 72, 111, 'tidak_hadir', NULL, NULL, '2026-08-12 02:21:44', '2026-08-12 02:22:10'),
(728, 70, 142, 'hadir', NULL, NULL, '2026-08-12 02:22:24', '2026-08-12 02:22:24'),
(729, 73, 89, 'hadir', NULL, NULL, '2026-08-12 02:24:05', '2026-08-12 02:24:05'),
(730, 73, 90, 'tidak_hadir', NULL, NULL, '2026-08-12 02:24:05', '2026-08-12 02:24:30'),
(731, 73, 91, 'tidak_hadir', NULL, NULL, '2026-08-12 02:24:05', '2026-08-12 02:24:30'),
(732, 73, 92, 'hadir', NULL, NULL, '2026-08-12 02:24:05', '2026-08-12 02:24:05'),
(733, 73, 93, 'tidak_hadir', NULL, NULL, '2026-08-12 02:24:05', '2026-08-12 02:25:37'),
(734, 73, 94, 'hadir', NULL, NULL, '2026-08-12 02:24:05', '2026-08-12 02:24:05'),
(735, 73, 133, 'hadir', NULL, NULL, '2026-08-12 02:24:05', '2026-08-12 02:24:05'),
(736, 74, 89, 'hadir', NULL, NULL, '2026-08-12 02:25:06', '2026-08-12 02:25:06'),
(737, 74, 90, 'hadir', NULL, NULL, '2026-08-12 02:25:06', '2026-08-12 02:25:06'),
(738, 74, 91, 'hadir', NULL, NULL, '2026-08-12 02:25:06', '2026-08-12 02:25:06'),
(739, 74, 92, 'hadir', NULL, NULL, '2026-08-12 02:25:06', '2026-08-12 02:25:06'),
(740, 74, 93, 'hadir', NULL, NULL, '2026-08-12 02:25:06', '2026-08-12 02:25:06'),
(741, 74, 94, 'hadir', NULL, NULL, '2026-08-12 02:25:06', '2026-08-12 02:25:06'),
(742, 74, 133, 'hadir', NULL, NULL, '2026-08-12 02:25:06', '2026-08-12 02:25:06'),
(743, 75, 50, 'tidak_hadir', NULL, NULL, '2026-08-12 02:42:19', '2026-08-12 02:45:16'),
(744, 75, 51, 'hadir', NULL, 'Belum paham materi operasi hitung campuran, perlu di latih lagi', '2026-08-12 02:42:19', '2026-08-12 02:45:16'),
(745, 75, 52, 'hadir', NULL, 'Belum paham materi operasi hitung campuran, perlu di latih lagi', '2026-08-12 02:42:19', '2026-08-12 02:45:16'),
(746, 75, 53, 'hadir', NULL, 'Perlu latihan soal lebih banyak lagi tentang op hitung campuran', '2026-08-12 02:42:19', '2026-08-12 02:45:16'),
(747, 75, 54, 'hadir', NULL, 'Belum paham materi operasi hitung campuran, perlu di latih lagi', '2026-08-12 02:42:19', '2026-08-12 02:45:16'),
(748, 75, 55, 'hadir', NULL, NULL, '2026-08-12 02:42:19', '2026-08-12 02:42:19'),
(749, 75, 121, 'hadir', NULL, 'Belum paham materi operasi hitung campuran, perlu di latih lagi', '2026-08-12 02:42:19', '2026-08-12 02:45:16'),
(750, 75, 127, 'hadir', NULL, 'Perlu latihan soal lebih banyak lagi tentang op hitung campuran', '2026-08-12 02:42:19', '2026-08-12 02:45:16'),
(751, 75, 131, 'hadir', NULL, 'Sudah bisa memahami materi op hitung campuran', '2026-08-12 02:42:19', '2026-08-12 02:45:16'),
(752, 75, 140, 'hadir', NULL, 'Belum paham materi operasi hitung campuran, perlu di latih lagi', '2026-08-12 02:42:19', '2026-08-12 02:45:16'),
(753, 76, 57, 'hadir', NULL, 'Perlu latihan perkalian, kurang teliti membandingkan bilangan', '2026-08-12 03:01:14', '2026-08-12 03:03:05'),
(754, 76, 58, 'hadir', NULL, 'Perlu latihan pembagian pecahan', '2026-08-12 03:01:14', '2026-08-12 03:03:05'),
(755, 76, 59, 'hadir', NULL, 'Perlu latihan pembagian pecahan', '2026-08-12 03:01:14', '2026-08-12 03:03:05'),
(756, 76, 60, 'hadir', NULL, 'Sudah paham pembagian pecahan', '2026-08-12 03:01:14', '2026-08-12 03:03:05'),
(757, 76, 61, 'hadir', NULL, 'Perlu latihan pembagian pecahan', '2026-08-12 03:01:14', '2026-08-12 03:03:05'),
(758, 76, 62, 'hadir', NULL, 'Sudah paham pembagian pecahan', '2026-08-12 03:01:14', '2026-08-12 03:03:05'),
(759, 76, 63, 'tidak_hadir', 'Alpha', '-', '2026-08-12 03:01:14', '2026-08-12 03:03:05'),
(760, 76, 124, 'hadir', NULL, 'Perlu latihan pembagian pecahan', '2026-08-12 03:01:14', '2026-08-12 03:03:05'),
(761, 76, 125, 'hadir', NULL, 'Perlu latihan pembagian pecahan', '2026-08-12 03:01:14', '2026-08-12 03:03:05'),
(762, 76, 137, 'hadir', NULL, 'Perlu latihan pembagian pecahan', '2026-08-12 03:01:14', '2026-08-12 03:03:05'),
(763, 76, 138, 'hadir', NULL, 'Perlu latihan pembagian pecahan', '2026-08-12 03:01:14', '2026-08-12 03:03:05'),
(764, 76, 139, 'hadir', NULL, 'Perlu latihan pembagian pecahan', '2026-08-12 03:01:14', '2026-08-12 03:03:05'),
(765, 77, 80, 'hadir', NULL, NULL, '2026-08-12 03:03:12', '2026-08-12 03:03:12'),
(766, 77, 81, 'tidak_hadir', 'Alpha', NULL, '2026-08-12 03:03:12', '2026-08-12 03:04:04'),
(767, 77, 82, 'hadir', NULL, NULL, '2026-08-12 03:03:12', '2026-08-12 03:03:12'),
(768, 77, 83, 'tidak_hadir', 'Alpha', NULL, '2026-08-12 03:03:12', '2026-08-12 03:04:04'),
(769, 77, 84, 'tidak_hadir', 'Alpha', NULL, '2026-08-12 03:03:12', '2026-08-12 03:04:04'),
(770, 77, 85, 'tidak_hadir', 'Alpha', NULL, '2026-08-12 03:03:12', '2026-08-12 03:04:04'),
(771, 77, 86, 'hadir', NULL, NULL, '2026-08-12 03:03:12', '2026-08-12 03:03:12'),
(772, 77, 87, 'tidak_hadir', 'Alpha', NULL, '2026-08-12 03:03:12', '2026-08-12 03:04:04'),
(773, 77, 88, 'tidak_hadir', 'Alpha', NULL, '2026-08-12 03:03:12', '2026-08-12 03:04:04'),
(774, 77, 128, 'hadir', NULL, NULL, '2026-08-12 03:03:12', '2026-08-12 03:03:12'),
(775, 77, 129, 'hadir', NULL, NULL, '2026-08-12 03:03:12', '2026-08-12 03:03:12'),
(776, 78, 56, 'tidak_hadir', NULL, '-', '2026-08-12 03:16:02', '2026-08-12 03:17:26'),
(777, 78, 67, 'hadir', NULL, 'Membahas soal cerita pecahan', '2026-08-12 03:16:02', '2026-08-12 03:17:26'),
(778, 78, 68, 'tidak_hadir', NULL, '-', '2026-08-12 03:16:02', '2026-08-12 03:17:26'),
(779, 78, 69, 'hadir', NULL, 'Membahas soal cerita pecahan', '2026-08-12 03:16:02', '2026-08-12 03:17:26'),
(780, 78, 70, 'hadir', NULL, 'Membahas soal cerita pecahan', '2026-08-12 03:16:02', '2026-08-12 03:17:26'),
(781, 78, 71, 'hadir', NULL, 'Membahas soal cerita pecahan', '2026-08-12 03:16:02', '2026-08-12 03:17:26'),
(782, 78, 130, 'hadir', NULL, 'Soal penjumlahan dan pengurangan', '2026-08-12 03:16:02', '2026-08-12 03:17:26'),
(783, 79, 72, 'hadir', NULL, NULL, '2026-08-12 03:31:00', '2026-08-12 03:31:00'),
(784, 79, 73, 'hadir', NULL, NULL, '2026-08-12 03:31:00', '2026-08-12 03:31:00'),
(785, 79, 74, 'hadir', NULL, NULL, '2026-08-12 03:31:00', '2026-08-12 03:31:00'),
(786, 79, 75, 'hadir', NULL, NULL, '2026-08-12 03:31:00', '2026-08-12 03:31:00'),
(787, 79, 76, 'hadir', NULL, NULL, '2026-08-12 03:31:00', '2026-08-12 03:31:00'),
(788, 79, 77, 'hadir', NULL, NULL, '2026-08-12 03:31:00', '2026-08-12 03:31:00'),
(789, 79, 78, 'hadir', NULL, NULL, '2026-08-12 03:31:00', '2026-08-12 03:31:00'),
(790, 79, 79, 'tidak_hadir', 'Latihan drumband', NULL, '2026-08-12 03:31:00', '2026-08-12 03:32:26'),
(791, 79, 117, 'hadir', NULL, NULL, '2026-08-12 03:31:00', '2026-08-12 03:31:00'),
(792, 79, 118, 'hadir', NULL, NULL, '2026-08-12 03:31:00', '2026-08-12 03:31:00'),
(793, 79, 119, 'hadir', NULL, NULL, '2026-08-12 03:31:00', '2026-08-12 03:31:00'),
(794, 79, 132, 'hadir', NULL, NULL, '2026-08-12 03:31:00', '2026-08-12 03:31:00'),
(795, 80, 112, 'hadir', NULL, NULL, '2026-08-12 23:45:59', '2026-08-12 23:45:59'),
(796, 80, 113, 'hadir', NULL, NULL, '2026-08-12 23:45:59', '2026-08-12 23:45:59'),
(797, 80, 114, 'hadir', NULL, NULL, '2026-08-12 23:45:59', '2026-08-12 23:45:59'),
(798, 80, 115, 'hadir', NULL, NULL, '2026-08-12 23:45:59', '2026-08-12 23:45:59'),
(799, 80, 116, 'hadir', NULL, NULL, '2026-08-12 23:45:59', '2026-08-12 23:45:59'),
(800, 80, 136, 'hadir', NULL, NULL, '2026-08-12 23:45:59', '2026-08-12 23:45:59'),
(801, 81, 28, 'tidak_hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:21:25'),
(802, 81, 29, 'hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:18:43'),
(803, 81, 30, 'hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:18:43'),
(804, 81, 31, 'hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:18:43'),
(805, 81, 32, 'hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:18:43'),
(806, 81, 33, 'hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:18:43'),
(807, 81, 34, 'hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:18:43'),
(808, 81, 35, 'hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:18:43'),
(809, 81, 36, 'hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:18:43'),
(810, 81, 37, 'hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:18:43'),
(811, 81, 38, 'hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:18:43'),
(812, 81, 42, 'tidak_hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:21:25'),
(813, 81, 44, 'hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:18:43'),
(814, 81, 45, 'hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:18:43'),
(815, 81, 46, 'hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:18:43'),
(816, 81, 47, 'tidak_hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:21:25'),
(817, 81, 120, 'hadir', NULL, NULL, '2026-08-13 01:18:43', '2026-08-13 01:18:43'),
(818, 82, 12, 'hadir', NULL, 'Mengenal bilangan cacah ribuan', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(819, 82, 13, 'tidak_hadir', NULL, '-', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(820, 82, 14, 'tidak_hadir', NULL, '-', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(821, 82, 15, 'tidak_hadir', NULL, '-', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(822, 82, 16, 'hadir', NULL, 'Mengenal bilangan cacah ratusan', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(823, 82, 17, 'hadir', NULL, 'Mengenal bilangan cacah ratusan', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(824, 82, 19, 'tidak_hadir', NULL, '-', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(825, 82, 20, 'tidak_hadir', NULL, '-', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(826, 82, 22, 'hadir', NULL, 'Mengenal bilangan cacah ribuan', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(827, 82, 23, 'hadir', NULL, 'Mengenal bilangan cacah ribuan', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(828, 82, 24, 'hadir', NULL, 'Mengenal bilangan cacah ribuan', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(829, 82, 25, 'hadir', NULL, 'Mengenal bilangan cacah ribuan', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(830, 82, 26, 'tidak_hadir', NULL, '-', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(831, 82, 27, 'hadir', NULL, 'Mengenal bilangan cacah ribuan', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(832, 82, 122, 'tidak_hadir', NULL, '-', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(833, 82, 123, 'tidak_hadir', NULL, '-', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(834, 82, 134, 'hadir', NULL, 'Mengenal bilangan cacah ribuan', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(835, 82, 135, 'hadir', NULL, 'Mengenal bilangan cacah ratusan', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(836, 82, 141, 'hadir', NULL, 'Mengenal bilangan cacah ribuan', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(837, 82, 142, 'hadir', NULL, 'Mengenal bilangan cacah ratusan', '2026-08-13 01:22:43', '2026-08-13 02:12:44'),
(838, 83, 57, 'hadir', NULL, 'Perbanyak mentraslate dan menjawab soal cerita', '2026-08-13 02:21:27', '2026-08-13 02:24:00'),
(839, 83, 58, 'hadir', NULL, 'Perbanyak mentraslate dan menjawab soal cerita', '2026-08-13 02:21:27', '2026-08-13 02:24:00'),
(840, 83, 59, 'hadir', NULL, 'Perbanyak mentraslate dan menjawab soal cerita', '2026-08-13 02:21:27', '2026-08-13 02:24:00'),
(841, 83, 60, 'hadir', NULL, 'Perbanyak mentraslate dan menjawab soal cerita', '2026-08-13 02:21:27', '2026-08-13 02:24:00'),
(842, 83, 61, 'hadir', NULL, 'Perbanyak mentraslate dan menjawab soal cerita', '2026-08-13 02:21:27', '2026-08-13 02:24:00'),
(843, 83, 62, 'tidak_hadir', 'Alpha', '-', '2026-08-13 02:21:27', '2026-08-13 02:24:00'),
(844, 83, 63, 'hadir', NULL, 'Perbanyak mentraslate dan menjawab soal cerita', '2026-08-13 02:21:27', '2026-08-13 02:24:00'),
(845, 83, 124, 'hadir', NULL, 'Perbanyak mentraslate dan menjawab soal cerita', '2026-08-13 02:21:27', '2026-08-13 02:24:00'),
(846, 83, 125, 'hadir', NULL, 'Perbanyak mentraslate dan menjawab soal cerita', '2026-08-13 02:21:27', '2026-08-13 02:24:00'),
(847, 83, 137, 'hadir', NULL, 'Perbanyak mentraslate dan menjawab soal cerita', '2026-08-13 02:21:27', '2026-08-13 02:24:00'),
(848, 83, 138, 'hadir', NULL, 'Perbanyak mentraslate dan menjawab soal cerita', '2026-08-13 02:21:27', '2026-08-13 02:24:00'),
(849, 83, 139, 'hadir', NULL, 'Perbanyak mentraslate dan menjawab soal cerita', '2026-08-13 02:21:27', '2026-08-13 02:24:00'),
(850, 84, 50, 'tidak_hadir', NULL, NULL, '2026-08-13 02:51:13', '2026-08-13 02:51:37'),
(851, 84, 51, 'hadir', NULL, NULL, '2026-08-13 02:51:13', '2026-08-13 02:51:13'),
(852, 84, 52, 'hadir', NULL, NULL, '2026-08-13 02:51:13', '2026-08-13 02:51:13'),
(853, 84, 53, 'tidak_hadir', NULL, NULL, '2026-08-13 02:51:13', '2026-08-13 02:51:37'),
(854, 84, 54, 'tidak_hadir', NULL, NULL, '2026-08-13 02:51:13', '2026-08-13 02:51:37'),
(855, 84, 55, 'hadir', NULL, NULL, '2026-08-13 02:51:13', '2026-08-13 02:51:13'),
(856, 84, 121, 'hadir', NULL, NULL, '2026-08-13 02:51:13', '2026-08-13 02:51:13'),
(857, 84, 127, 'hadir', NULL, NULL, '2026-08-13 02:51:13', '2026-08-13 02:51:13'),
(858, 84, 131, 'hadir', NULL, NULL, '2026-08-13 02:51:13', '2026-08-13 02:51:13'),
(859, 84, 140, 'hadir', NULL, NULL, '2026-08-13 02:51:13', '2026-08-13 02:51:13'),
(860, 85, 80, 'hadir', NULL, NULL, '2026-08-13 03:05:14', '2026-08-13 03:05:14'),
(861, 85, 81, 'tidak_hadir', 'Drumband', NULL, '2026-08-13 03:05:14', '2026-08-13 03:06:13'),
(862, 85, 82, 'hadir', NULL, NULL, '2026-08-13 03:05:14', '2026-08-13 03:05:14'),
(863, 85, 83, 'tidak_hadir', 'Drumband', NULL, '2026-08-13 03:05:14', '2026-08-13 03:06:13'),
(864, 85, 84, 'hadir', NULL, NULL, '2026-08-13 03:05:14', '2026-08-13 03:05:14'),
(865, 85, 85, 'hadir', NULL, NULL, '2026-08-13 03:05:14', '2026-08-13 03:05:14'),
(866, 85, 86, 'hadir', NULL, NULL, '2026-08-13 03:05:14', '2026-08-13 03:05:14'),
(867, 85, 87, 'hadir', NULL, NULL, '2026-08-13 03:05:14', '2026-08-13 03:05:14'),
(868, 85, 88, 'hadir', NULL, NULL, '2026-08-13 03:05:14', '2026-08-13 03:05:14'),
(869, 85, 128, 'tidak_hadir', NULL, NULL, '2026-08-13 03:05:14', '2026-08-13 03:06:13'),
(870, 85, 129, 'tidak_hadir', NULL, NULL, '2026-08-13 03:05:14', '2026-08-13 03:06:13'),
(871, 86, 56, 'tidak_hadir', NULL, '-', '2026-08-13 03:31:04', '2026-08-13 06:31:23'),
(872, 86, 67, 'hadir', NULL, 'Membahas soal simple past tense', '2026-08-13 03:31:04', '2026-08-13 06:31:23'),
(873, 86, 68, 'hadir', NULL, 'Membahas soal simple past tense', '2026-08-13 03:31:04', '2026-08-13 06:31:23'),
(874, 86, 69, 'hadir', NULL, 'Membahas soal simple past tense', '2026-08-13 03:31:04', '2026-08-13 06:31:23'),
(875, 86, 70, 'hadir', NULL, 'Membahas soal simple past tense', '2026-08-13 03:31:04', '2026-08-13 06:31:23'),
(876, 86, 71, 'hadir', NULL, 'Membahas soal simple past tense', '2026-08-13 03:31:04', '2026-08-13 06:31:23'),
(877, 86, 130, 'hadir', NULL, 'Vocabulary', '2026-08-13 03:31:04', '2026-08-13 06:31:23'),
(878, 87, 72, 'hadir', NULL, 'Perlu latihan pecahan', '2026-08-13 03:36:02', '2026-08-13 03:39:43'),
(879, 87, 73, 'hadir', NULL, 'Perlu latihan pecahan', '2026-08-13 03:36:02', '2026-08-13 03:39:43'),
(880, 87, 74, 'hadir', NULL, 'Perlu latihan pecahan', '2026-08-13 03:36:02', '2026-08-13 03:39:43'),
(881, 87, 75, 'hadir', NULL, 'Perlu latihan perkalian, Perlu latihan pecahan', '2026-08-13 03:36:02', '2026-08-13 03:39:43'),
(882, 87, 76, 'hadir', NULL, 'Perlu latihan pecahan', '2026-08-13 03:36:02', '2026-08-13 03:39:43'),
(883, 87, 77, 'hadir', NULL, 'Perlu latihan perkalian, Perlu latihan pecahan', '2026-08-13 03:36:02', '2026-08-13 03:39:43'),
(884, 87, 78, 'hadir', NULL, 'Perlu latihan pecahan', '2026-08-13 03:36:02', '2026-08-13 03:39:43'),
(885, 87, 79, 'tidak_hadir', 'Alpha', '-', '2026-08-13 03:36:02', '2026-08-13 03:39:43'),
(886, 87, 117, 'hadir', NULL, 'Perlu latihan pecahan', '2026-08-13 03:36:02', '2026-08-13 03:39:43'),
(887, 87, 118, 'hadir', NULL, 'Perlu latihan pecahan', '2026-08-13 03:36:02', '2026-08-13 03:39:43'),
(888, 87, 119, 'hadir', NULL, 'Perlu latihan pecahan', '2026-08-13 03:36:02', '2026-08-13 03:39:43'),
(889, 87, 132, 'hadir', NULL, 'Perlu latihan pecahan', '2026-08-13 03:36:02', '2026-08-13 03:39:43'),
(890, 88, 12, 'tidak_hadir', 'Sakit', NULL, '2026-08-14 02:05:16', '2026-08-14 02:07:26'),
(891, 88, 13, 'tidak_hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:07:26'),
(892, 88, 14, 'tidak_hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:07:26'),
(893, 88, 15, 'tidak_hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:07:26'),
(894, 88, 16, 'hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:05:16'),
(895, 88, 17, 'tidak_hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:07:26'),
(896, 88, 19, 'tidak_hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:07:26'),
(897, 88, 22, 'tidak_hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:07:26'),
(898, 88, 23, 'tidak_hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:07:26'),
(899, 88, 24, 'hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:05:16'),
(900, 88, 25, 'tidak_hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:07:26'),
(901, 88, 26, 'tidak_hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:07:26'),
(902, 88, 27, 'hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:05:16'),
(903, 88, 122, 'hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:05:16'),
(904, 88, 123, 'tidak_hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:07:26'),
(905, 88, 134, 'tidak_hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:07:26'),
(906, 88, 135, 'tidak_hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:07:26'),
(907, 88, 141, 'tidak_hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:07:26'),
(908, 88, 142, 'hadir', NULL, NULL, '2026-08-14 02:05:16', '2026-08-14 02:05:16'),
(909, 89, 28, 'tidak_hadir', NULL, '-', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(910, 89, 29, 'hadir', NULL, 'Perlombaann Hut RI', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(911, 89, 30, 'tidak_hadir', NULL, '-', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(912, 89, 31, 'tidak_hadir', NULL, '-', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(913, 89, 32, 'hadir', NULL, 'Perlombaann Hut RI', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(914, 89, 33, 'hadir', NULL, 'Perlombaann Hut RI', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(915, 89, 34, 'hadir', NULL, 'Perlombaann Hut RI', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(916, 89, 35, 'hadir', NULL, 'Perlombaann Hut RI', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(917, 89, 36, 'tidak_hadir', NULL, '-', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(918, 89, 37, 'hadir', NULL, 'Perlombaann Hut RI', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(919, 89, 38, 'hadir', NULL, 'Perlombaann Hut RI', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(920, 89, 42, 'hadir', NULL, 'Perlombaann Hut RI', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(921, 89, 44, 'hadir', NULL, 'Perlombaann Hut RI', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(922, 89, 45, 'tidak_hadir', NULL, '-', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(923, 89, 46, 'tidak_hadir', NULL, '-', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(924, 89, 47, 'tidak_hadir', NULL, '-', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(925, 89, 120, 'hadir', NULL, 'Perlombaann Hut RI', '2026-08-14 02:07:09', '2026-08-14 02:10:24'),
(926, 90, 112, 'tidak_hadir', 'Sakit', NULL, '2026-08-18 00:10:16', '2026-08-18 00:11:26'),
(927, 90, 113, 'hadir', NULL, NULL, '2026-08-18 00:10:16', '2026-08-18 00:10:16'),
(928, 90, 114, 'hadir', NULL, NULL, '2026-08-18 00:10:16', '2026-08-18 00:10:16'),
(929, 90, 115, 'tidak_hadir', NULL, NULL, '2026-08-18 00:10:16', '2026-08-18 00:11:26'),
(930, 90, 116, 'tidak_hadir', NULL, NULL, '2026-08-18 00:10:16', '2026-08-18 00:11:26'),
(931, 90, 136, 'hadir', NULL, NULL, '2026-08-18 00:10:16', '2026-08-18 00:10:16'),
(932, 91, 57, 'hadir', NULL, 'Lama menulis, cerita² saja, perlu perbanyak vocabulary', '2026-08-18 01:04:21', '2026-08-18 03:13:52'),
(933, 91, 58, 'hadir', NULL, 'Lama menulis, cerita² saja, perlu perbanyak vocabulary', '2026-08-18 01:04:21', '2026-08-18 03:13:52'),
(934, 91, 59, 'hadir', NULL, 'Lama menulis, cerita² saja, perlu perbanyak vocabulary', '2026-08-18 01:04:21', '2026-08-18 03:13:52'),
(935, 91, 60, 'hadir', NULL, 'Perbanyak vocabulary dan mentraslate ke Indonesia', '2026-08-18 01:04:21', '2026-08-18 03:13:52'),
(936, 91, 61, 'hadir', NULL, 'Perbanyak vocabulary dan mentraslate ke Indonesia', '2026-08-18 01:04:21', '2026-08-18 03:13:52'),
(937, 91, 62, 'hadir', NULL, 'Perbanyak vocabulary dan mentraslate ke Indonesia', '2026-08-18 01:04:21', '2026-08-18 03:13:52'),
(938, 91, 63, 'hadir', NULL, 'Gatau apa yg gak ditau nya, diam aja, sangat sangat perlu vocabulary', '2026-08-18 01:04:21', '2026-08-18 03:13:52'),
(939, 91, 124, 'hadir', NULL, 'Kurang nya vocabulary', '2026-08-18 01:04:21', '2026-08-18 03:13:52'),
(940, 91, 125, 'hadir', NULL, 'Perbanyak vocabulary dan mentraslate ke Indonesia', '2026-08-18 01:04:21', '2026-08-18 03:13:52'),
(941, 91, 137, 'hadir', NULL, 'Lama menulis, cerita², bengong, perbanyak vocabulary', '2026-08-18 01:04:21', '2026-08-18 03:13:52'),
(942, 91, 138, 'hadir', NULL, 'Perbanyak vocabulary dan mentraslate ke Indonesia', '2026-08-18 01:04:21', '2026-08-18 03:13:52'),
(943, 91, 139, 'hadir', NULL, 'Perbanyak vocabulary dan mentraslate ke Indonesia', '2026-08-18 01:04:21', '2026-08-18 03:13:52'),
(944, 92, 12, 'tidak_hadir', NULL, '-', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(945, 92, 13, 'hadir', NULL, 'Membahas bilangan cacah satu puluhan dan ratusan', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(946, 92, 14, 'tidak_hadir', NULL, '-', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(947, 92, 15, 'tidak_hadir', NULL, '-', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(948, 92, 16, 'hadir', NULL, 'Membahas bilangan cacah satu puluhan dan ratusan', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(949, 92, 17, 'hadir', NULL, 'Membahas bilangan cacah satu puluhan dan ratusan', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(950, 92, 19, 'hadir', NULL, 'Membahas bilangan cacah satu puluhan dan ratusan', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(951, 92, 22, 'hadir', NULL, 'Membahas penjumlahan dan pengurangan', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(952, 92, 23, 'hadir', NULL, 'Membahas penjumlahan dan pengurangan', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(953, 92, 24, 'hadir', NULL, 'Membahas penjumlahan dan pengurangan', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(954, 92, 25, 'hadir', NULL, 'Membahas penjumlahan dan pengurangan', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(955, 92, 26, 'tidak_hadir', NULL, '-', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(956, 92, 27, 'hadir', NULL, 'Membahas penjumlahan dan pengurangan', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(957, 92, 122, 'hadir', NULL, 'Membahas bilangan cacah satu puluhan dan ratusan', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(958, 92, 123, 'hadir', NULL, 'Membahas penjumlahan dan pengurangan', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(959, 92, 134, 'hadir', NULL, 'Membahas penjumlahan dan pengurangan', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(960, 92, 135, 'hadir', NULL, 'Membahas bilangan cacah satu puluhan dan ratusan', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(961, 92, 141, 'hadir', NULL, 'Membahas bilangan cacah satu puluhan dan ratusan', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(962, 92, 142, 'hadir', NULL, 'Membahas bilangan cacah satu puluhan dan ratusan', '2026-08-18 01:33:05', '2026-08-18 02:52:05'),
(963, 93, 28, 'tidak_hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:38:19'),
(964, 93, 29, 'hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:36:41'),
(965, 93, 30, 'tidak_hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:38:19'),
(966, 93, 31, 'hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:36:41'),
(967, 93, 32, 'hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:36:41'),
(968, 93, 33, 'hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:36:41'),
(969, 93, 34, 'hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:36:41'),
(970, 93, 35, 'tidak_hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:38:19'),
(971, 93, 36, 'hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:36:41'),
(972, 93, 37, 'hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:36:41'),
(973, 93, 38, 'tidak_hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:38:19'),
(974, 93, 42, 'hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:36:41'),
(975, 93, 44, 'hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:36:41'),
(976, 93, 45, 'hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:36:41'),
(977, 93, 46, 'tidak_hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:38:19'),
(978, 93, 47, 'tidak_hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:38:19'),
(979, 93, 120, 'hadir', NULL, NULL, '2026-08-18 01:36:41', '2026-08-18 01:36:41'),
(980, 94, 56, 'tidak_hadir', NULL, '-', '2026-08-18 03:09:20', '2026-08-18 03:13:46'),
(981, 94, 67, 'hadir', NULL, 'Membahasa soal pecahan campuran', '2026-08-18 03:09:20', '2026-08-18 03:13:46'),
(982, 94, 68, 'hadir', NULL, 'Membahasa soal pecahan campuran', '2026-08-18 03:09:20', '2026-08-18 03:13:46'),
(983, 94, 69, 'tidak_hadir', NULL, '-', '2026-08-18 03:09:20', '2026-08-18 03:13:46'),
(984, 94, 70, 'tidak_hadir', NULL, '-', '2026-08-18 03:09:20', '2026-08-18 03:13:46'),
(985, 94, 71, 'hadir', NULL, 'Membahasa soal pecahan campuran', '2026-08-18 03:09:20', '2026-08-18 03:13:46'),
(986, 94, 130, 'hadir', NULL, 'Penjumlahan dan pengurangan', '2026-08-18 03:09:20', '2026-08-18 03:13:46'),
(987, 95, 50, 'tidak_hadir', NULL, NULL, '2026-08-18 03:13:34', '2026-08-18 03:13:57'),
(988, 95, 51, 'tidak_hadir', NULL, NULL, '2026-08-18 03:13:34', '2026-08-18 03:13:57'),
(989, 95, 52, 'hadir', NULL, NULL, '2026-08-18 03:13:34', '2026-08-18 03:13:34'),
(990, 95, 53, 'hadir', NULL, NULL, '2026-08-18 03:13:34', '2026-08-18 03:13:34'),
(991, 95, 54, 'hadir', NULL, NULL, '2026-08-18 03:13:34', '2026-08-18 03:13:34'),
(992, 95, 55, 'tidak_hadir', NULL, NULL, '2026-08-18 03:13:34', '2026-08-18 03:13:57'),
(993, 95, 121, 'hadir', NULL, NULL, '2026-08-18 03:13:34', '2026-08-18 03:13:34'),
(994, 95, 127, 'hadir', NULL, NULL, '2026-08-18 03:13:34', '2026-08-18 03:13:34'),
(995, 95, 131, 'tidak_hadir', NULL, NULL, '2026-08-18 03:13:34', '2026-08-18 03:13:57'),
(996, 95, 140, 'hadir', NULL, NULL, '2026-08-18 03:13:34', '2026-08-18 03:13:34'),
(997, 96, 72, 'hadir', NULL, NULL, '2026-08-18 03:14:04', '2026-08-18 03:14:04'),
(998, 96, 73, 'hadir', NULL, NULL, '2026-08-18 03:14:04', '2026-08-18 03:14:04'),
(999, 96, 74, 'hadir', NULL, NULL, '2026-08-18 03:14:04', '2026-08-18 03:14:04'),
(1000, 96, 75, 'hadir', NULL, NULL, '2026-08-18 03:14:04', '2026-08-18 03:14:04'),
(1001, 96, 76, 'tidak_hadir', 'Alpha', NULL, '2026-08-18 03:14:04', '2026-08-18 03:15:03'),
(1002, 96, 77, 'hadir', NULL, NULL, '2026-08-18 03:14:04', '2026-08-18 03:14:04'),
(1003, 96, 78, 'tidak_hadir', 'Alpha', NULL, '2026-08-18 03:14:04', '2026-08-18 03:15:03'),
(1004, 96, 79, 'tidak_hadir', 'Alpha', NULL, '2026-08-18 03:14:04', '2026-08-18 03:15:03'),
(1005, 96, 117, 'hadir', NULL, NULL, '2026-08-18 03:14:04', '2026-08-18 03:14:04'),
(1006, 96, 118, 'hadir', NULL, NULL, '2026-08-18 03:14:04', '2026-08-18 03:14:04'),
(1007, 96, 119, 'hadir', NULL, NULL, '2026-08-18 03:14:04', '2026-08-18 03:14:04'),
(1008, 96, 132, 'hadir', NULL, NULL, '2026-08-18 03:14:04', '2026-08-18 03:14:04'),
(1009, 97, 80, 'hadir', NULL, NULL, '2026-08-18 03:21:30', '2026-08-18 03:21:30'),
(1010, 97, 81, 'tidak_hadir', NULL, NULL, '2026-08-18 03:21:30', '2026-08-18 03:23:01'),
(1011, 97, 82, 'hadir', NULL, NULL, '2026-08-18 03:21:30', '2026-08-18 03:21:30'),
(1012, 97, 83, 'hadir', NULL, NULL, '2026-08-18 03:21:30', '2026-08-18 03:21:30'),
(1013, 97, 84, 'tidak_hadir', NULL, NULL, '2026-08-18 03:21:30', '2026-08-18 03:23:01'),
(1014, 97, 85, 'tidak_hadir', NULL, NULL, '2026-08-18 03:21:30', '2026-08-18 03:23:01'),
(1015, 97, 86, 'hadir', NULL, NULL, '2026-08-18 03:21:30', '2026-08-18 03:21:30'),
(1016, 97, 87, 'hadir', NULL, NULL, '2026-08-18 03:21:30', '2026-08-18 03:21:30'),
(1017, 97, 88, 'hadir', NULL, NULL, '2026-08-18 03:21:30', '2026-08-18 03:21:30'),
(1018, 97, 128, 'tidak_hadir', NULL, NULL, '2026-08-18 03:21:30', '2026-08-18 03:23:01'),
(1019, 97, 129, 'hadir', NULL, NULL, '2026-08-18 03:21:30', '2026-08-18 03:21:30'),
(1020, 98, 95, 'tidak_hadir', 'Not class', NULL, '2026-08-18 08:41:02', '2026-08-18 08:42:24'),
(1021, 98, 96, 'tidak_hadir', 'Not class', NULL, '2026-08-18 08:41:02', '2026-08-18 08:42:24'),
(1022, 98, 97, 'tidak_hadir', 'Not class', NULL, '2026-08-18 08:41:02', '2026-08-18 08:42:24'),
(1023, 98, 98, 'tidak_hadir', 'Not class', NULL, '2026-08-18 08:41:02', '2026-08-18 08:42:24'),
(1024, 98, 99, 'tidak_hadir', 'Not class', NULL, '2026-08-18 08:41:02', '2026-08-18 08:42:24'),
(1025, 98, 100, 'tidak_hadir', 'Not class', NULL, '2026-08-18 08:41:02', '2026-08-18 08:42:24'),
(1026, 98, 101, 'tidak_hadir', 'Izin', NULL, '2026-08-18 08:41:02', '2026-08-18 08:42:24'),
(1027, 98, 102, 'hadir', NULL, NULL, '2026-08-18 08:41:02', '2026-08-18 08:41:02'),
(1028, 98, 103, 'hadir', NULL, NULL, '2026-08-18 08:41:02', '2026-08-18 08:41:02'),
(1029, 98, 104, 'hadir', NULL, NULL, '2026-08-18 08:41:02', '2026-08-18 08:41:02'),
(1030, 98, 105, 'hadir', NULL, NULL, '2026-08-18 08:41:02', '2026-08-18 08:41:02'),
(1031, 98, 106, 'hadir', NULL, NULL, '2026-08-18 08:41:02', '2026-08-18 08:41:02'),
(1032, 98, 107, 'tidak_hadir', 'Izin', NULL, '2026-08-18 08:41:02', '2026-08-18 08:42:24'),
(1033, 98, 108, 'hadir', NULL, NULL, '2026-08-18 08:41:02', '2026-08-18 08:41:02'),
(1034, 98, 109, 'hadir', NULL, NULL, '2026-08-18 08:41:02', '2026-08-18 08:41:02'),
(1035, 98, 110, 'hadir', NULL, NULL, '2026-08-18 08:41:02', '2026-08-18 08:41:02'),
(1036, 98, 111, 'hadir', NULL, NULL, '2026-08-18 08:41:02', '2026-08-18 08:41:02'),
(1037, 99, 89, 'hadir', NULL, NULL, '2026-08-18 08:42:38', '2026-08-18 08:42:38'),
(1038, 99, 90, 'tidak_hadir', 'Izin', NULL, '2026-08-18 08:42:38', '2026-08-18 08:43:10'),
(1039, 99, 91, 'tidak_hadir', 'Alpha', NULL, '2026-08-18 08:42:38', '2026-08-18 08:43:10'),
(1040, 99, 92, 'hadir', NULL, NULL, '2026-08-18 08:42:38', '2026-08-18 08:42:38'),
(1041, 99, 93, 'tidak_hadir', 'Sakit', NULL, '2026-08-18 08:42:38', '2026-08-18 08:43:10'),
(1042, 99, 94, 'hadir', NULL, NULL, '2026-08-18 08:42:38', '2026-08-18 08:42:38'),
(1043, 99, 133, 'hadir', NULL, NULL, '2026-08-18 08:42:38', '2026-08-18 08:42:38'),
(1044, 100, 112, 'tidak_hadir', 'Sakit', NULL, '2026-08-19 01:01:02', '2026-08-19 01:01:38'),
(1045, 100, 113, 'hadir', NULL, NULL, '2026-08-19 01:01:02', '2026-08-19 01:01:02'),
(1046, 100, 114, 'hadir', NULL, NULL, '2026-08-19 01:01:02', '2026-08-19 01:01:02'),
(1047, 100, 115, 'hadir', NULL, NULL, '2026-08-19 01:01:02', '2026-08-19 01:01:02'),
(1048, 100, 116, 'hadir', NULL, NULL, '2026-08-19 01:01:02', '2026-08-19 01:01:02'),
(1049, 100, 136, 'hadir', NULL, NULL, '2026-08-19 01:01:02', '2026-08-19 01:01:02'),
(1050, 100, 143, 'hadir', NULL, NULL, '2026-08-19 01:01:02', '2026-08-19 01:01:02'),
(1051, 101, 57, 'hadir', NULL, 'Perlu latihan pembagian', '2026-08-19 02:33:07', '2026-08-19 02:38:37'),
(1052, 101, 58, 'hadir', NULL, 'Perlu latihan pembagian', '2026-08-19 02:33:07', '2026-08-19 02:38:37'),
(1053, 101, 59, 'hadir', NULL, 'Sangat sangat perlu latihan pembagian', '2026-08-19 02:33:07', '2026-08-19 02:38:37'),
(1054, 101, 60, 'hadir', NULL, 'Sudah bisa pembagian', '2026-08-19 02:33:07', '2026-08-19 02:38:37'),
(1055, 101, 61, 'hadir', NULL, 'Perlu latihan pembagian', '2026-08-19 02:33:07', '2026-08-19 02:38:37'),
(1056, 101, 62, 'hadir', NULL, 'Sudah bisa pembagian', '2026-08-19 02:33:07', '2026-08-19 02:38:37'),
(1057, 101, 63, 'hadir', NULL, 'Sangat sangat perlu latihan pembagian', '2026-08-19 02:33:07', '2026-08-19 02:38:37'),
(1058, 101, 124, 'hadir', NULL, 'Sangat sangat perlu latihan pembagian dan perkalian', '2026-08-19 02:33:07', '2026-08-19 02:38:37'),
(1059, 101, 125, 'hadir', NULL, 'Sangat sangat perlu latihan pembagian dan perkalian', '2026-08-19 02:33:07', '2026-08-19 02:38:37'),
(1060, 101, 137, 'hadir', NULL, 'Perlu latihan pembagian', '2026-08-19 02:33:07', '2026-08-19 02:38:37'),
(1061, 101, 138, 'hadir', NULL, 'Sudah bisa pembagian', '2026-08-19 02:33:07', '2026-08-19 02:38:37'),
(1062, 101, 139, 'hadir', NULL, 'Perlu latihan pembagian', '2026-08-19 02:33:07', '2026-08-19 02:38:37'),
(1063, 102, 72, 'hadir', NULL, NULL, '2026-08-19 02:54:07', '2026-08-19 02:54:07'),
(1064, 102, 73, 'hadir', NULL, NULL, '2026-08-19 02:54:07', '2026-08-19 02:54:07'),
(1065, 102, 74, 'tidak_hadir', 'Alpha', NULL, '2026-08-19 02:54:07', '2026-08-19 02:55:08'),
(1066, 102, 75, 'tidak_hadir', 'Alpha', NULL, '2026-08-19 02:54:07', '2026-08-19 02:55:08'),
(1067, 102, 76, 'tidak_hadir', 'Alpha', NULL, '2026-08-19 02:54:07', '2026-08-19 02:55:08'),
(1068, 102, 77, 'tidak_hadir', 'Alpha', NULL, '2026-08-19 02:54:07', '2026-08-19 02:55:08'),
(1069, 102, 78, 'hadir', NULL, NULL, '2026-08-19 02:54:07', '2026-08-19 02:54:07'),
(1070, 102, 79, 'tidak_hadir', 'Alpha', NULL, '2026-08-19 02:54:07', '2026-08-19 02:55:08'),
(1071, 102, 117, 'hadir', NULL, NULL, '2026-08-19 02:54:07', '2026-08-19 02:54:07');
INSERT INTO `presensis` (`id`, `pertemuan_id`, `siswa_id`, `status`, `keterangan`, `catatan`, `created_at`, `updated_at`) VALUES
(1072, 102, 118, 'hadir', NULL, NULL, '2026-08-19 02:54:07', '2026-08-19 02:54:07'),
(1073, 102, 119, 'hadir', NULL, NULL, '2026-08-19 02:54:07', '2026-08-19 02:54:07'),
(1074, 102, 132, 'hadir', NULL, NULL, '2026-08-19 02:54:07', '2026-08-19 02:54:07'),
(1075, 103, 80, 'tidak_hadir', '-', NULL, '2026-08-19 03:01:32', '2026-08-19 03:02:12'),
(1076, 103, 81, 'tidak_hadir', '-', NULL, '2026-08-19 03:01:32', '2026-08-19 03:02:12'),
(1077, 103, 82, 'hadir', NULL, NULL, '2026-08-19 03:01:32', '2026-08-19 03:01:32'),
(1078, 103, 83, 'hadir', NULL, NULL, '2026-08-19 03:01:32', '2026-08-19 03:01:32'),
(1079, 103, 84, 'tidak_hadir', '-', NULL, '2026-08-19 03:01:32', '2026-08-19 03:02:12'),
(1080, 103, 85, 'tidak_hadir', '-', NULL, '2026-08-19 03:01:32', '2026-08-19 03:02:12'),
(1081, 103, 86, 'tidak_hadir', '-', NULL, '2026-08-19 03:01:32', '2026-08-19 03:02:12'),
(1082, 103, 87, 'tidak_hadir', '-', NULL, '2026-08-19 03:01:32', '2026-08-19 03:02:12'),
(1083, 103, 88, 'tidak_hadir', '-', NULL, '2026-08-19 03:01:32', '2026-08-19 03:02:12'),
(1084, 103, 128, 'tidak_hadir', '-', NULL, '2026-08-19 03:01:32', '2026-08-19 03:02:12'),
(1085, 103, 129, 'tidak_hadir', '-', NULL, '2026-08-19 03:01:32', '2026-08-19 03:02:12'),
(1086, 104, 51, 'hadir', NULL, NULL, '2026-08-19 04:07:07', '2026-08-19 04:07:07'),
(1087, 104, 52, 'hadir', NULL, NULL, '2026-08-19 04:07:07', '2026-08-19 04:07:07'),
(1088, 104, 53, 'hadir', NULL, NULL, '2026-08-19 04:07:07', '2026-08-19 04:07:07'),
(1089, 104, 54, 'hadir', NULL, NULL, '2026-08-19 04:07:07', '2026-08-19 04:07:07'),
(1090, 104, 55, 'hadir', NULL, NULL, '2026-08-19 04:07:07', '2026-08-19 04:07:07'),
(1091, 104, 121, 'hadir', NULL, NULL, '2026-08-19 04:07:07', '2026-08-19 04:07:07'),
(1092, 104, 127, 'hadir', NULL, NULL, '2026-08-19 04:07:07', '2026-08-19 04:07:07'),
(1093, 104, 131, 'tidak_hadir', NULL, NULL, '2026-08-19 04:07:07', '2026-08-19 04:08:12'),
(1094, 104, 140, 'hadir', NULL, NULL, '2026-08-19 04:07:07', '2026-08-19 04:07:07'),
(1095, 105, 56, 'hadir', NULL, NULL, '2026-08-19 04:08:36', '2026-08-19 04:08:36'),
(1096, 105, 67, 'hadir', NULL, NULL, '2026-08-19 04:08:36', '2026-08-19 04:08:36'),
(1097, 105, 68, 'hadir', NULL, NULL, '2026-08-19 04:08:36', '2026-08-19 04:08:36'),
(1098, 105, 69, 'tidak_hadir', NULL, NULL, '2026-08-19 04:08:36', '2026-08-19 04:08:53'),
(1099, 105, 70, 'tidak_hadir', NULL, NULL, '2026-08-19 04:08:36', '2026-08-19 04:08:53'),
(1100, 105, 71, 'hadir', NULL, NULL, '2026-08-19 04:08:36', '2026-08-19 04:08:36'),
(1101, 105, 130, 'tidak_hadir', NULL, NULL, '2026-08-19 04:08:36', '2026-08-19 04:08:53'),
(1102, 106, 26, 'hadir', NULL, NULL, '2026-08-19 04:19:49', '2026-08-19 04:19:49'),
(1103, 106, 28, 'hadir', NULL, NULL, '2026-08-19 04:19:49', '2026-08-19 04:19:49'),
(1104, 106, 47, 'hadir', NULL, NULL, '2026-08-19 04:19:49', '2026-08-19 04:19:49'),
(1105, 107, 112, 'hadir', NULL, NULL, '2026-08-19 23:48:09', '2026-08-19 23:48:09'),
(1106, 107, 113, 'hadir', NULL, NULL, '2026-08-19 23:48:09', '2026-08-19 23:48:09'),
(1107, 107, 114, 'hadir', NULL, NULL, '2026-08-19 23:48:09', '2026-08-19 23:48:09'),
(1108, 107, 115, 'hadir', NULL, NULL, '2026-08-19 23:48:09', '2026-08-19 23:48:09'),
(1109, 107, 116, 'tidak_hadir', NULL, NULL, '2026-08-19 23:48:09', '2026-08-19 23:48:37'),
(1110, 107, 136, 'hadir', NULL, NULL, '2026-08-19 23:48:09', '2026-08-19 23:48:09'),
(1111, 107, 143, 'hadir', NULL, NULL, '2026-08-19 23:48:09', '2026-08-19 23:48:09'),
(1112, 108, 12, 'hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:21:56'),
(1113, 108, 13, 'tidak_hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:27:31'),
(1114, 108, 16, 'hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:21:56'),
(1115, 108, 17, 'hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:21:56'),
(1116, 108, 19, 'hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:21:56'),
(1117, 108, 22, 'hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:21:56'),
(1118, 108, 23, 'hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:21:56'),
(1119, 108, 24, 'hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:21:56'),
(1120, 108, 25, 'hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:21:56'),
(1121, 108, 27, 'hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:21:56'),
(1122, 108, 122, 'hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:21:56'),
(1123, 108, 123, 'tidak_hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:27:31'),
(1124, 108, 134, 'hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:21:56'),
(1125, 108, 135, 'hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:21:56'),
(1126, 108, 141, 'hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:21:56'),
(1127, 108, 142, 'hadir', NULL, NULL, '2026-08-20 01:21:56', '2026-08-20 01:21:56'),
(1128, 109, 29, 'hadir', NULL, NULL, '2026-08-20 01:29:33', '2026-08-20 01:29:33'),
(1129, 109, 30, 'hadir', NULL, NULL, '2026-08-20 01:29:33', '2026-08-20 01:29:33'),
(1130, 109, 31, 'hadir', NULL, NULL, '2026-08-20 01:29:33', '2026-08-20 01:29:33'),
(1131, 109, 32, 'hadir', NULL, NULL, '2026-08-20 01:29:33', '2026-08-20 01:29:33'),
(1132, 109, 33, 'hadir', NULL, NULL, '2026-08-20 01:29:33', '2026-08-20 01:29:33'),
(1133, 109, 34, 'hadir', NULL, NULL, '2026-08-20 01:29:33', '2026-08-20 01:29:33'),
(1134, 109, 35, 'hadir', NULL, NULL, '2026-08-20 01:29:33', '2026-08-20 01:29:33'),
(1135, 109, 36, 'hadir', NULL, NULL, '2026-08-20 01:29:33', '2026-08-20 01:29:33'),
(1136, 109, 37, 'hadir', NULL, NULL, '2026-08-20 01:29:33', '2026-08-20 01:29:33'),
(1137, 109, 38, 'hadir', NULL, NULL, '2026-08-20 01:29:33', '2026-08-20 01:29:33'),
(1138, 109, 42, 'hadir', NULL, NULL, '2026-08-20 01:29:33', '2026-08-20 01:29:33'),
(1139, 109, 44, 'hadir', NULL, NULL, '2026-08-20 01:29:33', '2026-08-20 01:29:33'),
(1140, 109, 45, 'hadir', NULL, NULL, '2026-08-20 01:29:33', '2026-08-20 01:29:33'),
(1141, 109, 46, 'hadir', NULL, NULL, '2026-08-20 01:29:33', '2026-08-20 01:29:33'),
(1142, 109, 120, 'hadir', NULL, NULL, '2026-08-20 01:29:33', '2026-08-20 01:29:33'),
(1143, 110, 51, 'hadir', NULL, NULL, '2026-08-20 01:31:00', '2026-08-20 01:31:00'),
(1144, 110, 52, 'hadir', NULL, NULL, '2026-08-20 01:31:00', '2026-08-20 01:31:00'),
(1145, 110, 53, 'hadir', NULL, NULL, '2026-08-20 01:31:00', '2026-08-20 01:31:00'),
(1146, 110, 54, 'hadir', NULL, NULL, '2026-08-20 01:31:00', '2026-08-20 01:31:00'),
(1147, 110, 55, 'hadir', NULL, NULL, '2026-08-20 01:31:00', '2026-08-20 01:31:00'),
(1148, 110, 121, 'hadir', NULL, NULL, '2026-08-20 01:31:00', '2026-08-20 01:31:00'),
(1149, 110, 127, 'hadir', NULL, NULL, '2026-08-20 01:31:00', '2026-08-20 01:31:00'),
(1150, 110, 131, 'tidak_hadir', NULL, NULL, '2026-08-20 01:31:00', '2026-08-20 01:34:29'),
(1151, 110, 140, 'hadir', NULL, NULL, '2026-08-20 01:31:00', '2026-08-20 01:31:00'),
(1152, 111, 57, 'hadir', NULL, 'Perlu perbanyak latihan present continuous tense', '2026-08-20 01:49:07', '2026-08-20 03:40:13'),
(1153, 111, 58, 'hadir', NULL, 'Perlu perbanyak latihan present continuous tense', '2026-08-20 01:49:07', '2026-08-20 03:40:13'),
(1154, 111, 59, 'tidak_hadir', 'Alpha', '_', '2026-08-20 01:49:07', '2026-08-20 03:40:13'),
(1155, 111, 60, 'hadir', NULL, 'Perlu perbanyak latihan present continuous tense', '2026-08-20 01:49:07', '2026-08-20 03:40:13'),
(1156, 111, 61, 'hadir', NULL, 'Perlu perbanyak latihan present continuous tense', '2026-08-20 01:49:07', '2026-08-20 03:40:13'),
(1157, 111, 62, 'tidak_hadir', 'Izin', '-', '2026-08-20 01:49:07', '2026-08-20 03:40:13'),
(1158, 111, 63, 'hadir', NULL, 'Perlu perbanyak latihan present continuous tense', '2026-08-20 01:49:07', '2026-08-20 03:40:13'),
(1159, 111, 124, 'hadir', NULL, 'Perlu perbanyak latihan present continuous tense', '2026-08-20 01:49:07', '2026-08-20 03:40:13'),
(1160, 111, 125, 'hadir', NULL, 'Perlu perbanyak latihan present continuous tense', '2026-08-20 01:49:07', '2026-08-20 03:40:13'),
(1161, 111, 137, 'hadir', NULL, 'Perlu perbanyak latihan present continuous tense', '2026-08-20 01:49:07', '2026-08-20 03:40:13'),
(1162, 111, 138, 'hadir', NULL, 'Perlu perbanyak latihan present continuous tense', '2026-08-20 01:49:07', '2026-08-20 03:40:13'),
(1163, 111, 139, 'hadir', NULL, 'Perlu perbanyak latihan present continuous tense', '2026-08-20 01:49:07', '2026-08-20 03:40:13'),
(1164, 112, 80, 'hadir', NULL, NULL, '2026-08-20 02:50:06', '2026-08-20 02:50:06'),
(1165, 112, 81, 'tidak_hadir', NULL, NULL, '2026-08-20 02:50:06', '2026-08-20 03:05:21'),
(1166, 112, 82, 'hadir', NULL, NULL, '2026-08-20 02:50:06', '2026-08-20 02:50:06'),
(1167, 112, 83, 'hadir', NULL, NULL, '2026-08-20 02:50:06', '2026-08-20 02:50:06'),
(1168, 112, 84, 'tidak_hadir', NULL, NULL, '2026-08-20 02:50:06', '2026-08-20 03:05:21'),
(1169, 112, 85, 'tidak_hadir', NULL, NULL, '2026-08-20 02:50:06', '2026-08-20 03:05:21'),
(1170, 112, 86, 'hadir', NULL, NULL, '2026-08-20 02:50:06', '2026-08-20 02:50:06'),
(1171, 112, 87, 'hadir', NULL, NULL, '2026-08-20 02:50:06', '2026-08-20 02:50:06'),
(1172, 112, 88, 'hadir', NULL, NULL, '2026-08-20 02:50:06', '2026-08-20 02:50:06'),
(1173, 112, 128, 'hadir', NULL, NULL, '2026-08-20 02:50:06', '2026-08-20 02:50:06'),
(1174, 112, 129, 'hadir', NULL, NULL, '2026-08-20 02:50:06', '2026-08-20 02:50:06'),
(1175, 113, 26, 'hadir', NULL, NULL, '2026-08-20 03:11:18', '2026-08-20 03:11:18'),
(1176, 113, 28, 'hadir', NULL, NULL, '2026-08-20 03:11:18', '2026-08-20 03:11:18'),
(1177, 113, 47, 'hadir', NULL, NULL, '2026-08-20 03:11:18', '2026-08-20 03:11:18'),
(1178, 114, 56, 'hadir', NULL, NULL, '2026-08-20 03:12:00', '2026-08-20 03:12:00'),
(1179, 114, 67, 'hadir', NULL, NULL, '2026-08-20 03:12:00', '2026-08-20 03:12:00'),
(1180, 114, 68, 'tidak_hadir', NULL, NULL, '2026-08-20 03:12:00', '2026-08-20 03:12:54'),
(1181, 114, 69, 'hadir', NULL, NULL, '2026-08-20 03:12:00', '2026-08-20 03:12:00'),
(1182, 114, 70, 'tidak_hadir', NULL, NULL, '2026-08-20 03:12:00', '2026-08-20 03:12:54'),
(1183, 114, 71, 'hadir', NULL, NULL, '2026-08-20 03:12:00', '2026-08-20 03:12:00'),
(1184, 114, 130, 'hadir', NULL, NULL, '2026-08-20 03:12:00', '2026-08-20 03:12:00'),
(1185, 115, 72, 'hadir', NULL, 'Sudah bisa pecahan, lbh perbanyak soal aja supaya lbh paham', '2026-08-20 03:36:21', '2026-08-20 03:38:52'),
(1186, 115, 73, 'hadir', NULL, 'Sudah bisa pecahan, lbh perbanyak soal aja supaya lbh paham', '2026-08-20 03:36:21', '2026-08-20 03:38:52'),
(1187, 115, 74, 'tidak_hadir', 'Alph', '-', '2026-08-20 03:36:21', '2026-08-20 03:38:52'),
(1188, 115, 75, 'hadir', NULL, 'Blm hafal perkalian', '2026-08-20 03:36:21', '2026-08-20 03:38:52'),
(1189, 115, 76, 'tidak_hadir', 'Alpha', '-', '2026-08-20 03:36:21', '2026-08-20 03:38:52'),
(1190, 115, 77, 'hadir', NULL, 'Belum lancar perkalian', '2026-08-20 03:36:21', '2026-08-20 03:38:52'),
(1191, 115, 78, 'hadir', NULL, 'Sudah bisa pecahan, lbh perbanyak soal aja supaya lbh paham', '2026-08-20 03:36:21', '2026-08-20 03:38:52'),
(1192, 115, 79, 'tidak_hadir', 'Alpha', '-', '2026-08-20 03:36:21', '2026-08-20 03:38:52'),
(1193, 115, 117, 'tidak_hadir', 'Alpha', '-', '2026-08-20 03:36:21', '2026-08-20 03:38:52'),
(1194, 115, 118, 'tidak_hadir', 'Alpha', '-', '2026-08-20 03:36:21', '2026-08-20 03:38:52'),
(1195, 115, 119, 'hadir', NULL, 'Belum hafal perkalian', '2026-08-20 03:36:21', '2026-08-20 03:38:52'),
(1196, 115, 132, 'hadir', NULL, 'Belum lancar perkalian', '2026-08-20 03:36:21', '2026-08-20 03:38:52'),
(1197, 116, 95, 'tidak_hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:27'),
(1198, 116, 96, 'tidak_hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:27'),
(1199, 116, 97, 'tidak_hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:27'),
(1200, 116, 98, 'tidak_hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:27'),
(1201, 116, 99, 'tidak_hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:27'),
(1202, 116, 100, 'tidak_hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:27'),
(1203, 116, 101, 'hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:08'),
(1204, 116, 102, 'hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:08'),
(1205, 116, 103, 'hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:08'),
(1206, 116, 104, 'hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:08'),
(1207, 116, 105, 'hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:08'),
(1208, 116, 106, 'hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:08'),
(1209, 116, 107, 'hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:08'),
(1210, 116, 108, 'hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:08'),
(1211, 116, 109, 'hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:08'),
(1212, 116, 110, 'hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:08'),
(1213, 116, 111, 'hadir', NULL, NULL, '2026-08-20 05:53:08', '2026-08-20 05:53:08'),
(1214, 117, 89, 'hadir', NULL, NULL, '2026-08-20 05:53:45', '2026-08-20 05:53:45'),
(1215, 117, 90, 'tidak_hadir', NULL, NULL, '2026-08-20 05:53:45', '2026-08-20 05:54:01'),
(1216, 117, 91, 'tidak_hadir', NULL, NULL, '2026-08-20 05:53:45', '2026-08-20 05:54:01'),
(1217, 117, 92, 'hadir', NULL, NULL, '2026-08-20 05:53:45', '2026-08-20 05:53:45'),
(1218, 117, 93, 'tidak_hadir', NULL, NULL, '2026-08-20 05:53:45', '2026-08-20 05:54:01'),
(1219, 117, 94, 'hadir', NULL, NULL, '2026-08-20 05:53:45', '2026-08-20 05:53:45'),
(1220, 117, 133, 'tidak_hadir', 'Sakit', NULL, '2026-08-20 05:53:45', '2026-08-20 05:54:01'),
(1221, 118, 89, 'tidak_hadir', NULL, NULL, '2026-08-20 05:54:22', '2026-08-20 05:54:47'),
(1222, 118, 90, 'tidak_hadir', NULL, NULL, '2026-08-20 05:54:22', '2026-08-20 05:54:47'),
(1223, 118, 91, 'tidak_hadir', NULL, NULL, '2026-08-20 05:54:22', '2026-08-20 05:54:47'),
(1224, 118, 92, 'hadir', NULL, NULL, '2026-08-20 05:54:22', '2026-08-20 05:54:22'),
(1225, 118, 93, 'hadir', NULL, NULL, '2026-08-20 05:54:22', '2026-08-20 05:54:22'),
(1226, 118, 94, 'tidak_hadir', NULL, NULL, '2026-08-20 05:54:22', '2026-08-20 05:54:47'),
(1227, 118, 133, 'tidak_hadir', NULL, NULL, '2026-08-20 05:54:22', '2026-08-20 05:54:47'),
(1228, 119, 95, 'hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:04'),
(1229, 119, 96, 'hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:04'),
(1230, 119, 97, 'hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:04'),
(1231, 119, 98, 'hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:04'),
(1232, 119, 99, 'hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:04'),
(1233, 119, 100, 'hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:04'),
(1234, 119, 101, 'hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:04'),
(1235, 119, 102, 'hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:04'),
(1236, 119, 103, 'hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:04'),
(1237, 119, 104, 'hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:04'),
(1238, 119, 105, 'hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:04'),
(1239, 119, 106, 'hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:04'),
(1240, 119, 107, 'tidak_hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:21'),
(1241, 119, 108, 'tidak_hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:21'),
(1242, 119, 109, 'tidak_hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:21'),
(1243, 119, 110, 'tidak_hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:21'),
(1244, 119, 111, 'tidak_hadir', NULL, NULL, '2026-08-20 05:55:04', '2026-08-20 05:55:21'),
(1245, 120, 126, 'hadir', NULL, 'Sudah lumayan paham bentuk akar', '2026-08-20 06:02:00', '2026-08-20 06:02:21'),
(1246, 121, 29, 'hadir', NULL, NULL, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(1247, 121, 30, 'hadir', NULL, NULL, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(1248, 121, 31, 'hadir', NULL, NULL, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(1249, 121, 32, 'hadir', NULL, NULL, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(1250, 121, 33, 'hadir', NULL, NULL, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(1251, 121, 34, 'hadir', NULL, NULL, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(1252, 121, 35, 'hadir', NULL, NULL, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(1253, 121, 36, 'hadir', NULL, NULL, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(1254, 121, 37, 'hadir', NULL, NULL, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(1255, 121, 38, 'hadir', NULL, NULL, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(1256, 121, 42, 'hadir', NULL, NULL, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(1257, 121, 44, 'hadir', NULL, NULL, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(1258, 121, 45, 'hadir', NULL, NULL, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(1259, 121, 46, 'hadir', NULL, NULL, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(1260, 121, 120, 'hadir', NULL, NULL, '2026-08-20 06:07:42', '2026-08-20 06:07:42'),
(1261, 122, 12, 'tidak_hadir', 'Sakit', NULL, '2026-08-20 06:41:36', '2026-08-20 06:42:58'),
(1262, 122, 13, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1263, 122, 16, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1264, 122, 17, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1265, 122, 19, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1266, 122, 20, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1267, 122, 22, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1268, 122, 23, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1269, 122, 24, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1270, 122, 25, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1271, 122, 27, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1272, 122, 122, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1273, 122, 123, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1274, 122, 134, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1275, 122, 135, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1276, 122, 141, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1277, 122, 142, 'hadir', NULL, NULL, '2026-08-20 06:41:36', '2026-08-20 06:41:36'),
(1278, 122, 144, 'tidak_hadir', 'Belum masuk', NULL, '2026-08-20 06:41:36', '2026-08-20 06:43:52'),
(1279, 123, 80, 'tidak_hadir', 'Alpha', NULL, '2026-08-20 18:14:20', '2026-08-21 03:48:24'),
(1280, 123, 81, 'tidak_hadir', 'Alpha', NULL, '2026-08-20 18:14:20', '2026-08-21 03:48:24'),
(1281, 123, 82, 'hadir', NULL, NULL, '2026-08-20 18:14:20', '2026-08-20 18:14:20'),
(1282, 123, 83, 'hadir', NULL, NULL, '2026-08-20 18:14:20', '2026-08-20 18:14:20'),
(1283, 123, 84, 'tidak_hadir', 'Sakit', NULL, '2026-08-20 18:14:20', '2026-08-21 03:48:24'),
(1284, 123, 85, 'hadir', NULL, NULL, '2026-08-20 18:14:20', '2026-08-20 18:14:20'),
(1285, 123, 86, 'tidak_hadir', 'Alpha', NULL, '2026-08-20 18:14:20', '2026-08-21 03:48:24'),
(1286, 123, 87, 'tidak_hadir', 'Alpha', NULL, '2026-08-20 18:14:20', '2026-08-21 03:48:24'),
(1287, 123, 88, 'tidak_hadir', 'Alpha', NULL, '2026-08-20 18:14:20', '2026-08-21 03:48:24'),
(1288, 123, 128, 'hadir', NULL, NULL, '2026-08-20 18:14:20', '2026-08-20 18:14:20'),
(1289, 123, 129, 'tidak_hadir', 'Alpha', NULL, '2026-08-20 18:14:20', '2026-08-21 03:48:24'),
(1299, 125, 51, 'hadir', NULL, NULL, '2026-08-20 18:45:44', '2026-08-20 18:45:44'),
(1300, 125, 52, 'hadir', NULL, NULL, '2026-08-20 18:45:44', '2026-08-20 18:45:44'),
(1301, 125, 53, 'hadir', NULL, NULL, '2026-08-20 18:45:44', '2026-08-20 18:45:44'),
(1302, 125, 54, 'hadir', NULL, NULL, '2026-08-20 18:45:44', '2026-08-20 18:45:44'),
(1303, 125, 55, 'hadir', NULL, NULL, '2026-08-20 18:45:44', '2026-08-20 18:45:44'),
(1304, 125, 121, 'hadir', NULL, NULL, '2026-08-20 18:45:44', '2026-08-20 18:45:44'),
(1305, 125, 127, 'hadir', NULL, NULL, '2026-08-20 18:45:44', '2026-08-20 18:45:44'),
(1306, 125, 131, 'hadir', NULL, NULL, '2026-08-20 18:45:44', '2026-08-20 18:45:44'),
(1307, 125, 140, 'hadir', NULL, NULL, '2026-08-20 18:45:44', '2026-08-20 18:45:44'),
(1308, 56, 140, 'hadir', NULL, NULL, '2026-08-20 18:46:10', '2026-08-20 18:46:10'),
(1309, 7, 127, 'hadir', NULL, NULL, '2026-08-20 18:46:39', '2026-08-20 18:46:39'),
(1310, 7, 131, 'hadir', NULL, NULL, '2026-08-20 18:46:39', '2026-08-20 18:46:39'),
(1311, 7, 140, 'hadir', NULL, NULL, '2026-08-20 18:46:39', '2026-08-20 18:46:39'),
(1312, 126, 112, 'hadir', NULL, NULL, '2026-08-21 01:06:41', '2026-08-21 01:06:41'),
(1313, 126, 113, 'hadir', NULL, NULL, '2026-08-21 01:06:41', '2026-08-21 01:06:41'),
(1314, 126, 114, 'tidak_hadir', NULL, NULL, '2026-08-21 01:06:41', '2026-08-21 01:07:04'),
(1315, 126, 115, 'hadir', NULL, NULL, '2026-08-21 01:06:41', '2026-08-21 01:06:41'),
(1316, 126, 116, 'tidak_hadir', NULL, NULL, '2026-08-21 01:06:41', '2026-08-21 01:07:04'),
(1317, 126, 136, 'hadir', NULL, NULL, '2026-08-21 01:06:41', '2026-08-21 01:06:41'),
(1318, 126, 143, 'hadir', NULL, NULL, '2026-08-21 01:06:41', '2026-08-21 01:06:41'),
(1319, 127, 12, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1320, 127, 13, 'tidak_hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:39:28'),
(1321, 127, 16, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1322, 127, 17, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1323, 127, 19, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1324, 127, 20, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1325, 127, 22, 'tidak_hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:39:28'),
(1326, 127, 23, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1327, 127, 24, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1328, 127, 25, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1329, 127, 27, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1330, 127, 122, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1331, 127, 123, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1332, 127, 134, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1333, 127, 135, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1334, 127, 141, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1335, 127, 142, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1336, 127, 144, 'hadir', NULL, NULL, '2026-08-21 01:10:21', '2026-08-21 01:10:21'),
(1337, 128, 57, 'hadir', NULL, NULL, '2026-08-21 01:47:37', '2026-08-21 01:47:37'),
(1338, 128, 58, 'hadir', NULL, NULL, '2026-08-21 01:47:37', '2026-08-21 01:47:37'),
(1339, 128, 59, 'hadir', NULL, NULL, '2026-08-21 01:47:37', '2026-08-21 01:47:37'),
(1340, 128, 60, 'hadir', NULL, NULL, '2026-08-21 01:47:37', '2026-08-21 01:47:37'),
(1341, 128, 61, 'hadir', NULL, NULL, '2026-08-21 01:47:37', '2026-08-21 01:47:37'),
(1342, 128, 62, 'tidak_hadir', 'Alpha', NULL, '2026-08-21 01:47:37', '2026-08-21 01:49:37'),
(1343, 128, 63, 'hadir', NULL, NULL, '2026-08-21 01:47:37', '2026-08-21 01:47:37'),
(1344, 128, 124, 'hadir', NULL, NULL, '2026-08-21 01:47:37', '2026-08-21 01:47:37'),
(1345, 128, 125, 'hadir', NULL, NULL, '2026-08-21 01:47:37', '2026-08-21 01:47:37'),
(1346, 128, 137, 'hadir', NULL, NULL, '2026-08-21 01:47:37', '2026-08-21 01:47:37'),
(1347, 128, 138, 'tidak_hadir', 'Alpha', NULL, '2026-08-21 01:47:37', '2026-08-21 01:49:37'),
(1348, 128, 139, 'hadir', NULL, NULL, '2026-08-21 01:47:37', '2026-08-21 01:47:37'),
(1349, 129, 29, 'hadir', NULL, 'Kuiss', '2026-08-21 01:54:04', '2026-08-21 01:57:18'),
(1350, 129, 30, 'tidak_hadir', NULL, '-', '2026-08-21 01:54:04', '2026-08-21 01:57:18'),
(1351, 129, 31, 'tidak_hadir', NULL, '-', '2026-08-21 01:54:04', '2026-08-21 01:57:18'),
(1352, 129, 32, 'tidak_hadir', NULL, '-', '2026-08-21 01:54:04', '2026-08-21 01:57:18'),
(1353, 129, 33, 'hadir', NULL, 'Kuis', '2026-08-21 01:54:04', '2026-08-21 01:57:18'),
(1354, 129, 34, 'hadir', NULL, 'Kuis', '2026-08-21 01:54:04', '2026-08-21 01:57:18'),
(1355, 129, 35, 'hadir', NULL, 'Kuis', '2026-08-21 01:54:04', '2026-08-21 01:57:18'),
(1356, 129, 36, 'hadir', NULL, 'Kuis', '2026-08-21 01:54:04', '2026-08-21 01:57:18'),
(1357, 129, 37, 'hadir', NULL, 'Kuis', '2026-08-21 01:54:04', '2026-08-21 01:57:18'),
(1358, 129, 38, 'hadir', NULL, 'Kuis', '2026-08-21 01:54:04', '2026-08-21 01:57:18'),
(1359, 129, 42, 'hadir', NULL, 'Kuis', '2026-08-21 01:54:04', '2026-08-21 01:57:18'),
(1360, 129, 44, 'hadir', NULL, 'Kuis', '2026-08-21 01:54:04', '2026-08-21 01:57:18'),
(1361, 129, 45, 'hadir', NULL, 'Kuis', '2026-08-21 01:54:04', '2026-08-21 01:57:18'),
(1362, 129, 46, 'hadir', NULL, 'Kuis', '2026-08-21 01:54:04', '2026-08-21 01:57:18'),
(1363, 129, 120, 'hadir', NULL, 'Kuis', '2026-08-21 01:54:04', '2026-08-21 01:57:18'),
(1364, 130, 51, 'hadir', NULL, NULL, '2026-08-21 02:56:03', '2026-08-21 02:56:03'),
(1365, 130, 52, 'hadir', NULL, NULL, '2026-08-21 02:56:03', '2026-08-21 02:56:03'),
(1366, 130, 53, 'hadir', NULL, NULL, '2026-08-21 02:56:03', '2026-08-21 02:56:03'),
(1367, 130, 54, 'hadir', NULL, NULL, '2026-08-21 02:56:03', '2026-08-21 02:56:03'),
(1368, 130, 55, 'hadir', NULL, NULL, '2026-08-21 02:56:03', '2026-08-21 02:56:03'),
(1369, 130, 121, 'hadir', NULL, NULL, '2026-08-21 02:56:03', '2026-08-21 02:56:03'),
(1370, 130, 127, 'hadir', NULL, NULL, '2026-08-21 02:56:03', '2026-08-21 02:56:03'),
(1371, 130, 131, 'tidak_hadir', NULL, NULL, '2026-08-21 02:56:03', '2026-08-21 02:56:37'),
(1372, 130, 140, 'hadir', NULL, NULL, '2026-08-21 02:56:03', '2026-08-21 02:56:03'),
(1373, 131, 56, 'hadir', NULL, 'Kuis', '2026-08-21 02:58:13', '2026-08-21 02:58:58'),
(1374, 131, 67, 'hadir', NULL, 'Kuis', '2026-08-21 02:58:13', '2026-08-21 02:58:58'),
(1375, 131, 68, 'hadir', NULL, 'Kuis', '2026-08-21 02:58:13', '2026-08-21 02:58:58'),
(1376, 131, 69, 'hadir', NULL, 'Kuis', '2026-08-21 02:58:13', '2026-08-21 02:58:58'),
(1377, 131, 70, 'tidak_hadir', NULL, '-', '2026-08-21 02:58:13', '2026-08-21 02:58:58'),
(1378, 131, 71, 'hadir', NULL, NULL, '2026-08-21 02:58:13', '2026-08-21 02:58:13'),
(1379, 131, 130, 'tidak_hadir', NULL, '-', '2026-08-21 02:58:13', '2026-08-21 02:58:58'),
(1380, 132, 26, 'hadir', NULL, NULL, '2026-08-21 02:59:16', '2026-08-21 02:59:16'),
(1381, 132, 28, 'hadir', NULL, NULL, '2026-08-21 02:59:16', '2026-08-21 02:59:16'),
(1382, 132, 47, 'hadir', NULL, NULL, '2026-08-21 02:59:16', '2026-08-21 02:59:16'),
(1383, 133, 72, 'hadir', NULL, NULL, '2026-08-21 03:45:18', '2026-08-21 03:45:18'),
(1384, 133, 73, 'hadir', NULL, NULL, '2026-08-21 03:45:18', '2026-08-21 03:45:18'),
(1385, 133, 74, 'hadir', NULL, NULL, '2026-08-21 03:45:18', '2026-08-21 03:45:18'),
(1386, 133, 75, 'tidak_hadir', NULL, NULL, '2026-08-21 03:45:18', '2026-08-21 03:46:18'),
(1387, 133, 76, 'tidak_hadir', NULL, NULL, '2026-08-21 03:45:18', '2026-08-21 03:46:18'),
(1388, 133, 77, 'hadir', NULL, NULL, '2026-08-21 03:45:18', '2026-08-21 03:45:18'),
(1389, 133, 78, 'hadir', NULL, NULL, '2026-08-21 03:45:18', '2026-08-21 03:45:18'),
(1390, 133, 79, 'hadir', NULL, NULL, '2026-08-21 03:45:18', '2026-08-21 03:45:18'),
(1391, 133, 117, 'hadir', NULL, NULL, '2026-08-21 03:45:18', '2026-08-21 03:45:18'),
(1392, 133, 118, 'hadir', NULL, NULL, '2026-08-21 03:45:18', '2026-08-21 03:45:18'),
(1393, 133, 119, 'hadir', NULL, NULL, '2026-08-21 03:45:18', '2026-08-21 03:45:18'),
(1394, 133, 132, 'hadir', NULL, NULL, '2026-08-21 03:45:18', '2026-08-21 03:45:18'),
(1395, 134, 112, 'hadir', NULL, NULL, '2026-08-24 01:09:55', '2026-08-24 01:09:55'),
(1396, 134, 113, 'hadir', NULL, NULL, '2026-08-24 01:09:55', '2026-08-24 01:09:55'),
(1397, 134, 114, 'hadir', NULL, NULL, '2026-08-24 01:09:55', '2026-08-24 01:09:55'),
(1398, 134, 115, 'hadir', NULL, NULL, '2026-08-24 01:09:55', '2026-08-24 01:09:55'),
(1399, 134, 116, 'tidak_hadir', NULL, NULL, '2026-08-24 01:09:55', '2026-08-24 01:10:16'),
(1400, 134, 136, 'hadir', NULL, NULL, '2026-08-24 01:09:55', '2026-08-24 01:09:55'),
(1401, 134, 143, 'hadir', NULL, NULL, '2026-08-24 01:09:55', '2026-08-24 01:09:55'),
(1402, 135, 12, 'hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:10:46'),
(1403, 135, 13, 'tidak_hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:55:14'),
(1404, 135, 16, 'hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:10:46'),
(1405, 135, 17, 'hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:10:46'),
(1406, 135, 19, 'hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:10:46'),
(1407, 135, 20, 'hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:10:46'),
(1408, 135, 22, 'tidak_hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:55:14'),
(1409, 135, 23, 'hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:10:46'),
(1410, 135, 24, 'hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:10:46'),
(1411, 135, 25, 'hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:10:46'),
(1412, 135, 27, 'hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:10:46'),
(1413, 135, 122, 'hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:10:46'),
(1414, 135, 123, 'hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:10:46'),
(1415, 135, 134, 'hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:10:46'),
(1416, 135, 135, 'hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:10:46'),
(1417, 135, 141, 'tidak_hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:55:14'),
(1418, 135, 142, 'tidak_hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:55:14'),
(1419, 135, 144, 'hadir', NULL, NULL, '2026-08-24 01:10:46', '2026-08-24 01:10:46'),
(1420, 136, 57, 'hadir', NULL, NULL, '2026-08-24 01:28:27', '2026-08-24 01:28:27'),
(1421, 136, 58, 'hadir', NULL, NULL, '2026-08-24 01:28:27', '2026-08-24 01:28:27'),
(1422, 136, 59, 'hadir', NULL, NULL, '2026-08-24 01:28:27', '2026-08-24 01:28:27'),
(1423, 136, 60, 'hadir', NULL, NULL, '2026-08-24 01:28:27', '2026-08-24 01:28:27'),
(1424, 136, 61, 'hadir', NULL, NULL, '2026-08-24 01:28:27', '2026-08-24 01:28:27'),
(1425, 136, 62, 'tidak_hadir', 'Alpha', NULL, '2026-08-24 01:28:27', '2026-08-24 01:29:06'),
(1426, 136, 63, 'hadir', NULL, NULL, '2026-08-24 01:28:27', '2026-08-24 01:28:27'),
(1427, 136, 124, 'hadir', NULL, NULL, '2026-08-24 01:28:27', '2026-08-24 01:28:27'),
(1428, 136, 125, 'hadir', NULL, NULL, '2026-08-24 01:28:27', '2026-08-24 01:28:27'),
(1429, 136, 137, 'hadir', NULL, NULL, '2026-08-24 01:28:27', '2026-08-24 01:28:27'),
(1430, 136, 138, 'tidak_hadir', 'Alpha', NULL, '2026-08-24 01:28:27', '2026-08-24 01:29:06'),
(1431, 136, 139, 'hadir', NULL, NULL, '2026-08-24 01:28:27', '2026-08-24 01:28:27'),
(1432, 137, 29, 'tidak_hadir', NULL, '-', '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(1433, 137, 30, 'tidak_hadir', NULL, '-', '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(1434, 137, 31, 'tidak_hadir', NULL, '-', '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(1435, 137, 32, 'hadir', NULL, 'Pengurangan pinjam meminjam', '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(1436, 137, 33, 'hadir', NULL, 'Pengurangan pinjam meminjam', '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(1437, 137, 34, 'hadir', NULL, 'Pengurangan pinjam meminjam', '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(1438, 137, 35, 'tidak_hadir', NULL, '-', '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(1439, 137, 36, 'hadir', NULL, 'Pengurangan pinjam meminjam', '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(1440, 137, 37, 'hadir', NULL, 'Pengurangan pinjam meminjam', '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(1441, 137, 38, 'hadir', NULL, 'Pengurangan pinjam meminjam', '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(1442, 137, 42, 'tidak_hadir', NULL, '-', '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(1443, 137, 44, 'hadir', NULL, 'Penjumlahan dan pengurangan bilangan cacah', '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(1444, 137, 45, 'hadir', NULL, 'Penjumlahan dan pengurangan bilangan cacah', '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(1445, 137, 46, 'tidak_hadir', NULL, '-', '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(1446, 137, 120, 'hadir', NULL, 'Penjumlahan dan pengurangan bilangan cacah', '2026-08-24 02:19:37', '2026-08-24 02:24:01'),
(1447, 138, 80, 'hadir', NULL, NULL, '2026-08-24 02:50:49', '2026-08-24 02:50:49'),
(1448, 138, 81, 'tidak_hadir', NULL, NULL, '2026-08-24 02:50:49', '2026-08-26 23:13:34'),
(1449, 138, 82, 'hadir', NULL, NULL, '2026-08-24 02:50:49', '2026-08-24 02:50:49'),
(1450, 138, 83, 'hadir', NULL, NULL, '2026-08-24 02:50:49', '2026-08-24 02:50:49'),
(1451, 138, 84, 'tidak_hadir', NULL, NULL, '2026-08-24 02:50:49', '2026-08-26 23:13:34'),
(1452, 138, 85, 'tidak_hadir', NULL, NULL, '2026-08-24 02:50:49', '2026-08-26 23:13:34'),
(1453, 138, 86, 'hadir', NULL, NULL, '2026-08-24 02:50:49', '2026-08-24 02:50:49'),
(1454, 138, 87, 'hadir', NULL, NULL, '2026-08-24 02:50:49', '2026-08-24 02:50:49'),
(1455, 138, 88, 'hadir', NULL, NULL, '2026-08-24 02:50:49', '2026-08-24 02:50:49'),
(1456, 138, 128, 'hadir', NULL, NULL, '2026-08-24 02:50:49', '2026-08-24 02:50:49'),
(1457, 138, 129, 'hadir', NULL, NULL, '2026-08-24 02:50:49', '2026-08-24 02:50:49'),
(1458, 139, 72, 'hadir', NULL, NULL, '2026-08-24 02:52:22', '2026-08-24 02:52:22'),
(1459, 139, 73, 'hadir', NULL, NULL, '2026-08-24 02:52:22', '2026-08-24 02:52:22'),
(1460, 139, 74, 'tidak_hadir', NULL, NULL, '2026-08-24 02:52:22', '2026-08-24 02:53:15'),
(1461, 139, 75, 'hadir', NULL, NULL, '2026-08-24 02:52:22', '2026-08-24 02:52:22'),
(1462, 139, 76, 'tidak_hadir', NULL, NULL, '2026-08-24 02:52:22', '2026-08-24 02:53:15'),
(1463, 139, 77, 'tidak_hadir', NULL, NULL, '2026-08-24 02:52:22', '2026-08-24 02:53:15'),
(1464, 139, 78, 'tidak_hadir', NULL, NULL, '2026-08-24 02:52:22', '2026-08-24 02:53:15'),
(1465, 139, 79, 'tidak_hadir', NULL, NULL, '2026-08-24 02:52:22', '2026-08-24 02:53:15'),
(1466, 139, 117, 'hadir', NULL, NULL, '2026-08-24 02:52:22', '2026-08-24 02:52:22'),
(1467, 139, 118, 'hadir', NULL, NULL, '2026-08-24 02:52:22', '2026-08-24 02:52:22'),
(1468, 139, 119, 'hadir', NULL, NULL, '2026-08-24 02:52:22', '2026-08-24 02:52:22'),
(1469, 139, 132, 'hadir', NULL, NULL, '2026-08-24 02:52:22', '2026-08-24 02:52:22'),
(1470, 140, 56, 'hadir', NULL, 'Membahas soal cerita', '2026-08-24 03:28:59', '2026-08-24 03:30:34'),
(1471, 140, 67, 'hadir', NULL, 'Membahas soal cerita', '2026-08-24 03:28:59', '2026-08-24 03:30:34'),
(1472, 140, 68, 'hadir', NULL, 'Membahas soal cerita', '2026-08-24 03:28:59', '2026-08-24 03:30:34'),
(1473, 140, 69, 'tidak_hadir', NULL, '-', '2026-08-24 03:28:59', '2026-08-24 03:30:34'),
(1474, 140, 70, 'tidak_hadir', NULL, '-', '2026-08-24 03:28:59', '2026-08-24 03:30:34'),
(1475, 140, 71, 'tidak_hadir', NULL, '-', '2026-08-24 03:28:59', '2026-08-24 03:30:34'),
(1476, 140, 130, 'hadir', NULL, 'Penjumlahan  dan pengurangan', '2026-08-24 03:28:59', '2026-08-24 03:30:34'),
(1477, 141, 51, 'hadir', NULL, NULL, '2026-08-26 00:51:17', '2026-08-26 00:51:17'),
(1478, 141, 52, 'tidak_hadir', NULL, NULL, '2026-08-26 00:51:17', '2026-08-26 00:52:03'),
(1479, 141, 53, 'hadir', NULL, NULL, '2026-08-26 00:51:17', '2026-08-26 00:51:17'),
(1480, 141, 54, 'hadir', NULL, NULL, '2026-08-26 00:51:17', '2026-08-26 00:51:17'),
(1481, 141, 55, 'hadir', NULL, NULL, '2026-08-26 00:51:17', '2026-08-26 00:51:17'),
(1482, 141, 121, 'tidak_hadir', NULL, NULL, '2026-08-26 00:51:17', '2026-08-26 00:52:03'),
(1483, 141, 127, 'tidak_hadir', NULL, NULL, '2026-08-26 00:51:17', '2026-08-26 00:52:03'),
(1484, 141, 131, 'tidak_hadir', NULL, NULL, '2026-08-26 00:51:17', '2026-08-26 00:52:03'),
(1485, 141, 140, 'hadir', NULL, NULL, '2026-08-26 00:51:17', '2026-08-26 00:51:17'),
(1486, 142, 26, 'hadir', NULL, NULL, '2026-08-26 00:52:20', '2026-08-26 00:52:20'),
(1487, 142, 28, 'hadir', NULL, NULL, '2026-08-26 00:52:20', '2026-08-26 00:52:20'),
(1488, 142, 47, 'hadir', NULL, NULL, '2026-08-26 00:52:20', '2026-08-26 00:52:20'),
(1489, 143, 57, 'hadir', NULL, 'Masuk sore', '2026-08-26 01:20:25', '2026-08-26 02:59:03'),
(1490, 143, 58, 'hadir', NULL, 'Masuk sore', '2026-08-26 01:20:25', '2026-08-26 02:59:04'),
(1491, 143, 59, 'hadir', NULL, 'Perlu latihan operasi campuran', '2026-08-26 01:20:25', '2026-08-26 02:59:04'),
(1492, 143, 60, 'hadir', NULL, 'Sudah bisa, tp kurang teliti', '2026-08-26 01:20:25', '2026-08-26 02:59:04'),
(1493, 143, 61, 'hadir', NULL, 'Sudah bisa, tp kurang teliti', '2026-08-26 01:20:25', '2026-08-26 02:59:04'),
(1494, 143, 62, 'tidak_hadir', 'Alpha', '-', '2026-08-26 01:20:25', '2026-08-26 02:59:04'),
(1495, 143, 63, 'tidak_hadir', 'Alpha', '-', '2026-08-26 01:20:25', '2026-08-26 02:59:04'),
(1496, 143, 124, 'tidak_hadir', 'Izin', '-', '2026-08-26 01:20:25', '2026-08-26 02:59:04'),
(1497, 143, 125, 'hadir', NULL, 'Perlu latihan operasi campuran', '2026-08-26 01:20:25', '2026-08-26 02:59:04'),
(1498, 143, 137, 'hadir', NULL, 'Perlu latihan operasi campuran , lambat menulis', '2026-08-26 01:20:25', '2026-08-26 02:59:04'),
(1499, 143, 138, 'tidak_hadir', 'Alpha', '-', '2026-08-26 01:20:25', '2026-08-26 02:59:04'),
(1500, 143, 139, 'hadir', NULL, 'Perlu latihan operasi campuran', '2026-08-26 01:20:25', '2026-08-26 02:59:04'),
(1501, 144, 112, 'tidak_hadir', 'Sakit', NULL, '2026-08-26 01:52:38', '2026-08-26 01:53:21'),
(1502, 144, 113, 'hadir', NULL, NULL, '2026-08-26 01:52:38', '2026-08-26 01:52:38'),
(1503, 144, 114, 'hadir', NULL, NULL, '2026-08-26 01:52:38', '2026-08-26 01:52:38'),
(1504, 144, 115, 'hadir', NULL, NULL, '2026-08-26 01:52:38', '2026-08-26 01:52:38'),
(1505, 144, 136, 'hadir', NULL, NULL, '2026-08-26 01:52:38', '2026-08-26 01:52:38'),
(1506, 144, 143, 'hadir', NULL, NULL, '2026-08-26 01:52:38', '2026-08-26 01:52:38'),
(1507, 145, 12, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1508, 145, 13, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1509, 145, 16, 'tidak_hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:56:49'),
(1510, 145, 17, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1511, 145, 19, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1512, 145, 20, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1513, 145, 22, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1514, 145, 23, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1515, 145, 24, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1516, 145, 25, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1517, 145, 27, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1518, 145, 122, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1519, 145, 123, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1520, 145, 134, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1521, 145, 135, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1522, 145, 141, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1523, 145, 142, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1524, 145, 144, 'hadir', NULL, NULL, '2026-08-26 01:53:54', '2026-08-26 01:53:54'),
(1525, 146, 72, 'hadir', NULL, NULL, '2026-08-26 02:59:15', '2026-08-26 02:59:15'),
(1526, 146, 73, 'tidak_hadir', 'Alpha', NULL, '2026-08-26 02:59:15', '2026-08-26 03:00:20'),
(1527, 146, 74, 'tidak_hadir', 'Alpha', NULL, '2026-08-26 02:59:15', '2026-08-26 03:00:20'),
(1528, 146, 75, 'hadir', NULL, NULL, '2026-08-26 02:59:15', '2026-08-26 02:59:15'),
(1529, 146, 76, 'tidak_hadir', 'Alpha', NULL, '2026-08-26 02:59:15', '2026-08-26 03:00:20'),
(1530, 146, 77, 'hadir', NULL, NULL, '2026-08-26 02:59:15', '2026-08-26 02:59:15'),
(1531, 146, 78, 'hadir', NULL, NULL, '2026-08-26 02:59:15', '2026-08-26 02:59:15'),
(1532, 146, 79, 'tidak_hadir', 'Alpha', NULL, '2026-08-26 02:59:15', '2026-08-26 03:00:20'),
(1533, 146, 117, 'hadir', NULL, NULL, '2026-08-26 02:59:15', '2026-08-26 02:59:15'),
(1534, 146, 118, 'hadir', NULL, NULL, '2026-08-26 02:59:15', '2026-08-26 02:59:15'),
(1535, 146, 119, 'hadir', NULL, NULL, '2026-08-26 02:59:15', '2026-08-26 02:59:15'),
(1536, 146, 132, 'hadir', NULL, NULL, '2026-08-26 02:59:15', '2026-08-26 02:59:15'),
(1537, 147, 80, 'tidak_hadir', NULL, NULL, '2026-08-26 03:06:12', '2026-08-26 03:06:57'),
(1538, 147, 81, 'tidak_hadir', NULL, NULL, '2026-08-26 03:06:12', '2026-08-26 03:06:57'),
(1539, 147, 82, 'hadir', NULL, NULL, '2026-08-26 03:06:12', '2026-08-26 03:06:12'),
(1540, 147, 83, 'hadir', NULL, NULL, '2026-08-26 03:06:12', '2026-08-26 03:06:12'),
(1541, 147, 84, 'tidak_hadir', NULL, NULL, '2026-08-26 03:06:12', '2026-08-26 03:06:57'),
(1542, 147, 85, 'tidak_hadir', NULL, NULL, '2026-08-26 03:06:12', '2026-08-26 03:06:57'),
(1543, 147, 86, 'hadir', NULL, NULL, '2026-08-26 03:06:12', '2026-08-26 03:06:12'),
(1544, 147, 87, 'hadir', NULL, NULL, '2026-08-26 03:06:12', '2026-08-26 03:06:12'),
(1545, 147, 88, 'hadir', NULL, NULL, '2026-08-26 03:06:12', '2026-08-26 03:06:12'),
(1546, 147, 128, 'hadir', NULL, NULL, '2026-08-26 03:06:12', '2026-08-26 03:06:12'),
(1547, 147, 129, 'hadir', NULL, NULL, '2026-08-26 03:06:12', '2026-08-26 03:06:12'),
(1548, 147, 145, 'hadir', NULL, NULL, '2026-08-26 03:06:12', '2026-08-26 03:06:12'),
(1549, 148, 29, 'hadir', NULL, NULL, '2026-08-26 03:07:37', '2026-08-26 03:07:37'),
(1550, 148, 30, 'hadir', NULL, NULL, '2026-08-26 03:07:37', '2026-08-26 03:07:37'),
(1551, 148, 31, 'tidak_hadir', NULL, NULL, '2026-08-26 03:07:37', '2026-08-26 03:09:31'),
(1552, 148, 32, 'hadir', NULL, NULL, '2026-08-26 03:07:37', '2026-08-26 03:07:37'),
(1553, 148, 33, 'hadir', NULL, NULL, '2026-08-26 03:07:37', '2026-08-26 03:07:37'),
(1554, 148, 34, 'hadir', NULL, NULL, '2026-08-26 03:07:37', '2026-08-26 03:07:37'),
(1555, 148, 35, 'hadir', NULL, NULL, '2026-08-26 03:07:37', '2026-08-26 03:07:37'),
(1556, 148, 36, 'hadir', NULL, NULL, '2026-08-26 03:07:37', '2026-08-26 03:07:37'),
(1557, 148, 37, 'tidak_hadir', NULL, NULL, '2026-08-26 03:07:37', '2026-08-26 03:09:31'),
(1558, 148, 38, 'tidak_hadir', NULL, NULL, '2026-08-26 03:07:37', '2026-08-26 03:09:31'),
(1559, 148, 42, 'hadir', NULL, NULL, '2026-08-26 03:07:37', '2026-08-26 03:07:37'),
(1560, 148, 44, 'hadir', NULL, NULL, '2026-08-26 03:07:37', '2026-08-26 03:07:37'),
(1561, 148, 45, 'hadir', NULL, NULL, '2026-08-26 03:07:37', '2026-08-26 03:07:37'),
(1562, 148, 46, 'hadir', NULL, NULL, '2026-08-26 03:07:37', '2026-08-26 03:07:37'),
(1563, 148, 120, 'hadir', NULL, NULL, '2026-08-26 03:07:37', '2026-08-26 03:07:37'),
(1564, 149, 26, 'hadir', NULL, NULL, '2026-08-26 03:10:55', '2026-08-26 03:10:55'),
(1565, 149, 28, 'hadir', NULL, NULL, '2026-08-26 03:10:55', '2026-08-26 03:10:55'),
(1566, 149, 47, 'hadir', NULL, NULL, '2026-08-26 03:10:55', '2026-08-26 03:10:55'),
(1567, 150, 51, 'tidak_hadir', NULL, NULL, '2026-08-26 03:11:11', '2026-08-26 03:12:11'),
(1568, 150, 52, 'hadir', NULL, NULL, '2026-08-26 03:11:11', '2026-08-26 03:11:11'),
(1569, 150, 53, 'hadir', NULL, NULL, '2026-08-26 03:11:11', '2026-08-26 03:11:11'),
(1570, 150, 54, 'hadir', NULL, NULL, '2026-08-26 03:11:11', '2026-08-26 03:11:11'),
(1571, 150, 55, 'hadir', NULL, NULL, '2026-08-26 03:11:11', '2026-08-26 03:11:11'),
(1572, 150, 121, 'tidak_hadir', NULL, NULL, '2026-08-26 03:11:11', '2026-08-26 03:12:11'),
(1573, 150, 127, 'hadir', NULL, NULL, '2026-08-26 03:11:11', '2026-08-26 03:11:11'),
(1574, 150, 131, 'hadir', NULL, NULL, '2026-08-26 03:11:11', '2026-08-26 03:11:11'),
(1575, 150, 140, 'hadir', NULL, NULL, '2026-08-26 03:11:11', '2026-08-26 03:11:11'),
(1576, 151, 56, 'hadir', NULL, NULL, '2026-08-26 03:12:28', '2026-08-26 03:12:28'),
(1577, 151, 67, 'hadir', NULL, NULL, '2026-08-26 03:12:28', '2026-08-26 03:12:28'),
(1578, 151, 68, 'hadir', NULL, NULL, '2026-08-26 03:12:28', '2026-08-26 03:12:28'),
(1579, 151, 69, 'hadir', NULL, NULL, '2026-08-26 03:12:28', '2026-08-26 03:12:28'),
(1580, 151, 70, 'tidak_hadir', NULL, NULL, '2026-08-26 03:12:28', '2026-08-26 03:12:40'),
(1581, 151, 71, 'hadir', NULL, NULL, '2026-08-26 03:12:28', '2026-08-26 03:12:28'),
(1582, 151, 130, 'hadir', NULL, NULL, '2026-08-26 03:12:28', '2026-08-26 03:12:28'),
(1583, 138, 145, 'hadir', NULL, NULL, '2026-08-26 23:13:34', '2026-08-26 23:13:34'),
(1584, 152, 112, 'hadir', NULL, NULL, '2026-08-26 23:51:44', '2026-08-26 23:51:44'),
(1585, 152, 113, 'hadir', NULL, NULL, '2026-08-26 23:51:44', '2026-08-26 23:51:44'),
(1586, 152, 114, 'hadir', NULL, NULL, '2026-08-26 23:51:44', '2026-08-26 23:51:44'),
(1587, 152, 115, 'hadir', NULL, NULL, '2026-08-26 23:51:44', '2026-08-26 23:51:44'),
(1588, 152, 136, 'hadir', NULL, NULL, '2026-08-26 23:51:44', '2026-08-26 23:51:44'),
(1589, 152, 143, 'hadir', NULL, NULL, '2026-08-26 23:51:44', '2026-08-26 23:51:44'),
(1590, 153, 57, 'hadir', NULL, NULL, '2026-08-27 01:02:33', '2026-08-27 01:02:33'),
(1591, 153, 58, 'hadir', NULL, NULL, '2026-08-27 01:02:33', '2026-08-27 01:02:33'),
(1592, 153, 59, 'hadir', NULL, NULL, '2026-08-27 01:02:33', '2026-08-27 01:02:33'),
(1593, 153, 60, 'hadir', NULL, NULL, '2026-08-27 01:02:33', '2026-08-27 01:02:33'),
(1594, 153, 61, 'hadir', NULL, NULL, '2026-08-27 01:02:33', '2026-08-27 01:02:33'),
(1595, 153, 62, 'tidak_hadir', 'Alpha', NULL, '2026-08-27 01:02:33', '2026-08-27 01:42:19'),
(1596, 153, 63, 'hadir', NULL, NULL, '2026-08-27 01:02:33', '2026-08-27 01:02:33'),
(1597, 153, 124, 'tidak_hadir', 'Izin', NULL, '2026-08-27 01:02:33', '2026-08-27 01:42:19'),
(1598, 153, 125, 'hadir', NULL, NULL, '2026-08-27 01:02:33', '2026-08-27 01:02:33'),
(1599, 153, 137, 'hadir', NULL, NULL, '2026-08-27 01:02:33', '2026-08-27 01:02:33'),
(1600, 153, 138, 'tidak_hadir', 'Alpha', NULL, '2026-08-27 01:02:33', '2026-08-27 01:42:19'),
(1601, 153, 139, 'hadir', NULL, NULL, '2026-08-27 01:02:33', '2026-08-27 01:02:33'),
(1602, 154, 29, 'hadir', NULL, NULL, '2026-08-27 01:15:37', '2026-08-27 01:15:37'),
(1603, 154, 30, 'tidak_hadir', NULL, NULL, '2026-08-27 01:15:37', '2026-08-27 01:17:46'),
(1604, 154, 31, 'tidak_hadir', NULL, NULL, '2026-08-27 01:15:37', '2026-08-27 01:17:46'),
(1605, 154, 32, 'hadir', NULL, NULL, '2026-08-27 01:15:37', '2026-08-27 01:15:37'),
(1606, 154, 33, 'hadir', NULL, NULL, '2026-08-27 01:15:37', '2026-08-27 01:15:37'),
(1607, 154, 34, 'hadir', NULL, NULL, '2026-08-27 01:15:37', '2026-08-27 01:15:37'),
(1608, 154, 35, 'tidak_hadir', NULL, NULL, '2026-08-27 01:15:37', '2026-08-27 01:17:46'),
(1609, 154, 36, 'hadir', NULL, NULL, '2026-08-27 01:15:37', '2026-08-27 01:15:37'),
(1610, 154, 37, 'hadir', NULL, NULL, '2026-08-27 01:15:37', '2026-08-27 01:15:37'),
(1611, 154, 38, 'hadir', NULL, NULL, '2026-08-27 01:15:37', '2026-08-27 01:15:37'),
(1612, 154, 42, 'hadir', NULL, NULL, '2026-08-27 01:15:37', '2026-08-27 01:15:37'),
(1613, 154, 44, 'hadir', NULL, NULL, '2026-08-27 01:15:37', '2026-08-27 01:15:37'),
(1614, 154, 45, 'hadir', NULL, NULL, '2026-08-27 01:15:37', '2026-08-27 01:15:37'),
(1615, 154, 46, 'hadir', NULL, NULL, '2026-08-27 01:15:37', '2026-08-27 01:15:37'),
(1616, 154, 120, 'hadir', NULL, NULL, '2026-08-27 01:15:37', '2026-08-27 01:15:37'),
(1617, 155, 12, 'tidak_hadir', NULL, '-', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1618, 155, 13, 'tidak_hadir', NULL, '-', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1619, 155, 16, 'hadir', NULL, 'Mengenal nilai tempat', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1620, 155, 17, 'hadir', NULL, 'Mengenal nilai tempat', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1621, 155, 19, 'hadir', NULL, 'Mengenal nilai tempat', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1622, 155, 20, 'hadir', NULL, 'Mengenal nilai tempat', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1623, 155, 22, 'tidak_hadir', NULL, '-', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1624, 155, 23, 'hadir', NULL, 'Mengenal nilai tempat', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1625, 155, 24, 'hadir', NULL, 'Mengenal nilai tempat', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1626, 155, 25, 'hadir', NULL, 'Mengenal nilai tempat', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1627, 155, 27, 'hadir', NULL, 'Mengenal nilai tempat', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1628, 155, 122, 'hadir', NULL, 'Mengenal nilai tempat', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1629, 155, 123, 'hadir', NULL, 'Mengenal nilai tempat', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1630, 155, 134, 'hadir', NULL, 'Mengenal nilai tempat', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1631, 155, 135, 'hadir', NULL, 'Mengenal nilai tempat', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1632, 155, 141, 'hadir', NULL, 'Mengenal nilai tempat', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1633, 155, 142, 'hadir', NULL, 'Mengenal nilai tempat', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1634, 155, 144, 'hadir', NULL, 'Mengenal nilai tempat', '2026-08-27 01:33:32', '2026-08-27 01:37:22'),
(1635, 156, 56, 'hadir', NULL, NULL, '2026-08-27 02:46:47', '2026-08-27 02:46:47'),
(1636, 156, 67, 'hadir', NULL, NULL, '2026-08-27 02:46:47', '2026-08-27 02:46:47'),
(1637, 156, 68, 'hadir', NULL, NULL, '2026-08-27 02:46:47', '2026-08-27 02:46:47'),
(1638, 156, 69, 'hadir', NULL, NULL, '2026-08-27 02:46:47', '2026-08-27 02:46:47'),
(1639, 156, 70, 'tidak_hadir', NULL, NULL, '2026-08-27 02:46:47', '2026-08-27 04:00:08'),
(1640, 156, 71, 'hadir', NULL, NULL, '2026-08-27 02:46:47', '2026-08-27 02:46:47'),
(1641, 156, 130, 'tidak_hadir', NULL, NULL, '2026-08-27 02:46:47', '2026-08-27 04:00:08'),
(1642, 157, 80, 'hadir', NULL, NULL, '2026-08-27 03:11:09', '2026-08-27 03:11:09'),
(1643, 157, 82, 'hadir', NULL, NULL, '2026-08-27 03:11:09', '2026-08-27 03:11:09'),
(1644, 157, 83, 'hadir', NULL, NULL, '2026-08-27 03:11:09', '2026-08-27 03:11:09'),
(1645, 157, 84, 'tidak_hadir', 'Alpha', NULL, '2026-08-27 03:11:09', '2026-08-27 03:12:07'),
(1646, 157, 85, 'tidak_hadir', 'Alpha', NULL, '2026-08-27 03:11:09', '2026-08-27 03:12:07'),
(1647, 157, 86, 'hadir', NULL, NULL, '2026-08-27 03:11:09', '2026-08-27 03:11:09'),
(1648, 157, 87, 'tidak_hadir', 'Sakit', NULL, '2026-08-27 03:11:09', '2026-08-27 03:12:07'),
(1649, 157, 88, 'hadir', NULL, NULL, '2026-08-27 03:11:09', '2026-08-27 03:11:09'),
(1650, 157, 128, 'hadir', NULL, NULL, '2026-08-27 03:11:09', '2026-08-27 03:11:09'),
(1651, 157, 129, 'tidak_hadir', 'Alpha', NULL, '2026-08-27 03:11:09', '2026-08-27 03:12:07'),
(1652, 157, 145, 'hadir', NULL, NULL, '2026-08-27 03:11:09', '2026-08-27 03:11:09'),
(1653, 158, 72, 'hadir', NULL, NULL, '2026-08-27 03:31:23', '2026-08-27 03:31:23'),
(1654, 158, 73, 'hadir', NULL, NULL, '2026-08-27 03:31:23', '2026-08-27 03:31:23'),
(1655, 158, 74, 'hadir', NULL, NULL, '2026-08-27 03:31:23', '2026-08-27 03:31:23');
INSERT INTO `presensis` (`id`, `pertemuan_id`, `siswa_id`, `status`, `keterangan`, `catatan`, `created_at`, `updated_at`) VALUES
(1656, 158, 75, 'hadir', NULL, NULL, '2026-08-27 03:31:23', '2026-08-27 03:31:23'),
(1657, 158, 76, 'tidak_hadir', NULL, NULL, '2026-08-27 03:31:23', '2026-08-27 03:32:03'),
(1658, 158, 77, 'hadir', NULL, NULL, '2026-08-27 03:31:23', '2026-08-27 03:31:23'),
(1659, 158, 78, 'hadir', NULL, NULL, '2026-08-27 03:31:23', '2026-08-27 03:31:23'),
(1660, 158, 79, 'tidak_hadir', NULL, NULL, '2026-08-27 03:31:23', '2026-08-27 03:32:03'),
(1661, 158, 117, 'hadir', NULL, NULL, '2026-08-27 03:31:23', '2026-08-27 03:31:23'),
(1662, 158, 118, 'hadir', NULL, NULL, '2026-08-27 03:31:23', '2026-08-27 03:31:23'),
(1663, 158, 119, 'hadir', NULL, NULL, '2026-08-27 03:31:23', '2026-08-27 03:31:23'),
(1664, 158, 132, 'tidak_hadir', NULL, NULL, '2026-08-27 03:31:23', '2026-08-27 03:32:03'),
(1665, 159, 26, 'hadir', NULL, NULL, '2026-08-27 03:31:56', '2026-08-27 03:31:56'),
(1666, 159, 28, 'hadir', NULL, NULL, '2026-08-27 03:31:56', '2026-08-27 03:31:56'),
(1667, 159, 47, 'hadir', NULL, NULL, '2026-08-27 03:31:56', '2026-08-27 03:31:56'),
(1668, 160, 51, 'hadir', NULL, NULL, '2026-08-27 03:32:12', '2026-08-27 03:32:12'),
(1669, 160, 52, 'hadir', NULL, NULL, '2026-08-27 03:32:12', '2026-08-27 03:32:12'),
(1670, 160, 53, 'hadir', NULL, NULL, '2026-08-27 03:32:12', '2026-08-27 03:32:12'),
(1671, 160, 54, 'hadir', NULL, NULL, '2026-08-27 03:32:12', '2026-08-27 03:32:12'),
(1672, 160, 55, 'hadir', NULL, NULL, '2026-08-27 03:32:12', '2026-08-27 03:32:12'),
(1673, 160, 121, 'hadir', NULL, NULL, '2026-08-27 03:32:12', '2026-08-27 03:32:12'),
(1674, 160, 127, 'hadir', NULL, NULL, '2026-08-27 03:32:12', '2026-08-27 03:32:12'),
(1675, 160, 131, 'tidak_hadir', NULL, NULL, '2026-08-27 03:32:12', '2026-08-27 03:32:25'),
(1676, 160, 140, 'hadir', NULL, NULL, '2026-08-27 03:32:12', '2026-08-27 03:32:12'),
(1677, 161, 95, 'tidak_hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:55'),
(1678, 161, 96, 'tidak_hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:55'),
(1679, 161, 97, 'tidak_hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:55'),
(1680, 161, 98, 'tidak_hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:55'),
(1681, 161, 99, 'tidak_hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:55'),
(1682, 161, 100, 'tidak_hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:55'),
(1683, 161, 101, 'tidak_hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:55'),
(1684, 161, 102, 'hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:35'),
(1685, 161, 103, 'hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:35'),
(1686, 161, 104, 'hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:35'),
(1687, 161, 105, 'hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:35'),
(1688, 161, 106, 'hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:35'),
(1689, 161, 107, 'hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:35'),
(1690, 161, 108, 'hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:35'),
(1691, 161, 109, 'hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:35'),
(1692, 161, 110, 'hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:35'),
(1693, 161, 111, 'hadir', NULL, NULL, '2026-08-27 03:52:35', '2026-08-27 03:52:35'),
(1694, 162, 95, 'tidak_hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:40'),
(1695, 162, 96, 'tidak_hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:40'),
(1696, 162, 97, 'hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:16'),
(1697, 162, 98, 'hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:16'),
(1698, 162, 99, 'tidak_hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:40'),
(1699, 162, 100, 'hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:16'),
(1700, 162, 101, 'hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:16'),
(1701, 162, 102, 'hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:16'),
(1702, 162, 103, 'hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:16'),
(1703, 162, 104, 'hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:16'),
(1704, 162, 105, 'hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:16'),
(1705, 162, 106, 'hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:16'),
(1706, 162, 107, 'tidak_hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:40'),
(1707, 162, 108, 'tidak_hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:40'),
(1708, 162, 109, 'tidak_hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:40'),
(1709, 162, 110, 'tidak_hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:40'),
(1710, 162, 111, 'tidak_hadir', NULL, NULL, '2026-08-27 03:53:16', '2026-08-27 03:53:40'),
(1711, 163, 89, 'hadir', NULL, NULL, '2026-08-27 03:54:07', '2026-08-27 03:54:07'),
(1712, 163, 90, 'tidak_hadir', NULL, NULL, '2026-08-27 03:54:07', '2026-08-27 03:54:19'),
(1713, 163, 91, 'tidak_hadir', NULL, NULL, '2026-08-27 03:54:07', '2026-08-27 03:54:19'),
(1714, 163, 92, 'hadir', NULL, NULL, '2026-08-27 03:54:07', '2026-08-27 03:54:07'),
(1715, 163, 93, 'hadir', NULL, NULL, '2026-08-27 03:54:07', '2026-08-27 03:54:07'),
(1716, 163, 94, 'hadir', NULL, NULL, '2026-08-27 03:54:07', '2026-08-27 03:54:07'),
(1717, 163, 133, 'tidak_hadir', NULL, NULL, '2026-08-27 03:54:07', '2026-08-27 03:54:19'),
(1718, 164, 112, 'hadir', NULL, NULL, '2026-08-28 00:11:03', '2026-08-28 00:11:03'),
(1719, 164, 113, 'hadir', NULL, NULL, '2026-08-28 00:11:03', '2026-08-28 00:11:03'),
(1720, 164, 114, 'tidak_hadir', NULL, NULL, '2026-08-28 00:11:03', '2026-08-28 00:11:16'),
(1721, 164, 115, 'hadir', NULL, NULL, '2026-08-28 00:11:03', '2026-08-28 00:11:03'),
(1722, 164, 136, 'hadir', NULL, NULL, '2026-08-28 00:11:03', '2026-08-28 00:11:03'),
(1723, 164, 143, 'hadir', NULL, NULL, '2026-08-28 00:11:03', '2026-08-28 00:11:03'),
(1724, 165, 29, 'hadir', NULL, 'Quis', '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(1725, 165, 30, 'tidak_hadir', NULL, '-', '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(1726, 165, 31, 'tidak_hadir', NULL, '-', '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(1727, 165, 32, 'hadir', NULL, 'Quis', '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(1728, 165, 33, 'hadir', NULL, 'Quis', '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(1729, 165, 34, 'hadir', NULL, 'Quis', '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(1730, 165, 35, 'hadir', NULL, 'Quis', '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(1731, 165, 36, 'tidak_hadir', NULL, '-', '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(1732, 165, 37, 'hadir', NULL, 'Quis', '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(1733, 165, 38, 'hadir', NULL, 'Quis', '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(1734, 165, 42, 'tidak_hadir', NULL, '-', '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(1735, 165, 44, 'hadir', NULL, 'Quis', '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(1736, 165, 45, 'hadir', NULL, 'Quis', '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(1737, 165, 46, 'tidak_hadir', NULL, '-', '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(1738, 165, 120, 'hadir', NULL, 'Quis', '2026-08-28 01:29:36', '2026-08-28 01:32:11'),
(1739, 166, 12, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1740, 166, 13, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1741, 166, 16, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1742, 166, 17, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1743, 166, 19, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1744, 166, 20, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1745, 166, 22, 'tidak_hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:41:43'),
(1746, 166, 23, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1747, 166, 24, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1748, 166, 25, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1749, 166, 27, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1750, 166, 122, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1751, 166, 123, 'tidak_hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:41:43'),
(1752, 166, 134, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1753, 166, 135, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1754, 166, 141, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1755, 166, 142, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1756, 166, 144, 'hadir', NULL, NULL, '2026-08-28 01:40:43', '2026-08-28 01:40:43'),
(1757, 167, 57, 'hadir', NULL, 'Latihan olimpiade', '2026-08-28 01:41:58', '2026-08-28 03:12:02'),
(1758, 167, 58, 'hadir', NULL, 'Latihan olimpiade', '2026-08-28 01:41:58', '2026-08-28 03:12:02'),
(1759, 167, 59, 'hadir', NULL, 'Sangat perlu latihan perkalian dan pembagian', '2026-08-28 01:41:58', '2026-08-28 03:12:02'),
(1760, 167, 60, 'hadir', NULL, 'Sudah paham perkalian dan pembagian', '2026-08-28 01:41:58', '2026-08-28 03:12:02'),
(1761, 167, 61, 'hadir', NULL, 'Sudah paham, namun kurang teliti', '2026-08-28 01:41:58', '2026-08-28 03:12:02'),
(1762, 167, 62, 'hadir', NULL, 'Sudah paham, namun kurang teliti', '2026-08-28 01:41:58', '2026-08-28 03:12:02'),
(1763, 167, 63, 'tidak_hadir', 'Alpha', '-', '2026-08-28 01:41:58', '2026-08-28 03:12:02'),
(1764, 167, 124, 'tidak_hadir', 'Izin', '-', '2026-08-28 01:41:58', '2026-08-28 03:12:02'),
(1765, 167, 125, 'hadir', NULL, 'Sangat perlu latihan perkalian dan pembagian', '2026-08-28 01:41:58', '2026-08-28 03:12:02'),
(1766, 167, 137, 'hadir', NULL, 'Sangat perlu latihan perkalian dan pembagian', '2026-08-28 01:41:58', '2026-08-28 03:12:02'),
(1767, 167, 138, 'tidak_hadir', 'Sakit', '-', '2026-08-28 01:41:58', '2026-08-28 03:12:02'),
(1768, 167, 139, 'hadir', NULL, 'Sangat perlu latihan perkalian dan pembagian', '2026-08-28 01:41:58', '2026-08-28 03:12:02'),
(1769, 168, 80, 'hadir', NULL, NULL, '2026-08-28 03:05:39', '2026-08-28 03:05:39'),
(1770, 168, 82, 'hadir', NULL, NULL, '2026-08-28 03:05:39', '2026-08-28 03:05:39'),
(1771, 168, 83, 'hadir', NULL, NULL, '2026-08-28 03:05:39', '2026-08-28 03:05:39'),
(1772, 168, 84, 'hadir', NULL, NULL, '2026-08-28 03:05:39', '2026-08-28 03:05:39'),
(1773, 168, 85, 'hadir', NULL, NULL, '2026-08-28 03:05:39', '2026-08-28 03:05:39'),
(1774, 168, 86, 'hadir', NULL, NULL, '2026-08-28 03:05:39', '2026-08-28 03:05:39'),
(1775, 168, 87, 'tidak_hadir', 'Sakit', NULL, '2026-08-28 03:05:39', '2026-08-28 03:06:19'),
(1776, 168, 88, 'hadir', NULL, NULL, '2026-08-28 03:05:39', '2026-08-28 03:05:39'),
(1777, 168, 128, 'tidak_hadir', NULL, NULL, '2026-08-28 03:05:39', '2026-08-28 03:06:19'),
(1778, 168, 129, 'hadir', NULL, NULL, '2026-08-28 03:05:39', '2026-08-28 03:05:39'),
(1779, 168, 145, 'hadir', NULL, NULL, '2026-08-28 03:05:39', '2026-08-28 03:05:39'),
(1780, 169, 72, 'hadir', NULL, NULL, '2026-08-28 03:09:48', '2026-08-28 03:09:48'),
(1781, 169, 73, 'tidak_hadir', 'Alpha', NULL, '2026-08-28 03:09:48', '2026-08-28 03:10:38'),
(1782, 169, 74, 'hadir', NULL, NULL, '2026-08-28 03:09:48', '2026-08-28 03:09:48'),
(1783, 169, 75, 'tidak_hadir', 'Alpha', NULL, '2026-08-28 03:09:48', '2026-08-28 03:10:38'),
(1784, 169, 76, 'tidak_hadir', 'Izin', NULL, '2026-08-28 03:09:48', '2026-08-28 03:10:38'),
(1785, 169, 77, 'hadir', NULL, NULL, '2026-08-28 03:09:48', '2026-08-28 03:09:48'),
(1786, 169, 78, 'tidak_hadir', 'Alpha', NULL, '2026-08-28 03:09:48', '2026-08-28 03:10:38'),
(1787, 169, 79, 'tidak_hadir', 'Alpha', NULL, '2026-08-28 03:09:48', '2026-08-28 03:10:38'),
(1788, 169, 117, 'hadir', NULL, NULL, '2026-08-28 03:09:48', '2026-08-28 03:09:48'),
(1789, 169, 118, 'hadir', NULL, NULL, '2026-08-28 03:09:48', '2026-08-28 03:09:48'),
(1790, 169, 119, 'hadir', NULL, NULL, '2026-08-28 03:09:48', '2026-08-28 03:09:48'),
(1791, 169, 132, 'hadir', NULL, NULL, '2026-08-28 03:09:48', '2026-08-28 03:09:48'),
(1792, 170, 56, 'hadir', NULL, 'Quis', '2026-08-28 03:11:44', '2026-08-28 03:12:42'),
(1793, 170, 67, 'hadir', NULL, 'Quis', '2026-08-28 03:11:44', '2026-08-28 03:12:42'),
(1794, 170, 68, 'hadir', NULL, 'Quis', '2026-08-28 03:11:44', '2026-08-28 03:12:42'),
(1795, 170, 69, 'hadir', NULL, 'Quis', '2026-08-28 03:11:44', '2026-08-28 03:12:42'),
(1796, 170, 70, 'tidak_hadir', NULL, '-', '2026-08-28 03:11:44', '2026-08-28 03:12:42'),
(1797, 170, 71, 'hadir', NULL, 'Quis', '2026-08-28 03:11:44', '2026-08-28 03:12:42'),
(1798, 170, 130, 'hadir', NULL, 'Quis', '2026-08-28 03:11:44', '2026-08-28 03:12:42'),
(1799, 171, 26, 'hadir', NULL, NULL, '2026-08-28 03:15:47', '2026-08-28 03:15:47'),
(1800, 171, 28, 'hadir', NULL, NULL, '2026-08-28 03:15:47', '2026-08-28 03:15:47'),
(1801, 171, 47, 'hadir', NULL, NULL, '2026-08-28 03:15:47', '2026-08-28 03:15:47'),
(1802, 172, 51, 'hadir', NULL, NULL, '2026-08-28 03:16:08', '2026-08-28 03:16:08'),
(1803, 172, 52, 'hadir', NULL, NULL, '2026-08-28 03:16:08', '2026-08-28 03:16:08'),
(1804, 172, 53, 'hadir', NULL, NULL, '2026-08-28 03:16:08', '2026-08-28 03:16:08'),
(1805, 172, 54, 'hadir', NULL, NULL, '2026-08-28 03:16:08', '2026-08-28 03:16:08'),
(1806, 172, 55, 'hadir', NULL, NULL, '2026-08-28 03:16:08', '2026-08-28 03:16:08'),
(1807, 172, 121, 'hadir', NULL, NULL, '2026-08-28 03:16:08', '2026-08-28 03:16:08'),
(1808, 172, 127, 'hadir', NULL, NULL, '2026-08-28 03:16:08', '2026-08-28 03:16:08'),
(1809, 172, 131, 'tidak_hadir', NULL, NULL, '2026-08-28 03:16:08', '2026-08-28 03:16:26'),
(1810, 172, 140, 'hadir', NULL, NULL, '2026-08-28 03:16:08', '2026-08-28 03:16:08'),
(1811, 173, 95, 'tidak_hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:31'),
(1812, 173, 96, 'hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:07'),
(1813, 173, 97, 'hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:07'),
(1814, 173, 98, 'hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:07'),
(1815, 173, 99, 'hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:07'),
(1816, 173, 100, 'hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:07'),
(1817, 173, 101, 'tidak_hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:31'),
(1818, 173, 102, 'tidak_hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:31'),
(1819, 173, 103, 'tidak_hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:31'),
(1820, 173, 104, 'tidak_hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:31'),
(1821, 173, 105, 'tidak_hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:31'),
(1822, 173, 106, 'hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:07'),
(1823, 173, 107, 'hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:07'),
(1824, 173, 108, 'hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:07'),
(1825, 173, 109, 'hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:07'),
(1826, 173, 110, 'hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:07'),
(1827, 173, 111, 'hadir', NULL, NULL, '2026-08-28 03:40:07', '2026-08-28 03:40:07'),
(1828, 174, 126, 'hadir', NULL, NULL, '2026-08-28 05:53:53', '2026-08-28 05:53:53'),
(1829, 175, 126, 'hadir', NULL, NULL, '2026-08-28 05:54:16', '2026-08-28 05:54:16'),
(1830, 176, 126, 'hadir', NULL, NULL, '2026-08-28 05:54:32', '2026-08-28 05:54:32'),
(1831, 177, 126, 'hadir', NULL, NULL, '2026-08-28 05:55:04', '2026-08-28 05:55:04');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2026-07-27 09:34:38', '2026-07-27 09:34:38'),
(2, 'tutor', 'web', '2026-07-27 09:34:38', '2026-07-27 09:34:38'),
(3, 'siswa', 'web', '2026-07-27 09:34:38', '2026-07-27 09:34:38'),
(4, 'orang_tua', 'web', '2026-07-27 09:34:38', '2026-07-27 09:34:38');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(13, 2),
(14, 1),
(14, 2),
(15, 1),
(15, 2),
(16, 1),
(16, 2),
(16, 3),
(16, 4),
(17, 1),
(17, 2),
(18, 1),
(19, 1),
(19, 3),
(19, 4),
(20, 1),
(21, 1),
(22, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sekolahs`
--

CREATE TABLE `sekolahs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sekolahs`
--

INSERT INTO `sekolahs` (`id`, `nama`, `created_at`, `updated_at`) VALUES
(4, 'SMPN 1 BANDAR', '2026-07-27 09:34:39', '2026-07-28 06:38:32'),
(11, 'SMP Abdi Sejati Perdagangan', '2026-07-28 08:02:26', '2026-07-28 08:02:26'),
(12, 'SMPN 2 BANDAR', '2026-07-28 08:02:50', '2026-07-28 08:02:50'),
(13, 'SD Abdi Sejati Perdagangan', '2026-07-28 08:03:04', '2026-07-28 08:03:04'),
(14, 'SDN 091619 Perdagangan', '2026-07-28 08:03:46', '2026-07-28 08:03:46'),
(15, 'SDN 091648 Sugaran', '2026-07-28 08:03:58', '2026-07-28 08:03:58'),
(16, 'SDN 096136 Sukarakyat', '2026-07-28 08:05:05', '2026-07-28 08:05:05'),
(17, 'SDN 091628 Bandar Buntu', '2026-07-28 08:05:22', '2026-07-28 08:05:22'),
(18, 'SMAN 1 Bandar', '2026-07-28 08:05:39', '2026-07-28 08:05:39'),
(19, 'TK Santa Lusia Perdagangan', '2026-07-28 08:12:30', '2026-07-28 08:12:30'),
(20, 'TK Negeri Bandar', '2026-07-28 08:12:44', '2026-07-28 08:12:44'),
(21, 'SDN 091618 Perdagangan', '2026-08-03 06:33:29', '2026-08-03 06:33:29'),
(22, 'SD Methodist Perdagangan', '2026-08-03 06:47:59', '2026-08-03 06:47:59'),
(23, 'SDN 091621 Perdagangan', '2026-08-03 06:49:05', '2026-08-03 06:49:05'),
(24, 'SMP MUHAMMADIYAH', '2026-08-03 07:41:18', '2026-08-03 07:41:18');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `siswas`
--

CREATE TABLE `siswas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nis` varchar(20) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `no_telp` varchar(20) DEFAULT NULL,
  `tgl_lahir` date NOT NULL,
  `alamat` text DEFAULT NULL,
  `sekolah_id` bigint(20) UNSIGNED DEFAULT NULL,
  `kelas_asal` varchar(50) DEFAULT NULL,
  `tingkat_id` bigint(20) UNSIGNED DEFAULT NULL,
  `nama_ortu` varchar(255) DEFAULT NULL,
  `no_telp_ortu` varchar(20) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `status` enum('aktif','nonaktif','lulus') NOT NULL DEFAULT 'aktif',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `siswas`
--

INSERT INTO `siswas` (`id`, `nis`, `nama`, `email`, `no_telp`, `tgl_lahir`, `alamat`, `sekolah_id`, `kelas_asal`, `tingkat_id`, `nama_ortu`, `no_telp_ortu`, `foto`, `status`, `created_at`, `updated_at`) VALUES
(12, '20260001', 'RUTH SHELOMITHA HASIBUAN', NULL, NULL, '2018-12-10', NULL, 13, NULL, 2, NULL, NULL, NULL, 'aktif', '2026-07-28 17:45:44', '2026-08-03 06:42:30'),
(13, '20260002', 'BETSYEBA SIMAMORA', NULL, NULL, '2026-07-03', NULL, 13, NULL, 1, NULL, NULL, NULL, 'aktif', '2026-08-03 00:30:33', '2026-08-03 00:30:33'),
(14, '20260003', 'TRITIRA HUTAGAOL', NULL, NULL, '2026-01-03', NULL, 13, NULL, 1, NULL, NULL, NULL, 'nonaktif', '2026-08-03 00:32:41', '2026-08-18 20:48:48'),
(15, '20260004', 'RAPHAEL FAVIAN NAIBAHO', NULL, NULL, '2026-08-03', NULL, 13, NULL, 1, NULL, NULL, NULL, 'nonaktif', '2026-08-03 00:33:54', '2026-08-18 20:51:51'),
(16, '20260005', 'KAYONA PANGGABEAN', NULL, NULL, '2026-08-03', NULL, 13, NULL, 1, NULL, NULL, NULL, 'aktif', '2026-08-03 00:34:40', '2026-08-03 06:32:09'),
(17, '20260006', 'ALEX NADEAK', NULL, NULL, '2026-08-03', NULL, 13, NULL, 1, NULL, NULL, NULL, 'aktif', '2026-08-03 00:46:36', '2026-08-03 00:46:36'),
(19, '20260008', 'ADRIEL MANIK', NULL, NULL, '2026-08-03', NULL, 13, NULL, 1, NULL, NULL, NULL, 'aktif', '2026-08-03 06:37:38', '2026-08-03 06:37:38'),
(20, '20260009', 'ADAM GOGO MANIK', NULL, NULL, '2026-08-03', NULL, 13, NULL, 2, NULL, NULL, NULL, 'aktif', '2026-08-03 06:38:20', '2026-08-20 01:37:32'),
(22, '20260011', 'KYRIE ELEISON NAIBAHO', NULL, NULL, '2026-08-03', NULL, 13, NULL, 2, NULL, NULL, NULL, 'aktif', '2026-08-03 06:40:31', '2026-08-03 06:40:31'),
(23, '20260012', 'DIRA TAMPUBOLON', NULL, NULL, '2026-08-03', NULL, 13, NULL, 2, NULL, NULL, NULL, 'aktif', '2026-08-03 06:41:17', '2026-08-03 06:41:17'),
(24, '20260013', 'JERNITA HALOHO', NULL, NULL, '2026-08-03', NULL, 13, NULL, 2, NULL, NULL, NULL, 'aktif', '2026-08-03 06:42:01', '2026-08-03 06:42:01'),
(25, '20260014', 'RISTA FELICIA SINAGA', NULL, NULL, '2026-08-03', NULL, 13, NULL, 2, NULL, NULL, NULL, 'aktif', '2026-08-03 06:43:49', '2026-08-03 06:43:49'),
(26, '20260015', 'BRYAN NAPITUPULU', NULL, NULL, '2026-08-03', NULL, 13, NULL, 2, NULL, NULL, NULL, 'aktif', '2026-08-03 06:44:33', '2026-08-03 06:44:33'),
(27, '20260016', 'STIVEN SIHOMBING', NULL, NULL, '2026-08-03', NULL, NULL, NULL, 2, NULL, NULL, NULL, 'aktif', '2026-08-03 06:45:27', '2026-08-03 06:45:27'),
(28, '20260017', 'DHEAMORA NAPITUPULU', NULL, NULL, '2026-08-03', NULL, 13, NULL, 3, NULL, NULL, NULL, 'aktif', '2026-08-03 06:46:06', '2026-08-03 06:46:06'),
(29, '20260018', 'ARIFIN SITINJAK', NULL, NULL, '2026-08-03', NULL, NULL, NULL, 3, NULL, NULL, NULL, 'aktif', '2026-08-03 06:46:48', '2026-08-03 06:46:48'),
(30, '20260019', 'CHARLIE', NULL, NULL, '2026-08-03', NULL, 22, NULL, 3, NULL, NULL, NULL, 'aktif', '2026-08-03 06:47:29', '2026-08-03 06:48:09'),
(31, '20260020', 'KEVIN SIANTURI', NULL, NULL, '2026-08-03', NULL, 23, NULL, 3, NULL, NULL, NULL, 'aktif', '2026-08-03 06:48:51', '2026-08-03 06:49:15'),
(32, '20260021', 'NAOMI PURBA', NULL, NULL, '2026-08-03', NULL, 21, NULL, 3, NULL, NULL, NULL, 'aktif', '2026-08-03 06:50:45', '2026-08-03 06:50:45'),
(33, '20260022', 'EMILIUS FELIX SIAGIAN', NULL, NULL, '2026-08-03', NULL, 13, NULL, 3, NULL, NULL, NULL, 'aktif', '2026-08-03 06:51:48', '2026-08-03 06:51:48'),
(34, '20260023', 'NASRON SIMANJUNTAK', NULL, NULL, '2026-08-03', NULL, NULL, NULL, 3, NULL, NULL, NULL, 'aktif', '2026-08-03 06:52:53', '2026-08-03 06:52:53'),
(35, '20260024', 'KASIH DYSA NAIBAHO', NULL, NULL, '2026-08-03', NULL, 13, NULL, 3, NULL, NULL, NULL, 'aktif', '2026-08-03 06:53:48', '2026-08-03 06:53:48'),
(36, '20260025', 'THEOMORA HUTABARAT', NULL, NULL, '2026-08-03', NULL, 22, NULL, 3, NULL, NULL, NULL, 'aktif', '2026-08-03 06:54:20', '2026-08-03 06:54:20'),
(37, '20260026', 'IBREYNA SIHOMBING', NULL, NULL, '2026-08-03', NULL, 13, NULL, 3, NULL, NULL, NULL, 'aktif', '2026-08-03 06:55:03', '2026-08-03 06:55:03'),
(38, '20260027', 'YABES PANGGABEAN', NULL, NULL, '2026-08-03', NULL, 13, NULL, 3, NULL, NULL, NULL, 'aktif', '2026-08-03 06:55:39', '2026-08-03 06:55:39'),
(42, '20260031', 'AIRA MANIK', NULL, NULL, '2026-08-03', NULL, 21, NULL, 4, NULL, NULL, NULL, 'aktif', '2026-08-03 06:58:50', '2026-08-03 06:58:50'),
(44, '20260033', 'PELANGI SITUMORANG', NULL, NULL, '2026-08-03', NULL, 22, NULL, 3, NULL, NULL, NULL, 'aktif', '2026-08-03 07:00:13', '2026-08-03 07:00:13'),
(45, '20260034', 'CARISSA PASARIBU', NULL, NULL, '2026-08-03', NULL, 13, NULL, 4, NULL, NULL, NULL, 'aktif', '2026-08-03 07:00:54', '2026-08-03 07:00:54'),
(46, '20260035', 'HONEY HASIBUAN', NULL, NULL, '2026-08-03', NULL, NULL, NULL, 4, NULL, NULL, NULL, 'aktif', '2026-08-03 07:01:38', '2026-08-03 07:01:38'),
(47, '20260036', 'ADRIEL SARAGIH', NULL, NULL, '2026-08-03', NULL, NULL, NULL, 4, NULL, NULL, NULL, 'aktif', '2026-08-03 07:02:15', '2026-08-03 07:02:15'),
(50, '20260037', 'SANDRO SIRINGO-RINGO', NULL, NULL, '2026-08-03', NULL, NULL, NULL, 4, NULL, NULL, NULL, 'nonaktif', '2026-08-03 07:05:34', '2026-08-18 20:51:08'),
(51, '20260038', 'GLENIKO TAMPUBOLON', NULL, NULL, '2026-08-03', NULL, 13, NULL, 4, NULL, NULL, NULL, 'aktif', '2026-08-03 07:09:49', '2026-08-03 07:09:49'),
(52, '20260039', 'JACKWIN BAKKARA', NULL, NULL, '2026-08-03', NULL, 13, NULL, 4, NULL, NULL, NULL, 'aktif', '2026-08-03 07:10:45', '2026-08-03 07:10:45'),
(53, '20260040', 'CLISTO DEKAKA SAMOSIR', NULL, NULL, '2026-08-03', NULL, NULL, NULL, 4, NULL, NULL, NULL, 'aktif', '2026-08-03 07:11:43', '2026-08-03 07:11:43'),
(54, '20260041', 'SIM KELVIN', NULL, NULL, '2026-08-03', NULL, 13, NULL, 4, NULL, NULL, NULL, 'aktif', '2026-08-03 07:12:33', '2026-08-03 07:12:33'),
(55, '20260042', 'ADRIAN TOBING', NULL, NULL, '2026-08-03', NULL, 13, NULL, 2, NULL, NULL, NULL, 'aktif', '2026-08-03 07:14:55', '2026-08-03 07:14:55'),
(56, '20260043', 'KEYSIA HALOHO', NULL, NULL, '2026-08-03', NULL, 13, NULL, 5, NULL, NULL, NULL, 'aktif', '2026-08-03 07:16:33', '2026-08-03 07:16:33'),
(57, '20260044', 'FELICIA TAMBUNAN', NULL, NULL, '2026-08-03', NULL, 22, NULL, 3, NULL, NULL, NULL, 'aktif', '2026-08-03 07:17:05', '2026-08-03 07:17:05'),
(58, '20260045', 'NICOLE TAMBUNAN', NULL, NULL, '2026-08-03', NULL, 22, NULL, 5, NULL, NULL, NULL, 'aktif', '2026-08-03 07:17:44', '2026-08-03 07:17:44'),
(59, '20260046', 'MISEL MANURUNG', NULL, NULL, '2026-08-03', NULL, 13, NULL, 5, NULL, NULL, NULL, 'aktif', '2026-08-03 07:18:26', '2026-08-03 07:18:26'),
(60, '20260047', 'GRACE LIM', NULL, NULL, '2026-08-03', NULL, 14, NULL, 5, NULL, NULL, NULL, 'aktif', '2026-08-03 07:19:03', '2026-08-03 07:19:03'),
(61, '20260048', 'KERIN MANURUNG', NULL, NULL, '2026-08-03', NULL, 13, NULL, 6, NULL, NULL, NULL, 'aktif', '2026-08-03 07:19:36', '2026-08-03 07:19:36'),
(62, '20260049', 'APRILIA TANIA SITINJAK', NULL, NULL, '2026-08-03', NULL, 13, NULL, 6, NULL, NULL, NULL, 'aktif', '2026-08-03 07:20:11', '2026-08-03 07:20:11'),
(63, '20260050', 'ADEL SIRAIT', NULL, NULL, '2026-08-03', NULL, 13, NULL, 6, NULL, NULL, NULL, 'aktif', '2026-08-03 07:20:39', '2026-08-03 07:20:39'),
(67, '20260053', 'CHELSEA SILALAHI', NULL, NULL, '2026-08-03', NULL, 13, NULL, 6, NULL, NULL, NULL, 'aktif', '2026-08-03 07:24:18', '2026-08-03 07:24:18'),
(68, '20260054', 'GELAEL GIRSANG', NULL, NULL, '2026-08-03', NULL, 13, NULL, 6, NULL, NULL, NULL, 'aktif', '2026-08-03 07:24:48', '2026-08-03 07:24:48'),
(69, '20260055', 'RICHIE', NULL, NULL, '2026-08-03', NULL, 13, NULL, 6, NULL, NULL, NULL, 'aktif', '2026-08-03 07:25:27', '2026-08-03 07:25:50'),
(70, '20260056', 'IRNA LUMBANTUNGKUP', NULL, NULL, '2026-08-03', NULL, 15, NULL, 6, NULL, NULL, NULL, 'aktif', '2026-08-03 07:26:55', '2026-08-03 07:26:55'),
(71, '20260057', 'GALIO PASARIBU', NULL, NULL, '2026-08-03', NULL, 16, NULL, 5, NULL, NULL, NULL, 'aktif', '2026-08-03 07:27:22', '2026-08-03 07:27:22'),
(72, '20260058', 'TULUS PASARIBU', NULL, NULL, '2026-08-03', NULL, 11, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 07:27:58', '2026-08-03 07:27:58'),
(73, '20260059', 'NICO LAOS SILABAN', NULL, NULL, '2026-08-03', NULL, 11, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 07:28:32', '2026-08-03 07:28:32'),
(74, '20260060', 'MATIUS MORGAN SIPAYUNG', NULL, NULL, '2026-08-03', NULL, 11, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 07:29:03', '2026-08-03 08:30:46'),
(75, '20260061', 'ARGA MANURUNG', NULL, NULL, '2026-08-03', NULL, 11, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 07:29:36', '2026-08-03 07:29:36'),
(76, '20260062', 'MARIA LUMBANTUNGKUP', NULL, NULL, '2026-08-03', NULL, 11, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 07:30:08', '2026-08-03 07:30:08'),
(77, '20260063', 'NOVITA ZAHRA', NULL, NULL, '2026-08-03', NULL, NULL, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 07:30:48', '2026-08-03 07:30:48'),
(78, '20260064', 'TEDDY HASIBUAN', NULL, NULL, '2026-08-03', NULL, 4, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 07:33:10', '2026-08-03 07:33:10'),
(79, '20260065', 'GRACEYLA SIDABUTAR', NULL, NULL, '2026-08-03', NULL, NULL, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 07:33:52', '2026-08-03 07:33:52'),
(80, '20260066', 'MONIKA SAMOSIR', NULL, NULL, '2026-08-03', NULL, 11, NULL, 8, NULL, NULL, NULL, 'aktif', '2026-08-03 07:34:41', '2026-08-03 07:34:41'),
(81, '20260067', 'THYESA SIAHAAN', NULL, NULL, '2026-08-03', NULL, 11, NULL, 8, NULL, NULL, NULL, 'nonaktif', '2026-08-03 07:35:08', '2026-08-25 22:27:39'),
(82, '20260068', 'RUTH MIKHA SITANGGANG', NULL, NULL, '2026-08-03', NULL, 11, NULL, 8, NULL, NULL, NULL, 'aktif', '2026-08-03 07:35:39', '2026-08-03 07:35:39'),
(83, '20260069', 'PUTRI TAMPUBOLON', NULL, NULL, '2026-08-03', NULL, 11, NULL, 8, NULL, NULL, NULL, 'aktif', '2026-08-03 07:36:10', '2026-08-03 07:36:10'),
(84, '20260070', 'RISMA', NULL, NULL, '2026-08-03', NULL, 11, NULL, 8, NULL, NULL, NULL, 'aktif', '2026-08-03 07:36:43', '2026-08-03 07:36:43'),
(85, '20260071', 'HANI HUTAPEA', NULL, NULL, '2026-08-03', NULL, 11, NULL, 8, NULL, NULL, NULL, 'aktif', '2026-08-03 07:37:10', '2026-08-03 07:37:10'),
(86, '20260072', 'JEREMIA SIAGIAIN', NULL, NULL, '2026-08-03', NULL, 11, NULL, 8, NULL, NULL, NULL, 'aktif', '2026-08-03 07:37:40', '2026-08-03 07:37:40'),
(87, '20260073', 'JAVIER SIHOTANG', NULL, NULL, '2026-08-03', NULL, 11, NULL, 8, NULL, NULL, NULL, 'aktif', '2026-08-03 07:38:10', '2026-08-03 07:38:10'),
(88, '20260074', 'CARLOS MANIHURUK', NULL, NULL, '2026-08-03', NULL, 11, NULL, 8, NULL, NULL, NULL, 'aktif', '2026-08-03 07:38:38', '2026-08-03 07:38:38'),
(89, '20260075', 'EVAN PANJAITAN', NULL, NULL, '2026-08-03', NULL, 11, NULL, 8, NULL, NULL, NULL, 'aktif', '2026-08-03 07:39:19', '2026-08-03 07:39:19'),
(90, '20260076', 'JOICE SARAGIH', NULL, NULL, '2026-08-03', NULL, 11, NULL, 8, NULL, NULL, NULL, 'aktif', '2026-08-03 07:39:43', '2026-08-03 07:39:43'),
(91, '20260077', 'LUKAS ANTONIA', NULL, NULL, '2026-08-03', NULL, 4, NULL, 9, NULL, NULL, NULL, 'aktif', '2026-08-03 07:40:37', '2026-08-03 07:40:37'),
(92, '20260078', 'KEY ANISA', NULL, NULL, '2026-08-03', NULL, 24, NULL, 9, NULL, NULL, NULL, 'aktif', '2026-08-03 07:41:09', '2026-08-03 07:41:38'),
(93, '20260079', 'CLAUDIA LUMBANGAOL', NULL, NULL, '2026-08-03', NULL, 11, NULL, 9, NULL, NULL, NULL, 'aktif', '2026-08-03 07:42:09', '2026-08-03 07:42:09'),
(94, '20260080', 'BINTANG BAKKARA', NULL, NULL, '2026-08-03', NULL, 12, NULL, 9, NULL, NULL, NULL, 'aktif', '2026-08-03 07:43:05', '2026-08-03 07:43:05'),
(95, '20260081', 'GRACIA SIJABAT', NULL, NULL, '2026-08-03', NULL, 13, NULL, 4, NULL, NULL, NULL, 'aktif', '2026-08-03 07:44:16', '2026-08-03 07:44:16'),
(96, '20260082', 'RISDO SILALAHI', NULL, NULL, '2026-08-03', NULL, 13, NULL, 4, NULL, NULL, NULL, 'aktif', '2026-08-03 07:44:52', '2026-08-03 07:44:52'),
(97, '20260083', 'MARIA ARITONANG', NULL, NULL, '2026-08-03', NULL, 13, NULL, 6, NULL, NULL, NULL, 'aktif', '2026-08-03 07:45:19', '2026-08-03 07:45:19'),
(98, '20260084', 'MISEL ARITONANG', NULL, NULL, '2026-08-03', NULL, 13, NULL, 3, NULL, NULL, NULL, 'aktif', '2026-08-03 07:45:51', '2026-08-03 07:45:51'),
(99, '20260085', 'KAYLA SITINJAK', NULL, NULL, '2026-08-03', NULL, 13, NULL, 3, NULL, NULL, NULL, 'aktif', '2026-08-03 07:46:21', '2026-08-03 07:46:21'),
(100, '20260086', 'CHELSEA BUTAR-BUTAR', NULL, NULL, '2026-08-03', NULL, NULL, NULL, 5, NULL, NULL, NULL, 'aktif', '2026-08-03 07:47:04', '2026-08-03 07:47:04'),
(101, '20260087', 'RAYEN SILALAHI', NULL, NULL, '2026-08-03', NULL, 13, NULL, 6, NULL, NULL, NULL, 'aktif', '2026-08-03 07:47:41', '2026-08-03 07:47:41'),
(102, '20260088', 'DANIEL HALOHO', NULL, NULL, '2026-08-03', NULL, 13, NULL, 6, NULL, NULL, NULL, 'aktif', '2026-08-03 07:48:14', '2026-08-03 07:48:14'),
(103, '20260089', 'ABELIA MANIK', NULL, NULL, '2026-08-03', NULL, 13, NULL, 6, NULL, NULL, NULL, 'aktif', '2026-08-03 07:48:59', '2026-08-03 07:48:59'),
(104, '20260090', 'KEY TAMBUNAN', NULL, NULL, '2026-08-03', NULL, 22, NULL, 6, NULL, NULL, NULL, 'aktif', '2026-08-03 07:49:25', '2026-08-03 07:49:25'),
(105, '20260091', 'GIOVANI LIM', NULL, NULL, '2026-08-03', NULL, 14, NULL, 6, NULL, NULL, NULL, 'aktif', '2026-08-03 07:49:55', '2026-08-03 07:49:55'),
(106, '20260092', 'ARTAULI HUTABARAT', NULL, NULL, '2026-08-03', NULL, 13, NULL, 5, NULL, NULL, NULL, 'aktif', '2026-08-03 07:50:33', '2026-08-03 07:50:33'),
(107, '20260093', 'SEPTRIANA SAMOSIR', NULL, NULL, '2026-08-03', NULL, 11, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 07:53:16', '2026-08-03 07:53:16'),
(108, '20260094', 'YANA SIMANUNGKALIT', NULL, NULL, '2026-08-03', NULL, 11, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 07:53:57', '2026-08-03 07:53:57'),
(109, '20260095', 'YENSI SEBAYANG', NULL, NULL, '2026-08-03', NULL, 11, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 07:54:45', '2026-08-03 07:54:45'),
(110, '20260096', 'AFIF', NULL, NULL, '2026-08-03', NULL, 4, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 07:55:12', '2026-08-03 07:55:12'),
(111, '20260097', 'DANIEL LUMBANGAOL', NULL, NULL, '2026-08-03', NULL, 11, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 07:55:40', '2026-08-03 07:55:40'),
(112, '20260098', 'GEONATHAN HASIBUAN', NULL, NULL, '2026-08-03', NULL, 19, NULL, 13, NULL, NULL, NULL, 'aktif', '2026-08-03 07:56:20', '2026-08-03 07:56:20'),
(113, '20260099', 'HAROLD HALOHO', NULL, NULL, '2026-08-03', NULL, 19, NULL, 14, NULL, NULL, NULL, 'aktif', '2026-08-03 07:56:49', '2026-08-03 07:56:49'),
(114, '20260100', 'EDEN NAINGGOLAN', NULL, NULL, '2026-08-03', NULL, 19, NULL, 13, NULL, NULL, NULL, 'aktif', '2026-08-03 07:57:18', '2026-08-03 07:57:18'),
(115, '20260101', 'CLAUDIA MANIHURUK', NULL, NULL, '2026-08-03', NULL, 19, NULL, 13, NULL, NULL, NULL, 'aktif', '2026-08-03 07:57:50', '2026-08-03 07:57:50'),
(116, '20260102', 'CAHAYA BATUBARA', NULL, NULL, '2026-08-03', NULL, 20, NULL, 13, NULL, NULL, NULL, 'nonaktif', '2026-08-03 07:58:23', '2026-08-25 22:25:38'),
(117, '20260103', 'RAYMOND SIMANJUNTAK', NULL, NULL, '2026-08-03', NULL, 11, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 08:13:07', '2026-08-03 08:13:07'),
(118, '20260104', 'UNGGUL PASARIBU', NULL, NULL, '2026-08-03', NULL, 11, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 08:13:44', '2026-08-03 08:13:44'),
(119, '20260105', 'DINDA SALIM', NULL, NULL, '2026-08-03', NULL, NULL, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-03 08:14:38', '2026-08-09 06:34:46'),
(120, '20260106', 'JOICE SIMORANGKIR', NULL, NULL, '2026-08-03', NULL, 13, NULL, 4, NULL, NULL, NULL, 'aktif', '2026-08-03 08:15:18', '2026-08-03 08:15:18'),
(121, '20260107', 'CHIKO GIRSANG', NULL, NULL, '2026-08-03', NULL, 13, NULL, 4, NULL, NULL, NULL, 'aktif', '2026-08-03 08:16:13', '2026-08-03 08:16:13'),
(122, '20260108', 'PRISIL SITINJAK', NULL, NULL, '2026-08-03', NULL, 13, NULL, 1, NULL, NULL, NULL, 'aktif', '2026-08-03 08:17:05', '2026-08-03 08:17:05'),
(123, '20260109', 'RICH HUTAHAEAN', NULL, NULL, '2026-08-03', NULL, 13, NULL, 1, NULL, NULL, NULL, 'aktif', '2026-08-03 08:17:29', '2026-08-03 08:17:29'),
(124, '20260110', 'ALISYA RUMAPEA', NULL, NULL, '2026-08-03', NULL, NULL, NULL, 5, NULL, NULL, NULL, 'aktif', '2026-08-03 08:19:00', '2026-08-03 08:19:00'),
(125, '20260111', 'VANIA', NULL, NULL, '2026-08-03', NULL, NULL, NULL, 6, NULL, NULL, NULL, 'aktif', '2026-08-03 08:19:28', '2026-08-03 08:19:28'),
(126, '20260112', 'LIONEL SIMANJUNTAK', NULL, NULL, '2026-08-03', NULL, 18, NULL, 10, NULL, NULL, NULL, 'aktif', '2026-08-03 08:26:42', '2026-08-03 08:27:15'),
(127, '20260113', 'GUARDIANO', NULL, NULL, '2026-08-05', NULL, 13, NULL, 4, NULL, NULL, NULL, 'aktif', '2026-08-04 23:46:41', '2026-08-04 23:46:41'),
(128, '20260114', 'JELITA ZENDRATO', NULL, NULL, '2026-08-05', NULL, NULL, NULL, 8, NULL, NULL, NULL, 'aktif', '2026-08-04 23:48:29', '2026-08-04 23:48:29'),
(129, '20260115', 'MISEL SIANIPAR', NULL, NULL, '2026-08-05', NULL, 12, NULL, 9, NULL, NULL, NULL, 'aktif', '2026-08-05 00:47:11', '2026-08-05 00:47:11'),
(130, '20260116', 'VANIA TAMBUNAN', NULL, NULL, '2026-08-09', NULL, NULL, NULL, 2, NULL, NULL, NULL, 'aktif', '2026-08-09 06:44:27', '2026-08-09 06:44:27'),
(131, '20260117', 'GABRIEL PURBA', NULL, NULL, '2026-08-09', NULL, 13, NULL, 4, NULL, NULL, NULL, 'aktif', '2026-08-09 06:47:21', '2026-08-09 06:47:21'),
(132, '20260118', 'Hanny Sitorus', NULL, NULL, '2026-08-10', NULL, 11, NULL, 7, NULL, NULL, NULL, 'aktif', '2026-08-09 16:23:00', '2026-08-09 16:23:00'),
(133, '20260119', 'ALBERT GINTING', NULL, NULL, '2026-08-11', NULL, 11, NULL, 9, NULL, NULL, NULL, 'aktif', '2026-08-10 23:45:31', '2026-08-10 23:45:31'),
(134, '20260120', 'SHENA SIJABAT', NULL, NULL, '2026-08-11', NULL, 13, NULL, 2, NULL, NULL, NULL, 'aktif', '2026-08-10 23:46:06', '2026-08-10 23:46:06'),
(135, '20260121', 'KEVIN SIJABAT', NULL, NULL, '2026-08-11', NULL, 13, NULL, 1, NULL, NULL, NULL, 'aktif', '2026-08-10 23:46:36', '2026-08-10 23:46:36'),
(136, '20260122', 'JESICA NAINGGOLAN', NULL, NULL, '2026-08-11', NULL, 23, NULL, 2, NULL, NULL, NULL, 'aktif', '2026-08-10 23:47:45', '2026-08-10 23:47:45'),
(137, '20260123', 'MIKAELA SIHOTANG', NULL, NULL, '2026-08-11', NULL, 17, NULL, 5, NULL, NULL, NULL, 'aktif', '2026-08-11 00:11:37', '2026-08-11 00:11:37'),
(138, '20260124', 'Alfianta Ginting', NULL, NULL, '2026-08-12', NULL, 13, NULL, 6, NULL, NULL, NULL, 'aktif', '2026-08-12 00:57:38', '2026-08-12 00:57:38'),
(139, '20260125', 'Natasya Aritonang', NULL, NULL, '2026-08-12', NULL, 14, NULL, 5, NULL, NULL, NULL, 'aktif', '2026-08-12 00:59:27', '2026-08-12 00:59:27'),
(140, '20260126', 'Farrel Gulo', NULL, NULL, '2026-08-12', NULL, 13, NULL, 4, NULL, NULL, NULL, 'aktif', '2026-08-12 01:00:23', '2026-08-12 01:00:23'),
(141, '20260127', 'Alvarendra Sinaga', NULL, NULL, '2026-08-12', NULL, NULL, NULL, 2, NULL, NULL, NULL, 'aktif', '2026-08-12 01:10:58', '2026-08-12 01:10:58'),
(142, '20260128', 'Sheza', NULL, NULL, '2026-08-12', NULL, NULL, NULL, 1, NULL, NULL, NULL, 'aktif', '2026-08-12 02:20:21', '2026-08-12 02:20:21'),
(143, '20260129', 'David Beckham Manik', NULL, NULL, '2026-08-19', NULL, 21, NULL, 1, NULL, NULL, NULL, 'aktif', '2026-08-18 22:54:17', '2026-08-18 22:54:17'),
(144, '20260130', 'Uli Lovandra Simanjuntak', NULL, NULL, '2026-08-20', NULL, 13, NULL, 1, NULL, NULL, NULL, 'aktif', '2026-08-20 01:40:44', '2026-08-20 01:40:44'),
(145, '20260131', 'Masyha Deo Vanny Mandalahi', NULL, NULL, '2026-08-26', NULL, NULL, NULL, 8, NULL, NULL, NULL, 'aktif', '2026-08-26 00:53:07', '2026-08-26 00:53:07');

-- --------------------------------------------------------

--
-- Table structure for table `siswa_pakets`
--

CREATE TABLE `siswa_pakets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `siswa_id` bigint(20) UNSIGNED NOT NULL,
  `kelas_id` bigint(20) UNSIGNED NOT NULL,
  `paket_id` bigint(20) UNSIGNED NOT NULL,
  `tgl_mulai` date NOT NULL,
  `tgl_selesai` date NOT NULL,
  `status` enum('aktif','terjadwal','selesai') NOT NULL DEFAULT 'aktif',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `siswa_pakets`
--

INSERT INTO `siswa_pakets` (`id`, `siswa_id`, `kelas_id`, `paket_id`, `tgl_mulai`, `tgl_selesai`, `status`, `created_at`, `updated_at`) VALUES
(1, 12, 7, 3, '2026-07-29', '2026-08-29', 'aktif', '2026-07-28 17:45:44', '2026-07-28 17:45:44'),
(2, 13, 7, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 00:30:33', '2026-08-03 00:30:33'),
(5, 16, 7, 3, '2026-08-03', '2026-09-03', 'aktif', '2026-08-03 00:34:40', '2026-08-03 00:34:40'),
(6, 17, 7, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 00:46:36', '2026-08-03 00:46:36'),
(8, 19, 7, 3, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 06:37:38', '2026-08-03 06:37:38'),
(11, 22, 7, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 06:40:31', '2026-08-03 06:40:31'),
(12, 23, 7, 3, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 06:41:17', '2026-08-03 06:41:17'),
(13, 24, 7, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 06:42:01', '2026-08-03 06:42:01'),
(14, 25, 7, 3, '2026-08-14', '2026-09-14', 'aktif', '2026-08-03 06:43:49', '2026-08-03 06:43:49'),
(16, 27, 7, 3, '2026-08-20', '2026-09-20', 'aktif', '2026-08-03 06:45:27', '2026-08-03 06:45:27'),
(18, 29, 8, 3, '2026-07-27', '2026-08-27', 'aktif', '2026-08-03 06:46:48', '2026-08-03 06:46:48'),
(19, 30, 8, 1, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 06:47:29', '2026-08-03 06:47:29'),
(20, 31, 8, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 06:48:51', '2026-08-03 06:48:51'),
(21, 32, 8, 1, '2026-08-13', '2026-09-13', 'aktif', '2026-08-03 06:50:45', '2026-08-03 06:50:45'),
(22, 33, 8, 3, '2026-07-22', '2026-08-22', 'aktif', '2026-08-03 06:51:48', '2026-08-03 06:51:48'),
(23, 34, 8, 3, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 06:52:53', '2026-08-03 06:52:53'),
(24, 35, 8, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 06:53:48', '2026-08-03 06:53:48'),
(25, 36, 8, 3, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 06:54:20', '2026-08-03 06:54:20'),
(26, 37, 8, 3, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 06:55:03', '2026-08-03 06:55:03'),
(27, 38, 8, 3, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 06:55:39', '2026-08-03 06:55:39'),
(31, 42, 8, 1, '2026-07-15', '2026-08-15', 'aktif', '2026-08-03 06:58:50', '2026-08-03 06:58:50'),
(33, 44, 8, 3, '2026-07-20', '2026-08-20', 'aktif', '2026-08-03 07:00:13', '2026-08-03 07:00:13'),
(34, 45, 8, 3, '2026-07-21', '2026-08-21', 'aktif', '2026-08-03 07:00:54', '2026-08-03 07:00:54'),
(35, 46, 8, 1, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 07:01:38', '2026-08-03 07:01:38'),
(38, 51, 15, 3, '2026-07-20', '2026-08-20', 'aktif', '2026-08-03 07:09:49', '2026-08-03 07:09:49'),
(39, 52, 15, 3, '2026-07-22', '2026-08-22', 'aktif', '2026-08-03 07:10:45', '2026-08-03 07:10:45'),
(40, 53, 15, 3, '2026-07-20', '2026-08-20', 'aktif', '2026-08-03 07:11:43', '2026-08-03 07:11:43'),
(41, 54, 15, 3, '2026-07-22', '2026-08-22', 'aktif', '2026-08-03 07:12:33', '2026-08-03 07:12:33'),
(42, 55, 15, 3, '2026-07-27', '2026-08-27', 'aktif', '2026-08-03 07:14:55', '2026-08-03 07:14:55'),
(43, 56, 16, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 07:16:33', '2026-08-03 07:16:33'),
(44, 57, 9, 3, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 07:17:05', '2026-08-03 07:17:05'),
(45, 58, 9, 3, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 07:17:44', '2026-08-03 07:17:44'),
(46, 59, 9, 3, '2026-07-21', '2026-08-21', 'aktif', '2026-08-03 07:18:26', '2026-08-03 07:18:26'),
(47, 60, 9, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 07:19:03', '2026-08-03 07:19:03'),
(48, 61, 9, 3, '2026-07-22', '2026-08-22', 'aktif', '2026-08-03 07:19:36', '2026-08-03 07:19:36'),
(49, 62, 9, 3, '2026-07-21', '2026-08-21', 'aktif', '2026-08-03 07:20:11', '2026-08-03 07:20:11'),
(50, 63, 9, 3, '2026-07-20', '2026-08-20', 'aktif', '2026-08-03 07:20:39', '2026-08-03 07:20:39'),
(54, 67, 16, 3, '2026-07-15', '2026-08-15', 'aktif', '2026-08-03 07:24:18', '2026-08-03 07:24:18'),
(55, 68, 16, 3, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 07:24:48', '2026-08-03 07:24:48'),
(56, 69, 16, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 07:25:27', '2026-08-03 07:25:27'),
(57, 70, 16, 3, '2026-07-20', '2026-08-20', 'aktif', '2026-08-03 07:26:55', '2026-08-03 07:26:55'),
(58, 71, 16, 3, '2026-07-20', '2026-08-20', 'aktif', '2026-08-03 07:27:22', '2026-08-03 07:27:22'),
(59, 72, 10, 3, '2026-07-20', '2026-08-20', 'aktif', '2026-08-03 07:27:58', '2026-08-03 07:27:58'),
(60, 73, 10, 3, '2026-07-20', '2026-08-20', 'aktif', '2026-08-03 07:28:32', '2026-08-03 07:28:32'),
(61, 74, 10, 3, '2026-07-27', '2026-08-27', 'aktif', '2026-08-03 07:29:03', '2026-08-03 07:29:03'),
(62, 75, 10, 3, '2026-07-21', '2026-08-21', 'aktif', '2026-08-03 07:29:36', '2026-08-03 07:29:36'),
(63, 76, 10, 3, '2026-07-20', '2026-08-20', 'aktif', '2026-08-03 07:30:08', '2026-08-03 07:30:08'),
(64, 77, 10, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 07:30:48', '2026-08-03 07:30:48'),
(65, 78, 10, 1, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 07:33:10', '2026-08-03 07:33:10'),
(66, 79, 10, 3, '2026-07-24', '2026-08-24', 'aktif', '2026-08-03 07:33:52', '2026-08-03 07:33:52'),
(67, 80, 11, 3, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 07:34:41', '2026-08-03 07:34:41'),
(69, 82, 11, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 07:35:39', '2026-08-03 07:35:39'),
(70, 83, 11, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 07:36:10', '2026-08-03 07:36:10'),
(71, 84, 11, 3, '2026-07-22', '2026-08-22', 'aktif', '2026-08-03 07:36:43', '2026-08-03 07:36:43'),
(72, 85, 11, 3, '2026-07-27', '2026-08-27', 'aktif', '2026-08-03 07:37:10', '2026-08-03 07:37:10'),
(73, 86, 11, 3, '2026-07-20', '2026-08-20', 'aktif', '2026-08-03 07:37:40', '2026-08-03 07:37:40'),
(74, 87, 11, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 07:38:10', '2026-08-03 07:38:10'),
(75, 88, 11, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 07:38:38', '2026-08-03 07:38:38'),
(76, 89, 12, 3, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 07:39:19', '2026-08-03 07:39:19'),
(77, 90, 12, 3, '2026-07-21', '2026-08-21', 'aktif', '2026-08-03 07:39:43', '2026-08-03 07:39:43'),
(78, 91, 12, 3, '2026-07-20', '2026-08-20', 'aktif', '2026-08-03 07:40:37', '2026-08-03 07:40:37'),
(79, 92, 12, 3, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 07:41:09', '2026-08-03 07:41:09'),
(80, 93, 12, 3, '2026-07-20', '2026-08-20', 'aktif', '2026-08-03 07:42:09', '2026-08-03 07:42:09'),
(81, 94, 12, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 07:43:05', '2026-08-03 07:43:05'),
(82, 95, 13, 1, '2026-07-15', '2026-08-15', 'aktif', '2026-08-03 07:44:16', '2026-08-03 07:44:16'),
(83, 96, 13, 1, '2026-07-15', '2026-08-15', 'aktif', '2026-08-03 07:44:52', '2026-08-03 07:44:52'),
(84, 97, 13, 1, '2026-07-15', '2026-08-15', 'aktif', '2026-08-03 07:45:19', '2026-08-03 07:45:19'),
(85, 98, 13, 1, '2026-07-15', '2026-08-15', 'aktif', '2026-08-03 07:45:51', '2026-08-03 07:45:51'),
(86, 99, 13, 1, '2026-07-21', '2026-08-21', 'aktif', '2026-08-03 07:46:21', '2026-08-03 07:46:21'),
(87, 100, 13, 1, '2026-07-22', '2026-08-22', 'aktif', '2026-08-03 07:47:04', '2026-08-03 07:47:04'),
(88, 101, 13, 2, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 07:47:41', '2026-08-03 07:47:41'),
(89, 102, 13, 2, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 07:48:14', '2026-08-03 07:48:14'),
(90, 103, 13, 2, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 07:48:59', '2026-08-03 07:48:59'),
(91, 104, 13, 2, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 07:49:25', '2026-08-03 07:49:25'),
(92, 105, 13, 2, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 07:49:55', '2026-08-03 07:49:55'),
(93, 106, 13, 2, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 07:50:33', '2026-08-03 07:50:33'),
(94, 107, 13, 4, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 07:53:16', '2026-08-03 07:53:16'),
(95, 108, 13, 4, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 07:53:57', '2026-08-03 07:53:57'),
(96, 109, 13, 4, '2026-07-14', '2026-08-14', 'aktif', '2026-08-03 07:54:45', '2026-08-03 07:54:45'),
(97, 110, 13, 4, '2026-07-21', '2026-08-21', 'aktif', '2026-08-03 07:55:12', '2026-08-03 07:55:12'),
(98, 111, 13, 4, '2026-07-21', '2026-08-21', 'aktif', '2026-08-03 07:55:40', '2026-08-03 07:55:40'),
(99, 112, 14, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 07:56:20', '2026-08-03 07:56:20'),
(100, 113, 14, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-03 07:56:49', '2026-08-03 07:56:49'),
(101, 114, 14, 3, '2026-07-21', '2026-08-21', 'aktif', '2026-08-03 07:57:18', '2026-08-03 07:57:18'),
(102, 115, 14, 3, '2026-07-15', '2026-08-15', 'aktif', '2026-08-03 07:57:50', '2026-08-03 07:57:50'),
(104, 117, 10, 3, '2026-08-03', '2026-09-03', 'aktif', '2026-08-03 08:13:07', '2026-08-03 08:13:07'),
(105, 118, 10, 3, '2026-08-03', '2026-09-03', 'aktif', '2026-08-03 08:13:44', '2026-08-03 08:13:44'),
(106, 119, 10, 3, '2026-08-03', '2026-09-03', 'aktif', '2026-08-03 08:14:38', '2026-08-03 08:14:38'),
(107, 120, 8, 3, '2026-08-03', '2026-09-03', 'aktif', '2026-08-03 08:15:18', '2026-08-03 08:15:18'),
(108, 121, 15, 3, '2026-08-03', '2026-09-03', 'aktif', '2026-08-03 08:16:13', '2026-08-03 08:16:13'),
(109, 122, 7, 3, '2026-08-03', '2026-09-03', 'aktif', '2026-08-03 08:17:05', '2026-08-03 08:17:05'),
(110, 123, 7, 3, '2026-08-03', '2026-09-03', 'aktif', '2026-08-03 08:17:29', '2026-08-03 08:17:29'),
(111, 124, 9, 3, '2026-08-03', '2026-09-03', 'aktif', '2026-08-03 08:19:00', '2026-08-03 08:19:00'),
(112, 125, 9, 3, '2026-08-03', '2026-09-03', 'aktif', '2026-08-03 08:19:28', '2026-08-03 08:19:28'),
(113, 126, 17, 3, '2026-08-03', '2026-09-03', 'aktif', '2026-08-03 08:26:42', '2026-08-03 08:26:42'),
(114, 127, 15, 3, '2026-08-04', '2026-09-04', 'aktif', '2026-08-04 23:46:41', '2026-08-04 23:46:41'),
(115, 128, 11, 3, '2026-07-13', '2026-08-13', 'aktif', '2026-08-04 23:48:29', '2026-08-04 23:48:29'),
(116, 129, 11, 3, '2026-08-04', '2026-09-04', 'aktif', '2026-08-05 00:47:11', '2026-08-05 00:47:11'),
(117, 130, 16, 3, '2026-08-05', '2026-09-05', 'aktif', '2026-08-09 06:44:27', '2026-08-09 06:44:27'),
(118, 131, 15, 3, '2026-08-06', '2026-09-06', 'aktif', '2026-08-09 06:47:21', '2026-08-09 06:47:21'),
(119, 132, 10, 3, '2026-08-10', '2026-09-10', 'aktif', '2026-08-09 16:23:00', '2026-08-09 16:23:00'),
(120, 133, 12, 3, '2026-08-10', '2026-09-10', 'aktif', '2026-08-10 23:45:31', '2026-08-10 23:45:31'),
(121, 134, 7, 3, '2026-08-10', '2026-09-10', 'aktif', '2026-08-10 23:46:06', '2026-08-10 23:46:06'),
(122, 135, 7, 3, '2026-08-10', '2026-09-10', 'aktif', '2026-08-10 23:46:36', '2026-08-10 23:46:36'),
(123, 136, 14, 3, '2026-08-10', '2026-09-10', 'aktif', '2026-08-10 23:47:45', '2026-08-10 23:47:45'),
(124, 137, 9, 3, '2026-08-11', '2026-09-11', 'aktif', '2026-08-11 00:11:37', '2026-08-11 00:11:37'),
(125, 138, 9, 3, '2026-08-11', '2026-09-11', 'aktif', '2026-08-12 00:57:38', '2026-08-12 00:57:38'),
(126, 139, 9, 3, '2026-08-12', '2026-09-12', 'aktif', '2026-08-12 00:59:27', '2026-08-12 00:59:27'),
(127, 140, 15, 3, '2026-08-12', '2026-09-12', 'aktif', '2026-08-12 01:00:23', '2026-08-12 01:00:23'),
(128, 141, 7, 3, '2026-08-12', '2026-09-12', 'aktif', '2026-08-12 01:10:58', '2026-08-12 01:10:58'),
(129, 142, 7, 3, '2026-08-12', '2026-09-12', 'aktif', '2026-08-12 02:20:21', '2026-08-12 02:20:21'),
(130, 143, 14, 3, '2026-07-24', '2026-08-24', 'aktif', '2026-08-18 22:54:17', '2026-08-18 22:54:17'),
(131, 26, 18, 3, '2026-07-22', '2026-08-22', 'aktif', '2026-08-19 04:18:43', '2026-08-19 04:18:43'),
(132, 28, 18, 3, '2026-07-22', '2026-08-22', 'aktif', '2026-08-19 04:18:55', '2026-08-19 04:18:55'),
(133, 47, 18, 3, '2026-08-22', '2026-09-22', 'aktif', '2026-08-19 04:19:05', '2026-08-19 04:19:05'),
(134, 20, 7, 3, '2026-07-17', '2026-08-17', 'aktif', '2026-08-20 01:39:25', '2026-08-20 01:39:25'),
(135, 144, 7, 3, '2026-08-20', '2026-09-20', 'aktif', '2026-08-20 01:40:44', '2026-08-20 01:40:44'),
(136, 145, 11, 3, '2026-08-24', '2026-09-24', 'aktif', '2026-08-26 00:53:07', '2026-08-26 00:53:07');

-- --------------------------------------------------------

--
-- Table structure for table `tagihans`
--

CREATE TABLE `tagihans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `siswa_id` bigint(20) UNSIGNED NOT NULL,
  `siswa_paket_id` bigint(20) UNSIGNED DEFAULT NULL,
  `jenis` enum('daftar','spp') NOT NULL,
  `jumlah` decimal(12,2) NOT NULL,
  `tenggat` date DEFAULT NULL,
  `status` enum('pending','lunas','kadaluarsa') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tagihans`
--

INSERT INTO `tagihans` (`id`, `siswa_id`, `siswa_paket_id`, `jenis`, `jumlah`, `tenggat`, `status`, `created_at`, `updated_at`) VALUES
(1, 12, NULL, 'spp', 200000.00, '2026-07-29', 'pending', '2026-07-28 17:45:44', '2026-07-28 17:45:44'),
(2, 13, 2, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 00:30:33', '2026-08-03 00:30:33'),
(5, 16, 5, 'spp', 200000.00, '2026-08-03', 'pending', '2026-08-03 00:34:40', '2026-08-03 00:34:40'),
(6, 17, 6, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 00:46:36', '2026-08-03 00:46:36'),
(8, 19, 8, 'spp', 200000.00, '2026-07-14', 'pending', '2026-08-03 06:37:38', '2026-08-03 06:37:38'),
(11, 22, 11, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 06:40:31', '2026-08-03 06:40:31'),
(12, 23, 12, 'spp', 200000.00, '2026-07-14', 'pending', '2026-08-03 06:41:17', '2026-08-03 06:41:17'),
(13, 24, 13, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 06:42:01', '2026-08-03 06:42:01'),
(14, 25, 14, 'spp', 200000.00, '2026-08-14', 'pending', '2026-08-03 06:43:49', '2026-08-03 06:43:49'),
(16, 27, 16, 'spp', 200000.00, '2026-08-20', 'pending', '2026-08-03 06:45:27', '2026-08-03 06:45:27'),
(18, 29, 18, 'spp', 200000.00, '2026-07-27', 'pending', '2026-08-03 06:46:48', '2026-08-03 06:46:48'),
(19, 30, 19, 'spp', 100000.00, '2026-07-13', 'pending', '2026-08-03 06:47:29', '2026-08-03 06:47:29'),
(20, 31, 20, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 06:48:51', '2026-08-03 06:48:51'),
(21, 32, 21, 'spp', 100000.00, '2026-08-13', 'pending', '2026-08-03 06:50:45', '2026-08-03 06:50:45'),
(22, 33, 22, 'spp', 200000.00, '2026-07-22', 'pending', '2026-08-03 06:51:48', '2026-08-03 06:51:48'),
(23, 34, 23, 'spp', 200000.00, '2026-07-14', 'pending', '2026-08-03 06:52:53', '2026-08-03 06:52:53'),
(24, 35, 24, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 06:53:48', '2026-08-03 06:53:48'),
(25, 36, 25, 'spp', 200000.00, '2026-07-14', 'pending', '2026-08-03 06:54:20', '2026-08-03 06:54:20'),
(26, 37, 26, 'spp', 200000.00, '2026-07-14', 'pending', '2026-08-03 06:55:03', '2026-08-03 06:55:03'),
(27, 38, 27, 'spp', 200000.00, '2026-07-14', 'pending', '2026-08-03 06:55:39', '2026-08-03 06:55:39'),
(31, 42, 31, 'spp', 100000.00, '2026-07-15', 'pending', '2026-08-03 06:58:50', '2026-08-03 06:58:50'),
(33, 44, 33, 'spp', 200000.00, '2026-07-20', 'pending', '2026-08-03 07:00:13', '2026-08-03 07:00:13'),
(34, 45, 34, 'spp', 200000.00, '2026-07-21', 'pending', '2026-08-03 07:00:54', '2026-08-03 07:00:54'),
(35, 46, 35, 'spp', 100000.00, '2026-07-13', 'pending', '2026-08-03 07:01:38', '2026-08-03 07:01:38'),
(38, 51, 38, 'spp', 200000.00, '2026-07-20', 'pending', '2026-08-03 07:09:49', '2026-08-03 07:09:49'),
(39, 52, 39, 'spp', 200000.00, '2026-07-22', 'pending', '2026-08-03 07:10:45', '2026-08-03 07:10:45'),
(40, 53, 40, 'spp', 200000.00, '2026-07-20', 'pending', '2026-08-03 07:11:43', '2026-08-03 07:11:43'),
(41, 54, 41, 'spp', 200000.00, '2026-07-22', 'pending', '2026-08-03 07:12:33', '2026-08-03 07:12:33'),
(42, 55, 42, 'spp', 200000.00, '2026-07-27', 'pending', '2026-08-03 07:14:55', '2026-08-03 07:14:55'),
(43, 56, 43, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 07:16:33', '2026-08-03 07:16:33'),
(44, 57, 44, 'spp', 200000.00, '2026-07-14', 'pending', '2026-08-03 07:17:05', '2026-08-03 07:17:05'),
(45, 58, 45, 'spp', 200000.00, '2026-07-14', 'pending', '2026-08-03 07:17:44', '2026-08-03 07:17:44'),
(46, 59, 46, 'spp', 200000.00, '2026-07-21', 'pending', '2026-08-03 07:18:26', '2026-08-03 07:18:26'),
(47, 60, 47, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 07:19:03', '2026-08-03 07:19:03'),
(48, 61, 48, 'spp', 200000.00, '2026-07-22', 'pending', '2026-08-03 07:19:36', '2026-08-03 07:19:36'),
(49, 62, 49, 'spp', 200000.00, '2026-07-21', 'pending', '2026-08-03 07:20:11', '2026-08-03 07:20:11'),
(50, 63, 50, 'spp', 200000.00, '2026-07-20', 'pending', '2026-08-03 07:20:39', '2026-08-03 07:20:39'),
(54, 67, 54, 'spp', 200000.00, '2026-07-15', 'pending', '2026-08-03 07:24:18', '2026-08-03 07:24:18'),
(55, 68, 55, 'spp', 200000.00, '2026-07-14', 'pending', '2026-08-03 07:24:48', '2026-08-03 07:24:48'),
(56, 69, 56, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 07:25:27', '2026-08-03 07:25:27'),
(57, 70, 57, 'spp', 200000.00, '2026-07-20', 'pending', '2026-08-03 07:26:55', '2026-08-03 07:26:55'),
(58, 71, 58, 'spp', 200000.00, '2026-07-20', 'pending', '2026-08-03 07:27:22', '2026-08-03 07:27:22'),
(59, 72, 59, 'spp', 200000.00, '2026-07-20', 'pending', '2026-08-03 07:27:58', '2026-08-03 07:27:58'),
(60, 73, 60, 'spp', 200000.00, '2026-07-20', 'pending', '2026-08-03 07:28:32', '2026-08-03 07:28:32'),
(61, 74, 61, 'spp', 200000.00, '2026-07-27', 'pending', '2026-08-03 07:29:03', '2026-08-03 07:29:03'),
(62, 75, 62, 'spp', 200000.00, '2026-07-21', 'pending', '2026-08-03 07:29:36', '2026-08-03 07:29:36'),
(63, 76, 63, 'spp', 200000.00, '2026-07-20', 'pending', '2026-08-03 07:30:08', '2026-08-03 07:30:08'),
(64, 77, 64, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 07:30:48', '2026-08-03 07:30:48'),
(65, 78, 65, 'spp', 100000.00, '2026-07-13', 'pending', '2026-08-03 07:33:10', '2026-08-03 07:33:10'),
(66, 79, 66, 'spp', 200000.00, '2026-07-24', 'pending', '2026-08-03 07:33:52', '2026-08-03 07:33:52'),
(67, 80, 67, 'spp', 200000.00, '2026-07-14', 'pending', '2026-08-03 07:34:41', '2026-08-03 07:34:41'),
(69, 82, 69, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 07:35:39', '2026-08-03 07:35:39'),
(70, 83, 70, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 07:36:10', '2026-08-03 07:36:10'),
(71, 84, 71, 'spp', 200000.00, '2026-07-22', 'pending', '2026-08-03 07:36:43', '2026-08-03 07:36:43'),
(72, 85, 72, 'spp', 200000.00, '2026-07-27', 'pending', '2026-08-03 07:37:10', '2026-08-03 07:37:10'),
(73, 86, 73, 'spp', 200000.00, '2026-07-20', 'pending', '2026-08-03 07:37:40', '2026-08-03 07:37:40'),
(74, 87, 74, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 07:38:10', '2026-08-03 07:38:10'),
(75, 88, 75, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 07:38:38', '2026-08-03 07:38:38'),
(76, 89, 76, 'spp', 200000.00, '2026-07-14', 'pending', '2026-08-03 07:39:19', '2026-08-03 07:39:19'),
(77, 90, 77, 'spp', 200000.00, '2026-07-21', 'pending', '2026-08-03 07:39:43', '2026-08-03 07:39:43'),
(78, 91, 78, 'spp', 200000.00, '2026-07-20', 'pending', '2026-08-03 07:40:37', '2026-08-03 07:40:37'),
(79, 92, 79, 'spp', 200000.00, '2026-07-14', 'pending', '2026-08-03 07:41:09', '2026-08-03 07:41:09'),
(80, 93, 80, 'spp', 200000.00, '2026-07-20', 'pending', '2026-08-03 07:42:09', '2026-08-03 07:42:09'),
(81, 94, 81, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 07:43:05', '2026-08-03 07:43:05'),
(82, 95, 82, 'spp', 250000.00, '2026-07-15', 'pending', '2026-08-03 07:44:16', '2026-08-03 07:44:16'),
(83, 96, 83, 'spp', 250000.00, '2026-07-15', 'pending', '2026-08-03 07:44:52', '2026-08-03 07:44:52'),
(84, 97, 84, 'spp', 250000.00, '2026-07-15', 'pending', '2026-08-03 07:45:19', '2026-08-03 07:45:19'),
(85, 98, 85, 'spp', 250000.00, '2026-07-15', 'pending', '2026-08-03 07:45:51', '2026-08-03 07:45:51'),
(86, 99, 86, 'spp', 250000.00, '2026-07-21', 'pending', '2026-08-03 07:46:21', '2026-08-03 07:46:21'),
(87, 100, 87, 'spp', 250000.00, '2026-07-22', 'pending', '2026-08-03 07:47:04', '2026-08-03 07:47:04'),
(88, 101, 88, 'spp', 300000.00, '2026-07-14', 'pending', '2026-08-03 07:47:41', '2026-08-03 07:47:41'),
(89, 102, 89, 'spp', 300000.00, '2026-07-14', 'pending', '2026-08-03 07:48:14', '2026-08-03 07:48:14'),
(90, 103, 90, 'spp', 300000.00, '2026-07-14', 'pending', '2026-08-03 07:48:59', '2026-08-03 07:48:59'),
(91, 104, 91, 'spp', 300000.00, '2026-07-14', 'pending', '2026-08-03 07:49:25', '2026-08-03 07:49:25'),
(92, 105, 92, 'spp', 300000.00, '2026-07-14', 'pending', '2026-08-03 07:49:55', '2026-08-03 07:49:55'),
(93, 106, 93, 'spp', 300000.00, '2026-07-14', 'pending', '2026-08-03 07:50:33', '2026-08-03 07:50:33'),
(94, 107, 94, 'spp', 300000.00, '2026-07-14', 'pending', '2026-08-03 07:53:16', '2026-08-03 07:53:16'),
(95, 108, 95, 'spp', 300000.00, '2026-07-14', 'pending', '2026-08-03 07:53:57', '2026-08-03 07:53:57'),
(96, 109, 96, 'spp', 300000.00, '2026-07-14', 'pending', '2026-08-03 07:54:45', '2026-08-03 07:54:45'),
(97, 110, 97, 'spp', 300000.00, '2026-07-21', 'pending', '2026-08-03 07:55:12', '2026-08-03 07:55:12'),
(98, 111, 98, 'spp', 300000.00, '2026-07-21', 'pending', '2026-08-03 07:55:40', '2026-08-03 07:55:40'),
(99, 112, 99, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-03 07:56:20', '2026-08-03 07:56:20'),
(100, 113, 100, 'spp', 200000.00, '2026-08-10', 'lunas', '2026-08-03 07:56:49', '2026-08-18 20:13:14'),
(101, 114, 101, 'spp', 200000.00, '2026-07-21', 'pending', '2026-08-03 07:57:18', '2026-08-03 07:57:18'),
(102, 115, 102, 'spp', 200000.00, '2026-07-15', 'pending', '2026-08-03 07:57:50', '2026-08-03 07:57:50'),
(104, 117, 104, 'spp', 200000.00, '2026-08-03', 'pending', '2026-08-03 08:13:07', '2026-08-03 08:13:07'),
(105, 118, 105, 'spp', 200000.00, '2026-08-03', 'pending', '2026-08-03 08:13:44', '2026-08-03 08:13:44'),
(106, 119, 106, 'spp', 200000.00, '2026-08-03', 'pending', '2026-08-03 08:14:38', '2026-08-03 08:14:38'),
(107, 120, 107, 'spp', 200000.00, '2026-08-03', 'pending', '2026-08-03 08:15:18', '2026-08-03 08:15:18'),
(108, 121, 108, 'spp', 200000.00, '2026-08-03', 'pending', '2026-08-03 08:16:13', '2026-08-03 08:16:13'),
(109, 122, 109, 'spp', 200000.00, '2026-08-03', 'pending', '2026-08-03 08:17:05', '2026-08-03 08:17:05'),
(110, 123, 110, 'spp', 200000.00, '2026-08-03', 'pending', '2026-08-03 08:17:29', '2026-08-03 08:17:29'),
(111, 124, 111, 'spp', 200000.00, '2026-08-03', 'pending', '2026-08-03 08:19:00', '2026-08-03 08:19:00'),
(112, 125, 112, 'spp', 200000.00, '2026-08-03', 'pending', '2026-08-03 08:19:28', '2026-08-03 08:19:28'),
(113, 126, 113, 'spp', 250000.00, '2026-08-03', 'pending', '2026-08-03 08:26:42', '2026-08-03 08:26:42'),
(114, 127, 114, 'spp', 200000.00, '2026-08-04', 'pending', '2026-08-04 23:46:41', '2026-08-04 23:46:41'),
(115, 128, 115, 'spp', 200000.00, '2026-07-13', 'pending', '2026-08-04 23:48:29', '2026-08-04 23:48:29'),
(116, 129, 116, 'spp', 200000.00, '2026-08-04', 'pending', '2026-08-05 00:47:11', '2026-08-05 00:47:11'),
(117, 130, 117, 'spp', 200000.00, '2026-08-05', 'pending', '2026-08-09 06:44:27', '2026-08-09 06:44:27'),
(118, 131, 118, 'spp', 200000.00, '2026-08-06', 'pending', '2026-08-09 06:47:21', '2026-08-09 06:47:21'),
(119, 132, 119, 'spp', 200000.00, '2026-08-10', 'pending', '2026-08-09 16:23:00', '2026-08-09 16:23:00'),
(120, 133, 120, 'spp', 200000.00, '2026-08-10', 'pending', '2026-08-10 23:45:31', '2026-08-10 23:45:31'),
(121, 134, 121, 'spp', 200000.00, '2026-08-10', 'pending', '2026-08-10 23:46:06', '2026-08-10 23:46:06'),
(122, 135, 122, 'spp', 200000.00, '2026-08-10', 'pending', '2026-08-10 23:46:36', '2026-08-10 23:46:36'),
(123, 136, 123, 'spp', 200000.00, '2026-08-10', 'pending', '2026-08-10 23:47:45', '2026-08-10 23:47:45'),
(124, 137, 124, 'spp', 200000.00, '2026-08-11', 'pending', '2026-08-11 00:11:37', '2026-08-11 00:11:37'),
(125, 138, 125, 'spp', 200000.00, '2026-08-11', 'pending', '2026-08-12 00:57:38', '2026-08-12 00:57:38'),
(126, 139, 126, 'spp', 200000.00, '2026-08-12', 'pending', '2026-08-12 00:59:27', '2026-08-12 00:59:27'),
(127, 140, 127, 'spp', 200000.00, '2026-08-12', 'pending', '2026-08-12 01:00:23', '2026-08-12 01:00:23'),
(128, 141, 128, 'spp', 200000.00, '2026-08-12', 'pending', '2026-08-12 01:10:58', '2026-08-12 01:10:58'),
(129, 142, 129, 'spp', 200000.00, '2026-08-12', 'pending', '2026-08-12 02:20:21', '2026-08-12 02:20:21'),
(130, 143, 130, 'spp', 200000.00, '2026-07-24', 'pending', '2026-08-18 22:54:17', '2026-08-18 22:54:17'),
(131, 26, 131, 'spp', 200000.00, '2026-07-22', 'pending', '2026-08-19 04:18:43', '2026-08-19 04:18:43'),
(132, 28, 132, 'spp', 200000.00, '2026-07-22', 'pending', '2026-08-19 04:18:55', '2026-08-19 04:18:55'),
(133, 47, 133, 'spp', 200000.00, '2026-08-22', 'pending', '2026-08-19 04:19:05', '2026-08-19 04:19:05'),
(134, 20, 134, 'spp', 200000.00, '2026-07-17', 'pending', '2026-08-20 01:39:25', '2026-08-20 01:39:25'),
(135, 144, 135, 'spp', 200000.00, '2026-08-20', 'pending', '2026-08-20 01:40:44', '2026-08-20 01:40:44'),
(136, 145, 136, 'spp', 200000.00, '2026-08-24', 'pending', '2026-08-26 00:53:07', '2026-08-26 00:53:07');

-- --------------------------------------------------------

--
-- Table structure for table `tingkats`
--

CREATE TABLE `tingkats` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `jenjang_id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `urutan` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tingkats`
--

INSERT INTO `tingkats` (`id`, `jenjang_id`, `nama`, `urutan`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'Tingkat 1', 1, 1, '2026-07-29 05:02:02', '2026-07-29 05:02:02'),
(2, 1, 'Tingkat 2', 2, 1, '2026-07-29 05:02:02', '2026-07-29 05:02:02'),
(3, 1, 'Tingkat 3', 3, 1, '2026-07-29 05:02:02', '2026-07-29 05:02:02'),
(4, 1, 'Tingkat 4', 4, 1, '2026-07-29 05:02:02', '2026-07-29 05:02:02'),
(5, 1, 'Tingkat 5', 5, 1, '2026-07-29 05:02:02', '2026-07-29 05:02:02'),
(6, 1, 'Tingkat 6', 6, 1, '2026-07-29 05:02:02', '2026-07-29 05:02:02'),
(7, 2, 'Tingkat 7', 7, 1, '2026-07-29 05:02:02', '2026-07-29 05:02:02'),
(8, 2, 'Tingkat 8', 8, 1, '2026-07-29 05:02:02', '2026-07-29 05:02:02'),
(9, 2, 'Tingkat 9', 9, 1, '2026-07-29 05:02:02', '2026-07-29 05:02:02'),
(10, 3, 'Tingkat 10', 10, 1, '2026-07-29 05:02:02', '2026-07-29 05:02:02'),
(11, 3, 'Tingkat 11', 11, 1, '2026-07-29 05:02:02', '2026-07-29 05:02:02'),
(12, 3, 'Tingkat 12', 12, 1, '2026-07-29 05:02:02', '2026-07-29 05:02:02'),
(13, 4, 'Tingkat A', 1, 1, '2026-08-03 00:24:39', '2026-08-03 00:24:39'),
(14, 4, 'Tingkat B', 2, 1, '2026-08-03 00:24:48', '2026-08-03 00:24:48');

-- --------------------------------------------------------

--
-- Table structure for table `tutors`
--

CREATE TABLE `tutors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `nip` varchar(20) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `no_telp` varchar(20) DEFAULT NULL,
  `bidang_ajar` varchar(255) NOT NULL,
  `pendidikan_terakhir` varchar(100) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tutors`
--

INSERT INTO `tutors` (`id`, `user_id`, `nip`, `nama`, `email`, `no_telp`, `bidang_ajar`, `pendidikan_terakhir`, `foto`, `is_active`, `created_at`, `updated_at`) VALUES
(6, 4, '20260001', 'NOVRIKA HASIBUAN', 'hasibuannovrika21@gmail.com', '082166598828', 'PRIVATE', 'S1', NULL, 1, '2026-08-03 00:08:23', '2026-08-03 00:08:23'),
(7, 5, '20260002', 'CITRA MEILINDA HASIBUAN', 'hasibuancitramelinda@gmail.com', '081312374737', 'MATH & ENGLISH', 'S1', NULL, 1, '2026-08-03 00:10:19', '2026-08-03 00:10:19'),
(8, 6, '20260003', 'RIA PURNAMA SARI', 'riakucingan@gmail.com', '085359384680', 'TK & ENGLISH', 'SMA', NULL, 1, '2026-08-03 00:13:46', '2026-08-03 00:13:46'),
(9, 7, '20260004', 'CHRISTINA TAMPUBOLON', 'christinatampubolon06@gmail.com', '081945577973', 'MATH & ENG', 'SMA', NULL, 1, '2026-08-03 08:03:22', '2026-08-03 08:03:22'),
(10, 8, '20260005', 'SENTINA SINAGA', 'sentinasinaga2392@gmail.com', '081275747205', 'MATH & ENG', 'S1', NULL, 1, '2026-08-03 08:05:01', '2026-08-03 08:05:01');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `no_telp` varchar(20) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `email_verified_at`, `password`, `no_telp`, `foto`, `is_active`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin Kasilmu', 'admin@kasilmu.com', 'admin', NULL, '$2y$12$LH21N3R70Gf40V55RhujeeArUfMx1yRcX7NMbNBO04fmvDWhsIkpu', '081234567890', NULL, 1, NULL, '2026-07-27 09:34:38', '2026-07-27 09:34:38'),
(3, 'Siswa Demo', 'siswa@kasilmu.com', 'siswa', NULL, '$2y$12$fJ4jC8Cay24YQzSBgGOjiur7hEs5Dvuq3qyEC1gPNiHx4Vp0634Ea', '081234567892', NULL, 1, NULL, '2026-07-27 09:34:39', '2026-07-27 09:34:39'),
(4, 'NOVRIKA HASIBUAN', 'hasibuannovrika21@gmail.com', 'NOVRIKA', NULL, '$2y$12$lYOtxlQh/CAZUptJ2T5Lmugye3uvrPxd1SXeluQB1fQFb0MkbomGm', '082166598828', NULL, 1, NULL, '2026-08-03 00:08:23', '2026-08-03 00:08:23'),
(5, 'CITRA MEILINDA HASIBUAN', 'hasibuancitramelinda@gmail.com', 'CITRA', NULL, '$2y$12$FL4TWCudxtKTKy5oBndej.lIfwxV91iyCRo8BHTci/0TxSCiecdp.', '081312374737', NULL, 1, NULL, '2026-08-03 00:10:19', '2026-08-03 00:10:19'),
(6, 'RIA PURNAMA SARI', 'riakucingan@gmail.com', 'RIA', NULL, '$2y$12$LPgiYapQOKUsr8JRBpwIVubTs1JIZ4tbcgk6vo3zqmpPFspSFnGbm', '085359384680', NULL, 1, NULL, '2026-08-03 00:13:46', '2026-08-03 00:13:46'),
(7, 'CHRISTINA TAMPUBOLON', 'christinatampubolon06@gmail.com', 'CHRISTINA', NULL, '$2y$12$4v5m1U0h9QvMKmBprZ.o8uti7eLa2BLQWjrvDBhVBfYqMrK6YJ6qy', '081945577973', NULL, 1, NULL, '2026-08-03 08:03:22', '2026-08-03 08:03:22'),
(8, 'SENTINA SINAGA', 'sentinasinaga2392@gmail.com', 'SENTINA', NULL, '$2y$12$WHFBMhP.qlXoRxFfXsYdq.9oCWNY6/PEXjRrGB/oROTFAy9TSbDt2', '081275747205', NULL, 1, NULL, '2026-08-03 08:05:01', '2026-08-03 08:05:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  ADD KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`);

--
-- Indexes for table `harga_pakets`
--
ALTER TABLE `harga_pakets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `harga_pakets_kelas_id_paket_id_unique` (`kelas_id`,`paket_id`),
  ADD KEY `harga_pakets_paket_id_foreign` (`paket_id`);

--
-- Indexes for table `jenjangs`
--
ALTER TABLE `jenjangs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `jenjangs_kode_unique` (`kode`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kelas_siswa`
--
ALTER TABLE `kelas_siswa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kelas_siswa_kelas_id_siswa_id_unique` (`kelas_id`,`siswa_id`),
  ADD KEY `kelas_siswa_siswa_id_foreign` (`siswa_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `nilais`
--
ALTER TABLE `nilais`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nilais_siswa_id_foreign` (`siswa_id`),
  ADD KEY `nilais_kelas_id_foreign` (`kelas_id`);

--
-- Indexes for table `pakets`
--
ALTER TABLE `pakets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `pembayarans`
--
ALTER TABLE `pembayarans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pembayarans_tagihan_id_foreign` (`tagihan_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `pertemuans`
--
ALTER TABLE `pertemuans`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pertemuans_kelas_id_pertemuan_ke_unique` (`kelas_id`,`pertemuan_ke`),
  ADD KEY `pertemuans_tutor_id_foreign` (`tutor_id`);

--
-- Indexes for table `presensis`
--
ALTER TABLE `presensis`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `presensis_pertemuan_id_siswa_id_unique` (`pertemuan_id`,`siswa_id`),
  ADD KEY `presensis_siswa_id_foreign` (`siswa_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sekolahs`
--
ALTER TABLE `sekolahs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sekolahs_nama_unique` (`nama`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `siswas`
--
ALTER TABLE `siswas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `siswas_nis_unique` (`nis`),
  ADD KEY `siswas_sekolah_id_foreign` (`sekolah_id`),
  ADD KEY `siswas_tingkat_id_foreign` (`tingkat_id`);

--
-- Indexes for table `siswa_pakets`
--
ALTER TABLE `siswa_pakets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `siswa_pakets_siswa_id_kelas_id_tgl_mulai_unique` (`siswa_id`,`kelas_id`,`tgl_mulai`),
  ADD KEY `siswa_pakets_kelas_id_foreign` (`kelas_id`),
  ADD KEY `siswa_pakets_paket_id_foreign` (`paket_id`);

--
-- Indexes for table `tagihans`
--
ALTER TABLE `tagihans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tagihans_siswa_id_foreign` (`siswa_id`),
  ADD KEY `tagihans_siswa_paket_id_foreign` (`siswa_paket_id`);

--
-- Indexes for table `tingkats`
--
ALTER TABLE `tingkats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tingkats_jenjang_id_nama_unique` (`jenjang_id`,`nama`),
  ADD UNIQUE KEY `tingkats_jenjang_id_urutan_unique` (`jenjang_id`,`urutan`);

--
-- Indexes for table `tutors`
--
ALTER TABLE `tutors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tutors_nip_unique` (`nip`),
  ADD UNIQUE KEY `tutors_user_id_unique` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_username_unique` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `harga_pakets`
--
ALTER TABLE `harga_pakets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `jenjangs`
--
ALTER TABLE `jenjangs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `kelas_siswa`
--
ALTER TABLE `kelas_siswa`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `nilais`
--
ALTER TABLE `nilais`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pakets`
--
ALTER TABLE `pakets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pembayarans`
--
ALTER TABLE `pembayarans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `pertemuans`
--
ALTER TABLE `pertemuans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT for table `presensis`
--
ALTER TABLE `presensis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1832;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sekolahs`
--
ALTER TABLE `sekolahs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `siswas`
--
ALTER TABLE `siswas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT for table `siswa_pakets`
--
ALTER TABLE `siswa_pakets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `tagihans`
--
ALTER TABLE `tagihans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `tingkats`
--
ALTER TABLE `tingkats`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tutors`
--
ALTER TABLE `tutors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `harga_pakets`
--
ALTER TABLE `harga_pakets`
  ADD CONSTRAINT `harga_pakets_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `harga_pakets_paket_id_foreign` FOREIGN KEY (`paket_id`) REFERENCES `pakets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `kelas_siswa`
--
ALTER TABLE `kelas_siswa`
  ADD CONSTRAINT `kelas_siswa_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `kelas_siswa_siswa_id_foreign` FOREIGN KEY (`siswa_id`) REFERENCES `siswas` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `nilais`
--
ALTER TABLE `nilais`
  ADD CONSTRAINT `nilais_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `nilais_siswa_id_foreign` FOREIGN KEY (`siswa_id`) REFERENCES `siswas` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pembayarans`
--
ALTER TABLE `pembayarans`
  ADD CONSTRAINT `pembayarans_tagihan_id_foreign` FOREIGN KEY (`tagihan_id`) REFERENCES `tagihans` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pertemuans`
--
ALTER TABLE `pertemuans`
  ADD CONSTRAINT `pertemuans_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pertemuans_tutor_id_foreign` FOREIGN KEY (`tutor_id`) REFERENCES `tutors` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `presensis`
--
ALTER TABLE `presensis`
  ADD CONSTRAINT `presensis_pertemuan_id_foreign` FOREIGN KEY (`pertemuan_id`) REFERENCES `pertemuans` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `presensis_siswa_id_foreign` FOREIGN KEY (`siswa_id`) REFERENCES `siswas` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `siswas`
--
ALTER TABLE `siswas`
  ADD CONSTRAINT `siswas_sekolah_id_foreign` FOREIGN KEY (`sekolah_id`) REFERENCES `sekolahs` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `siswas_tingkat_id_foreign` FOREIGN KEY (`tingkat_id`) REFERENCES `tingkats` (`id`);

--
-- Constraints for table `siswa_pakets`
--
ALTER TABLE `siswa_pakets`
  ADD CONSTRAINT `siswa_pakets_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `siswa_pakets_paket_id_foreign` FOREIGN KEY (`paket_id`) REFERENCES `pakets` (`id`),
  ADD CONSTRAINT `siswa_pakets_siswa_id_foreign` FOREIGN KEY (`siswa_id`) REFERENCES `siswas` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tagihans`
--
ALTER TABLE `tagihans`
  ADD CONSTRAINT `tagihans_siswa_id_foreign` FOREIGN KEY (`siswa_id`) REFERENCES `siswas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tagihans_siswa_paket_id_foreign` FOREIGN KEY (`siswa_paket_id`) REFERENCES `siswa_pakets` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `tingkats`
--
ALTER TABLE `tingkats`
  ADD CONSTRAINT `tingkats_jenjang_id_foreign` FOREIGN KEY (`jenjang_id`) REFERENCES `jenjangs` (`id`);

--
-- Constraints for table `tutors`
--
ALTER TABLE `tutors`
  ADD CONSTRAINT `tutors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
