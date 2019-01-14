var produk = new function () {
    this.method = "";
	this.idoutlet = 1;
	this.search = "";
	this.limit = 25;
	this.page = 1;
	this.idkategori = "";
	this.statusproduk = "";
	this.stokoption = "";
	this.initializeTable = false;
    this.init = function () {
		if (produk.initializeTable == false)
		{
			produk.initializeTable = true;
			produk.initTable();
		}
		$(".table-length").change(function(e){
			var _this = this;
			produk.limit = this.value;
			produk.initTable();
		})
		$(".param-status_produk").append('<option value="">Semua</option>');
		$(".param-status_produk").append('<option value="PROMO">produk promo</option>');
		$(".param-status_produk").append('<option value="KONSINYASI">produk konsinyasi</option>');
		$(".param-status_produk").append('<option value="NONKONSINYASI">produk non kosinyasi</option>');
		$(".param-status_produk").append('<option value="FAVORIT">produk favorit, favoritpelanggan</option>');
		$(".param-status_produk").append('<option value="PAKET">lom aktif</option>');
		$(".param-status_produk").change(function(e){
			var _this = this;
			produk.statusproduk = this.value;
			produk.initTable();
		});
		$(".param-kategori").append('<option value="">Semua kategori</option>');
		var _param =
		{
			tipe			: 'GET_KATEGORIPRODUK'
		};
		$.ajax({
		type: "POST",
		url: 'https://development.autopilotstore.co.id/api_all.php',
		data: JSON.stringify(_param),
		success: function(data){
			var data = data.daftarkategoriproduk; 
			data.forEach(function(item) {
				$(".param-kategori").append("<option value="+item["IDKATEGORIPRODUK"]+">"+item["NAMAKATEGORIPRODUK"]+"</option>");
			});
		},
		complete:function(){
		},
	dataType: 'json',
		});
		$(".param-kategori").change(function(e){
			var _this = this;
			produk.idkategori = this.value;
			produk.initTable();
		})

		$(".param-stock").change(function(e){
			var _this = this;
			produk.stokoption = this.value;
			produk.initTable();
		});

		$(".param-search").on("keyup",function(e){
			var _this = this;
			produk.search = this.value;
			produk.initTable();
		})
	}
	this.initTable = function(){
		var data;
		var data_produk = [];
		var x = [];
		var j= 0;
		var jumlahstoktotal = 0;
		var totalproduct = 0;
		var limit = $('td[name=t_product_length]').val();
		this.initialize = true;
		$("#t_product tbody").empty();
		$(".aps-alokasi-outlet").hide()
		$(".aps-hapus").hide()
		$(".aps-add-product-favorit").hide()
		$(".aps-delete-product-favorit").hide()
		var y =
		{
			tipe			: 'GET_OUTLETMASTERPRODUK',
			idoutlet 		: produk.idoutlet, 
			search 			: produk.search, 
			limit			: produk.limit, 
			page			: produk.page,
			idkategori		: produk.idkategori , 
			statusproduk 	: produk.statusproduk,
			stokoption 		: produk.stokoption,
		};
		$.ajax({
				type: "POST",
				url: 'https://development.autopilotstore.co.id/api_all.php',
				data: JSON.stringify(y),
				success: function(data){
					var data_produk = data.daftarproduk;
					data_produk.forEach(function(item) {
						var data_row = "";
						data_row = 
							"<tr id="+item.idproduk+" data-produk="+item+">" +
								"<td class='check'>" +
									"<input type='checkbox' class='form-check-input-switchery pilih-produk' data-fouc data-uk-uniform value="+item.idproduk+">" +
								"</td>" +
								"<td>" +
									"<h6 class='mb-0 font-weight-semibold'>"+item.namaproduk+"</h6>" +
									"<p class='mb-0 text-muted'>"+item.jumlahvarian+" varian - "+item.varian[0].jumlahsubvarian+" subvarian</p>" +
								"</td>" +
								"<td>" +
									"<img src='daftar_produk/image/icon/icon-status-diskon.svg'>" +
								"</td>" +
								"<td>"+item.namakategoriproduk+"</td>" +
								"<td>"+item.jumlahstokproduk+"</td>" +
							"</tr>"
							$("#t_product tbody").append(data_row)
						
					});
				},
				complete:function(){
				},
			dataType: 'json',
		});
		
	}
	}