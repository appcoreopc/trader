using System;
using System.Threading.Tasks;
using TradeHost;
using Trader.DataStore;

namespace TradeServer
{
    class Program
    {
        static void Main(string[] args)
        {

            RunAsync();
            
            var host = new Host();
            host.StartUp();
            System.Console.ReadLine();
        }

        private static async Task RunAsync()
        {   
            var query = new GraphQLQuery { Query = "query { corporatenews { newsData } }", Variables = "" };
            var handler = new GraphQLQueryHandler();
            var result =  handler.ExecuteQuery(query);
        }
    }
}
