using Microsoft.AspNetCore.Mvc;

namespace AesopFinal.Controllers
{
    public class FaqsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
