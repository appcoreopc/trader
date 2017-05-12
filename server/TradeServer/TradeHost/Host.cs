using System;
using System.Collections.Generic;
using System.Reactive.Linq;
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

                IObservable<long> timer = Observable.Timer(TimeSpan.FromMilliseconds(0),
                    TimeSpan.FromMilliseconds(5000));

                Random random = new Random();

                var disposable = timer.Subscribe(b =>
                {
                    try
                    {
                        WampEvent @event = new WampEvent()
                        {
                            Options = new PublishOptions { DiscloseMe = true },
                            Arguments = new object[] { random.Next(0, 100), 23 },
                            ArgumentsKeywords = new Dictionary<string, object>
                {
                    {"type", "TRADEINFO"},
                    {"ticker", "GOOGLE"},
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
