(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(39)},39:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),u=n(12),l=n.n(u),r=(n(6),n(2)),c=function(e){var t=e.filter,n=e.handleFilterChange;return o.a.createElement("div",null,o.a.createElement("form",null,"rajaa n\xe4ytett\xe4vi\xe4 ",o.a.createElement("input",{value:t,onChange:n})))},i=function(e){var t=e.deletePerson,n=e.person;return o.a.createElement("div",null,n.name," ",n.number," ",o.a.createElement("button",{type:"submit",value:n.name,onClick:t,id:n.id},"delete"))},s=function(e){var t=e.addPerson,n=e.newName,a=e.newNumber,u=e.handleNameChange,l=e.handleNumberChange;return o.a.createElement("form",{onSubmit:t},o.a.createElement("div",null,"nimi: ",o.a.createElement("input",{value:n,onChange:u})),o.a.createElement("div",null,"numero: ",o.a.createElement("input",{value:a,onChange:l})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},m=function(e){var t=e.message,n=e.messageType;return null==t?null:"success"===n?o.a.createElement("div",{className:"message"},t):o.a.createElement("div",{className:"error"},t)},f=n(3),d=n.n(f),h="/api/persons",v=function(){return d.a.get(h).then(function(e){return e.data})},g=function(e){return d.a.post(h,e).then(function(e){return e.data})},p=function(e,t){return d.a.put("".concat(h,"/").concat(e),t).then(function(e){return e.data})},w=function(e){return d.a.delete("".concat(h,"/").concat(e)).then(function(e){return e.data})},b=function(){var e=Object(a.useState)([]),t=Object(r.a)(e,2),n=t[0],u=t[1],l=Object(a.useState)(""),f=Object(r.a)(l,2),d=f[0],h=f[1],b=Object(a.useState)(""),E=Object(r.a)(b,2),y=E[0],j=E[1],C=Object(a.useState)(""),k=Object(r.a)(C,2),O=k[0],N=k[1],L=Object(a.useState)(null),T=Object(r.a)(L,2),S=T[0],P=T[1],x=Object(a.useState)(null),B=Object(r.a)(x,2),D=B[0],F=B[1];Object(a.useEffect)(function(){v().then(function(e){u(e)})},[]);var H=function(e){e.preventDefault(),console.log("delete\xe4 painettu henkil\xf6lle",e.target.id);var t=e.target.id,n=e.target.value;console.log(n),window.confirm("Are you sure you want to delete ".concat(n))&&w(t).then(function(e){P("".concat(n," poistettu yhteystiedoista")),F("success"),v().then(function(e){u(e)}),setTimeout(function(){P(null),F(null)},3e3)}).catch(function(e){P("Henkil\xf6\xe4 ".concat(n," ei ollut palvelimella")),F("error"),setTimeout(function(){P(null),F(null)},3e3)})},J=n.filter(function(e){return e.name.toLowerCase().match(O.toLowerCase())});return o.a.createElement("div",null,o.a.createElement("h1",null,"Puhelinluettelo"),o.a.createElement(m,{message:S,messageType:D}),o.a.createElement(c,{filter:O,handleFilterChange:function(e){console.log("filtteri\xe4 kirjoitetaan",e.target.value),N(e.target.value)}}),o.a.createElement("h2",null,"Lis\xe4\xe4 uusi"),o.a.createElement(s,{addPerson:function(e){e.preventDefault(),console.log("nappia painettu",e.target);var t,a={name:d,number:y};if(t=d,n.some(function(e){return e.name.toLowerCase()===t.toLowerCase()})){if(window.confirm("".concat(d," already exists, do you want to replace old number with new one?"))){var o={name:d,number:y,id:function(e){return n.find(function(t){return t.name.toLowerCase()===e.toLowerCase()?t.id:null})}(d).id};console.log(o.id),p(o.id,o).then(function(e){P("".concat(d," yhteystieto muutettu")),F("success"),setTimeout(function(){P(null),F(null)},3e3)}).catch(function(e){P("Henkil\xf6n ".concat(d," tietoja ei pystytty p\xe4ivitt\xe4m\xe4\xe4n")),F("error"),setTimeout(function(){P(null),F(null)},3e3)}),h(""),j("")}}else g(a).then(function(e){u(n.concat(a)),h(""),j(""),P("Lis\xe4ttiin ".concat(d)),F("success"),v().then(function(e){u(e)}),setTimeout(function(){P(null),F(null)},3e3)}).catch(function(e){P("Ei pystytty lis\xe4\xe4m\xe4\xe4n henkil\xf6\xe4 ".concat(d)),F("error"),setTimeout(function(){P(null),F(null)},3e3)})},newName:d,handleNameChange:function(e){console.log("nime\xe4 kirjoitetaan",e.target.value),h(e.target.value)},newNumber:y,handleNumberChange:function(e){console.log("numeroa kirjoitetaan",e.target.value),j(e.target.value)}}),o.a.createElement("h2",null,"Numerot"),J.map(function(e){return o.a.createElement(i,{key:e.name,person:e,deletePerson:H})}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},6:function(e,t,n){}},[[13,2,1]]]);
//# sourceMappingURL=main.f07b55d0.chunk.js.map