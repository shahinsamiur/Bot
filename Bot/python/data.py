from tvDatafeed import TvDatafeed, Interval
import ast
import numpy as np
import json
import sys


def greet():

#     username = 'shahinsamiur'
#     password = 'SrS.shahin2020'
# username, password
    tv = TvDatafeed()
    data = tv.get_hist(symbol="EURUSD", exchange='OANDA', interval=Interval.in_15_minute, n_bars=72)
    data1H = tv.get_hist(symbol="EURUSD", exchange='OANDA', interval=Interval.in_1_hour, n_bars=72)
#     print(data)
    close = data.iloc[:, 4].values.tolist()
    high = data.iloc[:, 2].values.tolist()
    low = data.iloc[:, 3].values.tolist()
    close1H = data1H.iloc[:, 4].values.tolist()
    high1H = data1H.iloc[:, 2].values.tolist()
    low1H = data1H.iloc[:, 3].values.tolist()


    
    result = {
        "close": close,
        "high": high,
        "low": low,
        "close1H": close1H,
        "high1H": high1H,
        "low1H": low1H
    }
    
    json_string = json.dumps(result)
    print(json_string)


greet()
