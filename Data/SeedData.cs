using Microsoft.EntityFrameworkCore;
using HandbookApi.Data.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace HandbookApi.Data{
    public static class SeedData{
        public static void EnsureSeed(IApplicationBuilder app){
            AppDbContext context = app.ApplicationServices.CreateScope()
                .ServiceProvider.GetRequiredService<AppDbContext>();
            if(context.Database.GetPendingMigrations().Any()){
                context.Database.Migrate();
            }
            if(!context.Employees.Any()){
                Employee employee1 = new(){FullName = "Лебедев Кирилл Алексеевич", Organization = "ЭлектроСити",
                 Unit = "Разработка", Position = "Программист", PhoneNumber="+79329513429", Email="develop@mail.com"};

                Employee employee2 = new(){FullName = "Мельникова Светлана Юрьевна", Organization = "УправДом",
                 Unit = "Связь", Position = "Оператор", PhoneNumber="+79319253429", Email="uprav@mail.com"};

                Employee employee3 = new(){FullName = "Колесников Николай Степанович", Organization = "СтройФонд",
                 Unit = "Строительство", Position = "Инженер", PhoneNumber="+79319253423", Email="stroy@mail.com"};
                 context.Employees.AddRange(employee1, employee2, employee3);
                 context.SaveChanges();
            }
        }
    }
}