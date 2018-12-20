<?php
session_start();
include(__DIR__."/Functions.php");
include(__DIR__."/cekUser.php");
include(__DIR__."/DBConnectPDOH.php");

$page_title = 'Welcome Page';
include(__DIR__."/main_header.php");
?>
<!-- Custom CSS -->
<!-- /Custom CSS -->

<!-- Custom Javascript -->
<script src="welcome/js/custom.js"></script>
<!-- /Custom Javascript -->
<?php
include(__DIR__."/navbar_sidebar.php");
?>
		<!-- Main content -->
		<div class="content-wrapper">

			<!-- Page header -->
			<div class="page-header">
				<div class="page-header-content header-elements-md-inline">
					<div class="page-title d-flex">
                                            <p>Contoh script mengganti outlet</p>
					</div>
				</div>
			</div>
			<!-- /page header -->
			
			<!-- Content area -->
			<div class="content pt-0">

				<!-- Dashboard content -->
				<div class="row">
					<div class="col-xl-8">
                                            Pilih outlet : 
                                            <select id="pilihanoutlet">
                                            </select>
                                            <br/>
                                            <br/>
                                            <p>pilihan outlet otomatis tersimpan dan menunjukan outlet yang terakhir di pilih <== ini digunakan pada setiap halaman yang wajib ada pilihan outlet nya</p>
                                            <p><strong>Boleh coba di refresh</strong></p>
					</div>
                                </div>
				<!-- /dashboard content -->

			</div>
			<!-- /content area -->

		</div>
		<!-- /main content -->

	</div>
	<!-- /page content -->

</body>
</html>
