import MetaTrader5 as mt5
import sys
import math
import decimal



signal=sys.argv[1]
SLs=sys.argv[2]
currentPrices=sys.argv[3]
pair=sys.argv[4]
def greet():
    SL=float(SLs)
    currentPrice=float(currentPrices)
    
    mt5.initialize()
    mt5.login(account=61155767, password="SrS.shahin2020")
    AccountInfo = mt5.account_info()
    Account_balance = AccountInfo.balance
    riskAmount = Account_balance / 50
    request = {}
    pips = 0
    riskPrice = Account_balance / 50
    trade_type = ""
    TP=0
    if signal == "up":

        riskPrice = (currentPrice - SL)
        pips = round(math.fabs((SL - currentPrice) / 0.0001), 2)
        TP = currentPrice + (riskPrice * 4)
     
    else:
        riskPrice = SL - currentPrice
        TP = currentPrice - (riskPrice * 4)
        pips = round(math.fabs((SL - currentPrice) / 0.0001), 2)
   
    lotSize = (riskAmount / (pips * 10))
    number = decimal.Decimal(lotSize)
    rounded_number = number.quantize(decimal.Decimal('0.00'), rounding=decimal.ROUND_DOWN)


    if(rounded_number<0.01):
        rounded_number=0.01



    if signal == "up":
        trade_type = mt5.ORDER_TYPE_BUY  # Can be ORDER_TYPE_BUY or ORDER_TYPE_SELL
    else:
        trade_type = mt5.ORDER_TYPE_SELL  # Can be ORDER_TYPE_BUY or ORDER_TYPE_SELL


    final_lot=float(rounded_number)
    print(type(SL),SL)
    request = {
        "action": mt5.TRADE_ACTION_DEAL,
        "symbol": pair,
        "volume": final_lot,
        "type": trade_type,
        "price": mt5.symbol_info_tick(pair).ask,
        "slippage": 3,
        "magic": 0,  # Optional parameter to identify the trade
        "comment": "Opening trade",  # Optional comment for the trade
        "sl":SL,
        "tp":TP,
        "type_filling": mt5.ORDER_FILLING_IOC,  # Can be ORDER_TIME_GTC or ORDER_TIME_IOC
    }
    print(request)
    # Print the request parameters for debugging

    # Send the trade request
    result = mt5.order_send(request)

    # Check the result
    if result is None:
        print("Failed to open trade. No result returned.")
    elif result.retcode != mt5.TRADE_RETCODE_DONE:
        print(f"Failed to open trade. Retcode: {result.retcode}, Comment: {result.comment}")
    else:
        print("Trade opened successfully!")

# Connect to the MetaTrader 5 terminal
greet()

