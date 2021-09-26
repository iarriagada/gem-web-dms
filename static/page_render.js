function setPWRcolor(stban_id, icon_id, val) {
    // Set color for ON (green) and OFF (red)
    if (val) {
        $(stban_id).css('background', '#00ff00');
        $(icon_id).css('background-image', 'url("/static/POWER-ON.svg")');
    } else {
        $(stban_id).css('background', '#FF0000');
        $(icon_id).css('background-image', 'url("/static/POWER-OFF.svg")');
    }
}

function setHealthState(tag_id, stban_id, icon_id, val) {
    $(tag_id).text(val);
    switch(val) {
        case "BAD":
            $(stban_id).css('background', '#8f0000');
            $(stban_id).css('color', '#ffbbbb');
            $(icon_id).css('background-image', 'url("/static/HBAD.svg")');
            break;
        case "GOOD":
            $(stban_id).css('background', '#008f00');
            $(stban_id).css('color', '#88ff88');
            $(icon_id).css('background-image', 'url("/static/HGOOD.svg")');
            break;
        default:
            break;
    }
}

function setArmState(tag_id, stban_id, icon_id, val) {
    switch(val) {
        case 0:
            $(tag_id).text('DISARMED');
            $(stban_id).css('background', '#ff5555');
            $(stban_id).css('color', '#ffff75');
            $(icon_id).css('background-image', 'url("/static/DISARMED.svg")');
            break;
        case 1:
            $(tag_id).text('ARMED');
            $(stban_id).css('background', '#11df11');
            $(stban_id).css('color', '#0a0afa');
            $(icon_id).css('background-image', 'url("/static/ARMED.svg")');
            break;
        default:
            $(tag_id).text('Me no entender');
    }
}

function setDrvState(tag_id, stban_id, icon_id, val) {
    switch(val) {
        case 0:
            $(tag_id).text('Fault (HIGH)');
            break;
        case 1:
            $(tag_id).text('DISASSERTED');
            $(stban_id).css('background', '#0000cc');
            //$(stban_id).css('border-color', '#ff7575');
            $(stban_id).css('color', '#ff7575');
            $(icon_id).css('background-image', 'url("/static/DISASSERTED.svg")');
            break;
        case 2:
            $(tag_id).text('ASSERTED');
            $(stban_id).css('background', '#008800');
            //$(stban_id).css('border-color', '#ffff00');
            $(stban_id).css('color', '#ffff00');
            $(icon_id).css('background-image', 'url("/static/ASSERTED.svg")');
            break;
        case 3:
            $(tag_id).text('Fault (LOW)');
            break;
        default:
            $(tag_id).text('Me no entender');
    }
}

