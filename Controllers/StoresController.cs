using Microsoft.AspNetCore.Mvc;

namespace AesopFinal.Controllers
{
    public class StoresController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
