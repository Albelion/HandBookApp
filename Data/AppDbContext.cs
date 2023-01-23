using Microsoft.EntityFrameworkCore;
using HandbookApi.Data.Models;

namespace HandbookApi.Data{
    public class AppDbContext:DbContext{
        public AppDbContext(DbContextOptions<AppDbContext> opt):base(opt){}
        public DbSet<Employee> Employees{get; set;}
    }
}