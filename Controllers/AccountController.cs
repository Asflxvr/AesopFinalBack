using AesopFinal.Models;
using AesopFinal.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AesopFinal.Controllers
{
    public class AccountController : Controller
    {

        private UserManager<AppUser> _userManager { get; }
        private SignInManager<AppUser> _signInManager { get; }
        private RoleManager<IdentityRole> _roleManager { get; }
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }
        public IActionResult Register()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]

        public async Task<IActionResult> Register(RegisterViewModel user)
        {
            if (!ModelState.IsValid) return View(user);

            AppUser newUser = new AppUser
            {
                UserName = user.Username,
                FullName = user.FullName,
                Email = user.Email,
            };
            var IdentityResault = await _userManager.CreateAsync(newUser, user.Password);
            if (!IdentityResault.Succeeded)
            {
                foreach (var error in IdentityResault.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
                return View(user);
            }
            await _userManager.AddToRoleAsync(newUser, "Member");
            await _signInManager.SignInAsync(newUser, true);
            return RedirectToAction("Index", "Home");




        }

        public async Task<IActionResult> Logout()
        {
        
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");

        }

        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel user)
        {
            AppUser existUser = await _userManager.FindByEmailAsync(user.Email);
            if (existUser == null)
            {
                ModelState.AddModelError("", "Email or password is not correct");
                return View(user);
            }
            var signInResault = await _signInManager.PasswordSignInAsync(existUser, user.Password, true, true);
            if (signInResault.IsLockedOut)
            {
                ModelState.AddModelError("", "Please try again in a few minutes ");
                return View(user);
            }
            if (!signInResault.Succeeded)
            {
                ModelState.AddModelError("", "Email or password is not correct");
                return View(user);
            }
           
            return RedirectToAction("Index", "Home");
        }

        //public async Task<IActionResult> CreateRole()
        //{
        //    await _roleManager.CreateAsync(new IdentityRole { Name = "Member" });
        //    await _roleManager.CreateAsync(new IdentityRole { Name = "Admin" });
        //    await _roleManager.CreateAsync(new IdentityRole { Name = "SuperAdmin" });
        //    return Content("Role yaraldildi");
        //}
    }
}
