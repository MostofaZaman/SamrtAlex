using Cric.Model;
using Cric.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Cric.WebApi.Controllers
{
    public class GameStartController : ApiController
    {
        private readonly ICategoryService categoryService;
        private readonly IGadgetService gadgetService;
        
        public GameStartController(ICategoryService categoryService, IGadgetService gadgetService)
        {
            this.categoryService = categoryService;
            this.gadgetService = gadgetService;
        }

        // GET: Home
        [HttpGet]
        public HttpResponseMessage Index()
        {
            //IEnumerable<CategoryViewModel> viewModelGadgets;
            IEnumerable<Category> categories;

            categories = categoryService.GetCategories(null).ToList();
            var json = new JavaScriptSerializer().Serialize(categories);
            //viewModelGadgets = Mapper.Map<IEnumerable<Category>, IEnumerable<CategoryViewModel>>(categories);
            return Request.CreateResponse(HttpStatusCode.OK, new { json } );
        }
    }
}
