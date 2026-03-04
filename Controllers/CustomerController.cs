using Microsoft.AspNetCore.Mvc;

namespace AesopFinal.Controllers
{
    public class CustomerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
