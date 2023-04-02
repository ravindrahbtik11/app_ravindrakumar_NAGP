

using System.ComponentModel.DataAnnotations;
namespace eCommerce.ProductService
{
    public class UpdateRequest
    {
        [Required]
        public string? Name { get; set; }

        public string? ExtraInfo { get; set; }
    }
}