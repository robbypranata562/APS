var produk = new function ()
{
	this.listidproduk = [];
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
		$(".table-length").unbind('change');
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
		$(".param-status_produk").unbind('change');
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
		$(".param-kategori").unbind('change');
		$(".param-kategori").change(function(e){
			var _this = this;
			produk.idkategori = this.value;
			produk.initTable();
		})
		$(".param-stock").append('<option value="">Semua</option>');
		$(".param-stock").append('<option value="MINIMALSTOCK">Jumlah Stock < Minimal Stock</option>');
		$(".param-stock").append('<option value="MAKSIMALSTOCK">Jumlah Stock > Maksimal Stock</option>');
		$(".param-stock").unbind( 'change' );
		$(".param-stock").change(function(e){
			var _this = this;
			produk.stokoption = this.value;
			produk.initTable();
		});
		$(".param-search").off( 'keyup' );
		$(".param-search").on("keyup",function(e){
			var _this = this;
			produk.search = this.value;
			produk.initTable();
		})
		$(".aps-alokasi-outlet").click(function(){
			$('#t_product tbody tr .pilih-produk:checked').each(function(i, obj) {
				produk.listidproduk.push( this.value );
			});
			var args =
			{
				tipe			: 'GET_USEROUTLET'
			};
			$.ajax({
				type: "POST",
				url: 'https://development.autopilotstore.co.id/api_all.php',
				data: JSON.stringify(args),
				success: function(data){
					var list_outlet = data.listuseroutlet;
					for (outlet in list_outlet)
					{
						$(".modal-body .row-outlet").append
						(
							'<div class="form-check"><label class="form-check-label">' +
									'<input data-uk-uniform data-id-outlet = "'+list_outlet[outlet]['IDOUTLET']+'" type="checkbox" class="form-check-input-styled">' +
							''+list_outlet[outlet]['NAMAOUTLET']+''+
							'</label></div>'
						);
					}
					$("#modal-outlet").modal('show');
				},
				complete:function(){
				},
				dataType: 'json',
			});
		})
		$(".add-alokasi-outlet").click(function(){
			var list_id_outlet = [];
			$('#modal-outlet .row-outlet .form-check .form-check-input-styled:checked').each(function(i, obj) {
				list_id_outlet.push( $(this).attr('data-id-outlet') );
			});
			console.log(list_id_outlet)
			// var args =
			// {
			// 	tipe			: 'GET_USEROUTLET'
			// };
			// $.ajax({
			// 	type: "POST",
			// 	url: 'https://development.autopilotstore.co.id/api_all.php',
			// 	data: JSON.stringify(args),
			// 	success: function(data){
			// 		var list_outlet = data.listuseroutlet;
			// 		for (outlet in list_outlet)
			// 		{
			// 			$(".modal-body .row-outlet").append
			// 			(
			// 				'<div class="form-check"><label class="form-check-label">' +
			// 						'<input data-uk-uniform data-id-outlet = "'+list_outlet[outlet]['IDOUTLET']+'" type="checkbox" class="form-check-input-styled">' +
			// 				''+list_outlet[outlet]['NAMAOUTLET']+''+
			// 				'</label></div>'
			// 			);
			// 		}
			// 		$("#modal-outlet").modal('show');
			// 	},
			// 	complete:function(){
			// 	},
			// 	dataType: 'json',
			// });
		})
		$(".aps-add-product-favorit").click(function(){
			var list_id_produk = [];
			$('#t_product tbody tr .pilih-produk:checked').each(function(i, obj) {
				list_id_produk.push( this.value );
			});
			alert("")
			var args =
			{
				tipe			: 'ADD_PRODUKFAVORIT',
				idoutlet		: produk.idoutlet,
				listidproduk 	: list_id_produk
			};
			$.ajax({
				type: "POST",
				url: 'https://development.autopilotstore.co.id/api_all.php',
				data: JSON.stringify(args),
				success: function(data){
					console.log(data)
					var ret = data;
					alert(ret.message)
					produk.initTable();
				},
				complete:function(){
				},
				dataType: 'json',
			});
		})
		$(".aps-delete-product-favorit").click(function(){
			var list_id_produk = [];
			$('#t_product tbody tr .pilih-produk:checked').each(function(i, obj) {
				list_id_produk.push( this.value );
			});
			var args =
			{
				tipe			: 'DELETE_PRODUKFAVORIT',
				idoutlet		: produk.idoutlet,
				listidproduk 	: list_id_produk
			};
			$.ajax({
				type: "POST",
				url: 'https://development.autopilotstore.co.id/api_all.php',
				data: JSON.stringify(args),
				success: function(data){
					var ret = data;
					alert(ret.message)
					produk.initTable();
				},
				complete:function(){
				},
				dataType: 'json',
			});
		})
		$(".aps-hapus").click(function(){
			var list_id_produk = [];
			$('#t_product tbody tr .pilih-produk:checked').each(function(i, obj) {
				list_id_produk.push( this.value );
			});
			var args =
			{
				tipe			: 'DELETE_MASTERPRODUK',
				listidproduk 	: list_id_produk
			};
			$.ajax({
				type: "POST",
				url: 'https://development.autopilotstore.co.id/api_all.php',
				data: JSON.stringify(args),
				success: function(data){
					var ret = data;
					alert(ret.message)
					produk.initTable();
				},
				complete:function(){
				},
			dataType: 'json',
		});
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
		$(".aps-alokasi-outlet").hide();
		$(".aps-hapus").hide();
		$(".aps-add-product-favorit").hide();
		$(".aps-delete-product-favorit").hide();
		var args =
		{
			tipe			: 'GET_MASTERPRODUK',
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
						var image = "";
						if (item.isfavorit == "1" || item.isfavoritpelanggan == "1"){
							image =  "<img src='daftar_produk/image/icon/icon-favorit.svg'>";
						}
						if ( item.ispromokonsinyasi == "1" ){
							image = "<img src='daftar_produk/image/icon/icon-status-diskon.svg'>"
						}
						data_row = $(
							"<tr id="+item.idproduk+" data-produk=" + btoa( JSON.stringify( item ) ) + ">" +
								"<td class='check'>" +
									"<input type='checkbox' class='form-check-input-switchery pilih-produk' data-fouc data-uk-uniform value="+item.idproduk+">" +
								"</td>" +
								"<td>" +
									"<h6 class='mb-0 font-weight-semibold text_20'>"+item.namaproduk+"</h6>" +
									"<p class='mb-0 text-muted text_13'>"+item.jumlahvarian+" varian - "+item.varian[0].jumlahsubvarian+" subvarian</p>" +
								"</td>" +
								"<td>" +
								image +
								"</td>" +
								"<td class = 'text_13'>"+item.namakategoriproduk+"</td>" +
								"<td class= 'text_20'>"+item.jumlahstokproduk+"</td>" +
							"</tr>" 
						);
						$("#t_product tbody").append(data_row).promise().done(function(){
							
							$( ".pilih-produk", data_row ).uniform();
						});

					});
					$( '.thead_totalproduk' ).html( data.jumlahproduk );
					$( '.thead_totalstock' ).html( data.jumlahstoktotal );
					produk.renderPagination((parseInt( args.page ) + 1 ), data.jumlahproduk, data.daftarproduk);
					
					$(".pilih-produk").unbind( 'change' );
					$(".pilih-produk").change(function (e) {
						e.preventDefault();
						var _this = $( this ).parents( 'tr' );
						if ( $( this ).prop('checked') ){
							$(_this).addClass("selected");
						} else {
							$(_this).removeClass("selected")
						}

						if ($("#t_product tbody tr.selected").length){
							$(".aps-add-product").hide()
							$(".aps-export-product").hide()
							$(".aps-alokasi-outlet").show()
							$(".aps-hapus").show()
							$(".aps-add-product-favorit").show()
							$(".aps-delete-product-favorit").show()

						} else {
							$(".aps-add-product").show()
							$(".aps-export-product").show()
							$(".aps-alokasi-outlet").hide()
							$(".aps-hapus").hide()
							$(".aps-add-product-favorit").hide()
							$(".aps-delete-product-favorit").hide()
						}
					});
					$(".table-pagination .page-link").unbind('click');
					$(".table-pagination .page-link").click(function(e){
						produk.page = $(this).attr("data-page");
						produk.initTable();
					})
				},
				complete:function(){
				},
			dataType: 'json',
		});
		$("#t_product tbody").off( 'click' );
		$("#t_product tbody").on( 'click', 'tr', function(e){
			if( ! $( e.target ).is( 'tr' ) ){return;}
			var dataProduk = JSON.parse( atob( $( this ).data( 'produk' ) ) );
			aps.produkPage.redirect( 'add-product', {DataProduk:dataProduk, action:'edit'}, true );
		} );

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
		} else {
			List_Pagination = "<nav aria-label='Page navigation example'>" +
			"<ul class='pagination justify-content-end'>" +
				"<li class='page-item disabled'>" +
					"<a class='page-link' href='#'>First</a>" +
				"</li>" +
				"<li class='page-item disabled'>" +
					"<a class='page-link' href='#' tabindex='-1'>Previous</a>" +
				"</li>" +
				"<li class='page-item active'><a class='page-link' href='#'>1</a></li>" +
				"<li class='page-item disabled'>" +
					"<a class='page-link' href='#'>Next</a>" +
				"</li>" +
				"<li class='page-item disabled'>" +
					"<a class='page-link' href='#'>Last</a>" +
				"</li>" +
			"</ul>" +
		"</nav>"
		}
		return List_Pagination;
	}
}