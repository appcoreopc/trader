using WampSharp.V2.Rpc;

namespace TradeHost.Rpc
{   
    interface IPriceIndex
    {
        [WampProcedure("com.trader.getIndexPrice")]
        string GetIndexPrice();
    }
}
