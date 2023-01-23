using Microsoft.AspNetCore.Mvc;
using HandbookApi.Data;
using HandbookApi.Data.Models;
using HandbookApi.Data.Dtos;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HandbookApi.Controllers{
    [Route("api/[controller]")]
    [ApiController]
    public class HandbookController:ControllerBase{
        private readonly IHandBookRepository _handbookRepo;
        private readonly IMapper _mapper;
        public HandbookController(IHandBookRepository repo, IMapper mapper)
        {
            _handbookRepo = repo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeReadDto>>> GetEmployees(){
            var employees = await _handbookRepo.GetAllEmployeeAsync();
            if(employees != null){
                return Ok(_mapper.Map<IEnumerable<EmployeeReadDto>>(employees));
            }else{
                return NotFound();
            }
        }
        [HttpGet("{employeeId}", Name = "GetEmployeeById")]
        public async Task<ActionResult<EmployeeReadDto>> GetEmployeeByid(int employeeId){
            var employee = await _handbookRepo.GetEmployeeByIdAsync(employeeId);
            if(employee != null){
                return Ok(_mapper.Map<EmployeeReadDto>(employee));
            }else{
                return NotFound();
            }
        }
        [HttpGet("search", Name = "GetEmployeeBySearch")]
        public async Task<ActionResult<IEnumerable<EmployeeReadDto>>> GetEmployeeBySearch(string criteria){
            var employees = await _handbookRepo.GetEmployeesBySearchAsync(criteria);
            if(employees != null){
                return Ok(_mapper.Map<IEnumerable<EmployeeReadDto>>(employees));
            }
            else return NotFound();
        }
        [HttpPost]
        public async Task<ActionResult<EmployeeReadDto>> CreateEmployee(EmployeeCreateDto employeeCreate){
            var employeeModel = _mapper.Map<Employee>(employeeCreate);
            _handbookRepo.CreateEmployee(employeeModel);
            await _handbookRepo.SaveEmployeeAsync();

            var employeeReadDto = _mapper.Map<EmployeeReadDto>(employeeModel);
            return CreatedAtRoute(nameof(GetEmployeeByid), new{employeeId = employeeReadDto.Id}, employeeReadDto);
        }
        [HttpPut("{employeeId}")]
        public async Task<ActionResult<EmployeeReadDto>> UpdateEmployee(int employeeId, EmployeeUpdateDto employeeUpdate){
            var employeeModel = await _handbookRepo.GetEmployeeByIdAsync(employeeId);
            if(employeeModel != null){
                employeeModel.FullName = employeeUpdate.FullName;
                employeeModel.Organization = employeeUpdate.Organization;
                employeeModel.Position = employeeUpdate.Position;
                employeeModel.Unit = employeeUpdate.Unit;
                employeeModel.Email = employeeUpdate.Email;
                employeeModel.PhoneNumber = employeeUpdate.PhoneNumber;
                _handbookRepo.UpdateEmployee(employeeModel);
                await _handbookRepo.SaveEmployeeAsync();

                var employeeReadDto = _mapper.Map<EmployeeReadDto>(employeeModel);
                return Ok(employeeReadDto);
            }else{
                return NotFound();
            }
        }
        [HttpDelete("{employeeId}")]
        public async Task<ActionResult<EmployeeReadDto>> DeleteEmployeeById(int employeeId){
            var employeeModel = await _handbookRepo.GetEmployeeByIdAsync(employeeId);
            if(employeeModel!=null){
                _handbookRepo.DeleteEmployee(employeeModel);
                await _handbookRepo.SaveEmployeeAsync();
                return Ok(_mapper.Map<EmployeeReadDto>(employeeModel));
            }else{
                return NotFound();}
        }

    }
}