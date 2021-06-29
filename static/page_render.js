function getLST(data) {
$("#lst").text(data.tcs_lst);
}

function getHB(data) {
$("#hb").text(data.tcs_hb);
}

function setPWRcolor(tag_id, val) {
    if (val) {
        $(tag_id).css('background-color', '#00FF00');
    } else {
        $(tag_id).css('background-color', '#FF0000');
    }
}

function getECSPwrStatus(data) {
    setPWRcolor("#dome_pwr", data.dome_st);
    setPWRcolor("#ts_pwr", data.ts_st);
    setPWRcolor("#bs_pwr", data.bs_st);
    setPWRcolor("#evg_pwr", data.evg_st);
    setPWRcolor("#wvg_pwr", data.wvg_st);
}

function getEpicsValsFast(socket) {
    socket.on('val_update', function(data) {
        getECSPwrStatus(data);
        getLST(data);
        getHB(data);
    });
}
function sendEpicsCmd() {
    $("#sendb").click(function() {
        //var vala = $('input[name="a1"]').val();
        var vala = $("#inp1").val();
        //var vala = 666;
        $.ajax({
            type: "POST",
            url: '/send_cmds',
            contentType: 'application/json',
            data:  JSON.stringify({
                val_a: vala,
                val_b: 0
            })
        });
        //$.post('/send_cmds', {val_a:vala});
    });
    $("#az_assrt").focus(function() {
        //var vala = $('input[name="a1"]').val();
        $("#az_assrt").prop("selectedIndex", -1)
    }).change(function() {
        //var vala = $('input[name="a1"]').val();
        var valb = $("#az_assrt").val();
        //var vala = 666;
        $.ajax({
            type: "POST",
            url: '/send_cmds',
            contentType: 'application/json',
            data:  JSON.stringify({
                val_b: valb
            })
        });
        //$.post('/send_cmds', {val_a:vala});
    });
            }
$(document).ready(function() {
    var socket = io();
    getEpicsValsFast(socket);
    //setInterval("getEpicsValsFast()",1000);
    //setInterval("getEpicsValsSlow()",2000);
    sendEpicsCmd();
});

