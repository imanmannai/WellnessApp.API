using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WellnessApp.API.Entities;

namespace WellnessApp.API.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<WellnessEntry> WellnessEntries { get; set; }
        public DbSet<WellnessGoal> WellnessGoals { get; set; }
        public DbSet<Activity> Activities { get; set; }
    }
}
