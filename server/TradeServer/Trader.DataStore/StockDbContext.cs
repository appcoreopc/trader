using System.Data.Entity;
using Trader.DataStore.Models;

namespace Trader.DataStore
{
    class StockDbContext : DbContext
    {
        public CorporateNews CorporateNews { get; set; }

        public StockDbContext()
        {
        }
    }
}
