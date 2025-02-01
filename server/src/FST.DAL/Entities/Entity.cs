using System.ComponentModel.DataAnnotations;

namespace FantasySpellTracker.DAL.Entities;

public abstract class Entity
{
    public Entity()
    {
        CreatedDate = DateTime.UtcNow;
    }

    [Key]
    public int Id { get; set; }
    public DateTime CreatedDate { get; set; }
}
