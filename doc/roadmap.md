<table>
  <thead><tr><td colspan=3  align=center><strong>This is a living document. It can evolve over time.</strong></td></tr></thead>
  <tfoot><tr><td align=center><a href="./wishlist.md"><strong>❮&nbsp;Wishlist</strong></a></td><td><img width=1000/></td><td align=center><a href="./vitae.md"><strong>Vitae&nbsp;❯</strong></a></td></tr></tfoot>
</table><br /><hr /><br />

# Roadmap

_The goals below represent items currently planned for completion. For
additional items that have been recognized as desirable, see the
[wishlist](./wishlist.md)._

**Status per User Goal**

△ [_monkey patch_](./atlas.md#monkey-patch) a module at import time  
├── ○ user module code  
└── × node builtin module code  

○ patch a module w/o changing its URL in the
[_module map_](./atlas.md#module-map)  

△ keep track of imported modules  
├── ○ format  
├── × specifier  
└── ○ URL  

△ patch/wrap a module's exports  
├── ○ wrap `export default ...` w/ IIFE  
├── × wrap APIs and don't patch away exports  
├── × wrap all of a module's exported functions  
└── × wrap only a few of a module's exported functions  

△ access a module's compiled source code  
├── × user module code  
└── × node builtin module code

○ more than one active [APM](./atlas.md#apm)/transformer within a single app  

× rewrite the URL of an import request before loader resolution  

× safe hook application in an arbitrary sequence  

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
