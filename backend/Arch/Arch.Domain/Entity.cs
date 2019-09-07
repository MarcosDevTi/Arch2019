using System;
using System.Collections.Generic;
using System.Text;

namespace Arch.Domain
{
    public abstract class Entity
    {
        public Guid? Id { get; set; }
    }
}
