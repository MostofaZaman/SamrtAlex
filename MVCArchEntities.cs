using MVCArch.Model.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVCArch.Data
{
    public class MVCArchContext : DbContext
    {
        public MVCArchContext() : base("MVCArchContext") { }

        public DbSet<Employee> Employees { get; set; }

        public virtual void Commit()
        {
            base.SaveChanges();
        }

    }
}
