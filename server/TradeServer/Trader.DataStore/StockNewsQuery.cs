using GraphQL.Types;
using Trader.DataStore.GraphQueryTypes;
using Trader.DataStore.Models;

namespace Trader.DataStore
{
    public class StockNewsQuery : ObjectGraphType<object>
    {
        private const string StockNews = "News";

        private const string CorporateNewsType = "corporatenews";

        private const string IndividualCorporateNewsType = "individualcorporatenews";

        private const string ExchangeNewsType = "exchangenews";

        public StockNewsQuery()
        {
            Name = StockNews;

            Field<CorporateNewsType>(IndividualCorporateNewsType,
               arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id", Description = "id of the human" }
                ), resolve: context => new CorporateNewsType());

            Field<CorporateNewsType>(CorporateNewsType, resolve: context => new CorporateNews()
            {
                Country = "Demo",
                Id = "test",
                NewsData = "newsddata",
                SecuityCode = "1010010"
            });

            Field<CorporateNewsType>(ExchangeNewsType,
               arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id", Description = "id of the human" }
                ), resolve: context => new CorporateNewsType());
        }
    }
}
