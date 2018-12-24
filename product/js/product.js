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

	apsCore.component( 'productpage', {
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
				console.log($( $( that ).attr("href") ))
				util.trigger( $( $( that ).attr("href") ), 'tab_show', [ $( that ).attr("href") ] );
			},
		}
	});
	
	apsCore.component( 'productform', {
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
		events:[
			{
				name:'click',
				delegate:'.add-varian',
				handler:function(e){
					e.preventDefault();
					var _this = this;
					this.addVarian().then(function(){
						var form = util.parents( $u( _this.$el ), '.uk-productform' );
						util.trigger( $u( '.uk-kombinasivarian', $u( form ) ), 'add_kombinasi' );
					});
				}
			}
		],
		connected:function(){
			this.init();
		},
		methods:{
			init:function(){
			},
			addVarian:function(){
				var tmp = _.template( $( '#tmpl-varian-input' ).html() ),
					_this = this;
				return new util.Promise(function(resolve){
					$( '.produk-varian-items', this.$el ).append( tmp( {} ) );
					resolve( _this );
				});
				
			},
		}
	});
	
	apsCore.component( 'subvarianitems', {
		events:[
			{
				name:'click',
				delegate:'.add-subvarian',
				handler:function(e){
					e.preventDefault()
					this.addSubvarian();
				}
			}
		],
		connected:function(){
			this.init();
		},
		methods:{
			init:function(){
			},
			addSubvarian:function(){
				var tmp = _.template( $( '#tmpl-subvarian-input' ).html() );
				$( '.produk-subvarian-items', this.$el ).append( tmp( {} ) );
				
			},
		}
	});
	
	apsCore.component( 'kombinasivarian', {
		events:[
			{
				name:'add_kombinasi',
				self:true,
				handler:function(e){
					e.preventDefault()
					alert()
				}
			}
		],
		connected:function(){
			!util.hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
		},
		methods:{
			init:function(){
			},
		}
	});
	
})(UIkit, UIkit.util, jQuery)