using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WellnessApp.API.DTOs;
using WellnessApp.API.Services;

namespace WellnessApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ActivitiesController : ControllerBase
    {
        private readonly IActivityService _activityService;

        public ActivitiesController(IActivityService activityService)
        {
            _activityService = activityService;
        }

        // GET: api/Activities
        [HttpGet]
        public async Task<IActionResult> GetMyActivities()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var activities = await _activityService
                .GetUserActivitiesAsync(userId!);

            return Ok(activities);
        }

        // POST: api/Activities
        [HttpPost]
        public async Task<IActionResult> CreateActivity(
            CreateActivityDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var activity = await _activityService
                .CreateActivityAsync(userId!, dto);

            return Ok(activity);
        }

        // DELETE: api/Activities/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var deleted = await _activityService
                .DeleteActivityAsync(id, userId!);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(
        int id,
        UpdateActivityDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var updated = await _activityService
                .UpdateActivityAsync(id, userId!, dto);

            if (!updated)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
