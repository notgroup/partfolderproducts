
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <script type="text/javascript" src="https://mavifirsatlar.com/siteler/z.common/js/jquery.js"></script>
    <script src="https://mavifirsatlar.com/siteler/z.common/js/jquery.mobile-1.4.2.min.js"></script>
    <link href='https://mavifirsatlar.com/siteler/z.common/css/jquery.mobile-1.4.2.css' rel='stylesheet' type='text/css'>
 
    <link href="https://mavifirsatlar.com/siteler/z.common/css/fb.css" rel="stylesheet" type="text/css" />
    <link href="https://mavifirsatlar.com/siteler/z.common/css/tw.css" rel="stylesheet" type="text/css" />

    <link href="https://mavifirsatlar.com/siteler/z.common/css/slick/slick.css" rel="stylesheet" type="text/css" />
    <script src="https://mavifirsatlar.com/siteler/z.common/css/slick/slick.min.js" type="text/javascript"></script>
    <script src="https://mavifirsatlar.com/siteler/z.common/js/scripts.js" type="text/javascript"></script>

    <link rel="stylesheet" type="text/css" href="https://mavifirsatlar.com/siteler/z.common/js/lightbox/themes/default/jquery.lightbox.css" />
    <script type="text/javascript" src="https://mavifirsatlar.com/siteler/z.common/js/lightbox/jquery.lightbox.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function(){
        
        jQuery('.lightbox').lightbox();
        
        });
    </script>

    <link rel="stylesheet" type="text/css" href="https://mavifirsatlar.com/siteler/z.common/css/DDSlider.css" />
    <style type="text/css">
        body,td,th {
        	font-family: "PT Sans", sans-serif;
        }
    </style>
    <script src="https://mavifirsatlar.com/siteler/z.common/js/jquery.DDSlider.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            
            $('.bigslider').DDSlider({
        		waitTime: 3000,
        		trans: 'fading',
        	});
        
            $('.bigslider2').DDSlider({
        		waitTime: 3000,
        		trans: 'fading',
        	});
            
        });
    </script>

</head>

<body>


<style>
    #selectMenu{
    	width:100%;
    	appearance:none;
    	-webkit-appearance: none;
    	-moz-appearance:none;
    	-o-appearance:none;
    	webkit-appearance:none;
    	padding:5px;
    	border:none;
    	height:50px;
    	background:url(../img/menu.png) 20px center no-repeat #285491;;
    	color:#FFF;
    	border-radius:0px;
    	z-index:999;
    	box-shadow:0 3px 3px #286bc7;
    }
    .ui-overlay-a, .ui-page-theme-a, .ui-page-theme-a .ui-panel-wrapper{
    background-color: #fff;
    }
    .fotos{
    	width:100%;
    }
    .ui-btn.ui-input-btn {
        background: #2b9c2d !important;
        border: 1px solid #000 !important;
    }
    .urunfoto{
    	float: left;
        margin-right: 15px;
        margin-left: 2px;
        margin-bottom: -1px;
    	width: 32%;
    }
    .ui-page-theme-a .ui-radio-on:after, html .ui-bar-a .ui-radio-on:after, html .ui-body-a .ui-radio-on:after, html body .ui-group-theme-a .ui-radio-on:after, .ui-btn.ui-radio-on.ui-btn-a:after{
    	border-color: #2b9c2d !important;
    }
    .laball{
    	text-align:center;
    }
    .baslik{
    	font-size: 4.3vw;
    }
    .indirim{
    	font-size: 3vw;
    	font-weight:bold;
    }
    .adetler .ui-btn.ui-checkbox-off:after, .adetler .ui-btn.ui-checkbox-on:after, .adetler .ui-btn.ui-radio-off:after, .adetler .ui-btn.ui-radio-on:after{margin-top:-49px;}
    label.sonuzun.ui-btn.ui-corner-all.ui-btn-inherit.ui-btn-icon-left.ui-radio-off.ui-last-child.sonuzun:after {
        
    }
    .ui-btn.ui-checkbox-off:after, .ui-btn.ui-checkbox-on:after, .ui-btn.ui-radio-off:after, .ui-btn.ui-radio-on.sonuzun:after {
        
    }
    .sonuzun:after{
    	margin-top: -63px !important;
    }
    @media screen and (max-width:550px){
    	.baslik{
    		font-size: 5vw;
    	}
    	.indirim{
    		font-size: 4.4vw;
    	}
    	.urunfoto{
    		width:45%;
    		margin-left:-10px;
    	}
    	.hediye{
    		width: 111%;
    		margin-left: -30px;
    	}
    }
