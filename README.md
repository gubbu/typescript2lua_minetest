# Write minetest mods in typescript

- the goal: Write minetest mods in typescript!
  
  - use the documentation of [lua_api.txt](https://github.com/minetest/minetest/blob/master/doc/lua_api.txt) to write the minetest api in Typescript: [_G.d.ts](/_G.d.ts), :warning: the current API implementation is not complete!
  
  - basic functions like creating formspec and private modules [seem enhanced]("rubenwardy_formspecs.ts") by typescripts syntax already?
  
  - this project uses [TypeScriptToLua](https://typescripttolua.github.io/) to transpile typescript code to Lua code.
