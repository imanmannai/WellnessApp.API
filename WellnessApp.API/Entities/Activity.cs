namespace WellnessApp.API.Entities
{
    public class Activity
    {
        public int Id { get; set; }

        public string UserId { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;

        public int DurationMinutes { get; set; }

        public DateTime Date { get; set; }

        public ApplicationUser User { get; set; } = null!;
    }
}
