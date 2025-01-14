using API.Data;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(opt => 
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

var app = builder.Build();

var allovedOrigins = new[] { "http://localhost:4200", "https://localhost:4200" };
app.UseCors( x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins(allovedOrigins));

app.MapControllers();

app.Run();
