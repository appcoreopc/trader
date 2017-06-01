using GraphQL;
using GraphQL.Types;
using System.Threading.Tasks;

namespace Trader.DataStore
{
    class QueryHandler
    {
        public async Task ExecuteQuery(GraphQLQuery query)
        {
            var result = await new DocumentExecuter().ExecuteAsync(x =>
            {
               //schema 
               x.Query = query.Query;
            }).ConfigureAwait(false);
        }
    }

    public class CompanyStockData : ObjectGraphType
    {
        public CompanyStockData()
        {
            Field<NewsType>("new", resolve: context => new News()); // Get news streams
            Field<NewsType>("news", resolve: context => new News()); // Get news streams
        }
    }

    public class NewsType : ObjectGraphType<News>
    {
        public NewsType()
        {
            Field(x => x.Id).Description("Unique id for the news");
            Field(x => x.SecurityCode).Description("Security code");
            Field(x => x.Description).Description("News info");
        }
    }
}
