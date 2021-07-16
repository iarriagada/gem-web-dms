function setPWRcolor(tag_id, val) {
    // Set color for ON (green) and OFF (red)
    if (val) {
        $(tag_id).css('background-color', '#00FF00');
    } else {
        $(tag_id).css('background-color', '#FF0000');
    }
}

function setAssState(tag_id, val) {
    switch(val) {
        case 0:
            $(tag_id).text('Fault (HIGH)');
            break;
        case 1:
            $(tag_id).text('DISASSERTED');
            break;
        case 2:
            $(tag_id).text('ASSERTED');
            break;
        case 3:
            $(tag_id).text('Fault (LOW)');
            break;
        default:
            $(tag_id).text('Me no entender');
    }
}

function setSeqMess(tag_id, val) {
    switch(val) {
        case 0:
            $(tag_id).text('320-Init Step');
            break;
        case 1:
            $(tag_id).text('321-Vibr. Stop');
            break;
        case 2:
            $(tag_id).text('322-Auto Restart');
            break;
        case 3:
            $(tag_id).text('323-VFD Tripped');
            break;
        default:
            $(tag_id).text('Me no entender');
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

function getEnvironData(data) {
    setPWRcolor("#elights_state", data.elights_st);
    setPWRcolor("#vlights_state", data.vlights_st);
}

function getMCSData(data) {
    setAssState("#azdrv_state", data.azdrv_st);
    setAssState("#eldrv_state", data.eldrv_st);
    $("#az_state").text(data.az_st);
    $("#el_state").text(data.el_st);
}

function getCRCSData(data) {
    setAssState("#crdrv_state", data.crdrv_st);
    $("#cr_state").text(data.cr_st);
    setPWRcolor("#crarm_state", data.crarm_st);
}

function getGISData(data) {
    if (data.cover_st == 1) {
        $("#cvr_status").text("OPEN");
    } else {
        $("#cvr_status").text("CLOSED");
    }
    setPWRcolor("#pxv_state", 1 - data.pxvib_st); 
    setPWRcolor("#nxv_state", 1 - data.nxvib_st); 
    setSeqMess("#m1recseq_mess", data.coverseq_st);
    if (data.cover_st == 1) {
        $("#icvr_status").text("OPEN");
    } else {
        $("#icvr_status").text("CLOSED");
    }
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
    socket.on('env_update', function(data) {
        getEnvironData(data);
    });
    socket.on('mcs_update', function(data) {
        getMCSData(data);
    });
    socket.on('crcs_update', function(data) {
        getCRCSData(data);
    });
    socket.on('gis_update', function(data) {
        getGISData(data);
    });
}
function sendEpicsCmd(socket) {
    // Function that sends data from a text input when a button is pressed
    $("#sendb").click(function() {
        var vala = $("#inp1").val();
        socket.emit('my_event', {data: vala, msg: "Yeah!"});
        //$("#x3").css('width', '0px');
        $("#x3").css('background-image', 'url("/static/ON-B.svg")');
        $("#x1").toggleClass("bounceAlpha");
        $("#x2").toggleClass("bounceAlpha");
    });
    //$("#az_assrt").focus(function() {
        ////var vala = $('input[name="a1"]').val();
        //$("#az_assrt").prop("selectedIndex", -1)
    //}).change(function() {
        //var valb = $("#az_assrt").val();
        ////var vala = 666;
        //$.ajax({
            //type: "POST",
            //url: '/send_cmds',
            //contentType: 'application/json',
            //data:  JSON.stringify({
                //val_b: valb
            //})
        //});
    //});
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

