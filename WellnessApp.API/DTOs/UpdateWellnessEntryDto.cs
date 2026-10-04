using System.ComponentModel.DataAnnotations;

namespace WellnessApp.API.DTOs
{
    public class UpdateWellnessEntryDto
    {
        public DateTime Date { get; set; }

        [Range(0, 10, ErrorMessage = "Humör måste vara mellan 0 och 10.")]
        public int Mood { get; set; }

        [Range(0, 24, ErrorMessage = "Sömn måste vara mellan 0 och 24 timmar.")]
        public double SleepHours { get; set; }

        [Range(0, 10, ErrorMessage = "Stressnivå måste vara mellan 0 och 10.")]
        public int StressLevel { get; set; }

        [Range(0, 1440, ErrorMessage = "Fysisk aktivitet måste vara mellan 0 och 1440 minuter.")]
        public int PhysicalActivityMinutes { get; set; }

        [StringLength(1000, ErrorMessage = "Anteckningar får vara högst 1000 tecken.")]
        public string? Notes { get; set; }
    }
}