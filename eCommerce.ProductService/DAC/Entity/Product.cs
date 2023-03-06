using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eCommerce.ProductService.DAC.Entity
{
    public class Product
    {
        public Product()
        {
            this.Name = string.Empty;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public int CategoryId { get; set; }

        public decimal MRP { get; set; }

        public decimal BuyingPrice { get; set; }

        public DateTime Expiry { get; set; }
        public decimal MinimumSellPrice { get; set; }
        public string? Brand { get; set; }
        public decimal SellingPrice { get; set; }
        public int Quantity { get; set; }
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

        public decimal BuyingPrice { get; set; }

        public DateTime Expiry { get; set; }
        public decimal MinimumSellPrice { get; set; }
        public string? Brand { get; set; }
        public decimal SellingPrice { get; set; }
        public int Quantity { get; set; }

        public byte[] FormData { get; set; }
    }
}
