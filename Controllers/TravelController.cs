using Microsoft.AspNetCore.Mvc;

namespace AesopFinal.Controllers
{
    public class TravelController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
