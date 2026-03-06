using AesopFinal.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AesopFinal.Controllers
{
    public class SkinCareController : Controller
    {
        private AesopDbContext _context { get; }
        public SkinCareController(AesopDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {

            return View(_context.Products
                 .Include(p => p.Category)
                 .Where(c => !c.IsDeleted && c.Category.CategoryName == "Skin Care").ToList());
        }
    }
}
