(function (apsCore, util, $) {
	var $u 			= util.$,
        attr 		= util.attr,
        css 		= util.css,
        addClass 	= util.addClass;
		
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

	apsCore.component( 'productpage', {
		mixins:[Class],
		connected:function(){
			this.init();
		},
		props:{
			type:String,
		},
		data:{
			type:'header',
		},
		events:[
			{
				name:'click',
				delegate:'.aps-add-product',
				handler:function(e){
					e.preventDefault();
					this.addProduct();
				}
			}
		],
		methods:{
			init:function(){},
			addProduct:function(){
				this.render( $( '#tmpl-add-product' ), {} );
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
				util.trigger( $( $( that ).attr("href") ), 'tab_show', [ $( that ).attr("href") ] );
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
		},
		data:{
			step:1,
		},
		events:[
			{
				name: 'tab_show',
				delegate:'.tab-pane',
				handler:function(e, target){
					if( target == '#produk-varian' ){
						var notyConfirm = new Noty({
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
								}),

								Noty.button('Ya', 'btn bg-blue ml-1', function () {
										alert('Submitted!');
										notyConfirm.close();
									},
									{id: 'button1', 'data-status': 'ok'}
								)
							]
						}).show();
					}
				}
			}
		],
		methods:{
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
				
				var _this = this,
					form = util.parents( $u( _this.$el ), '.uk-productform' ),
					varians = util.toNodes( util.$$( '.uk-varianitems', $u( form ) ) ),
					cartesians = [],
					kombinasi = [],
					produkKombinasi = [],
					kombinasiIds = [];
					// console.log( aps.cartesian( varian.varians, subvarian.varians ) );
				$( '.produk-kombinasi-varian', _this.$el ).empty();
				varians.map( function( $el, i ){
					varian = apsCore.getComponent( $el, 'varianitems' );
					cartesians.push( varian.varians );
				} );
				kombinasi = aps.cartesian.apply( null, cartesians );
				
				for( var i in kombinasi ){
					produkKombinasi = [];
					kombinasiIds = [];
					for( var j in kombinasi[i] ){
						produkKombinasi.push( $( '[data-itemid="' + kombinasi[i][j] + '"]' ).val() );
						kombinasiIds.push( kombinasi[i][j] );
					}
					var tmp = _.template( $( '#tmpl-varian-kombinasi' ).html() );
					$( '.produk-kombinasi-varian', _this.$el ).append( 
						tmp( 
							{
								produk:produkKombinasi.join( ' - ' ),
								kombinasi:encodeURI( JSON.stringify( kombinasiIds ) ),
							} 
						) 
					);
				}
			}
		}
	});
	
})(UIkit, UIkit.util, jQuery)