function getDaftarOutlet() {
    var datajson = {action : "GET_LIST_OUTLET"};
    var text = '';
    var i;
    $.post('welcome/outletsekarang.php',JSON.stringify(datajson),function(d){
        if (d.errcode == 'OK') {
            $("#pilihanoutlet").html('');
            result = d.result;
            for (i in result) {
                text += '<option value="'+result[i]['idoutlet']+'">'+result[i]['namaoutlet']+'</option>';
            }
            $("#pilihanoutlet").html(text);
            datajson = {action : "GET_SELECTED_OUTLET"};
            $.post('welcome/outletsekarang.php',JSON.stringify(datajson),function(d){
                if (d.errcode == 'OK') {
                    console.log("outlet "+d.result);
                    $("#pilihanoutlet").val(d.result);
                }
            },"json");
        } else {
            alert(d.msg);
        }
    },"json");
}

$(function() {
    
    getDaftarOutlet();
    
    $("#pilihanoutlet").on('change','',function(){
        var outletpilihan = $(this).val();
        var datajson = {action : "UPDATE_SELECTED_OUTLET", outlet : outletpilihan};
        $.post('welcome/outletsekarang.php',JSON.stringify(datajson),function(d){
            if (d.errcode == 'OK') console.log("Berhasil ubah outlet sekarang");
        },"json");
    });
});
