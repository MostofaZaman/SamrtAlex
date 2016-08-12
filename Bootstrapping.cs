using MVCArch.Data.Infrastructure;
using MVCArch.Data.Repositories;
using MVCArch.Service;
using System.Linq;
using Autofac;
using Autofac.Integration.WebApi;
using System.Web.Mvc;
using System.Web.Http;
using System.Reflection;

namespace MVCArch.WebApi.App_Start
{
    public static class Bootstrapping
    {
        public static void Run()
        {
            SetAutofacContainer();
            //Configure AutoMapper
            //AutoMapperConfiguration.Configure();
        }

        private static void SetAutofacContainer()
        {
            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerApiRequest();
            builder.RegisterType<DbFactory>().As<IDbFactory>().InstancePerApiRequest();

            // Repositories
            builder.RegisterAssemblyTypes(typeof(EmployeeRepository).Assembly)
                .Where(t => t.Name.EndsWith("Repository"))
                .AsImplementedInterfaces().InstancePerApiRequest();
            // Services
            builder.RegisterAssemblyTypes(typeof(EmployeeService).Assembly)
               .Where(t => t.Name.EndsWith("Service"))
               .AsImplementedInterfaces().InstancePerApiRequest();

            IContainer container = builder.Build();
            //DependencyResolver.SetResolver(new AutofacWebApiDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container); //Set the WebApi DependencyResolver
        }
    }
}