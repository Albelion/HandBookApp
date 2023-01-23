using HandbookApi.Data.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HandbookApi.Data{
    public interface IHandBookRepository{
        IQueryable<Employee> Employees{get;}
        Task<bool> SaveEmployeeAsync();
        void CreateEmployee(Employee emp);
        void UpdateEmployee(Employee emp);
        Task<IEnumerable<Employee>> GetAllEmployeeAsync();
        Task<Employee> GetEmployeeByIdAsync(int employeeId);
        Task<IEnumerable<Employee>> GetEmployeesBySearchAsync(string criteria);
        void DeleteEmployee(Employee emp);
    }
}