<?php

namespace Database\Seeders;

use App\Models\Sekolah;
use App\Models\Siswa;
use Illuminate\Database\Seeder;

class SiswaSeeder extends Seeder
{
    public function run(): void
    {
        $siswas = [
            ['nis' => 'S001', 'nama' => 'Andi Pratama',     'email' => 'andi@gmail.com',    'no_telp' => '0822222221', 'tgl_lahir' => '2010-05-15', 'alamat' => 'Jl. Merdeka No.1',     'sekolah' => 'SDN 01',   'kelas_asal' => '6A', 'tingkat' => 6,  'jenjang' => 'SD',  'nama_ortu' => 'Pak Andi',    'no_telp_ortu' => '0822222220', 'status' => 'aktif'],
            ['nis' => 'S002', 'nama' => 'Bella Anggraini',  'email' => 'bella@gmail.com',   'no_telp' => '0822222223', 'tgl_lahir' => '2011-08-20', 'alamat' => 'Jl. Sudirman No.2',    'sekolah' => 'SDN 02',   'kelas_asal' => '5B', 'tingkat' => 5,  'jenjang' => 'SD',  'nama_ortu' => 'Bu Bella',   'no_telp_ortu' => '0822222222', 'status' => 'aktif'],
            ['nis' => 'S003', 'nama' => 'Citra Dewi',       'email' => 'citra@gmail.com',   'no_telp' => '0822222225', 'tgl_lahir' => '2008-03-10', 'alamat' => 'Jl. Diponegoro No.3',  'sekolah' => 'SMPN 04',  'kelas_asal' => '8A', 'tingkat' => 8,  'jenjang' => 'SMP', 'nama_ortu' => 'Pak Citra',   'no_telp_ortu' => '0822222224', 'status' => 'aktif'],
            ['nis' => 'S004', 'nama' => 'Deni Saputra',     'email' => 'deni@gmail.com',    'no_telp' => '0822222227', 'tgl_lahir' => '2007-11-25', 'alamat' => 'Jl. Ahmad Yani No.4',   'sekolah' => 'SMPN 07',  'kelas_asal' => '9C', 'tingkat' => 9,  'jenjang' => 'SMP', 'nama_ortu' => 'Pak Deni',    'no_telp_ortu' => '0822222226', 'status' => 'aktif'],
            ['nis' => 'S005', 'nama' => 'Eka Fitriani',     'email' => 'eka@gmail.com',     'no_telp' => '0822222229', 'tgl_lahir' => '2006-01-30', 'alamat' => 'Jl. Gatot Subroto No.5', 'sekolah' => 'SMAN 03',  'kelas_asal' => '11 IPA', 'tingkat' => 11, 'jenjang' => 'SMA', 'nama_ortu' => 'Bu Eka',     'no_telp_ortu' => '0822222228', 'status' => 'aktif'],
            ['nis' => 'S006', 'nama' => 'Fajar Hidayat',    'email' => 'fajar@gmail.com',   'no_telp' => '0822222231', 'tgl_lahir' => '2006-07-14', 'alamat' => 'Jl. Pahlawan No.6',    'sekolah' => 'SMAN 05',  'kelas_asal' => '12 IPS', 'tingkat' => 12, 'jenjang' => 'SMA', 'nama_ortu' => 'Pak Fajar',   'no_telp_ortu' => '0822222230', 'status' => 'aktif'],
            ['nis' => 'S007', 'nama' => 'Gita Permata',     'email' => 'gita@gmail.com',    'no_telp' => '0822222233', 'tgl_lahir' => '2012-02-18', 'alamat' => 'Jl. Veteran No.7',     'sekolah' => 'SDN 05',   'kelas_asal' => '4A', 'tingkat' => 4,  'jenjang' => 'SD',  'nama_ortu' => 'Bu Gita',    'no_telp_ortu' => '0822222232', 'status' => 'aktif'],
            ['nis' => 'S008', 'nama' => 'Hari Setiawan',    'email' => 'hari@gmail.com',    'no_telp' => '0822222235', 'tgl_lahir' => '2009-09-05', 'alamat' => 'Jl. Suropati No.8',    'sekolah' => 'SMPN 02',  'kelas_asal' => '7B', 'tingkat' => 7,  'jenjang' => 'SMP', 'nama_ortu' => 'Pak Hari',    'no_telp_ortu' => '0822222234', 'status' => 'aktif'],
            ['nis' => 'S009', 'nama' => 'Intan Permatasari', 'email' => 'intan@gmail.com',  'no_telp' => '0822222237', 'tgl_lahir' => '2010-12-01', 'alamat' => 'Jl. Pemuda No.9',      'sekolah' => 'SDN 07',   'kelas_asal' => '6B', 'tingkat' => 6,  'jenjang' => 'SD',  'nama_ortu' => 'Bu Intan',   'no_telp_ortu' => '0822222236', 'status' => 'nonaktif'],
            ['nis' => 'S010', 'nama' => 'Joko Widodo',      'email' => 'joko@gmail.com',    'no_telp' => '0822222239', 'tgl_lahir' => '2005-06-22', 'alamat' => 'Jl. Mawar No.10',      'sekolah' => 'SMAN 01',  'kelas_asal' => '12 IPA', 'tingkat' => 12, 'jenjang' => 'SMA', 'nama_ortu' => 'Pak Joko',    'no_telp_ortu' => '0822222238', 'status' => 'lulus'],
        ];

        foreach ($siswas as $siswa) {
            $siswa['sekolah_id'] = Sekolah::firstOrCreate(['nama' => $siswa['sekolah']])->id;
            unset($siswa['sekolah']);

            Siswa::create($siswa);
        }
    }
}
