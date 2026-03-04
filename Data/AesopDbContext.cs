using AesopFinal.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AesopFinal.Data
{
    public class AesopDbContext : IdentityDbContext<AppUser>
    {
        public AesopDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Recommend> Recommends { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
