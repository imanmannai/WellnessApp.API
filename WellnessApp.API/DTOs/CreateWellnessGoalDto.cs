namespace WellnessApp.API.DTOs
{
    public class CreateWellnessGoalDto
    {
        public string GoalType { get; set; } = string.Empty;

        public double TargetValue { get; set; }
    }
}


 