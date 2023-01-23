using AutoMapper;
using HandbookApi.Data.Dtos;
using HandbookApi.Data.Models;

namespace HandbookApi.Profiles{
    public class EmployeesProfile:Profile{
        public EmployeesProfile()
        {
            CreateMap<Employee, EmployeeReadDto>();
            CreateMap<EmployeeCreateDto, Employee>();
            CreateMap<EmployeeUpdateDto, Employee>();
        }
    }
}