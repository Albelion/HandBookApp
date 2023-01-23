namespace HandbookApi.Data.Dtos{
    public class EmployeeReadDto{
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Organization { get; set; }
        public string Unit { get; set; }
        public string Position { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}