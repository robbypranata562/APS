(function (apsCore, util, $) {
	var $u = util.$,
		attr = util.attr,
		css = util.css,
		addClass = util.addClass;
	
	window.aps = window.aps || {};
	
	aps.apiURL = 'https://development.autopilotstore.co.id/api_all.php';
	
	aps.noop = function( message ){
		alert( message );
	};
	
	aps.cartesian = function() {
		return _.reduce(arguments, function(a, b) {
			return _.flatten(_.map(a, function(x) {
				return _.map(b, function(y) {
					return x.concat([y]);
				});
			}), true);
		}, [ [] ]);
	};
	
	aps.req = function( params ){
		var dataString = JSON.stringify( params );
		return new util.Promise( function(resolve, reject){
			$.ajax({
				type: "POST",
				url: aps.apiURL,
				data: dataString,
				success: function( data ){
					if( data.errcode == "OK" ){
						resolve( data );
					} else {
						reject( data.message );
					}
					
				},
				error:function(){
					reject( 'error xhr' );
				},
				dataType: 'json',
			});
		});
	};
	
	var Class = {
		connected:function(){
			!util.hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
		},
	};
	
	var EditProduk = {
		events:[
			{
				name:'dblclick',
				delegate:'tbody tr',
				handler:function(e){
					var _this = this,
						_that = e.current,
						$produkPage = $u( util.parents( _this.$el, '.uk-productpage' ) ),
						ProdukPage = apsCore.getComponent( $produkPage, 'productpage' );
					ProdukPage.redirect ( 'add-product', { action:'edit', step:1, dataProduk:util.data( _that, 'data-produk' )} );
				},
			}
		],
	};
	
	apsCore.component('tableproductwrapper',{
		connected:function(){
			this.init();
		},
		events:[
			{
				name:'redraw',
				self:true,
				handler:function(e, outletpilihan ,kategoripilihan , statusprodukpilihan , stockoptionpilihan , keywords , limit){
					var table = $( '#tmpl-table-productasd' ),
						 tmp = _.template( table.html() );
					$( this.$el ).html( tmp( {idoutlet:outletpilihan , idkategori : kategoripilihan , statusproduk : statusprodukpilihan , stokoption : stockoptionpilihan , search : keywords , length : limit} ) );
				}
			}
		],
		methods:{
			init:function(){
				var table = $( '#tmpl-table-productasd' );
				var tmp = _.template( table.html() );
				$( this.$el ).html( tmp( {idoutlet:1 , idkategori : "" , statusproduk : "" , stokoption : "" , search : "" , length : 50} ) );
			}
		}
	});
	apsCore.component(
		
		'tableproduct',
		{
			mixins:[EditProduk],
			connected:function(){
				if (this.initialize == false){
					this.init();
				}
				
			},
			props:{
				table:Object,
				idoutlet:String,
				idkategori : String,
				statusproduk:String,
				stokoption : String,
				search : String,
				length : String,
				page : String,
				totalproduk : String,
				totalstock : String,
			},
			data:{
				table:false,
				initialize : false,
				idoutlet:1,
				idkategori :"",
				statusproduk : "",
				stokoption : "",
				search : "",
				length : 50,
				page : 0,
				totalproduk : 0,
				totalstock : 0,
			},
			events:[
			{
				name:'click',
				delegate:"tbody tr",
				handler:function(e){
					e.preventDefault();
					var _this = e.current;

					if ($(_this).hasClass("selected"))
					{
						$(_this).removeClass("selected")
						
					}
					else{
						$(_this).addClass("selected")
					}

					if ($("#t_product tbody tr.selected").length)
					{
						$(".aps-add-product").hide()
						$(".aps-export-product").hide()
						$(".aps-alokasi-outlet").show()
						$(".aps-hapus").show()
						$(".aps-add-product-favorit").show()
						$(".aps-delete-product-favorit").show()
						
					}
					else
					{
						$(".aps-add-product").show()
						$(".aps-export-product").show()
						$(".aps-alokasi-outlet").hide()
						$(".aps-hapus").hide()
						$(".aps-add-product-favorit").hide()
						$(".aps-delete-product-favorit").hide()
					}			
				}
			},
			],
			methods:{
				init:function(){

								var _this = this;
								var data;
								var data_produk = [];
								var x = [];
								var j= 0;
								var jumlahstoktotal = 0;
								var totalproduct = 0;
								var limit = $('td[name=t_product_length]').val();
								this.initialize = true;
								$(".aps-alokasi-outlet").hide()
								$(".aps-hapus").hide()
								$(".aps-add-product-favorit").hide()
								$(".aps-delete-product-favorit").hide()
								$('#t_product thead tr').clone(false).appendTo( '#t_product thead' );
								$('#t_product thead tr:eq(1) th').each( function (i) {
									var title = $(this).text();
									if (i == 1)
									{
										$(this).html( '<input data-uk-search type="text" class="param-search" placeholder="Search '+title+'" /></br><span>Total <span class="thead_totalproduk">'+_this.totalproduk+'</span> Jenis Produk</span>' );
									}
									else if (i > 1)
									{
										var text = title.replace(" ", "_");
										if (text == "Stock")
										{
											$(this).html( '<select data-uk-'+text+' class=param-'+text+'></select></br><span>Total <span class="thead_totalstock">'+_this.totalstock+'</span></span>' );
										}
										else
										{
											var label_total = '</br><h3> </h3>';
											$(this).html( '<select data-uk-'+text+' class=param-'+text+'></select>' );
										}
										
									}

								});

								var y =
								{
									tipe			: 'GET_OUTLETMASTERPRODUK',
									idoutlet 		: 1, 
									search 			: _this.search, 
									limit			: 1000, 
									page			: _this.page,
									idkategori		: _this.idkategori , 
									statusproduk 	: _this.statusproduk,
									stokoption 		: _this.stokoption,
								};
								$.ajax({
										type: "POST",
										url: 'https://development.autopilotstore.co.id/api_all.php',
										data: JSON.stringify(y),
										success: function(data){
											console.log(data)
											_this.totalproduk = data.jumlahproduk;
											_this.totalstock = data.jumlahstoktotal;
											$(".thead_totalproduk").html(_this.totalproduk)
											$(".thead_totalstock").html(_this.totalstock)
											 data_p = data.daftarproduk;
											 jumlahstoktotal = data.jumlahstoktotal
											 totalproduct = data_p.jumlahproduk;
											 _.each( data_p, function(i){
												data_produk.push(
													[
														'',
														i['namaproduk'],
														i['jumlahvarian'],
														i['varian'],
														i['isfavorit'],
														i['isfavoritpelanggan'],
														i['iskonsinyasi'],
														i['ispromokonsinyasi'],
														i['namakategoriproduk'],
														i['jumlahstokproduk'],
														i['idproduk'],
														encodeURI( JSON.stringify( i ) )
													]
												);
											 });
												x = {'data':data_produk};
												_this.table = _this.table || $(_this.$el).dataTable({
												 "dom": '<"top"ipl>rt<"clear">',
												// "responsive": true,
												// //"scrollX":        true,
												// //"scrollCollapse": true,
												// "autoWidth":         true,
												"lengthMenu": [
														[  50,75,100 -1 ],
														[ '50 rows', '75 rows', '100 rows', 'Show all' ]
													],
												"buttons": [
														'pageLength'
													],
												"orderCellsTop": true,
												"fixedHeader": true,
  												"pagingType": "simple_numbers_no_ellipses",
												"deferLoading": totalproduct,
												"data" : data_produk,
												"fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
												{
													var tag_image = "";
													var varian = "";
													var subvarian = "";
													var jumlahstoktotal = "";
													varian = '</br>'+ aData[2] + ' varian';
													subvarian = ' - ' + aData[3][0]['jumlahsubvarian'] + ' subvarian';
												
													$('td:eq(1)', nRow).html(aData[1] + varian + subvarian);
													if (aData[4] == "1" || aData[5] == "1"){
														tag_image = tag_image + " <img src='global_assets/images/icon/icon-favorit.svg' /> ";
														
													}
													if (aData[6] == "1" || aData[7] == "1"){
														tag_image = tag_image + "<img src='global_assets/images/icon/icon-status-paket.svg' />";
													}
													$('td:eq(2)', nRow).html(tag_image);
													$('td:eq(3)', nRow).html(aData[8]);
													$('td:eq(4)', nRow).html(aData[9] + jumlahstoktotal);
													$(nRow).attr("id", aData[10]);
													$(nRow).attr( "data-produk", aData[11] );
													return nRow;
												},
												"fnInitComplete": function (oSettings, json) {
													$('div.dataTables_length select').attr('data-uk-limit_data',"");
												},
												"fnDrawCallback": function (oSettings, json) {
													_this.page = this.fnPagingInfo().iPage
													//alert(_this.page);
													$(".param-Kategori").val(_this.idkategori);
													$(".param-Status_Produk").val(_this.statusproduk);
													$(".param-Stock").val(_this.stokoption);
													$(".param-Search").val(_this.search);	
												},
												"initComplete": function () {
															this.api().columns().every( function () {
																var column = this;
																var select = $('<select><option value=""></option></select>')
																	.appendTo( $(column.top()).empty() )
																	.on( 'change', function () {
																		var val = $.fn.dataTable.util.escapeRegex(
																			$(this).val()
																		);
												 
																		column
																			.search( val ? '^'+val+'$' : '', true, false )
																			.draw();
																	} );
												 
																column.data().unique().sort().each( function ( d, j ) {
																	select.append( '<option value="'+d+'">'+d+'</option>' )
																} );
															} );
														},
												"columnDefs": 	[ {
																	"orderable": false,
																	"className": 'select-checkbox',
																	"targets":   0,
																	"style":    'os',
																} ]

										})

										},
										complete:function(){
										},
										dataType: 'json',
								});

				}
			}

		});
	apsCore.component(
		
		'listoutlet',
		{
			connected:function(){
				//this.init();
			},
			events:[
			{
				name:'change',
				self:true,
				handler:function(e){
					e.preventDefault();
					var _this = e.current;
					var outletpilihan = $( this.$el ).val();
					//var datajson = {action : "UPDATE_SELECTED_OUTLET", outlet : outletpilihan};
					util.trigger( $( '.table-product-wrapper' ), 'redraw', [outletpilihan ,$(".param-Kategori").val()  ,$(".param-Status_Produk").val() , $(".param-Stock").val() , $(".param-search").val() , $('div.dataTables_length select').val()]  );
					// $.post('welcome/outletsekarang.php',JSON.stringify(datajson),function(d){
					//     if (d.errcode == 'OK') console.log("Berhasil ubah outlet sekarang");
						
					// },"json");
				}
			}
			],
			methods:{
				init:function(){
					var _this = this;
					var x = 
								{
									tipe:'GET_OUTLET',
									idoutlet:'',
								};
								$.ajax({
										type: "POST",
										url: 'https://development.autopilotstore.co.id/api_all.php',
										data: JSON.stringify(x),
											success: function(data){
												var data = data.daftaroutlet;
												_.each( data, function(i){
													$(_this.$el).append('<option value="' + i['IDOUTLET'] + '">' + i['NAMAOUTLET'] + '</option>');
												} )
											},
											complete:function(){
											},
										dataType: 'json',
									});

				}
			}
		}
	);
	apsCore.component(
		
		'kategori',
		{
			connected:function(){
				if (this.initialize)return;
				this.init();
			},
			data:{
				initialize : false,
			},
			events:[
			{
				name:'change',
				self:true,
				handler:function(e){
					e.preventDefault();
					var _this = e.current;
					 var outletpilihan = $( this.$el ).val();
					util.trigger( $( '.table-product-wrapper' ), 'redraw', [$(".listoutlet_index").val(),outletpilihan , $(".param-Status_Produk").val() , $(".param-Stock").val() , $(".param-search").val() , $('div.dataTables_length select').val()] );
					// $.post('welcome/outletsekarang.php',JSON.stringify(datajson),function(d){
					//     if (d.errcode == 'OK') console.log("Berhasil ubah outlet sekarang");
						
					// },"json");
				}
			}
			],
			methods:{
				init:function(){
					var _this = this;
					this.initialize = true;
					var x = 
								{
									tipe:'GET_KATEGORIPRODUK',
								};
								$.ajax({
										type: "POST",
										url: 'https://development.autopilotstore.co.id/api_all.php',
										data: JSON.stringify(x),
											success: function(data){
													var data = data.daftarkategoriproduk;
													$(_this.$el).append('<option value="">Semua kategori</option>');
												_.each( data, function(i){
													$(_this.$el).append('<option value="' + i['IDKATEGORIPRODUK'] + '">' + i['NAMAKATEGORIPRODUK'] + '</option>');
												} )
											},
											complete:function(){
											},
										dataType: 'json',
									});
			}
		}
	}
	);

	apsCore.component(
		
		'status_produk',
		{
			connected:function(){

				if (this.initialize) return;
				this.init();
			},
			data:{
				
				initialize : false,
			},
			events:[
			{
				name:'change',
				self:true,
				handler:function(e){
					e.preventDefault();
					var _this = e.current;
					var status_produk_pilihan = $( this.$el ).val();
					util.trigger( $( '.table-product-wrapper' ), 'redraw', [$(".listoutlet_index").val(), $(".param-Kategori").val() , status_produk_pilihan , $(".param-Stock").val()] , $(".param-search").val() , $('div.dataTables_length select').val() );
				}
			}
			],
			methods:{
				init:function(){
					var _this = this;
					this.initialize = true;
					$(_this.$el).append('<option value="">Semua</option>');
					$(_this.$el).append('<option value="PROMO">produk promo</option>');
					$(_this.$el).append('<option value="KONSINYASI">produk konsinyasi</option>');
					$(_this.$el).append('<option value="NONKONSINYASI">produk non kosinyasi</option>');
					$(_this.$el).append('<option value="FAVORIT">produk favorit, favoritpelanggan</option>');
					$(_this.$el).append('<option value="PAKET">lom aktif</option>');
						
				}
			}
		}
	);

	apsCore.component('alokasi-outlet', {
		events:[
			{
				name:'click',
				self:true,
				handler:function(e){
					var list_id_produk="";
					e.preventDefault();
					_.each( $("#t_product tbody tr.selected"), function(i){
						list_id_produk = list_id_produk + $(i).attr("id") + ",";
					});
					$("#list_produk").val(list_id_produk.substring(0,list_id_produk.length - 1));
					$("#modal-outlet").modal('show');
				}
			}
		],
		connected:function(){
			this.init();
		},
		methods:{
			init:function(){
			},
		}
	});

	apsCore.component('add_favorit_produk', {
		events:[
			{
				name:'click',
				self:true,
				handler:function(e){
					var list_id_produk="";
					e.preventDefault();
					_.each( $("#t_product tbody tr.selected"), function(i){
						list_id_produk = list_id_produk + $(i).attr("id") + ",";
					});
					list_id_produk = list_id_produk.substring(0,list_id_produk.length - 1);
					list_id_produk = '[' + list_id_produk + ']';
					aps.req( {tipe:'ADD_PRODUKFAVORIT' , idoutlet: $( ".listoutlet_index" ).val() , listidproduk: list_id_produk} )
					.then(
						function(data){
					data = data.daftaroutlet;
					_.each( data, function(i){
					$(".modal-body .row").append
					(
						'<div class="form-check"><label class="form-check-label">' +
							'<div class="uniform-checker">' +
								'<span class="">'+
								'<input type="checkbox" class="form-check-input-styled">' +
								'</span>'+
							'</div>'+
						''+i['NAMAOUTLET']+''+
						'</label></div>'
					);
					});
				},
				aps.noop
			);
				}
			}
		],
		connected:function(){
			this.init();
		},
		methods:{
			init:function(){
			},
		}
	});

	apsCore.component('modal-alokasi-outlet', {
		// events:[
		// 	{
		// 		name:'click',
		// 		self:true,
		// 		handler:function(e){
		// 			e.preventDefault()
		// 			$("#modal-outlet").modal('show');
		// 		}
		// 	}
		// ],
		connected:function(){
			this.init();
		},
		methods:{
			init:function(){
			var _this = this;
			aps.req( {tipe:'GET_USEROUTLET'} )
			.then(
				function(data){
					data = data.daftaroutlet;
					_.each( data, function(i){
					$(".modal-body .row").append
					(
						'<div class="form-check"><label class="form-check-label">' +
							'<div class="uniform-checker">' +
								'<span class="">'+
								'<input type="checkbox" class="form-check-input-styled">' +
								'</span>'+
							'</div>'+
						''+i['NAMAOUTLET']+''+
						'</label></div>'
					);
					});
				},
				aps.noop
			);
		}
	}
	});

	apsCore.component('stock',
		{
			connected:function(){

				if (this.initialize) return;
				this.init();
			},
			data:{
				
				initialize : false,
			},
			events:[
			{
				name:'change',
				self:true,
				handler:function(e){
					e.preventDefault();
					var _this = e.current;
					var stokoption = $( this.$el ).val();
					util.trigger( $( '.table-product-wrapper' ), 'redraw', [$(".listoutlet_index").val(), $(".param-Kategori").val() , $(".param-Kategori").val() , stokoption , $(".param-search").val() , $('div.dataTables_length select').val()] );
				}
			}
			],
			methods:{
				init:function(){
					var _this = this;
					this.initialize = true;
					$(_this.$el).append('<option value="">Semua</option>');
					$(_this.$el).append('<option value="MINIMALSTOCK">Jumlah Stock < Minimal Stock</option>');
					$(_this.$el).append('<option value="MAKSIMALSTOCK">Jumlah Stock > Maksimal Stock</option>');
						
				}
			}
		}
	);

		apsCore.component('search',
		{
			connected:function(){

				if (this.initialize) return;
				this.init();
			},
			data:{
				
				initialize : false,
			},
			events:[
			{
				name:'keyup',
				self:true,
				handler:function(e){
					e.preventDefault();
					var _this = e.current;
					var search = $( this.$el ).val();
					console.log(search)
					util.trigger( $( '.table-product-wrapper' ), 'redraw', [$(".listoutlet_index").val(), $(".param-Kategori").val() , $(".param-Kategori").val() , $(".param-Stock").val() , search , $('div.dataTables_length select').val()] );
				}
			}
			],
			methods:{
				init:function(){
					var _this = this;
				}
			}
		});

		apsCore.component('limit_data',
		{
			connected:function(){

				if (this.initialize) return;
				this.init();
			},
			data:{
				
				initialize : false,
			},
			events:[
			{
				name:'change',
				self:true,
				handler:function(e){
					e.preventDefault();
					var _this = e.current;
					var limit = $( this.$el ).val();
					alert(limit)
					util.trigger( $( '.table-product-wrapper' ), 'redraw', [$(".listoutlet_index").val(), $(".param-Kategori").val() , $(".param-Kategori").val() , $(".param-Stock").val() , $(".param-search").val() , limit] );
				}
			}
			],
			methods:{
				init:function(){
					var _this = this;
				}
			}
		}
	);


})(UIkit, UIkit.util, jQuery)