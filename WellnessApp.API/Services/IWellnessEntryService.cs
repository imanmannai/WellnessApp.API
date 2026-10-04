using WellnessApp.API.DTOs;
using WellnessApp.API.Entities;

namespace WellnessApp.API.Services
{
    public interface IWellnessEntryService
    {
        Task<List<WellnessEntry>> GetEntriesAsync(string userId);
        Task<WellnessEntry> CreateEntryAsync(string userId, CreateWellnessEntryDto dto);
        Task<WellnessEntry?> UpdateEntryAsync(int id, string userId, UpdateWellnessEntryDto dto);
        Task<bool> DeleteEntryAsync(int id, string userId);
    }
}