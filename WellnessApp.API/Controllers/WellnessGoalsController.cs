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
    public class WellnessGoalsController : ControllerBase
    {
        private readonly IWellnessGoalService _wellnessGoalService;

        public WellnessGoalsController(
            IWellnessGoalService wellnessGoalService)
        {
            _wellnessGoalService = wellnessGoalService;
        }

        // GET: api/WellnessGoals
        [HttpGet]
        public async Task<IActionResult> GetMyGoals()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var goals = await _wellnessGoalService.GetMyGoalsAsync(
                userId!);

            return Ok(goals);
        }

        // POST: api/WellnessGoals
        [HttpPost]
        public async Task<IActionResult> CreateGoal(
            CreateWellnessGoalDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var goal = await _wellnessGoalService.CreateGoalAsync(
                userId!,
                dto);

            return Ok(goal);
        }

        // PUT: api/WellnessGoals/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGoal(
            int id,
            UpdateWellnessGoalDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var updated = await _wellnessGoalService.UpdateGoalAsync(
                id,
                userId!,
                dto);

            if (!updated)
            {
                return NotFound();
            }

            return NoContent();
        }

        // DELETE: api/WellnessGoals/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGoal(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var deleted = await _wellnessGoalService.DeleteGoalAsync(
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
