using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Arch.Application.Customer;
using Arch.Infra.Shared.Cqrs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arch.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IProcessor _processor;
        public CustomerController(IProcessor processor)
        {
            _processor = processor;
        }

        //[HttpGet]
        //public IActionResult GetCustomers(GetCustomers getCustomers)
        //{
        //    return Ok(_processor.Get(getCustomers));
        //}

        [HttpGet]
        public IActionResult Test([FromQuery]IDictionary<string, string> input)
        {
            var result = _processor.Get(new GetCustomers(input));
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer(CreateCustomer createCustomer)
        {
            return Ok(await _processor.Send(createCustomer));
        }
    }
}