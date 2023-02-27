using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.UserService.DAC
{

    public class Users
    {
        public Users()
        {
             this.EmailAddress = String.Empty;
            this.Password = String.Empty;
            this.FirstName = String.Empty;
            this.LastName = String.Empty;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string EmailAddress { get; set; }

        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string? Gender { get; set; }

        public int PrimaryMobileNo { get; set; }

        public UserDetail UserDetail { get; set; }
    }
}
