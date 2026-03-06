using Microsoft.AspNetCore.Identity;

namespace AesopFinal.Models
{
    public class AppUser:IdentityUser
    {
        public string? FullName { get; set; }
        
        public bool IsActivated { get; set; }
    }
}
