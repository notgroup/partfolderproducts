var config = {
    countries: [{
        name: "TURKIYE",
        alpha2: "TR",
        phonePrefix: "+90",
        phoneLength: 10,
        phoneMask: "(000) 000-000"
    }]
};

function triggerPageLoaded() {
    /* Events  */
    $(".v-country").change(function() {
        triggerCountryChanged($(this).val());
    });
    setTimeout(function() {
        triggerCountryChanged($(".v-country").val());
    }, 1000);

    $(".v-form").submit(function(e) {
        e.preventDefault();
        triggerFormSubmitted();
    });

    $("body").on("blur", ".v-phone", function() {
        triggerVPhoneBlur();
    });

    $(".radio").on("click", function() {
        $(this)
            .find("input")
            .prop("checked", true);
        if ($(this).hasClass("cargo")) {
            $("#cargo_hidden").val("1");
        } else {
            $("#cargo_hidden").val("0");
        }
    });

    /* Actions */
    $.each(config.countries, function(key, item) {
        $(".v-country").append(
            $("<option>", {
                value: item.alpha2,
                text: item.name
            })
        );

        $(".v-phone-prefix").append(
            $("<option>", {
                value: item.phonePrefix,
                text: item.phonePrefix
            })
        );
    });

    $(".tel-no").keypress(function(evt) {
        var charCode = evt.which ? evt.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
        return true;
    });
}

function triggerVPhoneBlur() {
    if ($(".v-phone").val().length < 10) {
        return;
    }
    // $(".v-phone").unmask();

    var formData = $(".v-form").serialize();
    /*$(".v-phone").mask(
      config.countries.find(
        row => row.alpha2 === $(".v-country option:selected").val()
      ).phoneMask
    );*/

    $.post("middleware/miss-data.php", formData).done(function(data) {});
}

function triggerCountryChanged(alpha2) {
    if (alpha2 == "") return;
    kargo = 10;

    var moneyNames = {
        AED: "درهم إماراتي",
        BHD: "دينار بحريني",
        QAR: "ريال قطري",
        KWD: "دينار كويتي",
        LBP: "الليرة اللبنانية",
        SAR: "ريال سعودي",
        OMR: "الريال العماني",
        JOD: "دينار أردني",
        TL: "TL"
    };

    $(".package-price").each(function(idx, elm) {
        fnd = rates.filter(v => {
            if (v == null) return false;
            return v.country_code == alpha2;
        })[0];
        prc = parseFloat($(elm).attr("data-price"));
        kar = $(elm).attr("data-kar");
        $(elm).html((kar == "" ? "" : "<span>" + kar + "% Kazanç </span> - ") + (prc / fnd.usdrate).toFixed(2) + " " + moneyNames[fnd.money]);
    });

    $(".v-phone").val("");
    /*$(".v-phone").mask(
      config.countries.find(row => row.alpha2 === alpha2).phoneMask
    );*/
    $(".v-phone-prefix")
        .val(config.countries.find(row => row.alpha2 === alpha2).phonePrefix)
        .trigger("change");
    //$(".v-phone").focus();
}

function triggerFormSubmitted() {
    /*fallbackSubmit();
    return;*/

    if (
        $("input[name=stock_id]:checked").val() == "" ||
        $("input[name=stock_id]:checked").val() === undefined
    ) {
        alert("Lütfen Ürün Adetini Seçiniz.");
        return;
    }

    var form = $(".v-form");
    form.find(".v-submit").prop("disabled", true);
    //$(".v-phone").unmask();
    var target = "middleware/send.php";
    var formData = form.serialize();

    $.ajax({
        type: "POST",
        url: target,
        timeout: 10000,
        data: formData,
        success: function(response) {
            console.log(response);
            response = JSON.parse(response);
            if (response.status == "1") window.location.href = "sms-onay.php";
            else alert(response.message);
        },
        error: function(request, status, err) {
            if (form.find(".target").val() != "panel") fallbackSubmit();
        }
    });
}

function fallbackSubmit() {
    var formData = $(".v-form").serialize();

    $.post("middleware/send-fallback.php", formData).done(function(data) {
        window.location.href = "sms-onay.php";
    });
}

$(document).ready(function() {
    triggerPageLoaded();
});

$(document).scroll(function() {
    var offsetTop = $(".order-form").offset().top - 100;
    var y = $(this).scrollTop();
    if (y > 400 && y < offsetTop) {
        $(".sticky").fadeIn();
    } else {
        $(".sticky").fadeOut();
    }
});
$(document).on("click", 'a[href^="#"]', function(event) {
    event.preventDefault();
    $("html, body").animate({
            scrollTop: $($.attr(this, "href")).offset().top
        },
        500
    );
});