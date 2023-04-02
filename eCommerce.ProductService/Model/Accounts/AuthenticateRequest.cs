
using System.ComponentModel.DataAnnotations;
namespace eCommerce.ProductService
{
    public class AuthenticateRequest
    {
        [Required]
        public string? AccessToken { get; set; }
    }
}