using WellnessApp.API.DTOs;
using WellnessApp.API.Entities;

namespace WellnessApp.API.Services
{
    public interface IWellnessGoalService
    {
        Task<WellnessGoal> CreateGoalAsync(
            string userId,
            CreateWellnessGoalDto dto);

        Task<List<WellnessGoal>> GetMyGoalsAsync(
            string userId);

        Task<bool> DeleteGoalAsync(
            int id,
            string userId);

        Task<bool> UpdateGoalAsync(
            int id,
            string userId,
            UpdateWellnessGoalDto dto);
    }
}