using Arch.Application.Customer;
using Arch.Domain;
using Arch.Infra.Data;
using Arch.Infra.Shared.Cqrs;
using Arch.Infra.Shared.Search;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace Arch.Handler
{
    public class CustomerHandler :
        ICommandHandler<CreateCustomer>,
        IQueryHandler<GetCustomers, IEnumerable<CustomerItem>>
    {
        private readonly ArchContext _archContext;
        private readonly IMapper _mapper;
        public CustomerHandler(ArchContext archContext, IMapper mapper)
        {
            _archContext = archContext;
            _mapper = mapper;
            var config = new MapperConfiguration(c => c.CreateMap<CreateCustomer, Customer>());
        }

        public async Task<CreateCustomer> Handle(CreateCustomer command)
        {
            var commandInput = _mapper.Map<Customer>(command);
            commandInput.Id = Guid.NewGuid();
            await _archContext.AddAsync(commandInput);
            await _archContext.SaveChangesAsync();
            return await Task.FromResult(_mapper.Map<CreateCustomer>(commandInput));
        }

        public IEnumerable<CustomerItem> Handle(GetCustomers query)
        {
            var propsSearch = BuildPropertiesList(query.Search);
            if(propsSearch.Any())
            {
                var  customers = _archContext.Customers.AsQueryable();
                foreach(var item in propsSearch)
                {
                    customers = item.ApplyToQuery(customers);
                }
                return _mapper.Map<IEnumerable<CustomerItem>>(customers).ToList();
            }
            return _mapper.Map<IEnumerable<CustomerItem>>(_archContext.Customers).ToList();
            //if (query.Search.Any())
            //{
            //    return _mapper.Map<IEnumerable<CustomerItem>>(BuildProperties(query.Search).ApplyToQuery(_archContext.Customers)).ToList();
            //} else
            //{
            //    return _mapper.Map<IEnumerable<CustomerItem>>(_archContext.Customers).ToList();
            //}
        }

        public IEnumerable<AbstractSearch> BuildPropertiesList(IDictionary<string, string> search)
        {
            var result = new List<AbstractSearch>();
            var key = string.Empty;
            var val = string.Empty;
            
            foreach (var s in search)
            {
                if (s.Key.Contains("_"))
                {
                    result.Add(BuildAbstractProperty<Customer>(key, val, s.Value));
                }
                else
                {
                    key = s.Key;
                    val = s.Value;
                }
            }
            
            return result;
        }

        private AbstractSearch BuildAbstractProperty<T>(string property, string value, string comparatorValue, string value2 = null)
        {
            AbstractSearch abstractSearch;
            var propertyType = typeof(T).GetProperty(property).PropertyType;
            //var ts = new TypeSwitch()
            //    .Case((string s) => abstractSearch = BuildPropertyText<Customer>(property, value, comparatorValue))
            //    .Case((DateTime d) => abstractSearch = BuildPropertyDate<Customer>(property, value, value2, comparatorValue));
            //ts.Switch(propertyType);

            if (propertyType == typeof(string))
            {

                abstractSearch = BuildPropertyText<Customer>(property, value, comparatorValue);
            }
            else if (propertyType == typeof(DateTime))
            {
                abstractSearch = BuildPropertyDate<Customer>(property, value, value2, comparatorValue);
            }
            else
            {
                abstractSearch = new TextSearch();
            }

            return abstractSearch;
        }

        

        private DateSearch BuildPropertyDate<T>(string property, string dateSearch1, string dateSearch2, string comparatorValue)
        {
            var teste = DateTime.TryParse(dateSearch1, out DateTime resultS1);
            var otherTest = resultS1;
            var criteria = new DateSearch();
            criteria.Property = property;
            criteria.TargetTypeName = typeof(T).AssemblyQualifiedName;
            criteria.SearchTerm = ConvertDate(dateSearch1);
            criteria.SearchTerm2 = ConvertDate(dateSearch2);
            criteria.Comparator = (DateComparators)Enum.Parse(typeof(DateComparators), comparatorValue);

            return criteria;
        }

        public DateTime? ConvertDate(string date)
        {
            if (DateTime.TryParse(date, out DateTime result))
                return result;
            return null;
        }

        private TextSearch BuildPropertyText<T>(string property, string value, string comparatorValue)
        {
            var criteria = new TextSearch();
            criteria.Property = property;
            criteria.TargetTypeName = typeof(T).AssemblyQualifiedName;
            criteria.SearchTerm = value;
            criteria.Comparator = (TextComparators)Enum.Parse(typeof(TextComparators), comparatorValue); ;

            return criteria;
        }

        //public AbstractSearch BuildProperties(IDictionary<string, string> search)
        //{
        //    var key = string.Empty;
        //    var val = string.Empty;
        //    var comparator = TextComparators.Equals;
        //    foreach (var s in search)
        //    {
        //        if (s.Key.Contains("_"))
        //        {
        //            comparator = (TextComparators)Enum.Parse(typeof(TextComparators), s.Value);
        //        } else
        //        {
        //            key = s.Key;
        //            val = s.Value;
        //        }
        //    }

        //    return BuildPropertyText<Customer>(key, val, s.Value); ;
        //}

        

       

        private ExpandoObject ConvertDictToExpando<T>(IDictionary<string, string> input)
        {
            dynamic eo = input.Aggregate(new ExpandoObject() as IDictionary<string, object>,
                            (a, p) => { a.Add(p.Key, p.Value); return a; });

            return eo;
        }
    }

    public class TypeSwitch
    {
        Dictionary<Type, Action<object>> matches = new Dictionary<Type, Action<object>>();
        public TypeSwitch Case<T>(Action<T> action) { matches.Add(typeof(T), (x) => action((T)x)); return this; }
        public void Switch(object x) { matches[x.GetType()](x); }
    }
}
