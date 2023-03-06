using eCommerce.ProductService.Controllers;
using Microsoft.Extensions.Logging;
using Moq;


namespace eCommerce.ProductTest
{
    public class HomeControllerTest
    {
        private readonly HomeController _homeController;
        private readonly Mock<ILogger<HomeController>> _logger;

        public HomeControllerTest()
        {
            _logger = new Mock<ILogger<HomeController>>();
            _homeController = new HomeController(_logger.Object);
        }

        [Fact]
        public void TestFunction_Should_ReturnTrue_IfTruePassed()
        {
            // Act
            var res = _homeController.TestFunction(true);

            // Assert
            Assert.True(res);
        }

        [Fact]
        public void TestFunction_Should_ReturnFalse_IfFalsePassed()
        {
            // Act
            var res = _homeController.TestFunction(false);

            // Assert
            Assert.False(res);
        }
    }
}