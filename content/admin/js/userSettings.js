//var module = angular.module('adminApp.controllers.users.custom',['projEvo.services.companies']);

//module.controller('commerceSettingsCtrl', ['$scope', '$location', '$log', '$http', '$routeParams', 'users', 'localize', 'config', 'user','companies',
//function ($scope, $location, $log, $http, $routeParams, users, localize, config,  user, companies) {
function commerceSettingsCtrl ($scope, $location, $log, $http, $routeParams, users, localize, config,  user, companies){
    $scope.companies = [];

    // get the company list
    $http.get(config.get('get_companies') + 'company/' + user.context.company).success(function(data, status,headers,config) {
        $log.info('retrieved data for companies');

        if (data.length > 0 && data[0].code !== null)  {
            _.forEach(data, function(company) {
                $scope.companies.push({
                    code: company.code,
                    name: company.name,
                    enabled: true
                });
            });

            // if a user is restricted to specific companies, uncheck disabled ones
            if ($scope.product.settings.companies !== undefined && $scope.product.settings.companies.length > 0) {
                _.forEach($scope.companies, function(company) {
                    if (_.findIndex($scope.product.settings.companies, { code: company.code }) === -1) {
                        company.enabled = false;
                    }
                });
            }

            $scope.companiesEnabled = _.any($scope.companies, { enabled: true });
            $scope.showCompanies = true;
        }

        $log.debug(JSON.stringify(data));

        //set the list based on the users selections
        //setSalesStatus();
    }).error(function(data,status,headers,config){
            $log.error('error retrieving companies');
        });

    $scope.updateCompanies = function() {
        $scope.product.settings.companies = [];

        if (!_.every($scope.companies, { enabled: true })) {
            _.forEach($scope.companies, function(company) {
                if (company.enabled) {
                    $scope.product.settings.companies.push({
                        code: company.code,
                        name: company.name
                    });
                }
            });
        }

        $scope.companiesEnabled = _.any($scope.companies, { enabled: true });
    };

    $scope.restrictedCustomers = [];

    $scope.setRestrictedCustomer = function(company, customerCode, customerName) {
        var updated = false;

        for (var i = 0; i < $scope.restrictedCustomers.length; i++) {
            if ($scope.restrictedCustomers[i].company === company) {
                $scope.restrictedCustomers[i] = { company: company, code: customerCode, name: customerName };
                updated = true;
                break;
            }
        }


        if (!updated) {
            $scope.restrictedCustomers.push({ company: company, code: customerCode, name: customerName });
        }

        if ($scope.restrictedCustomers.length > 1) {
            $scope.product.settings.permissions.selectCompany = true;
        }
    };

    $scope.getRestrictedCustomer = function(company) {
        var cust = _.find($scope.restrictedCustomers, { company: company });

        if (!cust) {
            cust = { company: company, code: '', name: '' }
        }

        return cust;
    };

    $scope.showSearch = function(company) {
        $scope.searchCompany = company;
        $scope.customers = [];
        $scope.customerListModal = true;
    };

    $scope.searchCustomers = function(searchValue) {
        if (!searchValue) return;

        var address = config.get('get_customers');

        if ($scope.companies.length > 0) {
            address +=  'tenant/' + user.context.company + '/company/' + $scope.searchCompany;
        }
        else {
            address +=  'company/' + user.context.company;
        }

        delete $http.defaults.headers.common['X-Requested-With'];

        $http.get(address + '/name/' + encodeURIComponent(searchValue))
            .success(function(data, status,headers,config){
                $log.debug('retrieved data for customers');
                $scope.customers = data.customers;
                $log.debug(JSON.stringify(data.customers));
            })
            .error(function(data,status,headers,config){
                $log.error('error retrieving customers');
            });
    };

    $scope.selectRestrictedCustomer = function(customerCode, customerName) {
        $scope.setRestrictedCustomer($scope.searchCompany, customerCode, customerName);
        $scope.customerListModal = false;
    };

    //change this to hasProperty
    $scope.userChangeCustomer = (user.hasOwnProperty('data') && user.data.hasOwnProperty('product') && user.data.product.hasOwnProperty('settings') && user.data.product.settings.hasOwnProperty('permissions') && user.data.product.settings.permissions.hasOwnProperty('changeCustomer')) ? user.data.product.settings.permissions.changeCustomer : false ;

    var posOpts = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14'];
    var negOpts = ['00','01','02','03','04','05','06','07','08','09','10','11','12'];
    //default to true to show these
    $scope.hasDocImage = false;
    $scope.hasAcctInfo = false;
    $scope.showTZControl = false;
    $scope.isCompDefault = true;
    $scope.companyTZDefault;
    $scope.companyTZOperator;
    $scope.companyTZHour;
    $scope.companyTZMin;

    //$scope.userType = 'Customer';

    //stuff for the timeZone controls
    $scope.operatorOpts= ['+', '-'];
    $scope.hoursOpts = [];
    $scope.minutesOpts = ['00','30','45'];

    $scope.toggleTZControl = function(){
        $scope.showTZControl =  $scope.showTZControl === false ? true: false;
    };

    var evaluateTimeZone = function(){
        $scope.isCompDefault = $scope.companyTZDefault === $scope.product.settings.timeZone.value? true : false;
    };

    $scope.changeOperator = function(){
        //reset the selected value to default
        $log.debug('operator change: ' + $scope.product.settings.timeZone.operator);

        $scope.product.settings.timeZone.hours = '00';
        $scope.product.settings.timeZone.minutes = '00';


        if ($scope.product.settings.timeZone.operator === '+'){
            //reset the hours array.
            $log.debug('setting hours options')
            $scope.hoursOpts = posOpts;
        }
        else if ($scope.product.settings.timeZone.operator === '-'){
            $log.debug('setting hours options')
            $scope.hoursOpts = negOpts;
        }

        $scope.product.settings.timeZone.value = $scope.product.settings.timeZone.operator +  $scope.product.settings.timeZone.hours + $scope.product.settings.timeZone.minutes;

        evaluateTimeZone();

    };

    $scope.userTypeChange = function(usertype){
        $log.debug('user type change');

        if ($scope.product.hasOwnProperty('code')){
            $scope.userType = usertype;

            if($scope.userType === 'Customer'){
                $log.info('Setting customer user')

                $scope.product.settings.permissions.changeCustomer = false;
                $scope.product.settings.sales=[];
                $scope.salespeople = [];

                if ($scope.product.settings.customer.code !== undefined && $scope.product.settings.customer.code === '') {
                    $scope.product.settings.customer = [
                        { company: null, code: $scope.product.settings.customer.code, name: $scope.product.settings.customer.name }
                    ];
                }

                $scope.restrictedCustomers = $scope.product.settings.customer;

            }
            else if ($scope.userType === 'Company'){
                $log.info('Setting company user');

                //get the salespeople from the commerce rest service
                delete $http.defaults.headers.common['X-Requested-With'];

                var address = config.get('get_sales_people') + 'company/' + user.context.company;

                $http.get(address).success(function(data, status,headers,config){
                    $log.info('retrieved data for salespeople');
                    $scope.salespeople = data;

                    $log.debug(JSON.stringify(data));

                    //set the list based on the users selections
                    setSalesStatus();
                }).error(function(data,status,headers,config){
                        $log.error('error retrieving salespeople');
                    });

                $scope.product.settings.customer = [];

                $scope.custSearchValue = '';

                $scope.product.settings.permissions.changeCustomer = true;
                $scope.product.settings.permissions.futureOrderEmail = false;
            }

        }

    };

    $scope.timeChange = function(){
        $log.debug('Hours or minutes time zone value changed')

        $scope.product.settings.timeZone.value = $scope.product.settings.timeZone.operator +  $scope.product.settings.timeZone.hours + $scope.product.settings.timeZone.minutes;

        //Is the value the company default??
        evaluateTimeZone();

        $log.info('time zone value: ' + $scope.product.settings.timeZone.value);
    };

    $scope.clearCustomerListModal = function(){
        //clear the search results list
        $scope.customers = [];

        //close the modal
        $scope.customerListModal =false;
    };

    $scope.roleChange = function(){

        $scope.product.roles = $scope.product.settings.permissions.isAdmin ? ['appadmin'] : ['appuser'];

    };

    var getPersonIndex = function(code){
        for(var i=0; i<$scope.product.settings.sales.length; i++){
            if($scope.product.settings.sales[i].code === code){
                return i;
            }
        }
        return -1;
    };

    $scope.setSalesPeople = function(person, action){
        $log.info('Setting salesperson list');

        if (action){
            $log.debug('adding person: ' + person.fullName);
            $scope.product.settings.sales.push(person);
        }
        else{
            $log.debug('removing person: ' + person.fullName);

            var index = getPersonIndex(person.code);
            if (index != -1){
                $scope.product.settings.sales.splice(index,1);
            }
        }

    };

    var setSalesStatus = function(){
        for(var i =0; i<$scope.product.settings.sales.length; i++){
            for(var x =0; x<$scope.salespeople.length; x++){
                if($scope.salespeople[x].code === $scope.product.settings.sales[i].code){
                    $scope.salespeople[x].status = $scope.product.settings.sales[i].status;
                    break;
                }
            }
        }
    };

    var setDefaultTimeZone = function(timeZoneVals){
        $scope.product.settings.timeZone.operator = timeZoneVals.operator;
        $scope.product.settings.timeZone.hours = timeZoneVals.hours;
        $scope.product.settings.timeZone.minutes = timeZoneVals.minutes;
        $scope.product.settings.timeZone.value = timeZoneVals.value;

    };

    //from the list of products, get the time zone value for the product context
    var getDefaultCompanyTZValue = function(products){
        $scope.companyTZDefault = products.settings.company.timeZone.value;
        $scope.companyTZOperator = products.settings.company.timeZone.operator;
        $scope.companyTZHour = products.settings.company.timeZone.hours;
        $scope.companyTZMin = products.settings.company.timeZone.minutes;
    };

    //the permissions will be set for the controller to use
    $scope.$on('getUser', function() {
        //set the permissions from the parent scope;
        $log.info('setting local scopes for settings');

        //get the default company data
        $scope.company = {};

        $scope.compContext = (!user.context.company) ? '' : user.context.company;
        $scope.prodContext = (!user.context.product) ? '' : user.context.product;

        companies.aggregate({company: $scope.compContext, product: $scope.prodContext}).then(function(response){
            $scope.company = response.result[0];

            //are the account receivable and doc image settings available?
            $scope.hasDocImage = ($scope.company.hasOwnProperty('products') && $scope.company.products.hasOwnProperty('settings') && $scope.company.products.settings.hasOwnProperty('company') && $scope.company.products.settings.company.hasOwnProperty('docImage')) ? $scope.company.products.settings.company.docImage : false;
            $scope.hasAcctInfo = ($scope.company.hasOwnProperty('products') && $scope.company.products.hasOwnProperty('settings') && $scope.company.products.settings.hasOwnProperty('company') && $scope.company.products.settings.company.hasOwnProperty('acctInfo')) ? $scope.company.products.settings.company.acctInfo : false;

            //Set the permissions to false if they are hidden
            $scope.product.settings.permissions.docImage = (!$scope.hasDocImage) ? $scope.hasDocImage : $scope.product.settings.permissions.docImage;
            $scope.product.settings.permissions.acctInfo = (!$scope.hasAcctInfo) ? $scope.hasAcctInfo : $scope.product.settings.permissions.acctInfo;


            getDefaultCompanyTZValue($scope.company.products);

            if(!$scope.editMode){
                //set the default timeZone to the company timeZone
                setDefaultTimeZone($scope.company.products.settings.company.timeZone);
                //set to company default.  Set the flag
                $scope.isCompDefault = true;
            }


            //set default role for new user
            if ($scope.product.roles.length < 1){
                $scope.product.roles = ['appuser'];
            }

            //just in case nothing is set.
            if (!$scope.product.settings.timeZone.operator || !$scope.product.settings.timeZone.hours || !$scope.product.settings.timeZone.minutes){
                $scope.hoursOpts = posOpts;
                $scope.product.settings.timeZone = { 'operator': $scope.operatorOpts[0],
                    'hours': $scope.hoursOpts[0],
                    'minutes': $scope.minutesOpts[0]};
            }

            //Set the options for the timezone based on the sign
            $scope.hoursOpts = $scope.product.settings.timeZone.operator === "+" ? posOpts: negOpts;

            //evaluateTimeZone
            evaluateTimeZone();

            // set the search value if we have something to show
            if ($scope.product.settings.customer.code && $scope.product.settings.customer.name)
                $scope.custSearchValue = $scope.product.settings.customer.code + ' ' + $scope.product.settings.customer.name;

            if ($scope.product.settings.customer.code !== undefined && $scope.product.settings.customer.hasOwnProperty('code')) {
                var restrictedCustomer = {
                    company: null,
                    code: $scope.product.settings.customer.code,
                    name: $scope.product.settings.customer.name
                };

                $scope.product.settings.customer = [];
                $scope.product.settings.customer.push(restrictedCustomer);
            }

            $scope.restrictedCustomers = $scope.product.settings.customer;

            //set the user type default
            $scope.userType = $scope.product.settings.permissions.changeCustomer ? 'Company' : 'Customer';

        }, function(reason) {
            $log.error(reason);
        });

    });

    $scope.$on('editUser', function(){
        log.debug('here as an edit');
    });
}
//}]);



