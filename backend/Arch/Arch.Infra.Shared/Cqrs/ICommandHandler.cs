using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Arch.Infra.Shared.Cqrs
{
    public interface ICommandHandler<TCommand>
        where TCommand: ICommand
    {
         Task<TCommand> Handle(TCommand command);
    }
}
