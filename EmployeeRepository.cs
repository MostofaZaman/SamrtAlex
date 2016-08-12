using MVCArch.Data.Infrastructure;
using MVCArch.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVCArch.Data.Repositories
{
    public class EmployeeRepository : RepositoryBase<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(IDbFactory dbFactory)
            : base(dbFactory) { }

        public Employee GetEmployeeByName(string categoryName)
        {
            var category = this.DbContext.Employees.Where(c => c.Name == categoryName).FirstOrDefault();

            return category;
        }

        public override void Update(Employee entity)
        {
            base.Update(entity);
        }
    }

    public interface IEmployeeRepository : IRepository<Employee>
    {
        Employee GetEmployeeByName(string employeeName);
    }
}
