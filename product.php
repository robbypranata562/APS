<?php
session_start();
include(__DIR__."/Functions.php");
//include(__DIR__."/cekUser.php");
//include(__DIR__."/DBConnectPDOH.php");
include(__DIR__."/product/views/table-product.html");
$page_title = 'Product Page';
include(__DIR__."/main_header.php");
?>
<?php include(__DIR__."/product/views/index.html");?>
<?php include(__DIR__."/product/views/add-product.html");?>
<?php include(__DIR__."/product/views/varian-input.html");?>
<?php include(__DIR__."/product/views/kombinasi.html");?>
<?php include(__DIR__."/product/views/modal.html");?>
<!-- Custom CSS -->
<link rel="stylesheet" type="text/css" href="product/css/custom.css" />
<!-- /Custom CSS -->

<!-- Custom Javascript -->
<script src="product/js/underscores.min.js"></script>
<script src="product/js/uikit.js"></script>
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
<script src="product/js/product.js"></script>
<script src="product/js/product-form.js"></script>
<script src="welcome/js/custom.js"></script>
		<!-- /Custom Javascript -->
		<?php include(__DIR__."/navbar_sidebar.php");?>
			<!-- Main content -->
			<div class="content-wrapper" data-uk-productpage="template:index-product;refresh:true;">
				<!-- Page Container Selector-->
				<div class="aps-container" data-template="index-product"></div>
				<div class="aps-container" data-template="add-product"></div>
				<!-- /Page Container Selector-->
			</div>
			<!-- /main content -->

		</div>
	<!-- /page content -->
	<?php include(__DIR__."/product/views/index.html");?>
	<?php include(__DIR__."/product/views/add-product.html");?>
	<?php include(__DIR__."/product/views/varian-input.html");?>
	<?php include(__DIR__."/product/views/kombinasi.html");?>
	<?php include(__DIR__."/product/views/varian-per-outlet.html");?>
	</body>
</html>
