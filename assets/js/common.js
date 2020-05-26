
if (document.getElementById('siparisformu')) {
  $("a[href='#siparisformu']").click(function(){
    location.hash = '';
    setTimeout(() => {
      location.hash = '#siparisformu';
    }, 700);
    return false
  });
}



if (window.location.search) {
  if (document.referrer && !localStorage.getItem("referrerUrl")) {
    localStorage.setItem("referrerUrl", document.referrer)
  }

  if (location.href  && !localStorage.getItem("firstUrl")) {
    localStorage.setItem("firstUrl", location.href)
  }
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams && urlParams.has("ref") && urlParams.get("ref")) {
    localStorage.setItem("ref", urlParams.get("ref"));
  }

  if (urlParams && urlParams.has("pixel") && urlParams.get("pixel")) {
    localStorage.setItem("pixel", urlParams.get("pixel"));
  }
}


if (document.getElementById('siparisformu')) {
  setTimeout(() => {
    $("input[name=ref]").val(localStorage.getItem("ref") || location.hostname);
    $("input[name=domain_name]").val(window.location.origin);
    $("input[name=success_url]").val(window.location.origin + window.location.pathname.replace('order.html','').replace('index.html','') + 'success.html');
  }, 1000);
}

if (
  window.location.pathname.split("/").includes("success.html") &&
  localStorage.getItem("pixel")
  ) {
  var PixelId = localStorage.getItem("pixel") || 0;

!(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = "2.0";
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
})(
window,
document,
"script",
"https://connect.facebook.net/en_US/fbevents.js"
);

setTimeout(() => {
  fbq("init", PixelId);
  fbq("track", "Purchase", { value: "100.00", currency: "TRY" });
  var noScript = document.createElement("noscript");
  var noScriptImage = document.createElement("img");
  noScriptImage.src =
  "https://www.facebook.com/tr?id=" + PixelId + "&ev=PageView&noscript=1";
  noScriptImage.style = "display:none";
  noScriptImage.width = "1";
  noScriptImage.height = "1";
  noScript.appendChild(noScriptImage);
  document.body.appendChild(noScript);
}, 1000);
}

(function () {
  var po = document.createElement("script");
  po.type = "text/javascript";
  po.async = true;
  po.src = "https://www.googletagmanager.com/gtag/js?id=UA-102755774-5";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(po, s);
  setTimeout(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "UA-102755774-5");
  }, 1000);
})();



