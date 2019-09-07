using Arch.Infra.Shared.Cqrs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Arch.Infra.Data
{
    public class Processor : IProcessor
    {
        private readonly IServiceProvider _serviceProvider;
        public Processor(IServiceProvider serviceProvider) =>
            _serviceProvider = serviceProvider;

        public TResult Get<TResult>(IQuery<TResult> query) =>
            GetHandle(typeof(IQueryHandler<,>), query.GetType(), typeof(TResult))
                .Handle((dynamic)query);

        public Task<TCommand> Send<TCommand>(TCommand command) where TCommand : ICommand =>
            GetHandle(typeof(ICommandHandler<>), command.GetType())
                .Handle(command);

        private dynamic GetHandle(Type handle, params Type[] types) =>
             _serviceProvider.GetService(handle.MakeGenericType(types));
    }
}
