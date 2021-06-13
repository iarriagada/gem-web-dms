#!/usr/bin/env python3

from flask import Flask, render_template, request, jsonify
import epics
import os
import time

os.environ["EPICS_CA_ADDR_LIST"] = "172.17.2.36"
chan_list = ["tcs:LST", "tcs:heartbeat"]
# tcs_lst = epics.PV("tcs:LST")
# time.sleep(0.200)
# print(tcs_lst.value)
# tcs_hb = epics.PV("tcs:heartbeat")
# time.sleep(0.200)
# print(tcs_hb.value)
app = Flask(__name__)

@app.route("/")
def home():
    # global test
    test[0] += 1
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
    # lst_val = tcs_lst.value
    # hb_val = tcs_hb.value
    # print(f"this is the lst: {lst_val}")
    # print(f"this is the heartbeat: {hb_val}")
    vfd = vals_epics['tcs:heartbeat']
    print(f"this is the lst from dict: {vfd}")
    values = {
        'value_hb':vfd
    }
    return jsonify(values)

@app.route("/epics_fast")
def update_epics_fast():
    # lst_val = tcs_lst.value
    # print(f"this is the lst: {lst_val}")
    vfd = vals_epics['tcs:LST']
    print(f"this is the lst from dict: {vfd}")
    values = {
        'value_lst':vfd,
    }
    return jsonify(values)

def epics_chan_connect(chan_list):
    epics_chans = {chan:epics.PV(chan) for chan in chan_list}
    time.sleep(0.5)
    for c in epics_chans:
        print(epics_chans[c].value)
    return epics_chans

def mon_epics_chans(epics_chans, vals_epics):
    for c in epics_chans:
        epics_chans[c].add_callback(on_change, values=vals_epics)

def on_change(pvname=None, value=None, timestamp=None, **kw):
    kw['values'][pvname] = value

if __name__ == '__main__':
    vals_epics = {}
    test = [0]
    epics_channels = epics_chan_connect(chan_list)
    mon_epics_chans(epics_channels, vals_epics)
    app.run(host="0.0.0.0", port=8888)

