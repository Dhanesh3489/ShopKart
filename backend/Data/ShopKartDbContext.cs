using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class ShopKartDbContext : DbContext
    {
        public ShopKartDbContext(DbContextOptions<ShopKartDbContext> options)
            : base(options) { }

        public DbSet<Product> Products => Set<Product>();
    }
}
