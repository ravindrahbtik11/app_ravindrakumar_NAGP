using eCommerce.ProductService.DAC.Entity;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.ProductService.DAC.Contexts
{
    public class ProductContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public ProductContext(DbContextOptions<ProductContext> options)
            : base(options)
        {

        }
    }
}
