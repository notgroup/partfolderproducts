<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Koruyucu Siperlik Başlık - siperlik.birmarket.info</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link href="css/video.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="css/form/bootstrap.css">
    <link rel="stylesheet" href="css/form/font-awesome.min.css">
    <script src="js/form/form.js"></script>
    <link rel="stylesheet" href="css/form/animate.css">
    <link rel="stylesheet" href="css/form/core.css">
    <script src="js/jquery-1.9.1.min.js"></script>
    </head>
<body>

<div class="container" style="background-color: white; width: %100; padding: 0;">
    <div id="siparisformu" style="padding:5px">
        <form action="tamamla_post.php" class="thecheckout checkout-form" method="post" autocomplete="off" data-locale="tr">
            <div class="row" style="background-color: #fff">
                                    <label id="0" class="product-element product col-sm-12 col-xs-12" data-box-id="0">
                        <input type="radio" name="product_box" id="product_box"
                               value="0" checked>
                        <img src="images/9768_1_1.png" class="img-fluid dn paketResim" id="img-0-select">
                        <img src="images/9768_1_2.png" class="img-fluid selected di paketResim" id="img-0-selected">
                    </label>
                                    <label id="1" class="product-element product col-sm-12 col-xs-12" data-box-id="1">
                        <input type="radio" name="product_box" id="product_box"
                               value="1" >
                        <img src="images/9768_2_1.png" class="img-fluid di paketResim" id="img-1-select">
                        <img src="images/9768_2_2.png" class="img-fluid selected dn paketResim" id="img-1-selected">
                    </label>
                                    <label id="2" class="product-element product col-sm-12 col-xs-12" data-box-id="2">
                        <input type="radio" name="product_box" id="product_box"
                               value="2" >
                        <img src="images/9768_3_1.png" class="img-fluid di paketResim" id="img-2-select">
                        <img src="images/9768_3_2.png" class="img-fluid selected dn paketResim" id="img-2-selected">
                    </label>
                            </div>
            <div class="wrapper" style="background-color: #fff" id="contact">
                                <div class="container" id="formtop">
                    <div class="">
                        <div class="col-xs-12">
                            <img class="" src="images\adresBilgileri.jpg">
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="hidden" name="product_id" value="9768">
                        <input type="text" name="name" class="form-control input-lg" placeholder="Ad Soyad" required onkeyup="tst()">
                        <label class="error_label" id="name">Ad Soyad girmeniz gerekmektedir.</label>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" class="form-control input-lg" placeholder="Telefon Numarası" required onkeydown="telefonYaz()" onkeyup="tst()">
                        <label class="error_label" id="phone">Telefon numaranızı eksiksiz girmeniz
                            gerekmektedir.</label>
                    </div>
                                        <div class="form-group select-container">
                        <select name="city" class="form-control input-lg thecity" onchange="getDistricts()">
                            <option value="0">-- İL SEÇİN --</option>
                                                            <option value="1">Adana</option>
                                                            <option value="2">Adıyaman</option>
                                                            <option value="3">Afyonkarahisar</option>
                                                            <option value="4">Ağrı</option>
                                                            <option value="68">Aksaray</option>
                                                            <option value="5">Amasya</option>
                                                            <option value="6">Ankara</option>
                                                            <option value="7">Antalya</option>
                                                            <option value="75">Ardahan</option>
                                                            <option value="8">Artvin</option>
                                                            <option value="9">Aydın</option>
                                                            <option value="10">Balıkesir</option>
                                                            <option value="74">Bartın</option>
                                                            <option value="72">Batman</option>
                                                            <option value="69">Bayburt</option>
                                                            <option value="11">Bilecik</option>
                                                            <option value="12">Bingöl</option>
                                                            <option value="13">Bitlis</option>
                                                            <option value="14">Bolu</option>
                                                            <option value="15">Burdur</option>
                                                            <option value="16">Bursa</option>
                                                            <option value="17">Çanakkale</option>
                                                            <option value="18">Çankırı</option>
                                                            <option value="19">Çorum</option>
                                                            <option value="20">Denizli</option>
                                                            <option value="21">Diyarbakır</option>
                                                            <option value="81">Düzce</option>
                                                            <option value="22">Edirne</option>
                                                            <option value="23">Elazığ</option>
                                                            <option value="24">Erzincan</option>
                                                            <option value="25">Erzurum</option>
                                                            <option value="26">Eskişehir</option>
                                                            <option value="27">Gaziantep</option>
                                                            <option value="28">Giresun</option>
                                                            <option value="29">Gümüşhane</option>
                                                            <option value="30">Hakkari</option>
                                                            <option value="31">Hatay</option>
                                                            <option value="76">Iğdır</option>
                                                            <option value="32">Isparta</option>
                                                            <option value="34">İstanbul</option>
                                                            <option value="35">İzmir</option>
                                                            <option value="46">Kahramanmaraş</option>
                                                            <option value="78">Karabük</option>
                                                            <option value="70">Karaman</option>
                                                            <option value="36">Kars</option>
                                                            <option value="37">Kastamonu</option>
                                                            <option value="38">Kayseri</option>
                                                            <option value="79">Kilis</option>
                                                            <option value="71">Kırıkkale</option>
                                                            <option value="39">Kırklareli</option>
                                                            <option value="40">Kırşehir</option>
                                                            <option value="41">Kocaeli</option>
                                                            <option value="42">Konya</option>
                                                            <option value="43">Kütahya</option>
                                                            <option value="44">Malatya</option>
                                                            <option value="45">Manisa</option>
                                                            <option value="47">Mardin</option>
                                                            <option value="33">Mersin</option>
                                                            <option value="48">Muğla</option>
                                                            <option value="49">Muş</option>
                                                            <option value="50">Nevşehir</option>
                                                            <option value="51">Niğde</option>
                                                            <option value="52">Ordu</option>
                                                            <option value="80">Osmaniye</option>
                                                            <option value="53">Rize</option>
                                                            <option value="54">Sakarya</option>
                                                            <option value="55">Samsun</option>
                                                            <option value="63">Şanlıurfa</option>
                                                            <option value="56">Siirt</option>
                                                            <option value="57">Sinop</option>
                                                            <option value="58">Sivas</option>
                                                            <option value="73">Şırnak</option>
                                                            <option value="59">Tekirdağ</option>
                                                            <option value="60">Tokat</option>
                                                            <option value="61">Trabzon</option>
                                                            <option value="62">Tunceli</option>
                                                            <option value="64">Uşak</option>
                                                            <option value="65">Van</option>
                                                            <option value="77">Yalova</option>
                                                            <option value="66">Yozgat</option>
                                                            <option value="67">Zonguldak</option>
                                                    </select>
                        <label class="error_label" id="city">İl seçmeniz gerekmektedir.</label>
                    </div>
                                        <div class="form-group select-container">
                        <select name="district" class="form-control input-lg smart-district-select" onchange="tst()">
                            <option value="">-- ÖNCE İL SEÇİN --</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <textarea name="address" id="address" placeholder="Adresiniz" class="form-control input-lg" onkeyup="tst()"></textarea>
                        <label class="error_label" id="address">Adres bilgisini girmeniz gerekmektedir.</label>
                    </div>
                    
                    <div class="form-group select-container">
                        <select name="payment_type" class="form-control input-lg smart-payment-select">
                                                            <option value="3">Kapıda Kartla Ödeme</option>
                                                            <option value="1">Kapıda Nakit Ödeme</option>
                                                    </select>
                        <label class="error_label" id="payment_type">Ödeme tipi seçmeniz gerekmektedir.</label>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="form_btn" id="sp_button">Siparişimi Gönder</button>
                    </div>
                    <div class="form-group">
                        <center>
                            <input type="checkbox" checked name="sozlesme" id="sozlesme"><br />
                            <label for="sozlesme"><a target="_blank" href="sayfalar/m_satis_sozlesmesi.php">Mesafeli Satış Sözleşmesini</a> ve <a target="_blank" href="sayfalar/g_politikasi.php">Gizlilik Sözleşmesini</a> kabul ediyorum. </label>
                        </center>
                    </div>
                </div><!-- /.container -->
            </div>

            <!-- /.wrapper -->
            <div class="wrapper">
            </div><!-- /.wrapper -->

            <!-- /.wrapper -->

        </form>
    </div>
    <a href="#siparisformu"><img src="images/siparis5.png" width="100%"></a>

    <div class="main ortala">
        <ul class="footer_menu">
            <li><a target="_blank" href="sayfalar/m_satis_sozlesmesi.php">Mesafeli Satış Sözleşmesi</a></li>
            <li><a target="_blank" href="sayfalar/g_politikasi.php">Gizlilik Politikası</a></li>
            <li><a target="_blank" href="sayfalar/d_iade_politikasi.php">Değişim Ve İade Politikası</a></li>
        </ul>
        <p><b>Koruyucu Siperlik Başlık</b><br>
            <span style="font-size:13px">Copyright 2019 - Tüm hakları saklıdır.</span>
        </p>
    </div>

</div>
<script src="js/form/jquery.cookie.js"></script>
<script src="js/form/product-counter.js"></script>
<script src="js/form/app.js?xx" id="theapp"></script>
<script src="js/form/smooth-scroll.js"></script>
</body>
</html>