function setMotionState(axis, val) {
    var txt_id = axis + "motnst_txt";
    var stban_id = axis + "motn_state";
    var arrw1_id = axis + "motn_a1";
    var arrw2_id = axis + "motn_a2";
    var tgt_id = axis + "motnst_tgt";
    var brk1_id = axis + "motn_b1";
    var brk2_id = axis + "motn_b2";
    var icon_id = axis + "motnst_tgt";
    var icotrack_id = axis + "tracking_ico";
    var icostop_id = axis + "stopped_ico";
    var icobrake_id = axis + "brakes_ico";
    var icoimg_id = axis + "motnst_stop";

    switch(val) {
        case "TRACKING":
            $(icotrack_id).css('display', 'flex');
            $(icobrake_id).css('display', 'none');
            $(icostop_id).css('display', 'none');
            $(txt_id).text(val);
            $(stban_id).css('background', '#e5ffc2');
            $(stban_id).css('color', '#008f00');
            $(arrw1_id).addClass('bounceAlpha');
            $(arrw2_id).addClass('bounceAlpha');
            $(tgt_id).removeClass('pulseTarget');
            break;
        case "SLEWING":
            $(icotrack_id).css('display', 'flex');
            $(icobrake_id).css('display', 'none');
            $(icostop_id).css('display', 'none');
            $(txt_id).text(val);
            $(stban_id).css('background', '#ccfffb');
            $(stban_id).css('color', '#008f00');
            $(arrw1_id).removeClass('bounceAlpha');
            $(arrw2_id).removeClass('bounceAlpha');
            $(tgt_id).addClass('pulseTarget');
            break;
        case "STATIONARY":
            $(icoimg_id).css('background-image', 'url("/static/STATIONARY.svg")');
            $(icotrack_id).css('display', 'none');
            $(icobrake_id).css('display', 'none');
            $(icostop_id).css('display', 'flex');
            $(txt_id).text(val);
            $(stban_id).css('background', '#c7f0ff');
            $(stban_id).css('color', '#eb0000');
            break;
        case "BRAKED":
            $(icotrack_id).css('display', 'none');
            $(icobrake_id).css('display', 'flex');
            $(icostop_id).css('display', 'none');
            $(brk1_id).removeClass('applyBrakes');
            $(brk2_id).removeClass('applyBrakes');
            $(brk1_id).removeClass('releaseBrakes');
            $(brk2_id).removeClass('releaseBrakes');
            $(txt_id).text(val);
            $(stban_id).css('background', '#ffe7e7');
            $(stban_id).css('color', '#d60000');
            break;
        case "APPLY BRAKES":
            $(icotrack_id).css('display', 'none');
            $(icobrake_id).css('display', 'flex');
            $(icostop_id).css('display', 'none');
            $(brk1_id).removeClass('applyBrakes');
            $(brk2_id).removeClass('applyBrakes');
            $(txt_id).text(val);
            $(brk1_id).addClass('applyBrakes');
            $(brk2_id).addClass('applyBrakes');
            $(brk1_id).removeClass('releaseBrakes');
            $(brk2_id).removeClass('releaseBrakes');
            break;
        case "RELEASE BRAKES":
            $(icotrack_id).css('display', 'none');
            $(icobrake_id).css('display', 'flex');
            $(icostop_id).css('display', 'none');
            $(txt_id).text(val);
            $(brk1_id).addClass('releaseBrakes');
            $(brk2_id).addClass('releaseBrakes');
            $(brk1_id).removeClass('applyBrakes');
            $(brk2_id).removeClass('applyBrakes');
            break;
        case "INTERLOCK":
            $(icoimg_id).css('background-image', 'url("/static/INTERLOCK.svg")');
            $(icotrack_id).css('display', 'none');
            $(icobrake_id).css('display', 'none');
            $(icostop_id).css('display', 'flex');
            $(txt_id).text(val);
            $(stban_id).css('background', '#ffff00');
            $(stban_id).css('color', '#000000');
            break;
        default:
            $(txt_id).text(val);
    }
}

