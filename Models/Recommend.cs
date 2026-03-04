namespace AesopFinal.Models
{
    public class Recommend:BaseModel
    {
        public string? ImageUrl { get; set; }

        public string ReadingMinute { get; set; }
        public string Category { get; set; }
        public string Title { get; set; }

    }
}
