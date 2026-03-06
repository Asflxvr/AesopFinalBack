using System.ComponentModel.DataAnnotations;

namespace AesopFinal.Models
{
    public class Product:BaseModel
    {
        [Required, Range(0, 200)]
        public decimal Price { get; set; }
        [Required, MinLength(3), MaxLength(30)]
        public string Title { get; set; }
        [Required, MaxLength(120)]
        public string Description { get; set; }
        public string? ImageURL { get; set; }
        public string? SecondaryImageURL { get; set; }
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

        public int? CategoryId { get; set; } = 0;
        public Category? Category { get; set; }
    }
}
