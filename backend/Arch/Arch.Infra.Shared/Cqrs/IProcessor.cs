using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Arch.Infra.Shared.Cqrs
{
    public interface IProcessor
    {
        Task<TCommand> Send<TCommand>(TCommand command) where TCommand : ICommand;
        TResult Get<TResult>(IQuery<TResult> query);
    }
}
