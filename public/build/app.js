angular.module("rallly",["ui.router","ngResource","ngFx","btford.modal"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,n){n.html5Mode(!0),t.otherwise("/notfound"),e.state("index",{url:"/",templateUrl:"templates/home.html",controller:"HomeCtrl"}).state("newevent",{url:"/new",templateUrl:"templates/newevent.html",controller:"NewEventCtrl"}).state("about",{url:"/about",templateUrl:"templates/about.html",controller:"AboutCtrl"}).state("notfound",{url:"/notfound",templateUrl:"templates/notfound.html"}).state("editevent",{url:"/:id/edit",templateUrl:"templates/editevent.html",controller:"EditEventCtrl"}).state("event",{url:"/:id",templateUrl:"templates/event.html",controller:"EventCtrl"})}]).factory("Event",["$resource",function(e){return e("/api/event/:id",{id:"@_id"},{update:{method:"PUT"}})}]).factory("Participant",["$resource",function(e){return e("/api/event/:id/participant/:pid",{id:"@_id",pid:"@pid"},{update:{method:"PUT"}})}]),angular.module("rallly").controller("AboutCtrl",function(){$(".nav-link").removeClass("active"),$(".nav-link[href='/about']").addClass("active")}),angular.module("rallly").controller("EditEventCtrl",["$scope","$http","$state","$timeout","Event","ConfirmModal",function(e,t,n,a,r,i){var o=n.params.id;e.event=r.get({id:o},function(t){for(var n=[],a=0;a<t.dates.length;a++)n.push(new Date(t.dates[a]));$("[data-datepicker]").datepicker("setDates",n),e.master=angular.copy(e.event)},function(){n.go("notfound")}),e.didChange=function(){return JSON.stringify(e.master)!=JSON.stringify(e.event)},e.didChangeDates=function(){return JSON.stringify(e.master.dates)!=JSON.stringify(e.event.dates)},e.submit=function(){if(e.didChange())if(e.didChangeDates()){var t=new i({title:"Hold up!",message:"Changing the dates will reset all entries by the participants. Are you sure you want to do that?",confirmText:"Yes, I'm sure",isDestructive:!0,confirm:function(){l()}});t.show()}else l()};var l=function(){r.update({id:o},e.event,function(){a.cancel(e.didSave),e.master=angular.copy(e.event),e.didSave=a(function(){e.didSave=!1},2e3)})}}]),angular.module("rallly").controller("EventCtrl",["$scope","$http","$state","Event","Participant","ConfirmModal",function(e,t,n,a,r,i){$(".nav-link").removeClass("active");var o=n.params.id;e.participant={},e.event=a.get({id:o},function(){e.eventUrl=n.href("event",{id:e.event._id},{absolute:!0})},function(){n.go("notfound")}),e.delete=function(t){var n=new i({title:'Delete "'+t.name+'"?',message:"Are you sure you want to remove "+t.name+" from the poll?",confirmText:"Yes - delete",cancelText:"No - nevermind",isDestructive:!0,confirm:function(){r.remove({id:o,pid:t._id},function(t){e.event=t})}});n.show()},e.defaults=[],e.editEvent=function(){n.go("editevent",{id:e.event._id})},e.update=function(t){r.update({id:e.event._id,pid:t._id},t)},e.edit=function(t){e.defaults[e.event.participants.indexOf(t)]=angular.copy(t)},e.cancel=function(t){e.event.participants[t]=e.defaults[t]},e.save=function(t){var t=new r(t);t.$save({id:o},function(t){e.event=t,e.participant={}})}}]).controller("DeleteModalCtrl",function(){}),angular.module("rallly").controller("HomeCtrl",["$scope","$state",function(e,t){e.newEvent=function(){t.go("newevent")}}]),angular.module("rallly").controller("NavigationCtrl",["$scope","$location",function(e,t){e.isActive=function(e){return t.path()==e?!0:!1}}]),angular.module("rallly").controller("NewEventCtrl",["$scope","$http","$state","Event",function(e,t,n){$(".nav-link").removeClass("active"),$(".nav-link[href='/']").addClass("active"),e.submit=function(){t.post("/api/event",e.event).success(function(t){e.event=t,e.eventUrl=n.href("event",{id:e.event._id},{absolute:!0})}).error(function(t){e.errors=t.errors})},e.clearDates=null}]).directive("datepicker",function(){return{restrict:"A",require:"ngModel",link:function(e,t,n,a){angular.element(t).datepicker({multidate:!0,todayHighlight:!0,format:"dd/mm/yyyy"}).on("changeDate",function(e){var t=e.dates;t.sort(function(e,t){return e.getTime()>t.getTime()?!0:!1}),a.$setViewValue(t,e)}),e.clearDates=function(){angular.element(t).datepicker("setDate",null)},e.unsetDate=function(n){angular.element(t).datepicker("setDates",e.event.dates.filter(function(e){return e!=n}))}}}}),angular.module("rallly").directive("backImg",function(){return function(e,t,n){var a=n.backImg;t.css({"background-image":"url(/images/"+a+".png)"})}}),angular.module("rallly").filter("elapsed",["$filter",function(e){return function(t){if(t){var n=Date.parse(t),a=(new Date).getTime(),r=a-n,i=Math.floor(r/1e3),o=Math.floor(i/60),l=Math.floor(o/60),u=Math.floor(l/24);return u>30?"on "+e("date")(t,"MMMM d"):u>1?u+" days ago":1==u?"1 day ago":l>1?l+" hours ago":1==l?"an hour ago":o>1?o+" minutes ago":1==o?"a minute ago":"a few seconds ago"}}}]),angular.module("rallly").factory("ConfirmModal",["btfModal",function(e){return function(t){var n;n=e({templateUrl:"templates/confirmmodal.html",controllerAs:"modal",controller:function(){this.title=t.title,this.message=t.message,this.confirm=function(){t.confirm&&t.confirm(),n.deactivate()},this.cancel=n.deactivate,this.confirmText=t.confirmText||"Confirm",this.cancelText=t.cancelText||"Cancel",this.isDestructive=t.isDestructive}}),this.show=function(){n.activate()},this.destroy=function(){n.deactivate()}}}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJjb250cm9sbGVycy9hYm91dC5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvZWRpdGV2ZW50LmNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9ldmVudC5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvaG9tZS5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvbmF2aWdhdGlvbi5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvbmV3ZXZlbnQuY29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvYmFja0ltZy5kaXJlY3RpdmUuanMiLCJmaWx0ZXJzL2VsYXBzZWQuZmlsdGVyLmpzIiwic2VydmljZXMvbW9kYWwuc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFBLE9BQUEsVUFBQSxZQUFBLGFBQUEsT0FBQSxpQkFDQSxRQUFBLGlCQUFBLHFCQUFBLG9CQUFBLFNBQUEsRUFBQSxFQUFBLEdBQ0EsRUFBQSxXQUFBLEdBQ0EsRUFBQSxVQUFBLGFBQ0EsRUFDQSxNQUFBLFNBQ0EsSUFBQSxJQUNBLFlBQUEsc0JBQ0EsV0FBQSxhQUVBLE1BQUEsWUFDQSxJQUFBLE9BQ0EsWUFBQSwwQkFDQSxXQUFBLGlCQUVBLE1BQUEsU0FDQSxJQUFBLFNBQ0EsWUFBQSx1QkFDQSxXQUFBLGNBRUEsTUFBQSxZQUNBLElBQUEsWUFDQSxZQUFBLDRCQUVBLE1BQUEsYUFDQSxJQUFBLFlBQ0EsWUFBQSwyQkFDQSxXQUFBLGtCQUVBLE1BQUEsU0FDQSxJQUFBLE9BQ0EsWUFBQSx1QkFDQSxXQUFBLGlCQUdBLFFBQUEsU0FBQSxZQUFBLFNBQUEsR0FDQSxNQUFBLEdBQUEsa0JBQUEsR0FBQSxTQUNBLFFBQUEsT0FBQSxZQUdBLFFBQUEsZUFBQSxZQUFBLFNBQUEsR0FDQSxNQUFBLEdBQUEsbUNBQUEsR0FBQSxPQUFBLElBQUEsU0FDQSxRQUFBLE9BQUEsWUMxQ0EsUUFBQSxPQUFBLFVBQ0EsV0FBQSxZQUFBLFdBQ0EsRUFBQSxhQUFBLFlBQUEsVUFDQSxFQUFBLDRCQUFBLFNBQUEsWUNIQSxRQUFBLE9BQUEsVUFDQSxXQUFBLGlCQUFBLFNBQUEsUUFBQSxTQUFBLFdBQUEsUUFBQSxlQUFBLFNBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEdBQ0EsR0FBQSxHQUFBLEVBQUEsT0FBQSxFQUNBLEdBQUEsTUFBQSxFQUFBLEtBQUEsR0FBQSxHQUFBLFNBQUEsR0FFQSxJQUFBLEdBREEsTUFDQSxFQUFBLEVBQUEsRUFBQSxFQUFBLE1BQUEsT0FBQSxJQUNBLEVBQUEsS0FBQSxHQUFBLE1BQUEsRUFBQSxNQUFBLElBRUEsR0FBQSxxQkFBQSxXQUFBLFdBQUEsR0FDQSxFQUFBLE9BQUEsUUFBQSxLQUFBLEVBQUEsUUFDQSxXQUNBLEVBQUEsR0FBQSxjQUVBLEVBQUEsVUFBQSxXQUNBLE1BQUEsTUFBQSxVQUFBLEVBQUEsU0FBQSxLQUFBLFVBQUEsRUFBQSxRQUVBLEVBQUEsZUFBQSxXQUNBLE1BQUEsTUFBQSxVQUFBLEVBQUEsT0FBQSxRQUFBLEtBQUEsVUFBQSxFQUFBLE1BQUEsUUFFQSxFQUFBLE9BQUEsV0FDQSxHQUFBLEVBQUEsWUFDQSxHQUFBLEVBQUEsaUJBQUEsQ0FDQSxHQUFBLEdBQUEsR0FBQSxJQUNBLE1BQUEsV0FDQSxRQUFBLG1HQUNBLFlBQUEsZ0JBQ0EsZUFBQSxFQUNBLFFBQUEsV0FDQSxNQUdBLEdBQUEsV0FHQSxLQUlBLElBQUEsR0FBQSxXQUNBLEVBQUEsUUFDQSxHQUFBLEdBQ0EsRUFBQSxNQUNBLFdBQ0EsRUFBQSxPQUFBLEVBQUEsU0FDQSxFQUFBLE9BQUEsUUFBQSxLQUFBLEVBQUEsT0FDQSxFQUFBLFFBQUEsRUFBQSxXQUNBLEVBQUEsU0FBQSxHQUNBLFdDL0NBLFFBQUEsT0FBQSxVQUNBLFdBQUEsYUFBQSxTQUFBLFFBQUEsU0FBQSxRQUFBLGNBQUEsZUFBQSxTQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxHQUNBLEVBQUEsYUFBQSxZQUFBLFNBQ0EsSUFBQSxHQUFBLEVBQUEsT0FBQSxFQUNBLEdBQUEsZUFDQSxFQUFBLE1BQUEsRUFBQSxLQUFBLEdBQUEsR0FBQSxXQUNBLEVBQUEsU0FBQSxFQUFBLEtBQUEsU0FDQSxHQUFBLEVBQUEsTUFBQSxNQUVBLFVBQUEsS0FFQSxXQUNBLEVBQUEsR0FBQSxjQUVBLEVBQUEsT0FBQSxTQUFBLEdBQ0EsR0FBQSxHQUFBLEdBQUEsSUFDQSxNQUFBLFdBQUEsRUFBQSxLQUFBLEtBQ0EsUUFBQSxtQ0FBQSxFQUFBLEtBQUEsa0JBQ0EsWUFBQSxlQUNBLFdBQUEsaUJBQ0EsZUFBQSxFQUNBLFFBQUEsV0FDQSxFQUFBLFFBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLFNBQUEsR0FDQSxFQUFBLE1BQUEsTUFJQSxHQUFBLFFBR0EsRUFBQSxZQUVBLEVBQUEsVUFBQSxXQUNBLEVBQUEsR0FBQSxhQUFBLEdBQUEsRUFBQSxNQUFBLE9BR0EsRUFBQSxPQUFBLFNBQUEsR0FDQSxFQUFBLFFBQ0EsR0FBQSxFQUFBLE1BQUEsSUFDQSxJQUFBLEVBQUEsS0FDQSxJQUVBLEVBQUEsS0FBQSxTQUFBLEdBQ0EsRUFBQSxTQUFBLEVBQUEsTUFBQSxhQUFBLFFBQUEsSUFBQSxRQUFBLEtBQUEsSUFHQSxFQUFBLE9BQUEsU0FBQSxHQUNBLEVBQUEsTUFBQSxhQUFBLEdBQUEsRUFBQSxTQUFBLElBR0EsRUFBQSxLQUFBLFNBQUEsR0FDQSxHQUFBLEdBQUEsR0FBQSxHQUFBLEVBQ0EsR0FBQSxPQUFBLEdBQUEsR0FBQSxTQUFBLEdBQ0EsRUFBQSxNQUFBLEVBQ0EsRUFBQSxxQkFHQSxXQUFBLGtCQUFBLGNDekRBLFFBQUEsT0FBQSxVQUNBLFdBQUEsWUFBQSxTQUFBLFNBQUEsU0FBQSxFQUFBLEdBQ0EsRUFBQSxTQUFBLFdBQ0EsRUFBQSxHQUFBLGdCQ0hBLFFBQUEsT0FBQSxVQUNBLFdBQUEsa0JBQUEsU0FBQSxZQUFBLFNBQUEsRUFBQSxHQUNBLEVBQUEsU0FBQSxTQUFBLEdBQ0EsTUFBQSxHQUFBLFFBQUEsR0FDQSxHQUVBLE1DTkEsUUFBQSxPQUFBLFVBQ0EsV0FBQSxnQkFBQSxTQUFBLFFBQUEsU0FBQSxRQUFBLFNBQUEsRUFBQSxFQUFBLEdBQ0EsRUFBQSxhQUFBLFlBQUEsVUFDQSxFQUFBLHVCQUFBLFNBQUEsVUFFQSxFQUFBLE9BQUEsV0FDQSxFQUFBLEtBQUEsYUFBQSxFQUFBLE9BQ0EsUUFBQSxTQUFBLEdBQ0EsRUFBQSxNQUFBLEVBQ0EsRUFBQSxTQUFBLEVBQUEsS0FBQSxTQUNBLEdBQUEsRUFBQSxNQUFBLE1BRUEsVUFBQSxNQUlBLE1BQUEsU0FBQSxHQUNBLEVBQUEsT0FBQSxFQUFBLFVBR0EsRUFBQSxXQUFBLFFBRUEsVUFBQSxhQUFBLFdBQ0EsT0FDQSxTQUFBLElBQ0EsUUFBQSxVQUNBLEtBQUEsU0FBQSxFQUFBLEVBQUEsRUFBQSxHQUNBLFFBQUEsUUFBQSxHQUFBLFlBQ0EsV0FBQSxFQUNBLGdCQUFBLEVBQ0EsT0FBQSxlQUVBLEdBQUEsYUFBQSxTQUFBLEdBQ0EsR0FBQSxHQUFBLEVBQUEsS0FDQSxHQUFBLEtBQUEsU0FBQSxFQUFBLEdBQ0EsTUFBQSxHQUFBLFVBQUEsRUFBQSxXQUFBLEdBQ0EsSUFFQSxFQUFBLGNBQUEsRUFBQSxLQUdBLEVBQUEsV0FBQSxXQUNBLFFBQUEsUUFBQSxHQUFBLFdBQUEsVUFBQSxPQUVBLEVBQUEsVUFBQSxTQUFBLEdBQ0EsUUFBQSxRQUFBLEdBQUEsV0FBQSxXQUFBLEVBQUEsTUFBQSxNQUFBLE9BQUEsU0FBQSxHQUNBLE1BQUEsSUFBQSxVQzlDQSxRQUFBLE9BQUEsVUFDQSxVQUFBLFVBQUEsV0FDQSxNQUFBLFVBQUEsRUFBQSxFQUFBLEdBQ0EsR0FBQSxHQUFBLEVBQUEsT0FDQSxHQUFBLEtBQ0EsbUJBQUEsZUFBQSxFQUFBLGFDTEEsUUFBQSxPQUFBLFVBQ0EsT0FBQSxXQUFBLFVBQUEsU0FBQSxHQUNBLE1BQUEsVUFBQSxHQUNBLEdBQUEsRUFBQSxDQUNBLEdBQUEsR0FBQSxLQUFBLE1BQUEsR0FDQSxHQUFBLEdBQUEsT0FBQSxVQUNBLEVBQUEsRUFBQSxFQUNBLEVBQUEsS0FBQSxNQUFBLEVBQUEsS0FDQSxFQUFBLEtBQUEsTUFBQSxFQUFBLElBQ0EsRUFBQSxLQUFBLE1BQUEsRUFBQSxJQUNBLEVBQUEsS0FBQSxNQUFBLEVBQUEsR0FDQSxPQUFBLEdBQUEsR0FDQSxNQUFBLEVBQUEsUUFBQSxFQUFBLFVBQ0EsRUFBQSxFQUNBLEVBQUEsWUFDQSxHQUFBLEVBQ0EsWUFDQSxFQUFBLEVBQ0EsRUFBQSxhQUNBLEdBQUEsRUFDQSxjQUNBLEVBQUEsRUFDQSxFQUFBLGVBQ0EsR0FBQSxFQUNBLGVBRUEseUJDMUJBLFFBQUEsT0FBQSxVQUNBLFFBQUEsZ0JBQUEsV0FBQSxTQUFBLEdBRUEsTUFBQSxVQUFBLEdBQ0EsR0FBQSxFQUNBLEdBQUEsR0FDQSxZQUFBLDhCQUNBLGFBQUEsUUFDQSxXQUFBLFdBQ0EsS0FBQSxNQUFBLEVBQUEsTUFDQSxLQUFBLFFBQUEsRUFBQSxRQUNBLEtBQUEsUUFBQSxXQUNBLEVBQUEsU0FBQSxFQUFBLFVBQ0EsRUFBQSxjQUVBLEtBQUEsT0FBQSxFQUFBLFdBQ0EsS0FBQSxZQUFBLEVBQUEsYUFBQSxVQUNBLEtBQUEsV0FBQSxFQUFBLFlBQUEsU0FDQSxLQUFBLGNBQUEsRUFBQSxpQkFHQSxLQUFBLEtBQUEsV0FDQSxFQUFBLFlBRUEsS0FBQSxRQUFBLFdBQ0EsRUFBQSIsImZpbGUiOiJwdWJsaWMvYnVpbGQvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ3JhbGxseScsIFsndWkucm91dGVyJywnbmdSZXNvdXJjZScsJ25nRngnLCdidGZvcmQubW9kYWwnXSlcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKXtcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL25vdGZvdW5kXCIpXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgIC5zdGF0ZSgnaW5kZXgnLHtcbiAgICAgICAgICAgIHVybCA6ICcvJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsIDogJ3RlbXBsYXRlcy9ob21lLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlciA6ICdIb21lQ3RybCdcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCduZXdldmVudCcse1xuICAgICAgICAgICAgdXJsIDogJy9uZXcnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiAndGVtcGxhdGVzL25ld2V2ZW50Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlciA6ICdOZXdFdmVudEN0cmwnXG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnYWJvdXQnLCB7XG4gICAgICAgICAgICB1cmwgOiAnL2Fib3V0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsIDogJ3RlbXBsYXRlcy9hYm91dC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXIgOiAnQWJvdXRDdHJsJ1xuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ25vdGZvdW5kJywge1xuICAgICAgICAgICAgdXJsIDogJy9ub3Rmb3VuZCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybCA6ICd0ZW1wbGF0ZXMvbm90Zm91bmQuaHRtbCdcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdlZGl0ZXZlbnQnLCB7XG4gICAgICAgICAgICB1cmw6ICcvOmlkL2VkaXQnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiAndGVtcGxhdGVzL2VkaXRldmVudC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXIgOiAnRWRpdEV2ZW50Q3RybCdcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdldmVudCcse1xuICAgICAgICAgICAgdXJsIDogJy86aWQnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiAndGVtcGxhdGVzL2V2ZW50Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlciA6ICdFdmVudEN0cmwnXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICAuZmFjdG9yeSgnRXZlbnQnLCBmdW5jdGlvbigkcmVzb3VyY2Upe1xuICAgICAgICByZXR1cm4gJHJlc291cmNlKCcvYXBpL2V2ZW50LzppZCcsIHsgaWQgOiAnQF9pZCcgfSwge1xuICAgICAgICAgICAgJ3VwZGF0ZScgOiB7IG1ldGhvZCA6ICdQVVQnIH1cbiAgICAgICAgfSk7XG4gICAgfSlcbiAgICAuZmFjdG9yeSgnUGFydGljaXBhbnQnLCBmdW5jdGlvbigkcmVzb3VyY2Upe1xuICAgICAgICByZXR1cm4gJHJlc291cmNlKCcvYXBpL2V2ZW50LzppZC9wYXJ0aWNpcGFudC86cGlkJywgeyBpZDogJ0BfaWQnLCBwaWQgOiAnQHBpZCd9LCB7XG4gICAgICAgICAgICAndXBkYXRlJyA6IHsgbWV0aG9kIDogJ1BVVCcgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdyYWxsbHknKVxuLmNvbnRyb2xsZXIoJ0Fib3V0Q3RybCcsIGZ1bmN0aW9uKCl7XG4gICAgJChcIi5uYXYtbGlua1wiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJChcIi5uYXYtbGlua1tocmVmPScvYWJvdXQnXVwiKS5hZGRDbGFzcygnYWN0aXZlJyk7XG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdyYWxsbHknKVxuLmNvbnRyb2xsZXIoJ0VkaXRFdmVudEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkc3RhdGUsICR0aW1lb3V0LCBFdmVudCwgQ29uZmlybU1vZGFsKXtcbiAgICB2YXIgaWQgPSAkc3RhdGUucGFyYW1zLmlkXG4gICAgJHNjb3BlLmV2ZW50ID0gRXZlbnQuZ2V0KHtpZDppZH0sIGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICB2YXIgZGF0ZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmRhdGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGRhdGVzLnB1c2gobmV3IERhdGUoZGF0YS5kYXRlc1tpXSkpO1xuICAgICAgICB9XG4gICAgICAgICQoXCJbZGF0YS1kYXRlcGlja2VyXVwiKS5kYXRlcGlja2VyKCdzZXREYXRlcycsZGF0ZXMpO1xuICAgICAgICAkc2NvcGUubWFzdGVyID0gYW5ndWxhci5jb3B5KCRzY29wZS5ldmVudCk7XG4gICAgfSwgZnVuY3Rpb24oZSl7XG4gICAgICAgICRzdGF0ZS5nbygnbm90Zm91bmQnKTtcbiAgICB9KTtcbiAgICAkc2NvcGUuZGlkQ2hhbmdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KCRzY29wZS5tYXN0ZXIpICE9IEpTT04uc3RyaW5naWZ5KCRzY29wZS5ldmVudCk7XG4gICAgfVxuICAgICRzY29wZS5kaWRDaGFuZ2VEYXRlcyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSgkc2NvcGUubWFzdGVyLmRhdGVzKSAhPSBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZXZlbnQuZGF0ZXMpO1xuICAgIH1cbiAgICAkc2NvcGUuc3VibWl0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKCRzY29wZS5kaWRDaGFuZ2UoKSl7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmRpZENoYW5nZURhdGVzKCkgKXtcbiAgICAgICAgICAgICAgICB2YXIgbW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiAnSG9sZCB1cCEnLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlIDogJ0NoYW5naW5nIHRoZSBkYXRlcyB3aWxsIHJlc2V0IGFsbCBlbnRyaWVzIGJ5IHRoZSBwYXJ0aWNpcGFudHMuIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkbyB0aGF0PycsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1UZXh0IDogJ1llcywgSVxcJ20gc3VyZScsXG4gICAgICAgICAgICAgICAgICAgIGlzRGVzdHJ1Y3RpdmUgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb25maXJtIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbW9kYWwuc2hvdygpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHZhciB1cGRhdGUgPSBmdW5jdGlvbigpe1xuICAgICAgICBFdmVudC51cGRhdGUoe1xuICAgICAgICAgICAgaWQgOiBpZFxuICAgICAgICB9LCAkc2NvcGUuZXZlbnQsXG4gICAgICAgIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkdGltZW91dC5jYW5jZWwoJHNjb3BlLmRpZFNhdmUpO1xuICAgICAgICAgICAgJHNjb3BlLm1hc3RlciA9IGFuZ3VsYXIuY29weSgkc2NvcGUuZXZlbnQpO1xuICAgICAgICAgICAgJHNjb3BlLmRpZFNhdmUgPSAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICRzY29wZS5kaWRTYXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgncmFsbGx5Jylcbi5jb250cm9sbGVyKCdFdmVudEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkc3RhdGUsIEV2ZW50LCBQYXJ0aWNpcGFudCwgQ29uZmlybU1vZGFsKXtcbiAgICAkKFwiLm5hdi1saW5rXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB2YXIgaWQgPSAkc3RhdGUucGFyYW1zLmlkO1xuICAgICRzY29wZS5wYXJ0aWNpcGFudCA9IHt9O1xuICAgICRzY29wZS5ldmVudCA9IEV2ZW50LmdldCh7aWQ6aWR9LCBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgJHNjb3BlLmV2ZW50VXJsID0gJHN0YXRlLmhyZWYoJ2V2ZW50Jywge1xuICAgICAgICAgICAgaWQ6ICRzY29wZS5ldmVudC5faWRcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYWJzb2x1dGUgOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0sIGZ1bmN0aW9uKGUpe1xuICAgICAgICAkc3RhdGUuZ28oJ25vdGZvdW5kJyk7XG4gICAgfSk7XG4gICAgJHNjb3BlLmRlbGV0ZSA9IGZ1bmN0aW9uKHBhcnRpY2lwYW50KXtcbiAgICAgICAgdmFyIG1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbCh7XG4gICAgICAgICAgICB0aXRsZSA6ICdEZWxldGUgXCInK3BhcnRpY2lwYW50Lm5hbWUrJ1wiPycsXG4gICAgICAgICAgICBtZXNzYWdlIDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZW1vdmUgJytwYXJ0aWNpcGFudC5uYW1lKycgZnJvbSB0aGUgcG9sbD8nLFxuICAgICAgICAgICAgY29uZmlybVRleHQgOiAnWWVzIC0gZGVsZXRlJyxcbiAgICAgICAgICAgIGNhbmNlbFRleHQgOiAnTm8gLSBuZXZlcm1pbmQnLFxuICAgICAgICAgICAgaXNEZXN0cnVjdGl2ZSA6IHRydWUsXG4gICAgICAgICAgICBjb25maXJtIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBQYXJ0aWNpcGFudC5yZW1vdmUoeyBpZCA6IGlkICwgcGlkIDogcGFydGljaXBhbnQuX2lkIH0sIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmV2ZW50ID0gZXZlbnQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBtb2RhbC5zaG93KCk7XG4gICAgfVxuXG4gICAgJHNjb3BlLmRlZmF1bHRzID0gW107XG5cbiAgICAkc2NvcGUuZWRpdEV2ZW50ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgJHN0YXRlLmdvKCdlZGl0ZXZlbnQnLCB7IGlkIDogJHNjb3BlLmV2ZW50Ll9pZCB9KTtcbiAgICB9XG5cbiAgICAkc2NvcGUudXBkYXRlID0gZnVuY3Rpb24ocGFydGljaXBhbnQpe1xuICAgICAgICBQYXJ0aWNpcGFudC51cGRhdGUoe1xuICAgICAgICAgICAgaWQgOiAkc2NvcGUuZXZlbnQuX2lkLFxuICAgICAgICAgICAgcGlkIDogcGFydGljaXBhbnQuX2lkXG4gICAgICAgIH0sIHBhcnRpY2lwYW50KTtcbiAgICB9XG4gICAgJHNjb3BlLmVkaXQgPSBmdW5jdGlvbihwYXJ0aWNpcGFudCl7XG4gICAgICAgICRzY29wZS5kZWZhdWx0c1skc2NvcGUuZXZlbnQucGFydGljaXBhbnRzLmluZGV4T2YocGFydGljaXBhbnQpXSA9IGFuZ3VsYXIuY29weShwYXJ0aWNpcGFudCk7XG4gICAgfVxuXG4gICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgJHNjb3BlLmV2ZW50LnBhcnRpY2lwYW50c1tpbmRleF0gPSAkc2NvcGUuZGVmYXVsdHNbaW5kZXhdO1xuICAgIH1cblxuICAgICRzY29wZS5zYXZlID0gZnVuY3Rpb24ocGFydGljaXBhbnQpe1xuICAgICAgICB2YXIgcGFydGljaXBhbnQgPSBuZXcgUGFydGljaXBhbnQocGFydGljaXBhbnQpO1xuICAgICAgICBwYXJ0aWNpcGFudC4kc2F2ZSh7aWQ6aWR9LCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAkc2NvcGUuZXZlbnQgPSBldmVudDtcbiAgICAgICAgICAgICRzY29wZS5wYXJ0aWNpcGFudCA9IHt9O1xuICAgICAgICB9KTtcbiAgICB9XG59KS5jb250cm9sbGVyKCdEZWxldGVNb2RhbEN0cmwnLCBmdW5jdGlvbigpe1xuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdyYWxsbHknKVxuLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUpe1xuICAgICRzY29wZS5uZXdFdmVudCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICRzdGF0ZS5nbygnbmV3ZXZlbnQnKTtcbiAgICB9XG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdyYWxsbHknKVxuLmNvbnRyb2xsZXIoJ05hdmlnYXRpb25DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24pe1xuICAgICRzY29wZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgaWYgKCRsb2NhdGlvbi5wYXRoKCkgPT0gcGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgncmFsbGx5Jylcbi5jb250cm9sbGVyKCdOZXdFdmVudEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkc3RhdGUsIEV2ZW50KXtcbiAgICAkKFwiLm5hdi1saW5rXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKFwiLm5hdi1saW5rW2hyZWY9Jy8nXVwiKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAkc2NvcGUuc3VibWl0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgJGh0dHAucG9zdCgnL2FwaS9ldmVudCcsICRzY29wZS5ldmVudClcbiAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZXZlbnQsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKXtcbiAgICAgICAgICAgICRzY29wZS5ldmVudCA9IGV2ZW50O1xuICAgICAgICAgICAgJHNjb3BlLmV2ZW50VXJsID0gJHN0YXRlLmhyZWYoJ2V2ZW50Jywge1xuICAgICAgICAgICAgICAgIGlkOiAkc2NvcGUuZXZlbnQuX2lkXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgYWJzb2x1dGUgOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vICRzdGF0ZS5nbygnZXZlbnQnLHtpZCA6IGRhdGEuZXZlbnQuX2lkfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5lcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZyl7XG4gICAgICAgICAgICAkc2NvcGUuZXJyb3JzID0gZGF0YS5lcnJvcnM7XG4gICAgICAgIH0pXG4gICAgfVxuICAgICRzY29wZS5jbGVhckRhdGVzID0gbnVsbFxufSlcbi5kaXJlY3RpdmUoJ2RhdGVwaWNrZXInLCBmdW5jdGlvbigpe1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0IDogJ0EnLFxuICAgICAgICByZXF1aXJlIDogJ25nTW9kZWwnLFxuICAgICAgICBsaW5rIDogZnVuY3Rpb24oc2NvcGUsIGVsLCBhdHRycywgbmdNb2RlbCl7XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWwpLmRhdGVwaWNrZXIoe1xuICAgICAgICAgICAgICAgIG11bHRpZGF0ZSA6IHRydWUsXG4gICAgICAgICAgICAgICAgdG9kYXlIaWdobGlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZm9ybWF0IDogJ2RkL21tL3l5eXknXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjaGFuZ2VEYXRlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGVzID0gZS5kYXRlcztcbiAgICAgICAgICAgICAgICBkYXRlcy5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgICAgICAgICAgICAgICBpZiAoYS5nZXRUaW1lKCkgPiBiLmdldFRpbWUoKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuZ01vZGVsLiRzZXRWaWV3VmFsdWUoZGF0ZXMsIGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNjb3BlLmNsZWFyRGF0ZXMgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbCkuZGF0ZXBpY2tlcignc2V0RGF0ZScsIG51bGwpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2NvcGUudW5zZXREYXRlID0gZnVuY3Rpb24oZGF0ZSl7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsKS5kYXRlcGlja2VyKCdzZXREYXRlcycsIHNjb3BlLmV2ZW50LmRhdGVzLmZpbHRlcihmdW5jdGlvbihlbCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbCAhPSBkYXRlO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdyYWxsbHknKVxuLmRpcmVjdGl2ZSgnYmFja0ltZycsIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycyl7XG4gICAgICAgIHZhciB1cmwgPSBhdHRycy5iYWNrSW1nO1xuICAgICAgICBlbGVtZW50LmNzcyh7XG4gICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6ICd1cmwoL2ltYWdlcy8nICsgdXJsICsnLnBuZyknXG4gICAgICAgIH0pO1xuICAgIH07XG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ3JhbGxseScpXG4uZmlsdGVyKCdlbGFwc2VkJywgZnVuY3Rpb24oJGZpbHRlcil7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRhdGUpe1xuICAgICAgICBpZiAoIWRhdGUpIHJldHVybjtcbiAgICAgICAgdmFyIHRpbWUgPSBEYXRlLnBhcnNlKGRhdGUpLFxuICAgICAgICAgICAgdGltZU5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgZGlmZmVyZW5jZSA9IHRpbWVOb3cgLSB0aW1lLFxuICAgICAgICAgICAgc2Vjb25kcyA9IE1hdGguZmxvb3IoZGlmZmVyZW5jZSAvIDEwMDApLFxuICAgICAgICAgICAgbWludXRlcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKSxcbiAgICAgICAgICAgIGhvdXJzID0gTWF0aC5mbG9vcihtaW51dGVzIC8gNjApLFxuICAgICAgICAgICAgZGF5cyA9IE1hdGguZmxvb3IoaG91cnMgLyAyNCk7XG4gICAgICAgIGlmIChkYXlzID4gMzApIHtcbiAgICAgICAgICAgIHJldHVybiAnb24gJyArICRmaWx0ZXIoJ2RhdGUnKShkYXRlLCAnTU1NTSBkJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF5cyA+IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXlzICsgXCIgZGF5cyBhZ29cIjtcbiAgICAgICAgfSBlbHNlIGlmIChkYXlzID09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBcIjEgZGF5IGFnb1wiXG4gICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gaG91cnMgKyBcIiBob3VycyBhZ29cIjtcbiAgICAgICAgfSBlbHNlIGlmIChob3VycyA9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJhbiBob3VyIGFnb1wiO1xuICAgICAgICB9IGVsc2UgaWYgKG1pbnV0ZXMgPiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gbWludXRlcyArIFwiIG1pbnV0ZXMgYWdvXCI7XG4gICAgICAgIH0gZWxzZSBpZiAobWludXRlcyA9PSAxKXtcbiAgICAgICAgICAgIHJldHVybiBcImEgbWludXRlIGFnb1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwiYSBmZXcgc2Vjb25kcyBhZ29cIjtcbiAgICAgICAgfVxuICAgIH1cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgncmFsbGx5Jylcbi5mYWN0b3J5KCdDb25maXJtTW9kYWwnLCBmdW5jdGlvbihidGZNb2RhbCl7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oY29uZmlnKXtcbiAgICAgICAgdmFyIG1vZGFsO1xuICAgICAgICBtb2RhbCA9IGJ0Zk1vZGFsKHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsIDogJ3RlbXBsYXRlcy9jb25maXJtbW9kYWwuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyQXMgOiAnbW9kYWwnLFxuICAgICAgICAgICAgY29udHJvbGxlciA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IGNvbmZpZy50aXRsZVxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IGNvbmZpZy5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuY29uZmlybSkgY29uZmlnLmNvbmZpcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgbW9kYWwuZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCA9IG1vZGFsLmRlYWN0aXZhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maXJtVGV4dCA9IGNvbmZpZy5jb25maXJtVGV4dCB8fCAnQ29uZmlybSc7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxUZXh0ID0gY29uZmlnLmNhbmNlbFRleHQgfHwgJ0NhbmNlbCc7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0Rlc3RydWN0aXZlID0gY29uZmlnLmlzRGVzdHJ1Y3RpdmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNob3cgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgbW9kYWwuYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgbW9kYWwuZGVhY3RpdmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=