using Microsoft.AspNetCore.Mvc;

namespace eCommerce.ProductService.Controllers
{
    public class HomeController : Controller
    {

        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }


        public bool TestFunction(bool val)
        {
            //Added for test coverage
            Console.WriteLine("coverage");
            return val;
        }
    }
}
