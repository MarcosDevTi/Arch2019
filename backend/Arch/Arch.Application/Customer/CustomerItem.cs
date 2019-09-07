using System;
using System.Collections.Generic;
using System.Text;

namespace Arch.Application.Customer
{
    public class CustomerItem
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
