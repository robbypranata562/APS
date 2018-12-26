(function (apsCore, util, $) {
	var $u = util.$,
		attr = util.attr,
		css = util.css,
		addClass = util.addClass;
		
	window.ap = window.ap || {};

	// apsCore.component( 'aps', {
	// 	connected:function(){
	// 		this.init();
	// 	},
	// 	props:{
	// 		type:String,
	// 	},
	// 	data:{
	// 		type:'header',
	// 	},
	// 	events:[
	// 		{
	// 			name:'click',
	// 			delegate:'.coba',
	// 			handler:function(e){
	// 				e.preventDefault();
	// 			}
	// 		}
	// 	],
	// 	methods:{
	// 		init:function(){
	// 			var tmp = _.template( $( 'script#tmpl-contoh' ).html() );
				
	// 			$( this.$el ).append(tmp({name:'hahaha'}));
	// 		},
	// 	}
	// });

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
			},
			data:{
				table:false,
				initialize : false,
			},
			// events:[
			// 	{
			// 		name:'click',
			// 		delegate:'.coba2',
			// 		handler:function(e){
			// 			e.preventDefault();
			// 			this.click();
			// 		}
			// 	}
			// ],
			methods:{
				init:function(){
								alert();
								var _this = this;
								var data;
								var data_produk = [];
								var x = [];
								var j= 0;
								var jumlahstoktotal = 0;
								var totalproduct = 0;
								this.initialize = true;
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
											$(this).html( '<select data-uk-'+text+'></select>' );
										}
										else
										{
											var label_total = '</br><h3> </h3>';
											$(this).html( '<select data-uk-'+text+'></select>' );
										}
										
									}

								});
								//
								// $('#t_product thead tr').clone(true).appendTo( '#t_product thead' );
								// $('#t_product thead tr:eq(1) th').each( function (i) {
								// 	var title = $(this).text();
								// 	if (i == 1)
								// 	{
								// 			var x = 
								// 			{
								// 				tipe:'GET_KATEGORIPRODUK',
								// 			};
								// 			$.ajax({
								// 					type: "POST",
								// 					url: 'https://development.autopilotstore.co.id/api_all.php',
								// 					data: JSON.stringify(x),
								// 						success: function(data)
								// 						{
								// 							var label_total = '<h3>Total '+data.daftarkategoriproduk.length + ' Jenis Produk</h3>';
								// 							$(this).html(label_total );
								// 						},
								// 						complete:function(){
								// 						},
								// 					dataType: 'json',
								// 				});
										
								// 		$( 'input', this ).on( 'keyup change', function () {
								// 		if ( table.column(i).search() !== this.value ) {
								// 			table
								// 				.column(i)
								// 				.search( this.value )
								// 				.draw();
								// 		}
								// 		});
								// 	}
								// 	else if (i > 1)
								// 	{
								// 		var text = title.replace(" ", "_");
								// 		if (text == "Stock")
								// 		{
								// 			var label_total = '<h3>Total Stock '+jumlahstoktotal + '</h3>';
								// 			$(this).html( label_total );
								// 		}
								// 		else
								// 		{
								// 			var label_total = '</br><h3> </h3>';
								// 			$(this).html(label_total);
								// 		}
										
								// 	}

								// });
								
								var y =

								{
									tipe			: 'GET_OUTLETMASTERPRODUK',
									idoutlet 		: 1, 
									search 			: '', 
									limit			: 1000, 
									page			: 0,
									idkategori		: '' , 
									statusproduk 	: '',
									stokoption 		: ''
								};
									$.ajax({
										type: "POST",
										url: 'https://development.autopilotstore.co.id/api_all.php',
										data: JSON.stringify(y),
										success: function(data){
											 
											 data_p = data.daftarproduk;
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
														i['jumlahstokproduk']
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
												"orderCellsTop": true,
												"fixedHeader": true,
												 "pagingType": "simple_numbers",
												"deferLoading": totalproduct,
												"data" : data_produk,
												"fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
													console.log(aData)
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
													return nRow;

												},
												"fnInitComplete": function (oSettings, json) {
													//$('#SALESAREATSALESAREA tbody tr:eq(0)').click();


												},
												"fnDrawCallback": function (oSettings, json) {
													//$('#SALESAREATSALESAREA tbody tr:eq(0)').click();
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
																	"targets":   0
																} ],
												"select": {
																"style":    'os',
																"selector": 'td:first-child'
												},
											});



										},
										complete:function(){
										},
										dataType: 'json',
								});

						

				},
				click:function(){

				}
			}
		}
	);
	apsCore.component(
		
		'listoutlet',
		{
			connected:function(){
				this.init();
			},
			events:[
			{
				name:'change',
				delegate:'.list_outlet',
				handler:function(e){
					//e.preventDefault();
					 var outletpilihan = $(this).val();
					 alert('aaa')
			        var datajson = {action : "UPDATE_SELECTED_OUTLET", outlet : outletpilihan};
			        $.post('welcome/outletsekarang.php',JSON.stringify(datajson),function(d){
			            if (d.errcode == 'OK') console.log("Berhasil ubah outlet sekarang");
			        },"json");
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
												console.log(data);
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
		});



})(UIkit, UIkit.util, jQuery)