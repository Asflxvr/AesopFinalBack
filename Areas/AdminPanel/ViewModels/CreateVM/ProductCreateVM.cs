using System.ComponentModel.DataAnnotations;
using AesopFinal.Models;

namespace AesopFinal.Areas.AdminPanel.ViewModels.CreateVM
{
    public class ProductCreateVM
    {
        [Required, Range(0, 200)]
        public decimal price { get; set; }
        [Required,MinLength(3), MaxLength(30)]
        public string title { get; set; }
        [Required, MaxLength(120)]
        public string description { get; set; }
        public string? imageURL { get; set; }
        public string? secondaryImageURL { get; set; }
        public IFormFile? imageFile { get; set; }
        public IFormFile? imageFileSecond { get; set; }
        public Size Size { get; set; }
        public decimal GetActualSize()
        {
            return Size switch
            {
                Size.Small => 2.0m,
                Size.Large => 3.4m,
                Size.ExtraLarge => 17m
            };
        }
    }
}
