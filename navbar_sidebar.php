</head>
<body>
	<!-- Main navbar -->
	<div class="navbar navbar-expand-md navbar-light">

		<!-- Header with logos -->
		<div class="navbar-header navbar-dark d-none d-md-flex align-items-md-center">
			<div class="navbar-brand navbar-brand-md">
				<a href="index.php" class="d-inline-block">
					<img src="https://www.autopilotstore.co.id/backoffice/APS logo backoffice item putih.png" alt="">
				</a>
			</div>
			
			<div class="navbar-brand navbar-brand-xs">
				<a href="index.php" class="d-inline-block">
					<img src="https://www.autopilotstore.co.id/backoffice/APS icon backoffice item putih.png" alt="">
				</a>
			</div>
		</div>
		<!-- /header with logos -->
	
		<!-- Mobile controls -->
		<div class="d-flex flex-1 d-md-none">
			<div class="navbar-brand mr-auto">
				<a href="index.php" class="d-inline-block">
					<img src="https://www.autopilotstore.co.id/backoffice/APS logo backoffice item putih.png" alt="">
				</a>
			</div>	

			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
				<i class="icon-tree5"></i>
			</button>

			<button class="navbar-toggler sidebar-mobile-main-toggle" type="button">
				<i class="icon-paragraph-justify3"></i>
			</button>
		</div>
		<!-- /mobile controls -->

		<!-- Navbar content -->
		<div class="collapse navbar-collapse" id="navbar-mobile">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a href="#" class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
						<i class="icon-paragraph-justify3"></i>
					</a>
				</li>

			</ul>

			<span class="navbar-text ml-md-3 mr-md-auto">
				
			</span>

			<ul class="navbar-nav">

				<li class="nav-item dropdown dropdown-user">
					<a href="#" class="navbar-nav-link dropdown-toggle" data-toggle="dropdown">
						<img src="<?php echo $fotopengguna_main; ?>" class="rounded-circle" alt="">
						<span><?php //echo $namapengguna; ?></span>
					</a>

					<div class="dropdown-menu dropdown-menu-right">
						<a href="logout.php" class="dropdown-item"><i class="icon-switch2"></i> Logout</a>
					</div>
				</li>
			</ul>
		</div>
		<!-- /navbar content -->
		
	</div>
	<!-- /main navbar -->

					
	<!-- Page content -->
	<div class="page-content">

		<!-- Main sidebar -->
		<div class="sidebar sidebar-dark sidebar-main sidebar-expand-md">

			<!-- Sidebar mobile toggler -->
			<div class="sidebar-mobile-toggler text-center">
				<a href="#" class="sidebar-mobile-main-toggle">
					<i class="icon-arrow-left8"></i>
				</a>
				Navigation
				<a href="#" class="sidebar-mobile-expand">
					<i class="icon-screen-full"></i>
					<i class="icon-screen-normal"></i>
				</a>
			</div>
			<!-- /sidebar mobile toggler -->


			<!-- Sidebar content -->
			<div class="sidebar-content">
				
				<!-- User menu -->
				<div class="sidebar-user">
					<div class="card-body">
						<div class="media">
							<div class="mr-3">
								<a href="#"><img src="<?php echo $fotopengguna_main; ?>" width="38" height="38" class="rounded-circle" alt=""></a>
							</div>

							<div class="media-body">
								<div class="media-title font-weight-semibold"><?php //echo $namapengguna; ?></div>
							</div>

						</div>
					</div>
				</div>
				<!-- /user menu -->

				
				<!-- Main navigation -->
				<div class="card card-sidebar-mobile">
					<ul class="nav nav-sidebar" data-nav-type="accordion">

						<!-- Main -->
						<li class="nav-item-header"><div class="text-uppercase font-size-xs line-height-xs"></div> <i class="icon-menu" title="Main"></i></li>
						<?php //echo get_bo_menus(0,'welcome.php'); ?>
						<!-- /Main -->	
					</ul>
				</div>
				<!-- /main navigation -->

			</div>
			<!-- /sidebar content -->
			
		</div>
		<!-- /main sidebar -->


