using Microsoft.EntityFrameworkCore;
using WellnessApp.API.Data;
using WellnessApp.API.DTOs;
using WellnessApp.API.Entities;

namespace WellnessApp.API.Services
{
    public class WellnessGoalService : IWellnessGoalService
    {
        private readonly ApplicationDbContext _context;

        public WellnessGoalService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<WellnessGoal> CreateGoalAsync(
            string userId,
            CreateWellnessGoalDto dto)
        {
            var goal = new WellnessGoal
            {
                UserId = userId,
                GoalType = dto.GoalType,
                TargetValue = dto.TargetValue,
                CreatedAt = DateTime.UtcNow
            };

            _context.WellnessGoals.Add(goal);

            await _context.SaveChangesAsync();

            return goal;
        }

        public async Task<List<WellnessGoal>> GetMyGoalsAsync(
            string userId)
        {
            return await _context.WellnessGoals
                .Where(g => g.UserId == userId)
                .ToListAsync();
        }

        public async Task<bool> DeleteGoalAsync(
            int id,
            string userId)
        {
            var goal = await _context.WellnessGoals
                .FirstOrDefaultAsync(g =>
                    g.Id == id &&
                    g.UserId == userId);

            if (goal == null)
            {
                return false;
            }

            _context.WellnessGoals.Remove(goal);

            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<bool> UpdateGoalAsync(
            int id,
            string userId,
            UpdateWellnessGoalDto dto)
        {
            var goal = await _context.WellnessGoals
                .FirstOrDefaultAsync(g =>
                    g.Id == id &&
                    g.UserId == userId);

            if (goal == null)
            {
                return false;
            }

            goal.GoalType = dto.GoalType;
            goal.TargetValue = dto.TargetValue;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}