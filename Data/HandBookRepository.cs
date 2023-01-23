using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HandbookApi.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace HandbookApi.Data{
    public class HandBookRepository : IHandBookRepository
    {
        private readonly AppDbContext _context;
        public HandBookRepository(AppDbContext context)
        {
            _context = context;
        }

        public IQueryable<Employee> Employees => _context.Employees;

        public void CreateEmployee(Employee emp)
        {
            _context.Employees.Add(emp);
        }

        public void DeleteEmployee(Employee emp)
        {
            _context.Remove(emp);
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeeAsync()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync(int employeeId)
        {
            return await _context.Employees.FirstOrDefaultAsync(emp=>emp.Id==employeeId);
        }

        public async Task<IEnumerable<Employee>> GetEmployeesBySearchAsync(string criteria)
        {
            var employees = await Employees.Where(emp=>emp.FullName.Contains(criteria)||emp.Organization.Contains(criteria)
                ||emp.Position.Contains(criteria)||emp.Unit.Contains(criteria)
                ||emp.PhoneNumber.Contains(criteria)||emp.Email.Contains(criteria)).ToListAsync();
            return employees;
        }

        public async Task<bool> SaveEmployeeAsync()
        {
            return(await _context.SaveChangesAsync())>=0;
        }

        public void UpdateEmployee(Employee emp)
        {
            _context.Employees.Update(emp);
        }
    }
}