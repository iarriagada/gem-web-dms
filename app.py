#!/usr/bin/env python3

from flask import Flask, render_template, request, jsonify
import epics
import os
import time

os.environ["EPICS_CA_ADDR_LIST"] = "172.17.2.36 172.17.2.31"
chan_list = ["tcs:LST",
             "tcs:heartbeat",
             "ec:tsDriveStat",
             "ec:bsDriveStat",
             "ec:evgDriveStat",
             "ec:wvgDriveStat",
             "ec:domeDriveStat"]
# tcs_lst = epics.PV("tcs:LST")
# time.sleep(0.200)
# print(tcs_lst.value)
# tcs_hb = epics.PV("tcs:heartbeat")
# time.sleep(0.200)
# print(tcs_hb.value)
app = Flask(__name__)

# This is are all the endpoint definitions
@app.route("/")
def home():
    test[0] += 1 # Variable to keep track of home page refreshes
    hb_val = vals_epics['tcs:heartbeat']
    lst_val = vals_epics['tcs:LST']
    # lst_val = tcs_lst.value
    # hb_val = tcs_hb.value
    # value = 'hola'
    print(f"this is the lst: {lst_val}")
    print(f"this is the heartbeat: {hb_val}")
    return render_template("home.html",
                           value_lst=lst_val,
                           value_hb=hb_val,
                           test=test[0])

@app.route("/epics_slow")
def update_epics_slow():
    # Reference the global array of EPICS values
    vfd = vals_epics['tcs:heartbeat']
    print(f"this is the hb from dict: {vfd}")
    values = {
        'value_hb':vfd
    }
    return jsonify(values)

@app.route("/epics_fast")
def update_epics_fast():
    status_color = lambda x:'#FF0000' * (1 - x) + '#00FF00' * x
    vfd = vals_epics['tcs:LST']
    ts_st = status_color(vals_epics['ec:tsDriveStat'])
    bs_st = status_color(vals_epics['ec:bsDriveStat'])
    evg_st = status_color(vals_epics['ec:evgDriveStat'])
    wvg_st = status_color(vals_epics['ec:wvgDriveStat'])
    dome_st = status_color(vals_epics['ec:domeDriveStat'])
    print(f"this is the lst from dict: {vfd}")
    values = {
        'value_lst':vfd,
        'ts_st':ts_st,
        'bs_st':bs_st,
        'dome_st':dome_st,
        'evg_st':evg_st,
        'wvg_st':wvg_st,
    }
    return jsonify(values)

@app.route("/send_cmds", methods=["GET", "POST"])
def send_epics_cmds():
    if request.method == 'POST':
        # input_a = request.get_json().get('val_a')
        input_a = request.get_json()
        print(f"This was sent: {input_a}")
    return jsonify(i1=input_a)


# This are the rest of the methods to interact with epics plus other stuff

# Function to trigger channel monitors
def epics_chan_connect(chan_list):
    epics_chans = {chan:epics.PV(chan) for chan in chan_list}
    print(epics_chans.keys())
    time.sleep(0.5)
    for c in epics_chans:
        print(epics_chans[c].value)
    return epics_chans

def mon_epics_chans(epics_chans, vals_epics):
    for c in epics_chans:
        vals_epics[c] = epics_chans[c].value # Initialize all values
        epics_chans[c].add_callback(on_change, values=vals_epics)

def on_change(pvname=None, value=None, timestamp=None, **kw):
    kw['values'][pvname] = value

if __name__ == '__main__':
    vals_epics = {}
    test = [0]
    epics_channels = epics_chan_connect(chan_list)
    mon_epics_chans(epics_channels, vals_epics)
    app.run(host="0.0.0.0", port=8888)

