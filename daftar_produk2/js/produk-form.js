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
			$( document ).trigger( _this.template + ':ready', [page] );
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
	aps.ProdukForm.prototype.init = function(){
		var _this = this;
		if( _this.action === 'edit' ){
			$( '.nav-item a', this.$el ).attr( 'data-toggle', 'tab' );
			$( '.nav-item a', this.$el ).removeClass( 'disabled' );
		}
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
		var elems = Array.prototype.slice.call( document.querySelectorAll( '.form-check-input-switchery' ) );
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
					//$( '.produk-kategori', _this.$el ).val( _this.selected ).trigger( 'change' );
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
					//$( '.produk-uom', _this.$el ).val( _this.selected ).trigger( 'change' );
				},
				aps.noop
			);
		return deferred.promise();
	};
	aps.ProdukForm.prototype.next = function(){
		var _this = this, index, $produkPage, ProdukPage;
		// if( _this.step >= 4 ){
			
			// _.map( _this.disabledKombinasi, function( kombinasi ){
				// index = _.findIndex( _this.kombinasi, {kombinasiIds:kombinasi} );
				// if( index !== -1 ){
					// _this.kombinasi.splice( index, 1 );
				// }
			// } );
			// aps.req({
				// tipe:'POST_MASTERPRODUK',
				// idproduk:$('[name="idproduk"]').val(),
				// tipestok:$('[name="tipestok"]').prop('checked') ? 1 : 0,
				// idkategoriproduk: $('[name="idkategoriproduk"]').val(),
				// namaproduk:$('[name="namaproduk"]').val(),
				// idsatuanproduk:$('[name="idsatuanproduk"]').val(),
				// berat: $('[name="berat"]').val(),
				// deskripsiproduk:$('[name="deskripsiproduk"]').val(),
				// fotoprodukutama:_this.fotoProdukUtama,
				// listvarian:_this.kombinasi,
				// listfoto:_this.listFoto,
			// })
				// .then(
					// function(data){
						// util.trigger( $( '.table-product-wrapper' ), 'redraw', []  );
						// $produkPage = $u( util.parents( _this.$el, '.uk-productpage' ) );
						// ProdukPage = apsCore.getComponent( $produkPage, 'productpage' );
						// ProdukPage.redirect ( 'index-product', {}, false );
					// },
					// aps.noop
				// );
			// return;
		// }
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
			tmp = _.template( $( '#tmpl-varian-per-outlet' ).html() ),
			_this = this;
		_this.titleNext( true );
		
		util.removeClass( $u( '.product-form-next', _this.$el ), 'd-none' );
		util.removeClass( $u( '.product-form-prev', _this.$el ), 'd-none' );
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
								kombinasi:_this.kombinasi,
								stokHarga:_this.stokhargaOutlets,
								currentOutlet: $(".listoutlet_index").val(),
								enableOutlet:_this.enableOutlet,
								disabledKombinasi:_this.disabledKombinasi,
							} 
						) 
					);
				},
				aps.noop
			);
	};
	aps.ProdukForm.prototype.step4 = function(){
		var _this = this;
		util.removeClass( $u( '.product-form-prev', _this.$el ), 'd-none' );
		//util.addClass( $u( '.product-form-next', _this.$el ), 'd-none' );
	};
	aps.ProdukForm.prototype.initVarian = function(){
		$( '.produk-varian.produk-varian-1' ).produkVarian({idVarian:'varian1'});
		$( '.produk-varian.produk-varian-2' ).produkVarian({idVarian:'varian2'});
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
			for( var i in cartesians[0] ){
				kombinasi.push( cartesians[0][i] );
			}
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

			indexPosted = _this.postedKombinasi.findindex( find => find.varian1 == ( typeof kombinasiIds[0] !== 'undefined' ? kombinasiIds[0] : '' ) && find.varian2 == ( typeof kombinasiIds[1] !== 'undefined' ? kombinasiIds[1] : '' ) );
			
			postedKombinasi = indexPosted !== -1 ? _this.postedKombinasi[ indexPosted ] : {};
			index1 = _this.DataProduk.varian.findIndex( find => find.idvarian == typeof postedKombinasi.idVarian1 !== 'undefined' ? postedKombinasi.idVarian1: '' );
			index2 = index1 !== -1 ? _this.DataProduk.varian[ index1 ].subvarian.findIndex( find => find.idproduk_var == typeof postedKombinasi.idVarian2 !== 'undefined' ? postedKombinasi.idVarian2 : '' ) : -1;
			// _.map( _this.produkOutlets, function( produkOutlet ){
				
				// indexOutlet1 = _.findIndex( produkOutlet.produk.varian, { idvarian: ! _.isUndefined( postedKombinasi.idVarian1 ) ? postedKombinasi.idVarian1: '' });
				// indexOutlet2 = indexOutlet1 !== -1 ? _.findIndex(produkOutlet.produk.varian[ indexOutlet1 ].subvarian, { idproduk_var: ! _.isUndefined( postedKombinasi.idVarian2 ) ? postedKombinasi.idVarian2 : '' }) : -1;
				// dataProdukOutlet = indexOutlet1 !== -1 && indexOutlet2 !== -1 ? produkOutlet.produk.varian[ indexOutlet1 ].subvarian[ indexOutlet2 ] : {};
				
				// stokHargaOutlet = {
					// idoutlet:produkOutlet.IDOUTLET,
					// jumlahstok:dataProdukOutlet.jumlahstok,
					// hpp: ! _.isUndefined( dataProdukOutlet.hpp ) ? dataProdukOutlet.hpp : '',
					// hargajual:dataProdukOutlet.hargajual,
					// notifikasiminimalstok:dataProdukOutlet.minstok,
					// notifikasimaksimalstok:! _.isUndefined( dataProdukOutlet.maxstok ) ? dataProdukOutlet.maxstok : '',
				// };
				// liststokharga.push( stokHargaOutlet );
				// _this.stokhargaOutlets[ produkOutlet.IDOUTLET ] = _this.stokhargaOutlets[ produkOutlet.IDOUTLET ] || {};
				// _this.stokhargaOutlets[ produkOutlet.IDOUTLET ][ stringKombinasiIds ] = stokHargaOutlet;
			// } );
			
			// _this.kombinasi[i].barcode = index1 !== -1 && index2 !== -1 ? _this.DataProduk.varian[ index1 ].subvarian[ index2 ].barcode : '';
			// _this.kombinasi[i].liststokharga = liststokharga;
			// _this.kombinasi[i].dataKombinasiIds = kombinasiIds;
			// _this.kombinasi[i].dataProdukKombinasi = produkKombinasi;
			// _this.kombinasi[i].kombinasiIds = stringKombinasiIds;
			// if( produkKombinasi.length === 2 && produkKombinasi[1] === '' && produkKombinasi[0] !== '' ){
				// _this.kombinasi[i].produkKombinasi = produkKombinasi[0];
			// } else if( produkKombinasi.length === 2 && produkKombinasi[1] === '' && produkKombinasi[0] === '' ){
				// _this.kombinasi[i].produkKombinasi = $('[name="namaproduk"]').val();
			// } else {
				// _this.kombinasi[i].produkKombinasi = produkKombinasi.join( ' - ' );
			// }
			
		} );
		console.log(_this.kombinasi);
	};
	aps.ProdukForm.prototype.combine = function(){
		var _this			= this,
			$produkKombinasi= $( '.produk-kombinasi-varian', _this.$el );
			//tmp 			= _.template( $( '#tmpl-varian-kombinasi' ).html() );
			
		_this.generateKombinasi();
			
		// if( _this.useSubvarian !==  _this.$parentForm.useSubvarian ){
			// $produkKombinasi.empty();
		// }
		// _.map( _this.$parentForm.kombinasi, function( combination ){
			// var $varianKombinasiItem = $( '.varian-kombinasi-item[data-kombinasi="' + combination.kombinasiIds + '"]', $produkKombinasi );
			// if( ! $varianKombinasiItem.length ){
				// $produkKombinasi.append(
					// tmp( 
						// {
							// produk:combination.produkKombinasi,
							// kombinasi:combination.kombinasiIds,
							// barcode:combination.barcode,
							// dataProduk:combination.dataProdukKombinasi,
							// dataKombinasi:combination.dataKombinasiIds,
						// } 
					// ) 
				// );
			// } else {
				// $( '.varian-kombinasi-item-nama', $varianKombinasiItem ).html( combination.produkKombinasi );
			// }
								
		// } );
		// _this.useSubvarian =  _this.$parentForm.useSubvarian;
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
	aps.addProductInit = function( page ){
		$( '.produk-page-nav.produk-page-nav__index', page.$el ).ProdukPageNav({template:'index-product', refresh:false});
		aps.produkForm = $( '.produk-form', page.$el ).produkForm();
	};
	$( document ).ready(function(){
		aps.init();	
	});
	$( document ).on( 'add-product:ready', function(e, page){
		aps.addProductInit( page );
	} );
})(jQuery)