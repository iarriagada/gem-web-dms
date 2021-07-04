function getLST(data) {
$("#lst").text(data.tcs_lst);
}

function getHB(data) {
$("#hb").text(data.tcs_hb);
}

function setPWRcolor(tag_id, val) {
    // Set color for ON (green) and OFF (red)
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

// Function that receives the data updated from the EPICS channels.
// The channels have been organized in the logical sections of the website
function getEpicsVals(socket) {
    socket.on('ecs_update', function(data) {
        getECSPwrStatus(data);
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

