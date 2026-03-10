using AesopFinal.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AesopFinal.Controllers
{
    public class FragranceController : Controller
    {
        private AesopDbContext _context { get; }
        public FragranceController(AesopDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {

            return View(_context.Products
                 .Include(p => p.Category)
                 .Where(c => !c.IsDeleted && c.Category.CategoryName == "Fragrance").ToList());
        }
    }
}
