SELAMAT PAGI BAPAK / IBU, SELAMAT DATANG DI PROJECT EMPLOYEE MANAGEMENT. TERIMA KASIH SUDAH MELUANGKAN WAKTU UNTUK MEREVIEW PROJECT SAYA.

Berikut beberapa catatan dan bantuan penggunaan aplikasi yang sudah saya rangkum untuk pengujian dan penggunaan aplikasi employee management.


================== CARA MENJALANKAN PROJECT ==================
1. clone project dari https://github.com/Bennismrt/Employee-Management.git
2. Install Node Versi 16 "nvm install 16", Kemudian "nvm use 16" => SKIP jika sudah terinstall di komputer
3. Npm install Angular cli "npm install -g @angular/cli@14" => SKIP jika sudah terinstall di komputer
4. ketik di terminal "cd Employee-Management"
6. ketik di terminal "npm install"
6. kemudian ketik di terminal "npm run start"
7. buka di browser "http://localhost:4200/" sebagai default path;

==================  LOGIN -->
1. Flow login yang saya buat sudah sesuai dengan flow login pada umumnya. Sebelum hit button login, Angular memverifikasi apakah email sudah sesuai dengan pattern yang ditentukan dan password sudah melebihi 6 angka dan harus ada angka. kemudian setelah cocok hit button login maka akan dicheck ke data local apakah ada email dan password (yang sudah di HASH) di data local. kalau tidak maka akan muncul alert peringatan kalau email atau password salah. Jika bapak/ibu belum punya akun, bisa menggunakan akun yang sudah ada seperti :

EMAIL: benni@sample.com
PASS: admin123

EMAIL: admin@sample.com
PASS: admin123

catatan tambahan, email dan password bersifat sensitive case, jadi pastikan bapak/ibu login menggunakan email dan password yang benar


==================  REGISTER ================== 
Flow Register Pada Employee Management meliputi username (required), email (required), password (reqired), dan confirmation password (required + validasi matching).

Ketika bapak/ibu melakukan registrasi, pertama tama angular akan mengecheck apakah semua sudah required atau belum kemudian juga melakukan pengechekan apakah password dan confirmation password sama. Setelah semua dipenuhi maka button register di hit, hal pertama yang di check ke data local adalah apakah ada username yang sama atau tidak, kemudian di check apakah ada email yang sama atau tidak. Jika masih ada kesamaan di data local maka akan ada alert sesuai dengan error data yang sama. Jika semua sudah lolos, maka register akan berhasil dan di save ke data local. Bapak/ibu bisa menggunakan data tersebut untuk login 


==================  HOMEPAGE ================== 
Berikut saya lampirkan beberapa referensi pengetesan saya yang sudah berhasil bapak/ibu. berikut saya lampirkan hasil pengetesan saya. Saya sangat senang dan berterima kasih jika bapak/ibu mengulik lebih dalam tentang homepage yang saya buat.

CATATAN: Homepage dijaga oleh auth guard, jadi kalau belum login user tidak bisa masuk

==================  TANPA SEARCH DAN TANPA SORTING ================== 
1. Bapak/ibu bisa melakukan next/prev, kemudian atur jumlah item per page
2. Ketika bapak/ibu klik list tabel, maka akan masuk ke detail page, ketika klik button OK di detail page, maka akan kembali ke halaman terakhir dihomepage


==================  SEARCH TANPA SORTING ================== 
1. Ketika bapak/ibu search employee name "a" dan employee status = "int" maka akan muncul data sebanyak 15, bapak ibu bisa next/ prev dan atur jumlah item perpage
2. Ketika bapak/ibu klik list tabel, maka akan masuk ke detail page, ketika klik button OK di detail page, maka akan kembali ke halaman terakhir dihomepage sesuai search dan page ke berapa


==================  SORTING TANPA SEARCH ================== 
1. Bapak/ibu bisa sorting semua data berdasarkan ascending descending
    sekadar catatan : data yang di sorting itu data global, jadi bukan data sesuai page. Ketika bapak ibu sorting full name secara ascending, maka yang muncul pertama adalah "ada lovelace" dan diurutan terakhir "Zoe Alexandra" begitu juga sebaliknya.

2. Ketika bapak/ibu klik list tabel, maka akan masuk ke detail page, ketika klik button OK di detail page, maka akan kembali ke halaman terakhir dihomepage sesuai sorting dan page ke berapa


==================  SORTING DAN SEARCH ================== 
1. Ketika bapak/ibu search employee name "a" dan employee status = "int" maka akan muncul data sebanyak 15, bapak ibu bisa next/ prev dan atur jumlah item perpage.
2. Ketika bapak ibu di page terakhir dan sorting ascending atau descending. data yang di sorting itu data global, jadi bukan data sesuai page.
3. Ketika bapak/ibu klik list tabel, maka akan masuk ke detail page, ketika klik button OK di detail page, maka akan kembali ke halaman terakhir dihomepage sesuai search, sorting dan page ke berapa





