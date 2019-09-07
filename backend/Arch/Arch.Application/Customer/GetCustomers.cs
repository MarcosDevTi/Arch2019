using Arch.Infra.Shared.Cqrs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Arch.Application.Customer
{
    public class GetCustomers: IQuery<IEnumerable<CustomerItem>>
    {
        public GetCustomers(IDictionary<string, string> search)
        {
            Search = search;
        }
        public IDictionary<string, string> Search { get; set; }
    }
}
