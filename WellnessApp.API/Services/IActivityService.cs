using WellnessApp.API.DTOs;
using WellnessApp.API.Entities;

namespace WellnessApp.API.Services
{
    public interface IActivityService
    {
        Task<Activity> CreateActivityAsync(
            string userId,
            CreateActivityDto dto);

        Task<List<Activity>> GetUserActivitiesAsync(
            string userId);

        Task<bool> DeleteActivityAsync(
            int id,
            string userId);

        Task<bool> UpdateActivityAsync(
            int id,
            string userId,
            UpdateActivityDto dto);
    }
}
