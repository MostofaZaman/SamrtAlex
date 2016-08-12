using MVCArch.Data.Infrastructure;
using MVCArch.Data.Repositories;
using MVCArch.Model;
using MVCArch.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVCArch.Service
{
    // operations you want to expose
    public interface IEmployeeService
    {
        IEnumerable<Employee> GetCategories(string name = null);
        Employee GetCategory(int id);
        Employee GetCategory(string name);
        void CreateCategory(Employee category);
        void SaveCategory();
    }

    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository employeeRepository;
        private readonly IUnitOfWork unitOfWork;

        public EmployeeService(IEmployeeRepository employeeRepository, IUnitOfWork unitOfWork)
        {
            this.employeeRepository = employeeRepository;
            this.unitOfWork = unitOfWork;
        }

        #region ICategoryService Members

        public IEnumerable<Employee> GetCategories(string name = null)
        {
            if (string.IsNullOrEmpty(name))
                return employeeRepository.GetAll();
            else
                return employeeRepository.GetAll().Where(c => c.Name == name);
        }

        public Employee GetCategory(int id)
        {
            var category = employeeRepository.GetById(id);
            return category;
        }

        public Employee GetCategory(string name)
        {
            var category = employeeRepository.GetEmployeeByName(name);
            return category;
        }

        public void CreateCategory(Employee category)
        {
            employeeRepository.Add(category);
        }

        public void SaveCategory()
        {
            unitOfWork.Commit();
        }

        #endregion
    }
}
