using GraphQL.Types;
using System;
using Trader.DataStore.Models;
using Trader.DataStore.Providers;

namespace Trader.DataStore.GraphQueryTypes
{   

    public class CorporateNewsType : ObjectGraphType<CorporateNews>
    {
        public CorporateNewsType()
        {
            Name = "Corporate News";
            Description = "Corporate News info";

            Field(d => d.Id).Description("Stock News Id");
            Field(d => d.SecuityCode).Description("Stock News Info");
            Field(d => d.Country).Description("Country for this stock news");
            Field(d => d.NewsData).Description("News Info");
        }
    }
}
