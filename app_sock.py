#!/usr/bin/env python3

from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
import epics
import os
import time
from threading import Lock

app = Flask(__name__)
socketio = SocketIO(app)
os.environ["EPICS_CA_ADDR_LIST"] = "172.17.2.36 172.17.2.31"
# chan_list = ["tcs:LST",
chan_dict = {"tcs:heartbeat":'tcs_hb',
             "tcs:LST":'tcs_lst'}
thread = None
thread_lock = Lock()

# This is are all the endpoint definitions
@app.route("/")
def home():
    # test[0] += 1 # Variable to keep track of home page refreshes
    # hb_val = vals_epics['tcs:heartbeat']
    # lst_val = vals_epics['tcs:LST']
    # lst_val = tcs_lst.value
    # hb_val = tcs_hb.value
    # value = 'hola'
    # print(f"this is the lst: {lst_val}")
    # print(f"this is the heartbeat: {hb_val}")
    # return render_template("home.html",
                           # value_lst=lst_val,
                           # value_hb=hb_val,
                           # test=test[0])
    return render_template("home_sock.html")

@socketio.on('connect')
def send_epics_pvs():
    pass
    # global thread
    # with thread_lock:
        # if thread is None:
            # thread = socketio.start_background_task(send_vals_thread)

@socketio.on('my_event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))

# Function to trigger channel monitors
def epics_chan_connect(chan_dict):
    epics_chans = {chan:epics.PV(chan) for chan in chan_dict}
    print(epics_chans.keys())
    time.sleep(0.5)
    for c in epics_chans:
        print(epics_chans[c].value)
    return epics_chans

def mon_epics_chans(epics_chans, vals_epics, chan_dict):
    for c in epics_chans:
        vals_epics[chan_dict[c]] = epics_chans[c].value # Initialize all values
        epics_chans[c].add_callback(on_change, ch_index=chan_dict, values=vals_epics)

def on_change(pvname=None, value=None, timestamp=None, **kw):
    # global test
    # if test[0]:
    kw['values'][kw['ch_index'][pvname]] = value
        # test[0] = 0
    socketio.emit('my_response', kw['values'])

def send_vals_thread():
    global test
    global vals_epics
    while(True):
        if not(test[0]):
            socketio.sleep(0.05)
            socketio.emit('my_response', {'hb':vals_epics['tcs:heartbeat']})
            test[0] = 1

if __name__ == '__main__':
    print('Starting websocket')
    vals_epics = {}
    test = [0]
    epics_channels = epics_chan_connect(chan_dict)
    mon_epics_chans(epics_channels, vals_epics, chan_dict)
    socketio.run(app, host='0.0.0.0', port=8888)
