(function (apsCore, util, $) {
	
	var $u = util.$,
		attr = util.attr,
		css = util.css,
		addClass = util.addClass;
		
	window.aps = window.aps || {};
	
	var Class = {
		connected:function(){
			!util.hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
		},
	};
	
	var ParentForm = {
		connected:function(){
			this.$parentForm = apsCore.getComponent( $u( util.parents( this.$el, '.uk-productform' ) ), 'productform' );
			this.parentForm = $u( util.parents( this.$el, '.uk-productform' ) );
		}
	};
	/* Product Page Index */
	apsCore.component( 'productpage_nav', {
		mixins:[Class],
		props:{
			template:String,
			refresh:Boolean,
			args:String,
		},
		data:{
			template:'index-product',
			refresh:true,
			args:"",
		},
		events:[
			{
				name:'click',
				self:true,
				handler:function(e){
					e.preventDefault();
					var _this = this,
						_that = e.current,
						$produkPage = $u( util.parents( _this.$el, '.uk-productpage' ) ),
						ProdukPage = apsCore.getComponent( $produkPage, 'productpage' ),
						args = this.args !== '' ? JSON.parse( decodeURI( this.args ) ) : {};
					
					ProdukPage.redirect ( _this.template, args, _this.refresh );
				}
			},
		],
	});
	apsCore.component( 'productpage', {
		mixins:[Class],
		connected:function(){
			this.init();
		},
		props:{
			type:String,
			template:String,
			refresh:Boolean,
		},
		data:{
			type:'header',
			template:'index',
			refresh:true,
		},
		methods:{
			init:function(){
				this.changePage();
			},
			redirect:function( template, data, refresh ){
				template = template || this.template;
				data = data || {};
				refresh = ! _.isUndefined( refresh ) ?  refresh : true;
				this.template = template;
				this.refresh = refresh;
				this.changePage( data );
			},
			changePage:function( data ){
				data = data || {};
				this.render( $( '#tmpl-' + this.template ), data );
			},
			render:function( $template, data ){
				var tmp = _.template( $template.html() );
				$( '.aps-container', this.$el ).hide();

				if( this.refresh ){
					$( '.aps-container[data-template="' + this.template + '"]', this.$el )
						.html( tmp( {data:data} ) )
						.show();
				} else {
					$( '.aps-container[data-template="' + this.template + '"]', this.$el ).show();
				}
				
			}
		}
	});
	/* /Product Page Index */
	
	/* Form Component */
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
		props:{
			selected:String,
		},
		data:{
			selected:'',
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
							$( _this.$el ).val( _this.selected ).trigger( 'change' );
						},
						aps.noop
					);
			},
		}
	});
	
	apsCore.component( 'selectproductuom', {
		mixins:[Class],
		props:{
			selected:String,
		},
		data:{
			selected:'',
		},
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
							$( _this.$el ).val( _this.selected ).trigger( 'change' );
						},
						aps.noop
					);
			},
		}
	});
	/* /Form Component */

	/* Form Product */
	apsCore.component( 'productform', {
		mixins:[Class],
		connected:function(){
			!util.hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
			this.init();
		},
		props:{
			step:Number,
			action:String,
			dataProduk:String,
			DataProduk:Object,
			useVarian:Boolean,
			useSubvarian:Boolean,
			varians:Object,
			kombinasi:Array,
			postedKombinasi:Array,
			produkOutlets:Array,
		},
		data:{
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
		},
		events:[
			{
				name: 'tab_show',
				delegate:'.tab-pane',
				handler:function(e, target, step){
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
				}
				
			},
			{
				name: 'click',
				delegate:'.product-form-next',
				handler:function(e, target){
					e.preventDefault();
					this.next();
				}
				
			},
			{
				name: 'click',
				delegate:'.product-form-prev',
				handler:function(e, target){
					e.preventDefault();
					this.prev();
				}
				
			}
		],
		methods:{
			init:function(){
				var _this = this, varian2 = [], varianItems;
				if( _this.dataProduk !== '' ){
					
					_this.DataProduk = JSON.parse( decodeURI( _this.dataProduk ) );
					_this.varians.varian1 = [];
					_this.getOutlets().then(function( outlets ){
						
						_this.getProdukOutlets( outlets ).then(function( produkOutlets ){
							
							_this.produkOutlets = produkOutlets;
							_.map( _this.DataProduk.varian, function( _varian1 ){
						
								_this.varians.varian1.push( 
									{ 
										id:'varian1-' + _varian1.idvarian.split( '.' )[1], 
										name:_varian1.varian1,
									} 
								);
								
								_.map( _varian1.subvarian, function( _varian2 ){
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
							_this.varians.varian2 = _.uniq( varian2, 'id' );
							_this.generateKombinasi();
							 varianitems = util.toNodes( util.$$( '.uk-varianitems', _this.$el ) );
							 varianitems.map( function(el, i){
								VarianItem = apsCore.getComponent( el, 'varianitems' );
								VarianItem.setVarian().then( function(){
									VarianItem.changeKombinasi();
								} );
							 } );
							 console.log(_this)
						},aps.noop);
						
					}, aps.noop);
				}
			},
			getKombinasi:function(){
				var _this = this, cartesians = [], kombinasi = [], useSubvarian = false;
				_.map( _this.varians, function( _varian, idvarian ){
					! _.isEmpty( _varian ) && cartesians.push( _varian );
				} );
				if( cartesians.length > 1 ){
					kombinasi = aps.cartesian.apply( null, cartesians );
					useSubvarian = true;
				} else if( cartesians.length === 1 ) {
					for( var i in cartesians[0] ){
						kombinasi.push( cartesians[0][i] );
					}
				}
				return { kombinasi:kombinasi, useSubvarian:useSubvarian };
			},
			generateKombinasi:function(){
				var _this = this, postedKombinasi, produkKombinasi, indexPosted, index, index1, index2, kombinasiIds, dataKombinasi = _this.getKombinasi(), barcode = '', liststokharga = [];
				console.log('AAAAAAAA')
				_this.useSubvarian = dataKombinasi.useSubvarian;
				_.map( dataKombinasi.kombinasi, function( kombinasi, i ){
					
					produkKombinasi = [];
					kombinasiIds = [];
					postedKombinasi = {};
					
					_this.kombinasi[i] = {};
					
					if( dataKombinasi.useSubvarian ){
						_.map( kombinasi, function( kombinasi2, j ){
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
					
					indexPosted = _.findIndex( 
						_this.postedKombinasi, 
						{ 
							varian1: ( ! _.isUndefined( kombinasiIds[0] ) ? kombinasiIds[0] : '' ),
							varian2: ( ! _.isUndefined( kombinasiIds[1] ) ? kombinasiIds[1] : '' ),
						} 
					);
					postedKombinasi = indexPosted !== -1 ? _this.postedKombinasi[ indexPosted ] : {};
					index1 = _.findIndex(_this.DataProduk.varian, { idvarian: ! _.isUndefined( postedKombinasi.idVarian1 ) ? postedKombinasi.idVarian1: '' });
					index2 = index1 !== -1 ? _.findIndex(_this.DataProduk.varian[ index1 ].subvarian, { idproduk_var: ! _.isUndefined( postedKombinasi.idVarian2 ) ? postedKombinasi.idVarian2 : '' }) : -1;
					
					_.map( _this.produkOutlets, function( produkOutlet ){
						console.log(produkOutlet)
					} );
					
					_this.kombinasi[i].barcode = index1 !== -1 && index2 !== -1 ? _this.DataProduk.varian[ index1 ].subvarian[ index2 ].barcode : '';
					_this.kombinasi[i].liststokharga = [];
					_this.kombinasi[i].dataKombinasiIds = kombinasiIds;
					_this.kombinasi[i].dataProdukKombinasi = produkKombinasi;
					_this.kombinasi[i].kombinasiIds = encodeURI( JSON.stringify( kombinasiIds ) );
					_this.kombinasi[i].produkKombinasi = produkKombinasi.join( ' - ' );
				} );
			},
			requestProdukOutlets:function( params, IDOUTLET ){
				var dataString = JSON.stringify( params );
				return new util.Promise( function(resolve, reject){
					$.ajax({
						type: "POST",
						url: aps.apiURL,
						data: dataString,
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
								resolve( { IDOUTLET:IDOUTLET, produk: data.daftarproduk[0] } );
							} else {
								reject( { IDOUTLET:IDOUTLET, produk: {} } );
							}
							
						},
						error:function(){
							$.unblockUI();
							reject( { IDOUTLET:IDOUTLET, produk: {} } );
						},
						dataType: 'json',
					});
				});
			},
			getProdukOutlets:function( outlets ){
				var _this = this;
				return util.Promise.all( _.map( outlets, function( outlet ){
					return _this.requestProdukOutlets({
						tipe			: 'GET_OUTLETMASTERPRODUK',
						idoutlet 		: outlet.IDOUTLET, 
						search 			: _this.DataProduk.idproduk, 
						limit			: 1, 
						page			: 0,
						idkategori		: '' , 
						statusproduk 	: '',
						stokoption 		: '',
					}, outlet.IDOUTLET );
				} ));
			},
			getOutlets:function(){
				return new util.Promise( function( resolve, reject ){
					aps.req( 
						{
							tipe:'GET_OUTLET',
							idoutlet:'',
						} 
					)
						.then(
							function(data){
								resolve( data.daftaroutlet );
							},
							function(){
								reject();
							}
						);
				} );
			},
			next: function(){
				if( this.step >= 4 ){return;}
				this.step++;
				util.trigger( $u( '.nav-item a[data-toggle="tab"][data-step="' + this.step + '"]' ), 'click' );
			},
			prev: function(){
				if( this.step <= 1 ){return;}
				this.step--;
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
			titleNext:function( isSimpan ){
				var _this = this;
				if( isSimpan ){
					util.addClass( $u( '.product-form-next .title-next', _this.$el ), 'd-none' );
					util.removeClass( $u( '.product-form-next .title-simpan', _this.$el ), 'd-none' );
				} else {
					util.removeClass( $u( '.product-form-next .title-next', _this.$el ), 'd-none' );
					util.addClass( $u( '.product-form-next .title-simpan', _this.$el ), 'd-none' );
				}
			},
			step1:function(){
				var _this = this;
				_this.titleNext( false );
				util.addClass( $u( '.product-form-prev', _this.$el ), 'd-none' );
				util.removeClass( $u( '.product-form-next', _this.$el ), 'd-none' );
			},
			step2:function(){
				var _this = this;
				
				_this.titleNext( false );
				util.removeClass( $u( '.product-form-next', _this.$el ), 'd-none' );
				util.removeClass( $u( '.product-form-prev', _this.$el ), 'd-none' );
				
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
							_this.notyConfirm.close();
							
						}),

						Noty.button( 'Ya', 'btn bg-blue ml-1', function () {
								_this.notyConfirm.close();
								$( '.produk-varianitems-wrapper', _this.$el ).removeClass( 'd-none' );
								_this.useVarian = true;
							},
							{id: 'button1', 'data-status': 'ok'}
						)
					]
				});
				!_this.useVarian &&  _this.notyConfirm.show();
			},
			step3:function(){
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
									} 
								) 
							);
						},
						aps.noop
					);
			},
			step4:function(){
				var _this = this;
				util.removeClass( $u( '.product-form-prev', _this.$el ), 'd-none' );
				util.addClass( $u( '.product-form-next', _this.$el ), 'd-none' );
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
						listvarian:_this.kombinasi,
						listfoto:[],
					})
						.then(
							function(data){
								console.log(data)
							},
							aps.noop
						);
			},
		}
	});
	
	apsCore.component( 'producttab', {
		mixins:[Class, ParentForm],
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
	
	apsCore.component( 'varianitems', {
		mixins:[Class, ParentForm],
		props:{
			varians:Array,
			idVarian:String,
		},
		data:{
			varians:[],
			idVarian:'',
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
			{
				name : 'click',
				delegate:'.delete-varian',
				handler:function(e){
					var _that = e.current,
						_this = this,
						$wrapper = $u( util.parents( _that, '.produk-varian-item-wrapper' ) );
					this.deleteVarian($wrapper).then(function( result ){
						_this.changeKombinasi( 'delete_kombinasi', [ result.itemid, result.idvarian ] );
					});
				}
			}
		],
		connected:function(){
			this.init();
		},
		methods:{
			init:function(){
				var _this = this;
				!util.hasAttr( _this.$el, 'data-idvarian' ) && util.attr( _this.$el, 'data-idvarian', _this.idVarian );
			},
			setVarian:function(){
				var _this = this,
					varians = ! _.isUndefined( _this.$parentForm.varians[ _this.idVarian ] ) ? _this.$parentForm.varians[ _this.idVarian ] : [];
				return util.Promise.all(
					_.map( varians, function( varian ){
						return _this.addVarian( varian.id, varian.name );
					})
				);
				
			},
			addVarian:function( id, name ){
				var tmp = _.template( $( '#tmpl-varian-input' ).html() ),
					_this = this;
				id = id || _.uniqueId( 'varian-' + _.now() + '-' );
				name = name || '';
				return new util.Promise(function(resolve){
					$( '.produk-varian-items', _this.$el ).append( 
						tmp( 
							{
								itemid:id,
								value:name,
							} 
						) 
					);
					resolve( _this );
				});
				
			},
			deleteVarian:function( $wrapper ){
				var _this = this,
					$field = $u( '.produk-varian-item-value', $wrapper ),
					Field = apsCore.getComponent( $field, 'varianitemvalue' ),
					$varian = $u( util.parents( $wrapper, '.uk-varianitems' ) ),
					itemid;
				return new util.Promise(function(resolve){
					itemid = Field.itemid;
					Field.$destroy();
					$( $wrapper ).remove();
					resolve( {itemid:itemid, idvarian:util.data( $varian, 'data-idvarian' )} );
				});
			},
			changeKombinasi:function( event, data ){
				var _this = this,
					items = util.toNodes( util.$$( '.produk-varian-item-value', _this.$el ) );
					
				event = event || 'change_kombinasi';
				data = data || [];
				
				_this.$parentForm.varians[ _this.idVarian ] = [];
				items.map( function(el, i){
					var itemid = util.data( el, 'data-itemid' ),
						id = itemid.split( '.' );
					_this.$parentForm.varians[ _this.idVarian ].push( {
						id: itemid,
						name:$( el ).val()
					} );
				});
				util.trigger( $u( '.uk-kombinasivarian', $u( _this.parentForm ) ), event, data );
			},
		}
	});
	
	apsCore.component( 'varianitemvalue', {
		mixins:[Class, ParentForm],
		props:{
			itemid:String,
			value:String,
		},
		data:{
			itemid:'',
			value:'',
		},
		events:[],
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
		mixins:[Class, ParentForm],
		props:{
			kombinasi:Array,
			kombinasiStringify:String,
			useSubvarian:Boolean,
		},
		data:{
			kombinasi:[],
			kombinasiStringify:'',
			useSubvarian:false,
		},
		events:[
			{
				name:'change_kombinasi',
				self:true,
				handler:function(e){
					e.preventDefault()
					this.changeKombinasi(e);
				}
			},
			{
				name:'delete_kombinasi',
				self:true,
				handler:function(e, itemid, idvarian){
					e.preventDefault()
					this.deleteKombinasi(e,itemid, idvarian);
				}
			},
			{
				name:'change',
				delegate:'input[name="barcode"]',
				handler:function(e, itemid, idvarian){
					e.preventDefault()
					this.changeBarcode(e);
				}
			}
		],
		connected:function(){
			!util.hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
			this.useSubvarian = this.$parentForm.useSubvarian;
		},
		methods:{
			changeKombinasi:function(){
				
				var _this			= this,
					$produkKombinasi= $( '.produk-kombinasi-varian', _this.$el ),
					tmp 			= _.template( $( '#tmpl-varian-kombinasi' ).html() );
					
				_this.$parentForm.generateKombinasi();
					
				if( _this.useSubvarian !==  _this.$parentForm.useSubvarian ){
					$produkKombinasi.empty();
				}
				_.map( _this.$parentForm.kombinasi, function( combination ){
					var $varianKombinasiItem = $( '.varian-kombinasi-item[data-kombinasi="' + combination.kombinasiIds + '"]', $produkKombinasi );
					if( ! $varianKombinasiItem.length ){
						$produkKombinasi.append(
							tmp( 
								{
									produk:combination.produkKombinasi,
									kombinasi:combination.kombinasiIds,
									barcode:combination.barcode,
									dataProduk:combination.dataProdukKombinasi,
									dataKombinasi:combination.dataKombinasiIds,
								} 
							) 
						);
					} else {
						$( '.varian-kombinasi-item-nama', $varianKombinasiItem ).html( combination.produkKombinasi );
					}
										
				} );
				_this.useSubvarian =  _this.$parentForm.useSubvarian;
			},
			deleteKombinasi:function(e, itemid, idvarian){
				var _this = this,
					index;
					itemDeleted = util.$$( '.varian-kombinasi-item[data-' + idvarian + '="' + itemid + '"]', _this.$el );
				util.toNodes( itemDeleted ).map( function( el, i ){
					index = _.findIndex(_this.$parentForm.kombinasi, { kombinasiIds: util.data( el, 'data-kombinasi' )});
					_this.$parentForm.kombinasi.splice( index, 1 );
					$( el ).remove();
				} );
				console.log(_this.$parentForm.kombinasi)
			},
			changeBarcode:function(e){
				var _this = this, postedKombinasi, index1, index2, indexPosted, indexKombinasi,
					_that =  e.current,
					$wrapper = $( _that ).parents( '.varian-kombinasi-item' ),
					parentForm = _this.$parentForm;
				indexPosted = _.findIndex( 
					parentForm.postedKombinasi, 
					{ 
						varian1: $wrapper.data( 'varian1' ),
						varian2: $wrapper.data( 'varian2' ),
					} 
				);
				postedKombinasi = indexPosted !== -1 ? parentForm.postedKombinasi[ indexPosted ] : {};
				index1 = _.findIndex( parentForm.DataProduk.varian, { idvarian: ! _.isUndefined( postedKombinasi.idVarian1 ) ? postedKombinasi.idVarian1: '' });
				index2 = index1 !== -1 ? _.findIndex( parentForm.DataProduk.varian[ index1 ].subvarian, { idproduk_var: ! _.isUndefined( postedKombinasi.idVarian2 ) ? postedKombinasi.idVarian2 : '' }) : -1;				
				indexKombinasi = _.findIndex( parentForm.kombinasi, {kombinasiIds: $wrapper.data( 'kombinasi' )} );
				if(  index1 !== -1 && index2 !== -1 ){
					parentForm.DataProduk.varian[ index1 ].subvarian[ index2 ].barcode = $( _that ).val();
				}
				if( indexKombinasi !== -1 ){
					parentForm.kombinasi[ indexKombinasi ].barcode = $( _that ).val();
					console.log(parentForm.kombinasi)
				}
			},
		}
	 });
	 
	apsCore.component( 'produkstokharga_outlets', {
		mixins:[ Class, ParentForm ],
		events:[
			{
				name:'change',
				delegate:'.produkstokharga_outlets-input',
				handler:function(){
					this.sync();
				}
			}
		],
		methods:{
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
					index = _.findIndex(_this.$parentForm.kombinasi, { kombinasiIds: key});
					_this.$parentForm.kombinasi[ index ].liststokharga = value;
				} );
			}
		},
	} );
	
	apsCore.component( 'produkstokharga_outlet', {
		mixins:[ Class, ParentForm ],
		events:[
			{
				name:'change',
				delegate:'.all-varian',
				handler:function(e){
					this.allVarian(e);
				}
			},
			{
				name:'change',
				delegate:'.produkstokharga_outlets-input',
				handler:function(e){
					this.changeAll(e);
				}
			}
		],
		methods:{
			allVarian:function(e){
				var _that = e.current,
					_this = this,
					field = $( _that ).data( 'field' ),
					$primaryField = $( '.produkstokharga_outlets-input[name="' + field + '"]:eq(0)', _this.$el ),
					$secondaryField = $( '.produkstokharga_outlets-input[name="' + field + '"]:not(:eq(0))', _this.$el );
				if( $( _that ).prop('checked') ){
					$secondaryField.prop( 'disabled', true );
					$secondaryField.val( $primaryField.val() );
					util.trigger( $u( '.produkstokharga_outlets-input[name="' + field + '"]', _this.$el ), 'change' );
				} else {
					$secondaryField.prop( 'disabled', false );
				}
			},
			changeAll:function( e ){
				var _that = e.current,
					_this = this,
					field = $( _that ).attr( 'name' ),
					$allVarianCheck = $( '.all-varian[data-field="' + field + '"]', _this.$el ),
					$secondaryField = $( '.produkstokharga_outlets-input[name="' + field + '"]:not(:eq(0))', _this.$el );
				if( $allVarianCheck.prop('checked') ){
					$secondaryField.val( $( _that ).val() );
				}
			}
		},
	} );
	/* /Form Product */

})(UIkit, UIkit.util, jQuery);