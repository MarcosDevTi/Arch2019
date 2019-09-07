using Arch.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Arch.Infra.Data
{
    public class ArchContext: DbContext
    {
        public ArchContext(DbContextOptions<ArchContext> options)
            :base(options) { }
        public DbSet<Customer> Customers { get; set; }
    }
}
