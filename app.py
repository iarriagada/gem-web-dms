#!/usr/bin/env python3

from flask import Flask, render_template, request, jsonify
import epics
import os
import time


os.environ["EPICS_CA_ADDR_LIST"] = "172.17.2.36"
tcs_lst = epics.PV("tcs:LST")
time.sleep(0.200)
print(tcs_lst.value)
tcs_hb = epics.PV("tcs:heartbeat")
time.sleep(0.200)
print(tcs_hb.value)
app = Flask(__name__)
test = 0

@app.route("/")
def home():
    global test
    test += 1
    lst_val = tcs_lst.value
    hb_val = tcs_hb.value
    # value = 'hola'
    print(f"this is the lst: {lst_val}")
    print(f"this is the heartbeat: {hb_val}")
    return render_template("home.html",
                           value_lst=lst_val,
                           value_hb=hb_val,
                           test=test)

@app.route("/epics")
def update_epics():
    lst_val = tcs_lst.value
    hb_val = tcs_hb.value
    print(f"this is the lst: {lst_val}")
    print(f"this is the heartbeat: {hb_val}")
    values = {
        'value_lst':lst_val,
        'value_hb':hb_val
    }
    return jsonify(values)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8888)

