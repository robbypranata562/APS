(function (apsCore, util, $) {
	
	var $u = util.$,
		attr = util.attr,
		css = util.css,
		addClass = util.addClass;
		
	window.aps = window.aps || {};
	
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
			useVarian:Boolean,
		},
		data:{
			step:1,
			action:'add',
			useVarian:false,
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
				var _this = this;
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
					kombinasiIds 	= [];
					
					varians.map( function( $el, i ){
						varian = apsCore.getComponent( $el, 'varianitems' );
						varian.varians.length && cartesians.push( varian.varians );
					} );
					if( cartesians.length > 1 ){
						kombinasi = aps.cartesian.apply( null, cartesians );
					} else if( cartesians.length === 1 ) {
						for( var i in cartesians[0] ){
							kombinasi.push( cartesians[0][i] );
						}
					}
				
				_this.kombinasi = [];
				
				for( var i in kombinasi ){
					produkKombinasi = [];
					kombinasiIds = [];
					_this.kombinasi[i] = {barcode:'', liststokharga:[]};
					if( _.isArray( kombinasi[i] ) ){
						for( var j in kombinasi[i] ){
							produkKombinasi.push( $( '[data-itemid="' + kombinasi[i][j] + '"]' ).val() );
							kombinasiIds.push( kombinasi[i][j] );
							_this.kombinasi[i][ 'varian' + ( parseInt( j ) + 1 ) ] = $( '[data-itemid="' + kombinasi[i][j] + '"]' ).val();
						}
					} else {
						produkKombinasi.push( $( '[data-itemid="' + kombinasi[i] + '"]' ).val() );
						kombinasiIds.push( kombinasi[i] );
						_this.kombinasi[i].varian1 = $( '[data-itemid="' + kombinasi[i] + '"]' ).val();
						_this.kombinasi[i].varian2 = '';
					}
					_this.kombinasi[i].dataKombinasiIds = kombinasiIds;
					_this.kombinasi[i].dataProdukKombinasi = produkKombinasi;
					_this.kombinasi[i].kombinasiIds = encodeURI( JSON.stringify( kombinasiIds ) );
					_this.kombinasi[i].produkKombinasi = produkKombinasi.join( ' - ' );
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
				} );alert()
			}
		},
	} );
	apsCore.component( 'produkstokharga_outlet', {
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

})(UIkit, UIkit.util, jQuery);