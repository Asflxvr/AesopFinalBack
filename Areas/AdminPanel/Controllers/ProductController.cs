using AesopFinal.Areas.AdminPanel.ViewModels.CreateVM;
using AesopFinal.Areas.AdminPanel.ViewModels.UpdateVM;
using AesopFinal.Data;
using AesopFinal.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace AesopFinal.Areas.AdminPanel.Controllers
{
    [Area("AdminPanel")]
    public class ProductController : Controller
    {
        private AesopDbContext _context { get; }
        public ProductController(AesopDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View(_context.Products
    .Include(x => x.Category)
    .ToList());
        }
        public IActionResult Create()
        {
            ViewBag.Categories = _context.Categories
       .Where(x => !x.IsDeleted)
       .ToList();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ProductCreateVM vm)
        {
            //if (!ModelState.IsValid) return View(vm);
            if (!ModelState.IsValid)
            {
                ViewBag.Categories = _context.Categories
                    .Where(x => !x.IsDeleted)
                    .ToList();

                return View(vm);
            }
            Product cake = new Product
            {
                IsDeleted = false,
                Title = vm.title,
                Description = vm.description,
                Price = vm.price,
                Size = vm.Size,
                CategoryId = vm.categoryId
            };
            if (vm.imageFile != null)
            {
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(vm.imageFile.FileName);
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assets" , "images", fileName);
                using (FileStream stream = new FileStream(filePath, FileMode.Create))
                {
                    await vm.imageFile.CopyToAsync(stream);
                }
                cake.ImageURL = fileName;
            }
            if (vm.imageFileSecond != null)
            {

                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(vm.imageFileSecond.FileName);
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assets", "images", fileName);
                using (FileStream stream = new FileStream(filePath, FileMode.Create))
                {
                    await vm.imageFileSecond.CopyToAsync(stream);
                }
                cake.SecondaryImageURL = fileName;
            }
            await _context.AddAsync(cake);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return BadRequest();
            Product exist = _context.Products.Where(p => !p.IsDeleted).FirstOrDefault(p => p.Id == id);
            if (exist == null) return NotFound();
            exist.IsDeleted = true;
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        public IActionResult Update(int? id)
        {
            if (id == null) return BadRequest();

            Product cake = _context.Products
                .FirstOrDefault(s => s.Id == id);

            if (cake == null) return NotFound();

            ViewBag.Categories = _context.Categories
                .Where(x => !x.IsDeleted)
                .ToList();

            ProductUpdateVM vm = new ProductUpdateVM
            {
                title = cake.Title,
                description = cake.Description,
                price = cake.Price,
                Size = cake.Size,
                categoryId = cake.CategoryId
            };

            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(ProductUpdateVM vm, int? id)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Categories = _context.Categories
                    .Where(x => !x.IsDeleted)
                    .ToList();

                return View(vm);
            }

            Product cake = _context.Products
                .FirstOrDefault(s => s.Id == id);

            if (cake == null) return NotFound();

            cake.Title = vm.title;
            cake.Description = vm.description;
            cake.Price = vm.price;
            cake.Size = vm.Size;
            cake.CategoryId = vm.categoryId;

            if (vm.imageFile != null)
            {
                string fileName = Guid.NewGuid() + Path.GetExtension(vm.imageFile.FileName);
                string filePath = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot", "assets", "images",
                    fileName);

                using FileStream stream = new FileStream(filePath, FileMode.Create);
                await vm.imageFile.CopyToAsync(stream);

                cake.ImageURL = fileName;
            }

            if (vm.imageFileSecond != null)
            {
                string fileName = Guid.NewGuid() + Path.GetExtension(vm.imageFileSecond.FileName);
                string filePath = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot", "assets", "images",
                    fileName);

                using FileStream stream = new FileStream(filePath, FileMode.Create);
                await vm.imageFileSecond.CopyToAsync(stream);

                cake.SecondaryImageURL = fileName;
            }

            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }


        [HttpGet]
        public async Task<IActionResult> Activate(int? id)
        {
            if (id == null) return BadRequest();
            Product exist = _context.Products.Where(p => p.IsDeleted).FirstOrDefault(p => p.Id == id);
            if (exist == null) return NotFound();
            exist.IsDeleted = false;
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

    }
}
