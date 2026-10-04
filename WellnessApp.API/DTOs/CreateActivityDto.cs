namespace WellnessApp.API.DTOs
{
    public class CreateActivityDto
    {
        public string Name { get; set; } = string.Empty;

        public int DurationMinutes { get; set; }

        public DateTime Date { get; set; }
    }
}