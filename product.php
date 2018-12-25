<?php
session_start();
include(__DIR__."/Functions.php");
//include(__DIR__."/cekUser.php");
//include(__DIR__."/DBConnectPDOH.php");

$page_title = 'Product Page';
include(__DIR__."/main_header.php");
?>
<!-- Custom CSS -->
<!-- /Custom CSS -->

<!-- Custom Javascript -->
<script src="product/js/underscores.min.js"></script>
<script src="product/js/uikit.js"></script>
<script src="global_assets/js/plugins/forms/styling/switchery.min.js"></script>
<script src="global_assets/js/plugins/forms/selects/select2.min.js"></script>
<script src="global_assets/js/plugins/notifications/noty.min.js"></script>
<script src="product/js/product.js"></script>
		<!-- /Custom Javascript -->
		<?php include(__DIR__."/navbar_sidebar.php"); ?>
			<!-- Main content -->
			<div class="content-wrapper" data-uk-productpage>
				<!-- Page Container Selector-->
				<div class="aps-container">
					<!-- Page header -->
					<div class="page-header">
						<div class="page-header-content header-elements-md-inline">
							<div class="page-title d-flex">
								<p>Product</p>
							</div>
							<div class="btn-toolbar justify-content-center">
								<button type="button" class="btn btn-primary btn-md mr-2 aps-add-product"><i class="icon-plus22 mr-2"></i> Produk</button>
								<button type="button" class="btn btn-primary btn-md aps-export-product">Ekspor</button>
							</div>
						</div>
					</div>
					<!-- /page header -->
					
					<!-- Content area -->
					<div class="content pt-0">

						<!-- Dashboard content -->
						<div class="row">
							<div class="col-xl-8"></div>
						</div>
						<!-- /dashboard content -->

					</div>
					<!-- /content area -->
				</div>
				<!-- /Page Container Selector-->
			</div>
			<!-- /main content -->

		</div>
	<!-- /page content -->
	<?php include(__DIR__."/product/views/add-product.html");?>
	<?php include(__DIR__."/product/views/varian-input.html");?>
	<?php include(__DIR__."/product/views/kombinasi.html");?>
	</body>
</html>
