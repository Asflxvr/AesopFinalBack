using Microsoft.AspNetCore.Mvc;

namespace AesopFinal.Controllers
{
    public class HomeAesopController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
