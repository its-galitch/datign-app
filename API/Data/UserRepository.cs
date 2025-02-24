using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace API.Data;

public class UserRepository(DataContext context, IMapper mapper): IUserRepository
{
	public async Task<IEnumerable<MemberDto>> GetMembersAsync()
	{
		return await context.Users
				.ProjectTo<MemberDto>(mapper.ConfigurationProvider)
				.ToListAsync();
	}

	public async Task<MemberDto?> GetMemberAsync(string username)
	{
		return await context.Users
				.Where(x => x.UserName == username)
				.ProjectTo<MemberDto>(mapper.ConfigurationProvider)
				.SingleOrDefaultAsync();
	}

	public void Update(AppUser user)
	{
		context.Entry(user).State = EntityState.Modified;
	}

	public async Task<bool> SaveAllAsync()
	{
		return await context.SaveChangesAsync() > 0;
	}

	public async Task<IEnumerable<AppUser>> GetUsersAsync()
	{
		return await context.Users
				.Include(user => user.Photos)
				.ToListAsync();
	}

	public async Task<AppUser?> GetUserByIdAsync(int id)
	{
		return await context.Users.FindAsync(id);
	}

	public async Task<AppUser?> GetUserByUsernameAsync(string username)
	{
		return await context.Users
				.Include(x => x.Photos)
				.SingleOrDefaultAsync(x => x.UserName == username);
	}
}