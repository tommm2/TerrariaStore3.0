(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11ab5e43"],{"057f":function(t,e,a){var r=a("fc6a"),s=a("241c").f,n={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],o=function(t){try{return s(t)}catch(e){return i.slice()}};t.exports.f=function(t){return i&&"[object Window]"==n.call(t)?o(t):s(r(t))}},"0806":function(t,e,a){"use strict";a("c5b8")},"133c":function(t,e,a){"use strict";a("a2d0")},"1ff2":function(t,e,a){"use strict";a("8d54")},2571:function(t,e,a){"use strict";a("34e2")},"27e4":function(t,e,a){t.exports=a.p+"img/Alert.290e47a1.gif"},"305a":function(t,e,a){"use strict";a("fc6b")},"34e2":function(t,e,a){},"4f0f":function(t,e,a){"use strict";a("b387")},5530:function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));a("b64b"),a("a4d3"),a("4de4"),a("e439"),a("159b"),a("dbb4");function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function s(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function n(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?s(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}},"566c":function(t,e,a){t.exports=a.p+"img/cart-object.a5ac6d90.gif"},"56a6":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"message-alert"},t._l(t.messages,(function(e,s){return r("div",{key:s,staticClass:"alert",class:"alert-"+e.status},[r("img",{staticClass:"pr-1",attrs:{src:a("27e4"),alt:"Alert"}}),r("span",[t._v(t._s(e.msg))]),r("button",{staticClass:"close pl-2",attrs:{type:"button","aria-label":"Close"},on:{click:function(e){return t.REMOVEMSG(s)}}},[r("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])})),0)},s=[],n=a("5530"),i=a("2f62"),o={name:"Alert",data:function(){return{}},methods:Object(n["a"])({},Object(i["d"])(["REMOVEMSG"])),computed:Object(n["a"])({},Object(i["c"])(["messages"]))},c=o,l=(a("1ff2"),a("2877")),u=Object(l["a"])(c,r,s,!1,null,"324f166e",null);e["a"]=u.exports},"5e46":function(t,e,a){t.exports=a.p+"img/cart-bg.72bd4d13.gif"},"746f":function(t,e,a){var r=a("428f"),s=a("5135"),n=a("e538"),i=a("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});s(e,t)||i(e,t,{value:n.f(t)})}},7511:function(t,e,a){t.exports=a.p+"img/Logo.531f9324.png"},"8a2e":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("header",[a("CustomerNavbar",{staticClass:"fixed-top"})],1),a("main",[a("router-view")],1),a("footer",[a("CustomerFooter")],1),t.isCart?a("Cart"):t._e(),a("Alert"),a("GoTop")],1)},s=[],n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("nav",{staticClass:"navbar navbar-expand-md"},[r("router-link",{staticClass:"navbar-brand",attrs:{to:{name:"CustomerHome"}}},[r("img",{attrs:{src:a("7511"),width:"200",alt:"Logo"}})]),r("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#collapse_target"},on:{click:function(e){t.isToggle=!t.isToggle}}},[r("i",{staticClass:"fas fa-bars",class:{toggle:t.isToggle}})]),r("div",{staticClass:"collapse navbar-collapse",attrs:{id:"collapse_target"}},[r("ul",{staticClass:"navbar-nav ml-auto font-weight-bold"},[r("li",{staticClass:"nav-item"},[r("router-link",{staticClass:"nav-link",attrs:{to:{name:"CustomerHome"}}},[r("i",{staticClass:"fas fa-home"}),r("span",{staticClass:"ml-2"},[t._v("首頁")])])],1),r("li",{staticClass:"nav-item"},[r("router-link",{staticClass:"nav-link",attrs:{to:{name:"CustomerProduct"}}},[r("i",{staticClass:"fas fa-shopping-basket"}),r("span",{staticClass:"ml-2"},[t._v("所有商品")])])],1),r("li",{staticClass:"nav-item"},[r("router-link",{staticClass:"nav-link",attrs:{to:{name:"CustomerCart"}}},[r("i",{staticClass:"fas fa-shopping-cart"}),r("span",{staticClass:"ml-2"},[t._v("購物車")])])],1),r("li",{staticClass:"nav-item"},[r("router-link",{staticClass:"nav-link",attrs:{to:{name:"Login"}}},[r("i",{staticClass:"fas fa-users-cog"}),r("span",{staticClass:"ml-2"},[t._v("管理")])])],1)])])],1)])},i=[],o=a("1157"),c=a.n(o),l={data:function(){return{isToggle:!1}},mounted:function(){c()(".nav-link").on("click",(function(){c()(".navbar-toggler").click()}))}},u=l,f=(a("2571"),a("2877")),d=Object(f["a"])(u,n,i,!1,null,"6b7d4c04",null),b=d.exports,m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"main-footer container pt-5"},[a("div",{staticClass:"row"},[t._m(0),t._m(1),a("section",{staticClass:"tag col-lg-4 col-sm-12 text-sm-center"},[a("ul",{staticClass:"tag-list"},[a("li",[a("router-link",{attrs:{to:{name:"CustomerHome"}}},[t._v("首頁")])],1),a("li",[a("router-link",{attrs:{to:{name:"CustomerProduct"}}},[t._v("所有商品")])],1),a("li",[a("router-link",{attrs:{to:{name:"CustomerCart"}}},[t._v("購物車")])],1),a("li",[a("router-link",{attrs:{to:{name:"Login"}}},[t._v("管理")])],1)])])])]),t._m(2)])},p=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"Logo col-lg-4 col-sm-12 text-lg-left text-sm-center mb-sm-5"},[r("h5",{staticClass:"text-light"},[t._v("輸入EMAIL取得最新資訊")]),r("div",{staticClass:"group mb-sm-4"},[r("input",{attrs:{type:"text",placeholder:"xxx@xxx.xxx"}}),r("button",{staticClass:"btn",attrs:{type:"button"}},[r("i",{staticClass:"fas fa-arrow-right"})])]),r("img",{attrs:{width:"200",src:a("7511"),alt:"Logo"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"ContactAndAdress col-lg-4 col-sm-12 text-lg-left text-sm-center mb-sm-5"},[a("h5",{staticClass:"text-light"},[t._v("追蹤我們")]),a("div",{staticClass:"followUs mb-5"},[a("a",{attrs:{href:"#"}},[a("i",{staticClass:"fab fa-instagram"})]),a("a",{attrs:{href:"#"}},[a("i",{staticClass:"fab fa-facebook-square"})]),a("a",{attrs:{href:"#"}},[a("i",{staticClass:"fab fa-twitter-square"})])]),a("h5",{staticClass:"text-light"},[t._v("聯絡我們")]),a("div",{staticClass:"contactUs"},[a("p",[a("a",{attrs:{href:"#"}},[t._v("地址: 泰拉市蘑菇路一段36巷65號")])]),a("p",[a("a",{attrs:{href:"#"}},[t._v("電話: 0978564231")])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"child-footer p-3 bg-dark text-white text-center"},[a("span",[t._v("©tommm2 圖片來源皆來自網路，僅當作練習作品")])])}],g={},v=g,h=(a("133c"),Object(f["a"])(v,m,p,!1,null,"36e55936",null)),C=h.exports,_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("button",{staticClass:"gotop bg-primary",attrs:{type:"button"},on:{click:t.goTop}},[a("i",{staticClass:"fa fa-angle-up"})])])},y=[],O={methods:{goTop:function(){window.scroll({top:0,left:0,behavior:"smooth"})}},mounted:function(){c()(window).scroll((function(){c()(this).scrollTop()>400?c()(".gotop").fadeIn():c()(".gotop").fadeOut()}))}},w=O,x=(a("0806"),Object(f["a"])(w,_,y,!1,null,"10ecc23e",null)),j=x.exports,k=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.cart.carts?r("a",{staticClass:"cart-background",attrs:{href:"#","data-toggle":"modal","data-target":"#cartModal"}},[r("img",{attrs:{src:a("566c"),alt:"cart-icon"}}),t.cart.carts.length>0?r("div",{staticClass:"cart-mark"},[t._v(t._s(t.cart.carts.length))]):t._e()]):t._e(),r("div",{staticClass:"modal fade p-3",attrs:{id:"cartModal",tabindex:"-1",role:"dialog","aria-labelledby":"cartModalLabel","aria-hidden":"true"}},[r("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[r("div",{staticClass:"modal-content"},[t._m(0),r("div",{staticClass:"body"},[t.cart.carts?r("div",{staticClass:"col-sm-12"},[0!==t.cart.carts.length?r("div",{staticClass:"table-list"},[r("table",{staticClass:"table text-white"},[t._m(1),r("tbody",t._l(t.cart.carts,(function(e){return r("tr",{key:e.id},[r("td",[r("img",{attrs:{width:"30",src:e.product.imageUrl,alt:e.product.title}}),r("span",{staticClass:"d-md-inline d-sm-block"},[t._v(t._s(e.product.title))]),e.coupon?r("div",{staticClass:"text-success"},[t._v("已套用優惠券")]):t._e()]),r("td",[r("i",{staticClass:"fas fa-minus mx-1",on:{click:function(a){return t.changeQty(e.id,e.product.id,e.qty,!1)}}}),t._v(" "+t._s(e.qty)+"/"+t._s(e.product.unit)+" "),r("i",{staticClass:"fas fa-plus mx-1",on:{click:function(a){return t.changeQty(e.id,e.product.id,e.qty,!0)}}})]),r("td",[t._v(t._s(t._f("currency")(e.final_total)))]),r("td",[r("i",{staticClass:"fas fa-trash-alt",on:{click:function(a){return t.delCart(e.id)}}})])])})),0)])]):r("div",{staticClass:"no-item-res text-white text-center pt-3"},[r("i",{staticClass:"fas fa-cart-arrow-down mr-2"}),t._v("您的購物車為空 ")]),r("div",{staticClass:"price pt-3  d-flex justify-content-around font-weight-bold"},[r("p",{staticClass:"text-muted"},[t._v("總計 "+t._s(t._f("currency")(t.cart.total)))]),t.cart.total!==t.cart.final_total?r("p",{staticClass:"text-success"},[t._v("折扣價 "+t._s(t._f("currency")(t.cart.final_total)))]):t._e()]),r("div",{staticClass:"input-group mb-3 input-group-sm"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.coupon_code,expression:"coupon_code"}],staticClass:"form-control",attrs:{type:"text",placeholder:"請輸入優惠碼 ex:試試eee"},domProps:{value:t.coupon_code},on:{input:function(e){e.target.composing||(t.coupon_code=e.target.value)}}}),r("div",{staticClass:"input-group-append"},[""===t.coupon_code||0===t.cart.carts.length?r("button",{staticClass:"btn btn-outline-primary",attrs:{type:"button",disabled:""}},[t._v(" 套用優惠碼 ")]):r("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.enterCoupon(t.coupon_code)}}},[t._v(" 套用優惠碼 ")])]),r("button",{staticClass:"btn btn-danger mt-3 mb-3 col-sm-12",attrs:{type:"button","data-dismiss":"modal"}},[t._v("返回")]),t.cart.carts.length>0?r("router-link",{staticClass:"btn btn-primary col-sm-12 text-white",attrs:{"data-dismiss":"modal",type:"btn",to:{name:"CustomerCart"}}},[t._v("前往結帳")]):t._e(),t.cart.carts.length<=0?r("router-link",{staticClass:"btn btn-primary col-sm-12 text-white",attrs:{"data-dismiss":"modal",type:"btn",to:{name:"CustomerProduct"}}},[t._v("前往購物")]):t._e()],1)]):t._e()])])])])])},P=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"header mt-3"},[r("img",{staticClass:"col-sm-12",attrs:{src:a("5e46"),alt:"cart-bg"}}),r("div",{staticClass:"header-text"},[t._v("我的購物車")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",{staticClass:"bg-primary"},[a("th",[t._v("品名")]),a("th",[t._v("數量")]),a("th",[t._v("價錢")]),a("th",[t._v("刪除")])])}],E=a("5530"),S=a("2f62"),$={data:function(){return{coupon_code:""}},methods:Object(E["a"])(Object(E["a"])({},Object(S["b"])(["getCartList","enterCoupon","delCart"])),{},{changeQty:function(t,e,a,r){var s,n=this;s=!0===r?a+1:1===a?1:a-1,n.$store.dispatch("changeQty",{id:t,productId:e,num:s})}}),computed:Object(E["a"])({},Object(S["c"])(["cart"])),created:function(){var t=this;t.getCartList()}},T=$,L=(a("305a"),Object(f["a"])(T,k,P,!1,null,"030b30ee",null)),A=L.exports,M=a("56a6"),N={data:function(){return{route:""}},components:{CustomerNavbar:b,CustomerFooter:C,Alert:M["a"],Cart:A,GoTop:j},computed:{isCart:function(){var t=this;return"/customerCart"!==t.route&&"/login"!==t.route}},mounted:function(){var t=this;this.$bus.$on("getRoute",(function(e){t.route=e}))}},D=N,q=(a("4f0f"),Object(f["a"])(D,r,s,!1,null,"00b635a4",null));e["default"]=q.exports},"8d54":function(t,e,a){},a2d0:function(t,e,a){},a4d3:function(t,e,a){"use strict";var r=a("23e7"),s=a("da84"),n=a("d066"),i=a("c430"),o=a("83ab"),c=a("4930"),l=a("fdbf"),u=a("d039"),f=a("5135"),d=a("e8b5"),b=a("861d"),m=a("825a"),p=a("7b0b"),g=a("fc6a"),v=a("c04e"),h=a("5c6c"),C=a("7c73"),_=a("df75"),y=a("241c"),O=a("057f"),w=a("7418"),x=a("06cf"),j=a("9bf2"),k=a("d1e7"),P=a("9112"),E=a("6eeb"),S=a("5692"),$=a("f772"),T=a("d012"),L=a("90e3"),A=a("b622"),M=a("e538"),N=a("746f"),D=a("d44e"),q=a("69f3"),Q=a("b727").forEach,F=$("hidden"),G="Symbol",I="prototype",J=A("toPrimitive"),H=q.set,R=q.getterFor(G),U=Object[I],V=s.Symbol,W=n("JSON","stringify"),z=x.f,B=j.f,K=O.f,X=k.f,Y=S("symbols"),Z=S("op-symbols"),tt=S("string-to-symbol-registry"),et=S("symbol-to-string-registry"),at=S("wks"),rt=s.QObject,st=!rt||!rt[I]||!rt[I].findChild,nt=o&&u((function(){return 7!=C(B({},"a",{get:function(){return B(this,"a",{value:7}).a}})).a}))?function(t,e,a){var r=z(U,e);r&&delete U[e],B(t,e,a),r&&t!==U&&B(U,e,r)}:B,it=function(t,e){var a=Y[t]=C(V[I]);return H(a,{type:G,tag:t,description:e}),o||(a.description=e),a},ot=l?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof V},ct=function(t,e,a){t===U&&ct(Z,e,a),m(t);var r=v(e,!0);return m(a),f(Y,r)?(a.enumerable?(f(t,F)&&t[F][r]&&(t[F][r]=!1),a=C(a,{enumerable:h(0,!1)})):(f(t,F)||B(t,F,h(1,{})),t[F][r]=!0),nt(t,r,a)):B(t,r,a)},lt=function(t,e){m(t);var a=g(e),r=_(a).concat(mt(a));return Q(r,(function(e){o&&!ft.call(a,e)||ct(t,e,a[e])})),t},ut=function(t,e){return void 0===e?C(t):lt(C(t),e)},ft=function(t){var e=v(t,!0),a=X.call(this,e);return!(this===U&&f(Y,e)&&!f(Z,e))&&(!(a||!f(this,e)||!f(Y,e)||f(this,F)&&this[F][e])||a)},dt=function(t,e){var a=g(t),r=v(e,!0);if(a!==U||!f(Y,r)||f(Z,r)){var s=z(a,r);return!s||!f(Y,r)||f(a,F)&&a[F][r]||(s.enumerable=!0),s}},bt=function(t){var e=K(g(t)),a=[];return Q(e,(function(t){f(Y,t)||f(T,t)||a.push(t)})),a},mt=function(t){var e=t===U,a=K(e?Z:g(t)),r=[];return Q(a,(function(t){!f(Y,t)||e&&!f(U,t)||r.push(Y[t])})),r};if(c||(V=function(){if(this instanceof V)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=L(t),a=function(t){this===U&&a.call(Z,t),f(this,F)&&f(this[F],e)&&(this[F][e]=!1),nt(this,e,h(1,t))};return o&&st&&nt(U,e,{configurable:!0,set:a}),it(e,t)},E(V[I],"toString",(function(){return R(this).tag})),E(V,"withoutSetter",(function(t){return it(L(t),t)})),k.f=ft,j.f=ct,x.f=dt,y.f=O.f=bt,w.f=mt,M.f=function(t){return it(A(t),t)},o&&(B(V[I],"description",{configurable:!0,get:function(){return R(this).description}}),i||E(U,"propertyIsEnumerable",ft,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:V}),Q(_(at),(function(t){N(t)})),r({target:G,stat:!0,forced:!c},{for:function(t){var e=String(t);if(f(tt,e))return tt[e];var a=V(e);return tt[e]=a,et[a]=e,a},keyFor:function(t){if(!ot(t))throw TypeError(t+" is not a symbol");if(f(et,t))return et[t]},useSetter:function(){st=!0},useSimple:function(){st=!1}}),r({target:"Object",stat:!0,forced:!c,sham:!o},{create:ut,defineProperty:ct,defineProperties:lt,getOwnPropertyDescriptor:dt}),r({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:bt,getOwnPropertySymbols:mt}),r({target:"Object",stat:!0,forced:u((function(){w.f(1)}))},{getOwnPropertySymbols:function(t){return w.f(p(t))}}),W){var pt=!c||u((function(){var t=V();return"[null]"!=W([t])||"{}"!=W({a:t})||"{}"!=W(Object(t))}));r({target:"JSON",stat:!0,forced:pt},{stringify:function(t,e,a){var r,s=[t],n=1;while(arguments.length>n)s.push(arguments[n++]);if(r=e,(b(e)||void 0!==t)&&!ot(t))return d(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!ot(e))return e}),s[1]=e,W.apply(null,s)}})}V[I][J]||P(V[I],J,V[I].valueOf),D(V,G),T[F]=!0},b387:function(t,e,a){},b64b:function(t,e,a){var r=a("23e7"),s=a("7b0b"),n=a("df75"),i=a("d039"),o=i((function(){n(1)}));r({target:"Object",stat:!0,forced:o},{keys:function(t){return n(s(t))}})},c5b8:function(t,e,a){},dbb4:function(t,e,a){var r=a("23e7"),s=a("83ab"),n=a("56ef"),i=a("fc6a"),o=a("06cf"),c=a("8418");r({target:"Object",stat:!0,sham:!s},{getOwnPropertyDescriptors:function(t){var e,a,r=i(t),s=o.f,l=n(r),u={},f=0;while(l.length>f)a=s(r,e=l[f++]),void 0!==a&&c(u,e,a);return u}})},e439:function(t,e,a){var r=a("23e7"),s=a("d039"),n=a("fc6a"),i=a("06cf").f,o=a("83ab"),c=s((function(){i(1)})),l=!o||c;r({target:"Object",stat:!0,forced:l,sham:!o},{getOwnPropertyDescriptor:function(t,e){return i(n(t),e)}})},e538:function(t,e,a){var r=a("b622");e.f=r},fc6b:function(t,e,a){}}]);
//# sourceMappingURL=chunk-11ab5e43.951d6d6b.js.map