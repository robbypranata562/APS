<?php
session_start();
include(__DIR__."/Functions.php");
//include(__DIR__."/cekUser.php");
//include(__DIR__."/DBConnectPDOH.php");

$page_title = 'Product Page';
include(__DIR__."/main_header.php");
?>
<!-- Custom CSS -->
<link rel="stylesheet" type="text/css" href="product/css/custom.css" />
<!-- /Custom CSS -->

<!-- Custom Javascript -->
<script src="product/js/underscores.min.js"></script>
<script src="product/js/uikit.js"></script>
<script src="global_assets/js/plugins/forms/styling/switchery.min.js"></script>
<script src="global_assets/js/plugins/forms/selects/select2.min.js"></script>
<script src="global_assets/js/plugins/notifications/noty.min.js"></script>
<script src="product/js/product.js"></script>
<script src="global_assets/js/plugins/tables/datatables/datatables.min.js"></script>
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
						<div class="card-body">
						</div>
							<table data-uk-tableproduct class="table datatable-responsive dataTable no-footer dtr-inline" id="t_product">
								<thead>
									<tr>
										<th>Pick</th>
										<th>Nama Produk</th>
										<th>Status Produk</th>
										<th>Kategori</th>
										<th>Stock</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
					</div>
				</div>
				<div class="card">
					<div class="card-header">
						<div class="card-body">
							<div class="row">
								<div class="col-md-2">
									<img src="global_assets/images/icon/icon-footer-list-produk.svg"/> Daftar Produk
								</div>
								<div class="col-md-2">
									<span class="badge badge-secondary">Upload Produk Massal</span>
								</div>
								<div class="col-md-2">
									<span class="badge badge-secondary">Stock Opname</span>
								</div>
								<div class="col-md-2">
									<span class="badge badge-secondary">Edit Harga</span>
								</div>
								<div class="col-md-2">
									<span class="badge badge-secondary">Kartu Stock</span>
								</div>
								<div class="col-md-2">
									<span class="badge badge-secondary">Print Barcode / QrCode</span>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		<!-- /main content -->
	
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