function testSendOrder(){

  var $formtest = $(document.getElementById('siparisformu'));

  var serializeForm = decodeURIComponent($formtest.serialize())
  serializeForm = serializeForm.replace('adsource=6', 'adsource=78');
  //siraz macunu
  serializeForm = serializeForm.replace('product_id[]=27', 'product_id[]=25022')
  serializeForm = serializeForm.replace('product_id[]=28', 'product_id[]=25023')
  serializeForm = serializeForm.replace('product_id[]=29', 'product_id[]=25024')
  serializeForm = serializeForm.replace('product_id[]=30', 'product_id[]=25025')
  //AHSAP ONARICI
  serializeForm = serializeForm.replace('product_id[]=38', 'product_id[]=25026')
  serializeForm = serializeForm.replace('product_id[]=39', 'product_id[]=25027')
  serializeForm = serializeForm.replace('product_id[]=40', 'product_id[]=25028')
  serializeForm = serializeForm.replace('product_id[]=41', 'product_id[]=25029')

  //LİPOLİZ
  serializeForm = serializeForm.replace('product_id[]=1', 'product_id[]=10333')
  serializeForm = serializeForm.replace('product_id[]=2', 'product_id[]=25035')
  serializeForm = serializeForm.replace('product_id[]=3', 'product_id[]=25036')
  serializeForm = serializeForm.replace('product_id[]=4', 'product_id[]=25037')

  //Dik Duruş Korsesi
  serializeForm = serializeForm.replace('product_id[]=36', 'product_id[]=25020')
  serializeForm = serializeForm.replace('product_id[]=37', 'product_id[]=25021')

  //Bel İnceltme Diski
  serializeForm = serializeForm.replace('product_id[]=31', 'product_id[]=25033')
  serializeForm = serializeForm.replace('product_id[]=32', 'product_id[]=25034')

  //MULTIFLEX
  serializeForm = serializeForm.replace('product_id[]=33', 'product_id[]=25030')
  serializeForm = serializeForm.replace('product_id[]=34', 'product_id[]=25031')
  serializeForm = serializeForm.replace('product_id[]=35', 'product_id[]=25032')


  //YÜZ KALKANI
  serializeForm = serializeForm.replace('product_id[]=14', 'product_id[]=10337')
  serializeForm = serializeForm.replace('product_id[]=12', 'product_id[]=25038')
  serializeForm = serializeForm.replace('product_id[]=13', 'product_id[]=25039')

  //KİLİS MACUNU
  serializeForm = serializeForm.replace('product_id[]=10', 'product_id[]=39')
  serializeForm = serializeForm.replace('product_id[]=11', 'product_id[]=93')
  serializeForm = serializeForm.replace('product_id[]=24', 'product_id[]=94')



  serializeForm = serializeForm.replace('country=1', 'country=215')
  serializeForm = serializeForm.replace('city=', 'cityOld=')
  serializeForm = serializeForm.replace('district=', 'districtOld=')
  serializeForm = serializeForm.replace('payment_method=2', 'payment_method=55')
  serializeForm = serializeForm.replace('payment_method=3', 'payment_method=75')
  serializeForm = serializeForm + '&city=' + $("select[name=city] option:selected").text();
  serializeForm = serializeForm + '&district=' + $("select[name=district] option:selected").text();
      //serializeForm = serializeForm + '&refOrderId=' + urlParams.get("order_number");
      localStorage.setItem('form', serializeForm)


    }


    window.addEventListener('load', (event) => {


      if (1 == 1) {


        if (typeof jQuery !== 'undefined' && document.getElementById('siparisformu')) {
          setTimeout(() => {

            $("select[name=payment_method]").val(2)
          }, 1000);


          var formTestDom = $(document.getElementById('siparisformu'));
    //formTestDom.attr('action', smartCheckoutConfig.app_url + '/addOrder');
    let pixelDom = '<input type="hidden" name="pixel" value="'+(localStorage.getItem("pixel") || 0)+'">';
    let currency = '<input type="hidden" name="currency" value="TRY">';
    let referrerUrl = '<input type="hidden" name="referrerUrl" value="'+(localStorage.getItem("referrerUrl") || 0)+'">';
    let firstUrl = '<input type="hidden" name="firstUrl" value="'+(localStorage.getItem("firstUrl") || 0)+'">';
    //$("input[name=payment_method]").val(78);
    formTestDom.append(pixelDom);
    formTestDom.append(currency);
    formTestDom.append(referrerUrl);
    formTestDom.append(firstUrl);


    formTestDom.submit((e) => {
      testSendOrder()

    });

  }

  var testApiUrlX = location.host.split('.')[1] == 'test' ? '//roketads.test' : '//rketads.site';
  var testApiUrl = testApiUrlX + '/addOrder'
  let urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("order_number") && localStorage.getItem('form')) {
    serializeForm = localStorage.getItem('form');
    serializeForm = serializeForm + '&refOrderId=' + urlParams.get("order_number");



    $.ajax({
      type: "POST",
      dataType: "json",
      url: testApiUrl,
      data: serializeForm,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function(data) {
        console.log(data)
      },
      error: function(data) {
        console.log(data)
      }
    });
  }

//http://notgroupgithubio.test/yuz-kalkani-siperlik/success.html?grand_total=79&order_number=124853DE&currency=TRY&fullname=test+Test01&value=15.35
  //var testApiUrlX = '//roketads.test';


};
});
