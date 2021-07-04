#!/usr/bin/env python3

from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
import epics
import os
import time
from threading import Lock

# Initialize the Flask app
app = Flask(__name__)
# Initialize the sockets for the app
socketio = SocketIO(app)

# The EPICS stuff section
os.environ["EPICS_CA_ADDR_LIST"] = "172.17.2.36 172.17.2.31"
# The index dictionary maps the PV record name to the variable used by the JS
# at the client and also the section name that will be updated
chan_dict = {"tcs:heartbeat":['tcs_hb', 'test_update'],
             "tcs:LST":['tcs_lst', 'test_update'],
             "ec:tsDriveStat":['ts_st', 'ecs_update'],
             "ec:bsDriveStat":['bs_st', 'ecs_update'],
             "ec:evgDriveStat":['evg_st', 'ecs_update'],
             "ec:wvgDriveStat":['wvg_st', 'ecs_update'],
             "ec:domeDriveStat":['dome_st', 'ecs_update']}

# TODO: This locks can be deleted, they are not being used.
# These locks can be
thread = None
thread_lock = Lock()

# These are all the endpoint/websocket definitions
@app.route("/")
def home():
    return render_template("home.html", data=vals_epics)

# TODO: Remove. This is not currently being used
@socketio.on('connect')
def send_epics_pvs():
    # # This was implemented in case the epics callbacks couldn't be handled
    # # directly
    # global thread
    # with thread_lock:
        # if thread is None:
            # thread = socketio.start_background_task(send_vals_thread)
    pass

# Handles a connection and refreshes all the values
@socketio.on('connect_event')
def init_all_values(data):
    print(f"Hello I'm {data['state']}!!!")
    for pv in chan_dict:
        socketio.emit(chan_dict[pv][1], vals_epics)

# Handler of a generic connection event
@socketio.on('my_event')
def handle_my_custom_event(json):
    print(f"Wea sent {json['data']}")
    print('received json: ' + str(json))

# TODO: Replace this with websockets
@app.route("/send_cmds", methods=["GET", "POST"])
def send_epics_cmds():
    if request.method == 'POST':
        # input_a = request.get_json().get('val_a')
        input_a = request.get_json()
        print(f"This was sent: {input_a}")
    return jsonify(i1=input_a)

# Function to trigger channel monitors
def epics_chan_connect(chan_dict):
    # Create the EPICS channels dictionary
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
        vals_epics[chan_dict[c][0]] = epics_chans[c].value # Initialize all values
        # Two dictionaries are passed, one with the Epics channels and the
        # other with the index between the epics channel name and the key to be
        # used by the socketio on the client side
        epics_chans[c].add_callback(on_change,
                                    ch_index=chan_dict,
                                    values=vals_epics)

def on_change(pvname=None, value=None, timestamp=None, **kw):
    # Store the PV value in the values dict
    kw['values'][kw['ch_index'][pvname][0]] = value
    # Determine the socket that will be udpated from the index dict
    socketio.emit(kw['ch_index'][pvname][1], kw['values'])

# TODO: This is not being used. Needs to be removed
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
