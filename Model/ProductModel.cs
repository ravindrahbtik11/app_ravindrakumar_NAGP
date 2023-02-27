namespace eCommerce.ProductService
{
    public class ProductModel
    {
        public int Id { get; set; }

        public string? Name { get; set; }

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
}
