Array.prototype.unique = function( filter ) {
  return this.filter(function (value, index, self) {
	return self.findIndex( find => find.id === value.id ) === index;
  });
};
(function($){
	'use strict';
	window.aps = window.aps||{};
	aps.Generator = function(){};

	aps.Generator.prototype.rand =  Math.floor(Math.random() * 26) + Date.now();

	aps.Generator.prototype.getId = function() {
		return this.rand++;
	};
	aps.generator = new aps.Generator();
	aps.apiURL = 'https://development.autopilotstore.co.id/api_all.php';
	
	aps.noop = function( message ){
		alert( message );
	};
	
	aps.cartesian = function( cartesians ) {
		var result = [];
		$.map( cartesians[0], function( obj, i ){
			$.map( cartesians[1], function( obj2, j ){
				result.push([obj,obj2]);
			} );
		} );
		return result;
	};
	
	aps.req = function( params ){
		var dataString = JSON.stringify( params ), deferred = new $.Deferred();
		$.ajax({
			type: "POST",
			url: aps.apiURL,
			data: dataString,
			success: function( data ){
				if( data.errcode == "OK" ){
					deferred.resolve( data );
				} else {
					deferred.reject( data.message );
				}
				
			},
			error:function(){
				reject( 'error xhr' );
			},
			dataType: 'json',
		});
		return deferred.promise();
	};
	aps.ProdukPage = function(){
		this.template = 'add-product';
		this.refresh = true;
		this.$el = $( '.produk-page' );
	};
	aps.ProdukPage.prototype.init = function(){
		this.changePage();
	};
	aps.ProdukPage.prototype.redirect = function( template, data, refresh ){
		template = template || this.template;
		data = data || {};
		refresh = typeof refresh !== 'undefined' ?  refresh : true;
		this.template = template;
		this.refresh = refresh;
		this.changePage( data );
	};
	aps.ProdukPage.prototype.changePage = function( data ){
		data = data || {};
		var	_this = this;
		this.render( $( '#tmpl-' + _this.template ), data ).then(function( page ){
			$( document ).trigger( _this.template + ':ready', [page, data] );
		});
	};
	aps.ProdukPage.prototype.render = function( $template, data ){
		var tmp = $template.html(),
			deferred = new $.Deferred(),
			resolveObject = {};
		$( '.aps-container', this.$el ).hide();
		if( this.refresh ){
			$( '.aps-container[data-template="' + this.template + '"]', this.$el )
				.html( tmp )
				.show();
		} else {
			$( '.aps-container[data-template="' + this.template + '"]', this.$el ).show();
		}
		resolveObject.$el = $( '.aps-container[data-template="' + this.template + '"]', this.$el );
		deferred.resolve(resolveObject);
		return deferred.promise();
	};
	aps.ProdukPageNav = function( $el, options ){
		this.$el = $el;
		this.template = options.template;
		this.refresh = options.refresh;
		this.init();
	};
	aps.ProdukPageNav.prototype.init = function(){
		var _this = this;
		$( _this.$el ).on( 'click', function(e){
			e.preventDefault();
			aps.produkPage.redirect( _this.template, {}, _this.refresh );
		});
	};
	aps.ProdukForm = function( $el, options ){
		this.$el = $el;
		this.step = options.step;
		this.action = options.action;
		this.dataProduk = options.dataProduk;
		this.DataProduk = options.DataProduk;
		this.useVarian = options.useVarian;
		this.useSubvarian = options.useSubvarian;
		this.kombinasiUseSubvarian = options.kombinasiUseSubvarian;
		this.varians = options.varians;
		this.kombinasi = options.kombinasi;
		this.postedKombinasi = options.postedKombinasi;
		this.produkOutlets = options.produkOutlets;
		this.stokhargaOutlets = options.stokhargaOutlets;
		this.enableOutlet = options.enableOutlet;
		this.listFoto = options.listFoto;
		this.fotoProdukUtama = options.fotoProdukUtama;
		this.disabledKombinasi = options.disabledKombinasi;
		this.init();
	};
	aps.ProdukForm.prototype.refreshData = function(){
		var _this = this;
		_this.DataProduk = {};
		_this.useVarian = false;
		_this.useSubvarian = false;
		_this.varians = {};
		_this.kombinasi = [];
		_this.postedKombinasi = [];
		_this.produkOutlets = [];
		_this.stokhargaOutlets = {};
		_this.enableOutlet = [];
	};
	aps.ProdukForm.prototype.initStatement = function(){
		
		var _this = this;
		_this.initSwitchery();
		_this.addProdukKategori();
		_this.initProdukKategori();
		_this.addProdukSatuan();
		_this.initProdukSatuan();
		_this.initTab();
		_this.initVarian();
		$( '.product-form-next', _this.$el ).on( 'click', function(e){
			e.preventDefault();
			_this.next();
		});
		$( '.product-form-prev', _this.$el ).on( 'click', function(e){
			e.preventDefault();
			_this.prev();
		});
	};
	aps.ProdukForm.prototype.init = function(){
		var _this = this;
		if( _this.action === 'edit' ){
			$( '.nav-item a', this.$el ).attr( 'data-toggle', 'tab' );
			$( '.nav-item a', this.$el ).removeClass( 'disabled' );
		}
		_this.setDataProduk();
	};
	aps.ProdukForm.prototype.setDataProduk = function(){
		var _this = this, count = 0, varian2 = [], varianItems;
		if( _this.action == 'edit' ){
			_this.varians.varian1 = [];
			console.log(_this.DataProduk)
			$( 'input[name="namaproduk"]' ).val( _this.DataProduk.namaproduk );
			$( 'input[name="berat"]' ).val( _this.DataProduk.berat );
			$( 'textarea[name="deskripsiproduk"]' ).val( _this.DataProduk.deskripsiproduk );
			if( _this.DataProduk.tipe === '1' ){
				$( 'input[name="tipestok"]' ).prop( 'checked', true );
			}
			_this.getOutlets().then(function( outlets ){
				
				_this.getProdukOutlets( outlets ).then(function( produkOutlets ){
					_this.initStatement();
					
					_this.produkOutlets = $.grep( produkOutlets, function(produkOutlet){
						if( produkOutlet.produk ){
							_this.enableOutlet.push( produkOutlet.IDOUTLET );
						}
						return produkOutlet.produk;
					} );
					console.log(_this.enableOutlet)
					if( _this.DataProduk.varian.length ===1 && _this.DataProduk.varian[0].varian1 === '' ){
						_this.useVarian = false;
					} else {
						_this.useVarian = true;
					}
					$.map( _this.DataProduk.varian, function( _varian1 ){
				
						_this.varians.varian1.push( 
							{ 
								id:'varian1-' + _varian1.idvarian.split( '.' )[1], 
								name:_varian1.varian1,
							} 
						);
						
						$.map( _varian1.subvarian, function( _varian2 ){
							varian2.push( 
								{
									id:'varian2-' + _varian2.idproduk_var.split( '.' )[2], 
									name:_varian2.varian2,
								}
							);
							_this.postedKombinasi.push({
								varian1:'varian1-' + _varian1.idvarian.split( '.' )[1],
								varian2:'varian2-' + _varian2.idproduk_var.split( '.' )[2],
								idVarian1:_varian1.idvarian,
								idVarian2:_varian2.idproduk_var,
								barcode:_varian2.barcode,
							});
							
						} );
						
					} );
					_this.varians.varian2 = varian2.unique( 'id' );
					_this.generateKombinasi();
					_this.$varian1.setVarian();
					_this.$varian2.setVarian();
					_this.$varian1.changeKombinasi();
					_this.$varian1.changeKombinasi();
				},aps.noop);
				
			}, aps.noop);
			
		} else {
			_this.initStatement();
		}
	};
	aps.ProdukForm.prototype.getProdukOutlets = function( outlets ){
		var _this = this, deferred = new $.Deferred(), count = outlets.length, produkOutlets = [], params = {};

		$.map( outlets, function( outlet ){
			params = {
				tipe			: 'GET_MASTERPRODUK',
				idoutlet 		: outlet.IDOUTLET, 
				search 			: _this.DataProduk.idproduk, 
				limit			: 1, 
				page			: 0,
				idkategori		: '' , 
				statusproduk 	: '',
				stokoption 		: '',
			};

			$.ajax({
				type: "POST",
				url: aps.apiURL,
				data: JSON.stringify( params ),
				beforeSend:function(){
					$.blockUI({ 
						message: '<i class="icon-spinner4 spinner"></i>',
						//timeout: 2000, //unblock after 2 seconds
						overlayCSS: {
							backgroundColor: '#1b2024',
							opacity: 0.8,
							zIndex: 1200,
							cursor: 'wait'
						},
						css: {
							border: 0,
							color: '#fff',
							padding: 0,
							zIndex: 1201,
							backgroundColor: 'transparent'
						}
					});
				},
				success: function( data ){
					$.unblockUI();
					if( data.errcode == "OK" ){
						if( typeof data.daftarproduk[0] !== 'undefined' ){
							produkOutlets.push( { IDOUTLET:outlet.IDOUTLET, produk: data.daftarproduk[0] } );
						} else {
							produkOutlets.push( { IDOUTLET:outlet.IDOUTLET, produk: false } );
						}
					}
					
				},
				complete: function(){
					count--;
					if( count <= 0 ){
						deferred.resolve( produkOutlets );
					}
				},
				dataType: 'json',
			});
		} );
		return deferred.promise();
	};
	aps.ProdukForm.prototype.getOutlets = function(){
		var _this = this, deferred = new $.Deferred();
		aps.req( 
			{
				tipe:'GET_USEROUTLET',
				idoutlet:'',
			} 
		).then(
			function(data){
				deferred.resolve( data.listuseroutlet );
			},
			function(){
				deferred.reject();
			}
		);
		return deferred.promise();
	};
	aps.ProdukForm.prototype.tabShow = function( step ){
		var _this = this;
		switch( step ){
			case 1:
				this.step1();
				break;
			case 2:
				this.step2();
				break;
			case 3:
				this.step3();
				break;
			case 4:
				this.step4();
				break;
		}
		this.step = step;
	};
	aps.ProdukForm.prototype.initTab = function(){
		var _this = this;
		$( '.nav-item a', _this.$el ).on( 'click', function(e){
			e.preventDefault();
			_this.tabShow( $( e.currentTarget ).data("step") );
		} );
	};
	aps.ProdukForm.prototype.initSwitchery = function(){
		var elems = Array.prototype.slice.call( document.querySelectorAll( '.aps-container[data-template="add-product"] .form-check-input-switchery' ) );
		elems.forEach( function( html ) {
			var switchery = new Switchery( html );
		});
	};
	aps.ProdukForm.prototype.addProdukKategori = function(){
		var _this = this;
		$( '.add-kategori', _this.$el ).on( 'click', function(e){
			e.preventDefault();
			$( '.add-kategori-input' ).val('');
			$("#modal-add-kategori").modal('show');
		});
		$( '.add-kategori-save' ).on( 'click', function(){
			var value = $( '.add-kategori-input' ).val();
			if( value !== '' ){
				aps.req( {tipe:'ADD_KATEGORIPRODUK',namakategoriproduk:value} )
					.then(
						function(data){
							_this.initProdukKategori().then(function(){
								$( '.produk-kategori', _this.$el ).val( value ).trigger( 'change' );
							});
							
						},
						aps.noop
					);
			} else {
				new Noty({
					theme: 'limitless',
					text: '<h4 class="mb-3">Nama Kategori Tidak Boleh Kosong</h6>',
					timeout: 1000,
					layout: 'center',
					closeWith: 'click',
					type: 'alert',
				}).show();
			}
		} );
	};
	aps.ProdukForm.prototype.initProdukKategori = function(){
		var _this = this, deferred = new $.Deferred();
		aps.req( {tipe:'GET_KATEGORIPRODUK'} )
			.then(
				function(data){
					var dataSelect = $.map( data.daftarkategoriproduk, function( obj ){
						obj.id = obj.id || obj.IDKATEGORIPRODUK;
						obj.text = obj.text || obj.NAMAKATEGORIPRODUK;
						return obj;
					} );
					$( '.produk-kategori', _this.$el ).empty();
					$( '.produk-kategori', _this.$el ).select2({
					  data: dataSelect
					});
					deferred.resolve();
					if( typeof _this.DataProduk.idkategoriproduk !== 'undefined' ){
						$( '.produk-kategori', _this.$el ).val( _this.DataProduk.idkategoriproduk ).trigger( 'change' );
					}
					
				},
				aps.noop
			);
		return deferred.promise();
	};
	aps.ProdukForm.prototype.addProdukSatuan = function(){
		var _this = this;
		$( '.add-uom', _this.$el ).on( 'click', function(e){
			e.preventDefault();
			$( '.add-uom-input' ).val('');
			$("#modal-add-satuan").modal('show');
		});
		$( '.add-uom-save' ).on( 'click', function(){
			var value = $( '.add-uom-input' ).val();
			if( value !== '' ){
				aps.req( {tipe:'ADD_MASTERSATUAN',namasatuan:value} )
					.then(
						function(data){
							_this.initProdukSatuan().then(function(){
								$( '.produk-uom', _this.$el ).val( value ).trigger( 'change' );
							});
							
						},
						aps.noop
					);
			} else {
				new Noty({
					theme: 'limitless',
					text: '<h4 class="mb-3">Nama Satuan Tidak Boleh Kosong</h6>',
					timeout: 1000,
					layout: 'center',
					closeWith: 'click',
					type: 'alert',
				}).show();
			}
		} );
	};
	aps.ProdukForm.prototype.initProdukSatuan = function(){
		var _this = this, deferred = new $.Deferred();
		aps.req( {tipe:'GET_MASTERSATUAN'} )
			.then(
				function(data){
					var dataSelect = $.map( data.listsatuan, function( obj ){
						obj.id = obj.id || obj.IDSATUANPRODUK;
						obj.text = obj.text || obj.NAMASATUANPRODUK;
						return obj;
					} );
					$( '.produk-uom', _this.$el ).empty();
					$( '.produk-uom', _this.$el ).select2({
					  data: dataSelect
					});
					deferred.resolve();
					if( typeof _this.DataProduk.idsatuanproduk !== 'undefined' ){
						$( '.produk-uom', _this.$el ).val( _this.DataProduk.idsatuanproduk ).trigger( 'change' );
					}
					
				},
				aps.noop
			);
		return deferred.promise();
	};
	aps.ProdukForm.prototype.next = function(){
		var _this = this, index, $produkPage, ProdukPage;
		if( _this.step === 3 ){
			
			$.map( _this.disabledKombinasi, function( kombinasi ){
				index = _this.kombinasi.findIndex( find => find.kombinasiIds == kombinasi );
				if( index !== -1 ){
					_this.kombinasi.splice( index, 1 );
				}
			} );
			aps.req({
				tipe:'POST_MASTERPRODUK',
				idproduk:$('[name="idproduk"]').val(),
				tipestok:$('[name="tipestok"]').prop('checked') ? 1 : 0,
				idkategoriproduk: $('[name="idkategoriproduk"]').val(),
				namaproduk:$('[name="namaproduk"]').val(),
				idsatuanproduk:$('[name="idsatuanproduk"]').val(),
				berat: $('[name="berat"]').val(),
				deskripsiproduk:$('[name="deskripsiproduk"]').val(),
				listvarian:_this.kombinasi,
			})
				.then(
					function(data){
						//util.trigger( $( '.table-product-wrapper' ), 'redraw', []  );
						//$produkPage = $u( util.parents( _this.$el, '.uk-productpage' ) );
						//ProdukPage = apsCore.getComponent( $produkPage, 'productpage' );
						_this.redirect( 'index-product', {}, false );
					},
					aps.noop
				);
			return;
		}
		_this.step++;
		$( '.nav-item a[data-step="' + _this.step + '"]' ).attr( 'data-toggle', 'tab' );
		$( '.nav-item a[data-step="' + _this.step + '"]' ).removeClass( 'disabled' );
		$( '.nav-item a[data-step="' + _this.step + '"]' ).trigger( 'click' );
	};
	aps.ProdukForm.prototype.prev = function(){
		if( this.step <= 1 ){return;}
		this.step--;
		$( '.nav-item a[data-step="' + this.step + '"]' ).trigger( 'click' );
	};
	aps.ProdukForm.prototype.save = function( step ){
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
		
	};
	aps.ProdukForm.prototype.titleNext = function( isSimpan ){
		var _this = this;
		if( isSimpan ){
			$( '.product-form-next .title-next', _this.$el ).addClass( 'd-none' );
			$( '.product-form-next .title-simpan', _this.$el ).removeClass( 'd-none' );
		} else {
			$( '.product-form-next .title-next', _this.$el ).removeClass( 'd-none' );
			$( '.product-form-next .title-simpan', _this.$el ).addClass( 'd-none' );
		}
	};
	aps.ProdukForm.prototype.step1 = function(){
		var _this = this;
		_this.titleNext( false );
		$( '.product-form-prev', _this.$el ).addClass( 'd-none' );
		$( '.product-form-next', _this.$el ).removeClass( 'd-none' );
	};
	aps.ProdukForm.prototype.step2 = function(){
		var _this = this;
		
		_this.titleNext( false );
		$( '.product-form-next', _this.$el ).removeClass( 'd-none' );
		$( '.product-form-prev', _this.$el ).removeClass( 'd-none' );
		_this.notyConfirm = _this.notyConfirm || new Noty({
			theme: 'limitless',
			text: '<h4 class="mb-3">Gunakan Varian Produk?</h6>',
			timeout: false,
			modal: true,
			layout: 'center',
			closeWith: 'button',
			type: 'confirm',
			buttons: [
				Noty.button('Tidak', 'btn btn-danger', function () {
					_this.varians.varian1 = [{id:'varian1-empty', name:''}];
					_this.varians.varian2 = [{id:'varian2-empty', name:''}];
					_this.notyConfirm.close();
					//util.trigger( $u( '.uk-kombinasivarian', $u( _this.$el ) ), 'change_kombinasi', [] );
				}),

				Noty.button( 'Ya', 'btn bg-blue ml-1', function () {
						_this.notyConfirm.close();
						$( '.produk-varianitems-wrapper', _this.$el ).removeClass( 'd-none' );
						_this.useVarian = true;
						
						// //if(  )
						// var varian1 = apsCore.getComponent( $u( '.uk-varianitems[data-idvarian="varian1"]', _this.$el ), 'varianitems' );
						// varian1.addVarian().then(function(){
							// varian1.changeKombinasi();
						// });
						
					},
					{id: 'button1', 'data-status': 'ok'}
				)
			]
		});
		if( _this.action === 'add' ){
			if( !_this.useVarian ){
				_this.notyConfirm.show();
			} else {
				$( '.produk-varianitems-wrapper', _this.$el ).removeClass( 'd-none' );
			}
		} else {
			$( '.produk-varianitems-wrapper', _this.$el ).removeClass( 'd-none' );
		}
		
	};
	aps.ProdukForm.prototype.step3 = function(){
		var outlets = [],
			//tmp = _.template( $( '#tmpl-varian-per-outlet' ).html() ),
			$outlets_html = '',
			$listHarga = '',
			currentOutlet = $(".listoutlet_index").val(),
			checkedOutlet = '',
			_this = this;
		_this.titleNext( true );
		
		$( '.product-form-next', _this.$el ).removeClass( 'd-none' );
		$( '.product-form-prev', _this.$el ).removeClass( 'd-none' );
		aps.req( 
			{
				tipe:'GET_USEROUTLET',
				idoutlet:'',
			} 
		)
			.then(
				function(data){
					outlets = data.listuseroutlet;
					if( typeof outlets == 'object' ){
						$.map( outlets, function( outlet ){
							checkedOutlet = ( /*currentOutlet === outlet.IDOUTLET ||*/ $.inArray( outlet.IDOUTLET, _this.enableOutlet ) !== -1 ) ? 'checked' : '';
							$listHarga = '';
							$.map( _this.kombinasi, function( kombinasi ){
								var stokHargaOutlet = typeof _this.stokhargaOutlets[ outlet.IDOUTLET ] !== 'undefined'
										&& 
									typeof _this.stokhargaOutlets[ outlet.IDOUTLET ][ kombinasi.kombinasiIds ] !== 'undefined' 
										? 
									_this.stokhargaOutlets[ outlet.IDOUTLET ][ kombinasi.kombinasiIds ] 
										: 
									{
										jumlahstok:"",
										hpp: "",
										hargajual:"",
										notifikasiminimalstok:"",
										notifikasimaksimalstok:"",
									}
								if( $.inArray( kombinasi.kombinasiIds, _this.disabledKombinasi ) == -1 ){
									$listHarga += `<tr class="produkstokharga-outlet" data-kombinasi="` + kombinasi.kombinasiIds + `" data-outlet="`+ outlet.IDOUTLET +`">
										<td>`+ kombinasi.produkKombinasi +`</td>
										<td><input value="`+ stokHargaOutlet.jumlahstok +`" type="text" class="form-control produkstokharga_outlets-input" placeholder="Stok" name="jumlahstok" data-produk-prop="jumlahstok"></td>
										<td><input value="`+ stokHargaOutlet.hargajual +`" type="text" class="form-control produkstokharga_outlets-input" placeholder="Harga Jual" name="hargajual" data-produk-prop="hargajual"></td>
										<td><input value="`+ stokHargaOutlet.hpp +`" type="text" class="form-control produkstokharga_outlets-input" placeholder="Harga HPP" name="hpp" data-produk-prop="hpp"></td>
										<td><input value="`+ stokHargaOutlet.notifikasiminimalstok +`" type="text" class="form-control produkstokharga_outlets-input" placeholder="Notifikasi Minimal Stok" name="notifikasiminimalstok" data-produk-prop="minstok"></td>
										<td><input value="`+ stokHargaOutlet.notifikasimaksimalstok +`" type="text" class="form-control produkstokharga_outlets-input" placeholder="Notifikasi Maksimal Stok" name="notifikasimaksimalstok" data-produk-prop="maxstok"></td>
									</tr>`;
								}
							} );
							$outlets_html += `
							<div class="card produkstokharga-outlet-item">
								<div class="card-header">
									<h6 class="card-title">
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" name="enableOutlet" value="`+ outlet.IDOUTLET + `" class="form-check-input-styled enable-outlet" data-fouc="" `+ checkedOutlet +` data-uk-uniform>
												<a data-toggle="collapse" class="text-default" href="#produkstokharga-outlets-wrapper-outlet`+ outlet.IDOUTLET + `">`+ outlet.NAMAOUTLET + `</a>
											</label>
										</div>
									</h6>
								</div>

								<div id="produkstokharga-outlets-wrapper-outlet`+ outlet.IDOUTLET + `" class="collapse" data-parent="#produkstokharga-outlets-wrapper">
									<div class="card-body">
										<div class="table-responsive">
											<table class="table table-produkstokharga_outlet" data-uk-produkstokharga_outlet>
												<thead>
													<tr>
														<th>Nama Produk</th>
														<th>Stok</th>
														<th>Harga Jual</th>
														<th>Harga HPP</th>
														<th>Notifikasi Minimal Stok</th>
														<th>Notifikasi Maksimal Stok</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td></td>
														<td>
															<div class="form-check">
																<label class="form-check-label">
																	<input type="checkbox" data-field="jumlahstok" class="form-check-input-styled all-varian jumlahstok-all" data-fouc="" data-uk-uniform>
																	Berlaku di semua varian
																</label>
															</div>
														</td>
														<td>
															<div class="form-check">
																<label class="form-check-label">
																	<input type="checkbox" data-field="hargajual" class="form-check-input-styled all-varian hargajual-all" data-fouc="" data-uk-uniform>
																	Berlaku di semua varian
																</label>
															</div>
														</td>
														<td>
															<div class="form-check">
																<label class="form-check-label">
																	<input type="checkbox" data-field="hpp" class="form-check-input-styled all-varian hpp-all" data-fouc="" data-uk-uniform>
																	Berlaku di semua varian
																</label>
															</div>
														</td>
														<td>
															<div class="form-check">
																<label class="form-check-label">
																	<input type="checkbox" data-field="notifikasiminimalstok" class="form-check-input-styled all-varian notifikasiminimalstok-all" data-fouc="" data-uk-uniform>
																	Berlaku di semua varian
																</label>
															</div>
														</td>
														<td>
															<div class="form-check">
																<label class="form-check-label">
																	<input data-field="notifikasimaksimalstok" type="checkbox" class="form-check-input-styled all-varian notifikasimaksimalstok-all" data-fouc="" data-uk-uniform>
																	Berlaku di semua varian
																</label>
															</div>
														</td>
													</tr>
													`+ $listHarga +`
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							`;
						} );
						
					}
					$( '#produkstokharga-outlets-wrapper', _this.$el ).html( 
						$outlets_html 
					).promise().done(function(){
						_this.initListHarga();
					});
				},
				aps.noop
			);
	};
	aps.ProdukForm.prototype.step4 = function(){
		var _this = this;
		$( '.product-form-prev', _this.$el ).removeClass( 'd-none' );
		$( '.product-form-next', _this.$el ).addClass( 'd-none' );
	};
	aps.ProdukForm.prototype.initListHarga = function(){
		var _this = this;
		$( '#produkstokharga-outlets-wrapper [data-uk-uniform]', _this.$el ).uniform();
		$( '#produkstokharga-outlets-wrapper .all-varian',  _this.$el ).on( 'change', function(){
			var _that = this,
				field = $( _that ).data( 'field' ),
				table = $( _that ).parents( '.table-produkstokharga_outlet' ),
				$primaryField = $( '.produkstokharga_outlets-input[name="' + field + '"]:eq(0)', table ),
				$secondaryField = $( '.produkstokharga_outlets-input[name="' + field + '"]:not(:eq(0))', table );
			if( $( _that ).prop('checked') ){
				$secondaryField.prop( 'disabled', true );
				$secondaryField.val( $primaryField.val() );
				$( '.produkstokharga_outlets-input[name="' + field + '"]', table ).trigger( 'change' );
			} else {
				$secondaryField.prop( 'disabled', false );
			}
		} );
		$( '#produkstokharga-outlets-wrapper .produkstokharga_outlets-input',  _this.$el ).on( 'change', function(){
			var _that = this,
				table = $( _that ).parents( '.table-produkstokharga_outlet' ),
				field = $( _that ).attr( 'name' ),
				$allVarianCheck = $( '.all-varian[data-field="' + field + '"]', table ),
				$secondaryField = $( '.produkstokharga_outlets-input[name="' + field + '"]:not(:eq(0))', table );
			if( $allVarianCheck.prop('checked') ){
				$secondaryField.val( $( _that ).val() );
			}
		} );
		$( '#produkstokharga-outlets-wrapper .enable-outlet', _this.$el ).on( 'change', function(){
			var inputs = $( 'input.enable-outlet', _this.$el );
			_this.enableOutlet = [];
			inputs.each( function(i,input){
				if( $( input ).prop( 'checked' ) ){
					_this.enableOutlet.push( $( input ).val() );
				}
			});
			//_this.syncHarga();
		} );
		$( '#produkstokharga-outlets-wrapper .produkstokharga_outlets-input', _this.$el ).on( 'change', function(){
			var _that = this,
				parentForm = _this,
				indexPosted,
				postedKombinasi,
				indexOutlet,
				index1,
				index2,
				$wrapper = $( _that ).parents( '.produkstokharga-outlet' ),
				dataKombinasi = $wrapper.data( 'kombinasi' ),
				kombinasiIds = JSON.parse( decodeURI( dataKombinasi ) );
				
			indexPosted = parentForm.postedKombinasi.findIndex( 
				find => find.varian1 == typeof kombinasiIds[0] !== 'undefined' ? kombinasiIds[0] : '' && find.varian2 == typeof kombinasiIds[1] !== 'undefined' ? kombinasiIds[1] : ''
			);
			postedKombinasi = indexPosted !== -1 ? parentForm.postedKombinasi[ indexPosted ] : {};
			
			indexOutlet = parentForm.produkOutlets.findIndex( find => find.IDOUTLET == $wrapper.data( 'outlet' ).toString() );

			index1 = indexOutlet !== -1 ? parentForm.produkOutlets[ indexOutlet ].produk.varian.findIndex( find => find.idvarian == typeof postedKombinasi.idVarian1 !== 'undefined' ? postedKombinasi.idVarian1: '' ) : -1;
			index2 = index1 !== -1 ? parentForm.produkOutlets[ indexOutlet ].produk.varian[ index1 ].subvarian.findIndex( find => find.idproduk_var == typeof postedKombinasi.idVarian2 !== 'undefined' ? postedKombinasi.idVarian2 : '' ) : -1;
			
			if(  index1 !== -1 && index2 !== -1 ){
				parentForm.produkOutlets[ indexOutlet ].produk.varian[ index1 ].subvarian[ index2 ][ $( _that ).data( 'produk-prop' ) ] = $( _that ).val();
				
			}
			_this.syncHarga();
		} );
	};
	aps.ProdukForm.prototype.syncHarga = function(){
		var _this = this,
			outlets = $( '#produkstokharga-outlets-wrapper .produkstokharga-outlet', _this.$el ),
			inputs = [],
			parentForm = _this,
			liststokharga = {},
			inputValue = {},
			index,
			stringKombinasiIds,
			idoutlet;
		
		
		outlets.each( function(i, outlet){
			
			idoutlet = $( outlet ).data( 'outlet' );
			stringKombinasiIds = $( outlet ).data( 'kombinasi' );
			inputValue = {};
			
			liststokharga[ stringKombinasiIds ] = liststokharga[ stringKombinasiIds ] || [];
			
			inputs = $( '.produkstokharga_outlets-input', outlet );
			inputs.each( function(j, input){
				inputValue[ $( input ).attr( 'name' ) ] = $( input ).val();
			});
			inputValue.idoutlet = idoutlet;
			
			if( $( 'input[name="enableOutlet"][value="' + idoutlet + '"]', $( outlet ).parents( '' ) ).prop( 'checked' ) ){
				
				liststokharga[ stringKombinasiIds ].push( inputValue );
			}

			_this.stokhargaOutlets[ idoutlet ] = _this.stokhargaOutlets[ idoutlet ] || {};
			_this.stokhargaOutlets[ idoutlet ][ stringKombinasiIds ] = inputValue;
		});
		
		$.map( liststokharga, function( value, key ){
			index = _this.kombinasi.findIndex( find => find.kombinasiIds == key );
			_this.kombinasi[ index ].liststokharga = value;
		} );
		
	};
	aps.ProdukForm.prototype.initVarian = function(){
		var _this = this;
		_this.$varian1 = $( '.produk-varian.produk-varian-1' ).produkVarian({idVarian:'varian1'});
		_this.$varian2 = $( '.produk-varian.produk-varian-2' ).produkVarian({idVarian:'varian2'});
	};
	aps.ProdukForm.prototype.getKombinasi = function(){
		var _this = this, cartesians = [], kombinasi = [], useSubvarian = false;
		$.map( _this.varians, function( _varian, idvarian ){
			cartesians.push( _varian );
		} );
		if( cartesians.length > 1 ){
			kombinasi = aps.cartesian( cartesians );
			useSubvarian = true;
		} else if( cartesians.length === 1 ) {
			$.map( cartesians[0], function( cartesian ){
				kombinasi.push( cartesian );
			});
		}
		return { kombinasi:kombinasi, useSubvarian:useSubvarian };
	};
	aps.ProdukForm.prototype.generateKombinasi = function(){
		var _this = this, stringKombinasiIds, stokHargaOutlet, postedKombinasi,liststokharga, produkKombinasi, indexPosted, index, index1, index2, indexOutlet1, indexOutlet2, dataProdukOutlet, kombinasiIds, dataKombinasi = _this.getKombinasi(), barcode = '', liststokharga = [];
		_this.useSubvarian = dataKombinasi.useSubvarian;
		$.map( dataKombinasi.kombinasi, function( kombinasi, i ){
			produkKombinasi = [];
			kombinasiIds = [];
			postedKombinasi = {};
			liststokharga = [];
			_this.kombinasi[i] = {};
			
			if( dataKombinasi.useSubvarian ){
				$.map( kombinasi, function( kombinasi2, j ){
					produkKombinasi.push( kombinasi2.name );
					kombinasiIds.push( kombinasi2.id );
					_this.kombinasi[i][ 'varian' + ( parseInt( j ) + 1 ) ] = kombinasi2.name;
				} );
			} else {
				produkKombinasi.push( kombinasi.name );
				kombinasiIds.push( kombinasi.id );
				_this.kombinasi[i].varian1 = kombinasi.name;
				_this.kombinasi[i].varian2 = '';
			}
			
			stringKombinasiIds = encodeURI( JSON.stringify( kombinasiIds ) );

			indexPosted = _this.postedKombinasi.findIndex( find => find.varian1 == ( typeof kombinasiIds[0] !== 'undefined' ? kombinasiIds[0] : '' ) && find.varian2 == ( typeof kombinasiIds[1] !== 'undefined' ? kombinasiIds[1] : '' ) );
			
			postedKombinasi = indexPosted !== -1 ? _this.postedKombinasi[ indexPosted ] : {};
			index1 = typeof _this.DataProduk.varian !== 'undefined' ? _this.DataProduk.varian.findIndex( find => find.idvarian == typeof postedKombinasi.idVarian1 !== 'undefined' ? postedKombinasi.idVarian1: '' ) : -1;
			index2 = index1 !== -1 ? _this.DataProduk.varian[ index1 ].subvarian.findIndex( find => find.idproduk_var == typeof postedKombinasi.idVarian2 !== 'undefined' ? postedKombinasi.idVarian2 : '' ) : -1;
			$.map( _this.produkOutlets, function( produkOutlet ){
				indexOutlet1 = produkOutlet.produk.varian.findIndex( find => find.idvarian == typeof postedKombinasi.idVarian1 !== 'undefined' ? postedKombinasi.idVarian1: '' );
				indexOutlet2 = indexOutlet1 !== -1 ? produkOutlet.produk.varian[ indexOutlet1 ].subvarian.findIndex(find => find.idproduk_var == ! typeof postedKombinasi.idVarian2 !== 'undefined' ? postedKombinasi.idVarian2 : '' ) : -1;
				dataProdukOutlet = indexOutlet1 !== -1 && indexOutlet2 !== -1 ? produkOutlet.produk.varian[ indexOutlet1 ].subvarian[ indexOutlet2 ] : {};
				
				stokHargaOutlet = {
					idoutlet:produkOutlet.IDOUTLET,
					jumlahstok:dataProdukOutlet.jumlahstok,
					hpp: typeof dataProdukOutlet.hpp !== 'undefined' ? dataProdukOutlet.hpp : '',
					hargajual:dataProdukOutlet.hargajual,
					notifikasiminimalstok:dataProdukOutlet.minstok,
					notifikasimaksimalstok: typeof dataProdukOutlet.maxstok !== 'undefined' ? dataProdukOutlet.maxstok : '',
				};
				liststokharga.push( stokHargaOutlet );
				_this.stokhargaOutlets[ produkOutlet.IDOUTLET ] = _this.stokhargaOutlets[ produkOutlet.IDOUTLET ] || {};
				_this.stokhargaOutlets[ produkOutlet.IDOUTLET ][ stringKombinasiIds ] = stokHargaOutlet;
			} );
			
			_this.kombinasi[i].barcode = index1 !== -1 && index2 !== -1 ? _this.DataProduk.varian[ index1 ].subvarian[ index2 ].barcode : '';
			_this.kombinasi[i].liststokharga = liststokharga;
			_this.kombinasi[i].dataKombinasiIds = kombinasiIds;
			_this.kombinasi[i].dataProdukKombinasi = produkKombinasi;
			_this.kombinasi[i].kombinasiIds = stringKombinasiIds;
			if( produkKombinasi.length === 2 && produkKombinasi[1] === '' && produkKombinasi[0] !== '' ){
				_this.kombinasi[i].produkKombinasi = produkKombinasi[0];
			} else if( produkKombinasi.length === 2 && produkKombinasi[1] === '' && produkKombinasi[0] === '' ){
				_this.kombinasi[i].produkKombinasi = $('[name="namaproduk"]').val();
			} else {
				_this.kombinasi[i].produkKombinasi = produkKombinasi.join( ' - ' );
			}
			
		} );
	};
	aps.ProdukForm.prototype.combine = function(){
		var _this			= this,
			$produkKombinasi= $( '.produk-kombinasi-varian', _this.$el ),
			dataVarianAttr = '';
			//tmp 			= _.template( $( '#tmpl-varian-kombinasi' ).html() );
			
		_this.generateKombinasi();
			
		if( _this.kombinasiUseSubvarian !==  _this.useSubvarian ){
			$produkKombinasi.empty();
		}
		$.map( _this.kombinasi, function( combination ){
			dataVarianAttr = '';
			var $varianKombinasiItem = $( '.varian-kombinasi-item[data-kombinasi="' + combination.kombinasiIds + '"]', $produkKombinasi );
			if( ! $varianKombinasiItem.length ){
				$.map( combination.dataKombinasiIds, function( cmb, i ){
					dataVarianAttr += 'data-varian'+( parseInt( i ) + 1 ) + '="'+ cmb +'" ';
				});
				$produkKombinasi.append( 
					`
					<tr class="varian-kombinasi-item" data-kombinasi="`+ combination.kombinasiIds +`" `+ dataVarianAttr +`>
						<td class="text-center">
							<a href="#" class="disabled-kombinasi" data-action="disabled"><i class="icon-cross2 text-danger-400"></i></a>
						</td>
						<td class="varian-kombinasi-item-nama">`+ combination.produkKombinasi +`</td>
						<td class="varian-kombinasi-item-barcode"><input type="text" class="form-control" value="`+ combination.barcode +`" placeholder="Barcode" name="barcode"></td>
					</tr>
					`
				);
			} else {
				$( '.varian-kombinasi-item-nama', $varianKombinasiItem ).html( combination.produkKombinasi );
			}
								
		} );
		_this.kombinasiUseSubvarian =  _this.useSubvarian;
	};
	aps.ProdukVarian = function( $el, options ){
		this.$el = $el;
		this.idVarian = options.idVarian;
		this.init();
	};
	aps.ProdukVarian.prototype.init = function(){
		var _this = this;
		$( _this.$el ).on( 'click', '.add-varian', function(e){
			e.preventDefault();
			_this.addVarian().then(function(){
				_this.changeKombinasi();
			});
		} );
		$( _this.$el ).on( 'change', '.produk-varian-item-value', function(){
			_this.changeKombinasi();
		} );
	};
	aps.ProdukVarian.prototype.setVarian = function(){
		var _this = this,
			varians = typeof aps.produkForm.varians[ _this.idVarian ] !== 'undefined' ? aps.produkForm.varians[ _this.idVarian ] : [];
		if( varians.length === 1 && varians[0].name === '' ){
			varians = [];
		}
		$.map( varians, function( varian ){
			return _this.addVarian( varian.id, varian.name );
		});
	};
	aps.ProdukVarian.prototype.addVarian = function( id, name ){
		var _this = this, deferred = new $.Deferred();
		
		id = id || aps.generator.getId();
		name = name || '';
		$( '.produk-varian-items', _this.$el ).append( 
			`
			<div class="form-group produk-varian-item-wrapper">
				<div class="input-group">
					<span class="input-group-prepend delete-varian">
						<span class="input-group-text">X</span>
					</span>
					<input type="text" name="varian[]" value="`+ name +`" class="form-control produk-varian-item-value" data-itemid="`+ id +`">
				</div>
			</div>
			`
		);
		deferred.resolve();
		return deferred.promise();
	};
	aps.ProdukVarian.prototype.changeKombinasi = function( event, data ){
		var _this = this,
			items = $( '.produk-varian-item-value', _this.$el );
			
		event = event || 'change_kombinasi';
		data = data || [];
		
		aps.produkForm.varians[ _this.idVarian ] = [];

		items.each( function(i, el){
			var itemid = $( el ).data( 'itemid' );
			aps.produkForm.varians[ _this.idVarian ].push( {
				id: itemid,
				name:$( el ).val()
			} );
		});
		aps.produkForm.combine();
	}
	$.fn.produkVarian = function( options ){
		options = options || {};
		options = Object.assign( 
			{
				idVarian:'varian1',
			},
			options
		);
		//console.log(options)
		return new aps.ProdukVarian( this, options );
	};
	$.fn.ProdukPageNav = function( options ){
		options = options || {};
		options = Object.assign( 
			{
				template:'index',
				refresh:true,
			},
			options
		);
		return new aps.ProdukPageNav( this, options );
	};
	
	$.fn.produkForm = function( options ){
		options = options || {};
		
		options = Object.assign( 
			{
				step:1,
				action:'add',
				dataProduk:'',
				DataProduk:{},
				useVarian:false,
				useSubvarian:false,
				kombinasiUseSubvarian:false,
				varians:{},
				kombinasi:[],
				postedKombinasi:[],
				produkOutlets:[],
				stokhargaOutlets:{},
				enableOutlet:[],
				listFoto:[],
				fotoProdukUtama:'',
				disabledKombinasi:[],
			},
			options
		);
		return new aps.ProdukForm( this, options );
	};
	aps.init = function(){
		aps.produkPage = new aps.ProdukPage();
		$( '.aps-add-product' ).ProdukPageNav({template:'add-product', refresh:true});
	};
	aps.addProductInit = function( page, dataProduk ){
		$( '.produk-page-nav.produk-page-nav__index', page.$el ).ProdukPageNav({template:'index-product', refresh:false});
		aps.produkForm = $( '.produk-form', page.$el ).produkForm(dataProduk);
	};
	$( document ).ready(function(){
		aps.init();	
	});
	$( document ).off( 'add-product:ready' );
	$( document ).on( 'add-product:ready', function(e, page, dataProduk){
		aps.addProductInit( page, dataProduk );
	} );
})(jQuery)