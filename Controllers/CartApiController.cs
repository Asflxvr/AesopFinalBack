using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;

namespace YourProject.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartApiController : ControllerBase
    {
        // Basit bellek içi sepet deposu (gerçek projede veritabanı kullanın)
        private static ConcurrentDictionary<string, List<CartItem>> _userCarts = new();

        // Sepeti getir
        [HttpGet]
        public IActionResult GetCart()
        {
            var userId = GetUserId();
            var cart = _userCarts.GetOrAdd(userId, new List<CartItem>());
            return Ok(new { items = cart, total = cart.Sum(x => x.Price * x.Quantity) });
        }

        // Sepete ürün ekle
        [HttpPost("add")]
        public IActionResult AddToCart([FromBody] CartItem item)
        {
            var userId = GetUserId();
            var cart = _userCarts.GetOrAdd(userId, new List<CartItem>());

            var existingItem = cart.FirstOrDefault(x => x.Id == item.Id && x.Size == item.Size);
            if (existingItem != null)
            {
                existingItem.Quantity++;
            }
            else
            {
                item.Quantity = 1;
                cart.Add(item);
            }

            return Ok(new
            {
                success = true,
                message = $"{item.Name} added to cart",
                cartCount = cart.Sum(x => x.Quantity),
                total = cart.Sum(x => x.Price * x.Quantity)
            });
        }

        // Sepetten ürün çıkar
        [HttpPost("remove")]
        public IActionResult RemoveFromCart([FromBody] CartItem item)
        {
            var userId = GetUserId();
            if (_userCarts.TryGetValue(userId, out var cart))
            {
                var existingItem = cart.FirstOrDefault(x => x.Id == item.Id && x.Size == item.Size);
                if (existingItem != null)
                {
                    cart.Remove(existingItem);
                }
            }

            return Ok(new { success = true });
        }

        // Ürün miktarını güncelle
        [HttpPost("update")]
        public IActionResult UpdateQuantity([FromBody] CartUpdateRequest request)
        {
            var userId = GetUserId();
            if (_userCarts.TryGetValue(userId, out var cart))
            {
                var item = cart.FirstOrDefault(x => x.Id == request.Id && x.Size == request.Size);
                if (item != null)
                {
                    item.Quantity = request.Quantity;
                    if (item.Quantity <= 0)
                    {
                        cart.Remove(item);
                    }
                }
            }

            return Ok(new { success = true });
        }

        // Sepeti temizle
        [HttpPost("clear")]
        public IActionResult ClearCart()
        {
            var userId = GetUserId();
            _userCarts.TryRemove(userId, out _);
            return Ok(new { success = true });
        }

        private string GetUserId()
        {
            // Gerçek projede User.Identity'dan alın
            // Şimdilik session ID veya IP kullanalım
            return HttpContext.Connection.RemoteIpAddress?.ToString() ?? "anonymous";
        }
    }

    public class CartItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Size { get; set; }
        public string ImageUrl { get; set; }
        public int Quantity { get; set; }
    }

    public class CartUpdateRequest
    {
        public string Id { get; set; }
        public string Size { get; set; }
        public int Quantity { get; set; }
    }
}