$('input[type="radio"]').change(function() {
    var selectedBox = $(this).val();
    console.log('Seçilen paket:' + selectedBox);
    smooth_scroll($(this), $('#formtop'));
    $('input[type="radio"]').each(function() {
        var selectedBox = $(this).val();
        var thisStatus = $(this).prop('checked');
        if (thisStatus == true) {
            $('#img-' + selectedBox + '-select').css('display', 'none');
            $('#img-' + selectedBox + '-selected').css('display', 'inline');
        } else {
            $('#img-' + selectedBox + '-select').css('display', 'inline');
            $('#img-' + selectedBox + '-selected').css('display', 'none');
        }
    });
});


$(".paketResim").click(function() {
    smooth_scroll($(this), $('#formtop'));
});

$(".formLink").click(function() {
    smooth_scroll($(this), $('#siparisFormu'));
});