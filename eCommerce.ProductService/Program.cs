using eCommerce.ProductService;
using eCommerce.ProductService.DAC.Contexts;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.
builder.Services.AddDbContext<ProductContext>(options =>
{
    //options.UseSqlServer(
    //        @"Server=(localdb)\mssqllocaldb;Database=EFMiscellanous.ConnectionResiliency;Trusted_Connection=True;ConnectRetryCount=0",
    //        options => options.EnableRetryOnFailure());

    // var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    // options.UseSqlServer(connectionString, options => options.EnableRetryOnFailure());
   
    options.UseInMemoryDatabase(databaseName: "ProductDb");
});



//public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext dataContext)
//{
//    // migrate any database changes on startup (includes initial db creation)
//    dataContext.Database.Migrate();

//}


//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(name: MyAllowSpecificOrigins,
//        policy =>
//        {
//            policy.WithOrigins("http://localhost:4200", "http://localhost:7090/", "http://localhost:8090/")
//                .SetIsOriginAllowedToAllowWildcardSubdomains().AllowAnyMethod().AllowAnyHeader().AllowCredentials();
//        });
//});


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

// configure DI for application services
builder.Services.AddScoped<IJwtUtils, JwtUtils>();
builder.Services.AddScoped<IAccountService, AccountService>();

var app = builder.Build();

//using (var scope = app.Services.CreateScope())
//{
//    var db = scope.ServiceProvider.GetRequiredService<ProductContext>();
//    db.Database.Migrate();
//}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
//app.UseCors(MyAllowSpecificOrigins);
app.UseCors(builder => builder
.AllowAnyHeader()
.AllowAnyMethod()
.SetIsOriginAllowed((host) => true)
.AllowCredentials());
app.MapControllers();


// global error handler
app.UseMiddleware<ErrorHandlerMiddleware>();

// custom jwt auth middleware
app.UseMiddleware<JwtMiddleware>();

app.Run();
