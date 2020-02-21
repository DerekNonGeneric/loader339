<table>
  <thead><tr><td colspan=3  align=center><strong>This is a living document. It describes the policy and priorities as they exist today, but can evolve over time.</strong></td></tr></thead>
  <tfoot><tr><td align=center><a href="./vitae.md"><strong>❮&nbsp;Vitae</strong></a></td><td><img width=1000/></td><td align=center><a href="./roadmap.md"><strong>Roadmap&nbsp;❯</strong></a></td></tr></tfoot>
</table><br /><hr /><br />

# Wishlist

_The items below represent functionality that has been recognized as desirable,
but cannot be implemented due to either being currently blocked or unplanned.
For items that are currently planned, see the [roadmap](./roadmap.md)._

× insert Modules into a module's local ES module cache  
× insert Modules into the global ES module cache  
× rewrite a module's compiled source code  
├── × user module code  
└── × node builtin module code  
× [_monkey patch_](./atlas.md#monkey-patch) a module at import time  
├── × user module code  
└── × node builtin module code

× more than one active [APM](./atlas.md#apm)/transformer within a single app  
× rewrite the URL of an import request before loader resolution  
× safe hook application in an arbitrary sequence  
× patch a module w/o changing its URL in the
[_module map_](./atlas.md#module-map)  
× keep track of imported modules  
├── × format  
├── × specifier  
└── × URL  
× patch/wrap a module's exports  
├── × wrap `export default ...` w/ IIFE  
├── × wrap APIs and don't patch away exports  
├── × wrap all of a module's exported functions  
└── × wrap only a few of a module's exported functions  
× access a module's compiled source code  
├── × user module code  
└── × node builtin module code

**Status per Platform Goal**

× way to create custom ES module implementations à la
[jsdom](https://github.com/jsdom/jsdom)  
└── × [`vm.Module`](https://nodejs.org/api/vm.html#vm_class_vm_module)  
× way to declare a list of exports and expose a reflection API to them  
└── × `vm.ReflectiveModule`  
× way to intercept `import()`  
├── × available to
[`vm.Script`](https://nodejs.org/api/vm.html#vm_class_vm_script)  
└── × available to
[`vm.Module`](https://nodejs.org/api/vm.html#vm_class_vm_module)

<br /><hr />

<table style="overflow: visible">
  <thead style="overflow: visible">
    <tr style="overflow: visible"><td colspan=3 align=center><strong>Key</strong></td><img width=1000/></tr>
  </thead>
  <tbody>
    <tr><td align=center>◎</td><td>supported/demonstrated w/ tests</td></tr>
    <tr><td align=center>○</td><td>supported/demonstrated</td></tr>
    <tr><td align=center>△</td><td>partially supported/demonstrated</td></tr>
    <tr><td align=center>×</td><td>unsupported/undemonstrated</td></tr>
  </tbody>
</table>
