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
					this.redirect( 'add-product' );
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
			redirect:function( template, data ){
				template = template || this.template;
				data = data || {};
				this.template = template;
				this.changePage( data );
			},
			changePage:function( data ){
				data = data || {};
				this.render( $( '#tmpl-' + this.template ), data );
			},
			render:function( $template, data ){
				var tmp = _.template( $template.html() );
				$( this.$el, $( '.aps-container' ) ).html( tmp( {data:data} ) );
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
			idproduk:String,
			useVarian:Boolean,
			useSubvarian:Boolean,
			varians:Object,
			kombinasi:Array,
		},
		data:{
			step:1,
			action:'add',
			idproduk:'',
			useVarian:false,
			useSubvarian:false,
			varians:{},
			kombinasi:[],
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
				if( this.idproduk !== '' ){
					aps.req({
						tipe			: 'GET_OUTLETMASTERPRODUK',
						idoutlet 		: _this.idoutlet, 
						search 			: '', 
						limit			: 1000, 
						page			: 0,
						idkategori		: _this.idkategori , 
						statusproduk 	: '',
						stokoption 		: ''
					})
						.then(
							function(data){
								console.log(data)
							},
							aps.noop
						);
				}
			},
			next: function(){
				if( this.step >= 4 ){return;}
				alert(this.step)
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
				!util.hasAttr( this.$el, 'data-idvarian' ) && util.attr( this.$el, 'data-idvarian', this.idVarian );
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
			deleteVarian:function( $wrapper ){
				var _this = this,
					$field = $u( '.produk-varian-item-value', $wrapper ),
					Field = apsCore.getComponent( $field, 'varianitemvalue' ),
					$varian = $u( util.parents( $wrapper, '.uk-varianitems' ) ),
					itemid;
					console.log($varian);
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
					_this.$parentForm.varians[ _this.idVarian ].push( util.data( el, 'data-itemid' ) );
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
			}
		],
		connected:function(){
			!util.hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
		},
		methods:{
			changeKombinasi:function(e){
				
				var _this			= this,
					varians 		= util.toNodes( util.$$( '.uk-varianitems', $u( _this.parentForm ) ) ),
					idvarian		= '';
					$produkKombinasi= $( '.produk-kombinasi-varian', _this.$el ),
					tmp 			= _.template( $( '#tmpl-varian-kombinasi' ).html() ),
					cartesians 		= [],
					kombinasi 		= [],
					produkKombinasi = [],
					kombinasiIds 	= [];
					
					varians.map( function( $el, i ){
						idvarian = $( $el ).data( 'idvarian' );
						( !_.isUndefined( _this.$parentForm.varians[ idvarian ] ) ) && cartesians.push( _this.$parentForm.varians[ idvarian ] );
					} );

					if( cartesians.length > 1 ){
						kombinasi = aps.cartesian.apply( null, cartesians );
						_this.$parentForm.useSubvarian = true;
					} else if( cartesians.length === 1 ) {
						for( var i in cartesians[0] ){
							kombinasi.push( cartesians[0][i] );
						}
						_this.$parentForm.useSubvarian = false;
					}
				if( _this.useSubvarian !==  _this.$parentForm.useSubvarian ){
					$produkKombinasi.empty();
				}
				
				_this.$parentForm.kombinasi = [];
				
				for( var i in kombinasi ){
					
					produkKombinasi = [];
					kombinasiIds = [];
					_this.$parentForm.kombinasi[i] = {barcode:'', liststokharga:[]};
					
					if( _this.$parentForm.useSubvarian ){
						for( var j in kombinasi[i] ){
							produkKombinasi.push( $( '[data-itemid="' + kombinasi[i][j] + '"]' ).val() );
							kombinasiIds.push( kombinasi[i][j] );
							_this.$parentForm.kombinasi[i][ 'varian' + ( parseInt( j ) + 1 ) ] = $( '[data-itemid="' + kombinasi[i][j] + '"]' ).val();
						}
					} else {
						produkKombinasi.push( $( '[data-itemid="' + kombinasi[i] + '"]' ).val() );
						kombinasiIds.push( kombinasi[i] );
						_this.$parentForm.kombinasi[i].varian1 = $( '[data-itemid="' + kombinasi[i] + '"]' ).val();
						_this.$parentForm.kombinasi[i].varian2 = '';
					}
					
					_this.$parentForm.kombinasi[i].dataKombinasiIds = kombinasiIds;
					_this.$parentForm.kombinasi[i].dataProdukKombinasi = produkKombinasi;
					_this.$parentForm.kombinasi[i].kombinasiIds = encodeURI( JSON.stringify( kombinasiIds ) );
					_this.$parentForm.kombinasi[i].produkKombinasi = produkKombinasi.join( ' - ' );
					
				}
				_.map( _this.$parentForm.kombinasi, function( combination ){
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
				_this.useSubvarian =  _this.$parentForm.useSubvarian;
			},
			deleteKombinasi:function(e, itemid, idvarian){
				var _this = this,
					index;
					itemDeleted = util.$$( '.varian-kombinasi-item[data-' + idvarian + '="' + itemid + '"]', _this.$el );
				console.log()
				util.toNodes( itemDeleted ).map( function( el, i ){
					index = _.findIndex(_this.$parentForm.kombinasi, { kombinasiIds: util.data( el, 'data-kombinasi' )});
					_this.$parentForm.kombinasi.splice( index, 1 );
					$( el ).remove();
				} );
			}
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