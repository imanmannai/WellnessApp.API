using Microsoft.EntityFrameworkCore;
using WellnessApp.API.Data;
using WellnessApp.API.DTOs;
using WellnessApp.API.Entities;

namespace WellnessApp.API.Services
{
    public class WellnessEntryService : IWellnessEntryService
    {
        private readonly ApplicationDbContext _context;

        public WellnessEntryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<WellnessEntry>> GetEntriesAsync(string userId)
        {
            return await _context.WellnessEntries
                .Where(e => e.UserId == userId)
                .ToListAsync();
        }

        public async Task<WellnessEntry> CreateEntryAsync(
            string userId,
            CreateWellnessEntryDto dto)
        {
            var entry = new WellnessEntry
            {
                UserId = userId,
                Date = dto.Date,
                Mood = dto.Mood,
                SleepHours = dto.SleepHours,
                StressLevel = dto.StressLevel,
                PhysicalActivityMinutes = dto.PhysicalActivityMinutes,
                Notes = dto.Notes
            };

            _context.WellnessEntries.Add(entry);

            await _context.SaveChangesAsync();

            return entry;
        }

        public async Task<WellnessEntry?> UpdateEntryAsync(
            int id,
            string userId,
            UpdateWellnessEntryDto dto)
        {
            var entry = await _context.WellnessEntries
                .FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);

            if (entry == null)
            {
                return null;
            }

            entry.Date = dto.Date;
            entry.Mood = dto.Mood;
            entry.SleepHours = dto.SleepHours;
            entry.StressLevel = dto.StressLevel;
            entry.PhysicalActivityMinutes = dto.PhysicalActivityMinutes;
            entry.Notes = dto.Notes;

            await _context.SaveChangesAsync();

            return entry;
        }

        public async Task<bool> DeleteEntryAsync(int id, string userId)
        {
            var entry = await _context.WellnessEntries
                .FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);

            if (entry == null)
            {
                return false;
            }

            _context.WellnessEntries.Remove(entry);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
