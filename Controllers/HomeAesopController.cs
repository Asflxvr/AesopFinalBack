using AesopFinal.Areas.AdminPanel.ViewModels.UpdateVM;
using AesopFinal.Data;
using AesopFinal.Models;
using AesopFinal.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AesopFinal.Controllers
{
    public class HomeAesopController : Controller
    {

        private AesopDbContext _context { get; }
        public HomeAesopController(AesopDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {

            return View(_context.Products
                 .Include(p => p.Category)
                 .Where(c=>!c.IsDeleted && c.Category.CategoryName == "Home").ToList());
        }
    }
}
