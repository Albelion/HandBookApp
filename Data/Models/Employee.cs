using System.ComponentModel.DataAnnotations;
namespace HandbookApi.Data.Models{
    public class Employee{
        [Required]
        public int Id { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Organization { get; set; }
        [Required]
        public string Unit { get; set; }
        [Required]
        public string Position { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }
    }
}