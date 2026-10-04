using WellnessApp.API.DTOs;
using WellnessApp.API.Entities;

namespace WellnessApp.API.Services
{
    public interface IWellnessEntryService
    {
        Task<WellnessEntry?> UpdateEntryAsync(
            int id,
            string userId,
            UpdateWellnessEntryDto dto);

        Task<bool> DeleteEntryAsync(int id, string userId);
    }
}