function setECSMotionState(axis, val) {
    var txt_id = axis + "mtnst_txt";
    var stban_id = axis + "mtn_state";
    var arrw1_id = axis + "mtn_a1";
    var arrw2_id = axis + "mtn_a2";
    var tgt_id = axis + "mtnst_tgt";
    var brk1_id = axis + "mtn_b1";
    var brk2_id = axis + "mtn_b2";
    var icon_id = axis + "mtnst_tgt";
    var icotrack_id = axis + "moving_ico";
    var icostop_id = axis + "stopped_ico";
    var icobrake_id = axis + "parking_ico";
    var icoimg_id = axis + "mtnst_stop";

    switch(val) {
        case "STOPPED":
            $(icotrack_id).css('display', 'flex');
            $(icobrake_id).css('display', 'none');
            $(icostop_id).css('display', 'none');
            $(txt_id).text(val);
            $(stban_id).css('background', '#e5ffc2');
            $(stban_id).css('color', '#008f00');
            $(arrw1_id).addClass('bounceAlpha');
            $(arrw2_id).addClass('bounceAlpha');
            $(tgt_id).removeClass('pulseTarget');
            break;
        case "STOPPING":
            $(icotrack_id).css('display', 'flex');
            $(icobrake_id).css('display', 'none');
            $(icostop_id).css('display', 'none');
            $(txt_id).text(val);
            $(stban_id).css('background', '#ccfffb');
            $(stban_id).css('color', '#008f00');
            $(arrw1_id).removeClass('bounceAlpha');
            $(arrw2_id).removeClass('bounceAlpha');
            $(tgt_id).addClass('pulseTarget');
            break;
        case "MOVING":
            $(icoimg_id).css('background-image', 'url("/static/STATIONARY.svg")');
            $(icotrack_id).css('display', 'none');
            $(icobrake_id).css('display', 'none');
            $(icostop_id).css('display', 'flex');
            $(txt_id).text(val);
            $(stban_id).css('background', '#c7f0ff');
            $(stban_id).css('color', '#eb0000');
            break;
        case "PARKING":
            $(icotrack_id).css('display', 'none');
            $(icobrake_id).css('display', 'flex');
            $(icostop_id).css('display', 'none');
            $(brk1_id).removeClass('applyBrakes');
            $(brk2_id).removeClass('applyBrakes');
            $(brk1_id).removeClass('releaseBrakes');
            $(brk2_id).removeClass('releaseBrakes');
            $(txt_id).text(val);
            $(stban_id).css('background', '#ffe7e7');
            $(stban_id).css('color', '#d60000');
            break;
        case "OFFLINE":
            $(icotrack_id).css('display', 'none');
            $(icobrake_id).css('display', 'flex');
            $(icostop_id).css('display', 'none');
            $(brk1_id).removeClass('applyBrakes');
            $(brk2_id).removeClass('applyBrakes');
            $(txt_id).text(val);
            $(brk1_id).addClass('applyBrakes');
            $(brk2_id).addClass('applyBrakes');
            $(brk1_id).removeClass('releaseBrakes');
            $(brk2_id).removeClass('releaseBrakes');
            break;
        case "ERROR":
            $(icotrack_id).css('display', 'none');
            $(icobrake_id).css('display', 'flex');
            $(icostop_id).css('display', 'none');
            $(txt_id).text(val);
            $(brk1_id).addClass('releaseBrakes');
            $(brk2_id).addClass('releaseBrakes');
            $(brk1_id).removeClass('applyBrakes');
            $(brk2_id).removeClass('applyBrakes');
            break;
        default:
            $(txt_id).text(val);
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
    //setPWRcolor("#dome_pwr", data.dome_pwr);
    setPWRcolor("#dmpwr_state", "#dmpwr_tgt", data.dome_pwr);
    setPWRcolor("#tspwr_state", "#tspwr_tgt", data.ts_pwr);
    setPWRcolor("#bspwr_state", "#bspwr_tgt", data.bs_pwr);
    setPWRcolor("#evpwr_state", "#evpwr_tgt", data.evg_pwr);
    setPWRcolor("#wvpwr_state", "#wvpwr_tgt", data.wvg_pwr);
    setHealthState("#ecshealth_txt", "#ecshealth_state", "#ecshealth_tgt", data.ecs_hlth);
    //setPWRcolor("#ts_pwr", data.ts_pwr);
    //setPWRcolor("#bs_pwr", data.bs_pwr);
    //setPWRcolor("#evg_pwr", data.evg_pwr);
    //setPWRcolor("#wvg_pwr", data.wvg_pwr);
}

function getDomeData(data) {
    $("#dome_state").text(data.dome_st);
    $("#dome_mess").text(data.dome_mess);
}

function getShuttersData(data) {
    $("#ts_state").text(data.ts_st);
    $("#ts_position").text(data.ts_pos);
    setECSMotionState("#ts", data.ts_st);
    $("#bs_state").text(data.bs_st);
    $("#bs_position").text(data.bs_pos);
    setECSMotionState("#bs", data.bs_st);
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
    setECSMotionState("#ev", data.evg_st);
}

function getWVGData(data) {
    $("#wvg_state").text(data.wvg_st);
    $("#wvg_position").text(data.wvg_pos);
    setECSMotionState("#wv", data.wvg_st);
}

function getEnvironData(data) {
    setPWRcolor("#elights_state", data.elights_st);
    setPWRcolor("#vlights_state", data.vlights_st);
}

function getMCSData(data) {
    setDrvState("#azdrvst_txt", "#azdrv_state", "#azdrvst_tgt", data.azdrv_st);
    setDrvState("#eldrvst_txt", "#eldrv_state", "#eldrvst_tgt", data.eldrv_st);
    setMotionState("#az", data.az_st);
    setMotionState("#el", data.el_st);
}

function getCRCSData(data) {
    setDrvState("#crdrvst_txt", "#crdrv_state", "#crdrvst_tgt", data.crdrv_st);
    setArmState("#crarmst_txt", "#crarm_state", "#crarmst_tgt", data.crarm_st);
    setMotionState("#cr", data.cr_st);
    //setPWRcolor("#crarm_state", data.crarm_st);
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

