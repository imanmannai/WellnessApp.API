namespace WellnessApp.API.Entities
{
    public class WellnessEntry
    {
       public int Id { get; set; }

       public string UserId { get; set; } = string.Empty;
 
       public DateTime Date { get; set; }

       public int Mood { get; set; }

       public double SleepHours { get; set; }

       public int StressLevel { get; set; }

       public int PhysicalActivityMinutes { get; set; }

       public string? Notes { get; set; }

       public ApplicationUser User { get; set; } = null!;
    }
}
