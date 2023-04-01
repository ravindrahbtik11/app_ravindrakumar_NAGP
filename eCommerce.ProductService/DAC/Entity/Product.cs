using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eCommerce.ProductService.DAC.Entity
{
    public class Product
    {
        public Product()
        {
            this.Name = string.Empty;
            this.Size = string.Empty;
            this.Brand = string.Empty;
            this.Color = string.Empty;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public int CategoryId { get; set; }

        public decimal MRP { get; set; }
        public string Brand { get; set; }
        public decimal SellingPrice { get; set; }
        public int Quantity { get; set; }

        public string Size { get; set; }

        public string Color { get; set; }
    }

    public class ProductDTO
    {
        public ProductDTO()
        {
            this.Name = string.Empty;
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public int CategoryId { get; set; }

        public decimal MRP { get; set; }
        public string? Brand { get; set; }
        public decimal SellingPrice { get; set; }
        public int Quantity { get; set; }

        public string? Size { get; set; }

        public string? Color { get; set; }

        public byte[] FormData { get; set; }
    }
}
