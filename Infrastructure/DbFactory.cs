using MVCArch.Data.Infrastructure;
using MVCArch.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVCArch.Data.Infrastructure
{
    public class DbFactory : Disposable, IDbFactory
    {
        MVCArchContext dbContext;

        public MVCArchContext Init()
        {
            return dbContext ?? (dbContext = new MVCArchContext());
        }

        protected override void DisposeCore()
        {
            if (dbContext != null)
                dbContext.Dispose();
        }
    }
}
