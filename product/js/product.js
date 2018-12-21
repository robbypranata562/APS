(function (apsCore, util, $) {
	var $u = util.$,
        attr = util.attr,
        css = util.css,
        addClass = util.addClass;
		
	window.ap = window.ap || {};

	apsCore.component( 'aps', {
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
				delegate:'.coba',
				handler:function(e){
					e.preventDefault();
					alert()
				}
			}
		],
		methods:{
			init:function(){
				var tmp = _.template( $( 'script#tmpl-contoh' ).html() );
				
				$( this.$el ).append(tmp({name:'hahaha'}));
			},
		}
	});
	
})(UIkit, UIkit.util, jQuery)