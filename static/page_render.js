function setPWRcolor(tag_id, val) {
    // Set color for ON (green) and OFF (red)
    if (val) {
        $(tag_id).css('background-color', '#00FF00');
    } else {
        $(tag_id).css('background-color', '#FF0000');
    }
}

function getLST(data) {
$("#lst").text(data.tcs_lst);
}

function getHB(data) {
$("#hb").text(data.tcs_hb);
}

function getECSPwrStatus(data) {
    setPWRcolor("#dome_pwr", data.dome_pwr);
    setPWRcolor("#ts_pwr", data.ts_pwr);
    setPWRcolor("#bs_pwr", data.bs_pwr);
    setPWRcolor("#evg_pwr", data.evg_pwr);
    setPWRcolor("#wvg_pwr", data.wvg_pwr);
}

function getDomeData(data) {
    $("#dome_state").text(data.dome_st);
    $("#dome_mess").text(data.dome_mess);
}

function getShuttersData(data) {
    $("#ts_state").text(data.ts_st);
    $("#ts_position").text(data.ts_pos);
    $("#bs_state").text(data.bs_st);
    $("#bs_position").text(data.bs_pos);
    if (data.ac_st) {
        $("#autoc_state").text("READY");
        $("#autoc_state").css('color', '#00FF00');
    } else {
        $("#autoc_state").text("NOT READY");
        $("#autoc_state").css('color', '#FF0000');
    }
}

function getEVGData(data) {
    $("#evg_state").text(data.evg_st);
    $("#evg_position").text(data.evg_pos);
}

function getWVGData(data) {
    $("#wvg_state").text(data.wvg_st);
    $("#wvg_position").text(data.wvg_pos);
}

// Function that receives the data updated from the EPICS channels.
// The channels have been organized in the logical sections of the website
function getEpicsVals(socket) {
    socket.on('ecs_update', function(data) {
        getECSPwrStatus(data);
        getDomeData(data);
        getShuttersData(data);
        getEVGData(data);
        getWVGData(data);
    });
    socket.on('test_update', function(data) {
        getLST(data);
        getHB(data);
    });
}
function sendEpicsCmd(socket) {
    // Function that sends data from a text input when a button is pressed
    $("#sendb").click(function() {
        var vala = $("#inp1").val();
        socket.emit('my_event', {data: vala, msg: "Yeah!"});
    });
    $("#az_assrt").focus(function() {
        //var vala = $('input[name="a1"]').val();
        $("#az_assrt").prop("selectedIndex", -1)
    }).change(function() {
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
    });
            }
$(document).ready(function() {
    var socket = io();
    socket.on('connect', function() {
        socket.emit('connect_event', {state: 'connected'});
    });
    getEpicsVals(socket);
    //setInterval("getEpicsValsFast()",1000);
    //setInterval("getEpicsValsSlow()",2000);
    sendEpicsCmd(socket);
});

