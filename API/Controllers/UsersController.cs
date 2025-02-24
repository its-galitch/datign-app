using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;

namespace API.Controllers;


[Authorize]
public class UsersController(IUserRepository userRepository) : BaseAPIController
{
	[AllowAnonymous]
	[HttpGet]
	public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
	{
		var users = await userRepository.GetMembersAsync();

		return Ok(users);
	}

	
	// [Authorize]
	[HttpGet("{username}")]
	public async Task<ActionResult<MemberDto>> GetUser(string username)
	{
		var user = await userRepository.GetMemberAsync(username);

		if (user == null) return NotFound();

		return Ok(user);
	}

}