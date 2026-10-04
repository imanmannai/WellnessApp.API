using Microsoft.EntityFrameworkCore;
using WellnessApp.API.Data;
using WellnessApp.API.DTOs;
using WellnessApp.API.Entities;

namespace WellnessApp.API.Services
{
    public class ActivityService : IActivityService
    {
        private readonly ApplicationDbContext _context;

        public ActivityService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Activity> CreateActivityAsync(
            string userId,
            CreateActivityDto dto)
        {
            var activity = new Activity
            {
                UserId = userId,
                Name = dto.Name,
                DurationMinutes = dto.DurationMinutes,
                Date = dto.Date
            };

            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();

            return activity;
        }

        public async Task<List<Activity>> GetUserActivitiesAsync(
            string userId)
        {
            return await _context.Activities
                .Where(a => a.UserId == userId)
                .ToListAsync();
        }

        public async Task<bool> DeleteActivityAsync(
            int id,
            string userId)
        {
            var activity = await _context.Activities
                .FirstOrDefaultAsync(a =>
                    a.Id == id &&
                    a.UserId == userId);

            if (activity == null)
            {
                return false;
            }

            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<bool> UpdateActivityAsync(
        int id,
        string userId,
        UpdateActivityDto dto)
        {
            var activity = await _context.Activities
                .FirstOrDefaultAsync(a =>
                    a.Id == id &&
                    a.UserId == userId);

            if (activity == null)
            {
                return false;
            }

            activity.Name = dto.Name;
            activity.DurationMinutes = dto.DurationMinutes;
            activity.Date = dto.Date;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
