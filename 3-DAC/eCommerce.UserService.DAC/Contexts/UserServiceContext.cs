
using Microsoft.EntityFrameworkCore;

namespace eCommerce.UserService.DAC.Contexts
{
    public class UserServiceContext : DbContext
    {

        
        public UserServiceContext(DbContextOptions<UserServiceContext> options)
            : base(options)
        {
            //Database.EnsureCreated();
        }

        public DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}