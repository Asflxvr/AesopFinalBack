using Microsoft.AspNetCore.Mvc;

namespace AesopFinal.Controllers
{
    public class HairController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
