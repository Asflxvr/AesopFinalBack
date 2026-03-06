using System.Diagnostics;
using AesopFinal.Data;
using AesopFinal.Models;
using AesopFinal.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace AesopFinal.Controllers
{
    public class HomeController : Controller
    {
        private AesopDbContext _context { get; }
        public HomeController(AesopDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {

            HomeViewModel homeVM = new HomeViewModel()
            {
                Products = _context.Products.ToList(),
                Recommends = _context.Recommends.ToList(),
                Categories = _context.Categories.ToList()
            };
            return View(homeVM);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
