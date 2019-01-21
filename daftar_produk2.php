<?php
session_start();
include(__DIR__."/Functions.php");
//include(__DIR__."/cekUser.php");
//include(__DIR__."/DBConnectPDOH.php");

$page_title = 'Product Page';
include(__DIR__."/main_header.php");
?>
<!-- Custom CSS -->
<link rel="stylesheet" type="text/css" href="daftar_produk2/css/custom.css" />
<!-- /Custom CSS -->

<!-- Custom Javascript -->
<script src="global_assets/js/plugins/forms/styling/uniform.min.js"></script>
<script src="global_assets/js/plugins/forms/styling/switchery.min.js"></script>
<script src="global_assets/js/plugins/forms/selects/select2.min.js"></script>
<script src="global_assets/js/plugins/notifications/noty.min.js"></script>
<script src="global_assets/js/plugins/loaders/blockui.min.js"></script>
<script src="global_assets/js/plugins/uploaders/fileinput/plugins/piexif.min.js"></script>
<script src="global_assets/js/plugins/uploaders/fileinput/plugins/purify.min.js"></script>
<script src="global_assets/js/plugins/uploaders/fileinput/plugins/sortable.min.js"></script>
<script src="global_assets/js/plugins/uploaders/fileinput/fileinput.min.js"></script>
<script src="welcome/js/custom.js"></script>
<script src="daftar_produk2/js/produk-form.js"></script>
		<!-- /Custom Javascript -->
		<?php include(__DIR__."/navbar_sidebar.php");?>
			<!-- Main content -->
			<div class="content-wrapper produk-page">
				<!-- Page Container Selector-->
				<div class="aps-container" data-template="index-product">
					<?php
						include(__DIR__."/daftar_produk2/views/table-pagination.html");
						include(__DIR__."/daftar_produk2/views/table-product.html");
						include(__DIR__."/daftar_produk2/views/index.html");
					?>
				</div>
				<div class="aps-container" data-template="add-product">
				
				</div>
				<!-- /Page Container Selector-->
			</div>
			<!-- /main content -->

		</div>
	<!-- /page content -->
	<?php include(__DIR__."/daftar_produk2/views/add-product.html");?>
	<?php include(__DIR__."/daftar_produk2/views/varian-input.html");?>
	<?php include(__DIR__."/daftar_produk2/views/kombinasi.html");?>
	<?php include(__DIR__."/daftar_produk2/views/varian-per-outlet.html");?>
	<?php include(__DIR__."/daftar_produk2/views/modal-add-kategori.html");?>
	<?php include(__DIR__."/daftar_produk2/views/modal-add-satuan.html");?>
	</body>
</html>
