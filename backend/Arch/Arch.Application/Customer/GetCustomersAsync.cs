using Arch.Infra.Shared.Cqrs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Arch.Application.Customer
{
    public class GetCustomersAsync: IQuery<Task<IEnumerable<CustomerItem>>>
    {
        
    }
}