</style>

<script src="https://mavifirsatlar.com/siteler/z.common/js/javascript/jquery.maskedinput.js" type="text/javascript" charset="utf-8"></script>

<script>
    $("#telefon").mask("0(999)999-9999");
    
    function caps(element){
    element.value = element.value.toUpperCase();
    }
    function capsdown(element){
    element.value = element.value.toLowerCase();
    }
    
    $(document).delegate('li a', 'click', function () {
    	var gidilecek = $(this).attr("href");
        $("html,body").animate({ scrollTop: $(gidilecek).offset().top }, 800);
    	$( "#menu" ).panel( "close" );
    	return false;
    });
    
    var menu = [
      {
            title: "ANA SAYFA",
            url  : "index.php"
        },
        {
            title: "ÖZELLİKLER",
            url  : "ozellikler.php"
        },
        {
            title: "KULLANANLAR",
            url  : "kullananlar.php"
        },
        {
            title: "İLETİŞİM",
            url  : "iletisim.php"
        },
        {
            title: "SİPARİŞ",
            url  : "siparis.php"
      }
    ];
    
    // For this "simple demo" we can change event to "pageinit", but for the more advanced features, it has to be bound to "pageshow"
    $(document).on("pageshow", function (event) {
    
      var items = '', // menu items list
        ul = $(".mainMenu:empty");  // get "every" mainMenu that has not yet been processed
    
      for (var i = 0; i < menu.length; i++) {
        items += '<li><a href="' + menu[i].url + '">' + menu[i].title + '</a></li>';
      }
    
      ul.append(items);
      ul.listview('refresh'); // use cache, as ".mainMenu:empty" will no longer work (append called!)
    
    });
    
    $(function(){
      $(".content a").each(function(){
        $(this).attr("rel","external");
      });
    });
</script>


