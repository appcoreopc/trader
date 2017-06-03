using GraphQL;
using GraphQL.Instrumentation;
using GraphQL.Types;
using GraphQL.Validation.Complexity;
using System.Threading.Tasks;

namespace Trader.DataStore
{
    public class GraphQLQuery
    {
        public string OperationName { get; set; }
        public string NamedQuery { get; set; }
        public string Query { get; set; }
        public string Variables { get; set; }
    }

    public class GraphQLQueryHandler
    {
        public async Task<ExecutionResult> ExecuteQuery(GraphQLQuery query)
        {
            var querySchema = new Schema { Query = new StockNewsQuery() };
            var inputs = query.Variables.ToInputs();
            var queryToExecute = query.Query;

            var result = await new DocumentExecuter().ExecuteAsync(x =>
            {
                x.Inputs = inputs;
                x.Schema = querySchema;
                x.Query = query.Query;
                x.OperationName = query.OperationName;

                x.ComplexityConfiguration = new ComplexityConfiguration { MaxDepth = 15 };
                x.FieldMiddleware.Use<InstrumentFieldsMiddleware>();


            }).ConfigureAwait(false);
            
            return result;
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
