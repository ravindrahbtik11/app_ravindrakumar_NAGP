using eCommerce.ProductService.DAC.Entity;
using Microsoft.EntityFrameworkCore;

namespace eCommerce.ProductService.DAC.Contexts
{
    public class ProductContext : DbContext
    {
      //  protected override void OnConfiguring
      //(DbContextOptionsBuilder optionsBuilder)
      //  {
      //      optionsBuilder.UseInMemoryDatabase(databaseName: "ProductDb");
      //  }
        public DbSet<Product> Products { get; set; }
        public DbSet<Account> Accounts { get; set; }

        public ProductContext(DbContextOptions<ProductContext> options)
            : base(options)
        {

        }

        //protected override void Seed(ProductContext context)
        //{
        //    IList<Product> defaultStandards = new List<Product>();

        //    defaultStandards.Add(new Product() { StandardName = "Standard 1", Description = "First Standard" });
        //    defaultStandards.Add(new Product() { StandardName = "Standard 2", Description = "Second Standard" });
        //    defaultStandards.Add(new Product() { StandardName = "Standard 3", Description = "Third Standard" });

        //    context.Standards.AddRange(defaultStandards);

        //    base.Seed(context);
        //}
    }
}
