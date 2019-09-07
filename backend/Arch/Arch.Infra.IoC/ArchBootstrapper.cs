using Arch.Application.Customer;
using Arch.Domain;
using Arch.Handler;
using Arch.Infra.Data;
using Arch.Infra.Shared.Cqrs;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Arch.Infra.Shared.Cqrs
{
    public class ArchBootstrapper
    {
        public static void Register(IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<ArchContext>(_ => _.UseSqlite(config.GetConnectionString("DefaultConnection")));
            services.AddScoped<IProcessor, Processor>();
            services.AddCqrs<CustomerHandler>();

            services.AddAutoMapper(typeof(AutoMapperProfilers));
         
        }
    }
}
