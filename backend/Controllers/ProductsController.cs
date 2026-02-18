using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/products")]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly ShopKartDbContext _context;

        public ProductsController(ShopKartDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetProducts(int page = 1, int pageSize = 10, string search = "")
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(p => p.Name.Contains(search));

            var totalCount = query.Count();

            var items = query
                .OrderByDescending(p => p.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new PagedResult<Product>
            {
                Items = items,
                TotalCount = totalCount
            });
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var product = _context.Products.Find(id);
            return product == null ? NotFound() : Ok(product);
        }

        [HttpPost]
        public IActionResult Add(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            return Ok(product);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Product product)
        {
            var p = _context.Products.Find(id);
            if (p == null) return NotFound();

            p.Name = product.Name;
            p.Price = product.Price;
            p.ImageUrl = product.ImageUrl;
            _context.SaveChanges();

            return Ok(p);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var p = _context.Products.Find(id);
            if (p == null) return NotFound();

            _context.Products.Remove(p);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
