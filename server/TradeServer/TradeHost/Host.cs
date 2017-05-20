using System;
using System.Collections.Generic;
using System.Reactive.Linq;
using TradeHost.Rpc;
using WampSharp.V2;
using WampSharp.V2.Core.Contracts;
using WampSharp.V2.Realm;

namespace TradeHost
{
    public class Host
    {
        public void StartUp()
        {
            const string location = "ws://127.0.0.1:8080/";

            using (IWampHost host = new DefaultWampHost(location))
            {
                IWampHostedRealm realm = host.RealmContainer.GetRealmByName(HostContants.TradeRealm);
                host.Open();

                var subject = realm.Services.GetSubject(HostContants.TradeTopic);

                // Add some RPC Supports 

                var priceIndexService = new PriceIndexService();

                realm.Services.RegisterCallee(priceIndexService);
                
                IObservable<long> timer = Observable.Timer(TimeSpan.FromMilliseconds(0),
                    TimeSpan.FromMilliseconds(5000));

                Random random = new Random();
                Random tickerRandom = new Random();

                var tickerList = new List<string>()
                {
                    "GOOGLE", "MSFT", "IBM", "APPLE"
                };

                var disposable = timer.Subscribe(b =>
                {
                    var tickerCode = tickerList[tickerRandom.Next(0, tickerList.Count)];
                    Console.WriteLine(tickerCode);

                    try
                    {
                        WampEvent @event = new WampEvent()
                        {
                            Options = new PublishOptions { DiscloseMe = true },
                            Arguments = new object[] { random.Next(0, 100), 23 },
                            ArgumentsKeywords = new Dictionary<string, object>
                {
                    {"type", "TRADEINFO"},
                    {"ticker", tickerCode},
                    {"date", DateTime.Now.ToString() },
                    {"buyValue", random.Next(0, 100)},
                    {"sellValue", random.Next(0, 100) }
                }
                        };

                        subject.OnNext(@event);
                    }
                    catch (Exception ex)
                    {

                        throw;
                    }
                });

                realm.SessionCreated += Realm_SessionCreated; ;
                Console.WriteLine("Server is running on " + location);
                Console.ReadLine();
            }
        }

        private void Realm_SessionCreated(object sender, WampSessionCreatedEventArgs e)
        {
            Console.WriteLine("connnected" + e.SessionId);
        }
    }
}
