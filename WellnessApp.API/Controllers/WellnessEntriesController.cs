using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WellnessApp.API.Data;
using WellnessApp.API.DTOs;
using WellnessApp.API.Entities;
using WellnessApp.API.Services;

namespace WellnessApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class WellnessEntriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWellnessEntryService _wellnessEntryService;

        public WellnessEntriesController(
            ApplicationDbContext context,
            IWellnessEntryService wellnessEntryService)
        {
            _context = context;
            _wellnessEntryService = wellnessEntryService;
        }

        // GET: api/WellnessEntries
        [HttpGet]
        public async Task<IActionResult> GetMyEntries()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var entries = await _context.WellnessEntries
                .Where(e => e.UserId == userId)
                .ToListAsync();

            return Ok(entries);
        }

        // POST: api/WellnessEntries
        [HttpPost]
        public async Task<IActionResult> CreateEntry(CreateWellnessEntryDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var entry = new WellnessEntry
            {
                UserId = userId!,
                Date = dto.Date,
                Mood = dto.Mood,
                SleepHours = dto.SleepHours,
                StressLevel = dto.StressLevel,
                PhysicalActivityMinutes = dto.PhysicalActivityMinutes,
                Notes = dto.Notes
            };

            _context.WellnessEntries.Add(entry);

            await _context.SaveChangesAsync();

            return Ok(entry);
        }

        // PUT: api/WellnessEntries/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEntry(
            int id,
            UpdateWellnessEntryDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var entry = await _wellnessEntryService.UpdateEntryAsync(
                id,
                userId!,
                dto);

            if (entry == null)
            {
                return NotFound();
            }

            return Ok(entry);
        }

        // DELETE: api/WellnessEntries/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntry(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var deleted = await _wellnessEntryService.DeleteEntryAsync(
                id,
                userId!);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}