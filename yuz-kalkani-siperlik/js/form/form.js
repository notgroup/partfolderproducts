function getDistricts() {
    var url = 'ajax.php?type=districts';
    var city = $('select[name="city"]').val();
   /* $.post(url, {
        cityid: city
    }).done(function(data) {
        $('select[name="district"]').html(data);
    });*/
}

function telefonYaz() {
    var plength = $('input[name="phone_number"]').val().length;
    //alert(plength);

}

function tst() {
   /* $('button').prop('disabled', true);
    $('button').html('Lütfen bekleyin...');
    try {
        if ($('select[name="options"]').val().length) {
            var optionses = new Array();
            $('select[name="options"]').each(function() {
                var options = $(this).val();
                var options_name = $(this).prop('id');
                var option = {
                    'name': options_name,
                    'value': options
                };
                optionses.push(option);
            });


            var optionJson = JSON.stringify(optionses);
        } else {
            var optionJson = '';
        }
    } catch (err) {
        var optionJson = '';
    }*/
    var plength = $('input[name="phone_number"]').val().length;
    var namelength = $('input[name="firstname"]').val().length;
    if (plength > 9) {
        $('input[name="phone_number"]').removeClass('tel_dikkat');
        $('input[name="phone_number"]').addClass('tel_ok');
        var product_box = $('input[name="product_box"]:checked').val();
    } else {
        $('input[name="phone_number"]').addClass('tel_dikkat');
        $('input[name="phone_number"]').removeClass('tel_ok');

    }

    if (namelength) {
        $('input[name="firstname"]').removeClass('tel_dikkat');
        $('input[name="firstname"]').addClass('tel_ok');
    } else {
        $('input[name="firstname"]').addClass('tel_dikkat');
        $('input[name="firstname"]').removeClass('tel_ok');

    }



}

function siparisOlustur() {

    $('.error_label').css('display', "none");

    try {
        if ($('select[name="options"]').val().length) {
            var optionses = new Array();
            $('select[name="options"]').each(function() {
                var options = $(this).val();
                var options_name = $(this).prop('id');
                var option = {
                    'name': options_name,
                    'value': options
                };
                optionses.push(option);
            });


            var optionJson = JSON.stringify(optionses);
        } else {
            var optionJson = '';
        }
    } catch (err) {
        var optionJson = '';
    }
    if ($('input[name="firstname"]').val().length < 2) {
        $('html, body').animate({
            scrollTop: $('input[name="firstname"]').offset().top
        }, 1000, function() {
            $('input[name="firstname"]').focus();
            $('input[name="firstname"]').css('border', '1px solid red');
            $('label#name').show('fast');
        });
    } else if ($('input[name="phone_number"]').val().length < 9) {
        $('html, body').animate({
            scrollTop: $('input[name="phone_number"]').offset().top
        }, 1000, function() {
            $('input[name="phone_number"]').focus();
            $('input[name="phone_number"]').css('border', '1px solid red');
            $('label#phone').show('fast');
        });
    } else if ($('select[name="city"]').val() == 0) {
        $('html, body').animate({
            scrollTop: $('select[name="city"]').offset().top
        }, 1000, function() {
            $('select[name="city"]').focus();
            $('select[name="city"]').css('border', '1px solid red');
            $('label#city').show('fast');
        });
    } else if ($('select[name="district"]').val() == 0) {
        $('html, body').animate({
            scrollTop: $('select[name="district"]').offset().top
        }, 1000, function() {
            $('select[name="district"]').focus();
            $('select[name="district"]').css('border', '1px solid red');
        });
    } else if ($('textarea[name="address"]').val() == 0) {
        $('html, body').animate({
            scrollTop: $('textarea[name="address"]').offset().top
        }, 1000, function() {
            $('textarea[name="address"]').focus();
            $('textarea[name="address"]').css('border', '1px solid red');
            $('label#address').show('fast');
        });
    } else if ($('select[name="payment_method"]').val() == 0) {
        $('html, body').animate({
            scrollTop: $('select[name="payment_method"]').offset().top
        }, 1000, function() {
            $('select[name="payment_method"]').focus();
            $('select[name="payment_method"]').css('border', '1px solid red');
            $('label#payment_method').show('fast');
        });
    } else {
        $('.error_label').hide();
        $('button').prop('disabled', true);
        $('button').html('... Siparişiniz Oluşturuluyor ...');
        var url = 'ajax.php?type=complete';
        var token = $('meta[name="csrf-token"]').attr('content');
        var product_id = $('input[name="product_id"]').val();
        var name = $('input[name="firstname"]').val();
        var phone = $('input[name="phone_number"]').val();
        var city = $('select[name="city"]').val();
        var payment_method = $('select[name="payment_method"]').val();
        var district = $('select[name="district"]').val();
        var address = $('textarea[name="address"]').val();
        var product_box = $('input[name="product_box"]:checked').val();
       /* $.post(url, {
            product_id: product_id,
            name: name,
            phone: phone,
            city: city,
            payment_method: payment_method,
            district: district,
            address: address,
            product_box: product_box,
            optionJson: optionJson,
            _token: token
        }, function(data) {
            //$('button').css();
            $('button').prop('disabled', true);
            $('button').html('... Yönlendiriliyorsunuz ...');
            window.location.href = 'tamamlandi.php';
        }).done(function(data) {
            $('button').prop('disabled', true);
            $('button').html('... Yönlendiriliyorsunuz ...');
            window.location.href = 'tamamlandi.php';
        })*/
    }
}

function paketSec() {
    tst();
    $('html, body').animate({
        scrollTop: $("#contact").offset().top
    }, 2000);

    $('input[name="firstname"]').focus();
}