using eCommerce.ProductService.DAC.Contexts;
using eCommerce.ProductService.DAC.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Collections.Generic;
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
            products = _dbContext.Products.DefaultIfEmpty().ToList();
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
            var product = _dbContext.Products.FirstOrDefault(s => s.Id == id);
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

        //public string UploadFilesToBlob()
        //{
        //    try
        //    {
        //        HttpContext context = this.Accessor.HttpContext;
        //        string storageConnectionString = "";
        //        CloudStorageAccount blobStorage = CloudStorageAccount.Parse(storageConnectionString);
        //        CloudBlobClient blobClient = blobStorage.CreateCloudBlobClient();
        //        if (Request.HttpContext.Request.Form["BlobContainerName"] != null)
        //        {
        //            string blobContainerName = Request.HttpContext.Request.Form["BlobContainerName"].ToString();
        //            CloudBlobContainer container = blobClient.GetContainerReference(blobContainerName);
        //            container.CreateIfNotExistsAsync();

        //            // Set public access level to the container.
        //            container.SetPermissionsAsync(new BlobContainerPermissions()
        //            {
        //                PublicAccess = BlobContainerPublicAccessType.Container
        //            });

        //            string folderName = "";
        //            if (Request.HttpContext.Request.Form["FolderNameToUploadFiles"] != null)
        //                folderName = Request.HttpContext.Request.Form["FolderNameToUploadFiles"].ToString() + "/";

        //            for (int i = 0; i < Request.HttpContext.Request.Files.Count; i++)
        //            {
        //                var httpPostedFile = Request.HttpContext.Request.Files[i];
        //                if (httpPostedFile != null)
        //                {
        //                    string blobName = folderName + httpPostedFile.FileName;
        //                    CloudBlockBlob blob = container.GetBlockBlobReference(blobName);
        //                    blob.UploadFromStreamAsync(httpPostedFile.InputStream);
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }

        //    return "# of file(s) sent to upload: " + HttpContext.Current.Request.Files.Count.ToString();

        //}
    }
}
