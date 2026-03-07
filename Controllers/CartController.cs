using System.Text.Json;
using AesopFinal.Data;
using AesopFinal.Models;
using Microsoft.AspNetCore.Mvc;

namespace AesopFinal.Controllers
{
    public class CartController : Controller
    {
        private AesopDbContext _context;

        public CartController(AesopDbContext context)
        {
            _context = context;
        }

        // Səbət səhifəsi
        public IActionResult Index()
        {
            var cart = GetCart();
            return View(cart);
        }

        // Session-dan səbəti al
        private List<CartItem> GetCart()
        {
            var sessionData = HttpContext.Session.GetString("Cart");
            if (string.IsNullOrEmpty(sessionData))
                return new List<CartItem>();
            return JsonSerializer.Deserialize<List<CartItem>>(sessionData);
        }

        // Session-a səbəti yaz
        private void SaveCart(List<CartItem> cart)
        {
            var jsonCart = JsonSerializer.Serialize(cart);
            HttpContext.Session.SetString("Cart", jsonCart);
        }

        // ✅ Səbətə əlavə et
        [HttpPost]
        public JsonResult AddToCart(int productId)
        {
            var product = _context.Products.Find(productId);
            if (product == null)
                return Json(new { success = false, message = "Məhsul tapılmadı" });

            var cart = GetCart();
            var item = cart.FirstOrDefault(x => x.ProductId == productId);

            if (item != null)
            {
                item.Quantity++;
            }
            else
            {
                cart.Add(new CartItem
                {
                    ProductId = product.Id,
                    Title = product.Title,
                    Price = product.Price,
                    ImageURL = product.ImageURL,
                    SecondaryImageURL = product.SecondaryImageURL,
                    Description = product.Description,
                    Size = product.Size,
                    Quantity = 1
                });
            }

            SaveCart(cart);

            return Json(new
            {
                success = true,
                cartCount = cart.Sum(x => x.Quantity)
            });
        }

        // ✅ Səbətdən sil
        [HttpPost]
        public JsonResult Remove(int productId)
        {
            var cart = GetCart();
            cart.RemoveAll(x => x.ProductId == productId);
            SaveCart(cart);

            return Json(new
            {
                success = true,
                cartCount = cart.Sum(x => x.Quantity)
            });
        }

        // ✅ Miqdarı yenilə
        [HttpPost]
        public JsonResult UpdateQuantity(int productId, int change)
        {
            var cart = GetCart();
            var item = cart.FirstOrDefault(x => x.ProductId == productId);

            if (item != null)
            {
                item.Quantity += change;
                if (item.Quantity <= 0)
                    cart.Remove(item);
            }

            SaveCart(cart);

            return Json(new
            {
                success = true,
                cartCount = cart.Sum(x => x.Quantity)
            });
        }
    }
}