<div class="content">

    <div id="clr"></div>

    <div>
        <div style="text-align: left; width: 97%;padding:8px;/*background-color:white;*/color:black" >
            <form method="post" action="../tesekkurler.php?islem=1#siparis" data-ajax="false" id="formID">
 
                <div class="fotos">
                    <img src="../images/logo.png" style="width: 245px;margin: -15px auto 15px auto;display: table;">
                </div>

                <div class="adetler">
                  <fieldset data-role="controlgroup">
                    <legend style="background-color: #2b9c2d;border: 1px solid #000000;padding:10px; color:#fff; font-size:20px; width:96%;margin-top:10px;">Adet Seçiniz:</legend>
                            <!-- 1 Adet Ürün -->
                                <input type="radio" name="adet" id="radio-choice-1" value="1" onclick="urunsec();">
                                <label for="radio-choice-1" >
                                    <img src="../images/l1.png" class="urunfoto" style="margin-top: 2px;margin-bottom: 2px;">
                                    <div style="text-align:center;color: #3a3c3e;font-weight: bold;" class="baslik">1 Adet Salad50Sec - Pratik Salata Yapıcı</div>
                                    <div style="text-align:center;margin-top: 5px;margin-bottom: -2px;">
                                        <strike style="font-size: 5.6vw;">80 TL</strike>
                                        <span style="font-size: 6vw;color: #ff0506;font-weight: bold;padding-left: 7px;">39 TL</span>
                                    </div>
                                    <div style="text-align: center;" class="indirim">
                                        <div style="text-align: center;" class="indirim"><b><span style="padding:5px; margin-top:5px; display:inline-block;">+ Kargo</b></span></div>
                                        
                                    </div>
                                </label><!-- 2 Adet Ürün -->
                                <input type="radio" name="adet" id="radio-choice-2" value="2" checked="checked" onclick="urunsec();">
                                <label for="radio-choice-2">
                                    <img src="../images/l2.png" class="urunfoto" style="margin-top: 2px;margin-bottom: 2px;">
                            		<div style="text-align:center;color: #3a3c3e;font-weight: bold;" class="baslik">2 Adet Salad50Sec - Pratik Salata Yapıcı</div>
                            		<div style="text-align:center;margin-top: 5px;margin-bottom: -2px;">
                            		    <strike style="font-size: 5.6vw;">140 TL</strike>
                                        <span style="font-size: 6vw;color: #ff0506;font-weight: bold;padding-left: 7px;">69 TL</span>
                            		</div>
                            		<div style="text-align: center;" class="indirim">
                            		    <span style="background: yellow; padding:5px; margin-top:5px; display:inline-block;">Ücretsiz Kargo</span>
                                        
                        		    </div>
                        		</label><!-- 3 Adet Ürün -->
                                <input type="radio" name="adet" id="radio-choice-3" value="3" onclick="urunsec();">
                                <label for="radio-choice-3" class="sonuzun" >
                                    <img src="../images/l3.png" class="urunfoto" style="margin-bottom:5px;margin-top:3px;">
                                    <div style="text-align:center;color: #3a3c3e;font-weight: bold;" class="baslik">3 Adet Salad50Sec - Pratik Salata Yapıcı</div>
                                    <div style="text-align:center;margin-top: 5px;margin-bottom: -2px;">
                                        <strike style="font-size: 5.6vw;">200 TL</strike>
                                        <span style="font-size: 6vw;color: #ff0506;font-weight: bold;padding-left: 7px;">99 TL</span>
                                    </div>
                                    <div style="text-align: center;" class="indirim">
                                        <span style="background: yellow; padding:5px; margin-top:5px; display:inline-block;">Ücretsiz Kargo</span>
                                        <span style="background: #ad1010; padding:5px; margin-top:5px; display:inline-block; font-weight: normal;" class="hediye"><font color="white">30 TL Değerinde Süpriz Hediye!</font></span>
                                    </div>
                                </label>                    </fieldset>
                </div>

                <fieldset data-role="controlgroup">
                    <legend style="background-color: #2b9c2d;border: 1px solid #000000;padding:10px; color:#fff; font-size:20px; width:96%;margin-top:7px;">Ödeme Şekli</legend>
                    <input type="radio" name="odeme" id="radio-choice-1" value="Kapıda Nakit" checked="checked">
                    <label for="radio-choice-1">Kapıda Nakit Ödeme</label>
                    <input type="radio" name="odeme" id="radio-choice-2" value="Kapıda KK">
                    <label for="radio-choice-2">Kapıda Kredi Kartı ile Ödeme</label>
                </fieldset>
                
                <label class="select" style="background-color: #2b9c2d;border: 1px solid #000000;padding:10px; color:#fff; font-size:20px;margin-top:15px;">Kişisel Bilgilerinizi Giriniz</label>
				<label for="fname" style="color: #000;margin-top:5px;">Adınız Soyadınız</label>
				
				<input type="text" name="isim" required id="fname">
				<label for="telefon" style="color: #000;margin-top:5px;">Telefon Numaranız</label>
				
				<input type="tel" name="telefon" required id="telefon">
				<label for="textarea-1" style="color: #000;margin-top:5px;">Teslimat Adresi</label>
				
				<textarea cols="40" rows="8" name="adres" id="textarea-1" required></textarea>
				<label for="il" class="select" style="color: #000;margin-top:5px;">Şehir Seçiniz</label>
				
				<select id="il" name="il"  class="validate[required] line-one il" required>
                    <option value="">Şehir Seçiniz</option>
                    <option value="1" >ADANA</option><option value="2" >ADIYAMAN</option><option value="3" >AFYONKARAHİSAR</option><option value="4" >AĞRI</option><option value="68" >AKSARAY</option><option value="5" >AMASYA</option><option value="6" >ANKARA</option><option value="7" >ANTALYA</option><option value="75" >ARDAHAN</option><option value="8" >ARTVİN</option><option value="9" >AYDIN</option><option value="10" >BALIKESİR</option><option value="74" >BARTIN</option><option value="72" >BATMAN</option><option value="69" >BAYBURT</option><option value="11" >BİLECİK</option><option value="12" >BİNGÖL</option><option value="13" >BİTLİS</option><option value="14" >BOLU</option><option value="15" >BURDUR</option><option value="16" >BURSA</option><option value="17" >ÇANAKKALE</option><option value="18" >ÇANKIRI</option><option value="19" >ÇORUM</option><option value="20" >DENİZLİ</option><option value="21" >DİYARBAKIR</option><option value="81" >DÜZCE</option><option value="22" >EDİRNE</option><option value="23" >ELAZIĞ</option><option value="24" >ERZİNCAN</option><option value="25" >ERZURUM</option><option value="26" >ESKİŞEHİR</option><option value="27" >GAZİANTEP</option><option value="28" >GİRESUN</option><option value="29" >GÜMÜŞHANE</option><option value="30" >HAKKARİ</option><option value="31" >HATAY</option><option value="76" >IĞDIR</option><option value="32" >ISPARTA</option><option value="34" >İSTANBUL</option><option value="35" >İZMİR</option><option value="46" >KAHRAMANMARAŞ</option><option value="78" >KARABÜK</option><option value="70" >KARAMAN</option><option value="36" >KARS</option><option value="37" >KASTAMONU</option><option value="38" >KAYSERİ</option><option value="79" >KİLİS</option><option value="71" >KIRIKKALE</option><option value="39" >KIRKLARELİ</option><option value="40" >KIRŞEHİR</option><option value="41" >KOCAELİ</option><option value="42" >KONYA</option><option value="43" >KÜTAHYA</option><option value="44" >MALATYA</option><option value="45" >MANİSA</option><option value="47" >MARDİN</option><option value="33" >MERSİN(İÇEL)</option><option value="48" >MUĞLA</option><option value="49" >MUŞ</option><option value="50" >NEVŞEHİR</option><option value="51" >NİĞDE</option><option value="52" >ORDU</option><option value="80" >OSMANİYE</option><option value="53" >RİZE</option><option value="54" >SAKARYA</option><option value="55" >SAMSUN</option><option value="63" >ŞANLIURFA</option><option value="56" >SİİRT</option><option value="57" >SİNOP</option><option value="73" >ŞIRNAK</option><option value="58" >SİVAS</option><option value="59" >TEKİRDAĞ</option><option value="60" >TOKAT</option><option value="61" >TRABZON</option><option value="62" >TUNCELİ</option><option value="64" >UŞAK</option><option value="65" >VAN</option><option value="77" >YALOVA</option><option value="66" >YOZGAT</option><option value="67" >ZONGULDAK</option>				</select>	
				
				<input type="submit" value="Siparişi Gönder" style="margin-top: 15px;" data-theme="b">
			</form>
		</div>
	</div>
