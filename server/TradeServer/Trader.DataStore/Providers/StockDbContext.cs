using System.Data.Entity;
using Trader.DataStore.Models;

namespace Trader.DataStore.Providers
{
    class StockDbContext : DbContext, IStockDataSource
    {
        public DbSet<CorporateNews> CorporateNews { get; set; }

        public StockDbContext():base()
        {

        }
    }

    public interface IStockDataSource
    {
        DbSet<CorporateNews> CorporateNews { get; set; }
    }
}
