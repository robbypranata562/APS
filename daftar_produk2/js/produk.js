var produk = new function () 
{
    this.method = "";
	this.idoutlet = 1;
	this.search = "";
	this.limit = 25;
	this.page = 0;
	this.idkategori = "";
	this.statusproduk = "";
	this.stokoption = "";
	this.initializeTable = false;
    this.init = function (param) {
		produk.idoutlet = param.attribute.idoutlet;

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
		$(".param-stock").append('<option value="">Semua</option>');
		$(".param-stock").append('<option value="MINIMALSTOCK">Jumlah Stock < Minimal Stock</option>');
		$(".param-stock").append('<option value="MAKSIMALSTOCK">Jumlah Stock > Maksimal Stock</option>');
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
		var args =
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
				data: JSON.stringify(args),
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
					$( '.thead_totalproduk' ).html( data.jumlahproduk );
					$( '.thead_totalstock' ).html( data.jumlahstoktotal );
					produk.renderPagination((parseInt( args.page ) + 1 ), data.jumlahproduk, data.daftarproduk);
					$(".pilih-produk").uniform();
				},
				complete:function(){
				},
			dataType: 'json',
		});
		
	}
	this.pagination =  function(c, m){
		var current = c,
			last = m,
			delta = 2,
			left = current - delta,
			right = current + delta + 1,
			range = [],
			rangeWithDots = [],
			l;

		for (let i = 1; i <= last; i++) {
			if (i == 1 || i == last || i >= left && i < right) {
				range.push(i);
			}
		}

		for (let i of range) {
			if (l) {
				if (i - l === 2) {
					rangeWithDots.push(l + 1);
				} else if (i - l !== 1) {
					rangeWithDots.push('...');
				}
			}
			rangeWithDots.push(i);
			l = i;
		}

		return range;
	}
	this.renderPagination=function( page, total, data ){
		pagination = produk.pagination( page, Math.round( ( parseInt( total ) / $( '.table-length').val() )) ),
		paginationTmp = $( '#tmpl-table-pagination' );
		//var tmp = _.template( paginationTmp.html() );
		var tmp =  paginationTmp.html();
		
		var start = page > 1 ? ( ( ( parseInt( page ) - 1 ) * parseInt( $( '.table-length' ).val() ) ) + 1 ) : page;
		var end = data.length * page;
		$( '.table-information').html('<p class="font-size-lg mb-0">Tampilkan ' + start + '-' + end + ' dari ' + total + '</p>');
		//$( '.table-pagination').html( tmp( {page:parseInt( page ),pagination:pagination} ) );
		console.log(pagination);
		$( '.table-pagination').html( produk.LinkPagination(parseInt( page ) , pagination ) );

	}
	this.LinkPagination = function (page , _pagination) {
		var List_Pagination = "";
		var hasClassDisabled = "";
		var hasClassActive = "";
		if (page === 1){
			hasClassDisabled = 'disabled';
		}
		if (_pagination.length){
			List_Pagination = "<nav aria-label='Page navigation example'>" +
			"<ul class='pagination justify-content-center justify-content-md-end'>" +
				"<li class='page-item' "+ hasClassDisabled +">" +
						"<a class='page-link' href='#' data-page='1'>First</a> "+
				"</li>" +
				"<li class='page-item' "+ hasClassDisabled +" > " +
					"<a class='page-link' href='#' tabindex='-1' data-page=" + (page - 2)+ ">Previous</a>" +
				"</li>";
			_pagination.forEach(function(number) 
			{
				if( ( ( page - 1 ) > 2 && number === 1 ) || ( page + 2 < _pagination[_pagination.length - 1] && number === pagination[_pagination.length - 1] ) )return;
				if (page === number){
					hasClassActive = 'active';
				}else{
					hasClassActive = '';
				}
				List_Pagination += "<li class='page-item' "+hasClassActive+">" +
					"<a class='page-link' href='#' data-page="+( parseInt( number ) - 1 ) +">"+number+"</a>" +
				"</li>"
			});
			List_Pagination += ( page === _pagination[_pagination.length - 1] )? "<li class='page-item disabled'>": "<li class='page-item'>" +
					"<a class='page-link' href='#' data-page="+( parseInt( page ) ) +">Next</a>" +
				"</li>";
			List_Pagination += ( page === _pagination[_pagination.length - 1] )? "<li class='page-item disabled'>": "<li class='page-item'>" +
					"<a class='page-link' href='#' data-page="+( _pagination[_pagination.length - 1]) +">Last</a>" +
				"</li>";
			List_Pagination += "</ul>";
		}
		return List_Pagination;
	}
}