</div>

<script src="https://mavifirsatlar.com/siteler/z.common/js/javascript/jquery.chained.js?v=1.0.0" type="text/javascript" charset="utf-8"></script>
<script src="https://mavifirsatlar.com/siteler/z.common/js/javascript/jquery.chained.remote.js?v=1.0.0" type="text/javascript" charset="utf-8"></script>
<script src="https://mavifirsatlar.com/siteler/z.common/js/javascript/jquery.maskedinput.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" charset="utf-8">
    //$("#telefon").mask("0(999)999-9999");
    //$("[name=telefon]").mask("0(999)999-9999");
    $(document).ready(function() {
    	urunsec();
    });
    $(document).ready(function() {
        $("#telefon").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                 // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
                 // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                     // let it happen, don't do anything
                     return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    });
    function urunsec() {
    	var selectedVal = "";
    	var selected = $(".adetler input[type='radio']:checked");
    	if (selected.length > 0) {selectedVal = selected.val();}
    	var gelen = selectedVal;
    	//var gelen = $("input[name=adet]").val();
    	if(gelen==1) {
    		$('#no2').show();
    		$('#no3').hide();
    	} else if(gelen==2) {
    		$('#no2').show();
    		$('#no3').show();
    	} else if(gelen==3) {
    		$('#no2,#no3').show();
    	} else if(gelen==4) {
    		$('#no2,#no3').show();
    	}
    }
    $(function() {
    	$("#ilce").chained("#il");
    	$("#model").chained("#ilce");
    	$("#engine").chained("#ilce, #model");
    	$("#numara").chained("#renk");
    	$("#model").chained("#numara");
    	$("#engine").chained("#numara, #model");	
    	$("#numara22").chained("#renk2");
    	$("#model").chained("#numara22");
    	$("#engine").chained("#numara22, #model");	
    	$("#numara3").chained("#renk3");
    	$("#model").chained("#numara3");
    	$("#engine").chained("#numara3, #model");	
    	
    	$("#engine").bind("change", function(event) {
    		if ("" != $("option:selected", this).val() && "" != $("option:selected", $("#model")).val()) {
    			$("#button").fadeIn();
    		} else {
    			$("#button").hide();
    		}
    	});
    	$("#c").chained("#a,#b");
    	$("#series-remote").remoteChained({
    		parents : "#mark-remote",
    		url : "json.php?sleep=1",
    		loading : "--"
    	});
    	$("#model-remote").remoteChained({
    		parents : "#series-remote",
    		url : "json.php?sleep=1",
    		loading : "--"
    	});
    	$("#engine-remote").remoteChained({
    		parents : "#series-remote, #model-remote",
    		url : "json.php?sleep=1",
    		loading : "--",
    		clear : true
    	});
    	$("#engine-remote").bind("change", function(event) {
    		if ("" != $("option:selected", this).val() && "" != $("option:selected", $("#model-remote")).val()) {
    			$("#button-remote").fadeIn();
    		} else {
    			$("#button-remote").hide();
    		}
    	});
    	$("#c-remote").remoteChained("#a-remote,#b-remote", "json.php");
    	$(".series-remote").each(function() {
    		$(this).remoteChained($(".mark-remote", $(this).parent()), "json.php");
    	});
    	$(".model-remote").each(function() {
    		$(this).remoteChained($(".series-remote", $(this).parent()), "json.php");
    	});
    	$(".engine-remote").each(function() {
    		$(this).remoteChained([
    			$(".series-remote", $(this).parent()),
    			$(".model-remote", $(this).parent())
    		], "json.php");
    	});
    	$(".series").each(function() {$(this).chained($(".mark", $(this).parent()));});
    	$(".model").each(function() {$(this).chained($(".series", $(this).parent()));});
    	$(".engine").each(function() {
    		$(this).chained([
    			$(".series", $(this).parent()),
    			$(".model", $(this).parent())
    		]);
    	});
    	$("#series-remote-2").remoteChained({
    		parents : "#mark-remote-2",
    		url : "json.php",
    	});
    	$("#model-remote-2").remoteChained({
    		parents : "#series-remote-2",
    		url : "json.php"
    	});
    	$("#engine-remote-2").remoteChained({
    		parents : "#series-remote-2, #model-remote-2",
    		url : "json.php"
    	});
    	$("#engine-remote-2").bind("change", function(event) {
    		if ("" != $("option:selected", this).val() && "" != $("option:selected", $("#model-remote-2")).val()) {
    			$("#button-remote-2").fadeIn();
    		} else {
    			$("#button-remote-2").hide();
    		}
    	});
    });
    var form = document.getElementById('formID'); // form has to have ID: <form id="formID">
    form.noValidate = true;
    form.addEventListener('submit', function(event) { // listen for form submitting
    	if (!event.target.checkValidity()) {
    		event.preventDefault(); // dismiss the default functionality
    		alert('Lütfen gerekli alanları doldurunuz'); // error message
    	}
    }, false);
</script>
</body>
</html>