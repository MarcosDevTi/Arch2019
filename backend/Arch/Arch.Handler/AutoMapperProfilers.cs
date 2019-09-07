using Arch.Application.Customer;
using Arch.Domain;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Arch.Handler
{
    public class AutoMapperProfilers: Profile
    {
        public AutoMapperProfilers()
        {
            CreateMap<Customer, CustomerItem>()
                .ForMember(d => d.Address, opt => opt.MapFrom(s => $"{s.Street}, {s.Number}, {s.City}, {s.Country}"));
            CreateMap<CreateCustomer, Customer>()
                .ReverseMap();
        }
    }
}
