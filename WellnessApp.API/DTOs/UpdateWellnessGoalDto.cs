namespace WellnessApp.API.DTOs
{
    public class UpdateWellnessGoalDto
    {
        public string GoalType { get; set; } = string.Empty;

        public double TargetValue { get; set; }
    }
}
