namespace WellnessApp.API.DTOs
{
    public class UpdateWellnessEntryDto
    {
        public DateTime Date { get; set; }

        public int Mood { get; set; }

        public double SleepHours { get; set; }

        public int StressLevel { get; set; }

        public int PhysicalActivityMinutes { get; set; }

        public string? Notes { get; set; }
    }
}
