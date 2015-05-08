angular.module('evo.templates').
run(['$templateCache', function($templateCache) {
  $templateCache.put('common/directives/about/about.html', '<div id="evo-about-container" ng-show="isOpen"> <div class="modal"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <img ng-src="{{ logo }}" ng-show="logo.length"> <h3>{{ "txtAbout" | i18n }}</h3> </div> <!-- /.modal-header --> <div class="modal-body"> <div class="evo-about-product"> <h4>{{ productTitle }}</h4> <ul> <li class="evo-about-version"> <label>{{ "lblProductVersion" | i18n }}:</label>&nbsp;{{ meta.build.app.version }} </li> <li class="evo-about-date"> <label>{{ "lblProductBuildDate" | i18n }}:</label>&nbsp;{{ meta.build.app.date | date: "longDate" }} </li> </ul> </div> <hr ckass="cai-background-color-primary"> <!-- /.evo-about-product --> <div class="evo-about-core"> <h4>Core</h4> <ul> <li class="evo-about-version"> <label>{{ "lblCoreLibraryVersion" | i18n }}:</label>&nbsp;{{ meta.build.core.version }} </li> <li class="evo-about-date"> <label>{{ "lblCoreLibraryBuildDate" | i18n }}:</label>&nbsp;{{ meta.build.core.date | date: "longDate" }} </li> </ul> </div> <!-- /.evo-about-core --> </div> <!-- /.modal-body --> <div class="modal-footer"> <button class="btn btn-block btn-primary evo-btn-primary" ng-click="closeModal()">{{ "txtClose" | i18n }}</button> </div> <!-- /.modal-footer --> </div> </div> </div> <!-- /.modal --> <div class="modal-backdrop"></div> </div> <!-- /#evo-about-modal -->');
  $templateCache.put('common/directives/breadcrumb/breadcrumb.html', '<ul class="breadcrumb"> <li ng-repeat="route in crumbs"> <a href="" ng-href="{{ route.path }}" ng-class="{ disabled: $last }">{{ route.label }}</a> </li> </ul> <!-- /.breadcrumb -->');
  $templateCache.put('common/directives/table/table.html', '<div class="evo-table-toolbar" ng-show="hasToolbar()" ng-class="{ inactive: !hasToolbar() }"> <form role="search" class="form-inline"> <div class="form-group"> <div class="input-group"> <input type="text" class="form-control evo-control" evo-placeholder="{{ getPlaceholder(options.toolbar.search) || \'Search\' }}" ng-model="search.query" ng-show="options.toolbar.search" ng-change="onSearch()"> <div class="input-group-btn" ng-show="hasSearchBy()" dropdown> <button type="button" class="btn btn-default" dropdown-toggle>{{ options.thead.rename[search.by] || search.by || "" | type : "string" : "title" }} <span class="caret"></span></button> <ul class="dropdown-menu" role="menu"> <li ng-repeat="option in options.toolbar.search.by"> <a href="" ng-click="onSearchByClick(option)">{{ options.thead.rename[option] || option | type : "string" : "title" }}</a> </li> </ul> </div> </div> <!-- /.input-group --> </div> <div class="form-group"> <div class="btn-group evo-btn-group"> <a href="" ng-click="button.onclick()" ng-class="setGetButtonClass(button, \'toolbar\')" ng-repeat="button in options.toolbar.buttons"> <i ng-show="hasIcon(button)" ng-class="button.icon"></i> {{ button.text || \'\' }} </a> </div> </div> </form> </div> <!-- /.evo-table-toolbar --> <div class="evo-table-container"> <div class="evo-thead"> <table class="table table-bordered"> <thead> <tr> <th ng-repeat="column in columns" ng-click="onTheadClick($event, column, options.columns.indexOf(column))" class="evo-link" ng-class="{\'evo-selected\': isSelectedOrder(column), asc: isAsc(column), desc: isDesc(column) }" ng-style="{ \'text-align\': options.columns[column].textAlign || \'left\' }"> {{ options.thead.rename[column] || column | type : "string" : "title" }} </th> </tr> </thead> </table> </div> <!-- /.evo-thead --> <div class="evo-tbody"> <table class="table table-bordered"> <tbody> <tr ng-repeat="item in dados | orderBy: order | startFrom : (pagination.currentPage - 1) * pagination.itemsPerPage | limitTo: pagination.itemsPerPage"> <td ng-repeat="column in columns" ng-class="{\'evo-selected\': isSelectedOrder(column)}" ng-style="{ width: options.columns[column].width, \'text-align\': options.columns[column].textAlign || \'left\' }"> <a href="" ng-click="options.columns[column].onclick($event, item[column], column, data.indexOf(item))" ng-show="isButton(options.columns[column])" ng-class="setGetButtonClass(options.columns[column])"> <i ng-show="hasIcon(options.columns[column])" ng-class="options.columns[column].icon"></i> {{ options.columns[column].text || item[column] }} </a> <span ng-hide="isButton(options.columns[column])"> {{ item[column] | type : options.columns[column].type : options.columns[column].fmt }} </span> </td> </tr> </tbody> </table> </div> <!-- /.evo-tbody --> </div> <!--/.evo-table-container --> <div class="evo-tfoot"> <pagination ng-show="isPaginationVisible()" ng-model="pagination.currentPage" items-per-page="pagination.itemsPerPage" class="pagination-sm" total-items="dados.length" rotate="false"></pagination> </div> <!-- /.evo-tfoot -->');
}]);
