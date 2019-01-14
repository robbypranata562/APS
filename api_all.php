<?php

/*================================================================================================================================

KETERANGAN: semua jenis input harus kirim jg variabel tipe (kemudian baru ditambahkan input lainnya yang diperlukan)

*******************************************************************************
tipe    : GET_OUTLETMASTERPRODUK
fungsi  : - mengambil seluruh data produk dari suatu outlet beserta varian dan subvarian nya
					- data yang diambil bisa diambil berdasarkan pencarian berupa namabarang atau barcode
					- data dapat diambil menggunakan paginasi (jumlah barang yang diambil, beserta halaman pengambilan)
					- produk yang diambil hanya produk yang memiliki stok (jika stok nya 0 maka tidak akan diambil/ditampilkan)
input   : idoutlet, search, limit(jumlah perhalaman), page( halaman ke-0 sampai ... ),
          idkategori ('' untuk semua), statusproduk (''= semua; PROMO= produk promo; KONSINYASI= produk konsinyasi; NONKONSINYASI= produk non kosinyasi;
                                                     'FAVORIT'= produk favorit, favoritpelanggan; 'PAKET'= lom aktif),
          stokoption ('' untuk semua, 'MINIMALSTOK' untuk minimalstok)

output  : errcode (OK jika berhasil),
					daftarproduk (idproduk, namaproduk, simbolmatauang, hargamaxproduk, hargaminproduk, jumlahvarian, tipe,
												idkategoriproduk, idsatuanproduk, berat, deskripsiproduk, fotoprodukutama,
												jumlahstokproduk, idpemasok, iskonsinyasi, isfavorit, isfavoritpelanggan, ispromokonsinyasi,
												varian (array:	idvarian, jumlahstokvarian, simbolmatauang, hargaminvarian, hargamaxvarian,
																				varian1, jumlahsubvarian,
																				subvarian (array:	idproduk_var, simbolmatauang, hargajual, jumlahstok, varian1,
																													varian2, minstok, barcode)
															)
											)
tabel   :  1. aps.masterklien
					 2. masterproduk_dataproduk
					 3. masterproduk_relasi
					 4. masterproduk_varian
					 5. stok
					 6. masterproduk_outlet
					 7. mastersatuanproduk
					 8. masteroutlet_matauang
           9. masterproduk_konsinyasi
          10. masterproduk_foto
          11. masterpromo
          12. masterpromo_konsinyasi
          13. masterpromo_konsinyasi_dataproduk

*******************************************************************************
tipe    : GET_CATATAN
fungsi  : - mengambil seluruh data catatan
          - data yang diambil bisa diambil berdasarkan tipecatatan (''= semua catatan; 1 = catatan pembelian)
					- data yang diambil bisa berdasarkan search parameter
input   : tipecatatan, search

output  : errcode (OK jika berhasil),
          daftarcatatan (array: IDCATATAN, TIPECATATAN, NAMACATATAN, ISICATATAN, STATUSKEAKTIFAN )

tabel   :  1. mastercatatan

*******************************************************************************
tipe    : UPDATE_CATATAN
fungsi  : - mengupdate data dari kategori pelanggan
					
input   : idcatatan, tipecatatan, namacatatan, isicatatan, statuskeaktifan

output  : errcode (OK jika berhasil)
					
tabel   :  1. mastercatatan (UPDATE)

*******************************************************************************
tipe    : ADD_CATATAN
fungsi  : - menambah data dari catatan baru
					
input   : namacatatan, isicatatan, tipecatatan (tipe catatan=1)

output  : errcode (OK jika berhasil)
					
tabel   :  1. mastercatatan (INSERT)

*******************************************************************************
tipe    : DELETE_CATATAN
fungsi  : - menghapus catatan
					
input   : listidcatatan(array: idcatatan)

output  : errcode (OK jika berhasil)
					
tabel   :  1. mastercatatan (INSERT)

contoh  : {
            "tipe":"DELETE_CATATAN",
            "listidcatatan":[ 3, 1 ]
          }

*******************************************************************************
tipe    : GET_KATEGORIPELANGGAN
fungsi  : - mengambil seluruh kategori pelanggan
input   : N/A

output  : errcode (OK),
          daftarkategoripelanggan (array: IDKATEGORIPELANGGAN, NAMAKATEGORIPELANGGAN )

tabel   :  1. masterkategoripelanggan

*******************************************************************************
tipe    : UPDATE_KATEGORIPELANGGAN
fungsi  : - mengupdate data dari kategori pelanggan (kecuali idkategoripelanggan=1, tidak bisa diupdate)
					
input   : idkategoripelanggan, namakategoripelanggan

output  : errcode (OK jika berhasil)
					
tabel   :  1. masterkategoripelanggan (UPDATE)
           2. listtableupdated (UPDATE)

*******************************************************************************
tipe    : ADD_KATEGORIPELANGGAN
fungsi  : - menambah data dari kategoripelanggan baru
					
input   : namakategoripelanggan

output  : errcode (OK jika berhasil)
					
tabel   :  1. masterkategoripelanggan (INSERT)
           2. listtableupdated (UPDATE)

*******************************************************************************
tipe    : GET_KATEGORIPRODUK
fungsi  : - mengambil seluruh kategori produk
input   : N/A

output  : errcode (OK),
          daftarkategoriproduk (array: IDKATEGORIPRODUK, NAMAKATEGORIPRODUK )

tabel   :  1. masterkategoriproduk

*******************************************************************************
tipe    : UPDATE_KATEGORIPRODUK
fungsi  : - mengupdate data dari kategori produk
					
input   : idkategoriproduk, namakategoriproduk

output  : errcode (OK jika berhasil)
					
tabel   :  1. masterkategoriproduk (UPDATE)
           2. listtableupdated (UPDATE)

*******************************************************************************
tipe    : ADD_KATEGORIPRODUK
fungsi  : - menambah data dari kategoriproduk baru
					
input   : namakategoriproduk

output  : errcode (OK jika berhasil)
					
tabel   :  1. masterkategoriproduk (INSERT)
           2. listtableupdated (UPDATE)

*******************************************************************************
tipe    : GET_KONTRAKPENJUALAN
fungsi  : - mengambil seluruh data kontrak penjualan
					- data yang diambil bisa diambil berdasarkan statuskeaktifan dari kontrak penjualan ('' = tampil semua; 0 = batal; 1 = aktif; 2 = selesai)
input   : statuskontrak, idoutlet

output  : errcode (OK jika berhasil),
          daftarkontrakpenjualan (array:  NOKONTRAKPENJUALAN, IDOUTLET, TANGGAL, IDPELANGGAN, NAMAPELANGGAN, IDSALES, NAMASALES, KURS, IDSATUANHARGA,
                                          SUBTOTAL, USESERVIS, BIAYASERVIS, SERVISWITHTAX, TOTALSERVIS, USETAX, PERSENTASEPAJAK, TOTALTAX, TOTALHARGA,
                                          STATUSKEAKTIFAN,
                                          daftarproduk (array:  IDPRODUK_VAR, JUMLAH, JUMLAH_KIRIM, JUMLAH_RETUR, HARGAJUAL, CATATAN )
											    )
tabel   :  1. masterkontrakpenjualan
           2. masterkontrakpenjualan_dataproduk
           3. masterproduk_dataproduk
           4. masterproduk_varian
           5. masterpelanggan
					 6. masterpengguna

*******************************************************************************
tipe    : GET_PELANGGAN
fungsi  : - mengambil seluruh data pelanggan
					- data yang diambil bisa diambil berdasarkan pencarian berupa nama pelanggan, no hp(HP1), atau email
input   : search ('' untuk semua pelanggan), isactive (jika isactive = 0, maka ambil seluruh pelanggan; jika 1 maka ambil yang statuskeaktifan = 1)

output  : errcode (OK jika berhasil),
					daftarpelanggan (array:	IDPELANGGAN, NAMAPELANGGAN, IDBADANUSAHA, IDKATEGORIPELANGGAN,  CP, TELEPON1, TELEPON2, FAX, HP1, HP2,
                                  EMAIL, ALAMAT, KODEPOS, IDNEGARA, PROPINSI, KOTA, KECAMATAN, STATUSKEAKTIFANPIUTANG, LIMITPIUTANG,
                                  TEMPOPIUTANG, IDBANK, NOREKENING, NAMAREKENING, KABUPATENBANK, IDNEGARABANK, SISASALDODP, SISAPIUTANG,
                                  SISAPROMOPOIN, KODEKONFIRMASI, STATUSKONFIRMASI, STATUSKEAKTIFAN
											    )
tabel   :  1. masterpelanggan

*******************************************************************************
tipe    : UPDATE_PELANGGAN
fungsi  : - mengupdate data dari pelanggan( idbadanusaha, idkategoripelanggan, namapelanggan, cp, telepon1, telepon2, fax, hp1, hp2, email,
                                            alamat, kodepos, idnegara, propinsi, kota, kecamatan, idbank, norekening, namamarketing,
                                            kabupatenbank, idnegarabank, statuskeaktifan)
					
input   : idpelanggan, idbadanusaha, idkategoripelanggan, namapelanggan, cp, telepon1, telepon2, fax, hp1, hp2, email, alamat,
          kodepos, idnegara, propinsi, kota, kecamatan, idbank, norekening, namamarketing, kabupatenbank, idnegarabank,
          idpelanggan, statuskeaktifan

output  : errcode (OK jika berhasil)
					
tabel   :  1. masterpelanggan (UPDATE)
           2. listtableupdated (UPDATE)

*******************************************************************************
tipe    : ADD_PELANGGAN
fungsi  : - menambah data dari pelanggan baru (idbadanusaha, idkategoripelanggan, namapelanggan, cp, telepon1,
                                              telepon2, fax, hp1, hp2, email, alamat, kodepos, idnegara, propinsi,
                                              kota, kecamatan, idbank, norekening, namamarketing, kabupatenbank, idnegarabank)
					
input   : idbadanusaha, idkategoripelanggan, namapelanggan, cp, telepon1, telepon2, fax, hp1, hp2, email, alamat,
          kodepos, idnegara, propinsi, kota, kecamatan, idbank, norekening, namamarketing, kabupatenbank, idnegarabank

output  : errcode (OK jika berhasil)
					
tabel   :  1. masterpelanggan (INSERT)
           2. listtableupdated (UPDATE)

*******************************************************************************
tipe    : UPDATE_PELANGGANSTATUSKEAKTIFAN
fungsi  : - hanya update statuskeaktifan dari pelanggan tertentu
					
input   : idpelanggan, statuskeaktifan

output  : errcode(OK jika berhasil)
          
					
tabel   :  1. masterpelanggan
           2. listtableupdated (UPDATE)

*******************************************************************************
tipe    : GET_LOGISTIK
fungsi  : - mengambil seluruh jasa logistik
input   : isactive (jika 0 = ambil seluruh data logistik; jika 1 ambil logistik STATUSKEAKTIFAN=1)

output  : errcode (OK),
					daftarlogistik (array:	IDLOGISTIK, NAMALOGISTIK, STATUSKEAKTIFAN
											    )
tabel   :  1. masterlogistik

*******************************************************************************
tipe    : UPDATE_LOGISTIK
fungsi  : - mengupdate data dari logistik (statuskeaktifan)
					
input   : statuskeaktifan, idlogistik

output  : errcode (OK jika berhasil)
					
tabel   :  1. masterlogistik (UPDATE)
           2. listtableupdated (UPDATE)

*******************************************************************************
tipe    : GET_PEMASOK
fungsi  : - mengambil seluruh jasa pemasok
input   : isactive (jika 0 = ambil seluruh data pemasok; jika 1 ambil pemasok STATUSKEAKTIFAN=1)

output  : errcode (OK),
          daftarpemasok (array: IDPEMASOK, NAMAPEMASOK, IDBADANUSAHA, CP, TELEPON1, TELEPON2, FAX, HP1, HP2, EMAIL, ALAMAT, KODEPOS,
                                IDNEGARA, PROPINSI, KOTA, KECAMATAN, TEMPOHUTANG, IDBANK, NOREKENING, NAMAREKENING, KABUPATENBANK,
                                IDNEGARABANK, STATUSKEAKTIFAN
											  )
tabel   :  1. masterpemasok

*******************************************************************************
tipe    : UPDATE_PEMASOK
fungsi  : - mengupdate data dari pemasok
					
input   : idpemasok, namapemasok, idbadanusaha, cp, telepon1, telepon2, fax, hp1, hp2, email, alamat, kodepos,
          idnegara, propinsi, kota, kecamatan, tempohutang, idbank, norekening, namarekening, kabupatenbank,
          idnegarabank, statuskeaktifan

output  : errcode (OK jika berhasil)
					
tabel   :  1. masterpemasok (UPDATE)
           2. listtableupdated (UPDATE)

*******************************************************************************
tipe    : ADD_PEMASOK
fungsi  : - menambah data dari pemasok baru
					
input   : namapemasok, idbadanusaha, cp, telepon1, telepon2, fax, hp1, hp2, email, alamat, kodepos,
          idnegara, propinsi, kota, kecamatan, tempohutang, idbank, norekening, namarekening, kabupatenbank, idnegarabank

output  : errcode (OK jika berhasil)
					
tabel   :  1. masterpemasok (INSERT)
           2. listtableupdated (UPDATE)

*******************************************************************************
tipe    : UPDATE_PEMASOKSTATUSKEAKTIFAN
fungsi  : - hanya update statuskeaktifan dari pemasok tertentu
					
input   : idpemasok, statuskeaktifan

output  : errcode(OK jika berhasil)
          
					
tabel   :  1. masterpemasok
           2. listtableupdated (UPDATE)

*******************************************************************************
tipe    : GET_USEROUTLET
fungsi  : - menampilkan outlet yang bisa dipilih oleh user tersebut
					
input   : N/A

output  : errcode(OK jika berhasil),
          listoutlet (array: IDOUTLET, NAMAOUTLET)
          
					
tabel   :  1. masterpengguna_outlet
           2. masteroutlet

*******************************************************************************
tipe    : GET_OUTLET
fungsi  : - mengambil seluruh data outlet
					- data yang diambil bisa berdasarkan idoutlet
input   : idoutlet ('' untuk tampilkan semua outlet)

output  : errcode (OK jika berhasil),
          daftaroutlet (array:  IDOUTLET, KODEOUTLET, NAMAOUTLET, LOKASI, LOGOOUTLET, TELEPON1, TELEPON2, FAX, EMAIL 	USESERVIS, BIAYASERVIS,
                                SERVISWITHTAX, USETAX, PERSENTASEPAJAK, USECHARGE, PERSENTASECHARGE, NOMINALCHARGE, USEDONASI, TIPEDONASI,
                                CETAKKEBIJAKANRETUR, CETAKCATATAN, ALAMAT, KODEPOS, IDNEGARA, PROPINSI, KOTA, KECAMATAN, URLFB, URLYOUTUBE,
                                URLINSTAGRAM, URLTWITTER, STATUSKEAKTIFAN 
											    )
tabel   :  1. masteroutlet

*******************************************************************************
tipe    : ADD_PRODUKFAVORIT
fungsi  : - menambah data produk favorit di outlet tertentu
input   : idoutlet,
          listidproduk (array: idproduk)

output  : errcode (OK jika berhasil)

tabel   :  1. masterproduk_favorit

contoh  : {
            "tipe":"ADD_PRODUKFAVORIT",
            "idoutlet":1,
            "listidproduk":[ 3, 1 ]
          }

*******************************************************************************
tipe    : DELETE_PRODUKFAVORIT
fungsi  : - menghapus data produk favorit di outlet tertentu
input   : idoutlet,
          listidproduk (array: idproduk)

output  : errcode (OK jika berhasil)

tabel   :  1. masterproduk_favorit

contoh  : {
            "tipe":"DELETE_PRODUKFAVORIT",
            "idoutlet":1,
            "listidproduk":[ 3, 1 ]
          }

*******************************************************************************
tipe    : ADD_PRODUKFAVORITPELANGGAN
fungsi  : - menambah data produk favorit dari pelanggan tertentu
input   : idpelanggan,
          listidproduk (array: idproduk)

output  : errcode (OK jika berhasil)

tabel   :  1. masterproduk_favoritpelanggan

contoh  : {
            "tipe":"ADD_PRODUKFAVORITPELANGGAN",
            "idpelanggan":1,
            "listidproduk":[ 3, 1 ]
          }

*******************************************************************************
tipe    : DELETE_PRODUKFAVORITPELANGGAN
fungsi  : - menghapus data produk favorit dari pelanggan tertentu
input   : idpelanggan,
          listidproduk (array: idproduk)

output  : errcode (OK jika berhasil)

tabel   :  1. masterproduk_favoritpelanggan

contoh  : {
            "tipe":"DELETE_PRODUKFAVORITPELANGGAN",
            "idpelanggan":1,
            "listidproduk":[ 3, 1 ]
          }

*******************************************************************************
tipe    : GET_LOGINUSERDATA
fungsi  : - mengambil keterangan user yang login
input   : 

output  : errcode (OK jika berhasil),
          namapengguna, email, idkategoripengguna, jabatan, foto, jeniskelamin, nik

tabel   :  1. masterpengguna
           2. masterkategoripengguna

*******************************************************************************
tipe    : POST_MASTERPRODUK
fungsi  : - menambah/mengedit produk
input   : tipestok(0= kelola stok, 1= non kelola stok), idkategoriproduk, namaproduk (nama produk TIDAK BOLEH 'custom produk' karena sudah reserved),
          idsatuanproduk, berat, deskripsiproduk, fotoprodukutama,
          listvarian  (array: varian1, varian2, barcode,
                               liststokharga (array: idoutlet, jumlahstok, hpp, hargajual, notifikasiminimalstok, notifikasimaksimalstok)
                      )

output  : errcode (OK jika berhasil)

tabel   :  1. masterproduk
           2. masterproduk_relasi
           3. masterproduk_varian
           4. kartustok
           5. stok
           6. masterproduk_outlet
           7. stokopname
           8. masterproduk_foto
           9. listtableupdated

*******************************************************************************
tipe    : CEK_MASTERPRODUKNAME
fungsi  : - memeriksa apakah ada produk dengan nama tertentu
input   : namaproduk

output  : errcode (OK jika berhasil), isexists (0 = belum ada; 1 = sudah ada)

tabel   :  1. masterproduk_dataproduk

*******************************************************************************
tipe    : GET_MASTERPRODUKSUM
fungsi  : - mengambil jumlah stok dari produk tertentu
          - juga berguna saat hendak hapus produk, diperiksa dulu apa stok sudah 0 atau belum
input   : listidproduk  (array: idproduk)

output  : errcode (OK),
          liststatusproduk (array: (produkid, statusdelete (NOT_OK jika lebih dari 0, OK jika 0)))

tabel   :  1. stok

*******************************************************************************
tipe    : DELETE_MASTERPRODUK
fungsi  : - menonaktifkan produk
input   : listidproduk  (array: idproduk)

output  : errcode (OK)

tabel   :  1. masterproduk_dataproduk

*******************************************************************************
tipe    : GET_MASTERSATUAN
fungsi  : - mengambil daftar satuan produk dari klien
input   : N/A

output  : errcode (OK), listsatuan

tabel   :  1. mastersatuanproduk

*******************************************************************************
tipe    : UPDATE_MASTERSATUAN
fungsi  : - meng update satuan produk (idsatuan 1-14 tidak bisa diupdate)
input   : idsatuan, namasatuan

output  : errcode (OK / NOT_OK)

tabel   :  1. mastersatuanproduk

*******************************************************************************
tipe    : ADD_MASTERSATUAN
fungsi  : - menambah satuan produk
input   : namasatuan

output  : errcode (OK)

tabel   :  1. mastersatuanproduk

*******************************************************************************
tipe    : GET_SLIDER
fungsi  : - mangambil daftar slider yang berkalu saat ini
input   : N/A

output  : errcode (OK), listslider

tabel   :  1. mastersatuanproduk

*******************************************************************************



v.005 (2018-11-21 / 22) - kris
- add GET_MASTERSATUAN, ADD_MASTERSATUAN, UPDATE_MASTERSATUAN, GET_SLIDER
- add/update: output/error message
- remove all JUMLAH > 0 in GET_OUTLETMASTERPRODUK

v.004 (2018-11-01) - kris
- corrected totalproduk and totalstok (GET_OUTLETMASTERPRODUK)

v.003 (2018-10-31) - kris
- change ADD_MASTERPRODUK (listfoto added)
- add GET_MASTERPRODUKSUM
- add CEK_MASTERPRODUKNAME
- change GET_OUTLETMASTERPRODUK (add total produk, total stok of produk in output)
- change GET_OUTLETMASTERPRODUK (input: idoutlet, search, limit, page, idkategori, statusproduk, stokoption)
- add DELETE_MASTERPRODUK


v.002 (2018-10-24) - kris
- change DELETE/ADD PRODUKFAVORIT to listidproduk
- add ADD/DELETE PRODUKFAVORITPELANGGAN
- add GET_LOGINUSERDATA
- add ADD_MASTERPRODUK (FOTO is not finished)
- change GET_OUTLETMASTERPRODUK (add isfavorit, isfavoritpelanggan, namakategoriproduk, namasatuanproduk, daftarfoto) - progress nonaktif


v.001 (2018-10-20) - kris
- initial version


================================================================================================================================*/


	ini_set('display_errors',1);
	if (isset($_SERVER['HTTP_ORIGIN'])) {
	  header("Access-Control-Allow-Origin: ".$_SERVER['HTTP_ORIGIN']);
	  header('Access-Control-Allow-Credentials: true');
	  header('Access-Control-Max-Age: 86400');    // cache for 1 day
	}

	// Access-Control headers are received during OPTIONS requests
	if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
	    header("Access-Control-Allow-Methods: POST, OPTIONS");
	  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
	    header("Access-Control-Allow-Headers: ".$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']);
	}

	session_start();
	include("./Functions.php");
