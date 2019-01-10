<?php
session_start();
include(__DIR__."/Functions.php");
//include(__DIR__."/cekUser.php");
//include(__DIR__."/DBConnectPDOH.php");
include(__DIR__."/daftar_produk/views/table-pagination.html");
include(__DIR__."/daftar_produk/views/table-product.html");
$page_title = 'Product Page';
include(__DIR__."/main_header.php");
?>
<?php include(__DIR__."/daftar_produk/views/index.html");?>
<?php include(__DIR__."/daftar_produk/views/add-product.html");?>
<?php include(__DIR__."/daftar_produk/views/varian-input.html");?>
<?php include(__DIR__."/daftar_produk/views/kombinasi.html");?>
<?php include(__DIR__."/daftar_produk/views/modal.html");?>
<?php include(__DIR__."/daftar_produk/views/modal-add-kategori.html");?>
<?php include(__DIR__."/daftar_produk/views/modal-add-satuan.html");?>
<!-- Custom CSS -->
<link rel="stylesheet" type="text/css" href="daftar_produk/css/custom.css" />
<!-- /Custom CSS -->

<!-- Custom Javascript -->
<script src="daftar_produk/js/underscores.min.js"></script>
<script src="global_assets/js/plugins/forms/styling/uniform.min.js"></script>
<script src="global_assets/js/plugins/forms/styling/switchery.min.js"></script>
<script src="global_assets/js/plugins/forms/selects/select2.min.js"></script>
<script src="global_assets/js/plugins/notifications/noty.min.js"></script>
<script src="global_assets/js/plugins/loaders/blockui.min.js"></script>
<script src="global_assets/js/plugins/tables/datatables/datatables.min.js"></script>
<script src="//cdn.datatables.net/plug-ins/1.10.19/api/fnPagingInfo.js"></script>
<script src="global_assets/js/plugins/tables/datatables/extensions/simple_numbers_no_ellipses.js"></script>
<script src="global_assets/js/plugins/uploaders/fileinput/plugins/piexif.min.js"></script>
<script src="global_assets/js/plugins/uploaders/fileinput/plugins/purify.min.js"></script>
<script src="global_assets/js/plugins/uploaders/fileinput/plugins/sortable.min.js"></script>
<script src="global_assets/js/plugins/uploaders/fileinput/fileinput.min.js"></script>
<script src="daftar_produk/js/product.js"></script>
<script src="daftar_produk/js/product-form.js"></script>
<script src="welcome/js/custom.js"></script>
		<!-- /Custom Javascript -->
		<?php include(__DIR__."/navbar_sidebar.php");?>
			<!-- Main content -->
			<div class="content-wrapper" data-uk-productpage="template:index-product;refresh:true;">
				<!-- Page Container Selector-->
				<div class="aps-container" data-template="index-product" data-user="<?php //echo $idpengguna ?>"></div>
				<div class="aps-container" data-template="add-product"></div>
				<!-- /Page Container Selector-->
			</div>
			<!-- /main content -->

		</div>
	<!-- /page content -->
	<?php include(__DIR__."/daftar_produk/views/index.html");?>
	<?php include(__DIR__."/daftar_produk/views/add-product.html");?>
	<?php include(__DIR__."/daftar_produk/views/varian-input.html");?>
	<?php include(__DIR__."/daftar_produk/views/kombinasi.html");?>
	<?php include(__DIR__."/daftar_produk/views/varian-per-outlet.html");?>
	</body>
</html>
