from tvDatafeed import TvDatafeed, Interval
import ast
import numpy as np
import json
import sys
arg1 = sys.argv[1]

def greet():

    username = 'shahinsamiur'
    password = 'SrS.shahin2020'
    # username, password

    #here we are getting data form treading view  
    tv = TvDatafeed()
    data = tv.get_hist(symbol=arg1, exchange='OANDA', interval=Interval.in_15_minute, n_bars=72)
    data1H = tv.get_hist(symbol=arg1, exchange='OANDA', interval=Interval.in_1_hour, n_bars=72)
#1_hour
# here TvDatafeed gives that in pandas formet so we are here convert it into list or json forment
    close = data.iloc[:, 4].values.tolist()
    high = data.iloc[:, 2].values.tolist()
    low = data.iloc[:, 3].values.tolist()
    close1H = data1H.iloc[:, 4].values.tolist()
    high1H = data1H.iloc[:, 2].values.tolist()
    low1H = data1H.iloc[:, 3].values.tolist()

    # here we remove the current candle data because it gives us false signal 
    close = close[:-1]
    high = high[:-1]
    low = low[:-1]
    close1H = close1H[:-1]
    high1H = high1H[:-1]
    low1H = low1H[:-1]

    # here we are formeting data for return the canlde data 
    result = {
        "close": close,
        "high": high,
        "low": low,
        "close1H": close1H,
        "high1H": high1H,
        "low1H": low1H
    }
    
    #converting here listformet to json formet and return the result 
    json_string = json.dumps(result)
    print(json_string)


greet()
