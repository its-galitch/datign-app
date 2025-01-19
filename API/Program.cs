using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

var allowedOrigins = new[] { "http://localhost:4200", "https://localhost:4200" };
app.UseCors( x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins(allowedOrigins));

app.UseAuthentication(); // order is important here!!!
app.UseAuthorization();

app.MapControllers();

app.Run();
