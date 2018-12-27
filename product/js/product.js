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
	//console.log( aps.cartesian.apply( null, [ [1,2,3], [1,2,3], [1,2,3] ] ) )
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
	apsCore.component('tableproductwrapper',{
		connected:function(){
			this.init();
		},
		events:[
			{
				name:'redraw',
				self:true,
				handler:function(e, outletpilihan ,kategoripilihan , statusprodukpilihan){
					var table = $( '#tmpl-table-productasd' ),
						 tmp = _.template( table.html() );
					$( this.$el ).html( tmp( {idoutlet:outletpilihan , idkategori : kategoripilihan , statusproduk : statusprodukpilihan} ) );
				}
			}
		],
		methods:{
			init:function(){
				var table = $( '#tmpl-table-productasd' );
				var tmp = _.template( table.html() );
				$( this.$el ).html( tmp( {idoutlet:1 , idkategori : "" , statusproduk : ""} ) );
			}
		}
	});
	apsCore.component(
		
		'tableproduct',
		{
			connected:function(){
				if (this.initialize == false){
					this.init();
				}
				
			},
			props:{
				table:Object,
				idoutlet:String,
				idkategori : String,
			},
			data:{
				table:false,
				initialize : false,
				idoutlet:1,
				idkategori :"",
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
			}
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
										$(this).html( '<input type="text" placeholder="Search '+title+'" />' );
										$( 'input', this ).on( 'keyup change', function () {
										if ( table.column(i).search() !== this.value ) {
											table
												.column(i)
												.search( this.value )
												.draw();
										}
										});
									}
									else if (i > 1)
									{
										var text = title.replace(" ", "_");
										if (text == "Stock")
										{
											$(this).html( '<select data-uk-'+text+' class=param-'+text+'></select>' );
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
									idoutlet 		: _this.idoutlet, 
									search 			: '', 
									limit			: 1000, 
									page			: 0,
									idkategori		: _this.idkategori , 
									statusproduk 	: '',
									stokoption 		: ''
								};
								console.log(y)
								$.ajax({
										type: "POST",
										url: 'https://development.autopilotstore.co.id/api_all.php',
										data: JSON.stringify(y),
										success: function(data){
											 data_p = data.daftarproduk;
											 console.log(data_p)
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
														i['idproduk']
															
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
												"pagingType": "simple_numbers",
												"deferLoading": totalproduct,
												"data" : data_produk,
												"fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
												{
													var tag_image = "";
													var varian = "";
													var subvarian = "";
													var jumlahstoktotal = "";
													varian = '</br>'+ aData[2].length + ' varian';
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
													return nRow;
												},
												"fnInitComplete": function (oSettings, json) {
	// 												//$('#SALESAREATSALESAREA tbody tr:eq(0)').click();


												},
												"fnDrawCallback": function (oSettings, json) {
													$(".param-Kategori").val(_this.idkategori);
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
				this.init();
			},
			events:[
			{
				name:'change',
				self:true,
				handler:function(e){
					e.preventDefault();
					var _this = e.current;
					 var outletpilihan = $( this.$el ).val();
					alert('aaa')
					var datajson = {action : "UPDATE_SELECTED_OUTLET", outlet : outletpilihan};
					util.trigger( $( '.table-product-wrapper' ), 'redraw', [outletpilihan , "" ] );
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
					util.trigger( $( '.table-product-wrapper' ), 'redraw', [$(".listoutlet_index").val(),outletpilihan] );
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


	apsCore.component( 'productpage', {
		mixins:[Class],
		connected:function(){
			this.init();
		},
		props:{
			type:String,
			template:String,
		},
		data:{
			type:'header',
			template:'index'
		},
		events:[
			{
				name:'click',
				delegate:'.aps-add-product',
				handler:function(e){
					e.preventDefault();
					this.addProduct();
				}
			},
			{
				name:'change_page',
				self:true,
				handler:function(e){
					e.preventDefault();
					this.changePage();
				}
			}
		],
		methods:{
			init:function(){
				this.changePage();
			},
			addProduct:function(){
				this.render( $( '#tmpl-add-product' ), {} );
			},
			changePage:function(){
				this.render( $( '#tmpl-' + this.template ), {} );
			},
			render:function( $template, data ){
				var tmp = _.template( $template.html() );
				$( this.$el, $( '.aps-container' ) ).html( tmp( data ) );
			}
		}
	});
	
	apsCore.component( 'switchery', {
		mixins:[Class],
		connected:function(){
			this.init();
		},
		methods:{
			init:function(){
				new Switchery(this.$el);
			},
		}
	});
	
	apsCore.component( 'uniform', {
		mixins:[Class],
		connected:function(){
			this.init();
		},
		methods:{
			init:function(){
				$( this.$el ).uniform();
			},
		}
	});
	
	apsCore.component( 'selectproductcategory', {
		mixins:[Class],
		connected:function(){
			this.init();
		},
		methods:{
			init:function(){
				var _this = this;
				aps.req( {tipe:'GET_KATEGORIPRODUK'} )
					.then(
						function(data){
							var dataSelect = $.map( data.daftarkategoriproduk, function( obj ){
								obj.id = obj.id || obj.IDKATEGORIPRODUK;
								obj.text = obj.text || obj.NAMAKATEGORIPRODUK;
								return obj;
							} );
							$( _this.$el ).select2({
							  data: dataSelect
							});
						},
						aps.noop
					);
			},
		}
	});
	
	apsCore.component( 'selectproductuom', {
		mixins:[Class],
		connected:function(){
			this.init();
		},
		methods:{
			init:function(){
				var _this = this;
				aps.req( {tipe:'GET_MASTERSATUAN'} )
					.then(
						function(data){
							var dataSelect = $.map( data.listsatuan, function( obj ){
								obj.id = obj.id || obj.IDSATUANPRODUK;
								obj.text = obj.text || obj.NAMASATUANPRODUK;
								return obj;
							} );
							$( _this.$el ).select2({
							  data: dataSelect
							});
						},
						aps.noop
					);
			},
		}
	});
	
	apsCore.component( 'producttab', {
		mixins:[Class],
		events:[
			{
				name: 'click',
				delegate:'.nav-item a[data-toggle="tab"]',
				handler:function(e){
					this.clickTab(e);
				}
			}
		],
		methods:{
			clickTab:function(e){
				var that = e.current;
				util.trigger( $( $( that ).attr("href") ), 'tab_show', [ $( that ).attr("href"), $( that ).data("step") ] );
			},
		}
	});
	
	apsCore.component( 'productform', {
		mixins:[Class],
		connected:function(){
			!util.hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
		},
		props:{
			step:Number,
			action:String,
		},
		data:{
			step:1,
			action:'add',
		},
		events:[
			{
				name: 'tab_show',
				delegate:'.tab-pane',
				handler:function(e, target, step){
					var _this = this;
					switch( step ){
						case 2:
							this.step2();
							break;
						case 3:
							this.step3();
							break;
					}
					this.step = step;
				}
				
			},
			{
				name: 'click',
				delegate:'.product-form-next',
				handler:function(e, target){
					e.preventDefault();
					this.next();
				}
				
			}
		],
		methods:{
			tabShow:function( e, target ){
				
			},
			next: function(){
				if( this.step >= 4 ){return;}
				if( this.step == 1 && this.action == 'add' ){
					this.save( this.step );
				}
				this.step++;
				util.trigger( $u( '.nav-item a[data-toggle="tab"][data-step="' + this.step + '"]' ), 'click' );
			},
			save:function( step ){
				var _this = this;
				switch( step ){
					case 1:
						aps.req({
							tipe:'POST_MASTERPRODUK',
							idproduk:"",
							tipestok:$('[name="tipestok"]').prop('checked') ? 1 : 0,
							idkategoriproduk: $('[name="idkategoriproduk"]').val(),
							namaproduk:$('[name="namaproduk"]').val(),
							idsatuanproduk:$('[name="idsatuanproduk"]').val(),
							berat: $('[name="berat"]').val(),
							deskripsiproduk:$('[name="deskripsiproduk"]').val(),
							fotoprodukutama:'',
							listvarian:[],
							listfoto:[],
						})
							.then(
								function(data){
									console.log(data)
								},
								aps.noop
							);
						break;
				}
				
			},
			step2:function(){
				var _this = this,
					notyConfirm = new Noty({
						theme: 'limitless',
						text: '<h4 class="mb-3">Gunakan Varian Produk?</h6>',
						timeout: false,
						modal: true,
						layout: 'center',
						closeWith: 'button',
						type: 'confirm',
						buttons: [
							Noty.button('Tidak', 'btn btn-danger', function () {
								notyConfirm.close();
								_this.next();
							}),

							Noty.button('Ya', 'btn bg-blue ml-1', function () {
									notyConfirm.close();
								},
								{id: 'button1', 'data-status': 'ok'}
							)
						]
					}).show();
			},
			step3:function(){
				var outlets = [],
					tmp = _.template( $( '#tmpl-varian-per-outlet' ).html() ),
					_this = this,
					$kombinasivarian = apsCore.getComponent( $u( '.uk-kombinasivarian', _this.$el ), 'kombinasivarian' );
				if( ! $kombinasivarian ){return;}
				aps.req( 
					{
						tipe:'GET_OUTLET',
						idoutlet:'',
					} 
				)
					.then(
						function(data){
							outlets = data.daftaroutlet
								
							$( '.produkstokharga-outlets', _this.$el ).html( 
								tmp( 
									{
										outlets:outlets,
										kombinasi:$kombinasivarian.kombinasi,
									} 
								) 
							);
						},
						aps.noop
					);
			},
		}
	});
		
	apsCore.component( 'varianitems', {
		mixins:[Class],
		props:{
			varians:Array,
		},
		data:{
			varians:[],
		},
		events:[
			{
				name:'click',
				delegate:'.add-varian',
				handler:function(e){
					e.preventDefault();
					var _this = this;
					this.addVarian().then(function(){
						_this.changeKombinasi();
					});
				}
			},
			{
				name:'change',
				delegate:'.produk-varian-item-value',
				handler:function(e){
					this.changeKombinasi();
				}
			},
		],
		connected:function(){
			this.init();
		},
		methods:{
			init:function(){
			},
			addVarian:function( id ){
				var tmp = _.template( $( '#tmpl-varian-input' ).html() ),
					_this = this;
				id = id || _.uniqueId( 'varian-' + _.now() + '-' );
				return new util.Promise(function(resolve){
					$( '.produk-varian-items', _this.$el ).append( 
						tmp( 
							{
								itemid:id
							} 
						) 
					);
					resolve( _this );
				});
				
			},
			changeKombinasi:function(){
				var _this = this,
					form = util.parents( $u( _this.$el ), '.uk-productform' ),
					items = util.toNodes( util.$$( '.produk-varian-item-value', _this.$el ) );
					_this.varians = [];
					items.map( function(el, i){
						_this.varians.push( util.data( el, 'data-itemid' ) );
					});
				util.trigger( $u( '.uk-kombinasivarian', $u( form ) ), 'change_kombinasi' );
			},
		}
	});
	
	apsCore.component( 'varianitemvalue', {
		mixins:[Class],
		props:{
			itemid:String,
			value:String,
		},
		data:{
			itemid:'',
			value:'',
		},
		events:[
		],
		connected:function(){
			this.init();
		},
		methods:{
			init:function(){
				this.itemid = this.itemid || _.uniqueId( 'varian-' + _.now() + '-' );
				!util.hasAttr( this.$el, 'data-itemid' ) && util.attr( this.$el, 'data-itemid', this.itemid );
			},
		}
	});
	
	apsCore.component( 'kombinasivarian', {
		props:{
			kombinasi:Array,
			kombinasiStringify:String,
		},
		data:{
			kombinasi:[],
			kombinasiStringify:'',
		},
		mixins:[Class],
		events:[
			{
				name:'change_kombinasi',
				self:true,
				handler:function(e){
					e.preventDefault()
					this.changeKombinasi(e);
				}
			}
		],
		connected:function(){
			!util.hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
		},
		methods:{
			changeKombinasi:function(e){
				
				var _this			= this,
					form			= util.parents( $u( _this.$el ), '.uk-productform' ),
					varians 		= util.toNodes( util.$$( '.uk-varianitems', $u( form ) ) ),
					$produkKombinasi= $( '.produk-kombinasi-varian', _this.$el ),
					tmp 			= _.template( $( '#tmpl-varian-kombinasi' ).html() ),
					cartesians 		= [],
					kombinasi 		= [],
					produkKombinasi = [],
					kombinasiIds 	= [],
					combinations 	= [];
					
				varians.map( function( $el, i ){
					varian = apsCore.getComponent( $el, 'varianitems' );
					cartesians.push( varian.varians );
				} );
				
				kombinasi = aps.cartesian.apply( null, cartesians );
				combinations = [];
				_this.kombinasi = [];
				
				for( var i in kombinasi ){
					produkKombinasi = [];
					kombinasiIds = [];
					_this.kombinasi[i] = {barcode:'', liststokharga:[]};
					for( var j in kombinasi[i] ){
						produkKombinasi.push( $( '[data-itemid="' + kombinasi[i][j] + '"]' ).val() );
						kombinasiIds.push( kombinasi[i][j] );
						_this.kombinasi[i][ 'varian' + ( parseInt( j ) + 1 ) ] = $( '[data-itemid="' + kombinasi[i][j] + '"]' ).val();
						
					}
					_this.kombinasi[i].dataKombinasiIds = kombinasiIds;
					_this.kombinasi[i].dataProdukKombinasi = produkKombinasi;
					_this.kombinasi[i].kombinasiIds = encodeURI( JSON.stringify( kombinasiIds ) );
					_this.kombinasi[i].produkKombinasi = produkKombinasi.join( ' - ' );
					combinations.push(
						{
							produkKombinasi:produkKombinasi,
							kombinasiIds:kombinasiIds
						}
					);
				}
				_.map( _this.kombinasi, function( combination ){
					var $varianKombinasiItem = $( '.varian-kombinasi-item[data-kombinasi="' + combination.kombinasiIds + '"]', $produkKombinasi );
					if( ! $varianKombinasiItem.length ){
						$produkKombinasi.append(
							tmp( 
								{
									produk:combination.produkKombinasi,
									kombinasi:combination.kombinasiIds,
									barcode:'',
									dataProduk:combination.dataProdukKombinasi,
									dataKombinasi:combination.dataKombinasiIds,
								} 
							) 
						);
					} else {
						$( '.varian-kombinasi-item-nama', $varianKombinasiItem ).html( combination.produkKombinasi );
					}
										
				} );
				
			}
		}
	 }
	);
	apsCore.component( 'produkstokharga_outlets', {
		props:{
			KombinasiVarian:Object,
		},
		data:{
			KombinasiVarian:{},
		},
		events:[
			{
				name:'change',
				delegate:'.produkstokharga_outlets-input',
				handler:function(){
					this.sync();
				}
			}
		],
		connected:function(){
			this.init();
		},
		methods:{
			init:function(){
				this.KombinasiVarian = apsCore.getComponent( $u( '.uk-kombinasivarian', $u( util.parents( this.$el, '.uk-productform' ) ) ), 'kombinasivarian' );
				console.log(this.KombinasiVarian)
			},
			sync:function(){
				
				var _this = this,
					outlets = util.toNodes( util.$$( '.produkstokharga-outlet', _this.$el ) ),
					inputs = [],
					liststokharga = {},
					inputValue = {},
					index;
				
				outlets.map( function(outlet, i){
					
					inputs = util.toNodes( util.$$( '.produkstokharga_outlets-input', outlet ) );
					inputValue = {};
					inputValue.idoutlet = $( outlet ).data( 'outlet' );
					
					liststokharga[ $( outlet ).data( 'kombinasi' ) ] = liststokharga[ $( outlet ).data( 'kombinasi' ) ] || [];
					
					inputs.map( function(input, j){
						inputValue[ util.attr( input, 'name' ) ] = $( input ).val();
					});
					liststokharga[ $( outlet ).data( 'kombinasi' ) ].push( inputValue );
				});
				
				_.map( liststokharga, function( value, key ){
					index = _.findIndex(_this.KombinasiVarian.kombinasi, { kombinasiIds: key});
					_this.KombinasiVarian.kombinasi[ index ].liststokharga = value;
				} );
			}
		},
	} );
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
					alert('')
					var list_id_produk="";
					e.preventDefault();
					_.each( $("#t_product tbody tr.selected"), function(i){
						list_id_produk = list_id_produk + $(i).attr("id") + ",";
					});
					list_id_produk = list_id_produk.substring(0,list_id_produk.length - 1);
					list_id_produk = '[' + list_id_produk + ']';
					console.log(list_id_produk)
					console.log($( ".listoutlet_index" ).val())
					aps.req( {tipe:'ADD_PRODUKFAVORIT' , idoutlet: $( ".listoutlet_index" ).val() , listidproduk: list_id_produk} )
					.then(
						function(data){
					data = data.daftaroutlet;
					console.log(data)
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
					console.log(data)
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

	apsCore.component(
		
		'stock',
		{
			connected:function(){

				if (this.initialize) return;
				this.init();
			},
			data:{
				
				initialize : false,
			},
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


})(UIkit, UIkit.util, jQuery)