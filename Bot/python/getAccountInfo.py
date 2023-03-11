import fxcmpy
import datetime as dt 
import sys
import json
# arg1 = sys.argv[1]
token= '5c5a8be080b8026fb140647de6beaf4682e46337'


def on_tick():
    con=fxcmpy.fxcmpy(access_token=token,log_level="error",log_file=None)
    datas=con.get_accounts(kind="list")
    json_data = json.dumps(datas)
    print(json_data)



on_tick()
