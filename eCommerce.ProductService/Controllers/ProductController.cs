using eCommerce.ProductService.DAC.Contexts;
using eCommerce.ProductService.DAC.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace eCommerce.ProductService.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : BaseController
    {
        private IHttpContextAccessor Accessor;
        private ProductContext _dbContext;
        private readonly IConfiguration _configuration;

        public ProductController(ProductContext dbContext, IHttpContextAccessor accessor, IConfiguration configuration)
        {
            _dbContext = dbContext;
            Accessor = accessor;
            _configuration = configuration;
        }

        // GET: api/<ProductController>
        [HttpGet]
        public IEnumerable<Product> Get(string? size, string? brand, string? color, string? name)
        {
            string[] brands = null;
            string[] colors = null;
            string[] sizes = null;
            if (name == null)
            {
                name = string.Empty;
            }
           
            if (brand == null)
            {
                brand = string.Empty;
            }
            else
            {
                brands = brand.Split(',');
            }
            if (size == null)
            {
                size = string.Empty;
            }
            else
            {
                sizes = size.Split(',');
            }
            if (color == null)
            {
                color = string.Empty;
            }
            else
            {
                colors = color.Split(',');
            }

            List<Product> products = new List<Product>();
            //products = _dbContext.Products.DefaultIfEmpty().ToList();
            products = GetProducts();
            if (products.Count > 0 && products[0] != null)
            {
                products = products.Where(p => (p.Name.Contains(name) || name == string.Empty) && (size == string.Empty || sizes.Any(s => s.Contains(p.Size))) &&
          (brand == string.Empty || brands.Any(s => s.Contains(p.Brand))) && (color == string.Empty || colors.Any(s => s.Contains(p.Color)))).ToList();
            }

            return products;
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public Product Get(int id)
        {
            List<Product> products = GetProducts();
            var product = products.FirstOrDefault(s => s.Id == id);
            //_dbContext.Products.FirstOrDefault(s => s.Id == id);
            return product;
        }

        // POST api/<ProductController>
        [HttpPost]
        public bool Post([FromBody] Product product)
        {

            _dbContext.Products.Add(product);
            int affectedRow = _dbContext.SaveChanges();
            return affectedRow > 0;

        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Product product)
        {
            //var productBD = _dbContext.Products.FirstOrDefault(s => s.Id == id);
            //productBD = product;
            _dbContext.Products.Update(product);
            _dbContext.SaveChanges();
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpPost(nameof(UploadFile))]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile file)
        {
            string systemFileName = file.FileName;
            string blobstorageconnection = _configuration.GetValue<string>("BlobConnectionString");
            // Retrieve storage account from connection string.    
            CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(blobstorageconnection);
            // Create the blob client.    
            CloudBlobClient blobClient = cloudStorageAccount.CreateCloudBlobClient();
            // Retrieve a reference to a container.    
            CloudBlobContainer container = blobClient.GetContainerReference(_configuration.GetValue<string>("BlobContainerName"));
            // This also does not make a service call; it only creates a local object.    
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(systemFileName);
            await using (var data = file.OpenReadStream())
            {
                await blockBlob.UploadFromStreamAsync(data);
            }
            return Ok("File Uploaded Successfully");
        }

       private List<Product> GetProducts()
        {
            var products = new List<Product>(){ new Product() {Id=1, Name = "Jeans", Description = "This will fit you best based on data from customers who buy the same sizes as you.",
                                            CategoryId= 4,MRP=1800,Brand = "Adidas",SellingPrice=1500,Quantity=10 ,Size ="Medium",Color ="Blue",ImagePath="jeans"},
                                             new Product() {Id=2,Name = "Jhumka", Description = "This will fit you best based on data from customers.",
                                            CategoryId= 14,MRP=1200,Brand = "Common",SellingPrice=1000,Quantity=10 ,Size ="Medium",Color ="Golden",ImagePath="jhumka-img"},
                                              new Product() {Id = 3, Name = "Gold Neklesh", Description = "This is the Medium size gold neck lesh.",
                                            CategoryId= 10,MRP=25000,Brand = "Spykar",SellingPrice=20000,Quantity=10 ,Size ="Medium",Color ="Golden",ImagePath="neklesh-img"},
                                               new Product() {Id=4,Name = "Laptop", Description = "This is high performance laptop.",
                                            CategoryId= 14,MRP=50000,Brand = "Dell",SellingPrice=45000,Quantity=30 ,Size ="Small",Color ="Black",ImagePath="laptop-img"},
                                               new Product() {Id = 5, Name = "Jeans", Description = "This will fit you best based on data from customers who buy the same sizes as you.",
                                            CategoryId= 4,MRP=1800,Brand = "Adidas",SellingPrice=1500,Quantity=10 ,Size ="Small",Color ="Blue",ImagePath="jeans"},
                                             new Product() {Id = 6, Name = "Jhumka", Description = "This will fit you best based on data from customers.",
                                            CategoryId= 14,MRP=1200,Brand = "Common",SellingPrice=1000,Quantity=10 ,Size ="Small",Color ="Golden",ImagePath="jhumka-img"},
                                              new Product() {Id = 7, Name = "Gold Neklesh", Description = "This is the Small size gold neck lesh.",
                                            CategoryId= 10,MRP=25000,Brand = "Spykar",SellingPrice=20000,Quantity=10 ,Size ="Small",Color ="Golden",ImagePath="neklesh-img"},
                                               new Product() {Id = 8, Name = "Laptop", Description = "This is high performance laptop.",
                                            CategoryId= 14,MRP=50000,Brand = "Dell",SellingPrice=45000,Quantity=30 ,Size ="Medium",Color ="Black",ImagePath="laptop-img"},
                                               new Product() {Id = 9, Name = "Jeans", Description = "This will fit you best based on data from customers who buy the same sizes as you.",
                                            CategoryId= 4,MRP=1800,Brand = "Adidas",SellingPrice=1500,Quantity=10 ,Size ="Large",Color ="Blue",ImagePath="jeans"},
                                             new Product() {Id = 10, Name = "Jhumka", Description = "This will fit you best based on data from customers.",
                                            CategoryId= 24,MRP=1200,Brand = "Common",SellingPrice=1000,Quantity=10 ,Size ="Large",Color ="Golden",ImagePath="jhumka-img"},
                                              new Product() {Id = 11, Name = "Gold Neklesh", Description = "This is the Large size gold neck lesh.",
                                            CategoryId= 10,MRP=25000,Brand = "Spykar",SellingPrice=20000,Quantity=10 ,Size ="Large",Color ="Golden",ImagePath="neklesh-img"},
                                               new Product() {Id = 13, Name = "Laptop", Description = "This is high performance laptop.",
                                            CategoryId= 14,MRP=50000,Brand = "Dell",SellingPrice=45000,Quantity=30 ,Size ="Large",Color ="Black",ImagePath="laptop-img"},
                                                new Product() {Id = 14, Name = "Laptop", Description = "This is high performance laptop.",
                                            CategoryId= 14,MRP=50000,Brand = "Dell",SellingPrice=45000,Quantity=30 ,Size ="Large",Color ="Silver",ImagePath="laptop-img"},
                                                   new Product() {Id = 15, Name = "Laptop", Description = "This is high performance laptop.",
                                            CategoryId= 14,MRP=50000,Brand = "Dell",SellingPrice=45000,Quantity=30 ,Size ="Large",Color ="White",ImagePath="laptop-img"},

                        };
            return products;
        }
    }
}