//	include("cekUser.php");
  
  $idklien = 8;
	$dbklien = 'Markus8';
	$idpengguna = 1;
  
  include("./DBConnectPDOH.php");
  
  //$nama = getNamaKlien();
  //$phpself = getPHPSelf();
  //$aps_id = $_SESSION['aps_id'];
	$post = file_get_contents("php://input");
	$req = json_decode($post);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  function getmatauang($conn2, $idklien) {
		$order2 = $conn2->prepare("	SELECT SIMBOLMATAUANG
																FROM masterklien AS DB1
																	JOIN mastersatuanharga AS DB2 ON DB1.IDSATUANHARGA = DB2.IDSATUANHARGA
																WHERE idklien= :idklien");
		$order2->execute(array(':idklien'=>$idklien));
		$d2 = $order2->fetch(PDO::FETCH_ASSOC);
		return ($d2['SIMBOLMATAUANG']);
	}
	$matauang = '';
	$matauang = getmatauang($conn2, $idklien);

  function ambilwaktunow() {
    $dtz = new DateTimeZone("Asia/Jakarta");
    $now = new DateTime(date("Y-m-d"), $dtz);

    return ((new DateTime())->format('Y-m-d H:i:s'));
  }
  $waktunow = ambilwaktunow();

  function generateidprodukvar($conn, $idproduk, $varian1, $varian2) {
    if ($varian1 == "") { $idproduk_var = $idproduk.".1.1"; }
    else {
      $ordervarian1 = $conn->prepare("SELECT COALESCE( 
                                                    (SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(IDPRODUK_VAR, '.', 2), '.', -1)
                                                      FROM masterproduk_varian
                                                      WHERE UPPER(VARIAN1)=UPPER(:varian1) AND SUBSTRING_INDEX(IDPRODUK_VAR, '.', 1)= :idprodukA LIMIT 1),
                                                    (SELECT MAX(SUBSTRING_INDEX(SUBSTRING_INDEX(IDPRODUK_VAR, '.', 2), '.', -1))+1
                                                      FROM masterproduk_varian
                                                      WHERE SUBSTRING_INDEX(IDPRODUK_VAR, '.', 1)= :idprodukB), 1)
                                                    AS IDVARIAN1;");
      $ordervarian1->execute(array( ':varian1'=>$varian1,
                                    ':idprodukA'=>$idproduk,
                                    ':idprodukB'=>$idproduk));
      $rowvarian1 = $ordervarian1->fetch(PDO::FETCH_ASSOC);
      $idvarian1 = $rowvarian1['IDVARIAN1'];
      $ordervarian2 = $conn->prepare("SELECT COALESCE( 
                                                    (SELECT SUBSTRING_INDEX(IDPRODUK_VAR, '.', -1)
                                                      FROM masterproduk_varian
                                                      WHERE UPPER(VARIAN2)=UPPER(:varian2) AND SUBSTRING_INDEX(IDPRODUK_VAR, '.', 1)= :idprodukA LIMIT 1),
                                                    (SELECT MAX(SUBSTRING_INDEX(IDPRODUK_VAR, '.', -1))+1
                                                      FROM masterproduk_varian
                                                      WHERE SUBSTRING_INDEX(IDPRODUK_VAR, '.', 1)= :idprodukB), 1)
                                                    AS IDVARIAN2;");
      $ordervarian2->execute(array( ':varian2'=>$varian2,
                                    ':idprodukA'=>$idproduk,
                                    ':idprodukB'=>$idproduk));
      $rowvarian2 = $ordervarian2->fetch(PDO::FETCH_ASSOC);
      $idvarian2 = $rowvarian2['IDVARIAN2'];

      $idproduk_var = $idproduk . '.' . $idvarian1 . '.' . $idvarian2;
    }

    return $idproduk_var;
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  $data = array("errcode"=>"NOT_OK", "message"=>"permintaan tidak valid");

  if ( (isset($_POST['tipe'])) || (isset($req->tipe)) ) {
	  header("content-type: aplication/json");
	  if (isset($req->tipe)) {
	    $tipe = $req->tipe;
    }
    else {
	    $tipe = $_POST['tipe'];
	  }

		if ($tipe == "GET_OUTLETMASTERPRODUK") {
      if ( (!(isset($req->idoutlet))) || (!(isset($req->search)))  || (!(isset($req->limit))) || (!(isset($req->page))) ||
            (!(isset($req->idkategori))) || (!(isset($req->stokoption))) || (!(isset($req->statusproduk))) ) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $idoutlet = $req->idoutlet;
        $search = $req->search;
        if (($search == '') OR ($search == null)) { $search = '%%'; } else { $search = '%'. $search . '%'; }
        $limit = $req->limit;
        if (($limit == '') OR ($limit == 0)) { $limit = 999999; }
        $page = $req->page;
        if (($page == '') OR ($page == 0)) { $page = 0; } else { $page = ($page - 1) * $limit;}
        $idkategori = $req->idkategori;
        if (($idkategori == '') OR ($idkategori == null)) { $idkategori = '%%'; }
        $statusproduk = strtoupper($req->statusproduk);
        $stokoption = $req->stokoption;
        if ($stokoption == "MINIMALSTOK") { $stokoption = ' AND JUMLAH < NOTIFIKASIMINIMALSTOK '; }
        else { $stokoption = ''; }
        $jumlahproduk = 0;
        $jumlahstoktotal = 0;
        
        if (($statusproduk != 'PROMO') && ($statusproduk != 'KONSINYASI') && ($statusproduk != 'FAVORIT') && ($statusproduk != 'NONKONSINYASI')) {
          $sqljumlah = "SELECT COUNT(IDPRODUK) AS JUMLAHTOTALPRODUK, SUM(JUMLAHSTOKPRODUK) AS JUMLAHTOTALSTOK
                        FROM ( (SELECT  db1.IDPRODUK, SUM(JUMLAH) AS JUMLAHSTOKPRODUK
                                FROM masterproduk_dataproduk db1
                                  JOIN masterproduk_relasi db2 ON db1.IDPRODUK=db2.IDPRODUK
                                  JOIN masterproduk_varian db3 ON db2.IDPRODUK_VAR=db3.IDPRODUK_VAR
                                  JOIN stok db4 ON db3.IDPRODUK_VAR=db4.IDPRODUK_VAR
                                  JOIN masterproduk_outlet db5 ON db4.IDPRODUK_VAR=db5.IDPRODUK_VAR AND db4.IDOUTLET=db5.IDOUTLET
                                  JOIN masterkategoriproduk db8 ON db1.IDKATEGORIPRODUK=db8.IDKATEGORIPRODUK
                                    LEFT JOIN masterproduk_konsinyasi db9 ON db9.IDPRODUK = db1.IDPRODUK
                                    LEFT JOIN masterproduk_favorit db10 ON db10.IDPRODUK = db1.IDPRODUK
                                    LEFT JOIN masterproduk_favoritpelanggan db11 ON db11.IDPRODUK = db1.IDPRODUK
                                    LEFT JOIN ((SELECT IDPRODUK, dby1.IDPROMO
                                                FROM masterpromo dby1
                                                JOIN masterpromo_konsinyasi dby2 ON dby1.IDPROMO=dby2.IDPROMO
                                                JOIN masterpromo_konsinyasi_dataproduk dby3 ON dby1.IDPROMO=dby3.IDPROMO
                                                WHERE CURDATE() BETWEEN STARTPROMO AND ENDPROMO) AS db12) ON db12.IDPRODUK=db1.IDPRODUK
                                WHERE db4.IDOUTLET= :idoutlet AND (NAMAPRODUK LIKE :search1 OR 
                                                                    NAMAPRODUK IN (SELECT NAMAPRODUK
                                                                                    FROM masterproduk_dataproduk dbx1
                                                                                    JOIN masterproduk_relasi dbx2 on dbx1.IDPRODUK=dbx2.IDPRODUK
                                                                                    JOIN masterproduk_varian dbx3 ON dbx2.IDPRODUK_VAR=dbx3.IDPRODUK_VAR
                                                                                    WHERE BARCODE LIKE :search2))
                                      AND db3.IDPRODUK_VAR != '0.0.0' AND db1.STATUSKEAKTIFAN = 1
                                      AND db1.IDKATEGORIPRODUK LIKE :idkategori " .$stokoption.
                                " GROUP BY db1.IDPRODUK) AS DBTEMP )";

          $sql = "SELECT  db1.IDPRODUK, NAMAPRODUK, SUM(JUMLAH) AS JUMLAHSTOKPRODUK, MIN(HARGAJUAL) AS HARGAPRODUKMIN, MAX(HARGAJUAL) AS HARGAPRODUKMAX,
                          COUNT(DISTINCT(VARIAN1)) AS JUMLAHVARIAN, '".$matauang."' AS SATUANHARGA, NAMASATUANPRODUK,
                          TIPE, db1.IDKATEGORIPRODUK, NAMAKATEGORIPRODUK, db1.IDSATUANPRODUK, NAMASATUANPRODUK, BERAT, DESKRIPSIPRODUK, FOTOPRODUKUTAMA,
                          IDPEMASOK, PERSENTASEKONSINYASI,
                      IF (db10.IDPRODUK is null, 0, 1) AS ISFAVORIT,
                      IF (db11.IDPRODUK is null, 0, 1) AS ISFAVORITPELANGGAN,
                      IF (db12.IDPRODUK is null, 0, 1) AS ISPROMOKONSINYASI
                  FROM masterproduk_dataproduk db1
                    JOIN masterproduk_relasi db2 ON db1.IDPRODUK=db2.IDPRODUK
                    JOIN masterproduk_varian db3 ON db2.IDPRODUK_VAR=db3.IDPRODUK_VAR
                    JOIN stok db4 ON db3.IDPRODUK_VAR=db4.IDPRODUK_VAR
                    JOIN masterproduk_outlet db5 ON db4.IDPRODUK_VAR=db5.IDPRODUK_VAR AND db4.IDOUTLET=db5.IDOUTLET
                    JOIN mastersatuanproduk db6 ON db1.IDSATUANPRODUK=db6.IDSATUANPRODUK
                    JOIN masteroutlet_matauang db7 ON db4.IDOUTLET=db7.IDOUTLET
                    JOIN masterkategoriproduk db8 ON db1.IDKATEGORIPRODUK=db8.IDKATEGORIPRODUK
                      LEFT JOIN masterproduk_konsinyasi db9 ON db9.IDPRODUK = db1.IDPRODUK
                      LEFT JOIN masterproduk_favorit db10 ON db10.IDPRODUK = db1.IDPRODUK
                      LEFT JOIN masterproduk_favoritpelanggan db11 ON db11.IDPRODUK = db1.IDPRODUK
                      LEFT JOIN ((SELECT IDPRODUK, dby1.IDPROMO
                                  FROM masterpromo dby1
                                  JOIN masterpromo_konsinyasi dby2 ON dby1.IDPROMO=dby2.IDPROMO
                                  JOIN masterpromo_konsinyasi_dataproduk dby3 ON dby1.IDPROMO=dby3.IDPROMO
                                  WHERE CURDATE() BETWEEN STARTPROMO AND ENDPROMO) AS db12) ON db12.IDPRODUK=db1.IDPRODUK
                  WHERE db4.IDOUTLET= :idoutlet AND (NAMAPRODUK LIKE :search1 OR 
                                                      NAMAPRODUK IN (SELECT NAMAPRODUK
                                                                    FROM masterproduk_dataproduk dbx1
                                                                    JOIN masterproduk_relasi dbx2 on dbx1.IDPRODUK=dbx2.IDPRODUK
                                                                    JOIN masterproduk_varian dbx3 ON dbx2.IDPRODUK_VAR=dbx3.IDPRODUK_VAR
                                                                    WHERE BARCODE LIKE :search2))
                                  AND db3.IDPRODUK_VAR != '0.0.0' AND db1.STATUSKEAKTIFAN = 1
                                  AND db1.IDKATEGORIPRODUK LIKE :idkategori " .$stokoption.
                  " GROUP BY db1.IDPRODUK, NAMAPRODUK
                  ORDER BY NAMAPRODUK ASC
                  LIMIT ".$limit." OFFSET " . $page ;
        }
        else if ($statusproduk == 'PROMO') {
          $sqljumlah = "SELECT COUNT(IDPRODUK) AS JUMLAHTOTALPRODUK, SUM(JUMLAHSTOKPRODUK) AS JUMLAHTOTALSTOK
                        FROM ( (SELECT  db1.IDPRODUK, SUM(JUMLAH) AS JUMLAHSTOKPRODUK
                                FROM masterproduk_dataproduk db1
                                JOIN masterproduk_relasi db2 ON db1.IDPRODUK=db2.IDPRODUK
                                JOIN masterproduk_varian db3 ON db2.IDPRODUK_VAR=db3.IDPRODUK_VAR
                                JOIN stok db4 ON db3.IDPRODUK_VAR=db4.IDPRODUK_VAR
                                JOIN masterproduk_outlet db5 ON db4.IDPRODUK_VAR=db5.IDPRODUK_VAR AND db4.IDOUTLET=db5.IDOUTLET
                                JOIN masterkategoriproduk db8 ON db1.IDKATEGORIPRODUK=db8.IDKATEGORIPRODUK
                                JOIN (( SELECT IDPRODUK, dby1.IDPROMO
                                        FROM masterpromo dby1
                                        JOIN masterpromo_konsinyasi dby2 ON dby1.IDPROMO=dby2.IDPROMO
                                        JOIN masterpromo_konsinyasi_dataproduk dby3 ON dby1.IDPROMO=dby3.IDPROMO
                                        WHERE CURDATE() BETWEEN STARTPROMO AND ENDPROMO) AS db12) ON db12.IDPRODUK=db1.IDPRODUK
                                WHERE db4.IDOUTLET= :idoutlet AND (NAMAPRODUK LIKE :search1 OR 
                                                            NAMAPRODUK IN (SELECT NAMAPRODUK
                                                                          FROM masterproduk_dataproduk dbx1
                                                                          JOIN masterproduk_relasi dbx2 on dbx1.IDPRODUK=dbx2.IDPRODUK
                                                                          JOIN masterproduk_varian dbx3 ON dbx2.IDPRODUK_VAR=dbx3.IDPRODUK_VAR
                                                                          WHERE BARCODE LIKE :search2))
                                      AND db3.IDPRODUK_VAR != '0.0.0' AND db1.STATUSKEAKTIFAN = 1
                                AND db1.IDKATEGORIPRODUK LIKE :idkategori " .$stokoption.
                                " GROUP BY db1.IDPRODUK) AS DBTEMP)";
          $sql = "SELECT  db1.IDPRODUK, NAMAPRODUK, SUM(JUMLAH) AS JUMLAHSTOKPRODUK, MIN(HARGAJUAL) AS HARGAPRODUKMIN, MAX(HARGAJUAL) AS HARGAPRODUKMAX,
                          COUNT(DISTINCT(VARIAN1)) AS JUMLAHVARIAN, '".$matauang."' AS SATUANHARGA, NAMASATUANPRODUK,
                          TIPE, db1.IDKATEGORIPRODUK, NAMAKATEGORIPRODUK, db1.IDSATUANPRODUK, NAMASATUANPRODUK, BERAT, DESKRIPSIPRODUK, FOTOPRODUKUTAMA,
                          STATUSKEAKTIFAN, IDPEMASOK, PERSENTASEKONSINYASI,
                          IF (db10.IDPRODUK is null, 0, 1) AS ISFAVORIT,
                          IF (db11.IDPRODUK is null, 0, 1) AS ISFAVORITPELANGGAN,
                          1 AS ISPROMOKONSINYASI
                  FROM masterproduk_dataproduk db1
                  JOIN masterproduk_relasi db2 ON db1.IDPRODUK=db2.IDPRODUK
                  JOIN masterproduk_varian db3 ON db2.IDPRODUK_VAR=db3.IDPRODUK_VAR
                  JOIN stok db4 ON db3.IDPRODUK_VAR=db4.IDPRODUK_VAR
                  JOIN masterproduk_outlet db5 ON db4.IDPRODUK_VAR=db5.IDPRODUK_VAR AND db4.IDOUTLET=db5.IDOUTLET
                  JOIN mastersatuanproduk db6 ON db1.IDSATUANPRODUK=db6.IDSATUANPRODUK
                  JOIN masteroutlet_matauang db7 ON db4.IDOUTLET=db7.IDOUTLET
                  JOIN masterkategoriproduk db8 ON db1.IDKATEGORIPRODUK=db8.IDKATEGORIPRODUK
                  JOIN (( SELECT IDPRODUK, dby1.IDPROMO
                          FROM masterpromo dby1
                          JOIN masterpromo_konsinyasi dby2 ON dby1.IDPROMO=dby2.IDPROMO
                          JOIN masterpromo_konsinyasi_dataproduk dby3 ON dby1.IDPROMO=dby3.IDPROMO
                          WHERE CURDATE() BETWEEN STARTPROMO AND ENDPROMO) AS db12) ON db12.IDPRODUK=db1.IDPRODUK
                  LEFT JOIN masterproduk_konsinyasi db9 ON db9.IDPRODUK = db1.IDPRODUK
                  LEFT JOIN masterproduk_favorit db10 ON db10.IDPRODUK = db1.IDPRODUK
                  LEFT JOIN masterproduk_favoritpelanggan db11 ON db11.IDPRODUK = db1.IDPRODUK
                  WHERE db4.IDOUTLET= :idoutlet AND (NAMAPRODUK LIKE :search1 OR 
                                              NAMAPRODUK IN (SELECT NAMAPRODUK
                                                            FROM masterproduk_dataproduk dbx1
                                                            JOIN masterproduk_relasi dbx2 on dbx1.IDPRODUK=dbx2.IDPRODUK
                                                            JOIN masterproduk_varian dbx3 ON dbx2.IDPRODUK_VAR=dbx3.IDPRODUK_VAR
                                                            WHERE BARCODE LIKE :search2))
                        AND db3.IDPRODUK_VAR != '0.0.0' AND db1.STATUSKEAKTIFAN = 1
                        AND db1.IDKATEGORIPRODUK LIKE :idkategori " .$stokoption.
                  " GROUP BY db1.IDPRODUK, NAMAPRODUK
                  ORDER BY NAMAPRODUK ASC
                  LIMIT ".$limit." OFFSET " . $page ;

        }
        else if ($statusproduk == 'FAVORIT') {
          $sqljumlah = "SELECT COUNT(IDPRODUK) AS JUMLAHTOTALPRODUK, SUM(JUMLAHSTOKPRODUK) AS JUMLAHTOTALSTOK
                        FROM ( (SELECT  db1.IDPRODUK, SUM(JUMLAH) AS JUMLAHSTOKPRODUK
                                FROM masterproduk_dataproduk db1
                                JOIN masterproduk_relasi db2 ON db1.IDPRODUK=db2.IDPRODUK
                                JOIN masterproduk_varian db3 ON db2.IDPRODUK_VAR=db3.IDPRODUK_VAR
                                JOIN stok db4 ON db3.IDPRODUK_VAR=db4.IDPRODUK_VAR
                                JOIN masterproduk_outlet db5 ON db4.IDPRODUK_VAR=db5.IDPRODUK_VAR AND db4.IDOUTLET=db5.IDOUTLET
                                JOIN masterkategoriproduk db8 ON db1.IDKATEGORIPRODUK=db8.IDKATEGORIPRODUK
                                JOIN (((SELECT IDPRODUK
                                        FROM masterproduk_favorit)
                                        UNION 
                                        (SELECT IDPRODUK
                                        FROM masterproduk_favoritpelanggan)) AS db14) ON db14.IDPRODUK=db1.IDPRODUK
                                LEFT JOIN masterproduk_konsinyasi db9 ON db9.IDPRODUK = db1.IDPRODUK
                                LEFT JOIN masterproduk_favorit db10 ON db10.IDPRODUK = db1.IDPRODUK
                                LEFT JOIN masterproduk_favoritpelanggan db11 ON db11.IDPRODUK = db1.IDPRODUK
                                LEFT JOIN ((SELECT IDPRODUK, dby1.IDPROMO
                                            FROM masterpromo dby1
                                            JOIN masterpromo_konsinyasi dby2 ON dby1.IDPROMO=dby2.IDPROMO
                                            JOIN masterpromo_konsinyasi_dataproduk dby3 ON dby1.IDPROMO=dby3.IDPROMO
                                            WHERE CURDATE() BETWEEN STARTPROMO AND ENDPROMO) AS db12) ON db12.IDPRODUK=db1.IDPRODUK
                                WHERE db4.IDOUTLET= :idoutlet AND (NAMAPRODUK LIKE :search1 OR 
                                                            NAMAPRODUK IN (SELECT NAMAPRODUK
                                                                            FROM masterproduk_dataproduk dbx1
                                                                            JOIN masterproduk_relasi dbx2 on dbx1.IDPRODUK=dbx2.IDPRODUK
                                                                            JOIN masterproduk_varian dbx3 ON dbx2.IDPRODUK_VAR=dbx3.IDPRODUK_VAR
                                                                            WHERE BARCODE LIKE :search2))
                                      AND db3.IDPRODUK_VAR != '0.0.0' AND db1.STATUSKEAKTIFAN = 1
                                AND db1.IDKATEGORIPRODUK LIKE :idkategori " .$stokoption.
                                " GROUP BY db1.IDPRODUK) AS DBTEMP)";
          $sql = "SELECT  db1.IDPRODUK, NAMAPRODUK, SUM(JUMLAH) AS JUMLAHSTOKPRODUK, MIN(HARGAJUAL) AS HARGAPRODUKMIN, MAX(HARGAJUAL) AS HARGAPRODUKMAX,
                          COUNT(DISTINCT(VARIAN1)) AS JUMLAHVARIAN, '".$matauang."' AS SATUANHARGA, NAMASATUANPRODUK,
                          TIPE, db1.IDKATEGORIPRODUK, NAMAKATEGORIPRODUK, db1.IDSATUANPRODUK, NAMASATUANPRODUK, BERAT, DESKRIPSIPRODUK, FOTOPRODUKUTAMA,
                          STATUSKEAKTIFAN, IDPEMASOK, PERSENTASEKONSINYASI,
                          IF (db10.IDPRODUK is null, 0, 1) AS ISFAVORIT,
                          IF (db11.IDPRODUK is null, 0, 1) AS ISFAVORITPELANGGAN,
                          IF (db12.IDPRODUK is null, 0, 1) AS ISPROMOKONSINYASI
                  FROM masterproduk_dataproduk db1
                  JOIN masterproduk_relasi db2 ON db1.IDPRODUK=db2.IDPRODUK
                  JOIN masterproduk_varian db3 ON db2.IDPRODUK_VAR=db3.IDPRODUK_VAR
                  JOIN stok db4 ON db3.IDPRODUK_VAR=db4.IDPRODUK_VAR
                  JOIN masterproduk_outlet db5 ON db4.IDPRODUK_VAR=db5.IDPRODUK_VAR AND db4.IDOUTLET=db5.IDOUTLET
                  JOIN mastersatuanproduk db6 ON db1.IDSATUANPRODUK=db6.IDSATUANPRODUK
                  JOIN masteroutlet_matauang db7 ON db4.IDOUTLET=db7.IDOUTLET
                  JOIN masterkategoriproduk db8 ON db1.IDKATEGORIPRODUK=db8.IDKATEGORIPRODUK
                  JOIN (((SELECT IDPRODUK
                          FROM masterproduk_favorit)
                          UNION 
                          (SELECT IDPRODUK
                          FROM masterproduk_favoritpelanggan)) AS db14) ON db14.IDPRODUK=db1.IDPRODUK
                  LEFT JOIN masterproduk_konsinyasi db9 ON db9.IDPRODUK = db1.IDPRODUK
                  LEFT JOIN masterproduk_favorit db10 ON db10.IDPRODUK = db1.IDPRODUK
                  LEFT JOIN masterproduk_favoritpelanggan db11 ON db11.IDPRODUK = db1.IDPRODUK
                  LEFT JOIN ((SELECT IDPRODUK, dby1.IDPROMO
                              FROM masterpromo dby1
                              JOIN masterpromo_konsinyasi dby2 ON dby1.IDPROMO=dby2.IDPROMO
                              JOIN masterpromo_konsinyasi_dataproduk dby3 ON dby1.IDPROMO=dby3.IDPROMO
                              WHERE CURDATE() BETWEEN STARTPROMO AND ENDPROMO) AS db12) ON db12.IDPRODUK=db1.IDPRODUK
                  WHERE db4.IDOUTLET= :idoutlet AND (NAMAPRODUK LIKE :search1 OR 
                                              NAMAPRODUK IN (SELECT NAMAPRODUK
                                                              FROM masterproduk_dataproduk dbx1
                                                              JOIN masterproduk_relasi dbx2 on dbx1.IDPRODUK=dbx2.IDPRODUK
                                                              JOIN masterproduk_varian dbx3 ON dbx2.IDPRODUK_VAR=dbx3.IDPRODUK_VAR
                                                              WHERE BARCODE LIKE :search2))
                        AND db3.IDPRODUK_VAR != '0.0.0' AND db1.STATUSKEAKTIFAN = 1
                  AND db1.IDKATEGORIPRODUK LIKE :idkategori " .$stokoption.
                  " GROUP BY db1.IDPRODUK, NAMAPRODUK
                  ORDER BY NAMAPRODUK ASC
                  LIMIT ".$limit." OFFSET " . $page ;
        }
        else if ($statusproduk == 'PAKET') {
          // lom ada paket
        }
        else if ($statusproduk == 'KONSINYASI') {
          $sqljumlah = "SELECT COUNT(IDPRODUK) AS JUMLAHTOTALPRODUK, SUM(JUMLAHSTOKPRODUK) AS JUMLAHTOTALSTOK
                        FROM ( (SELECT  db1.IDPRODUK, SUM(JUMLAH) AS JUMLAHSTOKPRODUK
                                FROM masterproduk_dataproduk db1
                                JOIN masterproduk_relasi db2 ON db1.IDPRODUK=db2.IDPRODUK
                                JOIN masterproduk_varian db3 ON db2.IDPRODUK_VAR=db3.IDPRODUK_VAR
                                JOIN stok db4 ON db3.IDPRODUK_VAR=db4.IDPRODUK_VAR
                                JOIN masterproduk_outlet db5 ON db4.IDPRODUK_VAR=db5.IDPRODUK_VAR AND db4.IDOUTLET=db5.IDOUTLET
                                JOIN masterkategoriproduk db8 ON db1.IDKATEGORIPRODUK=db8.IDKATEGORIPRODUK
                                JOIN masterproduk_konsinyasi db9 ON db9.IDPRODUK = db1.IDPRODUK
                                LEFT JOIN masterproduk_favorit db10 ON db10.IDPRODUK = db1.IDPRODUK
                                LEFT JOIN masterproduk_favoritpelanggan db11 ON db11.IDPRODUK = db1.IDPRODUK
                                LEFT JOIN ((SELECT IDPRODUK, dby1.IDPROMO
                                            FROM masterpromo dby1
                                            JOIN masterpromo_konsinyasi dby2 ON dby1.IDPROMO=dby2.IDPROMO
                                            JOIN masterpromo_konsinyasi_dataproduk dby3 ON dby1.IDPROMO=dby3.IDPROMO
                                            WHERE CURDATE() BETWEEN STARTPROMO AND ENDPROMO) AS db12) ON db12.IDPRODUK=db1.IDPRODUK
                                WHERE db4.IDOUTLET= :idoutlet AND (NAMAPRODUK LIKE :search1 OR 
                                                            NAMAPRODUK IN (SELECT NAMAPRODUK
                                                                            FROM masterproduk_dataproduk dbx1
                                                                            JOIN masterproduk_relasi dbx2 on dbx1.IDPRODUK=dbx2.IDPRODUK
                                                                            JOIN masterproduk_varian dbx3 ON dbx2.IDPRODUK_VAR=dbx3.IDPRODUK_VAR
                                                                            WHERE BARCODE LIKE :search2))
                                      AND db3.IDPRODUK_VAR != '0.0.0' AND db1.STATUSKEAKTIFAN = 1
                                AND db1.IDKATEGORIPRODUK LIKE :idkategori " .$stokoption.
                                " GROUP BY db1.IDPRODUK) AS DBTEMP)";
          $sql = "SELECT  db1.IDPRODUK, NAMAPRODUK, SUM(JUMLAH) AS JUMLAHSTOKPRODUK, MIN(HARGAJUAL) AS HARGAPRODUKMIN, MAX(HARGAJUAL) AS HARGAPRODUKMAX,
                          COUNT(DISTINCT(VARIAN1)) AS JUMLAHVARIAN, '".$matauang."' AS SATUANHARGA, NAMASATUANPRODUK,
                          TIPE, db1.IDKATEGORIPRODUK, NAMAKATEGORIPRODUK, db1.IDSATUANPRODUK, NAMASATUANPRODUK, BERAT, DESKRIPSIPRODUK, FOTOPRODUKUTAMA,
                          STATUSKEAKTIFAN, IDPEMASOK, PERSENTASEKONSINYASI,
                          IF (db10.IDPRODUK is null, 0, 1) AS ISFAVORIT,
                          IF (db11.IDPRODUK is null, 0, 1) AS ISFAVORITPELANGGAN,
                          IF (db12.IDPRODUK is null, 0, 1) AS ISPROMOKONSINYASI
                  FROM masterproduk_dataproduk db1
                  JOIN masterproduk_relasi db2 ON db1.IDPRODUK=db2.IDPRODUK
                  JOIN masterproduk_varian db3 ON db2.IDPRODUK_VAR=db3.IDPRODUK_VAR
                  JOIN stok db4 ON db3.IDPRODUK_VAR=db4.IDPRODUK_VAR
                  JOIN masterproduk_outlet db5 ON db4.IDPRODUK_VAR=db5.IDPRODUK_VAR AND db4.IDOUTLET=db5.IDOUTLET
                  JOIN mastersatuanproduk db6 ON db1.IDSATUANPRODUK=db6.IDSATUANPRODUK
                  JOIN masteroutlet_matauang db7 ON db4.IDOUTLET=db7.IDOUTLET
                  JOIN masterkategoriproduk db8 ON db1.IDKATEGORIPRODUK=db8.IDKATEGORIPRODUK
                  JOIN masterproduk_konsinyasi db9 ON db9.IDPRODUK = db1.IDPRODUK
                  LEFT JOIN masterproduk_favorit db10 ON db10.IDPRODUK = db1.IDPRODUK
                  LEFT JOIN masterproduk_favoritpelanggan db11 ON db11.IDPRODUK = db1.IDPRODUK
                  LEFT JOIN ((SELECT IDPRODUK, dby1.IDPROMO
                              FROM masterpromo dby1
                              JOIN masterpromo_konsinyasi dby2 ON dby1.IDPROMO=dby2.IDPROMO
                              JOIN masterpromo_konsinyasi_dataproduk dby3 ON dby1.IDPROMO=dby3.IDPROMO
                              WHERE CURDATE() BETWEEN STARTPROMO AND ENDPROMO) AS db12) ON db12.IDPRODUK=db1.IDPRODUK
                  WHERE db4.IDOUTLET= :idoutlet AND (NAMAPRODUK LIKE :search1 OR 
                                              NAMAPRODUK IN (SELECT NAMAPRODUK
                                                              FROM masterproduk_dataproduk dbx1
                                                              JOIN masterproduk_relasi dbx2 on dbx1.IDPRODUK=dbx2.IDPRODUK
                                                              JOIN masterproduk_varian dbx3 ON dbx2.IDPRODUK_VAR=dbx3.IDPRODUK_VAR
                                                              WHERE BARCODE LIKE :search2))
                        AND db3.IDPRODUK_VAR != '0.0.0' AND db1.STATUSKEAKTIFAN = 1
                  AND db1.IDKATEGORIPRODUK LIKE :idkategori " .$stokoption.
                  " GROUP BY db1.IDPRODUK, NAMAPRODUK
                  ORDER BY NAMAPRODUK ASC
                  LIMIT 10 OFFSET 0";
        }
        else if ($statusproduk == 'NONKONSINYASI') {
          $sqljumlah = "SELECT COUNT(IDPRODUK) AS JUMLAHTOTALPRODUK, SUM(JUMLAHSTOKPRODUK) AS JUMLAHTOTALSTOK
                        FROM ( (SELECT  db1.IDPRODUK, SUM(JUMLAH) AS JUMLAHSTOKPRODUK
                                FROM masterproduk_dataproduk db1
                                JOIN masterproduk_relasi db2 ON db1.IDPRODUK=db2.IDPRODUK
                                JOIN masterproduk_varian db3 ON db2.IDPRODUK_VAR=db3.IDPRODUK_VAR
                                JOIN stok db4 ON db3.IDPRODUK_VAR=db4.IDPRODUK_VAR
                                JOIN masterproduk_outlet db5 ON db4.IDPRODUK_VAR=db5.IDPRODUK_VAR AND db4.IDOUTLET=db5.IDOUTLET
                                JOIN masterkategoriproduk db8 ON db1.IDKATEGORIPRODUK=db8.IDKATEGORIPRODUK
                                
                                LEFT JOIN masterproduk_favorit db10 ON db10.IDPRODUK = db1.IDPRODUK
                                LEFT JOIN masterproduk_favoritpelanggan db11 ON db11.IDPRODUK = db1.IDPRODUK
                                LEFT JOIN ((SELECT IDPRODUK, dby1.IDPROMO
                                            FROM masterpromo dby1
                                            JOIN masterpromo_konsinyasi dby2 ON dby1.IDPROMO=dby2.IDPROMO
                                            JOIN masterpromo_konsinyasi_dataproduk dby3 ON dby1.IDPROMO=dby3.IDPROMO
                                            WHERE CURDATE() BETWEEN STARTPROMO AND ENDPROMO) AS db12) ON db12.IDPRODUK=db1.IDPRODUK
                                WHERE db4.IDOUTLET= :idoutlet AND (NAMAPRODUK LIKE :search1 OR 
                                                            NAMAPRODUK IN (SELECT NAMAPRODUK
                                                                            FROM masterproduk_dataproduk dbx1
                                                                            JOIN masterproduk_relasi dbx2 on dbx1.IDPRODUK=dbx2.IDPRODUK
                                                                            JOIN masterproduk_varian dbx3 ON dbx2.IDPRODUK_VAR=dbx3.IDPRODUK_VAR
                                                                            WHERE BARCODE LIKE :search2))
                                    AND db3.IDPRODUK_VAR != '0.0.0' AND db1.STATUSKEAKTIFAN = 1
                                    AND db1.IDPRODUK NOT IN ((SELECT IDPRODUK FROM masterproduk_konsinyasi))
                                    AND db1.IDKATEGORIPRODUK LIKE :idkategori " .$stokoption.
                                " GROUP BY db1.IDPRODUK) AS DBTEMP)";
          $sql = "SELECT  db1.IDPRODUK, NAMAPRODUK, SUM(JUMLAH) AS JUMLAHSTOKPRODUK, MIN(HARGAJUAL) AS HARGAPRODUKMIN, MAX(HARGAJUAL) AS HARGAPRODUKMAX,
                          COUNT(DISTINCT(VARIAN1)) AS JUMLAHVARIAN, NAMASATUANPRODUK,
                          TIPE, db1.IDKATEGORIPRODUK, NAMAKATEGORIPRODUK, db1.IDSATUANPRODUK, NAMASATUANPRODUK, BERAT, DESKRIPSIPRODUK, FOTOPRODUKUTAMA,
                          STATUSKEAKTIFAN, 0 AS IDPEMASOK, 0 AS PERSENTASEKONSINYASI,
                          IF (db10.IDPRODUK is null, 0, 1) AS ISFAVORIT,
                          IF (db11.IDPRODUK is null, 0, 1) AS ISFAVORITPELANGGAN,
                          IF (db12.IDPRODUK is null, 0, 1) AS ISPROMOKONSINYASI
                    FROM masterproduk_dataproduk db1
                    JOIN masterproduk_relasi db2 ON db1.IDPRODUK=db2.IDPRODUK
                    JOIN masterproduk_varian db3 ON db2.IDPRODUK_VAR=db3.IDPRODUK_VAR
                    JOIN stok db4 ON db3.IDPRODUK_VAR=db4.IDPRODUK_VAR
                    JOIN masterproduk_outlet db5 ON db4.IDPRODUK_VAR=db5.IDPRODUK_VAR AND db4.IDOUTLET=db5.IDOUTLET
                    JOIN mastersatuanproduk db6 ON db1.IDSATUANPRODUK=db6.IDSATUANPRODUK
                    JOIN masteroutlet_matauang db7 ON db4.IDOUTLET=db7.IDOUTLET
                    JOIN masterkategoriproduk db8 ON db1.IDKATEGORIPRODUK=db8.IDKATEGORIPRODUK
                    
                    LEFT JOIN masterproduk_favorit db10 ON db10.IDPRODUK = db1.IDPRODUK
                    LEFT JOIN masterproduk_favoritpelanggan db11 ON db11.IDPRODUK = db1.IDPRODUK
                    LEFT JOIN ((SELECT IDPRODUK, dby1.IDPROMO
                                FROM masterpromo dby1
                                JOIN masterpromo_konsinyasi dby2 ON dby1.IDPROMO=dby2.IDPROMO
                                JOIN masterpromo_konsinyasi_dataproduk dby3 ON dby1.IDPROMO=dby3.IDPROMO
                                WHERE CURDATE() BETWEEN STARTPROMO AND ENDPROMO) AS db12) ON db12.IDPRODUK=db1.IDPRODUK
                    WHERE db4.IDOUTLET= :idoutlet AND (NAMAPRODUK LIKE :search1 OR 
                                                NAMAPRODUK IN (SELECT NAMAPRODUK
                                                                FROM masterproduk_dataproduk dbx1
                                                                JOIN masterproduk_relasi dbx2 on dbx1.IDPRODUK=dbx2.IDPRODUK
                                                                JOIN masterproduk_varian dbx3 ON dbx2.IDPRODUK_VAR=dbx3.IDPRODUK_VAR
                                                                WHERE BARCODE LIKE :search2))
                        AND db3.IDPRODUK_VAR != '0.0.0' AND db1.STATUSKEAKTIFAN = 1
                        AND db1.IDPRODUK NOT IN ((SELECT IDPRODUK FROM masterproduk_konsinyasi))
                        AND db1.IDKATEGORIPRODUK LIKE :idkategori " .$stokoption.
                    " GROUP BY db1.IDPRODUK, NAMAPRODUK
                    ORDER BY NAMAPRODUK ASC
                    LIMIT ".$limit." OFFSET " . $page ;
                  }
        $order = $conn->prepare($sql);
        $orderjumlah = $conn->prepare($sqljumlah);

        $order1= $conn->prepare("SELECT SUBSTRING_INDEX(db2.IDPRODUK_VAR, '.', 2) AS IDVARIAN, SUM(JUMLAH) AS JUMLAHSTOKVARIAN, MIN(HARGAJUAL) AS HARGAMINVARIAN,
                                        MAX(HARGAJUAL) AS HARGAMAXVARIAN, VARIAN1,
                                        COUNT(SUBSTRING_INDEX(db1.IDPRODUK_VAR, '.', 2)) AS JUMLAHSUBVARIAN
                                FROM masterproduk_outlet db1
                                  JOIN stok db2 ON db1.IDPRODUK_VAR=db2.IDPRODUK_VAR AND db1.IDOUTLET=db2.IDOUTLET
                                  JOIN masterproduk_varian db3 ON db1.IDPRODUK_VAR=db3.IDPRODUK_VAR
                                WHERE db1.IDOUTLET= :idoutlet AND SUBSTRING_INDEX(db1.IDPRODUK_VAR, '.', 1)= :idproduk
                                GROUP BY SUBSTRING_INDEX(db1.IDPRODUK_VAR, '.', 2)");
        $order2= $conn->prepare("SELECT db1.IDPRODUK_VAR, HARGAJUAL, JUMLAH, VARIAN1, VARIAN2, BARCODE, NOTIFIKASIMINIMALSTOK
                                FROM masterproduk_outlet db1
                                  JOIN stok db2 ON db1.IDPRODUK_VAR=db2.IDPRODUK_VAR AND db1.IDOUTLET=db2.IDOUTLET
                                  JOIN masterproduk_varian db3 ON db1.IDPRODUK_VAR=db3.IDPRODUK_VAR
                                WHERE db1.IDOUTLET=:idoutlet AND SUBSTRING_INDEX(db1.IDPRODUK_VAR, '.', 2)=:idvarian");
        $orderfoto= $conn->prepare("SELECT NO, FOTOPRODUK
                                    FROM masterproduk_foto
                                    WHERE IDPRODUK= :idproduk");

        $order->execute(array(':idoutlet'=>$idoutlet,
                              ':search1'=>$search,
                              ':search2'=>$search,
                              ':idkategori'=>$idkategori
                            ));
        $orderjumlah->execute(array(':idoutlet'=>$idoutlet,
                                    ':search1'=>$search,
                                    ':search2'=>$search,
                                    ':idkategori'=>$idkategori
                                  ));

        $daftarproduk = array();
        while ($d = $order->fetch(PDO::FETCH_ASSOC)) {
          $idproduk = $d['IDPRODUK'];
          $order1->execute(array(	':idoutlet'=>$idoutlet,
                                  ':idproduk'=>$idproduk));
          $varian = array();
          while ($d1 = $order1->fetch(PDO::FETCH_ASSOC)) {
            $idvarian = $d1['IDVARIAN'];
            $order2->execute(array(	':idoutlet'=>$idoutlet,
                                    ':idvarian'=>$idvarian));
            $subvarian = array();
            while ($d2 = $order2->fetch(PDO::FETCH_ASSOC)) {
              $isisubvarian = array('idproduk_var'=>$d2['IDPRODUK_VAR'],
                                    'simbolmatauang'=>$matauang,
                                    'hargajual'=>$d2['HARGAJUAL'],
                                    'jumlahstok'=>$d2['JUMLAH'],
                                    'varian1'=>$d2['VARIAN1'],
                                    'varian2'=>$d2['VARIAN2'],
                                    'minstok'=>$d2['NOTIFIKASIMINIMALSTOK'],
                                    'barcode'=>$d2['BARCODE']);
              $subvarian[] = ($isisubvarian);
            }
            
            $isivarian = array('idvarian'=>$d1['IDVARIAN'],
                              'jumlahstokvarian'=>$d1['JUMLAHSTOKVARIAN'],
                              'simbolmatauang'=>$matauang,
                              'hargaminvarian'=>$d1['HARGAMINVARIAN'],
                              'hargamaxvarian'=>$d1['HARGAMAXVARIAN'],
                              'varian1'=>$d1['VARIAN1'],
                              'jumlahsubvarian'=>$d1['JUMLAHSUBVARIAN'],
                              'subvarian'=>$subvarian);
            $varian[] = ($isivarian);
          }
          $konsinyasi = $d['PERSENTASEKONSINYASI'];
          if (($konsinyasi == null) OR ($konsinyasi <= 0) OR ($konsinyasi == '')) { $iskonsinyasi = 0; } else { $iskonsinyasi = 1; }
          $idpemasok = $d['IDPEMASOK'];
          if (($idpemasok == null) OR ($idpemasok <= 0) OR ($idpemasok == '')) { $idpemasok = 0; }
          $orderfoto->execute(array(':idproduk'=>$idproduk));
          $daftarfoto = array();
          while ($dfoto = $orderfoto->fetch(PDO::FETCH_ASSOC)) {
            $daftarfoto[] = ($dfoto);
          }
          $produk = array('idproduk'=>$idproduk,
                          'namaproduk'=>$d['NAMAPRODUK'],
                          'simbolmatauang'=>$matauang,
                          'hargamaxproduk'=>$d['HARGAPRODUKMAX'],
                          'hargaminproduk'=>$d['HARGAPRODUKMIN'],
                          'jumlahvarian'=>$d['JUMLAHVARIAN'],
                          'tipe'=>$d['TIPE'],
                          'idkategoriproduk'=>$d['IDKATEGORIPRODUK'],
                          'namakategoriproduk'=>$d['NAMAKATEGORIPRODUK'],
                          'idsatuanproduk'=>$d['IDSATUANPRODUK'],
                          'namasatuanproduk'=>$d['NAMASATUANPRODUK'],
                          'berat'=>$d['BERAT'],
                          'deskripsiproduk'=>$d['DESKRIPSIPRODUK'],
                          'fotoprodukutama'=>$d['FOTOPRODUKUTAMA'],
                          'jumlahstokproduk'=>$d['JUMLAHSTOKPRODUK'],
                          'idpemasok'=>$idpemasok,
                          'iskonsinyasi'=>$iskonsinyasi,
                          'isfavorit'=>$d['ISFAVORIT'],
                          'isfavoritpelanggan'=>$d['ISFAVORITPELANGGAN'],
                          'ispromokonsinyasi'=>$d['ISPROMOKONSINYASI'],
                          'varian'=>$varian,
                          'daftarfoto'=>$daftarfoto);
          $daftarproduk[] = ($produk);
        }
        if ($djumlah = $orderjumlah->fetch(PDO::FETCH_ASSOC)) {
          $jumlahproduk = $djumlah['JUMLAHTOTALPRODUK'];
          $jumlahstoktotal = $djumlah['JUMLAHTOTALSTOK']; if ($jumlahstoktotal == null) $jumlahstoktotal = 0;
        }
        $data = array("errcode"=>"OK", "message"=>"get daftar produk berhasil", "jumlahproduk"=>$jumlahproduk, "jumlahstoktotal"=>$jumlahstoktotal,
                      "daftarproduk"=>$daftarproduk);
      }
		}
    else if ($tipe == "GET_CATATAN") {
      if ( (!(isset($req->tipecatatan))) || (!(isset($req->search))) ) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $tipecatatan = $req->tipecatatan;
        if (($tipecatatan == '') OR ($tipecatatan == 0) OR ($tipecatatan == null)) { $tipecatatan = '%%'; }
        $search = $req->search;
        if (($search == '') OR ($search == null)) { $search = '%%'; } else { $search = '%'.$search.'%'; }
        $order = $conn->prepare("SELECT IDCATATAN, TIPECATATAN, NAMACATATAN, ISICATATAN
                                FROM mastercatatan
                                WHERE (NAMACATATAN LIKE :search1 OR ISICATATAN LIKE :search2) AND TIPECATATAN LIKE :tipecatatan 
                                ORDER BY NAMACATATAN ASC");
        $order->execute(array(':search1'=>$search,
                              ':search2'=>$search,
                              ':tipecatatan'=>$tipecatatan
                        ));
        $daftarcatatan = array();
        while ($d = $order->fetch(PDO::FETCH_ASSOC)) {
          $daftarcatatan[] = ($d);
        }
        
        $data = array("errcode"=>"OK", "message"=>"get daftar catatan berhasil", "daftarcatatan"=>$daftarcatatan);
      }
    }
    else if ($tipe == "UPDATE_CATATAN") {
      if ( (!(isset($req->tipecatatan))) || (!(isset($req->namacatatan)))  || (!(isset($req->isicatatan))) || (!(isset($req->statuskeaktifan))) ||
            (!(isset($req->idcatatan))) ) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $idcatatan = $req->idcatatan;
        $tipecatatan = $req->tipecatatan;
        $namacatatan = $req->namacatatan;
        $isicatatan = $req->isicatatan;
        $statuskeaktifan = $req->statuskeaktifan;
        $order = $conn->prepare("UPDATE mastercatatan SET TIPECATATAN= :tipecatatan, NAMACATATAN= :namacatatan, ISICATATAN= :isicatatan,
                                                          STATUSKEAKTIFAN= :statuskeaktifan, LASTUPDATE= :lastupdate, LASTUPDATEBY= :lastupdateby
                                WHERE IDCATATAN= :idcatatan");
        $order->execute(array(':tipecatatan'=>$tipecatatan,
                              ':namacatatan'=>$namacatatan,
                              ':isicatatan'=>$isicatatan,
                              ':statuskeaktifan'=>$statuskeaktifan,
                              ':lastupdate'=>$waktunow,
                              ':lastupdateby'=>$idpengguna,
                              ':idcatatan'=>$idcatatan
                        ));
        $data = array("errcode"=>"OK", "message"=>"update catatan berhasil");
      }
    }
    else if ($tipe == "ADD_CATATAN") {
      if ( (!(isset($req->tipecatatan))) || (!(isset($req->namacatatan)))  || (!(isset($req->isicatatan))) ) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $tipecatatan = $req->tipecatatan;
        $namacatatan = $req->namacatatan;
        $isicatatan = $req->isicatatan;
        $statuskeaktifan = 1;
        $order = $conn->prepare("INSERT INTO mastercatatan (TIPECATATAN, NAMACATATAN, ISICATATAN, STATUSKEAKTIFAN, CREATEDON, CREATEDBY, LASTUPDATE, LASTUPDATEBY)
                                                    VALUES (:tipecatatan,:namacatatan,:isicatatan,:statuskeaktifan,:createdon,:createdby,:lastupdate,:lastupdateby)");
        $order->execute(array(':tipecatatan'=>$tipecatatan,
                              ':namacatatan'=>$namacatatan,
                              ':isicatatan'=>$isicatatan,
                              ':statuskeaktifan'=>$statuskeaktifan,
                              ':createdon'=>$waktunow,
                              ':createdby'=>$idpengguna,
                              ':lastupdate'=>$waktunow,
                              ':lastupdateby'=>$idpengguna
                        ));
        $data = array("errcode"=>"OK", "message"=>"add catatan berhasil");
      }
    }
    else if ($tipe == "DELETE_CATATAN") {
      if (!(isset($req->listidcatatan))) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $listidcatatan = $req->listidcatatan;
        
        $order = $conn->prepare("DELETE FROM mastercatatan WHERE IDCATATAN= :idcatatan");
        foreach ($listidcatatan AS $x) {
          $order->execute(array(':idcatatan'=>$x));
        }
        $data = array("errcode"=>"OK", "message"=>"delete catatan berhasil");
      }
		}
    else if ($tipe == "GET_KATEGORIPELANGGAN") {
      $order = $conn->prepare("SELECT IDKATEGORIPELANGGAN, NAMAKATEGORIPELANGGAN
                              FROM masterkategoripelanggan
                              ORDER BY IDKATEGORIPELANGGAN ASC");
      $order->execute();
      $daftarkategoripelanggan = array();
      while ($d = $order->fetch(PDO::FETCH_ASSOC)) {
        $daftarkategoripelanggan[] = ($d);
      }
      
      $data = array("errcode"=>"OK", "message"=>"get daftar kategori pelanggan berhasil", "daftarkategoripelanggan"=>$daftarkategoripelanggan);
    }
    else if ($tipe == "UPDATE_KATEGORIPELANGGAN") {
      if ( (!(isset($req->idkategoripelanggan))) || (!(isset($req->namakategoripelanggan))) ) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $namakategoripelanggan = $req->namakategoripelanggan;
        $idkategoripelanggan = $req->idkategoripelanggan;
        if ($idkategoripelanggan != 1) {
          $order = $conn->prepare("UPDATE masterkategoripelanggan SET NAMAKATEGORIPELANGGAN= :namakategoripelanggan
                                  WHERE IDKATEGORIPELANGGAN= :idkategoripelanggan");
          $order->execute(array(':namakategoripelanggan'=>$namakategoripelanggan,
                                ':idkategoripelanggan'=>$idkategoripelanggan
                          ));
          $order = $conn->prepare("UPDATE listtableupdated SET TANGGAl= :tanggal
                                  WHERE NAMATABEL='masterkategoripelanggan'");
          $order->execute(array(':tanggal'=>$waktunow));
        }
        $data = array("errcode"=>"OK", "message"=>"update kategori pelanggan berhasil");
      }
    }
    else if ($tipe == "ADD_KATEGORIPELANGGAN") {
      if (!(isset($req->namakategoripelanggan))) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $namakategoripelanggan = $req->namakategoripelanggan;
        
        $order = $conn->prepare("INSERT INTO masterkategoripelanggan (NAMAKATEGORIPELANGGAN)
                                                              VALUES (:namakategoripelanggan)");
        $order->execute(array(':namakategoripelanggan'=>$namakategoripelanggan));
        $order = $conn->prepare("UPDATE listtableupdated SET TANGGAl= :tanggal
                                WHERE NAMATABEL='masterkategoripelanggan'");
        $order->execute(array(':tanggal'=>$waktunow));
        $data = array("errcode"=>"OK", "message"=>"add kategori pelanggan berhasil");
      }
    }
    else if ($tipe == "GET_KATEGORIPRODUK") {
      $order = $conn->prepare("SELECT IDKATEGORIPRODUK, NAMAKATEGORIPRODUK
                              FROM masterkategoriproduk
                              ORDER BY IDKATEGORIPRODUK ASC");
      $order->execute();
      $daftarkategoriproduk = array();
      while ($d = $order->fetch(PDO::FETCH_ASSOC)) {
        $daftarkategoriproduk[] = ($d);
      }
      
      $data = array("errcode"=>"OK", "message"=>"get daftar kategori produk berhasil", "daftarkategoriproduk"=>$daftarkategoriproduk);
    }
    else if ($tipe == "UPDATE_KATEGORIPRODUK") {
      if ( (!(isset($req->idkategoriproduk))) || (!(isset($req->namakategoriproduk))) ) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $namakategoriproduk = $req->namakategoriproduk;
        $idkategoriproduk = $req->idkategoriproduk;
        $order = $conn->prepare("UPDATE masterkategoriproduk SET NAMAKATEGORIPRODUK= :namakategoriproduk
                                WHERE IDKATEGORIPRODUK= :idkategoriproduk");
        $order->execute(array(':namakategoriproduk'=>$namakategoriproduk,
                              ':idkategoriproduk'=>$idkategoriproduk
                        ));
        $order = $conn->prepare("UPDATE listtableupdated SET TANGGAl= :tanggal
                                WHERE NAMATABEL='masterkategoriproduk'");
        $order->execute(array(':tanggal'=>$waktunow));
        $data = array("errcode"=>"OK", "message"=>"update kategori produk berhasil");
      }
    }
    else if ($tipe == "ADD_KATEGORIPRODUK") {
      if (!(isset($req->namakategoriproduk))) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $namakategoriproduk = $req->namakategoriproduk;
        
        $order = $conn->prepare("INSERT INTO masterkategoriproduk (NAMAKATEGORIPRODUK)
                                                              VALUES (:namakategoriproduk)");
        $order->execute(array(':namakategoriproduk'=>$namakategoriproduk));
        $order = $conn->prepare("UPDATE listtableupdated SET TANGGAl= :tanggal
                                WHERE NAMATABEL='masterkategoriproduk'");
        $order->execute(array(':tanggal'=>$waktunow));
        $data = array("errcode"=>"OK", "message"=>"add kategori produk berhasil");
      }
    }
    else if ($tipe == "GET_KONTRAKPENJUALAN") {
      if ( (!(isset($req->idoutlet))) || (!(isset($req->statuskontrak))) ) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $idoutlet = $req->idoutlet;
        $statuskontrak = $req->statuskontrak;
        if (($statuskontrak == '') OR ($statuskontrak == null)) { $statuskontrak = '%%'; }
        $order = $conn->prepare("SELECT NOKONTRAKPENJUALAN, IDOUTLET, TANGGAL, db1.IDPELANGGAN, NAMAPELANGGAN, IDSALES, NAMAPENGGUNA, KURS,
                                        IDSATUANHARGA, SUBTOTAL, USESERVIS, BIAYASERVIS, SERVISWITHTAX, TOTALSERVIS, USETAX, PERSENTASEPAJAK, TOTALTAX,
                                        TOTALHARGA, db1.STATUSKEAKTIFAN
                                FROM kontrakpenjualan db1
                                  JOIN masterpelanggan db2 ON db1.IDPELANGGAN=db2.IDPELANGGAN
                                  LEFT JOIN masterpengguna db3 ON db1.IDSALES=db3.IDPENGGUNA
                                WHERE db1.STATUSKEAKTIFAN LIKE :statuskontrak AND IDOUTLET= :idoutlet
                                ORDER BY NOKONTRAKPENJUALAN ASC");
        $order->execute(array(':statuskontrak'=>$statuskontrak,
                              ':idoutlet'=>$idoutlet ));
        $order1 = $conn->prepare("SELECT  db1.IDPRODUK_VAR, IDPRODUK, NAMAPRODUK, IDKATEGORIPRODUK, IDSATUANPRODUK, BERAT, DESKRIPSIPRODUK, FOTOPRODUKUTAMA,
                                          JUMLAH, JUMLAH_KIRIM, JUMLAH_RETUR, HARGAJUAL, CATATAN, VARIAN1, VARIAN2, FOTOPRODUK, BARCODE
                                  FROM kontrakpenjualan_dataproduk db1
                                  JOIN masterproduk_dataproduk db2 ON SUBSTRING_INDEX(db1.IDPRODUK_VAR, '.', 1) = db2.IDPRODUK
                                  JOIN masterproduk_varian db3 ON db1.IDPRODUK_VAR = db3.IDPRODUK_VAR
                                  WHERE NOKONTRAKPENJUALAN= :nokontrakpenjualan");
        $daftarkontrakpenjualan = array();
        while ($d = $order->fetch(PDO::FETCH_ASSOC)) {
          $nokontrakpenjualan = $d['NOKONTRAKPENJUALAN'];
          $order1->execute(array(':nokontrakpenjualan'=>$nokontrakpenjualan ));
          $dataproduk = array();
          while ($d1 = $order1->fetch(PDO::FETCH_ASSOC)) {
            $isiproduk = array('idproduk_var'=>$d1['IDPRODUK_VAR'],
                              'idproduk'=>$d1['IDPRODUK'],
                              'namaproduk'=>$d1['NAMAPRODUK'],
                              'idkategoriproduk'=>$d1['IDKATEGORIPRODUK'],
                              'idsatuanproduk'=>$d1['IDSATUANPRODUK'],
                              'berat'=>$d1['BERAT'],
                              'deskripsiproduk'=>$d1['DESKRIPSIPRODUK'],
                              'fotoprodukutama'=>$d1['FOTOPRODUKUTAMA'],
                              'jumlah'=>$d1['JUMLAH'],
                              'jumlah_kirim'=>$d1['JUMLAH_KIRIM'],
                              'jumlah_retur'=>$d1['JUMLAH_RETUR'],
                              'hargajual'=>$d1['HARGAJUAL'],
                              'catatan'=>$d1['CATATAN'],
                              'varian1'=>$d1['VARIAN1'],
                              'varian2'=>$d1['VARIAN2'],
                              'fotoproduk'=>$d1['FOTOPRODUK'],
                              'barcode'=>$d1['BARCODE']
                              );
            $dataproduk[] = ($isiproduk);
          }
          $idsales = $d['IDSALES'];
          if (($idsales == '') OR ($idsales == null)) { $namasales = ''; } else { $namasales = $d['NAMAPENGGUNA']; }
          $kontrakpenjualan = array('nokontrakpenjualan'=>$nokontrakpenjualan,
                                    'tanggal'=>$d['TANGGAL'],
                                    'idpelanggan'=>$d['IDPELANGGAN'],
                                    'namapelanggan'=>$d['NAMAPELANGGAN'],
                                    'idsales'=>$idsales,
                                    'namasales'=>$namasales,
                                    'kurs'=>$d['KURS'],
                                    'idsatuanharga'=>$d['IDSATUANHARGA'],
                                    'subtotal'=>$d['SUBTOTAL'],
                                    'useservis'=>$d['USESERVIS'],
                                    'biayaservis'=>$d['BIAYASERVIS'],
                                    'serviswithtax'=>$d['SERVISWITHTAX'],
                                    'totalservis'=>$d['TOTALSERVIS'],
                                    'usetax'=>$d['USETAX'],
                                    'persentasepajak'=>$d['PERSENTASEPAJAK'],
                                    'totaltax'=>$d['TOTALTAX'],
                                    'totalharga'=>$d['TOTALHARGA'],
                                    'statuskeaktifan'=>$d['STATUSKEAKTIFAN'],
                                    'produk'=>$dataproduk);
          $daftarkontrakpenjualan[] = ($kontrakpenjualan);
        }
        
        $data = array("errcode"=>"OK", "message"=>"get kontrak penjualan berhasil", "daftarkontrakpenjualan"=>$daftarkontrakpenjualan);
      }
    }
		else if ($tipe == "GET_PELANGGAN") {
      if ( (!(isset($req->search))) || (!(isset($req->isactive))) ) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $search = $req->search;
        if (($search == '') OR ($search == null)) { $search = '%%'; } else { $search = '%'.$search.'%'; }
        $isactive = $req->isactive;
        if (($isactive == '') OR ($isactive == null)) { $isactive = '%%'; } else { $isactive = '1'; }
        $order = $conn->prepare("SELECT IDPELANGGAN, NAMAPELANGGAN, IDBADANUSAHA, IDKATEGORIPELANGGAN,  CP, TELEPON1, TELEPON2, FAX, HP1, HP2,
                                        EMAIL, ALAMAT, KODEPOS, IDNEGARA, PROPINSI, KOTA, KECAMATAN, STATUSKEAKTIFANPIUTANG, LIMITPIUTANG,
                                        TEMPOPIUTANG, IDBANK, NOREKENING, NAMAREKENING, KABUPATENBANK, IDNEGARABANK, SISASALDODP, SISAPIUTANG,
                                        SISAPROMOPOIN, KODEKONFIRMASI, STATUSKONFIRMASI, STATUSKEAKTIFAN
                                FROM masterpelanggan
                                WHERE namapelanggan LIKE :search1 OR HP1 LIKE :search2 OR EMAIL LIKE :search3 AND STATUSKEAKTIFAN LIKE :isactive
                                ORDER BY NAMAPELANGGAN ASC");
        $order->execute(array(':search1'=>$search,
                              ':search2'=>$search,
                              ':search3'=>$search,
                              ':isactive'=>$isactive
                        ));
        $daftarpelanggan = array();
        while ($d = $order->fetch(PDO::FETCH_ASSOC)) {
          $daftarpelanggan[] = ($d);
        }
        $data = array("errcode"=>"OK", "message"=>"get daftar pelanggan berhasil", "daftarpelanggan"=>$daftarpelanggan);
      }
    }
    else if ($tipe == "UPDATE_PELANGGAN") {
      if ( (!(isset($req->idbadanusaha))) || (!(isset($req->idkategoripelanggan))) || (!(isset($req->namapelanggan))) || (!(isset($req->cp))) ||
            (!(isset($req->telepon1))) || (!(isset($req->telepon2))) || (!(isset($req->fax))) || (!(isset($req->hp1))) || (!(isset($req->hp2))) ||
            (!(isset($req->email))) || (!(isset($req->alamat))) || (!(isset($req->kodepos))) || (!(isset($req->idnegara))) || (!(isset($req->propinsi))) ||
            (!(isset($req->kota))) || (!(isset($req->kecamatan))) || (!(isset($req->idbank))) || (!(isset($req->norekening))) ||
            (!(isset($req->namarekening))) || (!(isset($req->kabupatenbank))) || (!(isset($req->idnegarabank))) ||
            (!(isset($req->idpelanggan))) || (!(isset($req->statuskeaktifan))) ) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $idbadanusaha = $req->idbadanusaha;
        $idkategoripelanggan = $req->idkategoripelanggan;
        $namapelanggan = $req->namapelanggan;
        $cp = $req->cp;
        $telepon1 = $req->telepon1;
        $telepon2 = $req->telepon2;
        $fax = $req->fax;
        $hp1 = $req->hp1;
        $hp2 = $req->hp2;
        $email = $req->email;
        $alamat = $req->alamat;
        $kodepos = $req->kodepos;
        $idnegara = $req->idnegara;
        $propinsi = $req->propinsi;
        $kota = $req->kota;
        $kecamatan = $req->kecamatan;
        $idbank = $req->idbank;
        $norekening = $req->norekening;
        $namarekening = $req->namarekening;
        $kabupatenbank = $req->kabupatenbank;
        $idnegarabank = $req->idnegarabank;
        $idpelanggan = $req->idpelanggan;
        $statuskeaktifan = $req->statuskeaktifan;
        $order = $conn->prepare("UPDATE masterpelanggan SET IDBADANUSAHA= :idbadanusaha, IDKATEGORIPELANGGAN= :idkategoripelanggan, NAMAPELANGGAN= :namapelanggan,
                                                            CP= :cp, TELEPON1= :telepon1, TELEPON2= :telepon2, FAX= :fax, HP1= :hp1, HP2= :hp2, EMAIL= :email,
                                                            ALAMAT= :alamat, KODEPOS= :kodepos, IDNEGARA= :idnegara, PROPINSI= :propinsi, KOTA= :kota,
                                                            KECAMATAN= :kecamatan, IDBANK= :idbank, NOREKENING= :norekening, NAMAREKENING= :namamarketing,
                                                            KABUPATENBANK= :kabupatenbank, IDNEGARABANK= :idnegarabank, STATUSKEAKTIFAN= :statuskeaktifan,
                                                            LASTUPDATE= :lastupdate, LASTUPDATEBY= :lastupdateby
                                WHERE IDPELANGGAN= :idpelanggan");
        $order->execute(array(':idbadanusaha'=>$idbadanusaha,
                              ':idkategoripelanggan'=>$idkategoripelanggan,
                              ':namapelanggan'=>$namapelanggan,
                              ':cp'=>$cp,
                              ':telepon1'=>$telepon1,
                              ':telepon2'=>$telepon2,
                              ':fax'=>$fax,
                              ':hp1'=>$hp1,
                              ':hp2'=>$hp2,
                              ':email'=>$email,
                              ':alamat'=>$alamat,
                              ':kodepos'=>$kodepos,
                              ':idnegara'=>$idnegara,
                              ':propinsi'=>$propinsi,
                              ':kota'=>$kota,
                              ':kecamatan'=>$kecamatan,
                              ':idbank'=>$idbank,
                              ':norekening'=>$norekening,
                              ':namamarketing'=>$namamarketing,
                              ':kabupatenbank'=>$kabupatenbank,
                              ':idnegarabank'=>$idnegarabank,
                              ':statuskeaktifan'=>$statuskeaktifan,
                              ':lastupdate'=>$waktunow,
                              ':lastupdateby'=>$idpengguna,
                              ':idpelanggan'=>$idpelanggan
                        ));
        $order = $conn->prepare("UPDATE listtableupdated SET TANGGAl= :tanggal
                                WHERE NAMATABEL='masterpelanggan'");
        $order->execute(array(':tanggal'=>$waktunow));
        $data = array("errcode"=>"OK", "message"=>"update pelanggan berhasil");
      }
    }
    else if ($tipe == "ADD_PELANGGAN") {
      if ( (!(isset($req->idbadanusaha))) || (!(isset($req->idkategoripelanggan))) || (!(isset($req->namapelanggan))) || (!(isset($req->cp))) ||
            (!(isset($req->telepon1))) || (!(isset($req->telepon2))) || (!(isset($req->fax))) || (!(isset($req->hp1))) || (!(isset($req->hp2))) ||
            (!(isset($req->email))) || (!(isset($req->alamat))) || (!(isset($req->kodepos))) || (!(isset($req->idnegara))) || (!(isset($req->propinsi))) ||
            (!(isset($req->kota))) || (!(isset($req->kecamatan))) || (!(isset($req->idbank))) || (!(isset($req->norekening))) ||
            (!(isset($req->namarekening))) || (!(isset($req->kabupatenbank))) || (!(isset($req->idnegarabank))) ) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $idbadanusaha = $req->idbadanusaha;
        $idkategoripelanggan = $req->idkategoripelanggan;
        $namapelanggan = $req->namapelanggan;
        $cp = $req->cp;
        $telepon1 = $req->telepon1;
        $telepon2 = $req->telepon2;
        $fax = $req->fax;
        $hp1 = $req->hp1;
        $hp2 = $req->hp2;
        $email = $req->email;
        $alamat = $req->alamat;
        $kodepos = $req->kodepos;
        $idnegara = $req->idnegara;
        $propinsi = $req->propinsi;
        $kota = $req->kota;
        $kecamatan = $req->kecamatan;
        $idbank = $req->idbank;
        $norekening = $req->norekening;
        $namarekening = $req->namarekening;
        $kabupatenbank = $req->kabupatenbank;
        $idnegarabank = $req->idnegarabank;
        
        $order = $conn->prepare("INSERT INTO masterpelanggan (IDBADANUSAHA, IDKATEGORIPELANGGAN, NAMAPELANGGAN, CP, TELEPON1, TELEPON2, FAX,
                                                              HP1, HP2, EMAIL, ALAMAT, KODEPOS, IDNEGARA, PROPINSI, KOTA, KECAMATAN,
                                                              IDBANK, NOREKENING, NAMAREKENING, KABUPATENBANK, IDNEGARABANK, STATUSKEAKTIFAN,
                                                              CREATEDON, CREATEDBY, LASTUPDATE, LASTUPDATEBY)
                                                      VALUES (:idbadanusaha,:idkategoripelanggan,:namapelanggan,:cp,:telepon1,:telepon2,:fax,
                                                              :hp1,:hp2,:email,:alamat,:kodepos,:idnegara,:propinsi,:kota,:kecamatan,
                                                              :idbank,:norekening,:namarekening,:kabupatenbank,:idnegarabank,:statuskeaktifan,
                                                              :createdon,:createdby,:lastupdate,:lastupdateby)");
        $order->execute(array(':idbadanusaha'=>$idbadanusaha,
                              ':idkategoripelanggan'=>$idkategoripelanggan,
                              ':namapelanggan'=>$namapelanggan,
                              ':cp'=>$cp,
                              ':telepon1'=>$telepon1,
                              ':telepon2'=>$telepon2,
                              ':fax'=>$fax,
                              ':hp1'=>$hp1,
                              ':hp2'=>$hp2,
                              ':email'=>$email,
                              ':alamat'=>$alamat,
                              ':kodepos'=>$kodepos,
                              ':idnegara'=>$idnegara,
                              ':propinsi'=>$propinsi,
                              ':kota'=>$kota,
                              ':kecamatan'=>$kecamatan,
                              ':idbank'=>$idbank,
                              ':norekening'=>$norekening,
                              ':namarekening'=>$namarekening,
                              ':kabupatenbank'=>$kabupatenbank,
                              ':idnegarabank'=>$idnegarabank,
                              ':statuskeaktifan'=>1,
                              ':createdon'=>$waktunow,
                              ':createdby'=>$idpengguna,
                              ':lastupdate'=>$waktunow,
                              ':lastupdateby'=>$idpengguna
                        ));
        $order = $conn->prepare("UPDATE listtableupdated SET TANGGAl= :tanggal
                                WHERE NAMATABEL='masterpelanggan'");
        $order->execute(array(':tanggal'=>$waktunow));
        $data = array("errcode"=>"OK", "message"=>"add pelanggan berhasil");
      }
    }
    else if ($tipe == "UPDATE_PELANGGANSTATUSKEAKTIFAN") {
      if ( (!(isset($req->idpelanggan))) || (!(isset($req->statuskeaktifan))) ) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $idpelanggan = $req->idpelanggan;
        $statuskeaktifan = $req->statuskeaktifan;
        $order = $conn->prepare("UPDATE masterpelanggan SET STATUSKEAKTIFAN= :statuskeaktifan, LASTUPDATE= :lastupdate, LASTUPDATEBY= :lastupdateby
                                WHERE IDPELANGGAN= :idpelanggan");
        $order->execute(array(':statuskeaktifan'=>$statuskeaktifan,
                              ':lastupdate'=>$waktunow,
                              ':lastupdateby'=>$idpengguna,
                              ':idpelanggan'=>$idpelanggan
                        ));
        $order = $conn->prepare("UPDATE listtableupdated SET TANGGAl= :tanggal
                        WHERE NAMATABEL='masterpelanggan'");
        $order->execute(array(':tanggal'=>$waktunow));
        $data = array("errcode"=>"OK", "message"=>"get status pelanggan berhasil");
      }
    }
    else if ($tipe == "GET_LOGISTIK") {
      if (!(isset($req->isactive))) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $isactive = $req->isactive;
        if (($isactive == '') OR ($isactive == null) OR ($isactive > 1)) { $isactive = '%%'; }
        $order = $conn->prepare("SELECT IDLOGISTIK, NAMALOGISTIK, STATUSKEAKTIFAN
                                FROM masterlogistik
                                WHERE STATUSKEAKTIFAN LIKE :isactive
                                ORDER BY NAMALOGISTIK ASC");
        $order->execute(array(':isactive'=>$isactive));
        $daftarlogistik = array();
        while ($d = $order->fetch(PDO::FETCH_ASSOC)) {
          $daftarlogistik[] = ($d);
        }
        
        $data = array("errcode"=>"OK", "message"=>"get daftar logistik", "daftarlogistik"=>$daftarlogistik);
      }
    }
    else if ($tipe == "UPDATE_LOGISTIK") {
      if ( (!(isset($req->statuskeaktifan))) || (!(isset($req->idlogistik))) ) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $statuskeaktifan = $req->statuskeaktifan;
        $idlogistik = $req->idlogistik;
        $order = $conn->prepare("UPDATE masterlogistik SET  STATUSKEAKTIFAN= :statuskeaktifan
                                WHERE IDLOGISTIK= :idlogistik");
        $order->execute(array('statuskeaktifan'=>$statuskeaktifan,
                              ':idlogistik'=>$idlogistik
                        ));
        $order = $conn->prepare("UPDATE listtableupdated SET TANGGAl= :tanggal
                                WHERE NAMATABEL='masterlogistik'");
        $order->execute(array(':tanggal'=>$waktunow));
        $data = array("errcode"=>"OK", "message"=>"update logistik berhasil");
      }
    }
    else if ($tipe == "GET_PEMASOK") {
      if (!(isset($req->isactive))) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $isactive = $req->isactive;
        if ($isactive == 1) { $isactive = '1'; } else { $isactive = '%%'; }
        $order = $conn->prepare("SELECT IDPEMASOK, NAMAPEMASOK, IDBADANUSAHA, CP, TELEPON1, TELEPON2, FAX, HP1, HP2, EMAIL, ALAMAT, KODEPOS,
                                        IDNEGARA, PROPINSI, KOTA, KECAMATAN, TEMPOHUTANG, IDBANK, NOREKENING, NAMAREKENING, KABUPATENBANK,
                                        IDNEGARABANK, STATUSKEAKTIFAN
                                FROM masterpemasok
                                WHERE STATUSKEAKTIFAN LIKE :isactive
                                ORDER BY NAMAPEMASOK ASC");
        $order->execute(array(':isactive'=>$isactive));
        $daftarpemasok = array();
        while ($d = $order->fetch(PDO::FETCH_ASSOC)) {
          $daftarpemasok[] = ($d);
        }
        
        $data = array("errcode"=>"OK", "message"=>"get daftar pemasok berhasil", "daftarpemasok"=>$daftarpemasok);
      }                
    }
    else if ($tipe == "UPDATE_PEMASOK") {
      if ( (!(isset($req->namapemasok))) || (!(isset($req->idbadanusaha))) || (!(isset($req->cp))) || (!(isset($req->telepon1))) ||
            (!(isset($req->telepon2))) || (!(isset($req->fax))) || (!(isset($req->hp1))) || (!(isset($req->hp2))) || (!(isset($req->email))) ||
            (!(isset($req->alamat))) || (!(isset($req->kodepos))) || (!(isset($req->idnegara))) || (!(isset($req->propinsi))) ||
            (!(isset($req->kota))) || (!(isset($req->kecamatan))) || (!(isset($req->tempohutang))) || (!(isset($req->idbank))) ||
            (!(isset($req->norekening))) || (!(isset($req->namarekening))) || (!(isset($req->kabupatenbank))) || (!(isset($req->idnegarabank))) ||
            (!(isset($req->idpemasok))) || (!(isset($req->statuskeaktifan))) ) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $namapemasok = $req->namapemasok;
        $idbadanusaha = $req->idbadanusaha;
        $cp = $req->cp;
        $telepon1 = $req->telepon1;
        $telepon2 = $req->telepon2;
        $fax = $req->fax;
        $hp1 = $req->hp1;
        $hp2 = $req->hp2;
        $email = $req->email;
        $alamat = $req->alamat;
        $kodepos = $req->kodepos;
        $idnegara = $req->idnegara;
        $propinsi = $req->propinsi;
        $kota = $req->kota;
        $kecamatan = $req->kecamatan;
        $tempohutang = $req->tempohutang;
        $idbank = $req->idbank;
        $norekening = $req->norekening;
        $namarekening = $req->namarekening;
        $kabupatenbank = $req->kabupatenbank;
        $idnegarabank = $req->idnegarabank;
        $statuskeaktifan = $req->statuskeaktifan;
        $idpemasok = $req->idpemasok;
        $order = $conn->prepare("UPDATE masterpemasok SET NAMAPEMASOK= :namapemasok, IDBADANUSAHA= :idbadanusaha, CP= :cp, TELEPON1= :telepon1,
                                                          TELEPON2= :telepon2, FAX= :fax, HP1= :hp1, HP2= :hp2, EMAIL= :email, ALAMAT= :alamat,
                                                          KODEPOS= :kodepos, IDNEGARA= :idnegara, PROPINSI= :propinsi, KOTA= :kota,
                                                          KECAMATAN= :kecamatan, TEMPOHUTANG= :tempohutang, IDBANK= :idbank,
                                                          NOREKENING= :norekening, NAMAREKENING= :namarekening, KABUPATENBANK= :kabupatenbank,
                                                          IDNEGARABANK= :idnegarabank, STATUSKEAKTIFAN= :statuskeaktifan,
                                                          LASTUPDATE= :lastupdate, LASTUPDATEBY= :lastupdateby
                                WHERE IDPEMASOK= :idpemasok");
        $order->execute(array(':namapemasok'=>$namapemasok,
                              ':idbadanusaha'=>$idbadanusaha,
                              ':cp'=>$cp,
                              ':telepon1'=>$telepon1,
                              ':telepon2'=>$telepon2,
                              ':fax'=>$fax,
                              ':hp1'=>$hp1,
                              ':hp2'=>$hp2,
                              ':email'=>$email,
                              ':alamat'=>$alamat,
                              ':kodepos'=>$kodepos,
                              ':idnegara'=>$idnegara,
                              ':propinsi'=>$propinsi,
                              ':kota'=>$kota,
                              ':kecamatan'=>$kecamatan,
                              ':tempohutang'=>$tempohutang,
                              ':idbank'=>$idbank,
                              ':norekening'=>$norekening,
                              ':namarekening'=>$namarekening,
                              ':kabupatenbank'=>$kabupatenbank,
                              ':idnegarabank'=>$idnegarabank,
                              ':statuskeaktifan'=>$statuskeaktifan,
                              ':lastupdate'=>$waktunow,
                              ':lastupdateby'=>$idpengguna,
                              ':idpemasok'=>$idpemasok
                        ));
        $order = $conn->prepare("UPDATE listtableupdated SET TANGGAl= :tanggal
                                WHERE NAMATABEL='masterpemasok'");
        $order->execute(array(':tanggal'=>$waktunow));
        $data = array("errcode"=>"OK", "message"=>"update pemasok berhasil");
      }
    }
    else if ($tipe == "ADD_PEMASOK") {
      if ( (!(isset($req->namapemasok))) || (!(isset($req->idbadanusaha))) || (!(isset($req->cp))) || (!(isset($req->telepon1))) ||
            (!(isset($req->telepon2))) || (!(isset($req->fax))) || (!(isset($req->hp1))) || (!(isset($req->hp2))) || (!(isset($req->email))) ||
            (!(isset($req->alamat))) || (!(isset($req->kodepos))) || (!(isset($req->idnegara))) || (!(isset($req->propinsi))) ||
            (!(isset($req->kota))) || (!(isset($req->kecamatan))) || (!(isset($req->tempohutang))) || (!(isset($req->idbank))) ||
            (!(isset($req->norekening))) || (!(isset($req->namarekening))) || (!(isset($req->kabupatenbank))) || (!(isset($req->idnegarabank))) ) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $namapemasok = $req->namapemasok;
        $idbadanusaha = $req->idbadanusaha;
        $cp = $req->cp;
        $telepon1 = $req->telepon1;
        $telepon2 = $req->telepon2;
        $fax = $req->fax;
        $hp1 = $req->hp1;
        $hp2 = $req->hp2;
        $email = $req->email;
        $alamat = $req->alamat;
        $kodepos = $req->kodepos;
        $idnegara = $req->idnegara;
        $propinsi = $req->propinsi;
        $kota = $req->kota;
        $kecamatan = $req->kecamatan;
        $tempohutang = $req->tempohutang;
        $idbank = $req->idbank;
        $norekening = $req->norekening;
        $namarekening = $req->namarekening;
        $kabupatenbank = $req->kabupatenbank;
        $idnegarabank = $req->idnegarabank;
        
        $order = $conn->prepare("INSERT INTO masterpemasok (NAMAPEMASOK, IDBADANUSAHA, CP, TELEPON1, TELEPON2, FAX, HP1, HP2, EMAIL, ALAMAT,
                                                            KODEPOS, IDNEGARA, PROPINSI, KOTA, KECAMATAN, TEMPOHUTANG, IDBANK, NOREKENING,
                                                            NAMAREKENING, KABUPATENBANK, IDNEGARABANK, STATUSKEAKTIFAN,
                                                            CREATEDON, CREATEDBY, LASTUPDATE, LASTUPDATEBY)
                                                    VALUES (:namapemasok,:idbadanusaha,:cp,:telepon1,:telepon2,:fax,:hp1,:hp2,:email,:alamat,
                                                            :kodepos,:idnegara,:propinsi,:kota,:kecamatan,:tempohutang,:idbank,:norekening,
                                                            :namarekening,:kabupatenbank,:idnegarabank,:statuskeaktifan,
                                                            :createdon,:createdby,:lastupdate,:lastupdateby)");
        $order->execute(array(':namapemasok'=>$namapemasok,
                              ':idbadanusaha'=>$idbadanusaha,
                              ':cp'=>$cp,
                              ':telepon1'=>$telepon1,
                              ':telepon2'=>$telepon2,
                              ':fax'=>$fax,
                              ':hp1'=>$hp1,
                              ':hp2'=>$hp2,
                              ':email'=>$email,
                              ':alamat'=>$alamat,
                              ':kodepos'=>$kodepos,
                              ':idnegara'=>$idnegara,
                              ':propinsi'=>$propinsi,
                              ':kota'=>$kota,
                              ':kecamatan'=>$kecamatan,
                              ':tempohutang'=>$tempohutang,
                              ':idbank'=>$idbank,
                              ':norekening'=>$norekening,
                              ':namarekening'=>$namarekening,
                              ':kabupatenbank'=>$kabupatenbank,
                              ':idnegarabank'=>$idnegarabank,
                              ':statuskeaktifan'=>1,
                              ':createdon'=>$waktunow,
                              ':createdby'=>$idpengguna,
                              ':lastupdate'=>$waktunow,
                              ':lastupdateby'=>$idpengguna
                        ));
        $order = $conn->prepare("UPDATE listtableupdated SET TANGGAl= :tanggal
                                WHERE NAMATABEL='masterpemasok'");
        $order->execute(array(':tanggal'=>$waktunow));
        $data = array("errcode"=>"OK", "message"=>"add pemasok berhasil");
      }
    }
    else if ($tipe == "UPDATE_PEMASOKSTATUSKEAKTIFAN") {
      if ( (!(isset($req->idpemasok))) || (!(isset($req->statuskeaktifan))) ){
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $idpemasok = $req->idpemasok;
        $statuskeaktifan = $req->statuskeaktifan;
        $order = $conn->prepare("UPDATE masterpemasok SET STATUSKEAKTIFAN= :statuskeaktifan, LASTUPDATE= :lastupdate, LASTUPDATEBY= :lastupdateby
                                WHERE IDPEMASOK= :idpemasok");
        $order->execute(array(':statuskeaktifan'=>$statuskeaktifan,
                              ':lastupdate'=>$waktunow,
                              ':lastupdateby'=>$idpengguna,
                              ':idpemasok'=>$idpemasok
                        ));
        $order = $conn->prepare("UPDATE listtableupdated SET TANGGAl= :tanggal
                        WHERE NAMATABEL='masterpemasok'");
        $order->execute(array(':tanggal'=>$waktunow));
        
        $data = array("errcode"=>"OK", "message"=>"update status pemasok berhasil");
      }
    } 		
    else if ($tipe == "GET_USEROUTLET") {
      $order = $conn->prepare("SELECT db1.IDOUTLET, NAMAOUTLET
                              FROM masterpengguna_outlet db1
                              JOIN masteroutlet db2 ON db1.IDOUTLET= db2.IDOUTLET
                              WHERE IDPENGGUNA= :idpengguna");
      $order->execute(array(':idpengguna'=>$idpengguna));
      $daftaruseroutlet = array();
      while ($d = $order->fetch(PDO::FETCH_ASSOC)) {
        $daftaruseroutlet[] = ($d);
      }
      
      $data = array("errcode"=>"OK", "message"=>"get daftar outlet user berhasil", "daftaruseroutlet"=>$daftaruseroutlet);
    }
    else if ($tipe == "GET_OUTLET") {
      if (!(isset($req->idoutlet))) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $idoutlet = $req->idoutlet;
        if (($idoutlet == '') OR ($idoutlet == null)) { $idoutlet = '%%'; }
        $order = $conn->prepare("SELECT IDOUTLET, KODEOUTLET, NAMAOUTLET, LOKASI, LOGOOUTLET, TELEPON1, TELEPON2, FAX, EMAIL, USESERVIS, BIAYASERVIS,
                                        SERVISWITHTAX, USETAX, PERSENTASEPAJAK, USECHARGE, PERSENTASECHARGE, NOMINALCHARGE, USEDONASI, TIPEDONASI,
                                        CETAKKEBIJAKANRETUR, CETAKCATATAN, ALAMAT, KODEPOS, IDNEGARA, PROPINSI, KOTA, KECAMATAN, URLFB, URLYOUTUBE,
                                        URLINSTAGRAM, URLTWITTER, STATUSKEAKTIFAN
                                FROM masteroutlet WHERE IDOUTLET LIKE :idoutlet
                                ORDER BY IDOUTLET ASC");
        $order->execute(array(':idoutlet'=>$idoutlet));
        $daftaroutlet = array();
        while ($d = $order->fetch(PDO::FETCH_ASSOC)) {
          $daftaroutlet[] = ($d);
        }
        
        $data = array("errcode"=>"OK", "message"=>"get daftar outlet berhasil", "daftaroutlet"=>$daftaroutlet);
      }
    }
    else if ($tipe == "ADD_PRODUKFAVORIT") {
      $idoutlet = $req->idoutlet;
      $listidproduk = $req->listidproduk;
      $order = $conn->prepare("INSERT INTO masterproduk_favorit (IDPRODUK, IDOUTLET)
                                                          VALUES(:idproduk,:idoutlet)");
      foreach ($listidproduk AS $x) {
        $order->execute(array(':idproduk'=>$x,
                              ':idoutlet'=>$idoutlet));
      }
      $data = array("errcode"=>"OK", "message"=>"add produk favorit berhasil");
    }
    else if ($tipe == "DELETE_PRODUKFAVORIT") {
      if ( (!(isset($req->idoutlet))) || (!(isset($req->listidproduk))) ){
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $idoutlet = $req->idoutlet;
        $listidproduk = $req->listidproduk;
        $order = $conn->prepare("DELETE FROM masterproduk_favorit WHERE IDPRODUK= :idproduk AND IDOUTLET= :idoutlet");
        foreach ($listidproduk AS $x) {
          $order->execute(array(':idproduk'=>$x,
                                ':idoutlet'=>$idoutlet));
        }
        
        $data = array("errcode"=>"OK", "message"=>"delete produk favorit berhasil");
      }
    }
    else if ($tipe == "ADD_PRODUKFAVORITPELANGGAN") {
      if ( (!(isset($req->idpelanggan))) || (!(isset($req->listidproduk))) ){
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $idpelanggan = $req->idpelanggan;
        $listidproduk = $req->listidproduk;
        $order = $conn->prepare("INSERT INTO masterproduk_favoritpelanggan  (IDPRODUK, IDPELANGGAN)
                                                                      VALUES(:idproduk,:idpelanggan)");
        foreach ($listidproduk AS $x) {
          $order->execute(array(':idproduk'=>$x,
                                ':idpelanggan'=>$idpelanggan));
        }
        $data = array("errcode"=>"OK", "message"=>"add produk favorit pelanggan berhasil");
      }
    }
    else if ($tipe == "DELETE_PRODUKFAVORITPELANGGAN") {
      if ( (!(isset($req->idpelanggan))) || (!(isset($req->listidproduk))) ){
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $idpelanggan = $req->idpelanggan;
        $listidproduk = $req->listidproduk;
        $order = $conn->prepare("DELETE FROM masterproduk_favoritpelanggan WHERE IDPRODUK= :idproduk AND IDPELANGGAN= :idpelanggan");
        foreach ($listidproduk AS $x) {
          $order->execute(array(':idproduk'=>$x,
                                ':idpelanggan'=>$idpelanggan));
        }
        
        $data = array("errcode"=>"OK", "message"=>"delete produk favorit pelanggan berhasil");
      }
    }
    else if ($tipe == "GET_LOGINUSERDATA") {
      $order = $conn->prepare("SELECT NAMAPENGGUNA, EMAIL, db1.IDKATEGORIPENGGUNA, FOTO, JENISKELAMIN, NIK, JABATAN
                              FROM masterpengguna db1
                              JOIN masterkategoripengguna db2 ON db1.idkategoripengguna=db2.idkategoripengguna
                              WHERE IDPENGGUNA= :idpengguna");
      $order->execute(array(':idpengguna'=>$idpengguna));
      if ($d = $order->fetch(PDO::FETCH_ASSOC)) {

      }
      $data = array("errcode"=>"OK", "message"=>"get data pengguna berhasil", "namapengguna"=>$d['NAMAPENGGUNA'],
                                                                              "email"=>$d['EMAIL'],
                                                                              "idkategoripengguna"=>$d['IDKATEGORIPENGGUNA'],
                                                                              "foto"=>$d['FOTO'],
                                                                              "jeniskelamin"=>$d['JENISKELAMIN'],
                                                                              "nik"=>$d['NIK'],
                                                                              "jabatan"=>$d['JABATAN']);
    }
    else if ($tipe == "POST_MASTERPRODUK") {
      if ( (!(isset($req->tipestok))) || (!(isset($req->idkategoriproduk))) || (!(isset($req->namaproduk))) || (!(isset($req->idsatuanproduk))) ||
           (!(isset($req->berat))) || (!(isset($req->deskripsiproduk))) || (!(isset($req->fotoprodukutama))) || (!(isset($req->listvarian))) ||
           (!(isset($req->listfoto))) ){
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $tipestok = $req->tipestok;
        $idkategoriproduk = $req->idkategoriproduk;
        $namaproduk = substr($req->namaproduk, 0, 100);
        $idsatuanproduk = $req->idsatuanproduk;
        $berat = $req->berat;
        $deskripsiproduk = $req->deskripsiproduk;
        $fotoprodukutama = substr($req->fotoprodukutama, 0, 200);

        $orderidproduk= $conn->prepare("SELECT IDPRODUK FROM masterproduk_dataproduk
                                        WHERE UPPER(NAMAPRODUK)=UPPER(:namaproduk) AND STATUSKEAKTIFAN=1 LIMIT 1;");
        $orderidproduk->execute(array(':namaproduk'=>$namaproduk));
        $idproduk = 0;
        if ($aa = $orderidproduk->fetch()) { $idproduk = $aa['IDPRODUK']; }

        if ($idproduk == '') { //($proses == 'ADD') {
          $order = $conn->prepare("INSERT INTO masterproduk_dataproduk (TIPE, IDKATEGORIPRODUK, NAMAPRODUK, IDSATUANPRODUK, BERAT, DESKRIPSIPRODUK,
                                                                        FOTOPRODUKUTAMA, STATUSKEAKTIFAN, CREATEDON, CREATEDBY, LASTUPDATE, LASTUPDATEBY)
                                                                VALUES (:tipe,:idkategoriproduk,:namaproduk,:idsatuanproduk,:berat,:deskripsiproduk,
                                                                        :fotoprodukutama,:statuskeaktifan,:createdon,:createdby,:lastupdate,:lastupdateby);
                                  SELECT MAX(IDPRODUK) AS id FROM masterproduk_dataproduk;");
        }
        else if ($idproduk > 1) {
          $order = $conn->prepare("UPDATE masterproduk_dataproduk SET TIPE= :tipe, IDKATEGORIPRODUK= :idkategoriproduk, NAMAPRODUK= :namaproduk,
                                                                      IDSATUANPRODUK= :idsatuanproduk, BERAT= :berat, DESKRIPSIPRODUK= :deskripsiproduk,
                                                                      FOTOPRODUKUTAMA= :fotoprodukutama, LASTUPDATE= :lastupdate, LASTUPDATEBY= :lastupdateby
                                    WHERE IDPRODUK= :idproduk");
        }
        $order->bindparam(":tipe", $tipestok);
        $order->bindparam(":idkategoriproduk", $idkategoriproduk);
        $order->bindparam(":namaproduk", $namaproduk);
        $order->bindparam(":idsatuanproduk", $idsatuanproduk);
        $order->bindparam(":berat", $berat);
        $order->bindparam(":deskripsiproduk", $deskripsiproduk);
        $order->bindparam(":fotoprodukutama", $fotoprodukutama);
        $order->bindparam(":lastupdate", $waktunow);
        $order->bindparam(":lastupdateby", $idpengguna);
        if ($idproduk == '') {
          $statuskeaktifan = 1;
          $order->bindparam(":statuskeaktifan", $statuskeaktifan);
          $order->bindparam(":createdon", $waktunow);
          $order->bindparam(":createdby", $idpengguna);
          $order->execute();
          $order->nextRowset();
          if ($row = $order->fetch()) { $idproduk = $row['id']; }
        }
        else if ($idproduk > 1) { //($proses == 'EDIT') {
          $order->bindparam(":idproduk", $idproduk);
          $order->execute();
        }

        $listvarian = $req->listvarian;
        $orderrelasi = $conn->prepare("INSERT INTO masterproduk_relasi (IDPRODUK_VAR, IDPRODUK)
                                                                VALUES (:idproduk_var,:idproduk);");
        $ordercountvarian = $conn->prepare("SELECT IDPRODUK_VAR FROM masterproduk_varian WHERE IDPRODUK_VAR= :idproduk_var LIMIT 1;");
        $ordervarianinsert = $conn->prepare("INSERT INTO masterproduk_varian (IDPRODUK_VAR, VARIAN1, VARIAN2, BARCODE)
                                                                      VALUES (:idproduk_var,:varian1,:varian2,:barcode);");
        $ordervarianupdate = $conn->prepare(" UPDATE masterproduk_varian SET VARIAN1= :varian1, VARIAN2= :varian2, BARCODE= :barcode
                                              WHERE IDPRODUK_VAR= :idproduk_var;");
        
        $orderoutletinsert= $conn->prepare("INSERT INTO masterproduk_outlet (IDOUTLET, IDPRODUK_VAR, HPP, HARGAJUAL)
                                                                    VALUES (:idoutlet,:idproduk_var,:hpp,:hargajual);
                                            INSERT INTO kartustok(IDOUTLET, TANGGAL, IDPRODUK_VAR, NOFAKTUR, TINDAKAN, JUMLAHAWAL, SELISIHJUMLAH, JUMLAHAKHIR,
                                                                  HPPAWAL, SELISIHHPP, HPPAKHIR, HPPFAKTUR)
                                                          VALUES(:Aidoutlet,:Atanggal,:Aidproduk_var,:Anofaktur,:Atindakan,:Ajumlahawal,:Aselisihjumlah,:Ajumlahakhir,
                                                                  :Ahppawal,:Aselisihhpp,:Ahppakhir,:Ahppfaktur);
                                            INSERT INTO stok (IDOUTLET, IDPRODUK_VAR, JUMLAH, JUMLAHPO, NOTIFIKASIMINIMALSTOK, STATUSNOTIFIKASI,
                                                              LASTUPDATE, LASTUPDATEBY)
                                                      VALUES (:Bidoutlet,:Bidproduk_var,:Bjumlah,:Bjumlahpo,:Bnotifikasiminimalstok,:Bstatusnotifikasi,
                                                              :Blastupdate,:Blastupdateby)");

        $orderstokawal = $conn->prepare("SELECT JUMLAH  AS STOKAWAL FROM stok WHERE IDOUTLET=:idoutlet AND IDPRODUK_VAR= :idproduk_var;");
        $orderhppawal = $conn->prepare("SELECT HPP AS HPPAWAL FROM masterproduk_outlet WHERE IDOUTLET=:idoutlet AND IDPRODUK_VAR= :idproduk_var;");
        $orderopname = $conn->prepare(" INSERT INTO stokopname (IDOUTLET, TANGGAL, IDPRODUK_VAR, STOKAWAL, STOKAKHIR, SELISIHSTOK, HPPAWAL, HPPAKHIR,
                                                                SELISIHHPP, CREATEDON, CREATEDBY)
                                                        VALUES (:idoutlet,:tanggal,:idproduk_var,:stokawal,:stokakhir,:selisihstok,:hppawal,:hppakhir,
                                                                :selisihhpp,:createdon,:createdby);
                                        SELECT MAX(IDSTOKOPNAME) AS IDOPNAME FROM stokopname;");
        $orderoutletupdate = $conn->prepare(" UPDATE masterproduk_outlet SET HPP= :hpp, HARGAJUAL= :hargajual
                                              WHERE IDPRODUK_VAR= :idproduk_var AND IDOUTLET= :idoutlet;
                                              INSERT INTO kartustok (IDOUTLET, TANGGAL, IDPRODUK_VAR, NOFAKTUR, TINDAKAN, JUMLAHAWAL, SELISIHJUMLAH, JUMLAHAKHIR,
                                                                    HPPAWAL, SELISIHHPP, HPPAKHIR, HPPFAKTUR)
                                                              VALUES(:Aidoutlet,:Atanggal,:Aidproduk_var,:Anofaktur,:Atindakan,:Ajumlahawal,:Aselisihjumlah,:Ajumlahakhir,
                                                                    :Ahppawal,:Aselisihhpp,:Ahppakhir,:Ahppfaktur);
                                              UPDATE stok SET JUMLAH= :Bjumlah, NOTIFIKASIMINIMALSTOK= :Bnotifikasiminimalstok,
                                                              STATUSNOTIFIKASI= :Bstatusnotifikasi, LASTUPDATE= :Blastupdate, LASTUPDATEBY= :Blastupdateby
                                              WHERE IDOUTLET= :Bidoutlet AND IDPRODUK_VAR= :Bidproduk_var;");

        foreach ($listvarian as $x) {
          $varian1 = $x->varian1;
          $varian2 = $x->varian2;
          $barcode = $x->barcode;
          $liststokharga = $x->liststokharga;
          $idproduk_var = generateidprodukvar($conn, $idproduk, $varian1, $varian2);
          if (($barcode == '') || ($barcode == null)) { $barcode = $idklien . '.' . $idproduk_var; }
          $ordercountvarian->execute(array(':idproduk_var'=>$idproduk_var));
          $jml = 0;
          if ($dd = $ordercountvarian->fetch()) { $jml = 1; }
          $ordercountvarian->closeCursor();
          if ($jml > 0) {
            $ordervarianupdate->execute(array(':idproduk_var'=>$idproduk_var,
                                              ':varian1'=>$varian1,
                                              ':varian2'=>$varian2,
                                              ':barcode'=>$barcode
                                        ));
          }
          else {
            $ordervarianinsert->execute(array(':idproduk_var'=>$idproduk_var,
                                              ':varian1'=>$varian1,
                                              ':varian2'=>$varian2,
                                              ':barcode'=>$barcode
                                        ));
            $orderrelasi->execute(array(':idproduk_var'=>$idproduk_var,
                                        ':idproduk'=>$idproduk));

          }
          foreach ($liststokharga as $y) {
            $idoutlet = $y->idoutlet;
            $jumlahstok = $y->jumlahstok;
            $hpp = $y->hpp;
            $hargajual = $y->hargajual;
            $notifikasiminimalstok = $y->notifikasiminimalstok;
            $notifikasimaksimalstok = $y->notifikasimaksimalstok;

            $ordercountoutlet = $conn->prepare("SELECT IDPRODUK_VAR FROM masterproduk_outlet WHERE IDPRODUK_VAR= :idproduk_var AND IDOUTLET= :idoutlet LIMIT 1;");
            $ordercountoutlet->execute(array(':idproduk_var'=>$idproduk_var, ':idoutlet'=>$idoutlet));
            $jmloutlet = 0;
            if ($ordercountoutlet->rowCount() > 0) { $jmloutlet = 1; }

            if (($jml == 0) || ($jmloutlet == 0)) {
              $nofaktur = 'stok awal';
              $tindakan = 'posting';
              $jumlahawal = 0;
              $hppawal = 0;
              $hppfaktur = 0;
              $jumlahpo = 0;
              $statusnotifikasi = 0;
              $orderoutletinsert->execute(array(':idoutlet'=>$idoutlet,               //masterproduk_outlet
                                                ':idproduk_var'=>$idproduk_var,
                                                ':hpp'=>$hpp,
                                                ':hargajual'=>$hargajual,

                                                ':Aidoutlet'=>$idoutlet,              //kartustok
                                                ':Atanggal'=>$waktunow,
                                                ':Aidproduk_var'=>$idproduk_var,
                                                ':Anofaktur'=>$nofaktur,
                                                ':Atindakan'=>$tindakan,
                                                ':Ajumlahawal'=>$jumlahawal,
                                                ':Aselisihjumlah'=>$jumlahstok,
                                                ':Ajumlahakhir'=>$jumlahstok,
                                                ':Ahppawal'=>$hppawal,
                                                ':Aselisihhpp'=>$hpp,
                                                ':Ahppakhir'=>$hpp,
                                                ':Ahppfaktur'=>$hppfaktur,
                                                
                                                ':Bidoutlet'=>$idoutlet,              //stok
                                                ':Bidproduk_var'=>$idproduk_var,
                                                ':Bjumlah'=>$jumlahstok,
                                                ':Bjumlahpo'=>$jumlahpo,
                                                ':Bnotifikasiminimalstok'=>$notifikasiminimalstok,
                                                ':Bstatusnotifikasi'=>$statusnotifikasi,
                                                ':Blastupdate'=>$waktunow,
                                                ':Blastupdateby'=>$idpengguna));


            }
            else {
              $orderstokawal->execute(array(':idproduk_var'=>$idproduk_var, ':idoutlet'=>$idoutlet));
              if ($ww = $orderstokawal->fetch()) { $stokawal = $ww['STOKAWAL']; }
              $orderhppawal->execute(array(':idproduk_var'=>$idproduk_var, ':idoutlet'=>$idoutlet));
              if ($ww = $orderhppawal->fetch()) { $hppawal = $ww['HPPAWAL']; }
              $selisihstok = $jumlahstok - $stokawal;
              $selisihhpp = $hpp - $hppawal;

              $orderopname->execute(array(':idoutlet'=>$idoutlet,
                                          ':tanggal'=>$waktunow,
                                          ':idproduk_var'=>$idproduk_var,
                                          ':stokawal'=>$stokawal,
                                          ':stokakhir'=>$jumlahstok,
                                          ':selisihstok'=>$selisihstok,
                                          ':hppawal'=>$hppawal,
                                          ':hppakhir'=>$hpp,
                                          ':selisihhpp'=>$selisihhpp,
                                          ':createdon'=>$waktunow,
                                          ':createdby'=>$idpengguna));
              $orderopname->nextRowset();
              if ($ww = $orderopname->fetch()) { $nofaktur = $ww['IDOPNAME']; }

              $tindakan = 'posting';
              $hppfaktur = 0;
              $statusnotifikasi = 0;
              $orderoutletupdate->execute(array(':idoutlet'=>$idoutlet,               //masterproduk_outlet
                                                ':idproduk_var'=>$idproduk_var,
                                                ':hpp'=>$hpp,
                                                ':hargajual'=>$hargajual,

                                                ':Aidoutlet'=>$idoutlet,              //kartustok
                                                ':Atanggal'=>$waktunow,
                                                ':Aidproduk_var'=>$idproduk_var,
                                                ':Anofaktur'=>$nofaktur,
                                                ':Atindakan'=>$tindakan,
                                                ':Ajumlahawal'=>$stokawal,
                                                ':Aselisihjumlah'=>$selisihstok,
                                                ':Ajumlahakhir'=>$jumlahstok,
                                                ':Ahppawal'=>$hppawal,
                                                ':Aselisihhpp'=>$selisihhpp,
                                                ':Ahppakhir'=>$hpp,
                                                ':Ahppfaktur'=>$hppfaktur,
                                                
                                                ':Bidoutlet'=>$idoutlet,              //stok
                                                ':Bidproduk_var'=>$idproduk_var,
                                                ':Bjumlah'=>$jumlahstok,
                                                ':Bnotifikasiminimalstok'=>$notifikasiminimalstok,
                                                ':Bstatusnotifikasi'=>$statusnotifikasi,
                                                ':Blastupdate'=>$waktunow,
                                                ':Blastupdateby'=>$idpengguna));


            }
          }
          $order= $conn->prepare("UPDATE listtableupdated SET TANGGAl= :tanggal
                                  WHERE NAMATABEL='masterproduk'");
          $order->execute(array(':tanggal'=>$waktunow));
        }

        $listfoto = $req->listfoto;
        $ordercek1 = $conn->prepare("SELECT IDPRODUK FROM masterproduk_foto WHERE IDPRODUK= :idproduk AND NO= :no AND FOTOPRODUK= :fotoproduk LIMIT 1");
        $ordercek2 = $conn->prepare("SELECT IDPRODUK FROM masterproduk_foto WHERE IDPRODUK= :idproduk AND NO= :no LIMIT 1");
        $orderupdate= $conn->prepare("UPDATE masterproduk_foto SET FOTOPRODUK= :fotoproduk, FOTO_LASTUPDATE= :lastupdate
                                      WHERE IDPRODUK= :idproduk AND NO= :no");
        $orderadd = $conn->prepare("INSERT INTO masterproduk_foto (IDPRODUK, NO, FOTOPRODUK, FOTO_LASTUPDATE)
                                                            VALUES(:idproduk,:no,:fotoproduk,:lastupdate)");
        foreach ($listfoto as $x) {
          $idproduk = $idproduk;
          $no = $x->no;
          $fotoproduk = $x->fotoproduk;
          $ordercek1->execute(array(':idproduk'=>$idproduk, ':no'=>$no, ':fotoproduk'=>$fotoproduk));
          $jml1 = 0;
          if ($ordercek1->rowCount() == 0) {
            $ordercek2->execute(array(':idproduk'=>$idproduk, ':no'=>$no));
            $jml2 = 0;
            if ($ordercek2->rowCount() == 0) {
              $orderadd->execute(array(':idproduk'=>$idproduk, ':no'=>$no, ':fotoproduk'=>$fotoproduk, ':lastupdate'=>$waktunow));
            }
            else {
              $orderupdate->execute(array(':idproduk'=>$idproduk, ':no'=>$no, ':fotoproduk'=>$fotoproduk, ':lastupdate'=>$waktunow));
            }
          }
        }

        $data = array("errcode"=>"OK", "message"=>"penambahan produk berhasil");
      }
    }
    else if ($tipe == "CEK_MASTERPRODUKNAME") {
      if (!(isset($req->namaproduk))) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $namaproduk = $req->namaproduk;
        $order= $conn->prepare("SELECT IDPRODUK FROM masterproduk_dataproduk WHERE NAMAPRODUK= :namaproduk  AND STATUSKEAKTIFAN=1 LIMIT 1");
        $order->execute(array(':namaproduk'=>$namaproduk));
        if ($order->rowCount() > 0) {
          $data = array("errcode"=>"OK", "message"=>"cek nama produk berhasil", "isexists"=>"1");
        }
        else $data = array("errcode"=>"OK", "message"=>"cek nama produk berhasil", "isexists"=>"0");
      }
    }
    else if ($tipe == "GET_MASTERPRODUKSUM") {
      $listidproduk = $req->listidproduk;
      if (!(isset($req->listidproduk))) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $order= $conn->prepare("SELECT SUM(JUMLAH) AS JML FROM stok WHERE substring_index(IDPRODUK_VAR, '.', 1)= :idproduk
                                GROUP BY substring_index(IDPRODUK_VAR, '.', 1)");
        $liststatusproduk = array();
        foreach ($listidproduk AS $x) {
          $order->execute(array(':idproduk'=>$x));
          $jumlah = 0;
          if ($d = $order->fetch(PDO::FETCH_ASSOC)) {
            $jumlah = $d['JML'];
          }
          $statusproduk = array('idproduk'=>$x,
                                'jumlahstok'=>$jumlah);
          $liststatusproduk[] = ($statusproduk);
        }
        $data = array("errcode"=>"OK", "message"=>"get jumlah stok produk berhasil", "listjumlahproduk"=>$liststatusproduk);
      }
    }
    else if ($tipe == "DELETE_MASTERPRODUK") {
      $listidproduk = $req->listidproduk;
      if (!(isset($req->listidproduk))) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $order= $conn->prepare("UPDATE masterproduk_dataproduk SET STATUSKEAKTIFAN=0 WHERE IDPRODUK= :idproduk");
        $liststatusproduk = array();
        foreach ($listidproduk AS $x) {
          $order->execute(array(':idproduk'=>$x));
        }
        $data = array("errcode"=>"OK", "message"=>"delete produk berhasil");
      }
    }
    else if ($tipe == "GET_MASTERSATUAN") {
      $order= $conn->prepare("SELECT IDSATUANPRODUK, NAMASATUANPRODUK FROM mastersatuanproduk");
      $order->execute();
      $listsatuan = array();
      while ($d = $order->fetch(PDO::FETCH_ASSOC)) {
        $listsatuan[] = ($d);
      }
    $data = array("errcode"=>"OK", "message"=>"get satuan produk berhasil", "listsatuan"=>$listsatuan);
    }
    else if ($tipe == "UPDATE_MASTERSATUAN") {
      if ( (!(isset($req->idsatuan))) || (!(isset($req->namasatuan))) ) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $idsatuan = $req->idsatuan;
        if ($idsatuan <= 14) {
          $data = array("errcode"=>"NOT_OK", "message"=>"satuan tidak dapat diupdate");
        }
        else {
          $namasatuan = $req->namasatuan;
          $order= $conn->prepare("UPDATE mastersatuanproduk SET NAMASATUANPRODUK= :namasatuan WHERE IDSATUANPRODUK= :idsatuan");
          $order->execute(array(':namasatuan'=>$namasatuan, ':idsatuan'=>$idsatuan));
          $data = array("errcode"=>"OK", "message"=>"update satuan produk berhasil");
        }
      }
    }
    else if ($tipe == "ADD_MASTERSATUAN") {
      if (!(isset($req->namasatuan))) {
        $data = array("errcode"=>"NOT_OK", "message"=>"salah/kurang parameter");
      }
      else {
        $namasatuan = $req->namasatuan;
        $order= $conn->prepare("INSERT INTO mastersatuanproduk (NAMASATUANPRODUK)
                                                        VALUES (:namasatuan)");
        $order->execute(array(':namasatuan'=>$namasatuan));
        $data = array("errcode"=>"OK", "message"=>"add satuan produk berhasil");
      }
    }
    else if ($tipe == "GET_SLIDER") {
      $order = $conn2->prepare("SELECT NO, NAMASLIDER, FOTOSLIDER, TIPE
                                FROM MASTERSLIDER
                                WHERE STATUSKEAKTIFAN=1 AND (USETANGGAL= 0 OR (CURDATE() BETWEEN STARTDATE AND ENDDATE))");
      $order->execute();
      $listslider = array();
      while ($d = $order->fetch(PDO::FETCH_ASSOC)) {
        $listslider[] = ($d);
      }
      $data = array("errcode"=>"OK", "message"=>"get slider berhasil", "listslider"=>$listslider);
    }
    
  
	  echo json_encode($data);
  }
?>
