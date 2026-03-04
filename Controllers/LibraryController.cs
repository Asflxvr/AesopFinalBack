using Microsoft.AspNetCore.Mvc;

namespace AesopFinal.Controllers
{
    public class LibraryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
