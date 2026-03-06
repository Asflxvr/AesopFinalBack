using AesopFinal.Areas.AdminPanel.ViewModels.CreateVM;
using AesopFinal.Areas.AdminPanel.ViewModels.UpdateVM;
using AesopFinal.Data;
using AesopFinal.Models;
using Microsoft.AspNetCore.Mvc;

namespace AesopFinal.Areas.AdminPanel.Controllers
{
    [Area("AdminPanel")]
    public class CategoryController : Controller
    {
        private AesopDbContext _context { get; }
        public CategoryController(AesopDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View(_context.Categories);
        }
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CategoryCreateVm vm)
        {
            if (!ModelState.IsValid) return View(vm);
            Category category = new Category
            {
                IsDeleted = false,
                CategoryName = vm.categoryName
            };
     
            await _context.AddAsync(category);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return BadRequest();
            Category exist = _context.Categories.Where(p => !p.IsDeleted).FirstOrDefault(p => p.Id == id);
            if (exist == null) return NotFound();
            exist.IsDeleted = true;
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        public IActionResult Update(int? id)
        {
            if (id == null) return BadRequest();
            Category category = _context.Categories.FirstOrDefault(s => s.Id == id);
            if (category == null) return NotFound();
            CategoryUpdateVm vm = new CategoryUpdateVm
            {
                categoryName = category.CategoryName
            };
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(CategoryUpdateVm vm)
        {
            if (!ModelState.IsValid) return View();
            Category category = _context.Categories.FirstOrDefault(s => s.Id == vm.id);
            if (category == null) return NotFound();
            category.CategoryName = vm.categoryName;
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }


        [HttpGet]
        public async Task<IActionResult> Activate(int? id)
        {
            if (id == null) return BadRequest();
            Category exist = _context.Categories.Where(p => p.IsDeleted).FirstOrDefault(p => p.Id == id);
            if (exist == null) return NotFound();
            exist.IsDeleted = false;
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }


    }
}
