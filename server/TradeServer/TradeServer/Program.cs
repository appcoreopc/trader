using TradeHost;

namespace TradeServer
{
    class Program
    {
        static void Main(string[] args)
        {
            var host = new Host();
            host.StartUp();
            System.Console.ReadLine();
        }
    }
}
