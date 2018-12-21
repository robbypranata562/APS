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
				aps.req( {tipe:'GET_KATEGORIPRODUK'} )
					.then(
						function(data){
							console.log(data)
						},
						aps.noop
					);
			},
		}
	});
	
	aps.req( {tipe:'GET_OUTLET', idoutlet:''} )
		.then(
			function(data){
				console.log(data)
			},
			aps.noop
		);
	
})(UIkit, UIkit.util, jQuery)