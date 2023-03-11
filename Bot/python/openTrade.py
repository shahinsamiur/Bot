
import fxcmpy
import datetime as dt 
import json
import sys

pair = sys.argv[1]
SL = float(sys.argv[2])
lotSize = float(sys.argv[3]) 
TP = float(sys.argv[4])
signal=sys.argv[5]
token=sys.argv[6]
print((pair,SL,lotSize,TP,signal,token))
con=fxcmpy.fxcmpy(access_token=token,log_level="error",log_file=None)
def on_tick(data,df):
    TradeAmount=lotSize*100
    order=con.open_trade(symbol=pair, is_buy=True, amount=TradeAmount, time_in_force='GTC', order_type='AtMarket', rate=0, is_in_pips=False, limit=TP, at_market=0, stop=SL, trailing_step=None, account_id=None)
    print(order)

# symbol = 'EUR/USD'
# amount = 1
# stop_loss = 20 #1.05253 # set the stop loss price level
# take_profit = 40 #1.08000
on_tick()