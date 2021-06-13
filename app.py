#!/usr/bin/env python3

from flask import Flask, render_template
import epics
import os
import time


os.environ["EPICS_CA_ADDR_LIST"] = "172.17.2.36"
app = Flask(__name__)
tcs_lst = epics.PV("tcs:LST")
time.sleep(0.200)
test = 0

@app.route("/")
def home():
    global test
    test += 1
    value2 = tcs_lst.value
    # value = 'hola'
    print(f"this is the value: {value2}")
    return render_template("home.html", value=value2, test=test)
    # return render_template("home.html", value=update_lst(), test=test)

@app.route("/lst")
def update_lst():
    value = tcs_lst.value
    # value = 'hola'
    print(f"this is the value: {value}")
    return value

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8888)
    # pass

