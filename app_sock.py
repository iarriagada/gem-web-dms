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
             "tcs:LST":'tcs_lst',
             "ec:tsDriveStat":'ts_st',
             "ec:bsDriveStat":'bs_st',
             "ec:evgDriveStat":'evg_st',
             "ec:wvgDriveStat":'wvg_st',
             "ec:domeDriveStat":'dome_st'}
thread = None
thread_lock = Lock()

# These are all the endpoint/websocket definitions
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
    # return render_template("home_sock.html", vals_epics)
    return render_template("home.html", data=vals_epics)

# This is not currently being used
@socketio.on('connect')
def send_epics_pvs():
    # # This was implemented in case the epics callbacks couldn't be handled
    # # directly
    # global thread
    # with thread_lock:
        # if thread is None:
            # thread = socketio.start_background_task(send_vals_thread)
    pass

@socketio.on('my_event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))

@app.route("/send_cmds", methods=["GET", "POST"])
def send_epics_cmds():
    if request.method == 'POST':
        # input_a = request.get_json().get('val_a')
        input_a = request.get_json()
        print(f"This was sent: {input_a}")
    return jsonify(i1=input_a)

# Function to trigger channel monitors
def epics_chan_connect(chan_dict):
    epics_chans = {chan:epics.PV(chan) for chan in chan_dict}
    print(epics_chans.keys())
    time.sleep(0.5) # Give it some time for the channels to connect
    for c in epics_chans:
        # caget one round for the values of all channels.
        # TODO: Automatic retries
        print(epics_chans[c].value)
    return epics_chans

def mon_epics_chans(epics_chans, vals_epics, chan_dict):
    for c in epics_chans:
        vals_epics[chan_dict[c]] = epics_chans[c].value # Initialize all values
        # Two dictionaries are passed, one with the Epics channels and the
        # other with the index between the epics channel name and the key to be
        # used by the socketio on the client side
        epics_chans[c].add_callback(on_change,
                                    ch_index=chan_dict,
                                    values=vals_epics)

def on_change(pvname=None, value=None, timestamp=None, **kw):
    kw['values'][kw['ch_index'][pvname]] = value
    socketio.emit('val_update', kw['values'])

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
