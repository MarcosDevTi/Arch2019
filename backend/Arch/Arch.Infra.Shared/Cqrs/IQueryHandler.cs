using System;
using System.Collections.Generic;
using System.Text;

namespace Arch.Infra.Shared.Cqrs
{
    public interface IQueryHandler<in TQuery, out TResult>
        where TQuery: IQuery<TResult>
    {
        TResult Handle(TQuery query);
    }
}
