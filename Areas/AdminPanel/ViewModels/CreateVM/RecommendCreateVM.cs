using System.ComponentModel.DataAnnotations;

namespace AesopFinal.Areas.AdminPanel.ViewModels.CreateVM
{
    public class RecommendCreateVM
    {
        public string? imageUrl { get; set; }

        public string readingMinute { get; set; }
        public string category { get; set; }
        public string title { get; set; }

        public IFormFile? imageFile { get; set; }
    }
}
