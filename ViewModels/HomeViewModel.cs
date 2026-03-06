using AesopFinal.Models;

namespace AesopFinal.ViewModels
{
    public class HomeViewModel
    {
        public List<Product> Products { get; set; }
        public List<Recommend> Recommends { get; set; }
        public List<Category> Categories { get; set; }
    }
}
