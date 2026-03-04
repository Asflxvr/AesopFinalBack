using AesopFinal.Areas.AdminPanel.ViewModels.CreateVM;
using AesopFinal.Areas.AdminPanel.ViewModels.UpdateVM;
using AesopFinal.Areas.AdminPanel.ViewModels.UpdateVM.AesopFinal.Areas.AdminPanel.ViewModels.UpdateVM;
using AesopFinal.Data;
using AesopFinal.Models;
using Microsoft.AspNetCore.Mvc;

namespace AesopFinal.Areas.AdminPanel.Controllers
{
    [Area("AdminPanel")]
    public class RecommendController : Controller
    {
        private AesopDbContext _context { get; }
        public RecommendController(AesopDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View(_context.Recommends);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        
        public async Task<IActionResult> Create(RecommendCreateVM vm)
        {
            if (!ModelState.IsValid) return View(vm);

            Recommend recommend = new Recommend
            {
                Title = vm.title,
                ReadingMinute = vm.readingMinute,
                Category = vm.category,
                IsDeleted = false
            };

            if (vm.imageFile != null)
            {
                string fileName = Guid.NewGuid() + Path.GetExtension(vm.imageFile.FileName);
                string filePath = Path.Combine(Directory.GetCurrentDirectory(),
                                               "wwwroot", "assets", "images", fileName);

                using (FileStream stream = new FileStream(filePath, FileMode.Create))
                {
                    await vm.imageFile.CopyToAsync(stream);
                }

                recommend.ImageUrl = fileName;
            }


            await _context.Recommends.AddAsync(recommend);
            await _context.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return BadRequest();

            Recommend exist = _context.Recommends
                .FirstOrDefault(r => r.Id == id);

            if (exist == null) return NotFound();
            exist.IsDeleted = true;
            await _context.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        public IActionResult Update(int? id)
        {
            if (id == null) return BadRequest();

            Recommend item = _context.Recommends
                .FirstOrDefault(r => r.Id == id);

            if (item == null) return NotFound();

            RecommendUpdateVM vm = new RecommendUpdateVM
            {
            title = item.Title,
            readingMinute = item.ReadingMinute,
            category = item.Category
            };

            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(RecommendUpdateVM vm)
        {
            if (!ModelState.IsValid) return View(vm);

            Recommend recommend = _context.Recommends
                .FirstOrDefault(r => r.Id == vm.id);

            if (recommend == null) return NotFound();

            recommend.Title = vm.title;
            recommend.ReadingMinute = vm.readingMinute;
            recommend.Category = vm.category;

            if (vm.imageFile != null)
            {
                string fileName = Guid.NewGuid() + Path.GetExtension(vm.imageFile.FileName);
                string filePath = Path.Combine(Directory.GetCurrentDirectory(),
                                               "wwwroot", "assets", "images", fileName);

                using (FileStream stream = new FileStream(filePath, FileMode.Create))
                {
                    await vm.imageFile.CopyToAsync(stream);
                }

                recommend.ImageUrl = fileName;
            }

          

            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }


        [HttpGet]
        public async Task<IActionResult> Activate(int? id)
        {
            if (id == null) return BadRequest();
            Recommend exist = _context.Recommends.Where(p => p.IsDeleted).FirstOrDefault(p => p.Id == id);
            if (exist == null) return NotFound();
            exist.IsDeleted = false;
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
