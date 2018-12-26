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
<script src="product/js/product.js"></script>
<script src="global_assets/js/plugins/tables/datatables/datatables.min.js"></script>
		<!-- /Custom Javascript -->
		<?php include(__DIR__."/navbar_sidebar.php"); ?>
			<!-- Main content -->
			<div class="content-wrapper">
				<div class="page-header page-header-light">
					<div class="page-header-content header-elements-md-inline">
							<div class="breadcrumb">
								<a href="index.html" class="breadcrumb-item">Produk</a>
								<a href="#" class="breadcrumb-item">Dafrat Produk</a>
							</div>
							<div class="header-elements d-none">
								<div class="row">
									<div class="d-flex justify-content-center">
										<button class="btn btn-primary legitRipple">
											<i class="icon-plus mr-2">
												Tambah Produk
											</i>
										</button>
										<button class="btn btn-primary legitRipple">
											<i class="icon-cog3 mr-2">
												Ekspor
											</i>
										</button>
										<select data-uk-listoutlet class="form-control select-basic list_outlet"></select>
									</div>
								</div>

							</div>
					</div>
				</div>
				<div class="content">
					<div class="card">
						<div class="card-header header-elements-inline">
							<h5 class="card-title"> Produk</h5>
							<div class="header-elements">
								<div class="list-icons">
		                		<a class="list-icons-item" data-action="collapse"></a>
		                		<a class="list-icons-item" data-action="reload"></a>
		                		<a class="list-icons-item" data-action="remove"></a>
		                		</div>
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
	
	</body>
</html>
