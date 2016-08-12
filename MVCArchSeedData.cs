using MVCArch.Model.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVCArch.Data
{
    public class MVCArchSeedData : DropCreateDatabaseIfModelChanges<MVCArchContext>
    {
        protected override void Seed(MVCArchContext context)
        {
            GetEmployees().ForEach(e => context.Employees.Add(e));

            context.Commit();
        }

        private static List<Employee> GetEmployees()
        {
            return new List<Employee>
            {
                new Employee {
                    Name = "Mostofa"
                },
                new Employee {
                    Name = "Zaman"
                },
                new Employee {
                    Name = "Mike"
                }
            };
        }
   
    }
}
