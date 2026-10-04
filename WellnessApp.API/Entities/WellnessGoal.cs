namespace WellnessApp.API.Entities
{
    public class WellnessGoal
    {
       public int Id { get; set; }

       public string UserId { get; set; } = string.Empty;
 
       public string GoalType { get; set; } = string.Empty;

       public double TargetValue { get; set; }

       public DateTime CreatedAt { get; set; }

       public ApplicationUser User { get; set; } = null!;
    }
}
