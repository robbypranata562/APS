<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta property="og:image" content="https://www.autopilotstore.co.id/img/autopilotstore.co.id.png" />
    <meta property="og:description" content="Increase Sales, multiply Stores & Make it Autopilot!" />
    <meta property="og:url" content="https://www.autopilotstore.co.id/login.php" />
    <meta property="og:title" content="Auto Pilot Store" />

    <title>Auto Pilot Store - Login</title>

    <!-- Bootstrap -->
    <link href="https://www.autopilotstore.co.id/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://www.autopilotstore.co.id/css/bootstrap-combobox.css" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://www.autopilotstore.co.id/css/styles.css" rel="stylesheet">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="icon" href="favicon.ico" type="image/x-icon">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
      <section class="header" id="nav">
        <nav class="navbar navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand logo" href="pemiliktoko.php">
                        <img alt="Brand" src="img/logo_aps.png">
                    </a>
                </div>
            </div>
        </nav>
      </section>
      <div class="container section-landing">
        <section class="miniheader visible-xs" id="miniheader">
            <div class="container mini-header">
                <div class="row">
                    <div class="col-xs-12">
                        <strong>Increase Sales, Multiply Stores & Make it Autopilot !</strong><br />
                        Aplikasi sistem untuk toko Anda
                    </div>
                </div>
            </div>
        </section>
        <section class="pemiliktoko" id="pemilik-toko" >
            <div class="container pemilik-toko hidden-xs">
              <div class="row">
                  <div class="col-sm-5 col-md-5 tekspemiliktoko-frm">
                    <?php if (isset($_GET['err'])) {
                        echo "<div class='alert alert-danger' role='alert'>".$_GET['err']."</div>";
                    }
                    ?>
                      <h2><Strong>PEMILIK TOKO</Strong></h2>
                      <form method="post" action="index.php" id="frm-pemiliktoko">
                      <div class="input-group">
                          <span class="input-group-addon" id="basic-addon1"><i class="fa fa-envelope"></i></span>
                        <input type="text" class="form-control" placeholder="Masukkan Email" name="email" aria-describedby="basic-addon1" style="background-color: rgba(255,255,255,0.6);">
                      </div>
                      <div class="input-group">
                          <span class="input-group-addon" id="basic-addon1"><img src="img/password_icon.png" class="form-icon"></span>
                        <input type="password" class="form-control" placeholder="Masukkan Password" name="password" aria-describedby="basic-addon1" style="background-color: rgba(255,255,255,0.6);">
                      </div>
                      <div class="btn-header">
                          <div id='recaptcha1' ></div>
                          <button type="submit" class="btn btn-primary" id="btn-login"><strong>Login</strong></button>
                      </div>
                      </form>
                  </div>
              </div>
            </div>
            <div class="container pemilik-toko-s visible-xs">
              <div class="row">
                  <div class="col-xs-6 tekspemiliktoko-s-frm" >
                    <?php if (isset($_GET['err'])) {
                        echo "<div class='alert alert-danger' role='alert'>".$_GET['err']."</div>";
                    }
                    ?>
                      <h2><Strong>PEMILIK TOKO</Strong></h2>
                      <form method="post" action="index.php" id="frm-pemiliktoko-s">
                      <div class="input-group">
                          <span class="input-group-addon" id="basic-addon1"><i class="fa fa-envelope"></i></span>
                        <input type="text" class="form-control" placeholder="Email" name="email" aria-describedby="basic-addon1" style="background-color: rgba(255,255,255,0.6);">
                      </div>
                      <div class="input-group">
                          <span class="input-group-addon" id="basic-addon1"><img src="img/password_icon.png" class="form-icon"></span>
                        <input type="password" class="form-control" placeholder="Password" name="password" aria-describedby="basic-addon1" style="background-color: rgba(255,255,255,0.6);">
                      </div>
                      <div class="btn-header">
                          <div id='recaptcha2' ></div>
                          <button type="submit" class="btn btn-primary" id="btn-login2"><strong>Login</strong></button>
                      </div>
                      </form>
                  </div>
              </div>
            </div>
        </section>
        <section class="affiliate-section" id="affiliate" >
            <div class="container affiliate hidden-xs">
              <div class="row">
                  <div class="col-sm-5 col-sm-offset-7 teksaffiliate-frm" style="margin-top:120px;text-align:center">
                      <h2><strong>AFFILIATE</strong></h2>
                      <div class="input-group">
                          <span class="input-group-addon" id="basic-addon1"><i class="fa fa-envelope"></i></span>
                        <input type="text" class="form-control" placeholder="Masukkan Email" aria-describedby="basic-addon1" style="background-color: rgba(255,255,255,0.6);">
                      </div>
                      <div class="input-group">
                          <span class="input-group-addon" id="basic-addon1"><img src="img/password_icon.png" class="form-icon"></span>
                        <input type="password" class="form-control" placeholder="Masukkan Password" aria-describedby="basic-addon1" style="background-color: rgba(255,255,255,0.6);">
                      </div>
                      <div class="btn-header">
                          <button type="submit" class="btn btn-primary" id="btn-login"><strong>Login</strong></button>
                      </div>
                  </div>
              </div>
            </div>
            <div class="container affiliate-s visible-xs">
              <div class="row">
                  <div class="col-xs-7 col-xs-offset-5 teksaffiliate-s-frm" style="margin-top:80px;text-align:center">
                      <h2><strong>AFFILIATE</strong></h2>
                      <div class="input-group">
                          <span class="input-group-addon" id="basic-addon1"><i class="fa fa-envelope"></i></span>
                        <input type="text" class="form-control" placeholder="Masukkan Email" aria-describedby="basic-addon1" style="background-color: rgba(255,255,255,0.6);">
                      </div>
                      <div class="input-group">
                          <span class="input-group-addon" id="basic-addon1"><img src="img/password_icon.png" class="form-icon"></span>
                        <input type="password" class="form-control" placeholder="Masukkan Password" aria-describedby="basic-addon1" style="background-color: rgba(255,255,255,0.6);">
                      </div>
                      <div class="btn-header">
                          <button type="submit" class="btn btn-primary" id="btn-login" ><strong>Login</strong></button>
                      </div>
                  </div>
              </div>
            </div>
        </section>
      </div>

      <?php
      include "footer.html";
      ?>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://www.autopilotstore.co.id/js/bootstrap.min.js"></script>
    <script src="https://www.autopilotstore.co.id/js/sha.min.js"></script>
    <script src='https://www.google.com/recaptcha/api.js' async defer></script>
    <script>
    $(document).ready(function(){
        var demo1Call = 0;
        var demo2Call = 0;

        $('#frm-pemiliktoko').on('submit', function (e) {
          if (e.isDefaultPrevented()) {
            // handle the invalid form...
            console.log("validation failed");
          } else {
            // everything looks good!
            demo1Call++;

            e.preventDefault();
            console.log("validation success");

            if(demo1Call==1)
            {
                widgetId1 = grecaptcha.render('recaptcha1', {
                'sitekey' : '6LfdfBwUAAAAAFRArkvhKiJ1mj-wUdWhSZKtxiRj',
                'callback' : onSubmit1,
                'size' : "invisible"
                });
            }

            grecaptcha.reset(widgetId1);
            grecaptcha.execute(widgetId1);
          }
        });

        $('#frm-pemiliktoko-s').on('submit', function (e) {
          if (e.isDefaultPrevented()) {
            // handle the invalid form...
            console.log("validation failed");
          } else {
            // everything looks good!
            demo2Call++;

            e.preventDefault();
            console.log("validation success");

            if(demo2Call==1)
            {
                widgetId2 = grecaptcha.render('recaptcha2', {
                'sitekey' : '6LfdfBwUAAAAAFRArkvhKiJ1mj-wUdWhSZKtxiRj',
                'callback' : onSubmit2,
                'size' : "invisible"
                });
            }

            grecaptcha.reset(widgetId2);
            grecaptcha.execute(widgetId2);
          }
        });
     });

    function onSubmit1(token){
            document.getElementById("frm-pemiliktoko").submit();
    };

    function onSubmit2(token){
            document.getElementById("frm-pemiliktoko-s").submit();
    };

    </script>
  </body>
</html>
